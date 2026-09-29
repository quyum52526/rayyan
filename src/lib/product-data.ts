import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeProducts, type Product } from "@/lib/products";

const localCatalogPath = path.join(process.cwd(), "src/data/products.json");
const REDIS_CATALOG_KEY = "rayyan:catalog";

/**
 * Upstash Redis over its REST API. The Vercel Marketplace integration injects the KV_* names;
 * a direct Upstash setup uses the UPSTASH_REDIS_* names. Either pair turns the store on.
 */
function redisConfig(): { url: string; token: string } | null {
  const url = process.env.KV_REST_API_URL || process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.KV_REST_API_TOKEN || process.env.UPSTASH_REDIS_REST_TOKEN;
  return url && token ? { url: url.replace(/\/$/, ""), token } : null;
}

async function redisCommand<T>(command: (string | number)[]): Promise<T> {
  const config = redisConfig();
  if (!config) throw new Error("Redis is not configured.");
  const response = await fetch(config.url, {
    method: "POST",
    headers: { Authorization: `Bearer ${config.token}`, "Content-Type": "application/json" },
    body: JSON.stringify(command),
    cache: "no-store",
  });
  const payload = (await response.json().catch(() => null)) as { result?: T; error?: string } | null;
  if (!response.ok || !payload || payload.error) {
    throw new Error(`Redis ${command[0]} failed (${response.status}): ${payload?.error ?? "no response body"}`);
  }
  return payload.result as T;
}

/**
 * Where a catalog read actually came from.
 * "local" is a real read of a real catalog and is safe to merge onto.
 * "empty" means the catalog genuinely does not exist yet: the read yields no products
 * at all. It is never backfilled from bundled sample data, so a deleted product can
 * never come back, and it is not safe to blind-write over in case a real catalog
 * exists but was unreadable.
 */
export type CatalogSource = "local" | "empty";

export type CatalogRead = {
  products: Product[];
  source: CatalogSource;
};

export class CatalogReadError extends Error {
  constructor(message: string, options?: { cause?: unknown }) {
    super(message, options);
    this.name = "CatalogReadError";
  }
}

export class CatalogWriteRefusedError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "CatalogWriteRefusedError";
  }
}

/**
 * Every catalog read funnels through here, so this is where legacy category values are
 * folded onto the six category slugs and the hot-deals flag is recovered.
 */
function assertProductArray(value: unknown, origin: string): Product[] {
  if (!Array.isArray(value)) {
    throw new CatalogReadError(`Catalog at ${origin} is not an array (got ${typeof value}).`);
  }
  return normalizeProducts(value as Product[]);
}

async function readLocalCatalog(): Promise<CatalogRead> {
  let raw: string;
  try {
    raw = await fs.readFile(localCatalogPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return { products: [], source: "empty" };
    }
    throw new CatalogReadError(`Failed to read local catalog at ${localCatalogPath}.`, { cause: error });
  }

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CatalogReadError(`Local catalog at ${localCatalogPath} is not valid JSON.`, { cause: error });
  }

  return { products: assertProductArray(parsed, localCatalogPath), source: "local" };
}

/**
 * Reads the catalog and reports its provenance. Throws on every failure that is not
 * a verified "catalog does not exist yet". Never silently degrades to seed data.
 *
 * With Redis configured, the catalog lives under one key there. Until the first admin save
 * that key is empty, and the bundled `src/data/products.json` seeds the read; after that the
 * file is never consulted again. A Redis *failure* throws rather than falling back to the
 * file, because a save merged onto that stale copy would overwrite the real catalog.
 * Without Redis (local dev) the file is the catalog. The Vercel Blob store is over its plan
 * quota and answers with 403, so no blob call is made anywhere.
 */
export async function readCatalog(): Promise<CatalogRead> {
  if (!redisConfig()) return readLocalCatalog();
  let raw: string | null;
  try {
    raw = await redisCommand<string | null>(["GET", REDIS_CATALOG_KEY]);
  } catch (error) {
    throw new CatalogReadError("Failed to read the catalog from Redis.", { cause: error });
  }
  if (raw === null) return readLocalCatalog();
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch (error) {
    throw new CatalogReadError("Catalog stored in Redis is not valid JSON.", { cause: error });
  }
  return { products: assertProductArray(parsed, `redis:${REDIS_CATALOG_KEY}`), source: "local" };
}

export async function getProducts(): Promise<Product[]> {
  const { products } = await readCatalog();
  return products;
}

export type SaveProductsOptions = {
  /** Provenance of the catalog these products were merged onto. */
  baseSource: CatalogSource;
  /** Opt in to writing onto an empty catalog. Only for deliberate first-time writes. */
  allowEmptyBase?: boolean;
};

export async function saveProducts(
  nextProducts: Product[],
  options: SaveProductsOptions
): Promise<Product[]> {
  if (options.baseSource === "empty" && !options.allowEmptyBase) {
    throw new CatalogWriteRefusedError(
      "Refusing to save: the catalog being written was merged onto an empty catalog, not a real catalog read. " +
        "Pass allowEmptyBase: true only to deliberately write the first catalog."
    );
  }

  if (redisConfig()) {
    await redisCommand(["SET", REDIS_CATALOG_KEY, JSON.stringify(nextProducts)]);
    return nextProducts;
  }

  // Vercel's serverless filesystem is read-only, so a file write there can never persist.
  // Say so plainly instead of surfacing a bare EROFS.
  if (process.env.VERCEL) {
    throw new CatalogWriteRefusedError(
      "No writable catalog store: connect Upstash Redis (KV_REST_API_URL / KV_REST_API_TOKEN) to this Vercel project."
    );
  }

  // Local dev without Redis: the catalog file in the repo is the store.
  await fs.writeFile(localCatalogPath, JSON.stringify(nextProducts, null, 2), "utf8");
  return nextProducts;
}

/**
 * Catalog read for render paths that must never take the page down with them.
 * A failed read degrades to an empty seed and the client store then retries through
 * /api/products, which is exactly the path that already handles being offline.
 */
export async function getProductsSafe(): Promise<Product[]> {
  try {
    return await getProducts();
  } catch (error) {
    console.error("[catalog] server-side seed read failed; falling back to the client fetch.", error);
    return [];
  }
}

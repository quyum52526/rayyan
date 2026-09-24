import { promises as fs } from "node:fs";
import path from "node:path";
import { normalizeProducts, type Product } from "@/lib/products";

const localCatalogPath = path.join(process.cwd(), "src/data/products.json");

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
 * `src/data/products.json` is the single source of truth: the project's Vercel Blob store
 * is over its plan quota and answers reads with 403, so no blob call is made here at all.
 */
export async function readCatalog(): Promise<CatalogRead> {
  return readLocalCatalog();
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

  const content = JSON.stringify(nextProducts, null, 2);

  // Writes go straight to the local catalog file. The blob store is quota-locked, so a
  // write there would fail; note that this also means writes only persist on a writable
  // filesystem (local dev), not on Vercel's read-only serverless filesystem.
  await fs.writeFile(localCatalogPath, content, "utf8");
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

import { promises as fs } from "node:fs";
import path from "node:path";
import { products as seedProducts, type Product } from "@/lib/products";

const localCatalogPath = path.join(process.cwd(), "src/data/products.json");
const catalogBlobPath = "catalog/products.json";

/**
 * Where a catalog read actually came from.
 * "blob" / "local" are real reads of a real catalog and are safe to merge onto.
 * "seed" means the catalog genuinely does not exist yet — safe to READ, never safe
 * to blind-write over, because a merge onto seed data would destroy a real catalog.
 */
export type CatalogSource = "blob" | "local" | "seed";

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

function assertProductArray(value: unknown, origin: string): Product[] {
  if (!Array.isArray(value)) {
    throw new CatalogReadError(`Catalog at ${origin} is not an array (got ${typeof value}).`);
  }
  return value as Product[];
}

async function readLocalCatalog(): Promise<CatalogRead> {
  let raw: string;
  try {
    raw = await fs.readFile(localCatalogPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException)?.code === "ENOENT") {
      return { products: seedProducts, source: "seed" };
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
 */
export async function readCatalog(): Promise<CatalogRead> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (!token) {
    if (process.env.VERCEL) {
      throw new CatalogReadError("BLOB_READ_WRITE_TOKEN is required to read the catalog on Vercel.");
    }
    return readLocalCatalog();
  }

  let blobs: Array<{ pathname: string; url: string }>;
  try {
    const { list } = await import("@vercel/blob");
    const result = await list({ prefix: catalogBlobPath, limit: 10, token });
    blobs = result.blobs;
  } catch (error) {
    throw new CatalogReadError("Failed to list catalog blobs.", { cause: error });
  }

  const targetBlob = blobs.find((blob) => blob.pathname === catalogBlobPath);
  if (!targetBlob) {
    // list() succeeded and the catalog genuinely is not there: empty store / first run.
    return { products: seedProducts, source: "seed" };
  }

  let response: Response;
  try {
    // টাইমস্ট্যাম্প যোগ করে ক্যাশিং সম্পূর্ণ বন্ধ করা হলো
    response = await fetch(`${targetBlob.url}?t=${Date.now()}`, { cache: "no-store" });
  } catch (error) {
    throw new CatalogReadError("Failed to fetch the catalog blob.", { cause: error });
  }

  if (!response.ok) {
    throw new CatalogReadError(
      `Catalog blob fetch failed with ${response.status} ${response.statusText}.`
    );
  }

  let parsed: unknown;
  try {
    parsed = await response.json();
  } catch (error) {
    throw new CatalogReadError("Catalog blob is not valid JSON.", { cause: error });
  }

  return { products: assertProductArray(parsed, catalogBlobPath), source: "blob" };
}

export async function getProducts(): Promise<Product[]> {
  const { products } = await readCatalog();
  return products;
}

export type SaveProductsOptions = {
  /** Provenance of the catalog these products were merged onto. */
  baseSource: CatalogSource;
  /** Opt in to writing onto seed data. Only for deliberate first-time seeding. */
  allowSeedBase?: boolean;
};

export async function saveProducts(
  nextProducts: Product[],
  options: SaveProductsOptions
): Promise<Product[]> {
  if (options.baseSource === "seed" && !options.allowSeedBase) {
    throw new CatalogWriteRefusedError(
      "Refusing to save: the catalog being written was merged onto seed data, not a real catalog read. " +
        "Pass allowSeedBase: true only to deliberately seed an empty store."
    );
  }

  const content = JSON.stringify(nextProducts, null, 2);
  const token = process.env.BLOB_READ_WRITE_TOKEN;

  if (token) {
    try {
      const { put } = await import("@vercel/blob");
      await put(catalogBlobPath, content, {
        access: "public",
        addRandomSuffix: false,
        allowOverwrite: true,
        contentType: "application/json",
        token,
      });
      return nextProducts;
    } catch (error) {
      console.error("Failed to save products to Vercel Blob:", error);
      throw error;
    }
  }

  if (process.env.VERCEL) {
    throw new Error("BLOB_READ_WRITE_TOKEN is required for catalog writes on Vercel.");
  }

  await fs.writeFile(localCatalogPath, content, "utf8");
  return nextProducts;
}

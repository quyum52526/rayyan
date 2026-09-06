import { promises as fs } from "node:fs";
import path from "node:path";
import { products as seedProducts, type Product } from "@/lib/products";

const localCatalogPath = path.join(process.cwd(), "src/data/products.json");
const blobPath = "rayyan/products.json";

async function readLocalProducts() {
  try {
    return JSON.parse(await fs.readFile(localCatalogPath, "utf8")) as Product[];
  } catch {
    return seedProducts;
  }
}

export async function getProducts() {
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { list } = await import("@vercel/blob");
    const blobs = await list({ prefix: blobPath, limit: 1 });
    if (blobs.blobs[0]) {
      const response = await fetch(blobs.blobs[0].url, { cache: "no-store" });
      if (response.ok) return await response.json() as Product[];
    }
  }
  return readLocalProducts();
}

export async function saveProducts(nextProducts: Product[]) {
  const content = JSON.stringify(nextProducts, null, 2);
  if (process.env.BLOB_READ_WRITE_TOKEN) {
    const { put } = await import("@vercel/blob");
    await put(blobPath, content, { access: "public", addRandomSuffix: false, contentType: "application/json" });
    return nextProducts;
  }
  if (process.env.VERCEL) throw new Error("BLOB_READ_WRITE_TOKEN is required for catalog writes on Vercel.");
  await fs.writeFile(localCatalogPath, content, "utf8");
  return nextProducts;
}
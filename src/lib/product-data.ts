import { promises as fs } from "node:fs";
import path from "node:path";
import { products as seedProducts, type Product } from "@/lib/products";

const localCatalogPath = path.join(process.cwd(), "src/data/products.json");
const catalogBlobPath = "catalog/products.json";

async function readLocalProducts(): Promise<Product[]> {
  try {
    const data = await fs.readFile(localCatalogPath, "utf8");
    return JSON.parse(data) as Product[];
  } catch {
    return seedProducts;
  }
}

export async function getProducts(): Promise<Product[]> {
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  if (token) {
    try {
      const { list } = await import("@vercel/blob");
      const result = await list({ prefix: catalogBlobPath, limit: 10, token });
      const targetBlob = result.blobs.find((b) => b.pathname === catalogBlobPath) || result.blobs[0];

      if (targetBlob) {
        // টাইমস্ট্যাম্প যোগ করে ক্যাশিং সম্পূর্ণ বন্ধ করা হলো
        const freshUrl = `${targetBlob.url}?t=${Date.now()}`;
        const response = await fetch(freshUrl, { cache: "no-store" });
        if (response.ok) {
          return (await response.json()) as Product[];
        }
      }
    } catch (error) {
      console.error("Failed to read products from Vercel Blob:", error);
    }
  }

  return readLocalProducts();
}

export async function saveProducts(nextProducts: Product[]): Promise<Product[]> {
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
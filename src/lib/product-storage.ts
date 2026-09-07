import { get, set } from "idb-keyval";
import type { Product } from "@/lib/products";

const PRODUCTS_KEY = "rayyan-products";
const PENDING_PRODUCTS_KEY = "rayyan-pending-products";

export async function getStoredProducts(): Promise<Product[] | null> {
  if (typeof window === "undefined") return null;
  const products = await get<Product[]>(PRODUCTS_KEY);
  return Array.isArray(products) ? products : null;
}

export async function setStoredProducts(products: Product[]): Promise<void> {
  if (typeof window === "undefined") return;
  await set(PRODUCTS_KEY, products);
}

export async function getPendingProducts(): Promise<Product[]> {
  if (typeof window === "undefined") return [];
  const products = await get<Product[]>(PENDING_PRODUCTS_KEY);
  return Array.isArray(products) ? products : [];
}

export async function setPendingProducts(products: Product[]): Promise<void> {
  if (typeof window === "undefined") return;
  await set(PENDING_PRODUCTS_KEY, products);
}

export function isApiFailure(error: unknown) {
  return error instanceof TypeError || (error instanceof Error && error.message.startsWith("Product request failed"));
}

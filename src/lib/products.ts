export type Product = {
  id: number;
  slug: string;
  sku?: string;
  name: string;
  bn: string;
  price: number;
  oldPrice: number;
  stock: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  image2?: string;
  video?: string;
  tag?: string;
  description?: string;
  nutrition?: string;
  storageInstructions?: string;
};

import catalog from "@/data/products.json";

export const products: Product[] = catalog as Product[];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

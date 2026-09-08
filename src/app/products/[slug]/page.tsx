import type { Metadata } from "next";
import ProductRoute from "@/components/ProductRoute";
import { getProducts } from "@/lib/product-data";
import type { Product } from "@/lib/products";

const fallbackMetadata: Metadata = { title: "পণ্য | RAYYAN" };

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;

  let product: Product | undefined;
  try {
    product = (await getProducts()).find((item) => item.slug === slug);
  } catch (error) {
    // Catalog unreadable: degrade the title only. The page body is client-rendered
    // and unaffected, so the storefront stays up instead of 500-ing on metadata.
    console.error(`[product.metadata] catalog read failed slug=${slug}`, error);
    return fallbackMetadata;
  }

  return product ? { title: `${product.bn} | RAYYAN`, description: product.name } : fallbackMetadata;
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductRoute slug={slug} />;
}

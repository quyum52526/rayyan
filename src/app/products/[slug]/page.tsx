import type { Metadata } from "next";
import ProductRoute from "@/components/ProductRoute";
import { getProductBySlug } from "@/lib/products";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  return { title: product ? `${product.bn} | RAYYAN` : "পণ্য | RAYYAN", description: product?.name };
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <ProductRoute slug={slug} />;
}

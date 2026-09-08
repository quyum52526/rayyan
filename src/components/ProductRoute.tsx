"use client";

import { Package } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/lib/store";

export default function ProductRoute({ slug }: { slug: string }) {
  const { products } = useStore();
  const { t } = useLanguage();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <main className="product-missing"><Package size={28} /><h1>{t.notFound.title}</h1><p>{t.notFound.body}</p></main>;
  return <ProductDetail product={product} />;
}

"use client";

import { Package } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/lib/store";

export default function ProductRoute({ slug }: { slug: string }) {
  const { products, catalogReady } = useStore();
  const { t } = useLanguage();
  const product = products.find((item) => item.slug === slug);
  // Until the catalog load settles, an unmatched slug means "still loading", not "gone".
  const body = product
    ? <ProductDetail product={product} />
    : catalogReady
      ? <main className="product-missing"><Package size={28} /><h1>{t.notFound.title}</h1><p>{t.notFound.body}</p></main>
      : <main className="product-missing" />;
  return <>{body}<SiteFooter /></>;
}

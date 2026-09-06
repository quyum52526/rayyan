"use client";

import { Package } from "lucide-react";
import ProductDetail from "@/components/ProductDetail";
import { useStore } from "@/lib/store";

export default function ProductRoute({ slug }: { slug: string }) {
  const { products } = useStore();
  const product = products.find((item) => item.slug === slug);
  if (!product) return <main className="product-missing"><Package size={28} /><h1>পণ্যটি পাওয়া যায়নি</h1><p>অ্যাডমিন থেকে পণ্যটি মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।</p></main>;
  return <ProductDetail product={product} />;
}

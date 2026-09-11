"use client";

import ProductCard from "@/components/ProductCard";
import type { Product } from "@/lib/products";

export type ProductCardHandlers = {
  likedIds: number[];
  onToggleWishlist: (id: number) => void;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
};

type ProductGridProps = ProductCardHandlers & { products: Product[] };

/** Two columns on phones, four from md up — the one grid every product shelf uses. */
export default function ProductGrid({ products, likedIds, onToggleWishlist, onAddToCart, onQuickView }: ProductGridProps) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          liked={likedIds.includes(product.id)}
          onToggleWishlist={() => onToggleWishlist(product.id)}
          onAddToCart={() => onAddToCart(product)}
          onQuickView={() => onQuickView(product)}
        />
      ))}
    </div>
  );
}

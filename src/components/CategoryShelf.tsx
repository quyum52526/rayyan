"use client";

import { Search } from "lucide-react";
import CategoryBanner from "@/components/CategoryBanner";
import ProductGrid, { type ProductCardHandlers } from "@/components/ProductGrid";
import { useLanguage } from "@/context/LanguageContext";
import type { CategorySlug } from "@/lib/categories";
import type { Product } from "@/lib/products";

type CategoryShelfProps = ProductCardHandlers & {
  slug: CategorySlug;
  /** Already sliced by the caller — the homepage passes four. */
  products: Product[];
  /** Total in the category, so the banner can show the real count behind the slice. */
  totalCount: number;
  /** False while the catalog is still loading, which keeps the empty state hidden. */
  catalogReady: boolean;
};

/** One homepage category section: header bar plus a four-up product grid. */
export default function CategoryShelf({ slug, products, totalCount, catalogReady, ...handlers }: CategoryShelfProps) {
  const { t } = useLanguage();

  return (
    <section className="category-shelf my-10" id={slug}>
      <div className="container">
        <CategoryBanner slug={slug} count={totalCount} />
        {products.length > 0
          ? <ProductGrid products={products} {...handlers} />
          : catalogReady
            ? <div className="empty-state category-shelf-empty"><Search size={22} /><h3>{t.products.emptyTitle}</h3><p>{t.products.emptyBody}</p></div>
            : null}
      </div>
    </section>
  );
}

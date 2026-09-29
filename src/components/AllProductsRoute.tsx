"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import SiteFooter from "@/components/SiteFooter";
import { formatNumber, useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, categoryLabel, type CategorySlug } from "@/lib/categories";
import { discountPercent, matchesQuery, type Product } from "@/lib/products";
import { cartAddition, useStore } from "@/lib/store";

type SortKey = "featured" | "priceLow" | "priceHigh" | "discount";
const sortKeys: SortKey[] = ["featured", "priceLow", "priceHigh", "discount"];

// Unpriced (coming-soon) items sink to the end of any price sort instead of reading as ৳0.
const sorters: Record<SortKey, ((a: Product, b: Product) => number) | null> = {
  featured: null,
  priceLow: (a, b) => (a.price > 0 ? a.price : Infinity) - (b.price > 0 ? b.price : Infinity),
  priceHigh: (a, b) => b.price - a.price,
  discount: (a, b) => discountPercent(b) - discountPercent(a),
};

/** /products — the full catalog with a category filter and a sort. */
export default function AllProductsRoute() {
  const { products, catalogReady, cart, addToCart } = useStore();
  const { language, t } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [category, setCategory] = useState<CategorySlug | null>(null);
  const [sort, setSort] = useState<SortKey>("featured");

  const visibleProducts = useMemo(() => {
    const matches = products.filter((product) => (!category || product.category === category) && matchesQuery(product, search));
    const sorter = sorters[sort];
    return sorter ? [...matches].sort(sorter) : matches;
  }, [products, category, search, sort]);

  const openProduct = (product: Product) => router.push(`/products/${product.slug}`);

  return (
    <>
      <Navbar searchValue={search} onSearchChange={setSearch} wishlistCount={liked.length} cartCount={cart.length} />
      <main className="container search-page all-products-page">
        <p className="kicker">{t.allProducts.kicker}</p>
        <h1 className="search-heading">{t.allProducts.heading}</h1>
        <p className="search-result-label">{t.allProducts.countLabel.replace("{count}", formatNumber(visibleProducts.length, language))}</p>
        <div className="all-products-toolbar">
          <div className="product-tabs all-products-filters">
            <button className={category === null ? "active" : ""} onClick={() => setCategory(null)}>{t.allProducts.allCategories}</button>
            {CATEGORIES.map((entry) => (
              <button className={category === entry.slug ? "active" : ""} onClick={() => setCategory(entry.slug)} key={entry.slug}>{categoryLabel(entry.slug, language)}</button>
            ))}
          </div>
          <label className="all-products-sort">
            {t.allProducts.sortLabel}
            <select value={sort} onChange={(event) => setSort(event.target.value as SortKey)}>
              {sortKeys.map((key) => <option value={key} key={key}>{t.allProducts.sort[key]}</option>)}
            </select>
          </label>
        </div>
        {visibleProducts.length > 0
          ? <ProductGrid
              products={visibleProducts}
              likedIds={liked}
              onToggleWishlist={(id) => setLiked((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id])}
              onAddToCart={(product) => addToCart(cartAddition(product))}
              onQuickView={openProduct}
            />
          : catalogReady
            ? <div className="empty-state"><Search size={26} /><h3>{t.products.emptyTitle}</h3><p>{t.products.emptyBody}</p></div>
            : null}
      </main>
      <SiteFooter />
    </>
  );
}

"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import SiteFooter from "@/components/SiteFooter";
import { formatNumber, useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, categoryHref, categoryLabel } from "@/lib/categories";
import { matchesQuery, type Product } from "@/lib/products";
import { cartAddition, useStore } from "@/lib/store";

/** /search?q= — matches the query against product names across every category.
 *  The page keys this component on the query, so a new ?q= remounts it with that text. */
export default function SearchRoute({ query }: { query: string }) {
  const { products, catalogReady, cart, addToCart } = useStore();
  const { language, t } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState(query);
  const [liked, setLiked] = useState<number[]>([]);

  const results = useMemo(
    () => (search.trim() ? products.filter((product) => matchesQuery(product, search)) : []),
    [products, search]
  );

  const openProduct = (product: Product) => router.push(`/products/${product.slug}`);

  return (
    <>
      <Navbar searchValue={search} onSearchChange={setSearch} wishlistCount={liked.length} cartCount={cart.length} />
      <main className="container search-page">
        <p className="kicker">{t.search.kicker}</p>
        <h1 className="search-heading">{t.search.heading}</h1>
        {search.trim() && <p className="search-result-label">{t.search.resultLabel.replace("{count}", formatNumber(results.length, language)).replace("{query}", search.trim())}</p>}
        {results.length > 0
          ? <ProductGrid
              products={results}
              likedIds={liked}
              onToggleWishlist={(id) => setLiked((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id])}
              onAddToCart={(product) => addToCart(cartAddition(product))}
              onQuickView={openProduct}
            />
          : catalogReady || !search.trim()
            ? <div className="empty-state"><Search size={26} /><h3>{t.search.emptyTitle}</h3><p>{t.search.emptyBody}</p></div>
            : null}
        <nav className="category-siblings">
          <p className="kicker">{t.categories.allLabel}</p>
          <div className="category-sibling-links">
            {CATEGORIES.map((category) => (
              <Link className="category-sibling-link" href={categoryHref(category.slug)} key={category.slug}>
                {categoryLabel(category.slug, language)} <ArrowRight size={14} />
              </Link>
            ))}
          </div>
        </nav>
      </main>
      <SiteFooter />
    </>
  );
}

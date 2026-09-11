"use client";

import { ArrowRight, Search } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState } from "react";
import CategoryBanner from "@/components/CategoryBanner";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import SiteFooter from "@/components/SiteFooter";
import { useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, categoryHref, categoryLabel, type CategorySlug } from "@/lib/categories";
import { matchesQuery, type Product } from "@/lib/products";
import { useStore } from "@/lib/store";

/** Category landing page: the banner, every product in the category, and sibling links. */
export default function CategoryRoute({ slug }: { slug: CategorySlug }) {
  const { products, catalogReady, cart, addToCart } = useStore();
  const { language, t } = useLanguage();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);

  const categoryProducts = useMemo(
    () => products.filter((product) => product.category === slug && matchesQuery(product, search)),
    [products, slug, search]
  );

  const addProductToCart = (product: Product) => addToCart(product);
  // The quick-view modal lives on the homepage, so here the card opens the product page.
  const openProduct = (product: Product) => router.push(`/products/${product.slug}`);

  return (
    <>
      <Navbar searchValue={search} onSearchChange={setSearch} wishlistCount={liked.length} cartCount={cart.length} />
      <main className="container category-page">
        <CategoryBanner slug={slug} count={categoryProducts.length} showViewAll={false} />
        {categoryProducts.length > 0
          ? <ProductGrid
              products={categoryProducts}
              likedIds={liked}
              onToggleWishlist={(id) => setLiked((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id])}
              onAddToCart={addProductToCart}
              onQuickView={openProduct}
            />
          : catalogReady
            ? <div className="empty-state"><Search size={26} /><h3>{t.products.emptyTitle}</h3><p>{t.products.emptyBody}</p></div>
            : null}
        <nav className="category-siblings">
          <p className="kicker">{t.categories.allLabel}</p>
          <div className="category-sibling-links">
            {CATEGORIES.filter((category) => category.slug !== slug).map((category) => (
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

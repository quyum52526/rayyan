"use client";

import { ChevronDown, Heart, Search, ShoppingBag, SlidersHorizontal, Truck, X } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { formatNumber, useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, categoryHref, categoryLabel, categorySubtitle } from "@/lib/categories";

type NavbarProps = {
  /**
   * Live query owned by the page. When both are given the input filters the page in place;
   * without them the navbar keeps its own query and only redirects on submit.
   */
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  wishlistCount?: number;
  /** Opens the page's cart drawer. Pages without a drawer fall back to /checkout. */
  onCartOpen?: () => void;
  cartCount?: number;
};

export default function Navbar({ searchValue, onSearchChange, wishlistCount = 0, onCartOpen, cartCount = 0 }: NavbarProps) {
  const { language, toggleLanguage, t } = useLanguage();
  const router = useRouter();
  const [localSearch, setLocalSearch] = useState("");
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const query = searchValue ?? localSearch;

  const updateQuery = (value: string) => {
    if (onSearchChange) onSearchChange(value);
    else setLocalSearch(value);
  };

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (!trimmed) return;
    setMobileOpen(false);
    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
  };

  useEffect(() => {
    if (!categoriesOpen) return;
    const closeOnOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) setCategoriesOpen(false);
    };
    const closeOnEscape = (event: KeyboardEvent) => { if (event.key === "Escape") setCategoriesOpen(false); };
    document.addEventListener("mousedown", closeOnOutside);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutside);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [categoriesOpen]);

  const searchField = (
    <form className="search-box" onSubmit={submitSearch} role="search">
      <button type="submit" className="search-submit" aria-label={t.search.submit}><Search size={18} /></button>
      <input value={query} onChange={(event) => updateQuery(event.target.value)} placeholder={t.nav.search} aria-label={t.nav.search} />
      {query && <button type="button" className="search-clear" onClick={() => updateQuery("")} aria-label={t.search.clear}><X size={14} /></button>}
    </form>
  );

  return (
    <>
      <div className="topbar"><div className="container topbar-inner"><span><Truck size={15} /> {t.topbar.delivery}</span><span className="topbar-note">{t.topbar.nationwide} <b>{t.topbar.from}</b></span></div></div>
      <header className="site-header">
        <div className="container header-inner">
          <button className="mobile-menu" aria-label={t.nav.menu} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
            {mobileOpen ? <X size={22} /> : <SlidersHorizontal size={22} />}
          </button>
          <Link className="logo" href="/">RAYYAN<span>{t.nav.tagline}</span></Link>
          <nav className="desktop-nav">
            <Link href="/#hot-deals">{t.nav.products}</Link>
            <div
              className={`nav-dropdown ${categoriesOpen ? "open" : ""}`}
              ref={dropdownRef}
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                className="nav-dropdown-trigger"
                aria-expanded={categoriesOpen}
                aria-haspopup="true"
                aria-label={categoriesOpen ? t.nav.closeCategories : t.nav.openCategories}
                onClick={() => setCategoriesOpen((open) => !open)}
              >
                {t.nav.categories} <ChevronDown size={14} />
              </button>
              <div className="nav-dropdown-menu" hidden={!categoriesOpen}>
                {CATEGORIES.map((category) => (
                  <Link className="nav-dropdown-item" href={categoryHref(category.slug)} key={category.slug} onClick={() => setCategoriesOpen(false)}>
                    <strong>{categoryLabel(category.slug, language)}</strong>
                    <small>{categorySubtitle(category.slug, language)}</small>
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/#story">{t.nav.story}</Link>
          </nav>
          <div className="header-actions">
            {searchField}
            <button className="icon-button wishlist-button" aria-label={t.nav.wishlist}><Heart size={21} /><span>{formatNumber(wishlistCount, language)}</span></button>
            <button className="language-button" onClick={toggleLanguage} aria-label={t.nav.language}>{language === "bn" ? "EN" : "বাং"}</button>
            {onCartOpen
              ? <button className="cart-button" onClick={onCartOpen}><ShoppingBag size={19} /><span>{t.nav.cart}</span><b>{formatNumber(cartCount, language)}</b></button>
              : <Link className="cart-button" href="/checkout"><ShoppingBag size={19} /><span>{t.nav.cart}</span><b>{formatNumber(cartCount, language)}</b></Link>}
          </div>
        </div>
        {mobileOpen && (
          <div className="mobile-nav-panel">
            <div className="container mobile-nav-inner">
              {searchField}
              <p className="kicker">{t.categories.allLabel}</p>
              <nav className="mobile-nav-links">
                {CATEGORIES.map((category) => (
                  <Link href={categoryHref(category.slug)} key={category.slug} onClick={() => setMobileOpen(false)}>{categoryLabel(category.slug, language)}</Link>
                ))}
                <Link href="/#hot-deals" onClick={() => setMobileOpen(false)}>{t.nav.products}</Link>
                <Link href="/#story" onClick={() => setMobileOpen(false)}>{t.nav.story}</Link>
              </nav>
            </div>
          </div>
        )}
      </header>
    </>
  );
}

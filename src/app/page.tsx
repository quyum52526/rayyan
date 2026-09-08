"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight, Heart, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, Truck, X } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { useStore } from "@/lib/store";
import { formatNumber, formatPrice, localizeCategory, productTitle, useLanguage } from "@/context/LanguageContext";
import type { Product } from "@/lib/products";

const categoryMeta = [
  { slug: "powder-spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85" },
  { slug: "whole-spices", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=85" },
  { slug: "ready-to-cook", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85" },
  { slug: "combos", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=85" },
];

const heroSlideMeta = [
  { href: "/category/powder-spices", theme: "powder", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1100&q=85" },
  { href: "/category/whole-spices", theme: "whole", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=85" },
  { href: "/category/ready-to-cook", theme: "fresh", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=85" },
  { href: "/category/combos", theme: "combo", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1100&q=85" },
];

export default function Home() {
  const { products, cart, addToCart, removeFromCart } = useStore();
  const { language, toggleLanguage, t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const slide = { ...t.hero.slides[activeSlide], ...heroSlideMeta[activeSlide] };
  const categories = categoryMeta.map((meta, index) => ({ ...meta, ...t.categories.items[index] }));
  const filteredProducts = useMemo(() => products.filter((product) => `${product.name} ${product.bn} ${product.category}`.toLowerCase().includes(search.toLowerCase())), [products, search]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const freeDeliveryProgress = Math.min((total / 1000) * 100, 100);
  const addProductToCart = (product: Product) => { addToCart(product); setCartOpen(true); };
  const moveSlide = (direction: 1 | -1) => setActiveSlide((current) => (current + direction + heroSlideMeta.length) % heroSlideMeta.length);
  const activeDiscount = activeProduct ? Math.round((1 - activeProduct.price / activeProduct.oldPrice) * 100) : 0;

  useEffect(() => {
    if (isHeroHovered) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlideMeta.length), 5000);
    return () => window.clearInterval(timer);
  }, [isHeroHovered]);

  return (
    <main>
      <div className="topbar"><div className="container topbar-inner"><span><Truck size={15} /> {t.topbar.delivery}</span><span className="topbar-note">{t.topbar.nationwide} <b>{t.topbar.from}</b></span></div></div>
      <header className="site-header"><div className="container header-inner">
        <button className="mobile-menu" aria-label={t.nav.menu}><SlidersHorizontal size={22} /></button>
        <a className="logo" href="#top">RAYYAN<span>{t.nav.tagline}</span></a>
        <nav className="desktop-nav"><a href="#products">{t.nav.products}</a><a href="#categories">{t.nav.categories} <ChevronDown size={14} /></a><a href="#story">{t.nav.story}</a></nav>
        <div className="header-actions"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder={t.nav.search} aria-label={t.nav.search} /></div><button className="icon-button wishlist-button" aria-label={t.nav.wishlist}><Heart size={21} /><span>{formatNumber(liked.length, language)}</span></button><button className="language-button" onClick={toggleLanguage} aria-label={t.nav.language}>{language === "bn" ? "EN" : "বাং"}</button><button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={19} /><span>{t.nav.cart}</span><b>{formatNumber(cart.length, language)}</b></button></div>
      </div></header>

      <section className={`hero hero-carousel hero-${slide.theme}`} id="top" onMouseEnter={() => setIsHeroHovered(true)} onMouseLeave={() => setIsHeroHovered(false)} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) moveSlide(distance < 0 ? 1 : -1); touchStartX.current = null; }}>
        <div className="container carousel-inner"><div className="hero-copy carousel-copy"><div className="eyebrow"><Sparkles size={14} /> {slide.badge}</div><h1>{slide.title}</h1><p>{slide.subtitle}</p><div className="hero-actions"><a className="primary-button" href={slide.href}>{slide.button} <ArrowRight size={17} /></a><a className="text-link" href="#categories">{t.hero.categories} <ChevronRight size={16} /></a></div><div className="hero-proof"><div className="avatar-stack">{t.hero.avatars.map((initial) => <span key={initial}>{initial}</span>)}<span>+</span></div><div><strong>{t.hero.families}</strong><small>{t.hero.familiesNote}</small></div></div></div><div className="hero-art"><div className="hero-art-label"><span>RAYYAN</span><b>{formatNumber(activeSlide + 1, language).padStart(2, language === "bn" ? "০" : "0")}</b></div><div className="hero-dish"><img key={slide.image} src={slide.image} alt={slide.alt} /></div><div className="hero-stamp"><span>PURE</span><strong>{activeSlide === 2 ? t.hero.fresh : t.hero.pure}</strong><span>EST. 2024</span></div><div className="hero-leaf leaf-one">✦</div><div className="hero-leaf leaf-two">✽</div></div></div>
        <button className="carousel-arrow carousel-prev" onClick={() => moveSlide(-1)} aria-label={t.hero.previous}><ChevronRight size={22} /></button><button className="carousel-arrow carousel-next" onClick={() => moveSlide(1)} aria-label={t.hero.next}><ChevronRight size={22} /></button>
        <div className="carousel-controls" role="tablist" aria-label={t.hero.select}>{t.hero.slides.map((item, index) => <button className={`carousel-dot ${index === activeSlide ? "active" : ""}`} key={item.title} onClick={() => setActiveSlide(index)} role="tab" aria-selected={index === activeSlide} aria-label={`${formatNumber(index + 1, language)} ${t.hero.slide}`}><span /></button>)}</div>
      </section>

      <section className="trust-strip"><div className="container trust-grid">{t.trust.map((item, index) => <div key={item.title}><span className="trust-icon">{["✦", "♧", "❋", "৳"][index]}</span><span><b>{item.title}</b><small>{item.note}</small></span></div>)}</div></section>

      <section className="section container" id="categories"><div className="section-heading"><div><p className="kicker">{t.categories.kicker}</p><h2>{t.categories.heading}</h2></div><a className="view-all" href="#products">{t.categories.viewAll} <ArrowRight size={15} /></a></div><div className="category-grid">{categories.map((category) => <Link className="category-card group" href={`/category/${category.slug}`} key={category.slug}><img src={category.image} alt={category.alt} /><span className="category-overlay" /><div className="category-content"><h3>{category.label}</h3><p>{category.count}</p></div><span className="category-arrow"><ArrowRight size={18} /></span></Link>)}</div></section>

      <section className="offer-banner"><div className="container offer-inner"><div className="offer-spark">✹</div><div><p>{t.offer.kicker}</p><h2>{t.offer.headingBefore}<strong>{t.offer.headingHighlight}</strong></h2></div><div className="offer-timer"><span>{t.offer.timerLabel}</span><b>{t.offer.timerValue}</b></div><a className="dark-button" href="#products">{t.offer.cta} <ArrowRight size={16} /></a></div></section>

      <section className="section container products-section" id="products"><div className="section-heading"><div><p className="kicker">{t.products.kicker}</p><h2>{t.products.heading}</h2></div><div className="product-tabs">{t.products.tabs.map((tab, index) => <button className={activeProductTab === index ? "active" : ""} onClick={() => setActiveProductTab(index)} key={tab}>{tab}</button>)}</div></div><div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} liked={liked.includes(product.id)} onToggleWishlist={() => setLiked((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} onAddToCart={() => addProductToCart(product)} onQuickView={() => { setActiveProduct(product); setQuantity(1); }} />)}</div></section>

      <section className="story-section" id="story"><div className="container story-grid"><div className="story-image"><img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85" alt={t.story.imageAlt} /><div className="story-badge"><strong>{t.story.badgeNumber}</strong><span>{t.story.badgeText}</span></div></div><div className="story-copy"><p className="kicker">{t.story.kicker}</p><h2>{t.story.headingTop}<br /><em>{t.story.headingEm}</em></h2><p>{t.story.body}</p><div className="story-points">{t.story.points.map((point) => <span key={point}><Check size={15} /> {point}</span>)}</div><a className="text-link" href="#top">{t.story.cta} <ArrowRight size={16} /></a></div></div></section>

      <footer><div className="container footer-inner"><div className="logo">RAYYAN<span>{t.footer.tagline}</span></div><p>{t.footer.line}</p><span>{t.footer.copyright}</span></div></footer>

      {activeProduct && <div className="modal-backdrop" onClick={() => setActiveProduct(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setActiveProduct(null)} aria-label={t.modal.close}><X size={20} /></button><ProductGallery productName={productTitle(activeProduct, language)} frontImage={activeProduct.image} detailImage={activeProduct.image2 || activeProduct.image} videoSrc={activeProduct.video} /><div className="modal-details"><div className="rating"><Star size={13} fill="currentColor" /> {formatNumber(activeProduct.rating, language)} <span>({formatNumber(activeProduct.reviews, language)} {t.modal.reviews})</span></div><h2>{productTitle(activeProduct, language)}</h2><p className="modal-en">{language === "en" ? activeProduct.bn : activeProduct.name}</p><div className="variant-label">{t.modal.chooseWeight} <span>SKU: {activeProduct.sku || `RY-${activeProduct.id}01`}</span></div><div className="variants">{t.modal.variants.map((variant, index) => <button className={index === 1 ? "selected" : ""} key={variant}>{variant}</button>)}</div><div className="modal-price"><strong>{formatPrice(activeProduct.price, language)}</strong><del>{formatPrice(activeProduct.oldPrice, language)}</del><span>-{formatNumber(activeDiscount, language)}% {t.modal.off}</span></div><div className="quantity-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><b>{formatNumber(quantity, language)}</b><button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="primary-button modal-add" onClick={() => { addProductToCart(activeProduct); setActiveProduct(null); }}>{t.modal.addToCart} <ShoppingBag size={17} /></button></div><div className="modal-note"><Truck size={15} /> {t.modal.deliveryNote} <span>{t.modal.inStock}</span></div></div></div></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="kicker">{t.cart.kicker}</p><h2>{t.cart.title} <span>({formatNumber(cart.length, language)})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label={t.cart.close}><X size={20} /></button></div><div className="free-shipping"><div><Truck size={16} /><span>{total >= 1000 ? t.cart.freeDelivery : t.cart.freeDeliveryRemaining.replace("{amount}", formatPrice(1000 - total, language))}</span></div><div className="progress"><i style={{ width: `${freeDeliveryProgress}%` }} /></div></div><div className="drawer-items">{cart.map((item, index) => <div className="drawer-item" key={`${item.id}-${index}`}><img src={item.image} alt={productTitle(item, language)} /><div><h3>{productTitle(item, language)}</h3><p>{t.cart.defaultWeight}</p><strong>{formatPrice(item.price, language)}</strong></div><button onClick={() => removeFromCart(index)} aria-label={t.cart.removeItem}><X size={15} /></button></div>)}</div><div className="drawer-footer"><div><span>{t.cart.subtotal}</span><strong>{formatPrice(total, language)}</strong></div><p>{t.cart.deliveryNote}</p><button className="primary-button checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>{t.cart.checkout} <ArrowRight size={17} /></button></div></aside></div>}
      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setCheckoutOpen(false)} aria-label={t.modal.close}><X size={20} /></button><div className="checkout-form"><p className="kicker">{t.checkout.kicker}</p><h2>{t.checkout.heading}</h2><p className="checkout-intro">{t.checkout.intro}</p><label>{t.checkout.name}<input placeholder={t.checkout.namePlaceholder} /></label><label>{t.checkout.phone}<input placeholder={t.checkout.phonePlaceholder} /></label><label>{t.checkout.address}<textarea placeholder={t.checkout.addressPlaceholder} rows={3} /></label><label>{t.checkout.zone}<select><option>{t.checkout.zoneInside}</option><option>{t.checkout.zoneOutside}</option></select></label><h3>{t.checkout.paymentHeading}</h3><div className="payment-option"><Check size={16} /> {t.checkout.cod} <span>{t.checkout.selected}</span></div><button className="primary-button place-order" onClick={() => { setCheckoutOpen(false); window.alert(t.checkout.orderPlacedAlert); }}>{t.checkout.placeOrder} <ArrowRight size={17} /></button></div><div className="checkout-summary"><p className="kicker">{t.checkout.summaryKicker}</p><h2>{t.checkout.summaryHeading}</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><span>{productTitle(item, language)}<small>{t.cart.defaultWeight} × {formatNumber(1, language)}</small></span><b>{formatPrice(item.price, language)}</b></div>)}<div className="summary-line"><span>{t.checkout.subtotal}</span><b>{formatPrice(total, language)}</b></div><div className="summary-line"><span>{t.checkout.delivery}</span><b>{formatPrice(60, language)}</b></div><div className="summary-total"><span>{t.checkout.grandTotal}</span><strong>{formatPrice(total + 60, language)}</strong></div><div className="secure-note"><Check size={15} /> {t.checkout.secureNote}</div></div></div></div>}
    </main>
  );
}

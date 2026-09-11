"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronRight, Minus, Plus, Search, ShoppingBag, Sparkles, Star, Truck, X } from "lucide-react";
import CategoryShelf from "@/components/CategoryShelf";
import Navbar from "@/components/Navbar";
import ProductGallery from "@/components/ProductGallery";
import ProductGrid from "@/components/ProductGrid";
import PaymentMethodFields from "@/components/PaymentMethodFields";
import SiteFooter from "@/components/SiteFooter";
import Link from "next/link";
import { requiresTransactionId, type PaymentMethod } from "@/lib/payment";
import { useStore } from "@/lib/store";
import { formatNumber, formatPrice, productTitle, useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, categoryAlt, categoryHref, categoryLabel, type CategorySlug } from "@/lib/categories";
import { isHotDeal, matchesQuery, type Product } from "@/lib/products";

// Positional match to t.products.tabs. null means "no category filter".
const productTabCategories: (CategorySlug[] | null)[] = [
  null,
  ["basic-spices", "aromatics-powder"],
  ["ready-to-cook"],
];

// Positional match to t.hero.slides. `theme` picks the hero-<theme> palette in globals.css.
const heroSlideMeta: { slug: CategorySlug; theme: string; image: string }[] = [
  { slug: "basic-spices", theme: "powder", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1100&q=85" },
  { slug: "aromatics-powder", theme: "whole", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=85" },
  { slug: "ready-to-cook", theme: "fresh", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=85" },
  { slug: "wellness-drinks", theme: "combo", image: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1100&q=85" },
];

export default function Home() {
  const { products, catalogReady, cart, addToCart, removeFromCart, createOrder } = useStore();
  const { language, t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutZone, setCheckoutZone] = useState<"inside" | "outside">("inside");
  const [checkoutPayment, setCheckoutPayment] = useState<PaymentMethod>("cod");
  const [checkoutTransactionId, setCheckoutTransactionId] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
  const touchStartX = useRef<number | null>(null);
  const slide = { ...t.hero.slides[activeSlide], ...heroSlideMeta[activeSlide] };
  // Weekly hot deals drive the top shelf. Until products carry the flag the shelf keeps
  // showing the whole catalog rather than going blank.
  const hotDealProducts = useMemo(() => {
    const flagged = products.filter(isHotDeal);
    return flagged.length > 0 ? flagged : products;
  }, [products]);
  const filteredProducts = useMemo(() => {
    const allowedCategories = productTabCategories[activeProductTab];
    return hotDealProducts.filter((product) => {
      const matchesTab = !allowedCategories || allowedCategories.includes(product.category as CategorySlug);
      return matchesQuery(product, search) && matchesTab;
    });
  }, [hotDealProducts, search, activeProductTab]);
  // Each category keeps its own full list for the count and the first four for the shelf.
  const categoryShelves = useMemo(() => CATEGORIES.map((category) => {
    const matches = products.filter((product) => product.category === category.slug);
    return { slug: category.slug, products: matches.slice(0, 4), totalCount: matches.length };
  }), [products]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const freeDeliveryProgress = Math.min((total / 1000) * 100, 100);
  const addProductToCart = (product: Product) => { addToCart(product); setCartOpen(true); };
  const cardHandlers = {
    likedIds: liked,
    onToggleWishlist: (id: number) => setLiked((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]),
    onAddToCart: addProductToCart,
    onQuickView: (product: Product) => { setActiveProduct(product); setQuantity(1); },
  };
  const moveSlide = (direction: 1 | -1) => setActiveSlide((current) => (current + direction + heroSlideMeta.length) % heroSlideMeta.length);
  const activeDiscount = activeProduct ? Math.round((1 - activeProduct.price / activeProduct.oldPrice) * 100) : 0;
  const checkoutDeliveryFee = checkoutZone === "inside" ? 60 : 120;
  const checkoutGrandTotal = total + checkoutDeliveryFee;
  const checkoutNeedsTransactionId = requiresTransactionId(checkoutPayment);

  const selectCheckoutPayment = (method: PaymentMethod) => {
    setCheckoutPayment(method);
    setCheckoutError("");
    if (!requiresTransactionId(method)) setCheckoutTransactionId("");
  };

  const placeModalOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return;

    const trimmedTransactionId = checkoutTransactionId.trim();
    if (checkoutNeedsTransactionId && !trimmedTransactionId) {
      setCheckoutError(t.payment.trxRequired);
      return;
    }

    const paymentSummary = checkoutNeedsTransactionId
      ? t.payment.digitalSummary.replace("{trx}", trimmedTransactionId)
      : t.payment.codSummary.replace("{amount}", formatPrice(checkoutGrandTotal, language));

    createOrder({
      customerName: checkoutName,
      phone: checkoutPhone,
      address: checkoutAddress,
      zone: checkoutZone,
      paymentMethod: checkoutPayment,
      ...(checkoutNeedsTransactionId ? { transactionId: trimmedTransactionId } : {}),
      items: cart,
      subtotal: total,
      deliveryFee: checkoutDeliveryFee,
      grandTotal: checkoutGrandTotal,
    });

    setCheckoutError("");
    setCheckoutOpen(false);
    setCheckoutName(""); setCheckoutPhone(""); setCheckoutAddress("");
    setCheckoutPayment("cod"); setCheckoutTransactionId("");
    window.alert(`${t.checkout.orderPlacedAlert}

${t.payment.summaryLabel}: ${t.payment.methods[checkoutPayment]}
${paymentSummary}`);
  };

  useEffect(() => {
    if (isHeroHovered) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlideMeta.length), 5000);
    return () => window.clearInterval(timer);
  }, [isHeroHovered]);

  return (
    <main>
      <Navbar searchValue={search} onSearchChange={setSearch} wishlistCount={liked.length} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <section className={`hero hero-carousel hero-${slide.theme}`} id="top" onMouseEnter={() => setIsHeroHovered(true)} onMouseLeave={() => setIsHeroHovered(false)} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) moveSlide(distance < 0 ? 1 : -1); touchStartX.current = null; }}>
        <div className="container carousel-inner"><div className="hero-copy carousel-copy"><div className="eyebrow"><Sparkles size={14} /> {slide.badge}</div><h1>{slide.title}</h1><p>{slide.subtitle}</p><div className="hero-actions"><Link className="primary-button" href={categoryHref(slide.slug)}>{slide.button} <ArrowRight size={17} /></Link><a className="text-link" href="#categories">{t.hero.categories} <ChevronRight size={16} /></a></div><div className="hero-proof"><div className="avatar-stack">{t.hero.avatars.map((initial) => <span key={initial}>{initial}</span>)}<span>+</span></div><div><strong>{t.hero.families}</strong><small>{t.hero.familiesNote}</small></div></div></div><div className="hero-art"><div className="hero-art-label"><span>RAYYAN</span><b>{formatNumber(activeSlide + 1, language).padStart(2, language === "bn" ? "০" : "0")}</b></div><div className="hero-dish"><img key={slide.image} src={slide.image} alt={slide.alt} /></div><div className="hero-stamp"><span>PURE</span><strong>{activeSlide === 2 ? t.hero.fresh : t.hero.pure}</strong><span>EST. 2024</span></div><div className="hero-leaf leaf-one">✦</div><div className="hero-leaf leaf-two">✽</div></div></div>
        <button className="carousel-arrow carousel-prev" onClick={() => moveSlide(-1)} aria-label={t.hero.previous}><ChevronRight size={22} /></button><button className="carousel-arrow carousel-next" onClick={() => moveSlide(1)} aria-label={t.hero.next}><ChevronRight size={22} /></button>
        <div className="carousel-controls" role="tablist" aria-label={t.hero.select}>{t.hero.slides.map((item, index) => <button className={`carousel-dot ${index === activeSlide ? "active" : ""}`} key={item.title} onClick={() => setActiveSlide(index)} role="tab" aria-selected={index === activeSlide} aria-label={`${formatNumber(index + 1, language)} ${t.hero.slide}`}><span /></button>)}</div>
      </section>

      <section className="trust-strip"><div className="container trust-grid">{t.trust.map((item, index) => <div key={item.title}><span className="trust-icon">{["✦", "♧", "❋", "৳"][index]}</span><span><b>{item.title}</b><small>{item.note}</small></span></div>)}</div></section>

      <section className="section container" id="categories">
        <div className="section-heading"><div><p className="kicker">{t.categories.kicker}</p><h2>{t.categories.heading}</h2></div><a className="view-all" href="#hot-deals">{t.categories.viewAll} <ArrowRight size={15} /></a></div>
        <div className="category-grid">{CATEGORIES.map((category) => {
          const count = products.filter((product) => product.category === category.slug).length;
          return <Link className="category-card group" href={categoryHref(category.slug)} key={category.slug}><img src={category.banner} alt={categoryAlt(category.slug, language)} /><span className="category-overlay" /><div className="category-content"><h3>{categoryLabel(category.slug, language)}</h3><p>{t.categories.countLabel.replace("{count}", formatNumber(count, language))}</p></div><span className="category-arrow"><ArrowRight size={18} /></span></Link>;
        })}</div>
      </section>

      <section className="offer-banner"><div className="container offer-inner"><div className="offer-spark">✹</div><div><p>{t.offer.kicker}</p><h2>{t.offer.headingBefore}<strong>{t.offer.headingHighlight}</strong></h2></div><div className="offer-timer"><span>{t.offer.timerLabel}</span><b>{t.offer.timerValue}</b></div><a className="dark-button" href="#hot-deals">{t.offer.cta} <ArrowRight size={16} /></a></div></section>

      <section className="section container products-section" id="hot-deals">
        <div className="section-heading"><div><p className="kicker">{t.products.kicker}</p><h2>{t.products.heading}</h2></div><div className="product-tabs">{t.products.tabs.map((tab, index) => <button className={activeProductTab === index ? "active" : ""} onClick={() => setActiveProductTab(index)} key={tab}>{tab}</button>)}</div></div>
        {filteredProducts.length === 0
          ? !catalogReady ? null : <div className="empty-state"><Search size={26} /><h3>{t.products.emptyTitle}</h3><p>{t.products.emptyBody}</p></div>
          : <ProductGrid products={filteredProducts} {...cardHandlers} />}
      </section>

      {categoryShelves.map((shelf) => <CategoryShelf key={shelf.slug} slug={shelf.slug} products={shelf.products} totalCount={shelf.totalCount} catalogReady={catalogReady} {...cardHandlers} />)}

      <section className="story-section" id="story"><div className="container story-grid"><div className="story-image"><img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85" alt={t.story.imageAlt} /><div className="story-badge"><strong>{t.story.badgeNumber}</strong><span>{t.story.badgeText}</span></div></div><div className="story-copy"><p className="kicker">{t.story.kicker}</p><h2>{t.story.headingTop}<br /><em>{t.story.headingEm}</em></h2><p>{t.story.body}</p><div className="story-points">{t.story.points.map((point) => <span key={point}><Check size={15} /> {point}</span>)}</div><a className="text-link" href="#top">{t.story.cta} <ArrowRight size={16} /></a></div></div></section>

      <SiteFooter />

      {activeProduct && <div className="modal-backdrop" onClick={() => setActiveProduct(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setActiveProduct(null)} aria-label={t.modal.close}><X size={20} /></button><ProductGallery productName={productTitle(activeProduct, language)} frontImage={activeProduct.image} detailImage={activeProduct.image2 || activeProduct.image} videoSrc={activeProduct.video} /><div className="modal-details"><div className="rating"><Star size={13} fill="currentColor" /> {formatNumber(activeProduct.rating, language)} <span>({formatNumber(activeProduct.reviews, language)} {t.modal.reviews})</span></div><h2>{productTitle(activeProduct, language)}</h2><p className="modal-en">{language === "en" ? activeProduct.bn : activeProduct.name}</p><div className="variant-label">{t.modal.chooseWeight} <span>SKU: {activeProduct.sku || `RY-${activeProduct.id}01`}</span></div><div className="variants">{t.modal.variants.map((variant, index) => <button className={index === 1 ? "selected" : ""} key={variant}>{variant}</button>)}</div><div className="modal-price"><strong>{formatPrice(activeProduct.price, language)}</strong><del>{formatPrice(activeProduct.oldPrice, language)}</del><span>-{formatNumber(activeDiscount, language)}% {t.modal.off}</span></div><div className="quantity-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><b>{formatNumber(quantity, language)}</b><button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="primary-button modal-add" onClick={() => { addProductToCart(activeProduct); setActiveProduct(null); }}>{t.modal.addToCart} <ShoppingBag size={17} /></button></div><div className="modal-note"><Truck size={15} /> {t.modal.deliveryNote} <span>{t.modal.inStock}</span></div></div></div></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="kicker">{t.cart.kicker}</p><h2>{t.cart.title} <span>({formatNumber(cart.length, language)})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label={t.cart.close}><X size={20} /></button></div><div className="free-shipping"><div><Truck size={16} /><span>{total >= 1000 ? t.cart.freeDelivery : t.cart.freeDeliveryRemaining.replace("{amount}", formatPrice(1000 - total, language))}</span></div><div className="progress"><i style={{ width: `${freeDeliveryProgress}%` }} /></div></div><div className="drawer-items">{cart.map((item, index) => <div className="drawer-item" key={`${item.id}-${index}`}><img src={item.image} alt={productTitle(item, language)} /><div><h3>{productTitle(item, language)}</h3><p>{t.cart.defaultWeight}</p><strong>{formatPrice(item.price, language)}</strong></div><button onClick={() => removeFromCart(index)} aria-label={t.cart.removeItem}><X size={15} /></button></div>)}</div><div className="drawer-footer"><div><span>{t.cart.subtotal}</span><strong>{formatPrice(total, language)}</strong></div><p>{t.cart.deliveryNote}</p><button className="primary-button checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>{t.cart.checkout} <ArrowRight size={17} /></button></div></aside></div>}
      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setCheckoutOpen(false)} aria-label={t.modal.close}><X size={20} /></button><form className="checkout-form" onSubmit={placeModalOrder}><p className="kicker">{t.checkout.kicker}</p><h2>{t.checkout.heading}</h2><p className="checkout-intro">{t.checkout.intro}</p><label>{t.checkout.name}<input required value={checkoutName} onChange={(event) => setCheckoutName(event.target.value)} placeholder={t.checkout.namePlaceholder} /></label><label>{t.checkout.phone}<input required value={checkoutPhone} onChange={(event) => setCheckoutPhone(event.target.value)} placeholder={t.checkout.phonePlaceholder} /></label><label>{t.checkout.address}<textarea required value={checkoutAddress} onChange={(event) => setCheckoutAddress(event.target.value)} placeholder={t.checkout.addressPlaceholder} rows={3} /></label><label>{t.checkout.zone}<select value={checkoutZone} onChange={(event) => setCheckoutZone(event.target.value as "inside" | "outside")}><option value="inside">{t.checkout.zoneInside}</option><option value="outside">{t.checkout.zoneOutside}</option></select></label><h3>{t.payment.heading}</h3><PaymentMethodFields value={checkoutPayment} onChange={selectCheckoutPayment} transactionId={checkoutTransactionId} onTransactionIdChange={(next) => { setCheckoutTransactionId(next); setCheckoutError(""); }} amount={checkoutGrandTotal} error={checkoutError} name="homeModalPayment" /><button className="primary-button place-order" disabled={!cart.length}>{cart.length ? t.checkout.placeOrder : t.checkout.emptyCart} <ArrowRight size={17} /></button></form><div className="checkout-summary"><p className="kicker">{t.checkout.summaryKicker}</p><h2>{t.checkout.summaryHeading}</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><span>{productTitle(item, language)}<small>{t.cart.defaultWeight} × {formatNumber(1, language)}</small></span><b>{formatPrice(item.price, language)}</b></div>)}<div className="summary-line"><span>{t.checkout.subtotal}</span><b>{formatPrice(total, language)}</b></div><div className="summary-line"><span>{t.checkout.delivery}</span><b>{formatPrice(checkoutDeliveryFee, language)}</b></div><div className="summary-line"><span>{t.payment.summaryLabel}</span><b>{t.payment.methods[checkoutPayment]}</b></div><div className="summary-total"><span>{t.checkout.grandTotal}</span><strong>{formatPrice(checkoutGrandTotal, language)}</strong></div><div className="secure-note"><Check size={15} /> {t.checkout.secureNote}</div></div></div></div>}
    </main>
  );
}

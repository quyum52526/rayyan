"use client";

import { useMemo, useState } from "react";
import { ArrowRight, Check, Search, Truck, X } from "lucide-react";
import CategoryDeckCarousel from "@/components/CategoryDeckCarousel";
import CategoryShelf from "@/components/CategoryShelf";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import ProductGrid from "@/components/ProductGrid";
import ProductQuickView from "@/components/ProductQuickView";
import PaymentMethodFields from "@/components/PaymentMethodFields";
import SiteFooter from "@/components/SiteFooter";
import StoryCollage from "@/components/StoryCollage";
import { requiresTransactionId, type PaymentMethod } from "@/lib/payment";
import { cartAddition, useStore } from "@/lib/store";
import { formatNumber, formatPrice, productTitle, useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, type CategorySlug } from "@/lib/categories";
import { isHotDeal, matchesQuery, type Product } from "@/lib/products";

// Positional match to t.products.tabs. null means "no category filter".
const productTabCategories: (CategorySlug[] | null)[] = [
  null,
  ["basic-spices", "aromatics-powder"],
  ["ready-to-cook"],
];

export default function Home() {
  const { products, catalogReady, cart, addToCart, removeFromCart, createOrder } = useStore();
  const { language, t } = useLanguage();
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [activeProductTab, setActiveProductTab] = useState(0);
  const [checkoutName, setCheckoutName] = useState("");
  const [checkoutPhone, setCheckoutPhone] = useState("");
  const [checkoutAddress, setCheckoutAddress] = useState("");
  const [checkoutZone, setCheckoutZone] = useState<"inside" | "outside">("inside");
  const [checkoutPayment, setCheckoutPayment] = useState<PaymentMethod>("cod");
  const [checkoutTransactionId, setCheckoutTransactionId] = useState("");
  const [checkoutError, setCheckoutError] = useState("");
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
  const addProductToCart = (product: Product) => { addToCart(cartAddition(product)); setCartOpen(true); };
  const cardHandlers = {
    likedIds: liked,
    onToggleWishlist: (id: number) => setLiked((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id]),
    onAddToCart: addProductToCart,
    onQuickView: (product: Product) => setActiveProduct(product),
  };
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

  return (
    <main>
      <Navbar searchValue={search} onSearchChange={setSearch} wishlistCount={liked.length} cartCount={cart.length} onCartOpen={() => setCartOpen(true)} />

      <Hero products={products} />

      <section className="section categories-section" id="categories"><div className="container">
        <div className="section-heading"><div><p className="kicker">{t.categories.kicker}</p><h2>{t.categories.heading}</h2></div><a className="view-all" href="#hot-deals">{t.categories.viewAll} <ArrowRight size={15} /></a></div>
        <CategoryDeckCarousel products={products} />
      </div></section>

      <section className="trust-strip"><div className="container trust-grid">{t.trust.map((item, index) => <div key={item.title}><span className="trust-icon">{["✦", "♧", "❋", "৳"][index]}</span><span><b>{item.title}</b><small>{item.note}</small></span></div>)}</div></section>

      <section className="offer-section"><div className="container"><div className="offer-banner offer-inner"><div className="offer-spark">✹</div><div><p>{t.offer.kicker}</p><h2>{t.offer.headingBefore}<strong>{t.offer.headingHighlight}</strong></h2></div><div className="offer-timer"><span>{t.offer.timerLabel}</span><b>{t.offer.timerValue}</b></div><a className="dark-button" href="#hot-deals">{t.offer.cta} <ArrowRight size={16} /></a></div></div></section>

      <section className="section products-section" id="hot-deals"><div className="container">
        <div className="section-heading"><div><p className="kicker">{t.products.kicker}</p><h2>{t.products.heading}</h2></div><div className="product-tabs">{t.products.tabs.map((tab, index) => <button className={activeProductTab === index ? "active" : ""} onClick={() => setActiveProductTab(index)} key={tab}>{tab}</button>)}</div></div>
        {filteredProducts.length === 0
          ? !catalogReady ? null : <div className="empty-state"><Search size={26} /><h3>{t.products.emptyTitle}</h3><p>{t.products.emptyBody}</p></div>
          : <ProductGrid products={filteredProducts} {...cardHandlers} />}
      </div></section>

      {categoryShelves.map((shelf) => <CategoryShelf key={shelf.slug} slug={shelf.slug} products={shelf.products} totalCount={shelf.totalCount} catalogReady={catalogReady} {...cardHandlers} />)}

      <section className="story-section" id="story"><div className="container story-grid"><StoryCollage label={t.story.imageAlt} badgeNumber={t.story.badgeNumber} badgeText={t.story.badgeText} /><div className="story-copy"><p className="kicker">{t.story.kicker}</p><h2>{t.story.headingTop}<br /><em>{t.story.headingEm}</em></h2><p>{t.story.body}</p><div className="story-points">{t.story.points.map((point) => <span key={point}><Check size={15} /> {point}</span>)}</div><a className="text-link" href="#top">{t.story.cta} <ArrowRight size={16} /></a></div></div></section>

      <SiteFooter />

      {activeProduct && <ProductQuickView key={activeProduct.id} product={activeProduct} onClose={() => setActiveProduct(null)} onAddToCart={(addition) => { addToCart(addition); setActiveProduct(null); setCartOpen(true); }} />}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="kicker">{t.cart.kicker}</p><h2>{t.cart.title} <span>({formatNumber(cart.length, language)})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label={t.cart.close}><X size={20} /></button></div><div className="free-shipping"><div><Truck size={16} /><span>{total >= 1000 ? t.cart.freeDelivery : t.cart.freeDeliveryRemaining.replace("{amount}", formatPrice(1000 - total, language))}</span></div><div className="progress"><i style={{ width: `${freeDeliveryProgress}%` }} /></div></div><div className="drawer-items">{cart.map((item, index) => <div className="drawer-item" key={`${item.id}-${index}`}><img src={item.image} alt={productTitle(item, language)} /><div><h3>{productTitle(item, language)}</h3><p>{item.variant || t.cart.defaultWeight}</p><strong>{formatPrice(item.price, language)}</strong></div><button onClick={() => removeFromCart(index)} aria-label={t.cart.removeItem}><X size={15} /></button></div>)}</div><div className="drawer-footer"><div><span>{t.cart.subtotal}</span><strong>{formatPrice(total, language)}</strong></div><p>{t.cart.deliveryNote}</p><button className="primary-button checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>{t.cart.checkout} <ArrowRight size={17} /></button></div></aside></div>}
      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setCheckoutOpen(false)} aria-label={t.modal.close}><X size={20} /></button><form className="checkout-form" onSubmit={placeModalOrder}><p className="kicker">{t.checkout.kicker}</p><h2>{t.checkout.heading}</h2><p className="checkout-intro">{t.checkout.intro}</p><label>{t.checkout.name}<input required value={checkoutName} onChange={(event) => setCheckoutName(event.target.value)} placeholder={t.checkout.namePlaceholder} /></label><label>{t.checkout.phone}<input required value={checkoutPhone} onChange={(event) => setCheckoutPhone(event.target.value)} placeholder={t.checkout.phonePlaceholder} /></label><label>{t.checkout.address}<textarea required value={checkoutAddress} onChange={(event) => setCheckoutAddress(event.target.value)} placeholder={t.checkout.addressPlaceholder} rows={3} /></label><label>{t.checkout.zone}<select value={checkoutZone} onChange={(event) => setCheckoutZone(event.target.value as "inside" | "outside")}><option value="inside">{t.checkout.zoneInside}</option><option value="outside">{t.checkout.zoneOutside}</option></select></label><h3>{t.payment.heading}</h3><PaymentMethodFields value={checkoutPayment} onChange={selectCheckoutPayment} transactionId={checkoutTransactionId} onTransactionIdChange={(next) => { setCheckoutTransactionId(next); setCheckoutError(""); }} amount={checkoutGrandTotal} error={checkoutError} name="homeModalPayment" /><button className="primary-button place-order" disabled={!cart.length}>{cart.length ? t.checkout.placeOrder : t.checkout.emptyCart} <ArrowRight size={17} /></button></form><div className="checkout-summary"><p className="kicker">{t.checkout.summaryKicker}</p><h2>{t.checkout.summaryHeading}</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><span>{productTitle(item, language)}<small>{item.variant || t.cart.defaultWeight} × {formatNumber(1, language)}</small></span><b>{formatPrice(item.price, language)}</b></div>)}<div className="summary-line"><span>{t.checkout.subtotal}</span><b>{formatPrice(total, language)}</b></div><div className="summary-line"><span>{t.checkout.delivery}</span><b>{formatPrice(checkoutDeliveryFee, language)}</b></div><div className="summary-line"><span>{t.payment.summaryLabel}</span><b>{t.payment.methods[checkoutPayment]}</b></div><div className="summary-total"><span>{t.checkout.grandTotal}</span><strong>{formatPrice(checkoutGrandTotal, language)}</strong></div><div className="secure-note"><Check size={15} /> {t.checkout.secureNote}</div></div></div></div>}
    </main>
  );
}

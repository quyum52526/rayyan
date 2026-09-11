"use client";

import { ArrowLeft, ArrowRight, Check, ChevronRight, Minus, Plus, ShoppingBag, Star, Truck, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import { formatNumber, formatPrice, localizeCategory, productTitle, useLanguage } from "@/context/LanguageContext";
import { categoryHref, resolveCategorySlug } from "@/lib/categories";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const { language, t } = useLanguage();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "nutrition" | "storage">("description");
  const [cartOpen, setCartOpen] = useState(false);
  const [variantIndex, setVariantIndex] = useState(1);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const total = product.price * quantity;
  const title = productTitle(product, language);
  const secondaryTitle = language === "en" ? product.bn : product.name;

  const tabs = [
    { id: "description" as const, label: t.pdp.tabs.description },
    { id: "nutrition" as const, label: t.pdp.tabs.nutrition },
    { id: "storage" as const, label: t.pdp.tabs.storage },
  ];

  const detail = {
    description: product.description,
    nutrition: product.nutrition,
    storage: product.storageInstructions,
  };

  return (
    <main className="pdp-page">
      <header className="pdp-header"><div className="container pdp-header-inner"><Link className="pdp-back" href="/"><ArrowLeft size={17} /> {t.pdp.back}</Link><Link className="logo" href="/">RAYYAN<span>{t.nav.tagline}</span></Link><button className="pdp-cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={18} /> {t.pdp.cart} <b>{formatNumber(quantity, language)}</b></button></div></header>
      <div className="container pdp-breadcrumb"><Link href="/">{t.pdp.home}</Link><ChevronRight size={14} /><Link href={categoryHref(resolveCategorySlug(product.category))}>{localizeCategory(product.category, language)}</Link><ChevronRight size={14} /><span>{title}</span></div>
      <section className="container pdp-layout">
        <ProductGallery productName={title} frontImage={product.image} detailImage={product.image2 || product.image} videoSrc={product.video} />
        <div className="pdp-details">
          <span className="pdp-kicker">{t.card.kicker} · {localizeCategory(product.category, language)}</span>
          <h1>{title}</h1><p className="pdp-english">{secondaryTitle}</p>
          <div className="pdp-rating"><span><Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /></span><b>{formatNumber(product.rating, language)}</b><em>({formatNumber(product.reviews, language)} {t.pdp.reviews})</em><strong><i /> {t.pdp.inStock}</strong></div>
          <div className="pdp-price"><strong>{formatPrice(product.price, language)}</strong><del>{formatPrice(product.oldPrice, language)}</del><span>-{formatNumber(discount, language)}% {t.pdp.off}</span></div>
          <div className="pdp-divider" />
          <div className="variant-section"><div className="variant-heading"><b>{t.pdp.weightHeading}</b><span>SKU: RY-{product.id}01</span></div><div className="pdp-variants">{t.pdp.variants.map((variant, index) => <button className={variantIndex === index ? "selected" : ""} onClick={() => setVariantIndex(index)} key={variant}>{variant}</button>)}</div></div>
          <div className="pdp-buy-row"><div className="pdp-quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label={t.pdp.decrease}><Minus size={15} /></button><b>{formatNumber(quantity, language)}</b><button onClick={() => setQuantity(quantity + 1)} aria-label={t.pdp.increase}><Plus size={15} /></button></div><button className="pdp-add-button" onClick={() => { for (let index = 0; index < quantity; index += 1) addToCart(product); setCartOpen(true); }}><ShoppingBag size={18} /> {t.pdp.addToCart}</button></div>
          <Link className="pdp-buy-now" href="/checkout">{t.pdp.buyNow} <ArrowRight size={18} /></Link>
          <div className="pdp-delivery"><Truck size={18} /><span><b>{t.pdp.deliveryTitle}</b><small>{t.pdp.deliveryNote}</small></span></div>
          <div className="pdp-trust-row">{t.pdp.trustRow.map((item) => <span key={item}><Check size={14} /> {item}</span>)}</div>
          <div className="pdp-info-tabs"><div className="pdp-tab-list" role="tablist">{tabs.map((tab) => <button className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id} key={tab.id}>{tab.label}</button>)}</div><div className="pdp-tab-panel" role="tabpanel"><p>{detail[activeTab] || t.pdp.tabEmpty}</p></div></div>
        </div>
      </section>
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="kicker">{t.cart.kicker}</p><h2>{t.cart.title} <span>({formatNumber(quantity, language)})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label={t.cart.close}><X size={20} /></button></div><div className="drawer-items"><div className="drawer-item"><img src={product.image} alt={title} /><div><h3>{title}</h3><p>{t.pdp.variants[variantIndex]} × {formatNumber(quantity, language)}</p><strong>{formatPrice(total, language)}</strong></div></div></div><div className="drawer-footer"><div><span>{t.cart.subtotal}</span><strong>{formatPrice(total, language)}</strong></div><p>{t.cart.deliveryNote}</p><Link className="primary-button checkout-button" href="/checkout">{t.cart.checkout} <ArrowRight size={17} /></Link></div></aside></div>}
    </main>
  );
}

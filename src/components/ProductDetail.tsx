"use client";

import { ArrowLeft, ArrowRight, Check, ChevronRight, Minus, Plus, ShoppingBag, Star, Truck, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import type { Product } from "@/lib/products";
import { useStore } from "@/lib/store";

const tabs = [
  { id: "description", label: "বিবরণ" },
  { id: "nutrition", label: "পুষ্টি ও উপাদান" },
  { id: "storage", label: "সংরক্ষণ পদ্ধতি" },
];

function bengaliPrice(value: number) {
  return value.toLocaleString("bn-BD");
}

export default function ProductDetail({ product }: { product: Product }) {
  const { addToCart } = useStore();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState("description");
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState("২৫০ গ্রাম");
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const total = product.price * quantity;

  const detail = {
    description: product.description,
    nutrition: product.nutrition,
    storage: product.storageInstructions,
  };

  return (
    <main className="pdp-page">
      <header className="pdp-header"><div className="container pdp-header-inner"><Link className="pdp-back" href="/"><ArrowLeft size={17} /> শপিং চালিয়ে যান</Link><Link className="logo" href="/">RAYYAN<span>রসনায় বিশুদ্ধতা</span></Link><button className="pdp-cart-trigger" onClick={() => setCartOpen(true)}><ShoppingBag size={18} /> কার্ট <b>{quantity}</b></button></div></header>
      <div className="container pdp-breadcrumb"><Link href="/">হোম</Link><ChevronRight size={14} /><Link href="#products">{product.category}</Link><ChevronRight size={14} /><span>{product.bn}</span></div>
      <section className="container pdp-layout">
        <ProductGallery productName={product.bn} frontImage={product.image} detailImage={product.image2 || product.image} videoSrc={product.video} />
        <div className="pdp-details">
          <span className="pdp-kicker">RAYYAN GOURMET · {product.category}</span>
          <h1>{product.bn}</h1><p className="pdp-english">{product.name}</p>
          <div className="pdp-rating"><span><Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /> <Star size={15} fill="currentColor" /></span><b>{product.rating}</b><em>({product.reviews} রিভিউ)</em><strong><i /> স্টকে আছে</strong></div>
          <div className="pdp-price"><strong>৳{bengaliPrice(product.price)}</strong><del>৳{bengaliPrice(product.oldPrice)}</del><span>-{bengaliPrice(discount)}% OFF</span></div>
          <div className="pdp-divider" />
          <div className="variant-section"><div className="variant-heading"><b>ওজন / সাইজ</b><span>SKU: RY-{product.id}01</span></div><div className="pdp-variants">{["১০০ গ্রাম", "২৫০ গ্রাম", "৫০০ গ্রাম কম্বো"].map((variant) => <button className={selectedVariant === variant ? "selected" : ""} onClick={() => setSelectedVariant(variant)} key={variant}>{variant}</button>)}</div></div>
          <div className="pdp-buy-row"><div className="pdp-quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))} aria-label="পরিমাণ কমান"><Minus size={15} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)} aria-label="পরিমাণ বাড়ান"><Plus size={15} /></button></div><button className="pdp-add-button" onClick={() => { for (let index = 0; index < quantity; index += 1) addToCart(product); setCartOpen(true); }}><ShoppingBag size={18} /> কার্ট-এ যোগ করুন</button></div>
          <Link className="pdp-buy-now" href="/checkout">সরাসরি অর্ডার করুন <ArrowRight size={18} /></Link>
          <div className="pdp-delivery"><Truck size={18} /><span><b>ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি</b><small>সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা</small></span></div>
          <div className="pdp-trust-row"><span><Check size={14} /> ১০০% অর্গানিক</span><span><Check size={14} /> ভ্যাকুয়াম প্যাকড</span><span><Check size={14} /> ক্যাশ অন ডেলিভারি</span><span><Check size={14} /> ২৪–৪৮ ঘণ্টা</span></div>
          <div className="pdp-info-tabs"><div className="pdp-tab-list" role="tablist">{tabs.map((tab) => <button className={activeTab === tab.id ? "active" : ""} onClick={() => setActiveTab(tab.id)} role="tab" aria-selected={activeTab === tab.id} key={tab.id}>{tab.label}</button>)}</div><div className="pdp-tab-panel" role="tabpanel"><p>{detail[activeTab as keyof typeof detail] || "এই পণ্যের জন্য তথ্য শীঘ্রই যুক্ত করা হবে।"}</p></div></div>
        </div>
      </section>
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="kicker">আপনার শপিং ব্যাগ</p><h2>কার্ট <span>(১)</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="কার্ট বন্ধ করুন"><X size={20} /></button></div><div className="drawer-items"><div className="drawer-item"><img src={product.image} alt={product.bn} /><div><h3>{product.bn}</h3><p>{selectedVariant} × {quantity}</p><strong>৳{bengaliPrice(total)}</strong></div></div></div><div className="drawer-footer"><div><span>সাবটোটাল</span><strong>৳{bengaliPrice(total)}</strong></div><p>ডেলিভারি চার্জ চেকআউটে যুক্ত হবে</p><Link className="primary-button checkout-button" href="/checkout">চেকআউটে যান <ArrowRight size={17} /></Link></div></aside></div>}
    </main>
  );
}

"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ArrowRight, Check, ChevronDown, ChevronRight, Heart, Minus, Plus, Search, ShoppingBag, SlidersHorizontal, Sparkles, Star, Truck, X } from "lucide-react";
import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import ProductGallery from "@/components/ProductGallery";
import { products, type Product } from "@/lib/products";

const categories = [
  { label: "গুঁড়া মসলা", count: "২৪টি পণ্য", slug: "powder-spices", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85", alt: "তাজা গুঁড়া মসলা" },
  { label: "গোটা মসলা", count: "১৮টি পণ্য", slug: "whole-spices", image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=85", alt: "দারুচিনি এলাচ ও গোটা মসলা" },
  { label: "রেডি-টু-কুক", count: "১২টি পণ্য", slug: "ready-to-cook", image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85", alt: "ফ্রেশ কাটা রেডি-টু-কুক সবজি" },
  { label: "প্রিমিয়াম কম্বো", count: "৮টি পণ্য", slug: "combos", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=85", alt: "প্রিমিয়াম মসলা কম্বো" },
];

const heroSlides = [
  { title: "শতভাগ খাঁটি গুঁড়া মসলা", subtitle: "ভেজালমুক্ত স্বাদ ও ঘ্রাণে রান্নায় আনুন পরিপূর্ণ তৃপ্তি", badge: "ফার্ম ফ্রেশ", button: "মসলা কালেকশন দেখুন", href: "/category/powder-spices", theme: "powder", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1100&q=85", alt: "খাঁটি গুঁড়া মসলা" },
  { title: "বাছাইকৃত প্রিমিয়াম গোটা মসলা", subtitle: "আসল এলাচ, দারুচিনি ও লবঙ্গের তীব্র সুবাস", badge: "হাতে বাছাইকৃত", button: "গোটা মসলা দেখুন", href: "/category/whole-spices", theme: "whole", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=85", alt: "বাছাইকৃত গোটা মসলা" },
  { title: "ধোয়া ও কাটা রেডি-টু-কুক সবজি", subtitle: "ভ্যাকুয়াম প্যাকড ফ্রেশ কাটিং, রান্নার সময় বাঁচান অর্ধেক", badge: "ভ্যাকুয়াম সিল্ড", button: "সবজি অর্ডার করুন", href: "/category/ready-to-cook", theme: "fresh", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=85", alt: "রেডি-টু-কুক তাজা সবজি" },
  { title: "মাসিক বাজার স্পেশাল কম্বো প্যাক", subtitle: "প্রয়োজনীয় মসলা ও রান্নার প্যাকেজে সর্বোচ্চ ২৫% পর্যন্ত সাশ্রয়", badge: "স্পেশাল অফার", button: "কম্বো প্যাক দেখুন", href: "/category/combos", theme: "combo", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1100&q=85", alt: "প্রিমিয়াম রান্নাঘর কম্বো" },
];

function formatPrice(value: number) { return `৳${value.toLocaleString("en-IN")}`; }

export default function Home() {
  const [cart, setCart] = useState<Product[]>([products[0]]);
  const [cartOpen, setCartOpen] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [liked, setLiked] = useState<number[]>([]);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeSlide, setActiveSlide] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const touchStartX = useRef<number | null>(null);
  const slide = heroSlides[activeSlide];
  const filteredProducts = useMemo(() => products.filter((product) => `${product.name} ${product.bn} ${product.category}`.toLowerCase().includes(search.toLowerCase())), [search]);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const freeDeliveryProgress = Math.min((total / 1000) * 100, 100);
  const addToCart = (product: Product) => { setCart((current) => [...current, product]); setCartOpen(true); };
  const moveSlide = (direction: 1 | -1) => setActiveSlide((current) => (current + direction + heroSlides.length) % heroSlides.length);

  useEffect(() => {
    if (isHeroHovered) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlides.length), 5000);
    return () => window.clearInterval(timer);
  }, [isHeroHovered]);

  return (
    <main>
      <div className="topbar"><div className="container topbar-inner"><span><Truck size={15} /> ঢাকার ভিতরে ২৪–৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারি</span><span className="topbar-note">সারা দেশে ডেলিভারি <b>৳৬০ থেকে</b></span></div></div>
      <header className="site-header"><div className="container header-inner">
        <button className="mobile-menu" aria-label="মেনু"><SlidersHorizontal size={22} /></button>
        <a className="logo" href="#top">RAYYAN<span>রসনায় বিশুদ্ধতা</span></a>
        <nav className="desktop-nav"><a href="#products">সব পণ্য</a><a href="#categories">ক্যাটাগরি <ChevronDown size={14} /></a><a href="#story">আমাদের গল্প</a></nav>
        <div className="header-actions"><div className="search-box"><Search size={18} /><input value={search} onChange={(event) => setSearch(event.target.value)} placeholder="মসলা বা পণ্য খুঁজুন..." aria-label="পণ্য খুঁজুন" /></div><button className="icon-button wishlist-button" aria-label="উইশলিস্ট"><Heart size={21} /><span>{liked.length}</span></button><button className="cart-button" onClick={() => setCartOpen(true)}><ShoppingBag size={19} /><span>কার্ট</span><b>{cart.length}</b></button></div>
      </div></header>

      <section className={`hero hero-carousel hero-${slide.theme}`} id="top" onMouseEnter={() => setIsHeroHovered(true)} onMouseLeave={() => setIsHeroHovered(false)} onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }} onTouchEnd={(event) => { if (touchStartX.current === null) return; const distance = event.changedTouches[0].clientX - touchStartX.current; if (Math.abs(distance) > 45) moveSlide(distance < 0 ? 1 : -1); touchStartX.current = null; }}>
        <div className="container carousel-inner"><div className="hero-copy carousel-copy"><div className="eyebrow"><Sparkles size={14} /> {slide.badge}</div><h1>{slide.title}</h1><p>{slide.subtitle}</p><div className="hero-actions"><a className="primary-button" href={slide.href}>{slide.button} <ArrowRight size={17} /></a><a className="text-link" href="#categories">ক্যাটাগরি দেখুন <ChevronRight size={16} /></a></div><div className="hero-proof"><div className="avatar-stack"><span>স</span><span>ম</span><span>আ</span><span>+</span></div><div><strong>৫,০০০+ পরিবার</strong><small>প্রতিদিন RAYYAN বেছে নেয়</small></div></div></div><div className="hero-art"><div className="hero-art-label"><span>RAYYAN নির্বাচন</span><b>০{activeSlide + 1}</b></div><div className="hero-dish"><img key={slide.image} src={slide.image} alt={slide.alt} /></div><div className="hero-stamp"><span>PURE</span><strong>{activeSlide === 2 ? "FRESH" : "খাঁটি"}</strong><span>EST. 2024</span></div><div className="hero-leaf leaf-one">✦</div><div className="hero-leaf leaf-two">✽</div></div></div>
        <button className="carousel-arrow carousel-prev" onClick={() => moveSlide(-1)} aria-label="আগের স্লাইড"><ChevronRight size={22} /></button><button className="carousel-arrow carousel-next" onClick={() => moveSlide(1)} aria-label="পরের স্লাইড"><ChevronRight size={22} /></button>
        <div className="carousel-controls" role="tablist" aria-label="হিরো স্লাইড নির্বাচন">{heroSlides.map((item, index) => <button className={`carousel-dot ${index === activeSlide ? "active" : ""}`} key={item.title} onClick={() => setActiveSlide(index)} role="tab" aria-selected={index === activeSlide} aria-label={`${index + 1} নম্বর স্লাইড`}><span /></button>)}</div>
      </section>

      <section className="trust-strip"><div className="container trust-grid"><div><span className="trust-icon">✦</span><span><b>১০০% খাঁটি</b><small>বিশুদ্ধতার নিশ্চয়তা</small></span></div><div><span className="trust-icon">♧</span><span><b>ক্যামিক্যাল মুক্ত</b><small>নিরাপদ, প্রাকৃতিক খাবার</small></span></div><div><span className="trust-icon">❋</span><span><b>ভ্যাকুয়াম প্যাকড</b><small>ফ্রেশ থাকুক বেশি সময়</small></span></div><div><span className="trust-icon">৳</span><span><b>ক্যাশ অন ডেলিভারি</b><small>পণ্য হাতে, তারপর পেমেন্ট</small></span></div></div></section>

      <section className="section container" id="categories"><div className="section-heading"><div><p className="kicker">আপনার রান্নাঘরের জন্য</p><h2>কী খুঁজছেন আজ?</h2></div><a className="view-all" href="#products">সব দেখুন <ArrowRight size={15} /></a></div><div className="category-grid">{categories.map((category) => <Link className="category-card group" href={`/category/${category.slug}`} key={category.label}><img src={category.image} alt={category.alt} /><span className="category-overlay" /><div className="category-content"><h3>{category.label}</h3><p>{category.count}</p></div><span className="category-arrow"><ArrowRight size={18} /></span></Link>)}</div></section>

      <section className="offer-banner"><div className="container offer-inner"><div className="offer-spark">✹</div><div><p>এই সপ্তাহের রান্নাঘর অফার</p><h2>তিনটি কম্বোতে <strong>২০% ছাড়</strong></h2></div><div className="offer-timer"><span>অফার শেষ হতে</span><b>০২ : ১৪ : ৩৬</b></div><a className="dark-button" href="#products">অফার দেখুন <ArrowRight size={16} /></a></div></section>

      <section className="section container products-section" id="products"><div className="section-heading"><div><p className="kicker">RAYYAN-এর পছন্দ</p><h2>এই সপ্তাহের সেরা পণ্য</h2></div><div className="product-tabs"><button className="active">সবগুলো</button><button>মসলা</button><button>রেডি-টু-কুক</button></div></div><div className="product-grid">{filteredProducts.map((product) => <ProductCard key={product.id} product={product} liked={liked.includes(product.id)} onToggleWishlist={() => setLiked((current) => current.includes(product.id) ? current.filter((id) => id !== product.id) : [...current, product.id])} onAddToCart={() => addToCart(product)} onQuickView={() => { setActiveProduct(product); setQuantity(1); }} />)}</div></section>

      <section className="story-section" id="story"><div className="container story-grid"><div className="story-image"><img src="https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85" alt="প্রাকৃতিক মসলা" /><div className="story-badge"><strong>০১</strong><span>উৎস থেকে<br />আপনার ঘরে</span></div></div><div className="story-copy"><p className="kicker">কেন RAYYAN?</p><h2>স্বাদের শুরু হোক<br /><em>বিশুদ্ধতা থেকে</em></h2><p>আমরা বিশ্বাস করি, ভালো রান্নার জন্য ভালো উপকরণই যথেষ্ট। তাই প্রতিটি মসলা ও সবজি বেছে নিই স্বচ্ছ উৎস থেকে, রাখি তার স্বাভাবিক গন্ধ, রঙ এবং পুষ্টি।</p><div className="story-points"><span><Check size={15} /> কৃষকের কাছ থেকে সরাসরি</span><span><Check size={15} /> ছোট ব্যাচে তাজা প্যাকিং</span></div><a className="text-link" href="#top">RAYYAN সম্পর্কে জানুন <ArrowRight size={16} /></a></div></div></section>

      <footer><div className="container footer-inner"><div className="logo">RAYYAN<span>রসনায় বিশুদ্ধতা</span></div><p>খাঁটি খাবার, প্রতিদিনের ভালোবাসা।</p><span>© ২০২৪ RAYYAN Bangladesh</span></div></footer>

      {activeProduct && <div className="modal-backdrop" onClick={() => setActiveProduct(null)}><div className="product-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setActiveProduct(null)} aria-label="বন্ধ করুন"><X size={20} /></button><ProductGallery productName={activeProduct.bn} frontImage={activeProduct.image} detailImage={activeProduct.image2 || activeProduct.image} /><div className="modal-details"><div className="rating"><Star size={13} fill="currentColor" /> {activeProduct.rating} <span>({activeProduct.reviews} রিভিউ)</span></div><h2>{activeProduct.bn}</h2><p className="modal-en">{activeProduct.name}</p><div className="variant-label">ওজন বেছে নিন <span>SKU: RY-{activeProduct.id}01</span></div><div className="variants"><button>১০০ গ্রাম</button><button className="selected">২৫০ গ্রাম</button><button>৫০০ গ্রাম</button></div><div className="modal-price"><strong>{formatPrice(activeProduct.price)}</strong><del>{formatPrice(activeProduct.oldPrice)}</del><span>-২০% OFF</span></div><div className="quantity-row"><div className="quantity"><button onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><b>{quantity}</b><button onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="primary-button modal-add" onClick={() => { addToCart(activeProduct); setActiveProduct(null); }}>কার্টে যোগ করুন <ShoppingBag size={17} /></button></div><div className="modal-note"><Truck size={15} /> ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি <span>ইন স্টক</span></div></div></div></div>}
      {cartOpen && <div className="drawer-backdrop" onClick={() => setCartOpen(false)}><aside className="cart-drawer" onClick={(event) => event.stopPropagation()}><div className="drawer-header"><div><p className="kicker">আপনার শপিং ব্যাগ</p><h2>কার্ট <span>({cart.length})</span></h2></div><button className="close-button" onClick={() => setCartOpen(false)} aria-label="কার্ট বন্ধ করুন"><X size={20} /></button></div><div className="free-shipping"><div><Truck size={16} /><span>{total >= 1000 ? "আপনার ডেলিভারি ফ্রি!" : `আর ${formatPrice(1000 - total)} টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!`}</span></div><div className="progress"><i style={{ width: `${freeDeliveryProgress}%` }} /></div></div><div className="drawer-items">{cart.map((item, index) => <div className="drawer-item" key={`${item.id}-${index}`}><img src={item.image} alt={item.bn} /><div><h3>{item.bn}</h3><p>২৫০ গ্রাম</p><strong>{formatPrice(item.price)}</strong></div><button onClick={() => setCart((current) => current.filter((_, itemIndex) => itemIndex !== index))} aria-label="পণ্য মুছুন"><X size={15} /></button></div>)}</div><div className="drawer-footer"><div><span>সাবটোটাল</span><strong>{formatPrice(total)}</strong></div><p>ডেলিভারি চার্জ চেকআউটে যুক্ত হবে</p><button className="primary-button checkout-button" onClick={() => { setCartOpen(false); setCheckoutOpen(true); }}>চেকআউটে যান <ArrowRight size={17} /></button></div></aside></div>}
      {checkoutOpen && <div className="modal-backdrop" onClick={() => setCheckoutOpen(false)}><div className="checkout-modal" onClick={(event) => event.stopPropagation()}><button className="close-button" onClick={() => setCheckoutOpen(false)} aria-label="বন্ধ করুন"><X size={20} /></button><div className="checkout-form"><p className="kicker">শেষ ধাপ</p><h2>অর্ডার নিশ্চিত করুন</h2><p className="checkout-intro">আপনার ঠিকানা দিন, আমরা যত্ন করে প্যাক করে পাঠিয়ে দেব।</p><label>আপনার নাম<input placeholder="পুরো নাম লিখুন" /></label><label>ফোন নম্বর<input placeholder="01XXXXXXXXX" /></label><label>সম্পূর্ণ ঠিকানা<textarea placeholder="বাসা, রোড, এলাকা লিখুন" rows={3} /></label><label>ডেলিভারি জোন<select><option>ঢাকার ভিতরে — ৳৬০</option><option>ঢাকার বাইরে — ৳১২০</option></select></label><h3>পেমেন্ট পদ্ধতি</h3><div className="payment-option"><Check size={16} /> ক্যাশ অন ডেলিভারি <span>নির্বাচিত</span></div><button className="primary-button place-order" onClick={() => { setCheckoutOpen(false); alert("ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।"); }}>অর্ডার নিশ্চিত করুন <ArrowRight size={17} /></button></div><div className="checkout-summary"><p className="kicker">আপনার অর্ডার</p><h2>অর্ডার সামারি</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt="" /><span>{item.bn}<small>২৫০ গ্রাম × ১</small></span><b>{formatPrice(item.price)}</b></div>)}<div className="summary-line"><span>সাবটোটাল</span><b>{formatPrice(total)}</b></div><div className="summary-line"><span>ডেলিভারি</span><b>৳৬০</b></div><div className="summary-total"><span>সর্বমোট</span><strong>{formatPrice(total + 60)}</strong></div><div className="secure-note"><Check size={15} /> নিরাপদ এবং বিশ্বস্ত অর্ডার</div></div></div></div>}
    </main>
  );
}

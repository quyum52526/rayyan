"use client";

import { ArrowLeft, Check, LockKeyhole, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatNumber, formatPrice, productTitle, useLanguage } from "@/context/LanguageContext";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, createOrder } = useStore();
  const { language, t } = useLanguage();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState<"inside" | "outside">("inside");
  const [submitted, setSubmitted] = useState(false);
  const deliveryFee = zone === "inside" ? 60 : 120;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return;
    createOrder({ customerName, phone, address, zone, paymentMethod: "cod", items: cart, subtotal, deliveryFee, grandTotal: subtotal + deliveryFee });
    setSubmitted(true);
  };

  if (submitted) return <main className="checkout-page"><div className="order-success"><div className="success-icon"><Check size={28} /></div><p className="kicker">{t.checkout.successKicker}</p><h1>{t.checkout.successHeading}, {customerName}!</h1><p>{t.checkout.successBody}</p><Link className="primary-button" href="/">{t.checkout.continueShopping} <ArrowLeft size={17} /></Link><Link className="admin-text-link" href="/admin">{t.checkout.adminLink}</Link></div></main>;

  return (
    <main className="checkout-page"><header className="pdp-header"><div className="container pdp-header-inner"><Link className="pdp-back" href="/"><ArrowLeft size={17} /> {t.checkout.back}</Link><Link className="logo" href="/">RAYYAN<span>{t.nav.tagline}</span></Link><span className="checkout-secure"><LockKeyhole size={15} /> {t.checkout.secure}</span></div></header><div className="container checkout-page-grid"><form className="checkout-page-form" onSubmit={submitOrder}><p className="kicker">{t.checkout.kicker}</p><h1>{t.checkout.heading}</h1><p>{t.checkout.intro}</p><label>{t.checkout.name}<input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder={t.checkout.namePlaceholder} /></label><label>{t.checkout.phone}<input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={t.checkout.phonePlaceholder} /></label><label>{t.checkout.address}<textarea required value={address} onChange={(event) => setAddress(event.target.value)} placeholder={t.checkout.addressPlaceholder} rows={3} /></label><label>{t.checkout.zone}<select value={zone} onChange={(event) => setZone(event.target.value as "inside" | "outside")}><option value="inside">{t.checkout.zoneInside}</option><option value="outside">{t.checkout.zoneOutside}</option></select></label><h2>{t.checkout.paymentHeading}</h2><div className="payment-option"><Check size={16} /> {t.checkout.cod} <span>{t.checkout.selected}</span></div><button className="primary-button place-order" disabled={!cart.length}>{cart.length ? t.checkout.placeOrder : t.checkout.emptyCart} <ArrowLeft size={17} /></button></form><aside className="checkout-page-summary"><p className="kicker">{t.checkout.summaryKicker}</p><h2>{t.checkout.summaryHeading}</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt={productTitle(item, language)} /><span>{productTitle(item, language)}<small>{t.cart.defaultWeight} × {formatNumber(1, language)}</small></span><b>{formatPrice(item.price, language)}</b></div>)}<div className="summary-line"><span>{t.checkout.subtotal}</span><b>{formatPrice(subtotal, language)}</b></div><div className="summary-line"><span>{t.checkout.delivery}</span><b>{formatPrice(deliveryFee, language)}</b></div><div className="summary-total"><span>{t.checkout.grandTotal}</span><strong>{formatPrice(subtotal + deliveryFee, language)}</strong></div><div className="checkout-benefit"><Truck size={16} /> {t.checkout.benefitDelivery}</div><div className="checkout-benefit"><ShoppingBag size={16} /> {t.checkout.benefitCod}</div></aside></div></main>
  );
}

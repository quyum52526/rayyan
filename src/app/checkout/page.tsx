"use client";

import { ArrowLeft, Check, LockKeyhole, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { formatNumber, formatPrice, productTitle, useLanguage } from "@/context/LanguageContext";
import PaymentMethodFields from "@/components/PaymentMethodFields";
import { requiresTransactionId, type PaymentMethod } from "@/lib/payment";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, createOrder } = useStore();
  const { language, t } = useLanguage();
  const [customerName, setCustomerName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [zone, setZone] = useState<"inside" | "outside">("inside");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("cod");
  const [transactionId, setTransactionId] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<{ paymentMethod: PaymentMethod; transactionId?: string; grandTotal: number } | null>(null);
  const deliveryFee = zone === "inside" ? 60 : 120;
  const subtotal = cart.reduce((sum, item) => sum + item.price, 0);
  const grandTotal = subtotal + deliveryFee;
  const needsTransactionId = requiresTransactionId(paymentMethod);

  const submitOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!cart.length) return;

    const trimmedTransactionId = transactionId.trim();
    if (needsTransactionId && !trimmedTransactionId) {
      setPaymentError(t.payment.trxRequired);
      return;
    }
    setPaymentError("");

    createOrder({
      customerName,
      phone,
      address,
      zone,
      paymentMethod,
      ...(needsTransactionId ? { transactionId: trimmedTransactionId } : {}),
      items: cart,
      subtotal,
      deliveryFee,
      grandTotal,
    });
    setPlacedOrder({ paymentMethod, transactionId: needsTransactionId ? trimmedTransactionId : undefined, grandTotal });
    setSubmitted(true);
  };

  const selectPaymentMethod = (method: PaymentMethod) => {
    setPaymentMethod(method);
    setPaymentError("");
    if (!requiresTransactionId(method)) setTransactionId("");
  };

  if (submitted && placedOrder) {
    const paymentSummary = requiresTransactionId(placedOrder.paymentMethod)
      ? t.payment.digitalSummary.replace("{trx}", placedOrder.transactionId || "")
      : t.payment.codSummary.replace("{amount}", formatPrice(placedOrder.grandTotal, language));
    return <main className="checkout-page"><div className="order-success"><div className="success-icon"><Check size={28} /></div><p className="kicker">{t.checkout.successKicker}</p><h1>{t.checkout.successHeading}, {customerName}!</h1><p>{t.checkout.successBody}</p><div className="order-payment-summary"><small>{t.payment.summaryLabel}</small><b>{t.payment.methods[placedOrder.paymentMethod]}</b><span>{paymentSummary}</span></div><Link className="primary-button" href="/">{t.checkout.continueShopping} <ArrowLeft size={17} /></Link><Link className="admin-text-link" href="/admin">{t.checkout.adminLink}</Link></div></main>;
  }

  return (
    <main className="checkout-page"><header className="pdp-header"><div className="container pdp-header-inner"><Link className="pdp-back" href="/"><ArrowLeft size={17} /> {t.checkout.back}</Link><Link className="logo" href="/">RAYYAN<span>{t.nav.tagline}</span></Link><span className="checkout-secure"><LockKeyhole size={15} /> {t.checkout.secure}</span></div></header><div className="container checkout-page-grid"><form className="checkout-page-form" onSubmit={submitOrder}><p className="kicker">{t.checkout.kicker}</p><h1>{t.checkout.heading}</h1><p>{t.checkout.intro}</p><label>{t.checkout.name}<input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder={t.checkout.namePlaceholder} /></label><label>{t.checkout.phone}<input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder={t.checkout.phonePlaceholder} /></label><label>{t.checkout.address}<textarea required value={address} onChange={(event) => setAddress(event.target.value)} placeholder={t.checkout.addressPlaceholder} rows={3} /></label><label>{t.checkout.zone}<select value={zone} onChange={(event) => setZone(event.target.value as "inside" | "outside")}><option value="inside">{t.checkout.zoneInside}</option><option value="outside">{t.checkout.zoneOutside}</option></select></label>

      <h2>{t.payment.heading}</h2>
      <PaymentMethodFields value={paymentMethod} onChange={selectPaymentMethod} transactionId={transactionId} onTransactionIdChange={(next) => { setTransactionId(next); setPaymentError(""); }} amount={grandTotal} error={paymentError} name="checkoutPagePayment" />

      <button className="primary-button place-order" disabled={!cart.length}>{cart.length ? t.checkout.placeOrder : t.checkout.emptyCart} <ArrowLeft size={17} /></button></form><aside className="checkout-page-summary"><p className="kicker">{t.checkout.summaryKicker}</p><h2>{t.checkout.summaryHeading}</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt={productTitle(item, language)} /><span>{productTitle(item, language)}<small>{item.variant || t.cart.defaultWeight} × {formatNumber(1, language)}</small></span><b>{formatPrice(item.price, language)}</b></div>)}<div className="summary-line"><span>{t.checkout.subtotal}</span><b>{formatPrice(subtotal, language)}</b></div><div className="summary-line"><span>{t.checkout.delivery}</span><b>{formatPrice(deliveryFee, language)}</b></div><div className="summary-line"><span>{t.payment.summaryLabel}</span><b>{t.payment.methods[paymentMethod]}</b></div><div className="summary-total"><span>{t.checkout.grandTotal}</span><strong>{formatPrice(grandTotal, language)}</strong></div><div className="checkout-benefit"><Truck size={16} /> {t.checkout.benefitDelivery}</div><div className="checkout-benefit"><ShoppingBag size={16} /> {t.checkout.benefitCod}</div></aside></div></main>
  );
}

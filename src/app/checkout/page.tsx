"use client";

import { ArrowLeft, Check, LockKeyhole, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useStore } from "@/lib/store";

export default function CheckoutPage() {
  const { cart, createOrder } = useStore();
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

  if (submitted) return <main className="checkout-page"><div className="order-success"><div className="success-icon"><Check size={28} /></div><p className="kicker">অর্ডার গ্রহণ করা হয়েছে</p><h1>ধন্যবাদ, {customerName}!</h1><p>আপনার অর্ডারটি RAYYAN টিমের কাছে পৌঁছে গেছে। খুব শিগগিরই আমরা আপনার সঙ্গে যোগাযোগ করব।</p><Link className="primary-button" href="/">শপিং চালিয়ে যান <ArrowLeft size={17} /></Link><Link className="admin-text-link" href="/admin">অর্ডার ম্যানেজমেন্ট দেখুন</Link></div></main>;

  return (
    <main className="checkout-page"><header className="pdp-header"><div className="container pdp-header-inner"><Link className="pdp-back" href="/"><ArrowLeft size={17} /> শপিং চালিয়ে যান</Link><Link className="logo" href="/">RAYYAN<span>রসনায় বিশুদ্ধতা</span></Link><span className="checkout-secure"><LockKeyhole size={15} /> নিরাপদ চেকআউট</span></div></header><div className="container checkout-page-grid"><form className="checkout-page-form" onSubmit={submitOrder}><p className="kicker">শেষ ধাপ</p><h1>অর্ডার নিশ্চিত করুন</h1><p>আপনার ঠিকানা দিন, আমরা যত্ন করে প্যাক করে পাঠিয়ে দেব।</p><label>আপনার নাম<input required value={customerName} onChange={(event) => setCustomerName(event.target.value)} placeholder="পুরো নাম লিখুন" /></label><label>ফোন নম্বর<input required value={phone} onChange={(event) => setPhone(event.target.value)} placeholder="01XXXXXXXXX" /></label><label>সম্পূর্ণ ঠিকানা<textarea required value={address} onChange={(event) => setAddress(event.target.value)} placeholder="বাসা, রোড, এলাকা লিখুন" rows={3} /></label><label>ডেলিভারি জোন<select value={zone} onChange={(event) => setZone(event.target.value as "inside" | "outside")}><option value="inside">ঢাকার ভিতরে — ৳৬০</option><option value="outside">ঢাকার বাইরে — ৳১২০</option></select></label><h2>পেমেন্ট পদ্ধতি</h2><div className="payment-option"><Check size={16} /> ক্যাশ অন ডেলিভারি <span>নির্বাচিত</span></div><button className="primary-button place-order" disabled={!cart.length}>{cart.length ? "অর্ডার নিশ্চিত করুন" : "কার্ট খালি"} <ArrowLeft size={17} /></button></form><aside className="checkout-page-summary"><p className="kicker">আপনার অর্ডার</p><h2>অর্ডার সামারি</h2>{cart.map((item, index) => <div className="summary-item" key={`${item.id}-${index}`}><img src={item.image} alt={item.bn} /><span>{item.bn}<small>২৫০ গ্রাম × ১</small></span><b>৳{item.price.toLocaleString("bn-BD")}</b></div>)}<div className="summary-line"><span>সাবটোটাল</span><b>৳{subtotal.toLocaleString("bn-BD")}</b></div><div className="summary-line"><span>ডেলিভারি</span><b>৳{deliveryFee.toLocaleString("bn-BD")}</b></div><div className="summary-total"><span>সর্বমোট</span><strong>৳{(subtotal + deliveryFee).toLocaleString("bn-BD")}</strong></div><div className="checkout-benefit"><Truck size={16} /> ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি</div><div className="checkout-benefit"><ShoppingBag size={16} /> পণ্য হাতে, তারপর পেমেন্ট</div></aside></div></main>
  );
}

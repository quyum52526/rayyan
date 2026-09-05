"use client";

import { ArrowLeft, Check, LockKeyhole, ShoppingBag, Truck } from "lucide-react";
import Link from "next/link";
import { products } from "@/lib/products";

export default function CheckoutPage() {
  const product = products[0];
  return (
    <main className="checkout-page"><header className="pdp-header"><div className="container pdp-header-inner"><Link className="pdp-back" href="/"><ArrowLeft size={17} /> শপিং চালিয়ে যান</Link><Link className="logo" href="/">RAYYAN<span>রসনায় বিশুদ্ধতা</span></Link><span className="checkout-secure"><LockKeyhole size={15} /> নিরাপদ চেকআউট</span></div></header><div className="container checkout-page-grid"><section className="checkout-page-form"><p className="kicker">শেষ ধাপ</p><h1>অর্ডার নিশ্চিত করুন</h1><p>আপনার ঠিকানা দিন, আমরা যত্ন করে প্যাক করে পাঠিয়ে দেব।</p><label>আপনার নাম<input placeholder="পুরো নাম লিখুন" /></label><label>ফোন নম্বর<input placeholder="01XXXXXXXXX" /></label><label>সম্পূর্ণ ঠিকানা<textarea placeholder="বাসা, রোড, এলাকা লিখুন" rows={3} /></label><label>ডেলিভারি জোন<select><option>ঢাকার ভিতরে — ৳৬০</option><option>ঢাকার বাইরে — ৳১২০</option></select></label><h2>পেমেন্ট পদ্ধতি</h2><div className="payment-option"><Check size={16} /> ক্যাশ অন ডেলিভারি <span>নির্বাচিত</span></div><button className="primary-button place-order">অর্ডার নিশ্চিত করুন <ArrowLeft size={17} /></button></section><aside className="checkout-page-summary"><p className="kicker">আপনার অর্ডার</p><h2>অর্ডার সামারি</h2><div className="summary-item"><img src={product.image} alt={product.bn} /><span>{product.bn}<small>২৫০ গ্রাম × ১</small></span><b>৳{product.price.toLocaleString("bn-BD")}</b></div><div className="summary-line"><span>সাবটোটাল</span><b>৳{product.price.toLocaleString("bn-BD")}</b></div><div className="summary-line"><span>ডেলিভারি</span><b>৳৬০</b></div><div className="summary-total"><span>সর্বমোট</span><strong>৳{(product.price + 60).toLocaleString("bn-BD")}</strong></div><div className="checkout-benefit"><Truck size={16} /> ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি</div><div className="checkout-benefit"><ShoppingBag size={16} /> পণ্য হাতে, তারপর পেমেন্ট</div></aside></div></main>
  );
}

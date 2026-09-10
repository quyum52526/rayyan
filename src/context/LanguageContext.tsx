"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Language = "bn" | "en";

type Slide = { title: string; subtitle: string; badge: string; button: string; alt: string };
type TrustItem = { title: string; note: string };
type CategoryCopy = { label: string; count: string; alt: string };
type FooterLink = { label: string; href: string };

type Translation = {
  topbar: { delivery: string; nationwide: string; from: string };
  nav: { menu: string; tagline: string; products: string; categories: string; story: string; search: string; wishlist: string; cart: string; language: string };
  hero: {
    slides: Slide[];
    avatars: string[];
    categories: string; families: string; familiesNote: string; pure: string; fresh: string; previous: string; next: string; select: string; slide: string;
  };
  trust: TrustItem[];
  categories: { kicker: string; heading: string; viewAll: string; items: CategoryCopy[] };
  offer: { kicker: string; headingBefore: string; headingHighlight: string; timerLabel: string; timerValue: string; cta: string };
  products: { kicker: string; heading: string; tabs: string[]; emptyTitle: string; emptyBody: string };
  story: { kicker: string; headingTop: string; headingEm: string; body: string; points: string[]; cta: string; badgeNumber: string; badgeText: string; imageAlt: string };
  footer: {
    tagline: string; copyright: string; about: string; familiesCount: string; familiesNote: string;
    newsletterKicker: string; newsletterHeading: string; newsletterHighlight: string; newsletterNote: string; newsletterCode: string;
    newsletterPlaceholder: string; newsletterButton: string; newsletterSuccess: string; newsletterInvalid: string;
    categoriesTitle: string; categoryLinks: FooterLink[]; viewAll: string;
    helpTitle: string; helpLinks: FooterLink[];
    contactTitle: string; contactLabel: string; phone: string; email: string; address: string[]; hours: string;
    paymentLabel: string; paymentMethods: string[]; secureNote: string;
    legalLinks: FooterLink[]; packedIn: string;
  };
  card: { kicker: string; addToCart: string; quickView: string; wishlist: string; cartAction: string; ingredientsAlt: string; off: string };
  pdp: {
    back: string; home: string; cart: string; reviews: string; inStock: string; weightHeading: string; variants: string[];
    decrease: string; increase: string; addToCart: string; buyNow: string; deliveryTitle: string; deliveryNote: string;
    trustRow: string[]; tabs: { description: string; nutrition: string; storage: string }; tabEmpty: string; off: string;
  };
  cart: { kicker: string; title: string; close: string; freeDelivery: string; freeDeliveryRemaining: string; subtotal: string; deliveryNote: string; checkout: string; removeItem: string; defaultWeight: string };
  modal: { close: string; chooseWeight: string; reviews: string; addToCart: string; deliveryNote: string; inStock: string; off: string; variants: string[] };
  checkout: {
    back: string; secure: string; kicker: string; heading: string; intro: string; name: string; namePlaceholder: string;
    phone: string; phonePlaceholder: string; address: string; addressPlaceholder: string; zone: string; zoneInside: string;
    zoneOutside: string; paymentHeading: string; cod: string; selected: string; placeOrder: string; emptyCart: string;
    summaryKicker: string; summaryHeading: string; subtotal: string; delivery: string; grandTotal: string;
    benefitDelivery: string; benefitCod: string; secureNote: string;
    successKicker: string; successHeading: string; successBody: string; continueShopping: string; adminLink: string; orderPlacedAlert: string;
  };
  payment: {
    heading: string; methods: { cod: string; bkash: string; nagad: string };
    codNote: string; sendMoneyNote: string; merchantLabel: string; trxLabel: string;
    trxPlaceholder: string; trxRequired: string; summaryLabel: string; codSummary: string; digitalSummary: string;
  };
  gallery: { package: string; ingredients: string; video: string; media: string; view: string; playVideo: string; pauseVideo: string; unmute: string; mute: string; muted: string; soundOn: string };
  notFound: { title: string; body: string };
  categoryNames: Record<string, string>;
};

const translations: Record<Language, Translation> = {
  bn: {
    topbar: { delivery: "ঢাকার ভিতরে ২৪–৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারি", nationwide: "সারা দেশে ডেলিভারি", from: "৳৬০ থেকে" },
    nav: { menu: "মেনু", tagline: "রসনায় বিশুদ্ধতা", products: "সব পণ্য", categories: "ক্যাটাগরি", story: "আমাদের গল্প", search: "মসলা বা পণ্য খুঁজুন...", wishlist: "উইশলিস্ট", cart: "কার্ট", language: "English" },
    hero: {
      slides: [
        { title: "শতভাগ খাঁটি গুঁড়া মসলা", subtitle: "ভেজালমুক্ত স্বাদ ও ঘ্রাণে রান্নায় আনুন পরিপূর্ণ তৃপ্তি", badge: "ফার্ম ফ্রেশ", button: "মসলা কালেকশন দেখুন", alt: "খাঁটি গুঁড়া মসলা" },
        { title: "বাছাইকৃত প্রিমিয়াম গোটা মসলা", subtitle: "আসল এলাচ, দারুচিনি ও লবঙ্গের তীব্র সুবাস", badge: "হাতে বাছাইকৃত", button: "গোটা মসলা দেখুন", alt: "বাছাইকৃত গোটা মসলা" },
        { title: "ধোয়া ও কাটা রেডি-টু-কুক সবজি", subtitle: "ভ্যাকুয়াম প্যাকড ফ্রেশ কাটিং, রান্নার সময় বাঁচান অর্ধেক", badge: "ভ্যাকুয়াম সিল্ড", button: "সবজি অর্ডার করুন", alt: "রেডি-টু-কুক তাজা সবজি" },
        { title: "মাসিক বাজার স্পেশাল কম্বো প্যাক", subtitle: "প্রয়োজনীয় মসলা ও রান্নার প্যাকেজে সর্বোচ্চ ২৫% পর্যন্ত সাশ্রয়", badge: "স্পেশাল অফার", button: "কম্বো প্যাক দেখুন", alt: "প্রিমিয়াম রান্নাঘর কম্বো" },
      ],
      avatars: ["স", "ম", "আ"],
      categories: "ক্যাটাগরি দেখুন", families: "৫,০০০+ পরিবার", familiesNote: "প্রতিদিন RAYYAN বেছে নেয়", pure: "খাঁটি", fresh: "FRESH", previous: "আগের স্লাইড", next: "পরের স্লাইড", select: "হিরো স্লাইড নির্বাচন", slide: "নম্বর স্লাইড",
    },
    trust: [
      { title: "১০০% খাঁটি", note: "বিশুদ্ধতার নিশ্চয়তা" },
      { title: "ক্যামিক্যাল মুক্ত", note: "নিরাপদ, প্রাকৃতিক খাবার" },
      { title: "ভ্যাকুয়াম প্যাকড", note: "ফ্রেশ থাকুক বেশি সময়" },
      { title: "ক্যাশ অন ডেলিভারি", note: "পণ্য হাতে, তারপর পেমেন্ট" },
    ],
    categories: {
      kicker: "আপনার রান্নাঘরের জন্য", heading: "কী খুঁজছেন আজ?", viewAll: "সব দেখুন",
      items: [
        { label: "গুঁড়া মসলা", count: "২৪টি পণ্য", alt: "তাজা গুঁড়া মসলা" },
        { label: "গোটা মসলা", count: "১৮টি পণ্য", alt: "দারুচিনি এলাচ ও গোটা মসলা" },
        { label: "রেডি-টু-কুক", count: "১২টি পণ্য", alt: "ফ্রেশ কাটা রেডি-টু-কুক সবজি" },
        { label: "প্রিমিয়াম কম্বো", count: "৮টি পণ্য", alt: "প্রিমিয়াম মসলা কম্বো" },
      ],
    },
    offer: { kicker: "এই সপ্তাহের রান্নাঘর অফার", headingBefore: "তিনটি কম্বোতে ", headingHighlight: "২০% ছাড়", timerLabel: "অফার শেষ হতে", timerValue: "০২ : ১৪ : ৩৬", cta: "অফার দেখুন" },
    products: { kicker: "RAYYAN-এর পছন্দ", heading: "এই সপ্তাহের সেরা পণ্য", tabs: ["সবগুলো", "মসলা", "রেডি-টু-কুক"], emptyTitle: "কোনো পণ্য পাওয়া যায়নি", emptyBody: "অন্য ক্যাটাগরি বেছে নিন অথবা অন্য শব্দ দিয়ে খুঁজে দেখুন।" },
    story: {
      kicker: "কেন RAYYAN?", headingTop: "স্বাদের শুরু হোক", headingEm: "বিশুদ্ধতা থেকে",
      body: "আমরা বিশ্বাস করি, ভালো রান্নার জন্য ভালো উপকরণই যথেষ্ট। তাই প্রতিটি মসলা ও সবজি বেছে নিই স্বচ্ছ উৎস থেকে, রাখি তার স্বাভাবিক গন্ধ, রঙ এবং পুষ্টি।",
      points: ["কৃষকের কাছ থেকে সরাসরি", "ছোট ব্যাচে তাজা প্যাকিং"], cta: "RAYYAN সম্পর্কে জানুন",
      badgeNumber: "০১", badgeText: "উৎস থেকে আপনার ঘরে", imageAlt: "প্রাকৃতিক মসলা",
    },
    footer: {
      tagline: "রসনায় বিশুদ্ধতা", copyright: "© ২০২৬ RAYYAN Bangladesh · সর্বস্বত্ব সংরক্ষিত",
      about: "আমরা বিশ্বাস করি, ভালো রান্নার জন্য ভালো উপকরণই যথেষ্ট। খাঁটি মসলা, অর্গানিক প্যান্ট্রি স্ট্যাপল ও রেডি-টু-কুক সবজি — সরাসরি আপনার ঘরে।",
      familiesCount: "৫,০০০+", familiesNote: "পরিবার আমাদের রান্নাঘরে ভরসা রাখে",
      newsletterKicker: "RAYYAN NEWSLETTER", newsletterHeading: "নতুন পণ্য আর অফারের খবর", newsletterHighlight: "আগে পান",
      newsletterNote: "প্রথম অর্ডারে ১০% ছাড় পেতে কোড ব্যবহার করুন", newsletterCode: "RAYYAN25",
      newsletterPlaceholder: "আপনার ইমেইল দিন", newsletterButton: "সাবস্ক্রাইব করুন",
      newsletterSuccess: "ধন্যবাদ! নতুন অফারের খবর আপনার ইমেইলে যাবে।", newsletterInvalid: "সঠিক ইমেইল ঠিকানা দিন।",
      categoriesTitle: "CATEGORIES",
      categoryLinks: [
        { label: "গুঁড়া মসলা", href: "/category/powder-spices" },
        { label: "গোটা মসলা", href: "/category/whole-spices" },
        { label: "রেডি-টু-কুক সবজি", href: "/category/ready-to-cook" },
        { label: "অর্গানিক প্যান্ট্রি", href: "/category/pantry" },
        { label: "কম্বো প্যাক", href: "/category/combos" },
      ],
      viewAll: "সব পণ্য দেখুন",
      helpTitle: "HELP",
      helpLinks: [
        { label: "অর্ডার ট্র্যাক করুন", href: "/#products" },
        { label: "ডেলিভারি ও পেমেন্ট", href: "/#products" },
        { label: "রিটার্ন ও রিফান্ড", href: "/#products" },
        { label: "প্রশ্নোত্তর", href: "/#products" },
        { label: "আমাদের গল্প", href: "/#story" },
        { label: "পাইকারি অর্ডার", href: "/#products" },
      ],
      contactTitle: "CONTACT", contactLabel: "অর্ডার ও সহায়তা", phone: "09610 000 000", email: "hello@rayyan.com.bd",
      address: ["হাউস ১২, রোড ৫, ধানমন্ডি,", "ঢাকা ১২০৫, বাংলাদেশ"], hours: "শনি–বৃহস্পতি, সকাল ১০টা – রাত ৮টা",
      paymentLabel: "PAYMENT", paymentMethods: ["ক্যাশ অন ডেলিভারি", "বিকাশ", "নগদ", "রকেট", "VISA · MASTERCARD"],
      secureNote: "নিরাপদ এবং বিশ্বস্ত অর্ডার",
      legalLinks: [
        { label: "শর্তাবলি", href: "/#products" },
        { label: "প্রাইভেসি নীতি", href: "/#products" },
        { label: "রিফান্ড নীতি", href: "/#products" },
      ],
      packedIn: "✦ ঢাকায় প্যাক করা",
    },
    card: { kicker: "RAYYAN GOURMET", addToCart: "কার্ট-এ যোগ করুন", quickView: "দ্রুত দেখুন", wishlist: "উইশলিস্টে যোগ করুন", cartAction: "কার্টে যোগ করুন", ingredientsAlt: "উপকরণ", off: "OFF" },
    pdp: {
      back: "শপিং চালিয়ে যান", home: "হোম", cart: "কার্ট", reviews: "রিভিউ", inStock: "স্টকে আছে",
      weightHeading: "ওজন / সাইজ", variants: ["১০০ গ্রাম", "২৫০ গ্রাম", "৫০০ গ্রাম কম্বো"],
      decrease: "পরিমাণ কমান", increase: "পরিমাণ বাড়ান", addToCart: "কার্ট-এ যোগ করুন", buyNow: "সরাসরি অর্ডার করুন",
      deliveryTitle: "ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি", deliveryNote: "সারা দেশে ক্যাশ অন ডেলিভারি সুবিধা",
      trustRow: ["১০০% অর্গানিক", "ভ্যাকুয়াম প্যাকড", "ক্যাশ অন ডেলিভারি", "২৪–৪৮ ঘণ্টা"],
      tabs: { description: "বিবরণ", nutrition: "পুষ্টি ও উপাদান", storage: "সংরক্ষণ পদ্ধতি" },
      tabEmpty: "এই পণ্যের জন্য তথ্য শীঘ্রই যুক্ত করা হবে।", off: "OFF",
    },
    cart: {
      kicker: "আপনার শপিং ব্যাগ", title: "কার্ট", close: "কার্ট বন্ধ করুন", freeDelivery: "আপনার ডেলিভারি ফ্রি!",
      freeDeliveryRemaining: "আর {amount} টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!", subtotal: "সাবটোটাল",
      deliveryNote: "ডেলিভারি চার্জ চেকআউটে যুক্ত হবে", checkout: "চেকআউটে যান", removeItem: "পণ্য মুছুন", defaultWeight: "২৫০ গ্রাম",
    },
    modal: { close: "বন্ধ করুন", chooseWeight: "ওজন বেছে নিন", reviews: "রিভিউ", addToCart: "কার্টে যোগ করুন", deliveryNote: "ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি", inStock: "ইন স্টক", off: "OFF", variants: ["১০০ গ্রাম", "২৫০ গ্রাম", "৫০০ গ্রাম"] },
    checkout: {
      back: "শপিং চালিয়ে যান", secure: "নিরাপদ চেকআউট", kicker: "শেষ ধাপ", heading: "অর্ডার নিশ্চিত করুন",
      intro: "আপনার ঠিকানা দিন, আমরা যত্ন করে প্যাক করে পাঠিয়ে দেব।", name: "আপনার নাম", namePlaceholder: "পুরো নাম লিখুন",
      phone: "ফোন নম্বর", phonePlaceholder: "01XXXXXXXXX", address: "সম্পূর্ণ ঠিকানা", addressPlaceholder: "বাসা, রোড, এলাকা লিখুন",
      zone: "ডেলিভারি জোন", zoneInside: "ঢাকার ভিতরে — ৳৬০", zoneOutside: "ঢাকার বাইরে — ৳১২০",
      paymentHeading: "পেমেন্ট পদ্ধতি", cod: "ক্যাশ অন ডেলিভারি", selected: "নির্বাচিত", placeOrder: "অর্ডার নিশ্চিত করুন", emptyCart: "কার্ট খালি",
      summaryKicker: "আপনার অর্ডার", summaryHeading: "অর্ডার সামারি", subtotal: "সাবটোটাল", delivery: "ডেলিভারি", grandTotal: "সর্বমোট",
      benefitDelivery: "ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি", benefitCod: "পণ্য হাতে, তারপর পেমেন্ট", secureNote: "নিরাপদ এবং বিশ্বস্ত অর্ডার",
      successKicker: "অর্ডার গ্রহণ করা হয়েছে", successHeading: "ধন্যবাদ", successBody: "আপনার অর্ডারটি RAYYAN টিমের কাছে পৌঁছে গেছে। খুব শিগগিরই আমরা আপনার সঙ্গে যোগাযোগ করব।",
      continueShopping: "শপিং চালিয়ে যান", adminLink: "অর্ডার ম্যানেজমেন্ট দেখুন", orderPlacedAlert: "ধন্যবাদ! আপনার অর্ডারটি গ্রহণ করা হয়েছে।",
    },
    payment: {
      heading: "পেমেন্ট পদ্ধতি",
      methods: { cod: "ক্যাশ অন ডেলিভারি", bkash: "বিকাশ", nagad: "নগদ" },
      codNote: "পণ্য হাতে পাওয়ার পর টাকা পরিশোধ করুন।",
      sendMoneyNote: "নিচের নম্বরে {amount} সেন্ড মানি করুন, তারপর TrxID নিচে লিখুন।",
      merchantLabel: "{method} নম্বর",
      trxLabel: "ট্রানজেকশন আইডি (TrxID)",
      trxPlaceholder: "যেমন 9F2X3ABC01",
      trxRequired: "অর্ডার নিশ্চিত করার আগে TrxID লিখুন।",
      summaryLabel: "পেমেন্ট পদ্ধতি",
      codSummary: "ডেলিভারির সময় {amount} পরিশোধ করুন।",
      digitalSummary: "TrxID {trx} — আমরা পেমেন্ট যাচাই করে নিশ্চিত করব।",
    },
    gallery: { package: "প্যাকেজ", ingredients: "উপকরণ", video: "ভিডিও", media: "পণ্যের মিডিয়া", view: "দেখুন", playVideo: "ভিডিও চালান", pauseVideo: "ভিডিও থামান", unmute: "শব্দ চালু করুন", mute: "শব্দ বন্ধ করুন", muted: "মিউটেড", soundOn: "শব্দ চালু" },
    notFound: { title: "পণ্যটি পাওয়া যায়নি", body: "অ্যাডমিন থেকে পণ্যটি মুছে ফেলা হয়েছে অথবা লিংকটি সঠিক নয়।" },
    categoryNames: { "গুঁড়া মসলা": "গুঁড়া মসলা", "গোটা মসলা": "গোটা মসলা", "রেডি-টু-কুক": "রেডি-টু-কুক", "প্রিমিয়াম কম্বো": "প্রিমিয়াম কম্বো" },
  },
  en: {
    topbar: { delivery: "Cash on delivery in Dhaka within 24–48 hours", nationwide: "Nationwide delivery", from: "from ৳60" },
    nav: { menu: "Menu", tagline: "Purity in every taste", products: "All products", categories: "Categories", story: "Our story", search: "Search spices or products...", wishlist: "Wishlist", cart: "Cart", language: "বাংলা" },
    hero: {
      slides: [
        { title: "100% pure powdered spices", subtitle: "Bring complete satisfaction to every meal with unadulterated flavor and aroma", badge: "Farm fresh", button: "Explore spice collection", alt: "Pure powdered spices" },
        { title: "Handpicked premium whole spices", subtitle: "The bold aroma of real cardamom, cinnamon, and cloves", badge: "Handpicked", button: "Explore whole spices", alt: "Handpicked whole spices" },
        { title: "Washed and cut ready-to-cook vegetables", subtitle: "Vacuum-packed fresh cuts that cut your cooking time in half", badge: "Vacuum sealed", button: "Order vegetables", alt: "Fresh ready-to-cook vegetables" },
        { title: "Monthly grocery special combo pack", subtitle: "Save up to 25% on essential spices and cooking bundles", badge: "Special offer", button: "Explore combo pack", alt: "Premium kitchen combo" },
      ],
      avatars: ["S", "M", "A"],
      categories: "Explore categories", families: "5,000+ families", familiesNote: "choose RAYYAN every day", pure: "Pure", fresh: "FRESH", previous: "Previous slide", next: "Next slide", select: "Select hero slide", slide: "slide",
    },
    trust: [
      { title: "100% pure", note: "Guaranteed purity" },
      { title: "Chemical free", note: "Safe, natural food" },
      { title: "Vacuum packed", note: "Stays fresh for longer" },
      { title: "Cash on delivery", note: "Pay once it reaches you" },
    ],
    categories: {
      kicker: "For your kitchen", heading: "What are you looking for today?", viewAll: "View all",
      items: [
        { label: "Powder Spices", count: "24 Products", alt: "Fresh powdered spices" },
        { label: "Whole Spices", count: "18 Products", alt: "Cinnamon, cardamom and whole spices" },
        { label: "Ready to Cook", count: "12 Products", alt: "Freshly cut ready-to-cook vegetables" },
        { label: "Premium Combos", count: "8 Products", alt: "Premium spice combo" },
      ],
    },
    offer: { kicker: "This week's kitchen offer", headingBefore: "Save ", headingHighlight: "20% on three combos", timerLabel: "Offer ends in", timerValue: "02 : 14 : 36", cta: "View offer" },
    products: { kicker: "RAYYAN's picks", heading: "This week's best products", tabs: ["All", "Spices", "Ready-to-cook"], emptyTitle: "No products found", emptyBody: "Pick another category, or try a different search term." },
    story: {
      kicker: "Why RAYYAN?", headingTop: "Let flavor begin", headingEm: "with purity",
      body: "We believe good cooking needs nothing more than good ingredients. So we choose every spice and vegetable from transparent sources, keeping their natural aroma, color and nutrition intact.",
      points: ["Straight from the farmer", "Freshly packed in small batches"], cta: "Learn about RAYYAN",
      badgeNumber: "01", badgeText: "From the source to your home", imageAlt: "Natural spices",
    },
    footer: {
      tagline: "Purity in every taste", copyright: "© 2026 RAYYAN Bangladesh · All rights reserved",
      about: "We believe good cooking only needs good ingredients. Pure spices, organic pantry staples and ready-to-cook vegetables — delivered straight to your home.",
      familiesCount: "5,000+", familiesNote: "families trust our kitchen",
      newsletterKicker: "RAYYAN NEWSLETTER", newsletterHeading: "Get new products and offers", newsletterHighlight: "first",
      newsletterNote: "Use this code for 10% off your first order", newsletterCode: "RAYYAN25",
      newsletterPlaceholder: "Enter your email", newsletterButton: "Subscribe",
      newsletterSuccess: "Thanks! New offers are on their way to your inbox.", newsletterInvalid: "Enter a valid email address.",
      categoriesTitle: "CATEGORIES",
      categoryLinks: [
        { label: "Powder Spices", href: "/category/powder-spices" },
        { label: "Whole Spices", href: "/category/whole-spices" },
        { label: "Ready-to-Cook Vegetables", href: "/category/ready-to-cook" },
        { label: "Organic Pantry", href: "/category/pantry" },
        { label: "Combo Packs", href: "/category/combos" },
      ],
      viewAll: "View all products",
      helpTitle: "HELP",
      helpLinks: [
        { label: "Track your order", href: "/#products" },
        { label: "Delivery & payment", href: "/#products" },
        { label: "Returns & refunds", href: "/#products" },
        { label: "FAQ", href: "/#products" },
        { label: "Our story", href: "/#story" },
        { label: "Wholesale orders", href: "/#products" },
      ],
      contactTitle: "CONTACT", contactLabel: "Orders & support", phone: "09610 000 000", email: "hello@rayyan.com.bd",
      address: ["House 12, Road 5, Dhanmondi,", "Dhaka 1205, Bangladesh"], hours: "Sat–Thu, 10:00 AM – 8:00 PM",
      paymentLabel: "PAYMENT", paymentMethods: ["Cash on delivery", "bKash", "Nagad", "Rocket", "VISA · MASTERCARD"],
      secureNote: "Safe and trusted ordering",
      legalLinks: [
        { label: "Terms", href: "/#products" },
        { label: "Privacy policy", href: "/#products" },
        { label: "Refund policy", href: "/#products" },
      ],
      packedIn: "✦ Packed in Dhaka",
    },
    card: { kicker: "RAYYAN GOURMET", addToCart: "Add to cart", quickView: "Quick view", wishlist: "Add to wishlist", cartAction: "Add to cart", ingredientsAlt: "ingredients", off: "OFF" },
    pdp: {
      back: "Continue shopping", home: "Home", cart: "Cart", reviews: "reviews", inStock: "In stock",
      weightHeading: "Weight / size", variants: ["100 g", "250 g", "500 g combo"],
      decrease: "Decrease quantity", increase: "Increase quantity", addToCart: "Add to cart", buyNow: "Order now",
      deliveryTitle: "Delivery in Dhaka within 24–48 hours", deliveryNote: "Cash on delivery available nationwide",
      trustRow: ["100% organic", "Vacuum packed", "Cash on delivery", "24–48 hours"],
      tabs: { description: "Description", nutrition: "Nutrition & ingredients", storage: "Storage" },
      tabEmpty: "Information for this product is coming soon.", off: "OFF",
    },
    cart: {
      kicker: "Your shopping bag", title: "Cart", close: "Close cart", freeDelivery: "Your delivery is free!",
      freeDeliveryRemaining: "Spend {amount} more for free delivery!", subtotal: "Subtotal",
      deliveryNote: "Delivery charge is added at checkout", checkout: "Go to checkout", removeItem: "Remove item", defaultWeight: "250 g",
    },
    modal: { close: "Close", chooseWeight: "Choose a weight", reviews: "reviews", addToCart: "Add to cart", deliveryNote: "Delivery in Dhaka within 24–48 hours", inStock: "In stock", off: "OFF", variants: ["100 g", "250 g", "500 g"] },
    checkout: {
      back: "Continue shopping", secure: "Secure checkout", kicker: "Final step", heading: "Confirm your order",
      intro: "Share your address and we will pack it with care and send it over.", name: "Your name", namePlaceholder: "Enter your full name",
      phone: "Phone number", phonePlaceholder: "01XXXXXXXXX", address: "Full address", addressPlaceholder: "House, road, area",
      zone: "Delivery zone", zoneInside: "Inside Dhaka — ৳60", zoneOutside: "Outside Dhaka — ৳120",
      paymentHeading: "Payment method", cod: "Cash on delivery", selected: "Selected", placeOrder: "Confirm order", emptyCart: "Cart is empty",
      summaryKicker: "Your order", summaryHeading: "Order summary", subtotal: "Subtotal", delivery: "Delivery", grandTotal: "Total",
      benefitDelivery: "Delivery in Dhaka within 24–48 hours", benefitCod: "Pay once it reaches you", secureNote: "Safe and trusted ordering",
      successKicker: "Order received", successHeading: "Thank you", successBody: "Your order has reached the RAYYAN team. We will get in touch with you very soon.",
      continueShopping: "Continue shopping", adminLink: "Open order management", orderPlacedAlert: "Thank you! Your order has been received.",
    },
    payment: {
      heading: "Payment method",
      methods: { cod: "Cash on delivery", bkash: "bKash", nagad: "Nagad" },
      codNote: "Pay once the order reaches you.",
      sendMoneyNote: "Send {amount} to the number below, then enter the TrxID.",
      merchantLabel: "{method} number",
      trxLabel: "Transaction ID (TrxID)",
      trxPlaceholder: "e.g. 9F2X3ABC01",
      trxRequired: "Enter the TrxID before confirming the order.",
      summaryLabel: "Payment method",
      codSummary: "Pay {amount} when the order arrives.",
      digitalSummary: "TrxID {trx} — we will verify the payment and confirm.",
    },
    gallery: { package: "Package", ingredients: "Ingredients", video: "Video", media: "Product media", view: "view", playVideo: "Play video", pauseVideo: "Pause video", unmute: "Turn sound on", mute: "Turn sound off", muted: "Muted", soundOn: "Sound on" },
    notFound: { title: "Product not found", body: "The product was removed from the admin panel, or the link is not correct." },
    categoryNames: { "গুঁড়া মসলা": "Powder Spices", "গোটা মসলা": "Whole Spices", "রেডি-টু-কুক": "Ready to Cook", "প্রিমিয়াম কম্বো": "Premium Combos" },
  },
};

/** Locale-aware number formatting: Bengali digits for bn, Western digits for en. */
export function formatNumber(value: number, language: Language) {
  return value.toLocaleString(language === "bn" ? "bn-BD" : "en-US");
}

export function formatPrice(value: number, language: Language) {
  return `৳${formatNumber(value, language)}`;
}

/** Product titles live on the record itself: bn for Bangla, name for English. */
export function productTitle(product: { name: string; bn: string }, language: Language) {
  return language === "en" ? product.name : product.bn;
}

export function localizeCategory(category: string, language: Language) {
  return translations[language].categoryNames[category] || category;
}

type LanguageContextValue = { language: Language; toggleLanguage: () => void; t: Translation };
const LanguageContext = createContext<LanguageContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const language = useSyncExternalStore<Language>(
    (onStoreChange) => {
      window.addEventListener("storage", onStoreChange);
      window.addEventListener("rayyan-language-change", onStoreChange);
      return () => {
        window.removeEventListener("storage", onStoreChange);
        window.removeEventListener("rayyan-language-change", onStoreChange);
      };
    },
    () => {
      const savedLanguage = window.localStorage.getItem("rayyan-language");
      return savedLanguage === "en" ? "en" : "bn";
    },
    // Server snapshot. React also uses this for the hydration pass, so the first
    // client render matches the server HTML exactly; the stored language is
    // applied on the re-render that follows.
    () => "bn",
  );
  const toggleLanguage = () => {
    window.localStorage.setItem("rayyan-language", language === "bn" ? "en" : "bn");
    window.dispatchEvent(new Event("rayyan-language-change"));
  };

  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return <LanguageContext.Provider value={{ language, toggleLanguage, t: translations[language] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) throw new Error("useLanguage must be used inside LanguageProvider");
  return context;
}

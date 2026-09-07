"use client";

import { createContext, useContext, useEffect, useSyncExternalStore, type ReactNode } from "react";

export type Language = "bn" | "en";

type Translation = {
  topbar: { delivery: string; nationwide: string; from: string };
  nav: { menu: string; tagline: string; products: string; categories: string; story: string; search: string; wishlist: string; cart: string; language: string };
  hero: {
    slides: Array<{ title: string; subtitle: string; badge: string; button: string; alt: string }>;
    categories: string; families: string; familiesNote: string; pure: string; fresh: string; previous: string; next: string; select: string; slide: string;
  };
};

const translations: Record<Language, Translation> = {
  bn: {
    topbar: { delivery: "ঢাকার ভিতরে ২৪–৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারি", nationwide: "সারা দেশে ডেলিভারি", from: "৳৬০ থেকে" },
    nav: { menu: "মেনু", tagline: "রসনায় বিশুদ্ধতা", products: "সব পণ্য", categories: "ক্যাটাগরি", story: "আমাদের গল্প", search: "মসলা বা পণ্য খুঁজুন...", wishlist: "উইশলিস্ট", cart: "কার্ট", language: "English" },
    hero: {
      slides: [
        { title: "শতভাগ খাঁটি গুঁড়া মসলা", subtitle: "ভেজালমুক্ত স্বাদ ও ঘ্রাণে রান্নায় আনুন পরিপূর্ণ তৃপ্তি", badge: "ফার্ম ফ্রেশ", button: "মসলা কালেকশন দেখুন", alt: "খাঁটি গুঁড়া মসলা" },
        { title: "বাছাইকৃত প্রিমিয়াম গোটা মসলা", subtitle: "আসল এলাচ, দারুচিনি ও লবঙ্গের তীব্র সুবাস", badge: "হাতে বাছাইকৃত", button: "গোটা মসলা দেখুন", alt: "বাছাইকৃত গোটা মসলা" },
        { title: "ধোয়া ও কাটা রেডি-টু-কুক সবজি", subtitle: "ভ্যাকুয়াম প্যাকড ফ্রেশ কাটিং, রান্নার সময় বাঁচান অর্ধেক", badge: "ভ্যাকুয়াম সিল্ড", button: "সবজি অর্ডার করুন", alt: "রেডি-টু-কুক তাজা সবজি" },
        { title: "মাসিক বাজার স্পেশাল কম্বো প্যাক", subtitle: "প্রয়োজনীয় মসলা ও রান্নার প্যাকেজে সর্বোচ্চ ২৫% পর্যন্ত সাশ্রয়", badge: "স্পেশাল অফার", button: "কম্বো প্যাক দেখুন", alt: "প্রিমিয়াম রান্নাঘর কম্বো" },
      ],
      categories: "ক্যাটাগরি দেখুন", families: "৫,০০০+ পরিবার", familiesNote: "প্রতিদিন RAYYAN বেছে নেয়", pure: "খাঁটি", fresh: "FRESH", previous: "আগের স্লাইড", next: "পরের স্লাইড", select: "হিরো স্লাইড নির্বাচন", slide: "নম্বর স্লাইড",
    },
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
      categories: "Explore categories", families: "5,000+ families", familiesNote: "choose RAYYAN every day", pure: "Pure", fresh: "FRESH", previous: "Previous slide", next: "Next slide", select: "Select hero slide", slide: "slide",
    },
  },
};

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
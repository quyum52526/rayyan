import type { Language } from "@/context/LanguageContext";

/** The five storefront categories. Every product resolves to exactly one of these. */
export const CATEGORY_SLUGS = ["basic-spices", "aromatics-powder", "ready-to-cook", "wellness-drinks", "dry-food"] as const;

export type CategorySlug = (typeof CATEGORY_SLUGS)[number];

export type CategoryDefinition = {
  slug: CategorySlug;
  /** Bangla display name — the label the storefront shows by default. */
  bn: string;
  en: string;
  subtitleBn: string;
  subtitleEn: string;
  /** Banner art for the category header bar and the category landing page. */
  banner: string;
  altBn: string;
  altEn: string;
};

export const CATEGORIES: readonly CategoryDefinition[] = [
  {
    slug: "basic-spices",
    bn: "মৌলিক মশলা",
    en: "Basic Spices",
    subtitleBn: "হলুদ, মরিচ, ধনিয়া, জিরা ইত্যাদি খাঁটি মশলা",
    subtitleEn: "Turmeric, chili, coriander, cumin and other pure spices",
    banner: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=85",
    altBn: "খাঁটি মৌলিক মশলা",
    altEn: "Pure basic spices",
  },
  {
    slug: "aromatics-powder",
    bn: "গুঁড়া মসলা ও বাটা বিকল্প",
    en: "Aromatics & Herb Powders",
    subtitleBn: "পেঁয়াজের গুঁড়া, আদার গুঁড়া, রসুনের গুঁড়া, কাঁচা মরিচের গুঁড়া",
    subtitleEn: "Onion, ginger, garlic and green chili powders",
    banner: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1100&q=85",
    altBn: "গুঁড়া মসলা ও বাটার বিকল্প",
    altEn: "Aromatic herb powders",
  },
  {
    slug: "ready-to-cook",
    bn: "রেডি-টু-কুক সবজি",
    en: "Ready to Cook",
    subtitleBn: "ধোয়া ও কাটা সবজির ভ্যাকুয়াম প্যাক",
    subtitleEn: "Washed and cut vegetable packs",
    banner: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1100&q=85",
    altBn: "রেডি-টু-কুক তাজা সবজি",
    altEn: "Fresh ready-to-cook vegetables",
  },
  {
    slug: "wellness-drinks",
    bn: "ভেষজ ও হেলথ ড্রিংকস",
    en: "Wellness & Fruit Drinks",
    subtitleBn: "মরিঙ্গা পাউডার, বিটরুট পাউডার ইত্যাদি ভেষজ পানীয়",
    subtitleEn: "Moringa, beetroot and other wellness powders",
    banner: "https://images.unsplash.com/photo-1610970881699-44a5587cabec?auto=format&fit=crop&w=1100&q=85",
    altBn: "ভেষজ ও হেলথ ড্রিংকস",
    altEn: "Wellness and fruit drink powders",
  },
  {
    slug: "dry-food",
    bn: "ড্রাই ফুড",
    en: "Dry Food & Nuts",
    subtitleBn: "শুকনো খাবার ও বাদাম আইটেম",
    subtitleEn: "Dry foods and nut items",
    banner: "https://images.unsplash.com/photo-1508747703725-719777637510?auto=format&fit=crop&w=1100&q=85",
    altBn: "শুকনো খাবার ও বাদাম",
    altEn: "Dry foods and nuts",
  },
];

/** Products that fall outside the five categories land here rather than disappearing. */
export const DEFAULT_CATEGORY_SLUG: CategorySlug = "basic-spices";

/**
 * The weekly-hot-deals flag is a promo marker, never one of the five categories:
 * a hot-deal product still belongs to its real category section.
 */
export const HOT_DEALS_SLUG = "weekly-hot-deals";

const hotDealAliases = new Set(["weekly-hot-deals", "hot-sales", "hot-deals", "weekly hot deals", "সাপ্তাহিক হট ডিল", "হট সেল"]);

/**
 * Categories written before the five-slug schema, including the Bangla names that were
 * stored directly on the product record. Combo packs have no successor category, so they
 * fold into the basic-spices shelf.
 */
const legacyCategoryMap: Readonly<Record<string, CategorySlug>> = {
  "গুঁড়া মসলা": "basic-spices",
  "powder-spices": "basic-spices",
  "গোটা মসলা": "basic-spices",
  "whole-spices": "basic-spices",
  "রেডি-টু-কুক": "ready-to-cook",
  "রেডি-টু-কুক সবজি": "ready-to-cook",
  "প্রিমিয়াম কম্বো": "basic-spices",
  combos: "basic-spices",
  pantry: "dry-food",
  "অর্গানিক প্যান্ট্রি": "dry-food",
};

const categoryBySlug = new Map<CategorySlug, CategoryDefinition>(CATEGORIES.map((category) => [category.slug, category]));

export function isCategorySlug(value: string): value is CategorySlug {
  return CATEGORY_SLUGS.includes(value as CategorySlug);
}

export function getCategory(slug: string): CategoryDefinition | undefined {
  return isCategorySlug(slug) ? categoryBySlug.get(slug) : undefined;
}

/** True when a raw category/tag value marks the product as a weekly hot deal. */
export function isHotDealsValue(value: string | undefined): boolean {
  return value !== undefined && hotDealAliases.has(value.trim().toLowerCase());
}

/**
 * Maps any stored category value — new slug, legacy slug, legacy Bangla name, or the
 * hot-deals promo marker — onto one of the five category slugs.
 */
export function resolveCategorySlug(value: string | undefined): CategorySlug {
  if (!value) return DEFAULT_CATEGORY_SLUG;
  const trimmed = value.trim();
  if (isCategorySlug(trimmed)) return trimmed;
  return legacyCategoryMap[trimmed] ?? legacyCategoryMap[trimmed.toLowerCase()] ?? DEFAULT_CATEGORY_SLUG;
}

/**
 * Keyword hints for records whose stored category predates the five-slug schema. The legacy
 * Bangla name "গুঁড়া মসলা" covered both basic spices and the onion/ginger/garlic powders, so
 * the product name is the only thing that separates them.
 */
const categoryKeywords: readonly { slug: CategorySlug; keywords: readonly string[] }[] = [
  {
    slug: "aromatics-powder",
    keywords: ["onion", "ginger", "garlic", "green chili", "green chilli", "পেঁয়াজ", "আদা", "রসুন", "কাঁচা মরিচ"],
  },
  {
    slug: "wellness-drinks",
    keywords: ["moringa", "beetroot", "beet root", "spirulina", "health drink", "wellness", "মরিঙ্গা", "মরিঙ্গ", "বিটরুট", "সজিনা", "ভেষজ"],
  },
  {
    slug: "dry-food",
    keywords: ["almond", "cashew", "walnut", "pistachio", "raisin", "dates", "nut", "dry food", "বাদাম", "কাজু", "কিশমিশ", "খেজুর", "শুকনো"],
  },
  {
    slug: "ready-to-cook",
    keywords: ["ready to cook", "ready-to-cook", "vegetable pack", "রেডি-টু-কুক", "কাটা সবজি"],
  },
];

/**
 * Best-guess category from a product's names. Only consulted for records that do not already
 * carry one of the five slugs, so an admin's explicit choice always wins.
 */
export function inferCategorySlug(...names: (string | undefined)[]): CategorySlug | undefined {
  const haystack = names.filter((name): name is string => Boolean(name)).join(" ").toLowerCase();
  if (!haystack) return undefined;
  return categoryKeywords.find(({ keywords }) => keywords.some((keyword) => haystack.includes(keyword)))?.slug;
}

export function categoryLabel(slug: CategorySlug, language: Language): string {
  const category = categoryBySlug.get(slug);
  if (!category) return slug;
  return language === "en" ? category.en : category.bn;
}

export function categorySubtitle(slug: CategorySlug, language: Language): string {
  const category = categoryBySlug.get(slug);
  if (!category) return "";
  return language === "en" ? category.subtitleEn : category.subtitleBn;
}

export function categoryAlt(slug: CategorySlug, language: Language): string {
  const category = categoryBySlug.get(slug);
  if (!category) return "";
  return language === "en" ? category.altEn : category.altBn;
}

export function categoryHref(slug: CategorySlug): string {
  return `/category/${slug}`;
}

import { inferCategorySlug, isCategorySlug, isHotDealsValue, resolveCategorySlug, type CategorySlug } from "@/lib/categories";

/** One pack size a product is sold in, priced on its own. `size` is the shopper-facing label. */
export type ProductVariant = { size: string; price: number; originalPrice: number };

export type Product = {
  id: number;
  slug: string;
  sku?: string;
  name: string;
  bn: string;
  price: number;
  oldPrice: number;
  /** Weight of the pack that `price` and `oldPrice` describe, e.g. "১০০ গ্রাম". Also marks the default pack. */
  weight?: string;
  /** Pack sizes sold at their own prices. Without it the product sells as one pack at `price`. */
  variants?: ProductVariant[];
  stock: number;
  rating: number;
  reviews: number;
  /**
   * Storefront category. Normalized records hold one of the five CategorySlug values;
   * records written before that schema can still hold a legacy slug or Bangla name, so
   * always read it through resolveCategorySlug / normalizeProduct.
   */
  category: string;
  /** Weekly hot deals promo flag. Kept separate so a deal keeps its real category. */
  hotDeal?: boolean;
  image: string;
  image2?: string;
  video?: string;
  tag?: string;
  description?: string;
  nutrition?: string;
  storageInstructions?: string;
};

/** A product whose category is guaranteed to be one of the five category slugs. */
export type NormalizedProduct = Product & { category: CategorySlug };

/**
 * Gives every product a valid category slug and carries the weekly-hot-deals flag over
 * from records that stored it as the category or the tag instead of a boolean.
 */
export function normalizeProduct(product: Product): NormalizedProduct {
  const hotDeal = isHotDeal(product);
  const stored = product.category?.trim() ?? "";
  // An explicit slug is authoritative; anything older is read from the product names first,
  // then from the legacy category map.
  const category = isCategorySlug(stored)
    ? stored
    : inferCategorySlug(product.name, product.bn) ?? resolveCategorySlug(stored);
  const { variants: storedVariants, ...rest } = product;
  const variants = sanitizeVariants(storedVariants);
  return { ...rest, category, ...(variants.length > 0 ? { variants } : {}), ...(hotDeal ? { hotDeal: true } : {}) };
}

export function normalizeProducts(products: Product[]): NormalizedProduct[] {
  return products.map(normalizeProduct);
}

export function isHotDeal(product: Product): boolean {
  return product.hotDeal === true || isHotDealsValue(product.category) || isHotDealsValue(product.tag);
}

/** Products of one category, capped — the homepage shelves pass 4. */
export function productsInCategory(products: Product[], slug: CategorySlug, limit?: number): Product[] {
  const matches = products.filter((product) => resolveCategorySlug(product.category) === slug);
  return limit === undefined ? matches : matches.slice(0, limit);
}

/** Name/category text match used by the navbar search and the /search page. */
export function matchesQuery(product: Product, query: string): boolean {
  const trimmed = query.trim().toLowerCase();
  if (!trimmed) return true;
  return `${product.name} ${product.bn} ${product.category} ${product.sku ?? ""}`.toLowerCase().includes(trimmed);
}

/**
 * Keeps only packs with a label and a positive price, first one per label winning. A missing or
 * lower original price falls back to the pack price so no pack ever shows a negative discount.
 */
function sanitizeVariants(value: unknown): ProductVariant[] {
  if (!Array.isArray(value)) return [];
  const seen = new Set<string>();
  return value.flatMap((entry) => {
    if (typeof entry !== "object" || entry === null) return [];
    const { size, price, originalPrice } = entry as Partial<Record<keyof ProductVariant, unknown>>;
    const label = typeof size === "string" ? size.trim() : "";
    const unitPrice = Number(price);
    if (!label || seen.has(label) || !Number.isFinite(unitPrice) || unitPrice <= 0) return [];
    seen.add(label);
    const original = Number(originalPrice);
    return [{ size: label, price: unitPrice, originalPrice: Number.isFinite(original) && original >= unitPrice ? original : unitPrice }];
  });
}

/**
 * The packs a product can be bought in. A product without its own variants sells as a single
 * pack at its base price, labelled with its base weight — an empty size when that is unknown,
 * which the UI renders as its localized default weight.
 */
export function productVariants(product: Product): ProductVariant[] {
  const listed = sanitizeVariants(product.variants);
  if (listed.length > 0) return listed;
  return [{ size: product.weight?.trim() ?? "", price: product.price, originalPrice: product.oldPrice }];
}

/** The pack preselected for a product: the one matching its base weight, else the first. */
export function defaultVariant(product: Product): ProductVariant {
  const variants = productVariants(product);
  const weight = product.weight?.trim();
  return variants.find((variant) => weight && variant.size === weight) ?? variants[0];
}

/** The pack with this label, falling back to the default when it no longer exists. */
export function findVariant(product: Product, size: string | undefined): ProductVariant {
  return productVariants(product).find((variant) => variant.size === (size ?? "")) ?? defaultVariant(product);
}

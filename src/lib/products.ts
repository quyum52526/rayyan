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
  /** Listed but not yet sellable. Unpriced (price <= 0) products are treated the same way. */
  comingSoon?: boolean;
  rating: number;
  reviews: number;
  /**
   * Storefront category. Normalized records hold one of the six CategorySlug values;
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

export type ProductAvailability = "available" | "coming-soon" | "out-of-stock";

/** Whether a product can be bought: flagged or unpriced items are coming soon, priced items with no stock are sold out. */
export function getProductAvailability(product: Pick<Product, "price" | "stock" | "comingSoon">): ProductAvailability {
  if (product.comingSoon === true || !(product.price > 0)) return "coming-soon";
  if (product.stock <= 0) return "out-of-stock";
  return "available";
}

/** A product whose category is guaranteed to be one of the six category slugs. */
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

/** Percent off the old price; 0 when there is no real markdown. */
export function discountPercent(product: Pick<Product, "price" | "oldPrice">): number {
  return product.oldPrice > product.price && product.price > 0 ? (product.oldPrice - product.price) / product.oldPrice : 0;
}

/**
 * Ranks products for the homepage picks: sellable items first, then hot deals, then
 * best sellers (reviews, then rating), then the deepest discount. Ties keep catalog order.
 */
function comparePickPriority(a: Product, b: Product): number {
  return Number(getProductAvailability(b) === "available") - Number(getProductAvailability(a) === "available")
    || Number(isHotDeal(b)) - Number(isHotDeal(a))
    || b.reviews - a.reviews
    || b.rating - a.rating
    || discountPercent(b) - discountPercent(a);
}

/**
 * "This week's best products": the highest-priority products of each category, at most
 * `perCategory` from any one, so no single category dominates the shelf.
 */
export function curatedWeeklyPicks(products: Product[], perCategory = 2): Product[] {
  const taken = new Map<string, number>();
  return [...products].sort(comparePickPriority).filter((product) => {
    const category = resolveCategorySlug(product.category);
    const count = taken.get(category) ?? 0;
    if (count >= perCategory) return false;
    taken.set(category, count + 1);
    return true;
  });
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

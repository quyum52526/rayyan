import { inferCategorySlug, isCategorySlug, isHotDealsValue, resolveCategorySlug, type CategorySlug } from "@/lib/categories";

export type Product = {
  id: number;
  slug: string;
  sku?: string;
  name: string;
  bn: string;
  price: number;
  oldPrice: number;
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
  return { ...product, category, ...(hotDeal ? { hotDeal: true } : {}) };
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

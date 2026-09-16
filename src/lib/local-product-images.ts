import type { Product } from "@/lib/products";

/**
 * Three products whose art lives in `public/` instead of the blob store.
 *
 * Their catalog records still carry blob URLs that no longer serve (the store returns 403),
 * so the stored `image`/`image2` are overridden on read. Matching is done on the product's
 * own text rather than its id because the records these apply to are only ever seen through
 * the remote catalog — there is no local seed row to key off.
 */
type LocalImageOverride = {
  /** Every term that identifies the product, in English and Bangla. Any one match wins. */
  match: string[];
  image: string;
};

const LOCAL_IMAGE_OVERRIDES: LocalImageOverride[] = [
  { match: ["beetroot", "beet root", "বিটরুট", "বিট রুট"], image: "/3-products/beetroot-powder.jpeg" },
  { match: ["moringa", "মরিঙ্গা", "সজিনা", "সজনে"], image: "/3-products/moringa-powder.jpg" },
  { match: ["rosella", "roselle", "রোসেলা", "চুকাই", "মেস্তা"], image: "/3-products/rosella-tea-powder.jpeg" },
];

/**
 * Applies a local override when one matches, and drops `image2` with it: the second angle
 * still points at the unreachable blob, so leaving it would break the card's hover swap.
 */
export function applyLocalImageOverride<T extends Product>(product: T): T {
  const haystack = `${product.name} ${product.bn} ${product.slug} ${product.sku ?? ""}`.toLowerCase();
  const override = LOCAL_IMAGE_OVERRIDES.find((entry) => entry.match.some((term) => haystack.includes(term)));
  if (!override) return product;
  const next = { ...product, image: override.image };
  delete next.image2;
  return next;
}

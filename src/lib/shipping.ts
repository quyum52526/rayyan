/**
 * Single source of truth for delivery pricing. Both checkout paths (the /checkout page and
 * the home-page checkout modal) read from here so the two can never drift apart.
 */
export type DeliveryZone = "inside" | "outside";

export const DELIVERY_RATES: Record<DeliveryZone, number> = {
  inside: 60,
  outside: 120,
};

export function deliveryFeeFor(zone: DeliveryZone): number {
  return DELIVERY_RATES[zone];
}

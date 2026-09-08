export type PaymentMethod = "cod" | "bkash" | "nagad";

export type DigitalPaymentMethod = Exclude<PaymentMethod, "cod">;

export const paymentMethods: PaymentMethod[] = ["cod", "bkash", "nagad"];

/**
 * Numbers customers are told to send money to.
 *
 * These are deliberately unset placeholders, not real accounts. Replace both
 * with the live merchant/personal numbers before taking payments, otherwise the
 * checkout instructs customers to pay a number that does not exist.
 */
export const merchantNumbers: Record<DigitalPaymentMethod, string> = {
  bkash: "01XXXXXXXXX",
  nagad: "01XXXXXXXXX",
};

/** bKash and Nagad are paid up front, so an order needs its TrxID to be reconciled. */
export function requiresTransactionId(method: PaymentMethod): method is DigitalPaymentMethod {
  return method === "bkash" || method === "nagad";
}

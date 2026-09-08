"use client";

import { Check } from "lucide-react";
import { formatPrice, useLanguage } from "@/context/LanguageContext";
import { merchantNumbers, paymentMethods, requiresTransactionId, type PaymentMethod } from "@/lib/payment";

type PaymentMethodFieldsProps = {
  value: PaymentMethod;
  onChange: (method: PaymentMethod) => void;
  transactionId: string;
  onTransactionIdChange: (transactionId: string) => void;
  /** Amount the customer is told to send, when paying up front. */
  amount: number;
  error?: string;
  /** Distinguishes the radio group when both checkout flows are mounted. */
  name?: string;
};

/**
 * Payment selection shared by the checkout page and the home page checkout
 * modal, so the two flows cannot drift apart.
 */
export default function PaymentMethodFields({ value, onChange, transactionId, onTransactionIdChange, amount, error, name = "paymentMethod" }: PaymentMethodFieldsProps) {
  const { language, t } = useLanguage();
  const needsTransactionId = requiresTransactionId(value);

  return (
    <>
      <div className="payment-methods" role="radiogroup" aria-label={t.payment.heading}>
        {paymentMethods.map((method) => (
          <label className={`payment-method ${value === method ? "selected" : ""}`} key={method}>
            <input type="radio" name={name} value={method} checked={value === method} onChange={() => onChange(method)} />
            <span className="payment-method-name">{t.payment.methods[method]}</span>
            {value === method && <Check size={16} />}
          </label>
        ))}
      </div>
      {needsTransactionId ? (
        <div className="payment-instructions">
          <p>{t.payment.sendMoneyNote.replace("{amount}", formatPrice(amount, language))}</p>
          <div className="payment-merchant"><small>{t.payment.merchantLabel.replace("{method}", t.payment.methods[value])}</small><b>{merchantNumbers[value]}</b></div>
          <label>{t.payment.trxLabel}<input required value={transactionId} onChange={(event) => onTransactionIdChange(event.target.value)} placeholder={t.payment.trxPlaceholder} aria-invalid={Boolean(error)} /></label>
          {error && <p className="form-error">{error}</p>}
        </div>
      ) : (
        <div className="payment-option"><Check size={16} /> {t.payment.methods.cod} <span>{t.payment.codNote}</span></div>
      )}
    </>
  );
}

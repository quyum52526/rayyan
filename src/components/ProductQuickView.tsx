"use client";

import { Minus, Plus, ShoppingBag, Star, Truck, X } from "lucide-react";
import { useState } from "react";
import ProductGallery from "@/components/ProductGallery";
import { formatNumber, formatPrice, productTitle, useLanguage } from "@/context/LanguageContext";
import { defaultVariant, productVariants, type Product } from "@/lib/products";
import { cartAddition, type CartAddition } from "@/lib/store";

type ProductQuickViewProps = {
  product: Product;
  onClose: () => void;
  onAddToCart: (addition: CartAddition) => void;
};

/** Quick-view modal. Mount it with `key={product.id}` so the pack and quantity reset per product. */
export default function ProductQuickView({ product, onClose, onAddToCart }: ProductQuickViewProps) {
  const { language, t } = useLanguage();
  const variants = productVariants(product);
  const [selectedVariant, setSelectedVariant] = useState(() => defaultVariant(product));
  const [quantity, setQuantity] = useState(1);
  const totalPrice = selectedVariant.price * quantity;
  const totalOriginalPrice = selectedVariant.originalPrice * quantity;
  const discount = selectedVariant.originalPrice > selectedVariant.price
    ? Math.round((1 - selectedVariant.price / selectedVariant.originalPrice) * 100)
    : 0;
  const title = productTitle(product, language);

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="product-modal" onClick={(event) => event.stopPropagation()}>
        <button className="close-button" onClick={onClose} aria-label={t.modal.close}><X size={20} /></button>
        <ProductGallery productName={title} frontImage={product.image} detailImage={product.image2 || product.image} videoSrc={product.video} />
        <div className="modal-details">
          <div className="rating"><Star size={13} fill="currentColor" /> {formatNumber(product.rating, language)} <span>({formatNumber(product.reviews, language)} {t.modal.reviews})</span></div>
          <h2>{title}</h2>
          <p className="modal-en">{language === "en" ? product.bn : product.name}</p>
          <div className="variant-label">{t.modal.chooseWeight} <span>SKU: {product.sku || `RY-${product.id}01`}</span></div>
          <div className="variants" role="group" aria-label={t.modal.chooseWeight}>
            {variants.map((variant) => {
              const selected = variant.size === selectedVariant.size;
              return (
                <button type="button" className={selected ? "selected" : ""} aria-pressed={selected} onClick={() => setSelectedVariant(variant)} key={variant.size || "base"}>
                  {variant.size || t.cart.defaultWeight}
                </button>
              );
            })}
          </div>
          <div className="modal-price">
            <strong>{formatPrice(totalPrice, language)}</strong>
            {totalOriginalPrice > totalPrice && <del>{formatPrice(totalOriginalPrice, language)}</del>}
            {discount > 0 && <span>-{formatNumber(discount, language)}% {t.modal.off}</span>}
          </div>
          <div className="quantity-row">
            <div className="quantity">
              <button type="button" onClick={() => setQuantity((current) => Math.max(1, current - 1))} aria-label={t.pdp.decrease}><Minus size={15} /></button>
              <b>{formatNumber(quantity, language)}</b>
              <button type="button" onClick={() => setQuantity((current) => current + 1)} aria-label={t.pdp.increase}><Plus size={15} /></button>
            </div>
            <button className="primary-button modal-add" onClick={() => onAddToCart(cartAddition(product, selectedVariant, quantity))}>{t.modal.addToCart} <ShoppingBag size={17} /></button>
          </div>
          <div className="modal-note"><Truck size={15} /> {t.modal.deliveryNote} <span>{t.modal.inStock}</span></div>
        </div>
      </div>
    </div>
  );
}

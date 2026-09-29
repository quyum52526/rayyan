"use client";

import { Eye, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { formatNumber, formatPrice, localizeCategory, productTitle, useLanguage } from "@/context/LanguageContext";
import { handleProductImageError } from "@/lib/imageFallback";
import { getProductAvailability } from "@/lib/products";

export type CardProduct = {
  id: number;
  slug: string;
  name: string;
  bn: string;
  price: number;
  oldPrice: number;
  stock: number;
  comingSoon?: boolean;
  category: string;
  image: string;
  image2?: string;
  tag?: string;
};

type ProductCardProps = {
  product: CardProduct;
  liked: boolean;
  onToggleWishlist: () => void;
  onAddToCart: () => void;
  onQuickView: () => void;
};

/** Whole-number discount, or null when the product has no real markdown (unpriced / coming-soon items, missing or non-higher old price). */
export function getDiscountPercent(price: number, oldPrice: number): number | null {
  if (!Number.isFinite(price) || !Number.isFinite(oldPrice) || price <= 0 || oldPrice <= 0 || oldPrice <= price) return null;
  const percent = Math.round((1 - price / oldPrice) * 100);
  return percent > 0 ? percent : null;
}

export default function ProductCard({ product, liked, onToggleWishlist, onAddToCart, onQuickView }: ProductCardProps) {
  const { language, t } = useLanguage();
  const title = productTitle(product, language);
  const secondaryTitle = language === "en" ? product.bn : product.name;
  const availability = getProductAvailability(product);
  const purchasable = availability === "available";
  const unavailableLabel = availability === "coming-soon" ? t.card.comingSoon : t.card.outOfStock;
  const discountPercent = purchasable ? getDiscountPercent(product.price, product.oldPrice) : null;
  const discount = discountPercent === null ? null : `${formatNumber(discountPercent, language)}% ${t.card.off}`;

  return (
    <article className="product-card product-card-precision group">
      <div className="product-image product-media-swap">
        <Link className="product-card-link" href={`/products/${product.slug}`}>
          <img className="product-media product-media-front" src={product.image} alt={title} onError={handleProductImageError} />
          <img className="product-media product-media-hover" src={product.image2 || product.image} alt={`${title} ${t.card.ingredientsAlt}`} onError={handleProductImageError} />
          {discount && <span className={`product-discount ${product.tag === "ফ্রেশ" ? "fresh" : ""}`}>{discount}</span>}
        </Link>
        <div className="product-quick-actions">
          <button className="quick-action quick-action-cart" onClick={purchasable ? onAddToCart : undefined} disabled={!purchasable} aria-label={purchasable ? t.card.cartAction : unavailableLabel}><ShoppingBag size={16} /></button>
          <button className={`quick-action quick-action-wishlist ${liked ? "liked" : ""}`} onClick={onToggleWishlist} aria-label={t.card.wishlist}><Heart size={16} fill={liked ? "currentColor" : "none"} /></button>
        </div>
      </div>
      <Link className="product-card-link" href={`/products/${product.slug}`}>
        <div className="product-info product-info-precision">
          <span className="product-kicker">{t.card.kicker} · {localizeCategory(product.category, language)}</span>
          <h3>{title}</h3>
          <p>{secondaryTitle}</p>
          <div className="product-bottom product-bottom-precision">
            {availability === "coming-soon"
              ? <span className="product-availability">{unavailableLabel}</span>
              : <div><strong>{formatPrice(product.price, language)}</strong>{discount && <del>{formatPrice(product.oldPrice, language)}</del>}{!purchasable && <span className="product-availability">{unavailableLabel}</span>}</div>}
          </div>
        </div>
      </Link>
        <div className="product-card-actions">
          <button className="product-add-button" onClick={purchasable ? onAddToCart : undefined} disabled={!purchasable}><ShoppingBag size={16} /> {purchasable ? t.card.addToCart : unavailableLabel}</button>
          <button className="product-view-button" onClick={(event) => { event.stopPropagation(); onQuickView(); }} aria-label={t.card.quickView}><Eye size={18} /></button>
        </div>
    </article>
  );
}

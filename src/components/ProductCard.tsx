"use client";

import { Eye, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";
import { formatNumber, formatPrice, localizeCategory, productTitle, useLanguage } from "@/context/LanguageContext";

export type CardProduct = {
  id: number;
  slug: string;
  name: string;
  bn: string;
  price: number;
  oldPrice: number;
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

export default function ProductCard({ product, liked, onToggleWishlist, onAddToCart, onQuickView }: ProductCardProps) {
  const { language, t } = useLanguage();
  const title = productTitle(product, language);
  const secondaryTitle = language === "en" ? product.bn : product.name;
  const discount = `${formatNumber(Math.round((1 - product.price / product.oldPrice) * 100), language)}% ${t.card.off}`;

  return (
    <article className="product-card product-card-precision group">
      <div className="product-image product-media-swap">
        <Link className="product-card-link" href={`/products/${product.slug}`}>
          <img className="product-media product-media-front" src={product.image} alt={title} />
          <img className="product-media product-media-hover" src={product.image2 || product.image} alt={`${title} ${t.card.ingredientsAlt}`} />
          <span className={`product-discount ${product.tag === "ফ্রেশ" ? "fresh" : ""}`}>{discount}</span>
        </Link>
        <div className="product-quick-actions">
          <button className="quick-action quick-action-cart" onClick={onAddToCart} aria-label={t.card.cartAction}><ShoppingBag size={16} /></button>
          <button className={`quick-action quick-action-wishlist ${liked ? "liked" : ""}`} onClick={onToggleWishlist} aria-label={t.card.wishlist}><Heart size={16} fill={liked ? "currentColor" : "none"} /></button>
        </div>
      </div>
      <Link className="product-card-link" href={`/products/${product.slug}`}>
        <div className="product-info product-info-precision">
          <span className="product-kicker">{t.card.kicker} · {localizeCategory(product.category, language)}</span>
          <h3>{title}</h3>
          <p>{secondaryTitle}</p>
          <div className="product-bottom product-bottom-precision">
            <div><strong>{formatPrice(product.price, language)}</strong><del>{formatPrice(product.oldPrice, language)}</del></div>
          </div>
        </div>
      </Link>
        <div className="product-card-actions">
          <button className="product-add-button" onClick={onAddToCart}><ShoppingBag size={16} /> {t.card.addToCart}</button>
          <button className="product-view-button" onClick={(event) => { event.stopPropagation(); onQuickView(); }} aria-label={t.card.quickView}><Eye size={18} /></button>
        </div>
    </article>
  );
}

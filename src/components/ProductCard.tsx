import { Eye, Heart, ShoppingBag } from "lucide-react";
import Link from "next/link";

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

function toBengaliDigits(value: number) {
  return value.toLocaleString("bn-BD");
}

function discountLabel(product: CardProduct) {
  return `${toBengaliDigits(Math.round((1 - product.price / product.oldPrice) * 100))}% OFF`;
}

export default function ProductCard({ product, liked, onToggleWishlist, onAddToCart, onQuickView }: ProductCardProps) {
  return (
    <article className="product-card product-card-precision group">
      <div className="product-image product-media-swap">
        <Link className="product-card-link" href={`/products/${product.slug}`}>
          <img className="product-media product-media-front" src={product.image} alt={product.bn} />
          <img className="product-media product-media-hover" src={product.image2 || product.image} alt={`${product.bn} উপকরণ`} />
          <span className={`product-discount ${product.tag === "ফ্রেশ" ? "fresh" : ""}`}>{discountLabel(product)}</span>
        </Link>
        <div className="product-quick-actions">
          <button className="quick-action quick-action-cart" onClick={onAddToCart} aria-label="কার্টে যোগ করুন"><ShoppingBag size={16} /></button>
          <button className={`quick-action quick-action-wishlist ${liked ? "liked" : ""}`} onClick={onToggleWishlist} aria-label="উইশলিস্টে যোগ করুন"><Heart size={16} fill={liked ? "currentColor" : "none"} /></button>
        </div>
      </div>
      <Link className="product-card-link" href={`/products/${product.slug}`}>
        <div className="product-info product-info-precision">
          <span className="product-kicker">RAYYAN GOURMET · {product.category}</span>
          <h3>{product.bn}</h3>
          <p>{product.name}</p>
          <div className="product-bottom product-bottom-precision">
            <div><strong>৳{toBengaliDigits(product.price)}</strong><del>৳{toBengaliDigits(product.oldPrice)}</del></div>
          </div>
        </div>
      </Link>
        <div className="product-card-actions">
          <button className="product-add-button" onClick={onAddToCart}><ShoppingBag size={16} /> কার্ট-এ যোগ করুন</button>
          <button className="product-view-button" onClick={(event) => { event.stopPropagation(); onQuickView(); }} aria-label="দ্রুত দেখুন"><Eye size={18} /></button>
        </div>
    </article>
  );
}

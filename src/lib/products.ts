export type Product = {
  id: number;
  slug: string;
  name: string;
  bn: string;
  price: number;
  oldPrice: number;
  rating: number;
  reviews: number;
  category: string;
  image: string;
  image2?: string;
  tag?: string;
};

export const products: Product[] = [
  { id: 1, slug: "premium-turmeric-powder", name: "Premium Turmeric Powder", bn: "প্রিমিয়াম হলুদ গুঁড়া", price: 185, oldPrice: 220, rating: 4.9, reviews: 128, category: "মসলা", image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=85", image2: "https://images.unsplash.com/photo-1599909533730-f9d6a5d4e5f9?auto=format&fit=crop&w=1000&q=85", tag: "বেস্টসেলার" },
  { id: 2, slug: "ready-to-cook-mixed-veggies", name: "Ready-to-Cook Mixed Veggies", bn: "রেডি-টু-কুক মিক্সড সবজি", price: 295, oldPrice: 360, rating: 4.8, reviews: 86, category: "রেডি-টু-কুক", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85", image2: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85", tag: "ফ্রেশ" },
  { id: 3, slug: "royal-garam-masala", name: "Royal Garam Masala", bn: "রয়্যাল গরম মসলা", price: 240, oldPrice: 290, rating: 4.9, reviews: 74, category: "মসলা", image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85", image2: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1000&q=85", tag: "নতুন" },
  { id: 4, slug: "golden-pantry-combo", name: "Golden Pantry Combo", bn: "গোল্ডেন প্যান্ট্রি কম্বো", price: 699, oldPrice: 890, rating: 5, reviews: 52, category: "কম্বো", image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1000&q=85", image2: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85", tag: "-২১% অফ" },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

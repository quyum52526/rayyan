"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { formatNumber, useLanguage } from "@/context/LanguageContext";
import { categoryAlt, categoryHref, categoryLabel, categorySubtitle, getCategory, type CategorySlug } from "@/lib/categories";

type CategoryBannerProps = {
  slug: CategorySlug;
  /** Products in this category, shown next to the heading when known. */
  count?: number;
  /** Off on the category landing page, where the link would point at the page itself. */
  showViewAll?: boolean;
};

/** The header bar that opens each category shelf: banner art, Bangla heading, subtitle, View All. */
export default function CategoryBanner({ slug, count, showViewAll = true }: CategoryBannerProps) {
  const { language, t } = useLanguage();
  const category = getCategory(slug);
  if (!category) return null;

  return (
    <div className="category-banner">
      <img className="category-banner-art" src={category.banner} alt={categoryAlt(slug, language)} />
      <span className="category-banner-veil" />
      <div className="category-banner-copy">
        <p className="category-banner-kicker">
          {t.categories.kicker}
          {count !== undefined && <span> · {t.categories.countLabel.replace("{count}", formatNumber(count, language))}</span>}
        </p>
        <h2>{categoryLabel(slug, language)}</h2>
        <p className="category-banner-subtitle">{categorySubtitle(slug, language)}</p>
      </div>
      {showViewAll && (
        <Link className="category-banner-link" href={categoryHref(slug)}>
          {t.categories.viewAll} <ArrowRight size={16} />
        </Link>
      )}
    </div>
  );
}

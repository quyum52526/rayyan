"use client";

import { ArrowLeft, ArrowRight, ChevronRight, Star, Truck } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatNumber, formatPrice, useLanguage } from "@/context/LanguageContext";
import { categoryHref, categoryLabel, type CategorySlug } from "@/lib/categories";
import type { Product } from "@/lib/products";

type HeroImage = { src: string; width: number; height: number };

/**
 * Positional match to t.hero.slides — one slide per storefront category, in CATEGORY_SLUGS order.
 * `images` is [main, left, right] exactly as the design layers them; `thumb` is null on the slides
 * the design shows as a glyph tile instead of a product cut-out.
 * `fallback` carries the design's own numbers, used only while a category has no products yet.
 */
type HeroSlideMeta = {
  slug: CategorySlug;
  theme: string;
  glyph: string;
  stamp: "pure" | "fresh";
  images: [HeroImage, HeroImage, HeroImage];
  thumb: HeroImage | null;
  fallback: { price: number; oldPrice: number; rating: number; reviews: number; count: number };
};

const img = (name: string, width: number, height: number): HeroImage => ({ src: `/hero/${name}.png`, width, height });

const TURMERIC = img("turmeric", 729, 792);
const GARLIC = img("garlic", 725, 956);
const ONION = img("onion", 682, 927);
const GINGER = img("ginger", 703, 939);
const CARROT_CUBES = img("carrot-cubes", 701, 685);

const heroSlideMeta: HeroSlideMeta[] = [
  {
    slug: "basic-spices", theme: "slide-spices", glyph: "✦", stamp: "pure",
    images: [TURMERIC, img("chili", 723, 787), img("coriander", 722, 782)],
    thumb: TURMERIC,
    fallback: { price: 180, oldPrice: 220, rating: 4.9, reviews: 124, count: 24 },
  },
  {
    slug: "aromatics-powder", theme: "slide-aromatics", glyph: "✦", stamp: "pure",
    images: [GARLIC, ONION, GINGER],
    thumb: GARLIC,
    fallback: { price: 220, oldPrice: 270, rating: 4.8, reviews: 96, count: 4 },
  },
  {
    slug: "ready-to-cook", theme: "slide-ready", glyph: "❋", stamp: "fresh",
    images: [img("curry-mix", 709, 692), CARROT_CUBES, img("broccoli", 724, 708)],
    thumb: CARROT_CUBES,
    fallback: { price: 95, oldPrice: 120, rating: 4.8, reviews: 86, count: 7 },
  },
  {
    // The design reuses the onion and ginger cut-outs here as stand-ins for beetroot and herb mix.
    slug: "wellness-drinks", theme: "slide-wellness", glyph: "♧", stamp: "pure",
    images: [img("moringa", 698, 923), ONION, GINGER],
    thumb: null,
    fallback: { price: 260, oldPrice: 320, rating: 4.7, reviews: 52, count: 5 },
  },
  {
    slug: "dry-food", theme: "slide-dry", glyph: "✹", stamp: "pure",
    images: [img("nut-pack", 728, 711), img("cashew", 731, 716), img("dates", 732, 715)],
    thumb: null,
    fallback: { price: 340, oldPrice: 420, rating: 4.9, reviews: 74, count: 6 },
  },
];

const AUTOPLAY_MS = 5000;

/**
 * Every slide sits inside the viewport on the same track, so autoplay can promote any of them to
 * the LCP element — a lazy image there trips Next's LCP warning. They all load eagerly, and only
 * slide one's main pack is hinted high.
 *
 * Not `preload`: Next 16 deprecated `priority` in favour of it, but its docs rule it out when
 * several images could be the LCP element depending on viewport, which is precisely this carousel.
 */
const loadPolicy = { loading: "eager" as const };

export default function Hero({ products }: { products: Product[] }) {
  const { language, t } = useLanguage();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  const touchStartX = useRef<number | null>(null);

  // The design hard-codes a price, rating and product count per slide. Derive them from the real
  // catalog instead so the hero never advertises numbers the store cannot honour, and keep the
  // design's values as the fallback for a category that is still empty.
  const slideStats = useMemo(() => heroSlideMeta.map(({ slug, fallback }) => {
    const matches = products.filter((product) => product.category === slug);
    if (matches.length === 0) return fallback;
    const cheapest = matches.reduce((low, product) => (product.price < low.price ? product : low));
    const reviews = matches.reduce((sum, product) => sum + product.reviews, 0);
    const rating = matches.reduce((sum, product) => sum + product.rating, 0) / matches.length;
    return {
      price: cheapest.price,
      oldPrice: cheapest.oldPrice,
      // An unreviewed catalog would render "0 reviews" next to a flat 5.0; keep the design's
      // figures until real reviews exist rather than advertising an empty score.
      rating: reviews > 0 ? Math.round(rating * 10) / 10 : fallback.rating,
      reviews: reviews > 0 ? reviews : fallback.reviews,
      count: matches.length,
    };
  }), [products]);

  const moveSlide = (direction: 1 | -1) =>
    setActiveSlide((current) => (current + direction + heroSlideMeta.length) % heroSlideMeta.length);

  useEffect(() => {
    if (paused) return;
    const timer = window.setInterval(() => setActiveSlide((current) => (current + 1) % heroSlideMeta.length), AUTOPLAY_MS);
    return () => window.clearInterval(timer);
  }, [paused]);

  return (
    <>
      <section
        className="hero-carousel"
        id="top"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onTouchStart={(event) => { touchStartX.current = event.touches[0].clientX; }}
        onTouchEnd={(event) => {
          if (touchStartX.current === null) return;
          const distance = event.changedTouches[0].clientX - touchStartX.current;
          if (Math.abs(distance) > 45) moveSlide(distance < 0 ? 1 : -1);
          touchStartX.current = null;
        }}
      >
        <div className="carousel-track" style={{ transform: `translateX(-${activeSlide * 100}%)` }}>
          {heroSlideMeta.map((meta, index) => {
            const copy = t.hero.slides[index];
            const stats = slideStats[index];
            const [main, left, right] = meta.images;
            return (
              <div className={`carousel-slide ${meta.theme}`} key={meta.slug} aria-hidden={index !== activeSlide}>
                <div className="carousel-inner">
                  <div className="carousel-copy">
                    <div className="eyebrow"><span className="eyebrow-glyph">{meta.glyph}</span> {copy.badge} · {categoryLabel(meta.slug, language)}</div>
                    <h1>{copy.title}<em>{copy.titleEm}</em></h1>
                    <p>{copy.subtitle}</p>
                    <div className="hero-facts">
                      <div>
                        <span className="hero-fact-label">{t.hero.priceFrom}</span>
                        <span className="hero-fact-price"><strong>{formatPrice(stats.price, language)}</strong><del>{formatPrice(stats.oldPrice, language)}</del></span>
                      </div>
                      <div>
                        <span className="hero-fact-rating"><Star size={13} fill="currentColor" /> {formatNumber(stats.rating, language)}</span>
                        <span className="hero-fact-note">{t.hero.reviewsLabel.replace("{count}", formatNumber(stats.reviews, language))}</span>
                      </div>
                      <div>
                        <span className="hero-fact-stock"><i /> {copy.stock}</span>
                        <span className="hero-fact-note">{t.categories.countLabel.replace("{count}", formatNumber(stats.count, language))}</span>
                      </div>
                    </div>
                    <div className="hero-actions">
                      <Link className="primary-button" href={categoryHref(meta.slug)} tabIndex={index === activeSlide ? undefined : -1}>
                        {copy.button} <ArrowRight size={17} />
                      </Link>
                      <a className="text-link" href="#categories" tabIndex={index === activeSlide ? undefined : -1}>
                        {t.hero.categories} <ChevronRight size={16} />
                      </a>
                    </div>
                    <div className="hero-delivery"><Truck size={15} /> {t.hero.delivery}</div>
                  </div>
                  <div className="hero-art">
                    <span className="hero-art-shadow" />
                    <Image className="hero-pack hero-pack-main" {...main} alt={copy.imageAlts[0]} sizes="(max-width: 900px) 58vw, 300px" {...loadPolicy} fetchPriority={index === 0 ? "high" : undefined} />
                    <Image className="hero-pack hero-pack-left" {...left} alt={copy.imageAlts[1]} sizes="(max-width: 900px) 41vw, 205px" {...loadPolicy} />
                    <Image className="hero-pack hero-pack-right" {...right} alt={copy.imageAlts[2]} sizes="(max-width: 900px) 43vw, 215px" {...loadPolicy} />
                    <span className="hero-art-label">RAYYAN<b>{formatNumber(index + 1, language).padStart(2, language === "bn" ? "০" : "0")}</b></span>
                    <span className="hero-stamp">
                      <span>PURE</span>
                      <strong>{meta.stamp === "fresh" ? t.hero.fresh : t.hero.pure}</strong>
                      <span>EST. 2024</span>
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button type="button" className="carousel-arrow carousel-prev" onClick={() => moveSlide(-1)} aria-label={t.hero.previous}><ArrowLeft size={20} /></button>
        <button type="button" className="carousel-arrow carousel-next" onClick={() => moveSlide(1)} aria-label={t.hero.next}><ArrowRight size={20} /></button>
      </section>

      <div className="carousel-thumbs">
        <div className="carousel-thumbs-inner" role="tablist" aria-label={t.hero.select}>
          {heroSlideMeta.map((meta, index) => (
            <button
              type="button"
              className={`carousel-thumb ${index === activeSlide ? "active" : ""}`}
              key={meta.slug}
              onClick={() => setActiveSlide(index)}
              role="tab"
              aria-selected={index === activeSlide}
            >
              {meta.thumb
                ? <Image src={meta.thumb.src} width={meta.thumb.width} height={meta.thumb.height} alt="" sizes="42px" />
                : <span className="thumb-glyph">{meta.glyph}</span>}
              <span>
                <strong>{categoryLabel(meta.slug, language)}</strong>
                <small>{t.categories.countLabel.replace("{count}", formatNumber(slideStats[index].count, language))}</small>
              </span>
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

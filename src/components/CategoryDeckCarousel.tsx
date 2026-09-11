"use client";

import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { formatNumber, formatPrice, productTitle, useLanguage } from "@/context/LanguageContext";
import { CATEGORIES, categoryAlt, categoryHref, categoryLabel } from "@/lib/categories";
import type { Product } from "@/lib/products";

/** Decks visible at once on the widest layout. Also the number of slides cloned onto the end. */
const VISIBLE = 3;
/** Cadence shared by the category advance and the card swap. */
const STEP_MS = 3000;
/** How long the front card spends flung out before it reappears at the back of its stack. */
const EXIT_MS = 380;
/** Cards drawn per deck. Categories with fewer products simply render a shorter stack. */
const CARDS_PER_DECK = 3;

export default function CategoryDeckCarousel({ products }: { products: Product[] }) {
  const { language, t } = useLanguage();
  const [paused, setPaused] = useState(false);
  const [stillMotion, setStillMotion] = useState(false);
  const [step, setStep] = useState(0);
  const [animate, setAnimate] = useState(true);
  const [cardTick, setCardTick] = useState(0);
  const [exiting, setExiting] = useState(false);
  const exitTimer = useRef<number | undefined>(undefined);

  const decks = useMemo(() => CATEGORIES.map((category) => {
    const matches = products.filter((product) => product.category === category.slug);
    return { category, cards: matches.slice(0, CARDS_PER_DECK), totalCount: matches.length };
  }), [products]);

  // Clone the first screenful onto the end so the last step slides into a copy of the start,
  // which we then swap for the real start with transitions off — an infinite loop for free.
  const items = useMemo(() => [...decks, ...decks.slice(0, VISIBLE)], [decks]);

  // An auto-advancing carousel is exactly what prefers-reduced-motion is about, so hold it still
  // rather than only shortening the transitions.
  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setStillMotion(query.matches);
    sync();
    query.addEventListener("change", sync);
    return () => query.removeEventListener("change", sync);
  }, []);

  const frozen = paused || stillMotion;

  useEffect(() => {
    if (frozen) return;
    const timer = window.setInterval(() => {
      setStep((current) => current + 1);
      setExiting(true);
      window.clearTimeout(exitTimer.current);
      exitTimer.current = window.setTimeout(() => { setCardTick((current) => current + 1); setExiting(false); }, EXIT_MS);
    }, STEP_MS);
    return () => window.clearInterval(timer);
  }, [frozen]);

  // A swap already in flight is allowed to land even if the interval stops, so hovering mid-swipe
  // never parks a card off-screen. Only unmounting cancels it.
  useEffect(() => () => window.clearTimeout(exitTimer.current), []);

  // Once the track has slid onto the cloned screenful, jump back to the real one with transitions
  // off. The double rAF lets that untransitioned position paint before animation resumes.
  useEffect(() => {
    if (animate) return;
    const frame = requestAnimationFrame(() => requestAnimationFrame(() => setAnimate(true)));
    return () => cancelAnimationFrame(frame);
  }, [animate]);

  const onTrackRest = () => {
    if (step >= decks.length) {
      setAnimate(false);
      setStep(0);
    }
  };

  return (
    <div
      className="deck-carousel"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <div
        className={`deck-track ${animate ? "" : "is-static"}`}
        style={{ transform: `translateX(calc(var(--deck-shift) * ${step}))` }}
        onTransitionEnd={onTrackRest}
      >
        {items.map(({ category, cards, totalCount }, slot) => {
          const label = categoryLabel(category.slug, language);
          const count = t.categories.countLabel.replace("{count}", formatNumber(totalCount, language));
          return (
            <div className="deck-slot" key={`${category.slug}-${slot}`} aria-hidden={slot >= decks.length}>
              <Link className="deck" href={categoryHref(category.slug)} aria-label={`${label} — ${count}`} tabIndex={slot >= decks.length ? -1 : undefined}>
                <div className="deck-head">
                  <div>
                    <h3>{label}</h3>
                    <p>{count}</p>
                  </div>
                  <span className="deck-go"><ArrowRight size={17} /></span>
                </div>
                <div className="deck-cards">
                  {cards.length === 0
                    // Nothing in stock yet: the category's own banner stands in for the stack so the
                    // row keeps its rhythm instead of leaving a hole.
                    ? <span className="deck-card deck-card-0 deck-card--empty">
                        <img src={category.banner} alt={categoryAlt(category.slug, language)} loading="lazy" />
                        <span className="deck-card-veil" />
                        <span className="deck-card-body"><h4>{label}</h4></span>
                      </span>
                    : cards.map((product, cardIndex) => {
                      const position = (cardIndex - cardTick % cards.length + cards.length) % cards.length;
                      // A single-card stack has nowhere to swipe to, so it stays put.
                      const isExiting = exiting && cards.length > 1 && position === 0;
                      return (
                        <span className={`deck-card deck-card-${position} ${isExiting ? "deck-card--exit" : ""}`} key={product.id}>
                          <img src={product.image} alt={productTitle(product, language)} loading="lazy" />
                          <span className="deck-card-veil" />
                          <span className="deck-card-body">
                            <h4>{productTitle(product, language)}</h4>
                            <b className="deck-price">{formatPrice(product.price, language)}</b>
                          </span>
                        </span>
                      );
                    })}
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
}

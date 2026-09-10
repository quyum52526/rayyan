# RAYYAN Design System

RAYYAN (রায়ান) is a Bangladeshi direct-to-consumer grocery brand — pure ground and whole
spices, organic pantry staples and vacuum-packed ready-to-cook vegetables, sold online with
cash on delivery inside and outside Dhaka. Its promise, printed under the wordmark, is
**রসনায় বিশুদ্ধতা** — "purity in taste". The site metadata reads
*"খাঁটি মসলা, অর্গানিক প্যান্ট্রি স্ট্যাপল ও রেডি-টু-কুক সবজি।"*

The customer-facing language is Bangla; English appears only as a secondary product name, a
SKU, or a UI label. Prices are Bangla numerals with the ৳ sign. Delivery is ৳৬০ inside Dhaka,
৳১২০ outside, free above ৳১০০০, in 24–48 hours.

## Sources this system was built from

| Source | What it gave us |
| --- | --- |
| `https://github.com/quyum52526/rayyan` (branch `main`) — Next.js 16 + React 19 storefront | The shipped implementation: `src/app/globals.css` (~49 KB of hand-written CSS, the single source of truth for every value here), `src/app/page.tsx`, `src/components/ProductCard.tsx`, `ProductDetail.tsx`, `ProductGallery.tsx`, `src/app/checkout/page.tsx`, `src/app/admin/page.tsx`, `src/lib/products.ts`, `src/lib/store.tsx` |
| `uploads/Rayyan E-Commerce Logo Design.pdf` — "BRAND GUIDE · V1", 2 pages, Bangla | The canonical palette hexes, the type roles, the logo directions (1A Heritage Diamond — selected, 1B Spice Seal, 1C Modern Tile), clear-space and minimum-size rules, jar-label and social templates, and the 60/25/10/5 colour ratio |

Explore `https://github.com/quyum52526/rayyan` directly for anything this system abbreviates —
the CSS there carries responsive rules and hover details beyond what the specimen cards show.

Two products exist today: the **storefront** (home, category, product detail, checkout, order
confirmation) and the **Admin Studio** (overview, catalogue editor, order fulfilment). Both are
recreated under `ui_kits/`.

## Index

| Path | What it is |
| --- | --- |
| `styles.css` | Global entry point — `@import` list only |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `borders.css`, `motion.css`, `semantic.css` |
| `guidelines/` | 19 specimen cards (Colors, Type, Spacing, Brand) |
| `components/` | `core/`, `shell/`, `commerce/`, `forms/`, `admin/` — React primitives + `.d.ts` + `.prompt.md` |
| `ui_kits/storefront/` | Click-through storefront recreation |
| `ui_kits/admin/` | Click-through Admin Studio recreation |
| `assets/` | Brand assets (see ICONOGRAPHY — no logo file was supplied) |
| `SKILL.md` | Agent Skills wrapper |
| `github.md` | Upstream repo association and sync record |

## Components

**core** — `Icon`, `Button`, `IconButton`, `Badge`, `Kicker`, `SectionHeading`, `Rating`,
`QuantityStepper`, `VariantPicker`, `Tabs`, `TrustItem`

**shell** — `Logo`, `TopBar`, `SiteHeader`, `SiteFooter`

**commerce** — `ProductCard`, `CategoryCard`, `OfferBanner`, `CartLineItem`,
`FreeShippingMeter`, `OrderSummary`, `ProductGallery`

**forms** — `Field`, `PaymentOption`

**admin** — `AdminNav`, `MetricCard`, `InventoryRow`, `OrderRow`, `EmptyState`

Every family above has a counterpart in the repo — either a React component
(`ProductCard`, `ProductGallery`) or a named CSS block in `globals.css`
(`.primary-button`, `.trust-grid > div`, `.metric-grid button`, `.order-row`, …).

**Intentional additions:** `Icon` (a wrapper over the Lucide set the repo imports via
`lucide-react`, which is not vendored in the repo) and `SectionHeading` /​ `Kicker` (the
repeated `.section-heading` + `.kicker` markup pattern, promoted to components). Nothing else
was invented.

## CONTENT FUNDAMENTALS

**Language.** Bangla first, always. Every heading, button, label, toast and empty state is
Bangla; English is the smaller second line on a product ("Premium Turmeric Powder" under
প্রিমিয়াম হলুদ গুঁড়া), a kicker in caps ("RAYYAN GOURMET · গুঁড়া মসলা", "RAYYAN CONTROL
ROOM", "INVENTORY", "FULFILLMENT"), or a code (RY-001, RAYYAN25). Loanwords stay in Bangla
script rather than being translated: রেডি-টু-কুক, ভ্যাকুয়াম প্যাকড, ক্যাশ অন ডেলিভারি,
চেকআউট, কার্ট.

**Voice.** Warm, plain, second person, polite (আপনি / -ন verb endings): "আপনার ঠিকানা দিন,
আমরা যত্ন করে প্যাক করে পাঠিয়ে দেব।" The brand speaks as *আমরা* when explaining its
practices ("আমরা বিশ্বাস করি, ভালো রান্নার জন্য ভালো উপকরণই যথেষ্ট।") and addresses the
customer as *আপনি* everywhere else. Never slangy, never jokey, never exclamatory except at
genuine milestones ("ধন্যবাদ, সাদিয়া!", "আপনার ডেলিভারি ফ্রি!").

**Length.** Headlines are 3–6 words and often break across two lines with the second line in
maroon: "স্বাদের শুরু হোক / *বিশুদ্ধতা থেকে*". Support copy is one sentence, two at most.
Micro-copy carries a concrete number rather than an adjective — "ঢাকায় ২৪–৪৮ ঘণ্টায়
ডেলিভারি", "আর ৳৫২০ টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!", "৫,০০০+ পরিবার".

**Casing.** Bangla has no case. English micro-labels are UPPERCASE with wide tracking
(.12–.14em); English sentences are sentence case. The wordmark is always RAYYAN, all caps,
.12em tracking.

**Buttons** are verbs: কার্ট-এ যোগ করুন · চেকআউটে যান · অর্ডার নিশ্চিত করুন · সব দেখুন ·
পণ্য প্রকাশ করুন. Links end with a chevron or arrow, never a full stop.

**Trust is the recurring theme.** Almost every surface repeats a purity or safety claim:
১০০% খাঁটি · ক্যামিক্যাল মুক্ত · ভ্যাকুয়াম প্যাকড · কৃষকের কাছ থেকে সরাসরি · ছোট ব্যাচে
তাজা প্যাকিং · নিরাপদ এবং বিশ্বস্ত অর্ডার.

**No emoji, anywhere.** Ornamentation is done with unicode glyphs used as marks (✦ ♧ ❋ ✹ ✽)
and with the ৳ sign, never with emoji. Numerals in customer copy are Bangla
(`toLocaleString("bn-BD")`); numerals in codes and admin figures stay Latin.

## VISUAL FOUNDATIONS

**Palette.** Maroon (#8A1538) and deep maroon (#5C0E26) carry the brand; saffron gold
(#C79A3C) draws lines and premium chips; haldi yellow (#E8A72B) is the only CTA fill; leaf
green (#3E6B4F) is reserved for ready-to-cook, in-stock and free-delivery messages; ivory
(#FBF7F0) is the page; ink (#22201D) is all body text. Ratio, from the guide: **60% ivory ·
25% maroon · 10% ink · 5% gold** — gold never fills a large area. Every neutral is warm; there
is no grey surface anywhere in the system, only sand tints (#FFFDF9 → #EADACA). The shipped
build rounds three hexes (#841538, #c79430, #2e7d32); tokens keep both.

**Type.** Three families, strict roles. Marcellus 400 (never bolder) for the wordmark and every
headline — hero clamp(42–70px)/1.1 with −.02em tracking, section h2 32px, product h1
clamp(32–49px), admin metrics 35px. Hind Siliguri for all Bangla UI: body 400/15px at 1.8
line-height, nav 600/14, buttons 700/13, labels 600/12, muted notes 400/11. Manrope for
English UI, prices (800/18–32px), SKUs, countdowns (700/18px at .15em) and 9px kickers at
.12em uppercase. Amiri sets the ريان calligraphy in the mark, ≥56px only.

**Backgrounds.** Flat colour fields, never gradients as decoration. The hero shifts its whole
background tone per category slide (#F2E8D9 powder → #E9DFBD whole → #DCEBDD fresh → #EAD3D7
combo). The story band is #EADACA; tinted panels are #F2E8D9; cards are pure white on ivory.
The only gradients in the system are functional scrims: the category tile's
`linear-gradient(to top,#22201de6,#22201d66 48%,transparent)` and a blurred maroon ellipse
under the hero photo. No patterns, no textures, no hand-drawn illustration.

**Imagery** is warm, close-up, saturated food photography — spices in bowls and mortars, cut
vegetables, jars. The hero photo is saturated to 1.12 and masked into a dome
(`border-radius:50% 50% 4px 4px`) rotated 3°, with a 20px/30px/60px maroon shadow. Story
imagery is desaturated to 0.8. Product media is 4:5 and cross-fades to a second "ingredients"
shot on hover. All current photography is Unsplash placeholder work — RAYYAN's own shots have
not been supplied.

**Corners.** Square is the rule: cards, buttons, inputs, badges, modals and the drawer are all
0px. Circles (50%) are for icon actions, avatars, the PURE stamp and counters. The single 12px
radius in the system is the category tile.

**Borders.** 1px warm hairlines: #EADFD1 for structure, #EEE5DB for cards, #D9CBBD for inputs,
#D5C1AE dashed for upload fields. Selected states thicken to 2px maroon and shed 1px of padding
so nothing shifts. Dividers between trust cells are right-side hairlines, not full rules.

**Shadows** are rare, warm and maroon-tinted — never neutral grey. Card hover
`0 16px 34px #5c0e2614`; button hover `0 8px 18px #9c631e26`; floating wishlist
`0 4px 14px #22201d22`; modal `0 20px 60px #24151b40`; drawer `-15px 0 45px #24151b2e`.
Resting cards have no shadow at all.

**Motion.** Short and eased, no bounce, no spring. Colour/border transitions .2s; media and
lift transitions .3s; image scale .5s; hero copy and image entrances .55–.65s
(`translateY(13px)` fade-up and a `scale(.97)` settle). The hero carousel advances every 5s
and pauses on hover, with a 5s `scaleX` progress bar in the active dot. Reduced-motion
alternatives are not defined upstream.

**Hover.** Cards lift `translateY(-5px)` and gain the warm shadow; primary buttons lift 2px;
ink buttons darken to deep maroon; category photos scale 1.1 and their arrow fills haldi and
slides 4px right; product media cross-fades and scales 1.05; quick actions fade in from
`translateX(8px)`; the gallery zooms to 2.15× tracking the cursor. Nav links simply change to
maroon. **Press states are not styled** in the source — there is no active-scale or darken; if
you need one, darken to deep maroon rather than shrinking.

**Transparency and blur** are used in exactly three places: the sticky header
(`rgba(251,247,240,.95)` + `blur(12px)`), modal/drawer scrims (`#24151b99`), and the gallery
label and thumbnail strip (`#fffdf9df`, `#ffffff99`). Nowhere else.

**Layout.** `width: min(1180px, calc(100% - 40px))` centred; 85px section rhythm (55px below
620px); 82px sticky header over a 35px static top bar; four-up grids at 15px (products), 16px
(categories) and 14px (metrics) gaps; product page split 1fr/1fr with a 68px gutter; checkout
1.1fr/.9fr at 40px; admin shell 245px sidebar + fluid main. Only the header is fixed/sticky —
nothing else pins.

## ICONOGRAPHY

**Lucide is the icon system**, imported as `lucide-react` in the repo. Icons are line icons at
the library's default 2px stroke, sized 13–22px (15–18px typical), always inheriting the text
colour, always paired with a Bangla label except in circular quick actions where an
`aria-label` carries the meaning.

The repo does not vendor the icon files (they come from `node_modules`), so nothing could be
copied into `assets/`. The `Icon` component pulls glyphs from the pinned
`lucide-static@0.544.0` CDN and tints them with a CSS mask so colour inheritance matches
`lucide-react` exactly. **Flagged substitution:** if you want the icons self-hosted, drop the
SVGs into `assets/icons/` and change the `CDN` constant in `components/core/Icon.jsx`.

Icons actually used upstream: `shopping-bag`, `heart`, `eye`, `truck`, `check`, `star`,
`search`, `sliders-horizontal`, `chevron-down`, `chevron-right`, `arrow-right`, `arrow-left`,
`minus`, `plus`, `x`, `package`, `play`, `pause`, `volume-2`, `volume-x`, `lock-keyhole`,
`layout-dashboard`, `edit-3`, `trash-2`, `save`, `sparkles`.

**Unicode ornaments do the decorative work**, not icons and not emoji: ✦ ♧ ❋ ৳ in the trust
strip's sand squares, ✹ on the offer banner, ✦ and ✽ as floating leaves in the hero art. The ৳
sign is set in the UI font.

**Emoji are never used.**

**Logo.** No logo file — SVG, PNG or otherwise — was supplied with the sources. The brand guide
draws its three directions as vector art inside the PDF, and the selected direction is **1A
Heritage Diamond**: the Arabic ريان above the Latin RAYYAN inside a flat, thick-stroked diamond,
maroon and gold, no gradient. The shipped website does not use it either — it renders the
wordmark as type (Marcellus caps + gold Bangla tagline), which is what `Logo` reproduces and
what `assets/` contains a note about. Per the guide: keep clear space of at least half the
mark's height, never go below 28px on screen or 12mm in print, use the full calligraphic mark
only at 56px+, and switch to the solid diamond + R version for favicons, jar labels and social
avatars.

## Known gaps

- **No logo files.** Requesting `logo.svg`, the solid diamond + R app-icon version, and a
  one-colour reverse lockup from the designer would let `Logo` and `thumbnail.html` use the
  real mark.
- **No font binaries.** Marcellus, Hind Siliguri, Manrope and Amiri are all Google Fonts and
  load from the same Google CSS URL the repo uses; nothing is self-hosted, so the compiler
  reports zero `@font-face` rules. These are the real brand faces, not substitutions.
- **No RAYYAN photography.** All imagery is the Unsplash placeholder set referenced in the repo.
- **Pages the repo doesn't have** — category listing, search results, login, account, order
  tracking — are deliberately absent rather than invented.
- **Press/active states and reduced-motion behaviour** are undefined upstream.

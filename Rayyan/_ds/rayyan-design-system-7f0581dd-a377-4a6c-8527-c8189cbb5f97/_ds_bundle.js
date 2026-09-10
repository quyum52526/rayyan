/* @ds-bundle: {"format":4,"namespace":"RAYYANDesignSystem_7f0581","components":[{"name":"AdminNav","sourcePath":"components/admin/AdminNav.jsx"},{"name":"EmptyState","sourcePath":"components/admin/EmptyState.jsx"},{"name":"InventoryRow","sourcePath":"components/admin/InventoryRow.jsx"},{"name":"MetricCard","sourcePath":"components/admin/MetricCard.jsx"},{"name":"OrderRow","sourcePath":"components/admin/OrderRow.jsx"},{"name":"CartLineItem","sourcePath":"components/commerce/CartLineItem.jsx"},{"name":"CategoryCard","sourcePath":"components/commerce/CategoryCard.jsx"},{"name":"FreeShippingMeter","sourcePath":"components/commerce/FreeShippingMeter.jsx"},{"name":"OfferBanner","sourcePath":"components/commerce/OfferBanner.jsx"},{"name":"OrderSummary","sourcePath":"components/commerce/OrderSummary.jsx"},{"name":"ProductCard","sourcePath":"components/commerce/ProductCard.jsx"},{"name":"ProductGallery","sourcePath":"components/commerce/ProductGallery.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Icon","sourcePath":"components/core/Icon.jsx"},{"name":"IconButton","sourcePath":"components/core/IconButton.jsx"},{"name":"Kicker","sourcePath":"components/core/Kicker.jsx"},{"name":"QuantityStepper","sourcePath":"components/core/QuantityStepper.jsx"},{"name":"Rating","sourcePath":"components/core/Rating.jsx"},{"name":"SectionHeading","sourcePath":"components/core/SectionHeading.jsx"},{"name":"Tabs","sourcePath":"components/core/Tabs.jsx"},{"name":"TrustItem","sourcePath":"components/core/TrustItem.jsx"},{"name":"VariantPicker","sourcePath":"components/core/VariantPicker.jsx"},{"name":"Field","sourcePath":"components/forms/Field.jsx"},{"name":"PaymentOption","sourcePath":"components/forms/PaymentOption.jsx"},{"name":"Logo","sourcePath":"components/shell/Logo.jsx"},{"name":"SiteFooter","sourcePath":"components/shell/SiteFooter.jsx"},{"name":"SiteHeader","sourcePath":"components/shell/SiteHeader.jsx"},{"name":"TopBar","sourcePath":"components/shell/TopBar.jsx"}],"sourceHashes":{"components/admin/AdminNav.jsx":"866b4870d890","components/admin/EmptyState.jsx":"653ab1c8ed07","components/admin/InventoryRow.jsx":"33a43840cd72","components/admin/MetricCard.jsx":"febe5ca6ce32","components/admin/OrderRow.jsx":"a99cdcb300d7","components/commerce/CartLineItem.jsx":"753bac7d8288","components/commerce/CategoryCard.jsx":"5224b15b7e38","components/commerce/FreeShippingMeter.jsx":"b00c96054264","components/commerce/OfferBanner.jsx":"c18f208e2bd5","components/commerce/OrderSummary.jsx":"6c4518346301","components/commerce/ProductCard.jsx":"96fb2fe53d7a","components/commerce/ProductGallery.jsx":"a4449cadebcd","components/core/Badge.jsx":"4c49142e552c","components/core/Button.jsx":"f180cfd0271f","components/core/Icon.jsx":"802afd710bd7","components/core/IconButton.jsx":"713ca2b107cf","components/core/Kicker.jsx":"b87bce9a9508","components/core/QuantityStepper.jsx":"ac34c1499771","components/core/Rating.jsx":"8ef52152e0d9","components/core/SectionHeading.jsx":"cb0a46a93969","components/core/Tabs.jsx":"be682561c42f","components/core/TrustItem.jsx":"5ea2b75dcc3f","components/core/VariantPicker.jsx":"bd9682f74c9f","components/forms/Field.jsx":"481164f2af1f","components/forms/PaymentOption.jsx":"5b133b92d678","components/shell/Logo.jsx":"692347ecbdd7","components/shell/SiteFooter.jsx":"c61a6325f4e4","components/shell/SiteHeader.jsx":"2559da948ed3","components/shell/TopBar.jsx":"3b64938ab5c4","ui_kits/admin/AdminApp.jsx":"9169c737e559","ui_kits/admin/CatalogScreen.jsx":"07bc9eea6c7f","ui_kits/admin/data.js":"46ee0a22fc04","ui_kits/storefront/CheckoutScreen.jsx":"6acb22081ac9","ui_kits/storefront/HomeScreen.jsx":"3ef78e118c75","ui_kits/storefront/Overlays.jsx":"42b6c468a0a3","ui_kits/storefront/ProductScreen.jsx":"0a3fb7ee43d5","ui_kits/storefront/StorefrontApp.jsx":"92265368bd8c","ui_kits/storefront/data.js":"d6978d39677b"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.RAYYANDesignSystem_7f0581 = window.RAYYANDesignSystem_7f0581 || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/admin/MetricCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function MetricCard({
  label,
  value,
  note,
  onClick,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      minHeight: 142,
      padding: 20,
      border: `1px solid ${hover ? "var(--rayyan-gold)" : "var(--line-200)"}`,
      background: "#fff",
      textAlign: "left",
      transform: hover ? "translateY(-2px)" : "none",
      transition: "transform .2s, border-color .2s",
      cursor: "pointer",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#8c7f75",
      font: "400 12px 'Hind Siliguri',sans-serif"
    }
  }, label), /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      margin: "16px 0 5px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 35px 'Marcellus',serif"
    }
  }, value), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "#8c7f75",
      font: "400 12px 'Hind Siliguri',sans-serif"
    }
  }, note));
}
Object.assign(__ds_scope, { MetricCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/MetricCard.jsx", error: String((e && e.message) || e) }); }

// components/admin/OrderRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function OrderRow({
  order,
  onStatusChange,
  style,
  ...rest
}) {
  const cell = {
    flex: 1,
    minWidth: 0
  };
  return /*#__PURE__*/React.createElement("article", _extends({}, rest, {
    style: {
      padding: 20,
      border: "1px solid #ede2d7",
      background: "var(--sand-50)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "700 13px 'Manrope',sans-serif"
    }
  }, order.id), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#9b8e85",
      font: "400 10px 'Manrope',sans-serif"
    }
  }, order.createdAt)), /*#__PURE__*/React.createElement("select", {
    value: order.status,
    onChange: e => onStatusChange && onStatusChange(e.target.value),
    style: {
      border: "1px solid #dbcabc",
      background: "#fff",
      padding: 7,
      color: "var(--rayyan-maroon)",
      font: "600 11px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("option", {
    value: "pending"
  }, "\u09AA\u09C7\u09A8\u09CD\u09A1\u09BF\u0982"), /*#__PURE__*/React.createElement("option", {
    value: "processing"
  }, "\u09AA\u09CD\u09B0\u09B8\u09C7\u09B8\u09BF\u0982"), /*#__PURE__*/React.createElement("option", {
    value: "delivered"
  }, "\u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09CD\u09A1"), /*#__PURE__*/React.createElement("option", {
    value: "cancelled"
  }, "\u09AC\u09BE\u09A4\u09BF\u09B2"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "flex-start",
      gap: 25,
      paddingTop: 18,
      marginTop: 15,
      borderTop: "1px solid #eee4da"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: cell
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginBottom: 5,
      color: "var(--ink-faint)",
      font: "400 10px 'Hind Siliguri',sans-serif"
    }
  }, "\u0997\u09CD\u09B0\u09BE\u09B9\u0995"), /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      color: "var(--rayyan-maroon-deep)",
      font: "600 13px 'Hind Siliguri',sans-serif"
    }
  }, order.customerName), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#645953",
      font: "400 11px/1.6 'Hind Siliguri',sans-serif"
    }
  }, order.phone)), /*#__PURE__*/React.createElement("div", {
    style: cell
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginBottom: 5,
      color: "var(--ink-faint)",
      font: "400 10px 'Hind Siliguri',sans-serif"
    }
  }, "\u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09A0\u09BF\u0995\u09BE\u09A8\u09BE"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#645953",
      font: "400 11px/1.6 'Hind Siliguri',sans-serif"
    }
  }, order.address), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#645953",
      font: "400 11px/1.6 'Hind Siliguri',sans-serif"
    }
  }, order.zone === "inside" ? "ঢাকার ভিতরে · ৳৬০" : "ঢাকার বাইরে · ৳১২০")), /*#__PURE__*/React.createElement("div", {
    style: {
      ...cell,
      textAlign: "right"
    }
  }, /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginBottom: 5,
      color: "var(--ink-faint)",
      font: "400 10px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F"), /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      color: "var(--rayyan-maroon)",
      font: "700 18px 'Manrope',sans-serif"
    }
  }, "\u09F3", Number(order.grandTotal).toLocaleString("bn-BD")), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      color: "#645953",
      font: "400 11px/1.6 'Hind Siliguri',sans-serif"
    }
  }, "\u0995\u09CD\u09AF\u09BE\u09B6 \u0985\u09A8 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF"))));
}
Object.assign(__ds_scope, { OrderRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/OrderRow.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  /* .product-discount — gold, top-left of the media */
  discount: {
    background: "var(--rayyan-gold)",
    color: "#fff",
    font: "800 10px 'Manrope',sans-serif",
    letterSpacing: ".04em",
    padding: "5px 8px"
  },
  /* .product-tag — maroon */
  tag: {
    background: "var(--rayyan-maroon)",
    color: "#fff",
    font: "600 10px 'Hind Siliguri',sans-serif",
    padding: "4px 8px"
  },
  /* .product-tag.fresh / ready-to-cook */
  fresh: {
    background: "var(--rayyan-green)",
    color: "#fff",
    font: "600 10px 'Hind Siliguri',sans-serif",
    padding: "4px 8px"
  },
  /* .modal-price span — tinted maroon chip */
  save: {
    background: "#ead6d9",
    color: "var(--rayyan-maroon)",
    font: "700 10px 'Manrope',sans-serif",
    padding: "4px 6px"
  },
  /* .pdp-price span — gold wash */
  offer: {
    background: "#ead8b5",
    color: "#805c16",
    font: "800 10px 'Manrope',sans-serif",
    padding: "5px 8px"
  },
  /* .cart-button b / .admin-nav b — haldi counter */
  count: {
    background: "var(--rayyan-haldi)",
    color: "var(--rayyan-ink)",
    font: "700 11px 'Manrope',sans-serif",
    width: 20,
    height: 20,
    borderRadius: "50%",
    display: "grid",
    placeItems: "center"
  }
};
function Badge({
  tone = "discount",
  children,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-block",
      borderRadius: 0,
      ...tones[tone],
      ...style
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Icon.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* Lucide is the app's icon set (lucide-react in quyum52526/rayyan). The repo does not vendor
   the icon files, so glyphs are pulled from the pinned lucide-static CDN and tinted with a CSS
   mask so they inherit currentColor exactly like the React icons do. */
const CDN = "https://unpkg.com/lucide-static@0.544.0/icons/";
function Icon({
  name,
  size = 16,
  strokeWidth,
  style,
  ...rest
}) {
  const url = `url("${CDN}${name}.svg")`;
  return /*#__PURE__*/React.createElement("span", _extends({
    "aria-hidden": "true"
  }, rest, {
    style: {
      display: "inline-block",
      width: size,
      height: size,
      flex: "0 0 auto",
      backgroundColor: "currentColor",
      WebkitMaskImage: url,
      maskImage: url,
      WebkitMaskRepeat: "no-repeat",
      maskRepeat: "no-repeat",
      WebkitMaskSize: "contain",
      maskSize: "contain",
      WebkitMaskPosition: "center",
      maskPosition: "center",
      ...style
    }
  }));
}
Object.assign(__ds_scope, { Icon });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Icon.jsx", error: String((e && e.message) || e) }); }

// components/admin/EmptyState.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function EmptyState({
  icon = "shopping-bag",
  title,
  note,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      padding: "70px 20px",
      textAlign: "center",
      color: "#a18e81",
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 28
  }), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "14px 0 4px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 21px 'Marcellus',serif"
    }
  }, title), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0,
      font: "400 12px 'Hind Siliguri',sans-serif"
    }
  }, note));
}
Object.assign(__ds_scope, { EmptyState });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/EmptyState.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CartLineItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CartLineItem({
  item,
  variant = "২৫০ গ্রাম",
  onRemove,
  style,
  ...rest
}) {
  const bn = n => Number(n).toLocaleString("bn-BD");
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      gap: 12,
      alignItems: "center",
      padding: "17px 0",
      borderBottom: "1px solid var(--line-200)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: item.image,
    alt: item.bn,
    style: {
      width: 70,
      height: 70,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      font: "600 15px 'Hind Siliguri',sans-serif",
      margin: 0
    }
  }, item.bn), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-muted)",
      font: "400 11px 'Hind Siliguri',sans-serif",
      margin: "2px 0"
    }
  }, variant), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "700 14px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(item.price))), onRemove ? /*#__PURE__*/React.createElement("button", {
    onClick: onRemove,
    "aria-label": "\u09AA\u09A3\u09CD\u09AF \u09AE\u09C1\u099B\u09C1\u09A8",
    style: {
      alignSelf: "flex-start",
      marginLeft: "auto",
      border: 0,
      background: "transparent",
      color: "var(--ink-muted)",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "x",
    size: 15
  })) : null);
}
Object.assign(__ds_scope, { CartLineItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CartLineItem.jsx", error: String((e && e.message) || e) }); }

// components/commerce/CategoryCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function CategoryCard({
  label,
  count,
  image,
  alt,
  href,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  return /*#__PURE__*/React.createElement("a", _extends({}, rest, {
    href: href,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      display: "block",
      minHeight: 192,
      overflow: "hidden",
      border: "1px solid #8415381a",
      borderRadius: 12,
      isolation: "isolate",
      background: "#22201d",
      color: "#fff",
      ...style
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: image,
    alt: alt || label,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: hover ? "scale(1.1)" : "scale(1)",
      transition: "transform .5s ease"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      inset: 0,
      background: "linear-gradient(to top,#22201de6 0%,#22201d66 48%,transparent 100%)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: 20,
      bottom: 19,
      left: 20
    }
  }, /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: 0,
      color: "#fff",
      textShadow: "0 1px 3px #22201d80",
      font: "700 20px/1.25 'Hind Siliguri',sans-serif"
    }
  }, label), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "4px 0 0",
      color: "#fbf7f0e6",
      font: "500 12px 'Manrope',sans-serif"
    }
  }, count)), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      right: 15,
      bottom: 16,
      width: 36,
      height: 36,
      display: "grid",
      placeItems: "center",
      border: "1px solid #fbf7f099",
      borderRadius: "50%",
      color: hover ? "var(--rayyan-ink)" : "#fff",
      background: hover ? "var(--rayyan-haldi)" : "transparent",
      transform: hover ? "translateX(4px)" : "none",
      transition: "transform .25s ease, background .25s ease, color .25s ease"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-right",
    size: 18
  })));
}
Object.assign(__ds_scope, { CategoryCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/CategoryCard.jsx", error: String((e && e.message) || e) }); }

// components/commerce/FreeShippingMeter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function FreeShippingMeter({
  total = 0,
  threshold = 1000,
  style,
  ...rest
}) {
  const pct = Math.min(total / threshold * 100, 100);
  const bn = n => Number(n).toLocaleString("bn-BD");
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      padding: "18px 25px",
      background: "var(--sand-200)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 7,
      alignItems: "center",
      color: "var(--rayyan-green)",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "truck",
    size: 16
  }), /*#__PURE__*/React.createElement("span", null, total >= threshold ? "আপনার ডেলিভারি ফ্রি!" : `আর ৳${bn(threshold - total)} টাকার পণ্য কিনলেই ফ্রি ডেলিভারি!`)), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 5,
      marginTop: 11,
      background: "#ddcfbe"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      display: "block",
      height: "100%",
      width: `${pct}%`,
      background: "var(--rayyan-green)",
      transition: "width .3s"
    }
  })));
}
Object.assign(__ds_scope, { FreeShippingMeter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/FreeShippingMeter.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductGallery.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductGallery({
  productName,
  frontImage,
  detailImage,
  height = 570,
  style,
  ...rest
}) {
  const assets = [{
    src: frontImage,
    label: "প্যাকেজ"
  }, {
    src: detailImage || frontImage,
    label: "উপকরণ"
  }];
  const [index, setIndex] = React.useState(0);
  const [origin, setOrigin] = React.useState("50% 50%");
  const [zoom, setZoom] = React.useState(false);
  const active = assets[index];
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      minWidth: 0,
      background: "var(--surface-media)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height,
      overflow: "hidden",
      background: "var(--surface-media)",
      cursor: "zoom-in"
    },
    onMouseMove: e => {
      const b = e.currentTarget.getBoundingClientRect();
      setOrigin(`${(e.clientX - b.left) / b.width * 100}% ${(e.clientY - b.top) / b.height * 100}%`);
      setZoom(true);
    },
    onMouseLeave: () => {
      setOrigin("50% 50%");
      setZoom(false);
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: active.src,
    alt: `${productName} ${active.label}`,
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transformOrigin: origin,
      transform: zoom ? "scale(2.15)" : "scale(1)",
      transition: "transform .35s ease"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      left: 17,
      bottom: 17,
      padding: "5px 9px",
      background: "#fffdf9df",
      color: "var(--rayyan-maroon)",
      font: "700 10px 'Hind Siliguri',sans-serif",
      letterSpacing: ".04em"
    }
  }, active.label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      padding: 10,
      background: "#ffffff99"
    },
    role: "tablist",
    "aria-label": "\u09AA\u09A3\u09CD\u09AF\u09C7\u09B0 \u09AE\u09BF\u09A1\u09BF\u09AF\u09BC\u09BE"
  }, assets.map((asset, i) => /*#__PURE__*/React.createElement("button", {
    key: asset.label,
    role: "tab",
    "aria-selected": i === index,
    onClick: () => setIndex(i),
    style: {
      position: "relative",
      width: 76,
      height: 76,
      overflow: "hidden",
      padding: 0,
      border: `2px solid ${i === index ? "var(--rayyan-maroon)" : "transparent"}`,
      background: "#f0e6d9",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: asset.src,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("small", {
    style: {
      position: "absolute",
      right: 2,
      bottom: 2,
      left: 2,
      overflow: "hidden",
      padding: 2,
      background: "#22201dbf",
      color: "#fff",
      font: "400 9px 'Hind Siliguri',sans-serif",
      whiteSpace: "nowrap"
    }
  }, asset.label)))));
}
Object.assign(__ds_scope, { ProductGallery });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductGallery.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const base = {
  border: 0,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  gap: 9,
  borderRadius: 0,
  cursor: "pointer",
  transition: "transform .2s, box-shadow .2s, background .2s, border-color .2s"
};
const variants = {
  /* .primary-button — haldi yellow, the storefront's main CTA */
  primary: {
    padding: "14px 21px",
    background: "var(--rayyan-haldi)",
    color: "var(--rayyan-ink)",
    font: "700 13px 'Hind Siliguri',sans-serif"
  },
  /* .pdp-add-button / .cart-button — deep maroon */
  secondary: {
    padding: "0 21px",
    height: 49,
    background: "var(--rayyan-maroon-deep)",
    color: "#fff",
    border: "1px solid var(--rayyan-maroon-deep)",
    font: "700 13px 'Hind Siliguri',sans-serif"
  },
  /* .product-add-button — ink, hovers to deep maroon */
  ink: {
    padding: "11px 8px",
    background: "var(--rayyan-ink)",
    color: "#fff",
    border: "1px solid var(--rayyan-ink)",
    font: "700 11px 'Hind Siliguri',sans-serif"
  },
  /* .dark-button — outlined, for use on maroon grounds */
  ghost: {
    padding: "14px 21px",
    background: "transparent",
    color: "#fff",
    border: "1px solid var(--action-ghost-border)",
    font: "700 13px 'Hind Siliguri',sans-serif"
  },
  /* .text-link / .view-all */
  link: {
    padding: 0,
    gap: 6,
    background: "transparent",
    color: "var(--rayyan-maroon)",
    font: "700 13px 'Hind Siliguri',sans-serif"
  }
};
function Button({
  variant = "primary",
  icon,
  iconLeft,
  block,
  disabled,
  children,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const lift = hover && !disabled && (variant === "primary" || variant === "ghost");
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    disabled: disabled,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      ...base,
      ...variants[variant],
      width: block ? "100%" : undefined,
      opacity: disabled ? 0.55 : 1,
      cursor: disabled ? "not-allowed" : "pointer",
      transform: lift ? "translateY(-2px)" : "none",
      boxShadow: lift ? "0 8px 18px #9c631e26" : "none",
      background: hover && variant === "ink" ? "var(--rayyan-maroon-deep)" : variants[variant].background,
      ...style
    }
  }), iconLeft ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: iconLeft,
    size: 17
  }) : null, children, icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 17
  }) : null);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/commerce/OfferBanner.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function OfferBanner({
  eyebrow,
  title,
  highlight,
  timerLabel = "অফার শেষ হতে",
  timer,
  action,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("section", _extends({}, rest, {
    style: {
      background: "var(--rayyan-maroon-deep)",
      color: "#fff",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(1180px, calc(100% - 40px))",
      marginInline: "auto",
      minHeight: 132,
      display: "flex",
      alignItems: "center",
      gap: 26
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 38,
      color: "var(--rayyan-haldi)"
    }
  }, "\u2739"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#e1b9a9",
      margin: "0 0 4px",
      font: "500 12px 'Hind Siliguri',sans-serif"
    }
  }, eyebrow), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: 0,
      font: "400 25px 'Marcellus',serif"
    }
  }, title, " ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-haldi)",
      fontWeight: 400
    }
  }, highlight))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: "auto",
      paddingLeft: 34,
      borderLeft: "1px solid #8b4253"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      font: "500 11px 'Hind Siliguri',sans-serif"
    }
  }, timerLabel), /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      color: "var(--rayyan-haldi)",
      letterSpacing: ".15em",
      font: "700 18px 'Manrope',sans-serif",
      marginTop: 5
    }
  }, timer)), action || /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ghost",
    icon: "arrow-right"
  }, "\u0985\u09AB\u09BE\u09B0 \u09A6\u09C7\u0996\u09C1\u09A8")));
}
Object.assign(__ds_scope, { OfferBanner });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/OfferBanner.jsx", error: String((e && e.message) || e) }); }

// components/core/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
const tones = {
  /* .quick-action-cart */
  maroon: {
    background: "var(--rayyan-maroon)",
    color: "#fff",
    border: 0,
    borderRadius: "50%"
  },
  /* .quick-action-wishlist / .heart */
  white: {
    background: "#fff",
    color: "var(--rayyan-maroon)",
    border: 0,
    borderRadius: "50%",
    boxShadow: "0 4px 14px #22201d22"
  },
  /* .product-view-button — squared, bordered */
  outline: {
    background: "#fff",
    color: "var(--rayyan-maroon)",
    border: "1px solid var(--line-400)",
    borderRadius: 0
  },
  /* .icon-button in the header */
  bare: {
    background: "transparent",
    color: "var(--rayyan-ink)",
    border: 0,
    borderRadius: 0
  },
  /* .table-icon in admin */
  table: {
    background: "#fff",
    color: "var(--rayyan-maroon)",
    border: "1px solid #e3d7cd",
    borderRadius: 0
  }
};
function IconButton({
  icon,
  tone = "white",
  size = 34,
  iconSize = 16,
  badge,
  active,
  label,
  style,
  ...rest
}) {
  const t = tones[tone];
  return /*#__PURE__*/React.createElement("button", _extends({}, rest, {
    "aria-label": label,
    style: {
      position: "relative",
      display: "grid",
      placeItems: "center",
      width: size,
      height: size,
      padding: 0,
      cursor: "pointer",
      transition: "background .2s, color .2s, border-color .2s",
      ...t,
      ...(active ? {
        background: "var(--rayyan-maroon)",
        color: "#fff"
      } : null),
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: iconSize
  }), badge != null ? /*#__PURE__*/React.createElement("span", {
    style: {
      position: "absolute",
      top: 0,
      right: 0,
      width: 15,
      height: 15,
      display: "grid",
      placeItems: "center",
      borderRadius: "50%",
      background: "var(--rayyan-maroon)",
      color: "#fff",
      font: "600 9px 'Manrope',sans-serif"
    }
  }, badge) : null);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/admin/InventoryRow.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function InventoryRow({
  product,
  onEdit,
  onDelete,
  style,
  ...rest
}) {
  const low = product.stock < 10;
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "grid",
      gridTemplateColumns: "45px minmax(130px,1fr) 45px 65px 30px 30px",
      alignItems: "center",
      gap: 12,
      padding: "13px 0",
      borderTop: "1px solid #eee4da",
      ...style
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: product.image,
    alt: "",
    style: {
      width: 45,
      height: 52,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minWidth: 0
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      overflow: "hidden",
      color: "var(--rayyan-maroon-deep)",
      font: "600 13px 'Hind Siliguri',sans-serif",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, product.bn), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      overflow: "hidden",
      color: "#9a8d82",
      font: "400 9px 'Manrope',sans-serif",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap"
    }
  }, product.name, " \xB7 ", product.sku)), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--ink-faint)",
      font: "400 10px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B8\u09CD\u099F\u0995"), /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      color: low ? "var(--status-low-stock)" : "inherit",
      font: "700 13px 'Manrope',sans-serif"
    }
  }, product.stock)), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "700 13px 'Manrope',sans-serif"
    }
  }, "\u09F3", Number(product.price).toLocaleString("bn-BD")), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "edit-3",
    tone: "table",
    size: 28,
    onClick: onEdit,
    label: "\u09AA\u09A3\u09CD\u09AF \u09B8\u09AE\u09CD\u09AA\u09BE\u09A6\u09A8\u09BE"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "trash-2",
    tone: "table",
    size: 28,
    onClick: onDelete,
    label: "\u09AA\u09A3\u09CD\u09AF \u09AE\u09C1\u099B\u09C1\u09A8",
    style: {
      color: "#a44c3c"
    }
  }));
}
Object.assign(__ds_scope, { InventoryRow });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/InventoryRow.jsx", error: String((e && e.message) || e) }); }

// components/commerce/ProductCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function ProductCard({
  product,
  liked,
  onToggleWishlist,
  onAddToCart,
  onQuickView,
  style,
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  const bn = n => Number(n).toLocaleString("bn-BD");
  return /*#__PURE__*/React.createElement("article", _extends({}, rest, {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      background: "#fff",
      border: "1px solid var(--line-100)",
      minWidth: 0,
      overflow: "hidden",
      transition: "transform .3s ease, box-shadow .3s ease",
      transform: hover ? "translateY(-5px)" : "none",
      boxShadow: hover ? "0 16px 34px #5c0e2614" : "none",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      aspectRatio: "4 / 5",
      overflow: "hidden",
      background: "#eee7dd"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: product.image,
    alt: product.bn,
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: hover ? 0 : 1,
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "opacity .3s ease, transform .3s ease"
    }
  }), /*#__PURE__*/React.createElement("img", {
    src: product.image2 || product.image,
    alt: "",
    style: {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      objectFit: "cover",
      opacity: hover ? 1 : 0,
      transform: hover ? "scale(1.05)" : "scale(1)",
      transition: "opacity .3s ease, transform .3s ease"
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: product.tag === "ফ্রেশ" ? "fresh" : "discount",
    style: {
      position: "absolute",
      left: 12,
      top: 12,
      zIndex: 1
    }
  }, bn(discount), "% OFF"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 12,
      right: 12,
      display: "flex",
      flexDirection: "column",
      gap: 7,
      opacity: hover ? 1 : 0,
      transform: hover ? "translateX(0)" : "translateX(8px)",
      transition: "opacity .25s ease, transform .25s ease"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "shopping-bag",
    tone: "maroon",
    onClick: onAddToCart,
    label: "\u0995\u09BE\u09B0\u09CD\u099F\u09C7 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"
  }), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "heart",
    tone: "white",
    active: liked,
    onClick: onToggleWishlist,
    label: "\u0989\u0987\u09B6\u09B2\u09BF\u09B8\u09CD\u099F\u09C7 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "17px 16px 16px"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      overflow: "hidden",
      color: "var(--ink-muted)",
      font: "700 9px 'Manrope',sans-serif",
      letterSpacing: ".12em",
      textOverflow: "ellipsis",
      textTransform: "uppercase",
      whiteSpace: "nowrap"
    }
  }, "RAYYAN GOURMET \xB7 ", product.category), /*#__PURE__*/React.createElement("h3", {
    style: {
      margin: "8px 0 0",
      minHeight: 48,
      font: "600 18px/1.35 'Hind Siliguri',sans-serif",
      color: "var(--rayyan-ink)"
    }
  }, product.bn), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "2px 0 0",
      color: "var(--ink-muted)",
      font: "400 11px 'Manrope',sans-serif"
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 11,
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "800 18px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(product.price)), /*#__PURE__*/React.createElement("del", {
    style: {
      color: "#aaa",
      marginLeft: 7,
      font: "400 11px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(product.oldPrice)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 15
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Button, {
    variant: "ink",
    iconLeft: "shopping-bag",
    onClick: onAddToCart,
    style: {
      flex: 1,
      minWidth: 0
    }
  }, "\u0995\u09BE\u09B0\u09CD\u099F-\u098F \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "eye",
    tone: "outline",
    size: 42,
    iconSize: 18,
    onClick: onQuickView,
    label: "\u09A6\u09CD\u09B0\u09C1\u09A4 \u09A6\u09C7\u0996\u09C1\u09A8",
    style: {
      width: 42,
      height: "auto"
    }
  }))));
}
Object.assign(__ds_scope, { ProductCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/ProductCard.jsx", error: String((e && e.message) || e) }); }

// components/core/Kicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Kicker({
  icon,
  tone = "maroon",
  children,
  style,
  ...rest
}) {
  const colors = {
    maroon: "var(--rayyan-maroon)",
    gold: "var(--rayyan-gold)",
    green: "var(--rayyan-green)"
  };
  return /*#__PURE__*/React.createElement("p", _extends({}, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      margin: 0,
      color: colors[tone],
      font: "600 12px 'Hind Siliguri',sans-serif",
      letterSpacing: ".09em",
      textTransform: "uppercase",
      ...style
    }
  }), icon ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 14
  }) : null, children);
}
Object.assign(__ds_scope, { Kicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Kicker.jsx", error: String((e && e.message) || e) }); }

// components/commerce/OrderSummary.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function OrderSummary({
  items = [],
  subtotal = 0,
  deliveryFee = 60,
  benefits = [],
  style,
  ...rest
}) {
  const bn = n => Number(n).toLocaleString("bn-BD");
  return /*#__PURE__*/React.createElement("aside", _extends({}, rest, {
    style: {
      alignSelf: "start",
      padding: "38px 30px",
      background: "var(--sand-300)",
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Kicker, null, "\u0986\u09AA\u09A8\u09BE\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "6px 0 26px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 27px 'Marcellus',serif"
    }
  }, "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09B8\u09BE\u09AE\u09BE\u09B0\u09BF"), items.map((item, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: "flex",
      gap: 10,
      alignItems: "center",
      margin: "0 0 28px"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: item.image,
    alt: "",
    style: {
      width: 48,
      height: 48,
      objectFit: "cover"
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, item.bn, /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--ink-muted)",
      font: "400 10px 'Hind Siliguri',sans-serif"
    }
  }, "\u09E8\u09EB\u09E6 \u0997\u09CD\u09B0\u09BE\u09AE \xD7 \u09E7")), /*#__PURE__*/React.createElement("b", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "700 12px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(item.price)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #ddcdbd",
      paddingTop: 13,
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 13px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B8\u09BE\u09AC\u099F\u09CB\u099F\u09BE\u09B2"), /*#__PURE__*/React.createElement("b", {
    style: {
      font: "700 13px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(subtotal))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      paddingTop: 7
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 13px 'Hind Siliguri',sans-serif"
    }
  }, "\u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF"), /*#__PURE__*/React.createElement("b", {
    style: {
      font: "700 13px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(deliveryFee))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      borderTop: "1px solid #cdb9a7",
      marginTop: 18,
      paddingTop: 18
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "600 13px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B8\u09B0\u09CD\u09AC\u09AE\u09CB\u099F"), /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "700 23px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(subtotal + deliveryFee))), benefits.map(b => /*#__PURE__*/React.createElement("div", {
    key: b.label,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      marginTop: 15,
      color: "var(--rayyan-green)",
      font: "600 11px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: b.icon,
    size: 16
  }), " ", b.label)));
}
Object.assign(__ds_scope, { OrderSummary });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/commerce/OrderSummary.jsx", error: String((e && e.message) || e) }); }

// components/core/QuantityStepper.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function QuantityStepper({
  value = 1,
  onChange,
  width = 112,
  height = 49,
  style,
  ...rest
}) {
  const btn = {
    width: 35,
    height: "100%",
    display: "grid",
    placeItems: "center",
    border: 0,
    background: "transparent",
    color: "var(--rayyan-maroon)",
    cursor: "pointer"
  };
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width,
      height,
      border: "1px solid var(--line-300)",
      background: "#fff",
      ...style
    }
  }), /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: () => onChange && onChange(Math.max(1, value - 1)),
    "aria-label": "\u09AA\u09B0\u09BF\u09AE\u09BE\u09A3 \u0995\u09AE\u09BE\u09A8"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "minus",
    size: 15
  })), /*#__PURE__*/React.createElement("b", {
    style: {
      font: "700 14px 'Manrope',sans-serif"
    }
  }, value), /*#__PURE__*/React.createElement("button", {
    style: btn,
    onClick: () => onChange && onChange(value + 1),
    "aria-label": "\u09AA\u09B0\u09BF\u09AE\u09BE\u09A3 \u09AC\u09BE\u09A1\u09BC\u09BE\u09A8"
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "plus",
    size: 15
  })));
}
Object.assign(__ds_scope, { QuantityStepper });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/QuantityStepper.jsx", error: String((e && e.message) || e) }); }

// components/core/Rating.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Rating({
  value,
  reviews,
  stars = 1,
  inStock,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "var(--rayyan-gold)",
      font: "700 12px 'Manrope',sans-serif",
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      gap: 2
    }
  }, Array.from({
    length: stars
  }).map((_, i) => /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    key: i,
    name: "star",
    size: 14
  }))), /*#__PURE__*/React.createElement("b", null, value), reviews != null ? /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--ink-muted)",
      font: "400 11px 'Hind Siliguri',sans-serif",
      fontStyle: "normal"
    }
  }, "(", reviews, " \u09B0\u09BF\u09AD\u09BF\u0989)") : null, inStock ? /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 5,
      marginLeft: "auto",
      color: "var(--rayyan-green)",
      font: "700 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("i", {
    style: {
      width: 7,
      height: 7,
      borderRadius: "50%",
      background: "var(--rayyan-green)"
    }
  }), " \u09B8\u09CD\u099F\u0995\u09C7 \u0986\u099B\u09C7") : null);
}
Object.assign(__ds_scope, { Rating });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Rating.jsx", error: String((e && e.message) || e) }); }

// components/core/SectionHeading.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SectionHeading({
  kicker,
  title,
  action,
  size = 32,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      gap: 20,
      marginBottom: 32,
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", null, kicker ? /*#__PURE__*/React.createElement(__ds_scope.Kicker, null, kicker) : null, /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "7px 0 0",
      color: "var(--rayyan-maroon-deep)",
      font: `400 ${size}px/1.2 'Marcellus',serif`
    }
  }, title)), action);
}
Object.assign(__ds_scope, { SectionHeading });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/SectionHeading.jsx", error: String((e && e.message) || e) }); }

// components/core/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Tabs({
  items = [],
  value,
  onChange,
  underline,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    role: "tablist",
    style: {
      display: "flex",
      gap: 20,
      borderBottom: underline ? "1px solid var(--line-200)" : undefined,
      ...style
    }
  }), items.map(item => {
    const id = typeof item === "string" ? item : item.id;
    const label = typeof item === "string" ? item : item.label;
    const active = id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: id,
      role: "tab",
      "aria-selected": active,
      onClick: () => onChange && onChange(id),
      style: {
        position: "relative",
        border: 0,
        background: "transparent",
        padding: underline ? "0 0 11px" : "8px 0",
        color: active ? "var(--rayyan-maroon)" : "var(--ink-muted)",
        borderBottom: !underline && active ? "2px solid var(--rayyan-maroon)" : "2px solid transparent",
        font: "600 12px 'Hind Siliguri',sans-serif",
        cursor: "pointer"
      }
    }, label, underline && active ? /*#__PURE__*/React.createElement("span", {
      style: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: -1,
        height: 2,
        background: "var(--rayyan-maroon)"
      }
    }) : null);
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Tabs.jsx", error: String((e && e.message) || e) }); }

// components/core/TrustItem.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TrustItem({
  glyph,
  title,
  note,
  divider = true,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 13,
      borderRight: divider ? "1px solid var(--line-200)" : 0,
      ...style
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      width: 36,
      height: 36,
      display: "grid",
      placeItems: "center",
      background: "#f5ead8",
      color: "var(--rayyan-maroon)",
      fontSize: 20
    }
  }, glyph), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, title), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--ink-muted)",
      font: "400 12px 'Hind Siliguri',sans-serif"
    }
  }, note)));
}
Object.assign(__ds_scope, { TrustItem });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/TrustItem.jsx", error: String((e && e.message) || e) }); }

// components/core/VariantPicker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function VariantPicker({
  label,
  meta,
  options = [],
  value,
  onChange,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: style
  }), label ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      font: "600 13px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("b", null, label), meta ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-muted)",
      font: "400 10px 'Manrope',sans-serif"
    }
  }, meta) : null) : null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 8,
      marginTop: 11,
      flexWrap: "wrap"
    }
  }, options.map(option => {
    const selected = option === value;
    return /*#__PURE__*/React.createElement("button", {
      key: option,
      onClick: () => onChange && onChange(option),
      style: {
        background: selected ? "#f2e3e4" : "transparent",
        border: selected ? "2px solid var(--rayyan-maroon)" : "1px solid #d7c9bb",
        padding: selected ? "9px 12px" : "10px 13px",
        color: selected ? "var(--rayyan-maroon)" : "#594c46",
        font: `${selected ? 700 : 500} 12px 'Hind Siliguri',sans-serif`,
        cursor: "pointer"
      }
    }, option);
  })));
}
Object.assign(__ds_scope, { VariantPicker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/VariantPicker.jsx", error: String((e && e.message) || e) }); }

// components/forms/Field.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function Field({
  label,
  as = "input",
  options = [],
  rows = 3,
  tone = "light",
  style,
  ...rest
}) {
  const control = {
    display: "block",
    width: "100%",
    marginTop: 7,
    padding: 12,
    border: "1px solid var(--line-200)",
    borderRadius: 0,
    outline: 0,
    background: tone === "light" ? "var(--rayyan-ivory)" : "var(--sand-50)",
    color: "var(--rayyan-ink)",
    font: "400 12px 'Hind Siliguri',sans-serif"
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: "block",
      marginTop: 18,
      font: "600 12px 'Hind Siliguri',sans-serif",
      ...style
    }
  }, label, as === "textarea" ? /*#__PURE__*/React.createElement("textarea", _extends({
    rows: rows
  }, rest, {
    style: control
  })) : null, as === "select" ? /*#__PURE__*/React.createElement("select", _extends({}, rest, {
    style: control
  }), options.map(o => /*#__PURE__*/React.createElement("option", {
    key: o,
    value: o
  }, o))) : null, as === "input" ? /*#__PURE__*/React.createElement("input", _extends({}, rest, {
    style: control
  })) : null);
}
Object.assign(__ds_scope, { Field });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Field.jsx", error: String((e && e.message) || e) }); }

// components/forms/PaymentOption.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function PaymentOption({
  label = "ক্যাশ অন ডেলিভারি",
  note = "নির্বাচিত",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      border: "1px solid var(--rayyan-maroon)",
      padding: 12,
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "var(--rayyan-maroon)",
      font: "600 12px 'Hind Siliguri',sans-serif",
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "check",
    size: 16
  }), " ", label, note ? /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--rayyan-green)",
      font: "400 10px 'Hind Siliguri',sans-serif"
    }
  }, note) : null);
}
Object.assign(__ds_scope, { PaymentOption });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/PaymentOption.jsx", error: String((e && e.message) || e) }); }

// components/shell/Logo.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/* The RAYYAN wordmark as shipped on the web: Marcellus caps with a gold Bangla tagline.
   The brand guide's "Heritage Diamond" mark (Arabic ريان over RAYYAN in a diamond) was
   supplied only inside the PDF — no vector/raster logo file exists in the sources, so the
   type lockup stands in for it. See readme.md → ICONOGRAPHY. */
function Logo({
  tagline = "রসনায় বিশুদ্ধতা",
  size = 27,
  tone = "maroon",
  style,
  ...rest
}) {
  const colors = {
    maroon: "var(--rayyan-maroon-deep)",
    light: "#fff"
  };
  return /*#__PURE__*/React.createElement("span", _extends({}, rest, {
    style: {
      display: "inline-block",
      color: colors[tone],
      font: `400 ${size}px 'Marcellus',serif`,
      letterSpacing: ".12em",
      lineHeight: 1,
      whiteSpace: "nowrap",
      ...style
    }
  }), "RAYYAN", tagline ? /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginTop: 7,
      color: tone === "light" ? "#e9bf69" : "var(--rayyan-gold)",
      font: "400 10px 'Hind Siliguri',sans-serif",
      letterSpacing: ".13em",
      textAlign: "center"
    }
  }, tagline) : null);
}
Object.assign(__ds_scope, { Logo });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/Logo.jsx", error: String((e && e.message) || e) }); }

// components/admin/AdminNav.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function AdminNav({
  items = [],
  value,
  onChange,
  storeLink = "স্টোরফ্রন্টে ফিরুন",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("aside", _extends({}, rest, {
    style: {
      display: "flex",
      flexDirection: "column",
      padding: "32px 20px",
      background: "var(--rayyan-maroon-deep)",
      color: "#fff",
      ...style
    }
  }), /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    tone: "light",
    tagline: "ADMIN STUDIO",
    size: 25
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 8,
      marginTop: 70
    }
  }, items.map(item => {
    const active = item.id === value;
    return /*#__PURE__*/React.createElement("button", {
      key: item.id,
      onClick: () => onChange && onChange(item.id),
      style: {
        display: "flex",
        alignItems: "center",
        gap: 12,
        border: 0,
        padding: "13px 14px",
        background: active ? "var(--rayyan-maroon)" : "transparent",
        color: active ? "#fff" : "#d9b8a7",
        textAlign: "left",
        font: "600 13px 'Hind Siliguri',sans-serif",
        cursor: "pointer"
      }
    }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
      name: item.icon,
      size: 17
    }), " ", item.label, item.count != null ? /*#__PURE__*/React.createElement("b", {
      style: {
        marginLeft: "auto",
        display: "grid",
        minWidth: 20,
        height: 20,
        placeItems: "center",
        borderRadius: "50%",
        background: "var(--rayyan-haldi)",
        color: "var(--rayyan-ink)",
        font: "700 10px 'Manrope',sans-serif"
      }
    }, item.count) : null);
  })), /*#__PURE__*/React.createElement("a", {
    href: "#",
    style: {
      display: "flex",
      alignItems: "center",
      gap: 8,
      marginTop: "auto",
      color: "#e9bfaa",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "arrow-left",
    size: 16
  }), " ", storeLink));
}
Object.assign(__ds_scope, { AdminNav });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/admin/AdminNav.jsx", error: String((e && e.message) || e) }); }

// components/shell/SiteFooter.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteFooter({
  line = "খাঁটি খাবার, প্রতিদিনের ভালোবাসা।",
  legal = "© ২০২৪ RAYYAN Bangladesh",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("footer", _extends({}, rest, {
    style: {
      background: "var(--rayyan-maroon-deep)",
      color: "#fff",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(1180px, calc(100% - 40px))",
      marginInline: "auto",
      minHeight: 120,
      display: "flex",
      alignItems: "center",
      gap: 32
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, {
    tone: "light"
  }), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#d8bfaa",
      font: "400 14px 'Hind Siliguri',sans-serif",
      marginRight: "auto"
    }
  }, line), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#b89786",
      font: "400 11px 'Manrope',sans-serif"
    }
  }, legal)));
}
Object.assign(__ds_scope, { SiteFooter });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/SiteFooter.jsx", error: String((e && e.message) || e) }); }

// components/shell/SiteHeader.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function SiteHeader({
  nav = [],
  search,
  onSearch,
  cartCount = 0,
  wishlistCount = 0,
  onCart,
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("header", _extends({}, rest, {
    style: {
      position: "sticky",
      top: 0,
      zIndex: 10,
      background: "rgba(251,247,240,.95)",
      borderBottom: "1px solid var(--line-200)",
      backdropFilter: "blur(12px)",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(1180px, calc(100% - 40px))",
      marginInline: "auto",
      height: 82,
      display: "flex",
      alignItems: "center",
      gap: 42
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Logo, null), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: "flex",
      gap: 24,
      marginRight: "auto",
      font: "600 14px 'Hind Siliguri',sans-serif"
    }
  }, nav.map(item => /*#__PURE__*/React.createElement("a", {
    key: item.label,
    href: item.href,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 4,
      color: "#4a4140",
      transition: "color .2s"
    }
  }, item.label, item.caret ? /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "chevron-down",
    size: 14
  }) : null))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 230,
      display: "flex",
      alignItems: "center",
      gap: 8,
      borderBottom: "1px solid #b9aaa0",
      padding: "8px 2px",
      color: "var(--ink-muted)"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "search",
    size: 18
  }), /*#__PURE__*/React.createElement("input", {
    value: search,
    onChange: e => onSearch && onSearch(e.target.value),
    placeholder: "\u09AE\u09B8\u09B2\u09BE \u09AC\u09BE \u09AA\u09A3\u09CD\u09AF \u0996\u09C1\u0981\u099C\u09C1\u09A8...",
    "aria-label": "\u09AA\u09A3\u09CD\u09AF \u0996\u09C1\u0981\u099C\u09C1\u09A8",
    style: {
      minWidth: 0,
      flex: 1,
      border: 0,
      background: "transparent",
      outline: 0,
      color: "var(--rayyan-ink)",
      font: "400 12px 'Hind Siliguri',sans-serif"
    }
  })), /*#__PURE__*/React.createElement(__ds_scope.IconButton, {
    icon: "heart",
    tone: "bare",
    iconSize: 21,
    size: 35,
    badge: wishlistCount,
    label: "\u0989\u0987\u09B6\u09B2\u09BF\u09B8\u09CD\u099F"
  }), /*#__PURE__*/React.createElement("button", {
    onClick: onCart,
    style: {
      border: "1px solid var(--rayyan-maroon-deep)",
      background: "var(--rayyan-maroon-deep)",
      color: "#fff",
      height: 42,
      padding: "0 14px",
      display: "flex",
      alignItems: "center",
      gap: 7,
      font: "600 13px 'Hind Siliguri',sans-serif",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: "shopping-bag",
    size: 19
  }), /*#__PURE__*/React.createElement("span", null, "\u0995\u09BE\u09B0\u09CD\u099F"), /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "count"
  }, cartCount)))));
}
Object.assign(__ds_scope, { SiteHeader });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// components/shell/TopBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
function TopBar({
  message = "ঢাকার ভিতরে ২৪–৪৮ ঘণ্টায় ক্যাশ অন ডেলিভারি",
  note,
  icon = "truck",
  style,
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({}, rest, {
    style: {
      background: "var(--rayyan-maroon-deep)",
      color: "#f8ebda",
      font: "400 13px 'Hind Siliguri',sans-serif",
      letterSpacing: ".01em",
      ...style
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(1180px, calc(100% - 40px))",
      marginInline: "auto",
      minHeight: 35,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Icon, {
    name: icon,
    size: 15
  }), " ", message), note ? /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#d8c3aa"
    }
  }, note) : null));
}
Object.assign(__ds_scope, { TopBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/shell/TopBar.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/AdminApp.jsx
try { (() => {
const {
  AdminNav,
  Kicker,
  Button,
  MetricCard,
  OrderRow,
  EmptyState
} = window.RAYYANDesignSystem_7f0581;
const DATA = window.RAYYAN_ADMIN;
function Overview({
  products,
  orders,
  onProducts,
  onOrders
}) {
  const stock = products.reduce((s, p) => s + p.stock, 0);
  const bn = n => Number(n).toLocaleString("bn-BD");
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 22
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(MetricCard, {
    label: "\u09AE\u09CB\u099F \u09AA\u09A3\u09CD\u09AF",
    value: bn(products.length),
    note: "\u0995\u09CD\u09AF\u09BE\u099F\u09BE\u09B2\u0997\u09C7 \u09B8\u0995\u09CD\u09B0\u09BF\u09AF\u09BC \u0986\u0987\u099F\u09C7\u09AE",
    onClick: onProducts
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "\u09AE\u09CB\u099F \u09B8\u09CD\u099F\u0995",
    value: bn(stock),
    note: "\u0987\u0989\u09A8\u09BF\u099F \u0987\u09A8\u09AD\u09C7\u09A8\u09CD\u099F\u09B0\u09BF",
    onClick: onProducts
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0",
    value: bn(orders.length),
    note: "\u09B2\u09CB\u0995\u09BE\u09B2 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0995\u09BF\u0989",
    onClick: onOrders
  }), /*#__PURE__*/React.createElement(MetricCard, {
    label: "\u09B2\u09CB \u09B8\u09CD\u099F\u0995",
    value: bn(products.filter(p => p.stock < 10).length),
    note: "\u09AE\u09A8\u09CB\u09AF\u09CB\u0997 \u09AA\u09CD\u09B0\u09AF\u09BC\u09CB\u099C\u09A8",
    onClick: onProducts
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 30,
      background: "#f1e1d0",
      border: "1px solid var(--line-200)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "QUICK ACTION"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "7px 0",
      color: "var(--rayyan-maroon-deep)",
      font: "400 25px 'Marcellus',serif"
    }
  }, "\u0986\u099C\u0995\u09C7\u09B0 \u0995\u09CD\u09AF\u09BE\u099F\u09BE\u09B2\u0997 \u09A0\u09BF\u0995\u09A0\u09BE\u0995 \u09B0\u09BE\u0996\u09C1\u09A8"), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 470,
      margin: 0,
      color: "#776960",
      font: "400 13px/1.7 'Hind Siliguri',sans-serif"
    }
  }, "\u09AA\u09A3\u09CD\u09AF\u09C7\u09B0 \u099B\u09AC\u09BF, \u09A6\u09BE\u09AE \u0993 \u09B8\u09CD\u099F\u0995 \u09AA\u09B0\u09BF\u09AC\u09B0\u09CD\u09A4\u09A8 \u0995\u09B0\u09B2\u09C7 \u09A4\u09BE \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u0999\u09CD\u0997\u09C7 \u09B8\u09CD\u099F\u09CB\u09B0\u09AB\u09CD\u09B0\u09A8\u09CD\u099F\u09C7 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: "package",
    onClick: onProducts
  }, "\u09AA\u09A3\u09CD\u09AF \u09AE\u09CD\u09AF\u09BE\u09A8\u09C7\u099C \u0995\u09B0\u09C1\u09A8")));
}
function AdminApp() {
  const [section, setSection] = React.useState("overview");
  const [products, setProducts] = React.useState(DATA.products);
  const [orders, setOrders] = React.useState(DATA.orders);
  const titles = {
    overview: "আজকের ব্যবসা",
    products: "পণ্য ক্যাটালগ",
    orders: "গ্রাহকের অর্ডার"
  };
  return /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: "100vh",
      display: "grid",
      gridTemplateColumns: "245px 1fr",
      background: "var(--surface-app)",
      color: "var(--rayyan-ink)"
    }
  }, /*#__PURE__*/React.createElement(AdminNav, {
    value: section,
    onChange: setSection,
    items: [{
      id: "overview",
      label: "ওভারভিউ",
      icon: "layout-dashboard"
    }, {
      id: "products",
      label: "পণ্য ক্যাটালগ",
      icon: "package"
    }, {
      id: "orders",
      label: "অর্ডার",
      icon: "shopping-bag",
      count: orders.length
    }]
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      minWidth: 0,
      padding: "42px clamp(22px,5vw,70px)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 34
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "RAYYAN CONTROL ROOM"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "6px 0 0",
      color: "var(--rayyan-maroon-deep)",
      font: "400 34px 'Marcellus',serif"
    }
  }, titles[section])), section === "products" ? /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: "plus"
  }, "\u09A8\u09A4\u09C1\u09A8 \u09AA\u09A3\u09CD\u09AF") : null), section === "overview" ? /*#__PURE__*/React.createElement(Overview, {
    products: products,
    orders: orders,
    onProducts: () => setSection("products"),
    onOrders: () => setSection("orders")
  }) : null, section === "products" ? /*#__PURE__*/React.createElement(window.CatalogScreen, {
    products: products,
    onDelete: id => setProducts(c => c.filter(p => p.id !== id))
  }) : null, section === "orders" ? /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--line-200)",
      padding: 25
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "FULFILLMENT"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "5px 0 24px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 24px 'Marcellus',serif"
    }
  }, "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A4\u09BE\u09B2\u09BF\u0995\u09BE ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--rayyan-gold)",
      font: "700 13px 'Manrope',sans-serif"
    }
  }, orders.length)), orders.length ? /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gap: 12
    }
  }, orders.map(o => /*#__PURE__*/React.createElement(OrderRow, {
    key: o.id,
    order: o,
    onStatusChange: s => setOrders(c => c.map(x => x.id === o.id ? {
      ...x,
      status: s
    } : x))
  }))) : /*#__PURE__*/React.createElement(EmptyState, {
    title: "\u098F\u0996\u09A8\u0993 \u0995\u09CB\u09A8\u09CB \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A8\u09C7\u0987",
    note: "\u09B8\u09CD\u099F\u09CB\u09B0\u09AB\u09CD\u09B0\u09A8\u09CD\u099F\u09C7\u09B0 checkout \u09A5\u09C7\u0995\u09C7 \u09A4\u09C8\u09B0\u09BF \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u098F\u0996\u09BE\u09A8\u09C7 \u09A6\u09C7\u0996\u09BE \u09AF\u09BE\u09AC\u09C7\u0964"
  })) : null));
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(AdminApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/AdminApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/CatalogScreen.jsx
try { (() => {
const {
  Kicker,
  Button,
  Field,
  InventoryRow,
  Icon
} = window.RAYYANDesignSystem_7f0581;
function MediaField({
  label,
  hint
}) {
  return /*#__PURE__*/React.createElement("label", {
    style: {
      position: "relative",
      padding: 8,
      border: "1px dashed #d5c1ae",
      textAlign: "center",
      cursor: "pointer",
      display: "block"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      marginBottom: 7,
      color: "var(--rayyan-maroon)",
      font: "600 11px 'Hind Siliguri',sans-serif"
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      height: 82,
      display: "grid",
      placeItems: "center",
      overflow: "hidden",
      background: "var(--sand-200)",
      color: "#b89b82"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "package",
    size: 22
  })), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      marginTop: 7,
      color: "#988b80",
      font: "400 9px 'Manrope',sans-serif"
    }
  }, hint));
}
function CatalogScreen({
  products,
  onDelete
}) {
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "minmax(330px,.8fr) minmax(450px,1.2fr)",
      gap: 22,
      alignItems: "start"
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => e.preventDefault(),
    style: {
      background: "#fff",
      border: "1px solid var(--line-200)",
      padding: 26
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "NEW PRODUCT"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "5px 0 24px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 24px 'Marcellus',serif"
    }
  }, "\u09A8\u09A4\u09C1\u09A8 \u09AA\u09A3\u09CD\u09AF \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 15
    }
  }, /*#__PURE__*/React.createElement(Field, {
    label: "\u0987\u0982\u09B0\u09C7\u099C\u09BF \u09A8\u09BE\u09AE",
    placeholder: "Premium Turmeric Powder",
    tone: "raised",
    style: {
      marginTop: 0
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09AC\u09BE\u0982\u09B2\u09BE \u09A8\u09BE\u09AE",
    placeholder: "\u09AA\u09CD\u09B0\u09BF\u09AE\u09BF\u09AF\u09BC\u09BE\u09AE \u09B9\u09B2\u09C1\u09A6 \u0997\u09C1\u0981\u09A1\u09BC\u09BE",
    tone: "raised",
    style: {
      marginTop: 0
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "SKU",
    placeholder: "RY-005",
    tone: "raised",
    style: {
      marginTop: 0
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF",
    as: "select",
    options: window.RAYYAN_ADMIN.categories,
    tone: "raised",
    style: {
      marginTop: 0
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09AC\u09BF\u0995\u09CD\u09B0\u09AF\u09BC \u09AE\u09C2\u09B2\u09CD\u09AF",
    type: "number",
    tone: "raised",
    style: {
      marginTop: 0
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09AE\u09C2\u09B2 \u09AE\u09C2\u09B2\u09CD\u09AF",
    type: "number",
    tone: "raised",
    style: {
      marginTop: 0
    }
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09B8\u09CD\u099F\u0995",
    type: "number",
    tone: "raised",
    style: {
      marginTop: 0
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(3,1fr)",
      gap: 9,
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(MediaField, {
    label: "\u09AA\u09CD\u09B0\u09A7\u09BE\u09A8 \u099B\u09AC\u09BF",
    hint: "\u099B\u09AC\u09BF \u09AC\u09BE \u09AD\u09BF\u09A1\u09BF\u0993 \u0986\u09AA\u09B2\u09CB\u09A1 \u0995\u09B0\u09C1\u09A8"
  }), /*#__PURE__*/React.createElement(MediaField, {
    label: "\u09A6\u09CD\u09AC\u09BF\u09A4\u09C0\u09AF\u09BC \u099B\u09AC\u09BF",
    hint: "\u099B\u09AC\u09BF \u09AC\u09BE \u09AD\u09BF\u09A1\u09BF\u0993 \u0986\u09AA\u09B2\u09CB\u09A1 \u0995\u09B0\u09C1\u09A8"
  }), /*#__PURE__*/React.createElement(MediaField, {
    label: "\u09AA\u09CD\u09B0\u09CB\u09AE\u09CB \u09AD\u09BF\u09A1\u09BF\u0993",
    hint: "\u099B\u09AC\u09BF \u09AC\u09BE \u09AD\u09BF\u09A1\u09BF\u0993 \u0986\u09AA\u09B2\u09CB\u09A1 \u0995\u09B0\u09C1\u09A8"
  })), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    iconLeft: "save",
    style: {
      marginTop: 20
    }
  }, "\u09AA\u09A3\u09CD\u09AF \u09AA\u09CD\u09B0\u0995\u09BE\u09B6 \u0995\u09B0\u09C1\u09A8")), /*#__PURE__*/React.createElement("div", {
    style: {
      background: "#fff",
      border: "1px solid var(--line-200)",
      padding: 25
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "flex-start"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "INVENTORY"), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "5px 0 24px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 24px 'Marcellus',serif"
    }
  }, "\u09B8\u09AC \u09AA\u09A3\u09CD\u09AF ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--rayyan-gold)",
      font: "700 13px 'Manrope',sans-serif"
    }
  }, products.length))), /*#__PURE__*/React.createElement("span", {
    style: {
      color: "#8c7d72",
      font: "400 11px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B2\u09CB\u0995\u09BE\u09B2 \u09B8\u09CD\u099F\u09CB\u09B0\u09C7\u099C\u09C7 \u09B8\u0982\u09B0\u0995\u09CD\u09B7\u09BF\u09A4")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid"
    }
  }, products.map(p => /*#__PURE__*/React.createElement(InventoryRow, {
    key: p.id,
    product: p,
    onDelete: () => onDelete(p.id)
  })))));
}
Object.assign(window, {
  CatalogScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/CatalogScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/admin/data.js
try { (() => {
window.RAYYAN_ADMIN = {
  products: [{
    id: 1,
    bn: "প্রিমিয়াম হলুদ গুঁড়া",
    name: "Premium Turmeric Powder",
    sku: "RY-001",
    category: "গুঁড়া মসলা",
    price: 185,
    oldPrice: 220,
    stock: 48,
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=400&q=80"
  }, {
    id: 2,
    bn: "রেডি-টু-কুক মিক্সড সবজি",
    name: "Ready-to-Cook Mixed Veggies",
    sku: "RY-002",
    category: "রেডি-টু-কুক",
    price: 295,
    oldPrice: 360,
    stock: 22,
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=400&q=80"
  }, {
    id: 3,
    bn: "রয়্যাল গরম মসলা",
    name: "Royal Garam Masala",
    sku: "RY-003",
    category: "গোটা মসলা",
    price: 240,
    oldPrice: 290,
    stock: 31,
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=400&q=80"
  }, {
    id: 4,
    bn: "গোল্ডেন প্যান্ট্রি কম্বো",
    name: "Golden Pantry Combo",
    sku: "RY-004",
    category: "প্রিমিয়াম কম্বো",
    price: 699,
    oldPrice: 890,
    stock: 6,
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=400&q=80"
  }],
  orders: [{
    id: "RY-482913",
    createdAt: "৬ সেপ্টেম্বর ২০২৬, ১১:০৪",
    status: "pending",
    customerName: "সাদিয়া রহমান",
    phone: "01712345678",
    address: "বাসা ১২, রোড ৭, ধানমন্ডি, ঢাকা",
    zone: "inside",
    grandTotal: 540
  }, {
    id: "RY-482874",
    createdAt: "৫ সেপ্টেম্বর ২০২৬, ১৮:৪১",
    status: "processing",
    customerName: "তানভীর হাসান",
    phone: "01898765432",
    address: "হোল্ডিং ৩৪, কলেজ রোড, বগুড়া",
    zone: "outside",
    grandTotal: 1019
  }],
  categories: ["গুঁড়া মসলা", "গোটা মসলা", "রেডি-টু-কুক", "প্রিমিয়াম কম্বো"]
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/admin/data.js", error: String((e && e.message) || e) }); }

// ui_kits/storefront/CheckoutScreen.jsx
try { (() => {
const {
  Logo,
  Icon,
  Button,
  Field,
  PaymentOption,
  OrderSummary,
  Kicker
} = window.RAYYANDesignSystem_7f0581;
const {
  container
} = window.RAYYAN_DATA;
function CheckoutScreen({
  cart,
  subtotal,
  onBack,
  onPlace
}) {
  const [zone, setZone] = React.useState("ঢাকার ভিতরে — ৳৬০");
  const fee = zone.includes("ভিতরে") ? 60 : 120;
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "1px solid var(--line-200)",
      background: "var(--sand-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      height: 78,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onBack();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "var(--rayyan-maroon)",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 17
  }), " \u09B6\u09AA\u09BF\u0982 \u099A\u09BE\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09A8"), /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "var(--rayyan-green)",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "lock-keyhole",
    size: 15
  }), " \u09A8\u09BF\u09B0\u09BE\u09AA\u09A6 \u099A\u09C7\u0995\u0986\u0989\u099F"))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: "grid",
      gridTemplateColumns: "1.1fr .9fr",
      gap: 40,
      paddingTop: 55,
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement("form", {
    onSubmit: e => {
      e.preventDefault();
      onPlace();
    },
    style: {
      padding: 38,
      background: "#fff"
    }
  }, /*#__PURE__*/React.createElement(Kicker, null, "\u09B6\u09C7\u09B7 \u09A7\u09BE\u09AA"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0",
      color: "var(--rayyan-maroon-deep)",
      font: "400 38px 'Marcellus',serif"
    }
  }, "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8"), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-muted)",
      font: "400 13px 'Hind Siliguri',sans-serif",
      margin: 0
    }
  }, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE \u09A6\u09BF\u09A8, \u0986\u09AE\u09B0\u09BE \u09AF\u09A4\u09CD\u09A8 \u0995\u09B0\u09C7 \u09AA\u09CD\u09AF\u09BE\u0995 \u0995\u09B0\u09C7 \u09AA\u09BE\u09A0\u09BF\u09AF\u09BC\u09C7 \u09A6\u09C7\u09AC\u0964"), /*#__PURE__*/React.createElement(Field, {
    label: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09A8\u09BE\u09AE",
    placeholder: "\u09AA\u09C1\u09B0\u09CB \u09A8\u09BE\u09AE \u09B2\u09BF\u0996\u09C1\u09A8",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09AB\u09CB\u09A8 \u09A8\u09AE\u09CD\u09AC\u09B0",
    placeholder: "01XXXXXXXXX",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09B8\u09AE\u09CD\u09AA\u09C2\u09B0\u09CD\u09A3 \u09A0\u09BF\u0995\u09BE\u09A8\u09BE",
    as: "textarea",
    placeholder: "\u09AC\u09BE\u09B8\u09BE, \u09B0\u09CB\u09A1, \u098F\u09B2\u09BE\u0995\u09BE \u09B2\u09BF\u0996\u09C1\u09A8",
    required: true
  }), /*#__PURE__*/React.createElement(Field, {
    label: "\u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u099C\u09CB\u09A8",
    as: "select",
    options: ["ঢাকার ভিতরে — ৳৬০", "ঢাকার বাইরে — ৳১২০"],
    value: zone,
    onChange: e => setZone(e.target.value)
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      margin: "28px 0 10px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 23px 'Marcellus',serif"
    }
  }, "\u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F \u09AA\u09A6\u09CD\u09A7\u09A4\u09BF"), /*#__PURE__*/React.createElement(PaymentOption, {
    style: {
      marginTop: 10
    }
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "arrow-right",
    style: {
      marginTop: 24
    }
  }, "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u09A8\u09BF\u09B6\u09CD\u099A\u09BF\u09A4 \u0995\u09B0\u09C1\u09A8")), /*#__PURE__*/React.createElement(OrderSummary, {
    items: cart,
    subtotal: subtotal,
    deliveryFee: fee,
    benefits: [{
      icon: "truck",
      label: "ঢাকায় ২৪–৪৮ ঘণ্টায় ডেলিভারি"
    }, {
      icon: "shopping-bag",
      label: "পণ্য হাতে, তারপর পেমেন্ট"
    }]
  })));
}
function OrderSuccess({
  name,
  onBack
}) {
  return /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: "70vh"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: "min(560px,calc(100% - 30px))",
      margin: "12vh auto",
      padding: "55px 30px",
      background: "#fff",
      textAlign: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 58,
      height: 58,
      display: "grid",
      placeItems: "center",
      margin: "0 auto 22px",
      borderRadius: "50%",
      background: "var(--status-success-bg)",
      color: "var(--status-success)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 28
  })), /*#__PURE__*/React.createElement(Kicker, {
    style: {
      justifyContent: "center"
    }
  }, "\u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0997\u09CD\u09B0\u09B9\u09A3 \u0995\u09B0\u09BE \u09B9\u09AF\u09BC\u09C7\u099B\u09C7"), /*#__PURE__*/React.createElement("h1", {
    style: {
      margin: "8px 0",
      color: "var(--rayyan-maroon-deep)",
      font: "400 34px 'Marcellus',serif"
    }
  }, "\u09A7\u09A8\u09CD\u09AF\u09AC\u09BE\u09A6, ", name || "গ্রাহক", "!"), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 auto 25px",
      maxWidth: 400,
      color: "#756861",
      font: "400 14px/1.8 'Hind Siliguri',sans-serif"
    }
  }, "\u0986\u09AA\u09A8\u09BE\u09B0 \u0985\u09B0\u09CD\u09A1\u09BE\u09B0\u099F\u09BF RAYYAN \u099F\u09BF\u09AE\u09C7\u09B0 \u0995\u09BE\u099B\u09C7 \u09AA\u09CC\u0981\u099B\u09C7 \u0997\u09C7\u099B\u09C7\u0964 \u0996\u09C1\u09AC \u09B6\u09BF\u0997\u0997\u09BF\u09B0\u0987 \u0986\u09AE\u09B0\u09BE \u0986\u09AA\u09A8\u09BE\u09B0 \u09B8\u0999\u09CD\u0997\u09C7 \u09AF\u09CB\u0997\u09BE\u09AF\u09CB\u0997 \u0995\u09B0\u09AC\u0964"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    iconLeft: "arrow-left",
    onClick: onBack
  }, "\u09B6\u09AA\u09BF\u0982 \u099A\u09BE\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09A8")));
}
Object.assign(window, {
  CheckoutScreen,
  OrderSuccess
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/CheckoutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/HomeScreen.jsx
try { (() => {
const {
  Kicker,
  Button,
  SectionHeading,
  TrustItem,
  ProductCard,
  CategoryCard,
  OfferBanner,
  Icon
} = window.RAYYANDesignSystem_7f0581;
const {
  container
} = window.RAYYAN_DATA;
function Hero({
  slides
}) {
  const [i, setI] = React.useState(0);
  const [hover, setHover] = React.useState(false);
  React.useEffect(() => {
    if (hover) return;
    const t = setInterval(() => setI(c => (c + 1) % slides.length), 5000);
    return () => clearInterval(t);
  }, [hover, slides.length]);
  const s = slides[i];
  return /*#__PURE__*/React.createElement("section", {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    style: {
      position: "relative",
      background: s.tone,
      borderBottom: "1px solid #e7d5c1",
      minHeight: 520,
      isolation: "isolate",
      transition: "background .45s ease",
      overflow: "hidden"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      minHeight: 520,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    key: s.title,
    style: {
      padding: "60px 0",
      animation: "copyIn .55s ease both"
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    icon: "sparkles",
    tone: i === 2 ? "green" : "maroon",
    style: {
      marginBottom: 20
    }
  }, s.badge), /*#__PURE__*/React.createElement("h1", {
    style: {
      font: "400 clamp(42px,4.4vw,64px)/1.1 'Marcellus',serif",
      margin: "0 0 20px",
      color: "var(--rayyan-maroon-deep)",
      letterSpacing: "-.02em"
    }
  }, s.title), /*#__PURE__*/React.createElement("p", {
    style: {
      maxWidth: 440,
      color: "#665b58",
      font: "500 16px/1.8 'Hind Siliguri',sans-serif",
      margin: 0
    }
  }, s.subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 22,
      marginTop: 28
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "arrow-right"
  }, s.button), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    icon: "chevron-right"
  }, "\u0995\u09CD\u09AF\u09BE\u099F\u09BE\u0997\u09B0\u09BF \u09A6\u09C7\u0996\u09C1\u09A8")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12,
      marginTop: 45
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex"
    }
  }, [["স", "#5c7b68"], ["ম", "#d6a058"], ["আ", "#bb725f"], ["+", "var(--rayyan-maroon-deep)"]].map(([ch, bg], n) => /*#__PURE__*/React.createElement("span", {
    key: ch,
    style: {
      width: 29,
      height: 29,
      display: "grid",
      placeItems: "center",
      border: "2px solid " + s.tone,
      borderRadius: "50%",
      background: bg,
      color: "#fff",
      font: "700 10px 'Hind Siliguri',sans-serif",
      marginLeft: n ? -7 : 0
    }
  }, ch))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("strong", {
    style: {
      display: "block",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, "\u09EB,\u09E6\u09E6\u09E6+ \u09AA\u09B0\u09BF\u09AC\u09BE\u09B0"), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--ink-muted)",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, "\u09AA\u09CD\u09B0\u09A4\u09BF\u09A6\u09BF\u09A8 RAYYAN \u09AC\u09C7\u099B\u09C7 \u09A8\u09C7\u09AF\u09BC")))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      minHeight: 520,
      display: "grid",
      placeItems: "center"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      top: 95,
      left: 0,
      zIndex: 2,
      display: "flex",
      gap: 10,
      alignItems: "center",
      font: "600 12px 'Hind Siliguri',sans-serif",
      color: "var(--rayyan-maroon)"
    }
  }, /*#__PURE__*/React.createElement("span", null, "RAYYAN \u09A8\u09BF\u09B0\u09CD\u09AC\u09BE\u099A\u09A8"), /*#__PURE__*/React.createElement("b", {
    style: {
      background: "var(--rayyan-maroon)",
      color: "#fff",
      padding: "4px 6px",
      font: "600 11px 'Manrope',sans-serif"
    }
  }, "\u09E6", i + 1)), /*#__PURE__*/React.createElement("div", {
    key: s.image,
    style: {
      width: "min(460px,90%)",
      height: 380,
      borderRadius: "50% 50% 4px 4px",
      overflow: "hidden",
      transform: "rotate(3deg)",
      boxShadow: "20px 30px 60px #5c0e2630",
      animation: "imageIn .65s ease both"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: s.image,
    alt: "",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "saturate(1.12)"
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: "7%",
      bottom: 70,
      width: 92,
      height: 92,
      border: "1px solid var(--rayyan-gold)",
      borderRadius: "50%",
      transform: "rotate(-15deg)",
      display: "grid",
      placeItems: "center",
      alignContent: "center",
      color: "var(--rayyan-gold)",
      background: "#f2e8d9cc"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      letterSpacing: ".16em"
    }
  }, "PURE"), /*#__PURE__*/React.createElement("strong", {
    style: {
      font: "400 20px 'Hind Siliguri',sans-serif"
    }
  }, s.stamp), /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 8,
      letterSpacing: ".16em"
    }
  }, "EST. 2024")), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      color: "var(--rayyan-green)",
      fontSize: 40,
      right: "3%",
      top: 80
    }
  }, "\u2726"), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      color: "var(--rayyan-green)",
      fontSize: 40,
      left: "7%",
      bottom: 64,
      transform: "rotate(20deg)"
    }
  }, "\u273D"))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      left: "50%",
      bottom: 23,
      zIndex: 3,
      display: "flex",
      gap: 8,
      transform: "translateX(-50%)"
    }
  }, slides.map((item, n) => /*#__PURE__*/React.createElement("button", {
    key: item.title,
    onClick: () => setI(n),
    "aria-label": `${n + 1} নম্বর স্লাইড`,
    style: {
      width: 33,
      height: 7,
      padding: 0,
      border: 0,
      background: "transparent",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "block",
      height: 3,
      marginTop: 2,
      background: n === i ? "var(--rayyan-maroon)" : "#84153842"
    }
  })))));
}
function HomeScreen({
  products,
  search,
  onQuickView,
  onAdd,
  liked,
  onLike,
  onOpenProduct
}) {
  const [tab, setTab] = React.useState("সবগুলো");
  const data = window.RAYYAN_DATA;
  const shown = products.filter(p => `${p.name} ${p.bn} ${p.category}`.toLowerCase().includes((search || "").toLowerCase()));
  return /*#__PURE__*/React.createElement("main", null, /*#__PURE__*/React.createElement(Hero, {
    slides: data.heroSlides
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "#fff",
      borderBottom: "1px solid var(--line-200)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      minHeight: 91,
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 20,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement(TrustItem, {
    glyph: "\u2726",
    title: "\u09E7\u09E6\u09E6% \u0996\u09BE\u0981\u099F\u09BF",
    note: "\u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7\u09A4\u09BE\u09B0 \u09A8\u09BF\u09B6\u09CD\u099A\u09AF\u09BC\u09A4\u09BE"
  }), /*#__PURE__*/React.createElement(TrustItem, {
    glyph: "\u2667",
    title: "\u0995\u09CD\u09AF\u09BE\u09AE\u09BF\u0995\u09CD\u09AF\u09BE\u09B2 \u09AE\u09C1\u0995\u09CD\u09A4",
    note: "\u09A8\u09BF\u09B0\u09BE\u09AA\u09A6, \u09AA\u09CD\u09B0\u09BE\u0995\u09C3\u09A4\u09BF\u0995 \u0996\u09BE\u09AC\u09BE\u09B0"
  }), /*#__PURE__*/React.createElement(TrustItem, {
    glyph: "\u274B",
    title: "\u09AD\u09CD\u09AF\u09BE\u0995\u09C1\u09AF\u09BC\u09BE\u09AE \u09AA\u09CD\u09AF\u09BE\u0995\u09A1",
    note: "\u09AB\u09CD\u09B0\u09C7\u09B6 \u09A5\u09BE\u0995\u09C1\u0995 \u09AC\u09C7\u09B6\u09BF \u09B8\u09AE\u09AF\u09BC"
  }), /*#__PURE__*/React.createElement(TrustItem, {
    glyph: "\u09F3",
    title: "\u0995\u09CD\u09AF\u09BE\u09B6 \u0985\u09A8 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF",
    note: "\u09AA\u09A3\u09CD\u09AF \u09B9\u09BE\u09A4\u09C7, \u09A4\u09BE\u09B0\u09AA\u09B0 \u09AA\u09C7\u09AE\u09C7\u09A8\u09CD\u099F",
    divider: false
  }))), /*#__PURE__*/React.createElement("section", {
    style: {
      ...container,
      paddingTop: 85,
      paddingBottom: 85
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "\u0986\u09AA\u09A8\u09BE\u09B0 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0\u09C7\u09B0 \u099C\u09A8\u09CD\u09AF",
    title: "\u0995\u09C0 \u0996\u09C1\u0981\u099C\u099B\u09C7\u09A8 \u0986\u099C?",
    action: /*#__PURE__*/React.createElement(Button, {
      variant: "link",
      icon: "arrow-right"
    }, "\u09B8\u09AC \u09A6\u09C7\u0996\u09C1\u09A8")
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,minmax(0,1fr))",
      gap: 16
    }
  }, data.categories.map(c => /*#__PURE__*/React.createElement(CategoryCard, {
    key: c.label,
    label: c.label,
    count: c.count,
    image: c.image
  })))), /*#__PURE__*/React.createElement(OfferBanner, {
    eyebrow: "\u098F\u0987 \u09B8\u09AA\u09CD\u09A4\u09BE\u09B9\u09C7\u09B0 \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u0998\u09B0 \u0985\u09AB\u09BE\u09B0",
    title: "\u09A4\u09BF\u09A8\u099F\u09BF \u0995\u09AE\u09CD\u09AC\u09CB\u09A4\u09C7",
    highlight: "\u09E8\u09E6% \u099B\u09BE\u09A1\u09BC",
    timer: "\u09E6\u09E8 : \u09E7\u09EA : \u09E9\u09EC"
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      ...container,
      paddingTop: 85,
      paddingBottom: 105
    }
  }, /*#__PURE__*/React.createElement(SectionHeading, {
    kicker: "RAYYAN-\u098F\u09B0 \u09AA\u099B\u09A8\u09CD\u09A6",
    title: "\u098F\u0987 \u09B8\u09AA\u09CD\u09A4\u09BE\u09B9\u09C7\u09B0 \u09B8\u09C7\u09B0\u09BE \u09AA\u09A3\u09CD\u09AF",
    action: /*#__PURE__*/React.createElement("div", {
      style: {
        paddingBottom: 4
      }
    }, /*#__PURE__*/React.createElement(window.RayyanTabs, {
      items: ["সবগুলো", "মসলা", "রেডি-টু-কুক"],
      value: tab,
      onChange: setTab
    }))
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "repeat(4,1fr)",
      gap: 15
    }
  }, shown.map(p => /*#__PURE__*/React.createElement(ProductCard, {
    key: p.id,
    product: p,
    liked: liked.includes(p.id),
    onToggleWishlist: () => onLike(p.id),
    onAddToCart: () => onAdd(p),
    onQuickView: () => onQuickView(p),
    onClick: () => onOpenProduct(p),
    style: {
      cursor: "pointer"
    }
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      background: "var(--sand-400)",
      padding: "85px 0"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      alignItems: "center",
      gap: 90
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: "relative",
      height: 370
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=900&q=85",
    alt: "\u09AA\u09CD\u09B0\u09BE\u0995\u09C3\u09A4\u09BF\u0995 \u09AE\u09B8\u09B2\u09BE",
    style: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      filter: "saturate(.8)"
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: "absolute",
      right: -27,
      bottom: 27,
      background: "var(--rayyan-maroon-deep)",
      color: "#fff",
      padding: 17,
      display: "flex",
      gap: 12,
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-haldi)",
      font: "400 23px 'Marcellus',serif"
    }
  }, "\u09E6\u09E7"), /*#__PURE__*/React.createElement("span", {
    style: {
      font: "400 11px/1.5 'Hind Siliguri',sans-serif"
    }
  }, "\u0989\u09CE\u09B8 \u09A5\u09C7\u0995\u09C7", /*#__PURE__*/React.createElement("br", null), "\u0986\u09AA\u09A8\u09BE\u09B0 \u0998\u09B0\u09C7"))), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "\u0995\u09C7\u09A8 RAYYAN?"), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "var(--rayyan-maroon-deep)",
      font: "400 43px/1.18 'Marcellus',serif",
      margin: "8px 0 18px"
    }
  }, "\u09B8\u09CD\u09AC\u09BE\u09A6\u09C7\u09B0 \u09B6\u09C1\u09B0\u09C1 \u09B9\u09CB\u0995", /*#__PURE__*/React.createElement("br", null), /*#__PURE__*/React.createElement("em", {
    style: {
      color: "var(--rayyan-maroon)",
      fontStyle: "normal"
    }
  }, "\u09AC\u09BF\u09B6\u09C1\u09A6\u09CD\u09A7\u09A4\u09BE \u09A5\u09C7\u0995\u09C7")), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "#675d57",
      font: "400 15px/1.8 'Hind Siliguri',sans-serif",
      maxWidth: 440
    }
  }, "\u0986\u09AE\u09B0\u09BE \u09AC\u09BF\u09B6\u09CD\u09AC\u09BE\u09B8 \u0995\u09B0\u09BF, \u09AD\u09BE\u09B2\u09CB \u09B0\u09BE\u09A8\u09CD\u09A8\u09BE\u09B0 \u099C\u09A8\u09CD\u09AF \u09AD\u09BE\u09B2\u09CB \u0989\u09AA\u0995\u09B0\u09A3\u0987 \u09AF\u09A5\u09C7\u09B7\u09CD\u099F\u0964 \u09A4\u09BE\u0987 \u09AA\u09CD\u09B0\u09A4\u09BF\u099F\u09BF \u09AE\u09B8\u09B2\u09BE \u0993 \u09B8\u09AC\u099C\u09BF \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u0987 \u09B8\u09CD\u09AC\u099A\u09CD\u099B \u0989\u09CE\u09B8 \u09A5\u09C7\u0995\u09C7, \u09B0\u09BE\u0996\u09BF \u09A4\u09BE\u09B0 \u09B8\u09CD\u09AC\u09BE\u09AD\u09BE\u09AC\u09BF\u0995 \u0997\u09A8\u09CD\u09A7, \u09B0\u0999 \u098F\u09AC\u0982 \u09AA\u09C1\u09B7\u09CD\u099F\u09BF\u0964"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 20,
      margin: "22px 0 27px",
      flexWrap: "wrap"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    style: {
      color: "var(--rayyan-green)"
    }
  }), " \u0995\u09C3\u09B7\u0995\u09C7\u09B0 \u0995\u09BE\u099B \u09A5\u09C7\u0995\u09C7 \u09B8\u09B0\u09BE\u09B8\u09B0\u09BF"), /*#__PURE__*/React.createElement("span", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 15,
    style: {
      color: "var(--rayyan-green)"
    }
  }), " \u099B\u09CB\u099F \u09AC\u09CD\u09AF\u09BE\u099A\u09C7 \u09A4\u09BE\u099C\u09BE \u09AA\u09CD\u09AF\u09BE\u0995\u09BF\u0982")), /*#__PURE__*/React.createElement(Button, {
    variant: "link",
    icon: "arrow-right"
  }, "RAYYAN \u09B8\u09AE\u09CD\u09AA\u09B0\u09CD\u0995\u09C7 \u099C\u09BE\u09A8\u09C1\u09A8")))));
}
window.RayyanTabs = window.RAYYANDesignSystem_7f0581.Tabs;
Object.assign(window, {
  HomeScreen,
  Hero
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/HomeScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/Overlays.jsx
try { (() => {
const {
  Icon,
  Button,
  Badge,
  Rating,
  VariantPicker,
  QuantityStepper,
  CartLineItem,
  FreeShippingMeter,
  Kicker,
  ProductGallery,
  IconButton
} = window.RAYYANDesignSystem_7f0581;
const {
  bn
} = window.RAYYAN_DATA;
function CartDrawer({
  cart,
  total,
  onClose,
  onRemove,
  onCheckout
}) {
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 30,
      background: "var(--scrim-modal)"
    }
  }, /*#__PURE__*/React.createElement("aside", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "min(420px,100%)",
      height: "100%",
      background: "var(--rayyan-ivory)",
      marginLeft: "auto",
      display: "flex",
      flexDirection: "column",
      boxShadow: "-15px 0 45px #24151b2e"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "30px 25px 20px",
      display: "flex",
      justifyContent: "space-between",
      borderBottom: "1px solid var(--line-200)"
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement(Kicker, null, "\u0986\u09AA\u09A8\u09BE\u09B0 \u09B6\u09AA\u09BF\u0982 \u09AC\u09CD\u09AF\u09BE\u0997"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontSize: 28,
      margin: "4px 0 0",
      color: "var(--rayyan-maroon-deep)",
      font: "400 28px 'Marcellus',serif"
    }
  }, "\u0995\u09BE\u09B0\u09CD\u099F ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: "var(--ink-muted)",
      font: "400 14px 'Manrope',sans-serif"
    }
  }, "(", cart.length, ")"))), /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    tone: "white",
    onClick: onClose,
    label: "\u0995\u09BE\u09B0\u09CD\u099F \u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09C1\u09A8"
  })), /*#__PURE__*/React.createElement(FreeShippingMeter, {
    total: total
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      overflow: "auto",
      padding: "5px 25px",
      flex: 1
    }
  }, cart.map((item, i) => /*#__PURE__*/React.createElement(CartLineItem, {
    key: i,
    item: item,
    onRemove: () => onRemove(i)
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "20px 25px 25px",
      borderTop: "1px solid var(--line-200)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      justifyContent: "space-between",
      alignItems: "center"
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      font: "500 13px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B8\u09BE\u09AC\u099F\u09CB\u099F\u09BE\u09B2"), /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 20,
      color: "var(--rayyan-maroon)",
      fontFamily: "'Manrope',sans-serif"
    }
  }, "\u09F3", bn(total))), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-muted)",
      font: "400 11px 'Hind Siliguri',sans-serif",
      margin: "4px 0 16px"
    }
  }, "\u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u099A\u09BE\u09B0\u09CD\u099C \u099A\u09C7\u0995\u0986\u0989\u099F\u09C7 \u09AF\u09C1\u0995\u09CD\u09A4 \u09B9\u09AC\u09C7"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "arrow-right",
    onClick: onCheckout
  }, "\u099A\u09C7\u0995\u0986\u0989\u099F\u09C7 \u09AF\u09BE\u09A8"))));
}
function QuickView({
  product,
  onClose,
  onAdd
}) {
  const [qty, setQty] = React.useState(1);
  const [variant, setVariant] = React.useState("২৫০ গ্রাম");
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return /*#__PURE__*/React.createElement("div", {
    onClick: onClose,
    style: {
      position: "fixed",
      inset: 0,
      zIndex: 30,
      background: "var(--scrim-modal)",
      display: "grid",
      placeItems: "center",
      padding: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    onClick: e => e.stopPropagation(),
    style: {
      width: "min(840px,100%)",
      maxHeight: "calc(100vh - 40px)",
      overflow: "auto",
      background: "var(--rayyan-ivory)",
      position: "relative",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      boxShadow: "0 20px 60px #24151b40"
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    icon: "x",
    tone: "white",
    onClick: onClose,
    label: "\u09AC\u09A8\u09CD\u09A7 \u0995\u09B0\u09C1\u09A8",
    style: {
      position: "absolute",
      right: 15,
      top: 15,
      zIndex: 2
    }
  }), /*#__PURE__*/React.createElement(ProductGallery, {
    productName: product.bn,
    frontImage: product.image,
    detailImage: product.image2,
    height: 420
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: "46px 34px 30px"
    }
  }, /*#__PURE__*/React.createElement(Rating, {
    value: product.rating,
    reviews: product.reviews
  }), /*#__PURE__*/React.createElement("h2", {
    style: {
      color: "var(--rayyan-maroon-deep)",
      font: "400 31px/1.2 'Marcellus',serif",
      margin: "13px 0 3px"
    }
  }, product.bn), /*#__PURE__*/React.createElement("p", {
    style: {
      color: "var(--ink-muted)",
      font: "400 12px 'Manrope',sans-serif",
      margin: "0 0 30px"
    }
  }, product.name), /*#__PURE__*/React.createElement("div", {
    style: {
      borderTop: "1px solid var(--line-200)",
      paddingTop: 19
    }
  }, /*#__PURE__*/React.createElement(VariantPicker, {
    label: "\u0993\u099C\u09A8 \u09AC\u09C7\u099B\u09C7 \u09A8\u09BF\u09A8",
    meta: `SKU: ${product.sku}`,
    options: ["১০০ গ্রাম", "২৫০ গ্রাম", "৫০০ গ্রাম"],
    value: variant,
    onChange: setVariant
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 21
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      fontSize: 26,
      color: "var(--rayyan-maroon)",
      fontFamily: "'Manrope',sans-serif"
    }
  }, "\u09F3", bn(product.price)), /*#__PURE__*/React.createElement("del", {
    style: {
      color: "#999",
      font: "400 12px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(product.oldPrice)), /*#__PURE__*/React.createElement(Badge, {
    tone: "save"
  }, "-", bn(discount), "% OFF")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 22
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty,
    width: 112,
    height: 47
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    icon: "shopping-bag",
    onClick: () => onAdd(product, qty),
    style: {
      flex: 1
    }
  }, "\u0995\u09BE\u09B0\u09CD\u099F\u09C7 \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      font: "400 11px 'Hind Siliguri',sans-serif",
      color: "var(--ink-muted)",
      marginTop: 20
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 15
  }), " \u09A2\u09BE\u0995\u09BE\u09AF\u09BC \u09E8\u09EA\u2013\u09EA\u09EE \u0998\u09A3\u09CD\u099F\u09BE\u09AF\u09BC \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF ", /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto",
      color: "var(--rayyan-green)",
      fontWeight: 700
    }
  }, "\u0987\u09A8 \u09B8\u09CD\u099F\u0995")))));
}
Object.assign(window, {
  CartDrawer,
  QuickView
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/Overlays.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/ProductScreen.jsx
try { (() => {
const {
  Logo,
  Icon,
  Button,
  Badge,
  Rating,
  VariantPicker,
  QuantityStepper,
  Tabs,
  ProductGallery,
  Kicker
} = window.RAYYANDesignSystem_7f0581;
const {
  container,
  bn
} = window.RAYYAN_DATA;
const detail = {
  description: "পাহাড়ি অঞ্চলের কৃষকদের কাছ থেকে বাছাই করা হলুদ দিয়ে তৈরি এই মসলা। ধীরে শুকিয়ে, ছোট ব্যাচে গুঁড়া করা হয় যাতে প্রাকৃতিক রঙ, ঘ্রাণ ও স্বাদ অটুট থাকে।",
  nutrition: "প্রতি ১০০ গ্রামে: শক্তি ৩১২ কিলোক্যালরি, প্রোটিন ৯.৭ গ্রাম, ফাইবার ২২.৭ গ্রাম। কোনো কৃত্রিম রঙ, সংরক্ষণকারী বা মিশ্রণ নেই।",
  storage: "শুকনো ও ঠান্ডা জায়গায়, সরাসরি রোদ থেকে দূরে রাখুন। ব্যবহারের পর প্যাকেটের মুখ ভালোভাবে বন্ধ করুন এবং ৬ মাসের মধ্যে ব্যবহার করুন।"
};
function ProductScreen({
  product,
  onBack,
  onAdd,
  onCheckout,
  cartCount
}) {
  const [qty, setQty] = React.useState(1);
  const [variant, setVariant] = React.useState("২৫০ গ্রাম");
  const [tab, setTab] = React.useState("description");
  const discount = Math.round((1 - product.price / product.oldPrice) * 100);
  return /*#__PURE__*/React.createElement("main", {
    style: {
      minHeight: "100vh",
      background: "var(--rayyan-ivory)"
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: {
      borderBottom: "1px solid var(--line-200)",
      background: "var(--sand-50)"
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      height: 78,
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onBack();
    },
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      color: "var(--rayyan-maroon)",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "arrow-left",
    size: 17
  }), " \u09B6\u09AA\u09BF\u0982 \u099A\u09BE\u09B2\u09BF\u09AF\u09BC\u09C7 \u09AF\u09BE\u09A8"), /*#__PURE__*/React.createElement(Logo, null), /*#__PURE__*/React.createElement("button", {
    onClick: onCheckout,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 7,
      border: "1px solid var(--rayyan-maroon-deep)",
      background: "var(--rayyan-maroon-deep)",
      color: "#fff",
      padding: "10px 13px",
      font: "600 12px 'Hind Siliguri',sans-serif",
      cursor: "pointer"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "shopping-bag",
    size: 18
  }), " \u0995\u09BE\u09B0\u09CD\u099F ", /*#__PURE__*/React.createElement(Badge, {
    tone: "count",
    style: {
      width: 19,
      height: 19,
      font: "700 10px 'Manrope',sans-serif"
    }
  }, cartCount)))), /*#__PURE__*/React.createElement("div", {
    style: {
      ...container,
      display: "flex",
      alignItems: "center",
      gap: 6,
      paddingTop: 27,
      color: "var(--ink-muted)",
      font: "400 11px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("a", {
    href: "#",
    onClick: e => {
      e.preventDefault();
      onBack();
    }
  }, "\u09B9\u09CB\u09AE"), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  }), /*#__PURE__*/React.createElement("a", {
    href: "#"
  }, product.category), /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-right",
    size: 14
  }), /*#__PURE__*/React.createElement("span", null, product.bn)), /*#__PURE__*/React.createElement("section", {
    style: {
      ...container,
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 68,
      paddingTop: 28,
      paddingBottom: 90
    }
  }, /*#__PURE__*/React.createElement(ProductGallery, {
    productName: product.bn,
    frontImage: product.image,
    detailImage: product.image2
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      paddingTop: 25
    }
  }, /*#__PURE__*/React.createElement(Kicker, {
    tone: "gold",
    style: {
      font: "800 10px 'Manrope',sans-serif",
      letterSpacing: ".14em"
    }
  }, "RAYYAN GOURMET \xB7 ", product.category), /*#__PURE__*/React.createElement("h1", {
    style: {
      maxWidth: 520,
      margin: "13px 0 3px",
      color: "var(--rayyan-maroon-deep)",
      font: "400 clamp(32px,3.4vw,49px)/1.2 'Marcellus',serif"
    }
  }, product.bn), /*#__PURE__*/React.createElement("p", {
    style: {
      margin: "0 0 20px",
      color: "var(--ink-muted)",
      font: "400 12px 'Manrope',sans-serif"
    }
  }, product.name), /*#__PURE__*/React.createElement(Rating, {
    value: product.rating,
    reviews: product.reviews,
    stars: 5,
    inStock: true,
    style: {
      paddingBottom: 22
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("strong", {
    style: {
      color: "var(--rayyan-maroon)",
      font: "800 32px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(product.price)), /*#__PURE__*/React.createElement("del", {
    style: {
      color: "#9f958e",
      font: "400 13px 'Manrope',sans-serif"
    }
  }, "\u09F3", bn(product.oldPrice)), /*#__PURE__*/React.createElement(Badge, {
    tone: "offer"
  }, "-", bn(discount), "% OFF")), /*#__PURE__*/React.createElement("div", {
    style: {
      height: 1,
      margin: "24px 0",
      background: "var(--line-200)"
    }
  }), /*#__PURE__*/React.createElement(VariantPicker, {
    label: "\u0993\u099C\u09A8 / \u09B8\u09BE\u0987\u099C",
    meta: `SKU: ${product.sku}`,
    options: ["১০০ গ্রাম", "২৫০ গ্রাম", "৫০০ গ্রাম কম্বো"],
    value: variant,
    onChange: setVariant
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      gap: 10,
      marginTop: 24
    }
  }, /*#__PURE__*/React.createElement(QuantityStepper, {
    value: qty,
    onChange: setQty
  }), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    iconLeft: "shopping-bag",
    onClick: () => onAdd(product, qty),
    style: {
      flex: 1
    }
  }, "\u0995\u09BE\u09B0\u09CD\u099F-\u098F \u09AF\u09CB\u0997 \u0995\u09B0\u09C1\u09A8")), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    block: true,
    icon: "arrow-right",
    onClick: onCheckout,
    style: {
      height: 49,
      marginTop: 10
    }
  }, "\u09B8\u09B0\u09BE\u09B8\u09B0\u09BF \u0985\u09B0\u09CD\u09A1\u09BE\u09B0 \u0995\u09B0\u09C1\u09A8"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 10,
      marginTop: 23,
      color: "var(--rayyan-green)"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "truck",
    size: 18
  }), /*#__PURE__*/React.createElement("span", null, /*#__PURE__*/React.createElement("b", {
    style: {
      display: "block",
      font: "600 12px 'Hind Siliguri',sans-serif"
    }
  }, "\u09A2\u09BE\u0995\u09BE\u09AF\u09BC \u09E8\u09EA\u2013\u09EA\u09EE \u0998\u09A3\u09CD\u099F\u09BE\u09AF\u09BC \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF"), /*#__PURE__*/React.createElement("small", {
    style: {
      display: "block",
      color: "var(--ink-muted)",
      font: "400 12px 'Hind Siliguri',sans-serif"
    }
  }, "\u09B8\u09BE\u09B0\u09BE \u09A6\u09C7\u09B6\u09C7 \u0995\u09CD\u09AF\u09BE\u09B6 \u0985\u09A8 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF \u09B8\u09C1\u09AC\u09BF\u09A7\u09BE"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: 10,
      marginTop: 23,
      padding: "16px 0",
      borderTop: "1px solid var(--line-200)",
      borderBottom: "1px solid var(--line-200)"
    }
  }, ["১০০% অর্গানিক", "ভ্যাকুয়াম প্যাকড", "ক্যাশ অন ডেলিভারি", "২৪–৪৮ ঘণ্টা"].map(t => /*#__PURE__*/React.createElement("span", {
    key: t,
    style: {
      display: "flex",
      alignItems: "center",
      gap: 6,
      color: "#635850",
      font: "600 11px 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "check",
    size: 14,
    style: {
      color: "var(--rayyan-green)"
    }
  }), " ", t))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 26
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    underline: true,
    items: [{
      id: "description",
      label: "বিবরণ"
    }, {
      id: "nutrition",
      label: "পুষ্টি ও উপাদান"
    }, {
      id: "storage",
      label: "সংরক্ষণ পদ্ধতি"
    }],
    value: tab,
    onChange: setTab
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: 83,
      paddingTop: 13,
      color: "#675d57",
      font: "400 13px/1.8 'Hind Siliguri',sans-serif"
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      margin: 0
    }
  }, detail[tab]))))));
}
Object.assign(window, {
  ProductScreen
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/ProductScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/StorefrontApp.jsx
try { (() => {
const {
  TopBar,
  SiteHeader,
  SiteFooter
} = window.RAYYANDesignSystem_7f0581;
const DATA = window.RAYYAN_DATA;
function StorefrontApp() {
  const [route, setRoute] = React.useState("home");
  const [product, setProduct] = React.useState(DATA.products[0]);
  const [cart, setCart] = React.useState([DATA.products[0]]);
  const [liked, setLiked] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [cartOpen, setCartOpen] = React.useState(false);
  const [quick, setQuick] = React.useState(null);
  const total = cart.reduce((s, i) => s + i.price, 0);
  const add = (p, qty = 1) => {
    setCart(c => [...c, ...Array.from({
      length: qty
    }, () => p)]);
    setQuick(null);
    setCartOpen(true);
  };
  const go = r => {
    setRoute(r);
    window.scrollTo(0, 0);
  };
  return /*#__PURE__*/React.createElement("div", null, route === "home" ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(TopBar, {
    note: /*#__PURE__*/React.createElement(React.Fragment, null, "\u09B8\u09BE\u09B0\u09BE \u09A6\u09C7\u09B6\u09C7 \u09A1\u09C7\u09B2\u09BF\u09AD\u09BE\u09B0\u09BF ", /*#__PURE__*/React.createElement("b", {
      style: {
        color: "#e9bf69"
      }
    }, "\u09F3\u09EC\u09E6 \u09A5\u09C7\u0995\u09C7"))
  }), /*#__PURE__*/React.createElement(SiteHeader, {
    nav: [{
      label: "সব পণ্য"
    }, {
      label: "ক্যাটাগরি",
      caret: true
    }, {
      label: "আমাদের গল্প"
    }],
    search: search,
    onSearch: setSearch,
    cartCount: cart.length,
    wishlistCount: liked.length,
    onCart: () => setCartOpen(true)
  }), /*#__PURE__*/React.createElement(window.HomeScreen, {
    products: DATA.products,
    search: search,
    liked: liked,
    onLike: id => setLiked(c => c.includes(id) ? c.filter(x => x !== id) : [...c, id]),
    onAdd: add,
    onQuickView: setQuick,
    onOpenProduct: p => {
      setProduct(p);
      go("product");
    }
  }), /*#__PURE__*/React.createElement(SiteFooter, null)) : null, route === "product" ? /*#__PURE__*/React.createElement(window.ProductScreen, {
    product: product,
    cartCount: cart.length,
    onBack: () => go("home"),
    onAdd: add,
    onCheckout: () => go("checkout")
  }) : null, route === "checkout" ? /*#__PURE__*/React.createElement(window.CheckoutScreen, {
    cart: cart,
    subtotal: total,
    onBack: () => go("home"),
    onPlace: () => {
      go("success");
      setCart([]);
    }
  }) : null, route === "success" ? /*#__PURE__*/React.createElement(window.OrderSuccess, {
    name: "\u09B8\u09BE\u09A6\u09BF\u09AF\u09BC\u09BE",
    onBack: () => go("home")
  }) : null, cartOpen ? /*#__PURE__*/React.createElement(window.CartDrawer, {
    cart: cart,
    total: total,
    onClose: () => setCartOpen(false),
    onRemove: i => setCart(c => c.filter((_, n) => n !== i)),
    onCheckout: () => {
      setCartOpen(false);
      go("checkout");
    }
  }) : null, quick ? /*#__PURE__*/React.createElement(window.QuickView, {
    product: quick,
    onClose: () => setQuick(null),
    onAdd: add
  }) : null);
}
ReactDOM.createRoot(document.getElementById("root")).render(/*#__PURE__*/React.createElement(StorefrontApp, null));
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/StorefrontApp.jsx", error: String((e && e.message) || e) }); }

// ui_kits/storefront/data.js
try { (() => {
window.RAYYAN_DATA = {
  products: [{
    id: 1,
    slug: "premium-turmeric-powder",
    sku: "RY-001",
    name: "Premium Turmeric Powder",
    bn: "প্রিমিয়াম হলুদ গুঁড়া",
    price: 185,
    oldPrice: 220,
    stock: 48,
    rating: 4.9,
    reviews: 128,
    category: "গুঁড়া মসলা",
    tag: "বেস্টসেলার",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1000&q=85",
    image2: "https://images.unsplash.com/photo-1599909533730-f9d6a5d4e5f9?auto=format&fit=crop&w=1000&q=85"
  }, {
    id: 2,
    slug: "ready-to-cook-mixed-veggies",
    sku: "RY-002",
    name: "Ready-to-Cook Mixed Veggies",
    bn: "রেডি-টু-কুক মিক্সড সবজি",
    price: 295,
    oldPrice: 360,
    stock: 22,
    rating: 4.8,
    reviews: 86,
    category: "রেডি-টু-কুক",
    tag: "ফ্রেশ",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1000&q=85",
    image2: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=1000&q=85"
  }, {
    id: 3,
    slug: "royal-garam-masala",
    sku: "RY-003",
    name: "Royal Garam Masala",
    bn: "রয়্যাল গরম মসলা",
    price: 240,
    oldPrice: 290,
    stock: 31,
    rating: 4.9,
    reviews: 74,
    category: "গোটা মসলা",
    tag: "নতুন",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85",
    image2: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=1000&q=85"
  }, {
    id: 4,
    slug: "golden-pantry-combo",
    sku: "RY-004",
    name: "Golden Pantry Combo",
    bn: "গোল্ডেন প্যান্ট্রি কম্বো",
    price: 699,
    oldPrice: 890,
    stock: 15,
    rating: 5,
    reviews: 52,
    category: "প্রিমিয়াম কম্বো",
    tag: "-২১% অফ",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1000&q=85",
    image2: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1000&q=85"
  }],
  categories: [{
    label: "গুঁড়া মসলা",
    count: "২৪টি পণ্য",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=800&q=85"
  }, {
    label: "গোটা মসলা",
    count: "১৮টি পণ্য",
    image: "https://images.unsplash.com/photo-1505253716362-afaea1d3d1af?auto=format&fit=crop&w=800&q=85"
  }, {
    label: "রেডি-টু-কুক",
    count: "১২টি পণ্য",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=85"
  }, {
    label: "প্রিমিয়াম কম্বো",
    count: "৮টি পণ্য",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=800&q=85"
  }],
  heroSlides: [{
    title: "শতভাগ খাঁটি গুঁড়া মসলা",
    subtitle: "ভেজালমুক্ত স্বাদ ও ঘ্রাণে রান্নায় আনুন পরিপূর্ণ তৃপ্তি",
    badge: "ফার্ম ফ্রেশ",
    button: "মসলা কালেকশন দেখুন",
    tone: "var(--tone-powder)",
    stamp: "খাঁটি",
    image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f7?auto=format&fit=crop&w=1100&q=85"
  }, {
    title: "বাছাইকৃত প্রিমিয়াম গোটা মসলা",
    subtitle: "আসল এলাচ, দারুচিনি ও লবঙ্গের তীব্র সুবাস",
    badge: "হাতে বাছাইকৃত",
    button: "গোটা মসলা দেখুন",
    tone: "var(--tone-whole)",
    stamp: "খাঁটি",
    image: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&w=1100&q=85"
  }, {
    title: "ধোয়া ও কাটা রেডি-টু-কুক সবজি",
    subtitle: "ভ্যাকুয়াম প্যাকড ফ্রেশ কাটিং, রান্নার সময় বাঁচান অর্ধেক",
    badge: "ভ্যাকুয়াম সিল্ড",
    button: "সবজি অর্ডার করুন",
    tone: "var(--tone-fresh)",
    stamp: "FRESH",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=1100&q=85"
  }, {
    title: "মাসিক বাজার স্পেশাল কম্বো প্যাক",
    subtitle: "প্রয়োজনীয় মসলা ও রান্নার প্যাকেজে সর্বোচ্চ ২৫% পর্যন্ত সাশ্রয়",
    badge: "স্পেশাল অফার",
    button: "কম্বো প্যাক দেখুন",
    tone: "var(--tone-combo)",
    stamp: "খাঁটি",
    image: "https://images.unsplash.com/photo-1532336414038-cf19250c5757?auto=format&fit=crop&w=1100&q=85"
  }],
  bn: n => Number(n).toLocaleString("bn-BD"),
  container: {
    width: "min(1180px, calc(100% - 40px))",
    marginInline: "auto"
  }
};
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/storefront/data.js", error: String((e && e.message) || e) }); }

__ds_ns.AdminNav = __ds_scope.AdminNav;

__ds_ns.EmptyState = __ds_scope.EmptyState;

__ds_ns.InventoryRow = __ds_scope.InventoryRow;

__ds_ns.MetricCard = __ds_scope.MetricCard;

__ds_ns.OrderRow = __ds_scope.OrderRow;

__ds_ns.CartLineItem = __ds_scope.CartLineItem;

__ds_ns.CategoryCard = __ds_scope.CategoryCard;

__ds_ns.FreeShippingMeter = __ds_scope.FreeShippingMeter;

__ds_ns.OfferBanner = __ds_scope.OfferBanner;

__ds_ns.OrderSummary = __ds_scope.OrderSummary;

__ds_ns.ProductCard = __ds_scope.ProductCard;

__ds_ns.ProductGallery = __ds_scope.ProductGallery;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Icon = __ds_scope.Icon;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Kicker = __ds_scope.Kicker;

__ds_ns.QuantityStepper = __ds_scope.QuantityStepper;

__ds_ns.Rating = __ds_scope.Rating;

__ds_ns.SectionHeading = __ds_scope.SectionHeading;

__ds_ns.Tabs = __ds_scope.Tabs;

__ds_ns.TrustItem = __ds_scope.TrustItem;

__ds_ns.VariantPicker = __ds_scope.VariantPicker;

__ds_ns.Field = __ds_scope.Field;

__ds_ns.PaymentOption = __ds_scope.PaymentOption;

__ds_ns.Logo = __ds_scope.Logo;

__ds_ns.SiteFooter = __ds_scope.SiteFooter;

__ds_ns.SiteHeader = __ds_scope.SiteHeader;

__ds_ns.TopBar = __ds_scope.TopBar;

})();

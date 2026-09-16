/**
 * Catalog records can outlive the blob asset they point at — a re-uploaded or pruned blob
 * leaves the old URL returning 404/403, which renders as an empty beige box. Swapping in
 * this inline placeholder on the error event keeps the card readable without a network hop.
 */
export const PRODUCT_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" role="img" aria-label="Image unavailable">' +
      '<rect width="400" height="400" fill="#f4ece3"/>' +
      '<g fill="none" stroke="#b89786" stroke-width="9" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="M132 156h136a16 16 0 0 1 16 16v96a16 16 0 0 1-16 16H132a16 16 0 0 1-16-16v-96a16 16 0 0 1 16-16Z"/>' +
      '<path d="m116 246 40-36 34 30 38-34 56 48"/>' +
      '<circle cx="168" cy="190" r="12"/>' +
      "</g>" +
      '<text x="200" y="322" text-anchor="middle" font-family="Manrope,system-ui,sans-serif" font-size="20" fill="#b89786">RAYYAN</text>' +
      "</svg>",
  );

/**
 * `onError` handler for catalog `<img>` tags. Guards against a loop if the placeholder
 * itself ever fails, and drops srcSet so the browser cannot re-pick the broken candidate.
 */
export function handleProductImageError(event: React.SyntheticEvent<HTMLImageElement>) {
  const img = event.currentTarget;
  if (img.dataset.fallbackApplied === "true") return;
  img.dataset.fallbackApplied = "true";
  img.srcset = "";
  img.src = PRODUCT_IMAGE_PLACEHOLDER;
}

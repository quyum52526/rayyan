import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";
import { LanguageProvider } from "@/context/LanguageContext";
import { getProductsSafe } from "@/lib/product-data";

/**
 * The catalog lives in Vercel Blob and changes whenever the admin saves a product, so the
 * shell is rendered per request instead of being frozen into the build output. It sits on
 * the layout rather than on a page because every route reads the same catalog, and because
 * `page.tsx` is a Client Component — route segment config only applies to server segments.
 */
export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "RAYYAN | খাঁটি মসলা ও রেডি-টু-কুক গ্রোসারি",
  description: "খাঁটি মসলা, অর্গানিক প্যান্ট্রি স্ট্যাপল ও রেডি-টু-কুক সবজি।",
};

export default async function RootLayout({ children }: LayoutProps<"/">) {
  // Seeds the store so the very first paint already carries the real category counts and
  // product art, instead of the empty catalog the client fetch used to start from.
  const initialProducts = await getProductsSafe();

  return (
    <html lang="bn">
      <body>
        <LanguageProvider>
          <StoreProvider initialProducts={initialProducts}>{children}</StoreProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}

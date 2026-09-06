import type { Metadata } from "next";
import "./globals.css";
import { StoreProvider } from "@/lib/store";

export const metadata: Metadata = {
  title: "RAYYAN | খাঁটি মসলা ও রেডি-টু-কুক গ্রোসারি",
  description: "খাঁটি মসলা, অর্গানিক প্যান্ট্রি স্ট্যাপল ও রেডি-টু-কুক সবজি।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="bn"><body><StoreProvider>{children}</StoreProvider></body></html>;
}

import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "RAYYAN | খাঁটি মসলা ও রেডি-টু-কুক গ্রোসারি",
  description: "খাঁটি মসলা, অর্গানিক প্যান্ট্রি স্ট্যাপল ও রেডি-টু-কুক সবজি।",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return <html lang="bn"><body>{children}</body></html>;
}

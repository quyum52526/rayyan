import type { Metadata } from "next";
import AllProductsRoute from "@/components/AllProductsRoute";

export const metadata: Metadata = { title: "সব পণ্য | RAYYAN" };

export default function AllProductsPage() {
  return <AllProductsRoute />;
}

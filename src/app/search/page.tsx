import type { Metadata } from "next";
import SearchRoute from "@/components/SearchRoute";

export const metadata: Metadata = { title: "খোঁজার ফলাফল | RAYYAN" };

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string | string[] }> }) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] ?? "" : q ?? "";
  // Keyed on the query so navigating between /search?q= URLs resets the search box.
  return <SearchRoute key={query} query={query} />;
}

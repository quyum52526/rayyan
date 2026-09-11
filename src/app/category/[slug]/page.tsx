import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CategoryRoute from "@/components/CategoryRoute";
import { getCategory } from "@/lib/categories";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategory(slug);
  return category ? { title: `${category.bn} | RAYYAN`, description: category.subtitleBn } : { title: "ক্যাটাগরি | RAYYAN" };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return <CategoryRoute slug={category.slug} />;
}

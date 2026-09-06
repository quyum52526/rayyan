import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/product-data";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    return NextResponse.json(await getProducts(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Catalog unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const product = await request.json() as Product;
    if (!product.id || !product.slug || !product.name || !product.bn || !product.image) {
      return NextResponse.json({ error: "Invalid product." }, { status: 400 });
    }
    const products = await getProducts();
    const nextProducts = products.some((item) => item.id === product.id)
      ? products.map((item) => item.id === product.id ? product : item)
      : [...products, product];
    return NextResponse.json(await saveProducts(nextProducts), { status: 201 });
  } catch {
    return NextResponse.json({ error: "Catalog could not be saved." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    const nextProducts = (await getProducts()).filter((product) => product.id !== id);
    return NextResponse.json(await saveProducts(nextProducts));
  } catch {
    return NextResponse.json({ error: "Catalog could not be saved." }, { status: 503 });
  }
}
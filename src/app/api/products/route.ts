import { NextResponse } from "next/server";
import { getProducts, saveProducts } from "@/lib/product-data";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";

function isDataImage(value: string) {
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value);
}

async function uploadDataImage(value: string, productId: number, field: "image" | "image2") {
  if (!process.env.BLOB_READ_WRITE_TOKEN || !isDataImage(value)) return value;
  const match = value.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (!match) return value;
  const [, contentType, encoded] = match;
  const extension = contentType.split("/")[1].replace("jpeg", "jpg");
  const { put } = await import("@vercel/blob");
  const blob = await put(`catalog/images/${productId}-${field}.${extension}`, Buffer.from(encoded, "base64"), { access: "public", addRandomSuffix: false, contentType });
  return blob.url;
}

export async function GET() {
  try {
    return NextResponse.json(await getProducts(), { headers: { "Cache-Control": "no-store" } });
  } catch {
    return NextResponse.json({ error: "Catalog unavailable." }, { status: 503 });
  }
}

export async function POST(request: Request) {
  try {
    const submittedProduct = await request.json() as Product;
    const product: Product = {
      ...submittedProduct,
      image: await uploadDataImage(submittedProduct.image, submittedProduct.id, "image"),
      image2: submittedProduct.image2 ? await uploadDataImage(submittedProduct.image2, submittedProduct.id, "image2") : submittedProduct.image2,
    };
    if (!product.id || !product.slug || !product.name || !product.bn || !product.image) {
      return NextResponse.json({ error: "Invalid product." }, { status: 400 });
    }
    const products = await getProducts();
    const nextProducts = products.some((item) => item.id === product.id)
      ? products.map((item) => item.id === product.id ? product : item)
      : [...products, product];
    await saveProducts(nextProducts);
    return NextResponse.json({ success: true, product }, { status: 201 });
  } catch {
    return NextResponse.json({ error: "Catalog could not be saved." }, { status: 503 });
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id)) return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    const nextProducts = (await getProducts()).filter((product) => product.id !== id);
    await saveProducts(nextProducts);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Catalog could not be saved." }, { status: 503 });
  }
}
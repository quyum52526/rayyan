import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getProducts, saveProducts } from "@/lib/product-data";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

function isDataImage(value: string | undefined | null): boolean {
  if (!value) return false;
  return /^data:image\/[a-z0-9.+-]+;base64,/i.test(value);
}

async function uploadDataImage(value: string | undefined, productId: number, field: "image" | "image2"): Promise<string> {
  if (!value) return "";
  if (!process.env.BLOB_READ_WRITE_TOKEN || !isDataImage(value)) return value;

  try {
    const match = value.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
    if (!match) return value;

    const [, contentType, encoded] = match;
    const extension = contentType.split("/")[1]?.replace("jpeg", "jpg") || "jpg";
    const { put } = await import("@vercel/blob");

    const blob = await put(
      `catalog/images/${productId}-${field}-${randomUUID()}.${extension}`,
      Buffer.from(encoded, "base64"),
      {
        access: "public",
        addRandomSuffix: false,
        contentType,
        token: process.env.BLOB_READ_WRITE_TOKEN,
      }
    );

    return blob.url;
  } catch (err) {
    console.error(`Failed to upload ${field} for product ${productId}:`, err);
    // ইমেজ আপলোড ফেইল করলেও পুরো রিকোয়েস্ট যেন 503 ক্র্যাশ না করে, আগের ভ্যালু রিটার্ন করবে
    return value;
  }
}

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("Blob read error:", error);
    return NextResponse.json({ error: "Catalog unavailable." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const submittedProduct = (await request.json()) as Product;

    if (!submittedProduct?.id || !submittedProduct?.name) {
      return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
    }

    // ইমেজ আপলোড প্রসেসিং
    const uploadedImage = await uploadDataImage(submittedProduct.image, submittedProduct.id, "image");
    const uploadedImage2 = submittedProduct.image2
      ? await uploadDataImage(submittedProduct.image2, submittedProduct.id, "image2")
      : submittedProduct.image2;

    const product: Product = {
      ...submittedProduct,
      image: uploadedImage || submittedProduct.image,
      image2: uploadedImage2,
    };

    const products = await getProducts();
    const updatedProducts = products.some((item) => item.id === product.id)
      ? products.map((item) => (item.id === product.id ? product : item))
      : [...products, product];

    await saveProducts(updatedProducts);

    return NextResponse.json({ success: true, products: updatedProducts }, { status: 200 });
  } catch (error: any) {
    console.error("Blob write error details:", error?.message || error);
    return NextResponse.json(
      { error: error?.message || "Catalog could not be saved." },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const id = Number(new URL(request.url).searchParams.get("id"));
    if (!Number.isInteger(id)) {
      return NextResponse.json({ error: "Invalid product id." }, { status: 400 });
    }

    const currentProducts = await getProducts();
    const nextProducts = currentProducts.filter((product) => product.id !== id);

    await saveProducts(nextProducts);
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Blob delete error:", error);
    return NextResponse.json({ error: "Catalog could not be saved." }, { status: 500 });
  }
}
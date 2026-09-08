import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { getProducts, readCatalog, saveProducts } from "@/lib/product-data";
import type { Product } from "@/lib/products";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

type ErrorDetails = {
  name: string;
  message: string;
  code: string | null;
  stack: string | null;
  cause?: ErrorDetails;
};

function describeError(error: unknown, depth = 0): ErrorDetails {
  if (error instanceof Error) {
    const details: ErrorDetails = {
      name: error.name,
      message: error.message,
      code: (error as { code?: unknown }).code != null ? String((error as { code?: unknown }).code) : null,
      stack: error.stack ?? null,
    };
    if (depth < 3 && error.cause != null) {
      details.cause = describeError(error.cause, depth + 1);
    }
    return details;
  }

  return {
    name: typeof error,
    message: typeof error === "string" ? error : JSON.stringify(error),
    code: null,
    stack: null,
  };
}

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
    console.error(
      `[products.POST] image upload failed field=${field} productId=${productId}`,
      JSON.stringify(describeError(err))
    );
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
    console.error("[products.GET] read failed", JSON.stringify(describeError(error)));
    return NextResponse.json({ error: "Catalog unavailable.", details: describeError(error) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let stage = "parse-body";

  try {
    const submittedProduct = (await request.json()) as Product;

    if (!submittedProduct?.id || !submittedProduct?.name) {
      return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
    }

    stage = "upload-images";
    const uploadedImage = await uploadDataImage(submittedProduct.image, submittedProduct.id, "image");
    const uploadedImage2 = submittedProduct.image2
      ? await uploadDataImage(submittedProduct.image2, submittedProduct.id, "image2")
      : submittedProduct.image2;

    const product: Product = {
      ...submittedProduct,
      image: uploadedImage || submittedProduct.image,
      image2: uploadedImage2,
    };

    stage = "read-catalog";
    const { products, source: baseSource } = await readCatalog();

    stage = "merge";
    const updatedProducts = products.some((item) => item.id === product.id)
      ? products.map((item) => (item.id === product.id ? product : item))
      : [...products, product];

    stage = "save-catalog";
    await saveProducts(updatedProducts, { baseSource });

    return NextResponse.json({ success: true, products: updatedProducts }, { status: 200 });
  } catch (error) {
    const details = describeError(error);
    console.error(
      `[products.POST] failed stage=${stage} hasBlobToken=${Boolean(process.env.BLOB_READ_WRITE_TOKEN)}`,
      JSON.stringify(details)
    );
    console.error(error);

    return NextResponse.json(
      {
        error: details.message || "Catalog could not be saved.",
        stage,
        hasBlobToken: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
        details,
      },
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

    const { products: currentProducts, source: baseSource } = await readCatalog();
    const nextProducts = currentProducts.filter((product) => product.id !== id);

    await saveProducts(nextProducts, { baseSource });
    return NextResponse.json({ success: true });
  } catch (error) {
    const details = describeError(error);
    console.error("[products.DELETE] failed", JSON.stringify(details));
    return NextResponse.json({ error: details.message || "Catalog could not be saved.", details }, { status: 500 });
  }
}

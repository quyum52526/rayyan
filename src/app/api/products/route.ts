import { NextResponse } from "next/server";
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

export async function GET() {
  try {
    const products = await getProducts();
    return NextResponse.json(products, {
      headers: { "Cache-Control": "no-store, max-age=0" },
    });
  } catch (error) {
    console.error("[products.GET] read failed", JSON.stringify(describeError(error)));
    return NextResponse.json({ error: "Catalog unavailable." }, { status: 500 });
  }
}

export async function POST(request: Request) {
  let stage = "parse-body";

  try {
    const submittedProduct = (await request.json()) as Product;

    if (!submittedProduct?.id || !submittedProduct?.name) {
      return NextResponse.json({ error: "Invalid product data." }, { status: 400 });
    }

    // Images are stored exactly as submitted: a path under /images/products/ for catalog
    // art, or an inline data URI from the admin form. Nothing is uploaded to Vercel Blob.
    const product: Product = submittedProduct;

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
    console.error(`[products.POST] failed stage=${stage}`, JSON.stringify(details));
    console.error(error);

    return NextResponse.json(
      { error: details.message || "Catalog could not be saved.", stage },
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
    return NextResponse.json({ success: true, products: nextProducts });
  } catch (error) {
    const details = describeError(error);
    console.error("[products.DELETE] failed", JSON.stringify(details));
    return NextResponse.json({ error: details.message || "Catalog could not be saved." }, { status: 500 });
  }
}

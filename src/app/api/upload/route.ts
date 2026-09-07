import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

function parseImageData(value: string) {
  const match = value.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (!match) return null;
  return { contentType: match[1], data: Buffer.from(match[2], "base64") };
}

export async function POST(request: Request) {
  try {
    const { data, filename = "image" } = await request.json() as { data?: string; filename?: string };
    const parsed = data ? parseImageData(data) : null;
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    if (!parsed || !token) return NextResponse.json({ error: "Image upload is not configured or data is invalid." }, { status: 400 });

    const extension = parsed.contentType.split("/")[1].replace("jpeg", "jpg");
    const { put } = await import("@vercel/blob");
    const blob = await put(`catalog/images/${filename}-${randomUUID()}.${extension}`, parsed.data, {
      access: "public",
      addRandomSuffix: false,
      contentType: parsed.contentType,
      token,
    });
    return NextResponse.json({ success: true, url: blob.url }, { status: 201 });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 503 });
  }
}

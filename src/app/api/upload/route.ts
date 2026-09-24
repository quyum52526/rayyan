import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { promises as fs } from "node:fs";
import path from "node:path";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/** Admin uploads land here, beside the rest of the catalog art served from public/. */
const UPLOAD_DIR = path.join(process.cwd(), "public/images/products/uploads");
const UPLOAD_URL_PREFIX = "/images/products/uploads";

function parseImageData(value: string) {
  const match = value.match(/^data:(image\/[a-z0-9.+-]+);base64,(.+)$/i);
  if (!match) return null;
  return { contentType: match[1], data: Buffer.from(match[2], "base64") };
}

/** Keeps a caller-supplied filename from escaping the upload directory. */
function safeName(filename: string) {
  return path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "-").slice(0, 60) || "image";
}

/**
 * Writes the image into public/ and returns its site-relative path. Vercel Blob is not
 * used: the store is over quota and returns 403, so every catalog asset stays local.
 * Note this needs a writable filesystem, so it works in local dev, not on Vercel.
 */
export async function POST(request: Request) {
  try {
    const { data, filename = "image" } = await request.json() as { data?: string; filename?: string };
    const parsed = data ? parseImageData(data) : null;
    if (!parsed) return NextResponse.json({ error: "Image data is invalid." }, { status: 400 });

    const extension = parsed.contentType.split("/")[1].replace("jpeg", "jpg");
    const name = `${safeName(filename)}-${randomUUID()}.${extension}`;

    await fs.mkdir(UPLOAD_DIR, { recursive: true });
    await fs.writeFile(path.join(UPLOAD_DIR, name), parsed.data);

    return NextResponse.json({ success: true, url: `${UPLOAD_URL_PREFIX}/${name}` }, { status: 201 });
  } catch (error) {
    console.error("Image upload error:", error);
    return NextResponse.json({ error: "Image upload failed." }, { status: 503 });
  }
}

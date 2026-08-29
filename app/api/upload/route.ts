import { NextResponse } from "next/server";
import { uploadMediaToCloudinary } from "@/lib/cloudinary";

export const dynamic = "force-dynamic";

// Vercel Serverless Function payload limit is 4.5MB
const MAX_UPLOAD_BYTES = 4.5 * 1024 * 1024;

export async function POST(request: Request) {
  try {
    const contentType = request.headers.get("content-type") || "";

    let fileBase64 = "";
    let mediaType: "image" | "video" | "auto" = "auto";

    if (contentType.includes("multipart/form-data")) {
      const formData = await request.formData();
      const file = formData.get("file") as File | null;
      const typeHint = formData.get("mediaType") as string | null;

      if (!file) {
        return NextResponse.json(
          { success: false, error: "No media file provided in form data" },
          { status: 400 }
        );
      }

      if (file.size > MAX_UPLOAD_BYTES) {
        return NextResponse.json(
          { success: false, error: "File exceeds serverless upload limit. Please use a compressed file or direct URL." },
          { status: 413 }
        );
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      const mimeType = file.type || "image/jpeg";
      fileBase64 = `data:${mimeType};base64,${buffer.toString("base64")}`;

      if (typeHint === "video" || mimeType.startsWith("video/")) {
        mediaType = "video";
      } else if (typeHint === "image" || mimeType.startsWith("image/")) {
        mediaType = "image";
      }
    } else {
      const body = await request.json();
      fileBase64 = body.image || body.video || body.file || body.url;
      if (body.mediaType) {
        mediaType = body.mediaType;
      }
    }

    if (!fileBase64) {
      return NextResponse.json(
        { success: false, error: "Please provide a media file, URL, or base64 data" },
        { status: 400 }
      );
    }

    const { url, publicId, resourceType } = await uploadMediaToCloudinary(
      fileBase64,
      "sassy_furniture",
      mediaType
    );

    return NextResponse.json({
      success: true,
      url,
      publicId,
      mediaType: resourceType,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Media upload failed";
    console.error("Cloudinary upload route error:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

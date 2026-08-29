import { v2 as cloudinary, UploadApiResponse } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export async function uploadMediaToCloudinary(
  fileBase64OrUrl: string,
  folder = "sassy_furniture",
  mediaType: "image" | "video" | "auto" = "auto"
): Promise<{ url: string; publicId: string; resourceType: "image" | "video" }> {
  // Check if cloudinary is configured
  if (
    !process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name" ||
    !process.env.CLOUDINARY_API_KEY ||
    process.env.CLOUDINARY_API_KEY === "your_api_key"
  ) {
    console.warn("Cloudinary credentials not fully configured. Using fallback handling.");
    // If the input is already a data URI or local path, return it directly so testing works out of the box
    const determinedType =
      mediaType === "video" || fileBase64OrUrl.includes("video/") || fileBase64OrUrl.match(/\.(mp4|webm|mov|ogg)$/i)
        ? "video"
        : "image";
    return {
      url: fileBase64OrUrl,
      publicId: "local_" + Date.now(),
      resourceType: determinedType,
    };
  }

  try {
    const resource_type = mediaType === "video" ? "video" : mediaType === "image" ? "image" : "auto";
    const uploadOptions: Record<string, unknown> = {
      folder,
      resource_type,
    };

    if (resource_type === "image") {
      uploadOptions.transformation = [
        { quality: "auto:best" },
        { fetch_format: "auto" },
      ];
    }

    const result: UploadApiResponse = await cloudinary.uploader.upload(
      fileBase64OrUrl,
      uploadOptions
    );

    return {
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type === "video" ? "video" : "image",
    };
  } catch (error) {
    console.error("Cloudinary media upload error:", error);
    throw new Error("Failed to upload media to Cloudinary");
  }
}

export const uploadImageToCloudinary = (fileBase64OrUrl: string, folder = "sassy_furniture") =>
  uploadMediaToCloudinary(fileBase64OrUrl, folder, "image");

export async function deleteMediaFromCloudinary(
  publicId: string,
  resourceType: "image" | "video" = "image"
): Promise<boolean> {
  if (
    !publicId ||
    publicId.startsWith("local_") ||
    !process.env.CLOUDINARY_CLOUD_NAME ||
    process.env.CLOUDINARY_CLOUD_NAME === "your_cloud_name"
  ) {
    return true;
  }

  try {
    const res = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return res.result === "ok";
  } catch (error) {
    console.error("Cloudinary delete error:", error);
    return false;
  }
}

export const deleteImageFromCloudinary = (publicId: string) =>
  deleteMediaFromCloudinary(publicId, "image");

export default cloudinary;

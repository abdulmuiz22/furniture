import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { deleteMediaFromCloudinary } from "@/lib/cloudinary";

import mongoose from "mongoose";
import { BEST_SELLERS, getProductByIdOrSlug } from "@/data/furnitureData";

export const dynamic = "force-dynamic";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const decodedId = decodeURIComponent(id);

  try {
    await connectToDatabase();

    let product = null;

    if (mongoose.isValidObjectId(decodedId)) {
      product = await Product.findById(decodedId);
    }

    if (!product) {
      // Try searching by name or custom id
      product = await Product.findOne({
        $or: [
          { _id: decodedId },
          { name: { $regex: `^${decodedId.replace(/-/g, " ")}$`, $options: "i" } },
          { name: { $regex: decodedId.replace(/-/g, " "), $options: "i" } },
        ],
      });
    }

    if (!product) {
      // Check fallback data
      const fallback = getProductByIdOrSlug(decodedId, BEST_SELLERS);
      if (fallback) {
        return NextResponse.json({ success: true, data: fallback, isFallback: true });
      }
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    console.warn("Error fetching product from DB, checking fallback:", error);
    const fallback = getProductByIdOrSlug(decodedId, BEST_SELLERS);
    if (fallback) {
      return NextResponse.json({ success: true, data: fallback, isFallback: true });
    }
    return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const body = await request.json();
    const updatedProduct = await Product.findByIdAndUpdate(id, body, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedProduct });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to update product";
    console.error("Error updating product:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    await connectToDatabase();

    const product = await Product.findById(id);
    if (!product) {
      return NextResponse.json({ success: false, error: "Product not found" }, { status: 404 });
    }

    // Delete image from Cloudinary if stored there
    if (product.cloudinaryPublicId) {
      await deleteMediaFromCloudinary(product.cloudinaryPublicId, "image");
    }

    // Delete video from Cloudinary if stored there
    if (product.videoCloudinaryPublicId) {
      await deleteMediaFromCloudinary(product.videoCloudinaryPublicId, "video");
    }

    await Product.findByIdAndDelete(id);

    return NextResponse.json({ success: true, message: "Product deleted successfully" });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to delete product";
    console.error("Error deleting product:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

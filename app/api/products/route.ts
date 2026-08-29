import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import { BEST_SELLERS, Product as ProductType } from "@/data/furnitureData";

export const dynamic = "force-dynamic";

const inMemoryProducts: ProductType[] = [...BEST_SELLERS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const search = searchParams.get("search");
  const featured = searchParams.get("featured");

  try {
    await connectToDatabase();

    const filter: Record<string, unknown> = {};

    if (category && category !== "All" && category !== "all") {
      filter.category = new RegExp(category, "i");
    }

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { material: { $regex: search, $options: "i" } },
        { category: { $regex: search, $options: "i" } },
      ];
    }

    if (featured === "true") {
      filter.featured = true;
    }

    let products = await Product.find(filter).sort({ createdAt: -1 });

    // Auto-seed if database collection is completely empty
    if (products.length === 0 && !category && !search) {
      const count = await Product.countDocuments();
      if (count === 0) {
        const seedItems = BEST_SELLERS.map((item) => ({
          name: item.name,
          category: item.category,
          image: item.image,
          description: item.description,
          dimensions: item.dimensions || "Custom sizing available",
          material: item.material || "Premium Handcrafted Material",
          featured: true,
          inStock: true,
          rating: item.rating || 4.8,
          reviewsCount: item.reviewsCount || 15,
        }));
        await Product.insertMany(seedItems);
        products = await Product.find().sort({ createdAt: -1 });
      }
    }

    return NextResponse.json({ success: true, count: products.length, data: products });
  } catch (error) {
    console.warn("MongoDB products GET error (using fallback cache):", error);

    let fallback = [...inMemoryProducts];
    if (category && category !== "All" && category !== "all") {
      fallback = fallback.filter(
        (p) => p.category.toLowerCase() === category.toLowerCase()
      );
    }
    if (search) {
      fallback = fallback.filter(
        (p) =>
          p.name.toLowerCase().includes(search.toLowerCase()) ||
          p.description.toLowerCase().includes(search.toLowerCase()) ||
          (p.material && p.material.toLowerCase().includes(search.toLowerCase()))
      );
    }

    return NextResponse.json({
      success: true,
      count: fallback.length,
      data: fallback,
      isFallback: true,
    });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      category,
      image,
      cloudinaryPublicId,
      video,
      videoCloudinaryPublicId,
      mediaType,
      description,
      dimensions,
      material,
      featured,
      inStock,
    } = body;

    if (!name || !category || (!image && !video) || !description) {
      return NextResponse.json(
        { success: false, error: "Please provide all required fields: name, category, image/video, description." },
        { status: 400 }
      );
    }

    const productPayload = {
      name,
      category,
      image: image || "",
      cloudinaryPublicId: cloudinaryPublicId || "",
      video: video || "",
      videoCloudinaryPublicId: videoCloudinaryPublicId || "",
      mediaType: mediaType || (video && !image ? "video" : "image"),
      description,
      dimensions: dimensions || "Custom dimensions upon request",
      material: material || "Premium Hardwood & Fine Upholstery",
      featured: Boolean(featured),
      inStock: inStock !== undefined ? Boolean(inStock) : true,
      rating: 4.9,
      reviewsCount: 1,
    };

    try {
      await connectToDatabase();
      const newProduct = await Product.create(productPayload);
      return NextResponse.json({ success: true, data: newProduct }, { status: 201 });
    } catch (dbError) {
      console.warn("MongoDB insert failed, using memory store:", dbError);
      const fallbackItem: ProductType = {
        id: "prod_" + Date.now(),
        _id: "prod_" + Date.now(),
        ...productPayload,
      };
      inMemoryProducts.unshift(fallbackItem);

      return NextResponse.json({ success: true, data: fallbackItem, isFallback: true }, { status: 201 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create product";
    console.error("Error creating product:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

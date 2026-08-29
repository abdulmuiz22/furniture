import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import Product from "@/models/Product";
import Inquiry from "@/models/Inquiry";
import MediaAsset from "@/models/MediaAsset";
import { BEST_SELLERS, INITIAL_MEDIA_ASSETS } from "@/data/furnitureData";

export const dynamic = "force-dynamic";

export async function POST() {
  try {
    await connectToDatabase();

    // Clear existing
    await Product.deleteMany({});
    await Inquiry.deleteMany({});
    await MediaAsset.deleteMany({});

    // Seed products
    const seedProducts = BEST_SELLERS.map((item) => ({
      name: item.name,
      category: item.category,
      image: item.image,
      cloudinaryPublicId: "",
      video: "",
      videoCloudinaryPublicId: "",
      mediaType: "image" as const,
      description: item.description,
      dimensions: item.dimensions || "Custom dimensions available",
      material: item.material || "Natural Solid Oak & Textured Fabric",
      featured: true,
      inStock: true,
      rating: item.rating || 4.8,
      reviewsCount: item.reviewsCount || 15,
      tags: [item.category, "Bespoke", "Luxury"],
    }));

    const insertedProducts = await Product.insertMany(seedProducts);

    // Seed all initial media assets (all present pictures & videos)
    const seedMedia = INITIAL_MEDIA_ASSETS.map((m) => ({
      title: m.title,
      section: m.section,
      mediaType: m.mediaType,
      url: m.url,
      cloudinaryPublicId: m.cloudinaryPublicId || "",
      caption: m.caption || "",
      linkUrl: m.linkUrl || "",
      categoryRef: m.categoryRef || "",
      productId: m.productId || "",
      order: m.order || 0,
      isActive: true,
    }));

    const insertedMedia = await MediaAsset.insertMany(seedMedia);

    // Seed sample inquiries
    const sampleInquiries = [
      {
        name: "Amaka Adeleke",
        email: "amaka.adeleke@example.com",
        phone: "+234 803 456 7890",
        productName: "Luna Fabric Sofa",
        message: "Hello, I am interested in customizing the Luna Fabric Sofa in a dark emerald velvet finish. What is the delivery timeframe for orders from your Ila Orangun workshop?",
        status: "new",
      },
      {
        name: "Babajide Williams",
        email: "b.williams@archdesign.ng",
        phone: "+234 802 111 2233",
        productName: "Milano Dining Table",
        message: "We are outfitting a private residence and would like a consultation for the Milano Dining Table with 8 matching chairs.",
        status: "contacted",
      },
    ];

    await Inquiry.insertMany(sampleInquiries);

    return NextResponse.json({
      success: true,
      message: `Database successfully seeded with ${insertedProducts.length} luxury products, ${insertedMedia.length} media pictures & videos, and sample inquiries.`,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to seed database";
    console.error("Seed route error:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

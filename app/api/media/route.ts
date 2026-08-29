import { NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";
import MediaAsset from "@/models/MediaAsset";
import { INITIAL_MEDIA_ASSETS, MediaAsset as MediaAssetType } from "@/data/furnitureData";

export const dynamic = "force-dynamic";

let inMemoryMedia: MediaAssetType[] = [...INITIAL_MEDIA_ASSETS];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const section = searchParams.get("section");
  const mediaType = searchParams.get("mediaType");
  const search = searchParams.get("search");

  try {
    await connectToDatabase();

    const filter: Record<string, unknown> = {};

    if (section && section !== "All" && section !== "all") {
      filter.section = section;
    }

    if (mediaType && mediaType !== "All" && mediaType !== "all") {
      filter.mediaType = mediaType;
    }

    if (search) {
      filter.$or = [
        { title: { $regex: search, $options: "i" } },
        { caption: { $regex: search, $options: "i" } },
        { section: { $regex: search, $options: "i" } },
        { categoryRef: { $regex: search, $options: "i" } },
      ];
    }

    let media = await MediaAsset.find(filter).sort({ order: 1, createdAt: -1 });

    // Auto-seed if database collection is completely empty
    if (media.length === 0 && !section && !search && !mediaType) {
      const count = await MediaAsset.countDocuments();
      if (count === 0) {
        const seedItems = INITIAL_MEDIA_ASSETS.map((item) => ({
          title: item.title,
          section: item.section,
          mediaType: item.mediaType,
          url: item.url,
          cloudinaryPublicId: item.cloudinaryPublicId || "",
          caption: item.caption || "",
          linkUrl: item.linkUrl || "",
          categoryRef: item.categoryRef || "",
          productId: item.productId || "",
          order: item.order || 0,
          isActive: true,
        }));
        await MediaAsset.insertMany(seedItems);
        media = await MediaAsset.find().sort({ order: 1, createdAt: -1 });
      }
    }

    return NextResponse.json({ success: true, count: media.length, data: media });
  } catch (error) {
    console.warn("MongoDB media GET error (using fallback cache):", error);

    let fallback = [...inMemoryMedia];
    if (section && section !== "All" && section !== "all") {
      fallback = fallback.filter(
        (m) => m.section.toLowerCase() === section.toLowerCase()
      );
    }
    if (mediaType && mediaType !== "All" && mediaType !== "all") {
      fallback = fallback.filter(
        (m) => m.mediaType.toLowerCase() === mediaType.toLowerCase()
      );
    }
    if (search) {
      fallback = fallback.filter(
        (m) =>
          m.title.toLowerCase().includes(search.toLowerCase()) ||
          (m.caption && m.caption.toLowerCase().includes(search.toLowerCase())) ||
          m.section.toLowerCase().includes(search.toLowerCase()) ||
          (m.categoryRef && m.categoryRef.toLowerCase().includes(search.toLowerCase()))
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
      title,
      section,
      mediaType,
      url,
      cloudinaryPublicId,
      caption,
      linkUrl,
      categoryRef,
      productId,
      order,
    } = body;

    if (!title || !url) {
      return NextResponse.json(
        { success: false, error: "Please provide both title and media URL / file." },
        { status: 400 }
      );
    }

    const payload = {
      title,
      section: section || "general",
      mediaType: mediaType || (url.includes("video/") || url.match(/\.(mp4|webm|mov|ogg)$/i) ? "video" : "image"),
      url,
      cloudinaryPublicId: cloudinaryPublicId || "",
      caption: caption || "",
      linkUrl: linkUrl || "",
      categoryRef: categoryRef || "",
      productId: productId || "",
      order: Number(order) || inMemoryMedia.length + 1,
      isActive: true,
    };

    try {
      await connectToDatabase();
      const newMedia = await MediaAsset.create(payload);
      return NextResponse.json({ success: true, data: newMedia }, { status: 201 });
    } catch (dbError) {
      console.warn("MongoDB insert media failed, using memory store:", dbError);
      const fallbackItem: MediaAssetType = {
        id: "media_" + Date.now(),
        _id: "media_" + Date.now(),
        ...payload,
      };
      inMemoryMedia.unshift(fallbackItem);

      return NextResponse.json({ success: true, data: fallbackItem, isFallback: true }, { status: 201 });
    }
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Failed to create media item";
    console.error("Error creating media asset:", error);
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

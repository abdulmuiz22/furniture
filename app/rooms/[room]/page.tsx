"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import {
  CATEGORIES,
  getCategoryFromSlug,
  getRoomSlug,
  Product,
} from "@/data/furnitureData";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Heart,
  Star,
  Video,
  ArrowLeft,
  Compass,
} from "lucide-react";

export default function RoomCategoryPage({
  params,
}: {
  params: Promise<{ room: string }>;
}) {
  const { room } = use(params);
  const categoryName = getCategoryFromSlug(room);
  const categoryMeta = CATEGORIES.find((c) => c.name.toLowerCase() === categoryName.toLowerCase()) || {
    id: room,
    name: categoryName,
    itemCount: "Curated Pieces",
    image: "/images/cat-living-room.jpg",
    description: "Handcrafted furniture curated specifically for comfortable and stylish spaces.",
  };

  const { products, isLoading, isInWishlist, toggleWishlist } = useShop();

  const roomProducts = products.filter(
    (p) => p.category.toLowerCase() === categoryName.toLowerCase()
  );

  const otherRooms = CATEGORIES.filter(
    (c) => c.name.toLowerCase() !== categoryName.toLowerCase()
  );

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Room Hero Banner */}
        <section className="relative w-full bg-[#18181b] text-white py-14 sm:py-20 overflow-hidden">
          {/* Background image overlay */}
          <div className="absolute inset-0 opacity-40">
            <Image
              src={categoryMeta.image}
              alt={categoryMeta.name}
              fill
              priority
              sizes="100vw"
              className="object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/80 to-transparent" />
          </div>

          <div className="container-custom relative z-10">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/rooms" className="hover:text-white transition-colors">
                Rooms
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-white">{categoryMeta.name}</span>
            </nav>

            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#d49753] mb-2">
                <Compass size={13} />
                <span>Room Suite Collection</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-3">
                {categoryMeta.name}
              </h1>
              <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed mb-6">
                {categoryMeta.description}
              </p>
              <div className="flex items-center gap-3 text-xs text-[#a1a1aa]">
                <span className="px-3 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-white font-medium">
                  {categoryMeta.itemCount}
                </span>
                <span className="text-[#d49753] font-semibold">•</span>
                <span>Kiln-Dried Hardwood Framing</span>
                <span className="text-[#d49753] font-semibold">•</span>
                <span>Custom Spatial Sizing</span>
              </div>
            </div>
          </div>
        </section>

        {/* Room Furniture Grid */}
        <section className="container-custom pt-10 sm:pt-14">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#f0ebe3]">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1c1917] tracking-tight">
                {categoryMeta.name} Pieces
              </h2>
              <p className="text-xs text-[#78716c] mt-0.5">
                Showing {roomProducts.length} handcrafted {roomProducts.length === 1 ? "design" : "designs"}
              </p>
            </div>

            <Link
              href="/shop"
              className="text-xs font-semibold text-[#b37e44] hover:underline flex items-center gap-1"
            >
              <span>View Full Catalog</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-3 border border-[#ede7df] h-80 flex flex-col justify-between">
                  <div className="w-full aspect-square bg-[#f0ebe3] rounded-xl" />
                  <div className="h-4 bg-[#f0ebe3] rounded w-3/4 mt-3" />
                  <div className="h-3 bg-[#f0ebe3] rounded w-1/2 mt-2" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && roomProducts.length === 0 && (
            <div className="text-center py-16 bg-white rounded-3xl border border-[#ede7df] p-8 max-w-md mx-auto">
              <h3 className="text-lg font-serif font-bold text-[#1c1917] mb-2">
                Custom Orders in Progress
              </h3>
              <p className="text-xs text-[#78716c] mb-6">
                Our workshop is continually crafting new {categoryMeta.name} pieces. Inquire directly for bespoke commissions.
              </p>
              <Link href="/contact" className="btn-primary text-xs py-2.5 px-5 rounded-xl">
                Request Custom Piece
              </Link>
            </div>
          )}

          {/* Products Grid */}
          {!isLoading && roomProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {roomProducts.map((product: Product) => {
                const productId = product._id || product.id || product.name;
                const isWishlisted = isInWishlist(productId);
                const hasVideo = Boolean(product.video);

                return (
                  <Link
                    key={productId}
                    href={`/products/${encodeURIComponent(productId)}`}
                    className="group flex flex-col justify-between bg-white rounded-2xl p-3 border border-[#ede7df] hover:border-[#dfd7cc] hover:shadow-lg transition-all duration-300 relative cursor-pointer"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fbf9f6] flex items-center justify-center">
                      <Image
                        src={product.image || "/images/hero.jpg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {hasVideo && (
                        <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
                          <Video size={10} /> Video
                        </span>
                      )}

                      <button
                        type="button"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          toggleWishlist(productId);
                        }}
                        aria-label="Add to wishlist"
                        className={`absolute top-2 right-2 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                          isWishlisted
                            ? "bg-rose-50 text-rose-600 shadow-2xs"
                            : "bg-white/90 backdrop-blur-2xs text-[#71717a] hover:text-rose-600 hover:bg-white"
                        }`}
                      >
                        <Heart
                          size={13}
                          className={isWishlisted ? "fill-rose-600 text-rose-600" : ""}
                        />
                      </button>
                    </div>

                    <div className="mt-3 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1c1917] leading-snug group-hover:text-[#b37e44] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#78716c] line-clamp-1 mt-0.5">
                          {product.material || product.description}
                        </p>
                      </div>

                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f4efe8] text-xs">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-amber-500 text-amber-500" />
                          <span className="font-semibold text-[#27272a]">
                            {product.rating || 4.8}
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#b37e44] group-hover:underline flex items-center gap-0.5">
                          <span>View Piece</span>
                          <ArrowRight size={11} />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Other Rooms Pill Navigation */}
        <section className="container-custom mt-20 pt-12 border-t border-[#ede5da]">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b37e44] block mb-1">
              Explore More Spaces
            </span>
            <h3 className="text-2xl font-serif text-[#1c1917]">Other Room Suites</h3>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
            {otherRooms.map((roomItem) => (
              <Link
                key={roomItem.id}
                href={`/rooms/${getRoomSlug(roomItem.name)}`}
                className="group p-3.5 rounded-2xl bg-white border border-[#ede7df] hover:border-[#b37e44] hover:shadow-md transition-all text-left"
              >
                <div className="relative aspect-[4/3] w-full rounded-xl overflow-hidden mb-2.5 bg-[#faf7f2]">
                  <Image
                    src={roomItem.image}
                    alt={roomItem.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                </div>
                <h4 className="text-xs font-bold text-[#1c1917] group-hover:text-[#b37e44] transition-colors">
                  {roomItem.name}
                </h4>
                <p className="text-[10px] text-[#8c827a]">{roomItem.itemCount}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

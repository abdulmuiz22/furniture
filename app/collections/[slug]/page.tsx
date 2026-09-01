"use client";

import React, { use } from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import { COLLECTIONS, Product, BEST_SELLERS } from "@/data/furnitureData";
import {
  ChevronRight,
  ArrowRight,
  Sparkles,
  Heart,
  Star,
  Video,
  CheckCircle2,
  Phone,
  MessageSquare,
} from "lucide-react";

export default function CollectionDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const collection = COLLECTIONS.find((c) => c.slug === slug) || COLLECTIONS[0];
  const { products, isInWishlist, toggleWishlist } = useShop();

  // Curate collection items
  const collectionProducts = products.filter((p) => {
    if (collection.slug === "minimalist-essentials") {
      return (
        p.category === "Living Room" ||
        p.category === "Bedroom" ||
        p.name.includes("Luna") ||
        p.name.includes("Celeste") ||
        p.name.includes("Aurora")
      );
    }
    if (collection.slug === "signature-suites") {
      return (
        p.category === "Living Room" ||
        p.category === "Dining Room" ||
        p.name.includes("Milano") ||
        p.name.includes("Luna")
      );
    }
    if (collection.slug === "best-sellers") {
      return Boolean(p.featured);
    }
    if (collection.slug === "artisan-woodcraft") {
      return (
        p.material?.toLowerCase().includes("oak") ||
        p.material?.toLowerCase().includes("teak") ||
        p.material?.toLowerCase().includes("wood") ||
        p.category === "Dining Room"
      );
    }
    return true;
  });

  const otherCollections = COLLECTIONS.filter((c) => c.slug !== collection.slug);

  const whatsappMessage = encodeURIComponent(
    `Hello Sassy Furniture, I am inquiring about the *${collection.title}* collection suite. Could you provide customization options and catalog pricing?`
  );
  const whatsappUrl = `https://wa.me/2348130575312?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Collection Hero Header */}
        <section className="relative w-full bg-[#18181b] text-white py-14 sm:py-20 overflow-hidden">
          <div className="absolute inset-0 opacity-35">
            <Image
              src={collection.image}
              alt={collection.title}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/80 to-transparent" />
          </div>

          <div className="container-custom relative z-10">
            <nav className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <Link href="/collections" className="hover:text-white transition-colors">
                Collections
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-white">{collection.title}</span>
            </nav>

            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full bg-[#d49753]/20 text-[#d49753] border border-[#d49753]/30 text-xs font-bold uppercase tracking-wider">
                  {collection.tag}
                </span>
                <span className="text-xs text-[#a1a1aa]">{collection.itemCount}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-3">
                {collection.title}
              </h1>

              <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed mb-6">
                {collection.description}
              </p>

              {/* Highlights */}
              <div className="space-y-1.5 pt-2 border-t border-white/15 max-w-lg mb-7">
                {collection.highlights.map((h, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-[#e4e4e7]">
                    <CheckCircle2 size={13} className="text-[#d49753] flex-shrink-0" />
                    <span>{h}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-3">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-2.5 px-5 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                >
                  <MessageSquare size={14} />
                  <span>Inquire on WhatsApp</span>
                </a>
                <Link
                  href="/contact"
                  className="btn-secondary py-2.5 px-5 rounded-xl text-xs font-semibold bg-white/10 text-white border-white/20 hover:bg-white/20"
                >
                  Schedule Private Viewing
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Collection Products Grid */}
        <section className="container-custom pt-12 sm:pt-16">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#f0ebe3]">
            <div>
              <h2 className="text-xl sm:text-2xl font-serif text-[#1c1917] tracking-tight">
                Curated Pieces in {collection.title}
              </h2>
              <p className="text-xs text-[#78716c] mt-0.5">
                Showing {collectionProducts.length} coordinated pieces
              </p>
            </div>

            <Link
              href="/shop"
              className="text-xs font-semibold text-[#b37e44] hover:underline flex items-center gap-1"
            >
              <span>Explore All Furniture</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {collectionProducts.map((product: Product) => {
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

                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#78716c] text-[10px] font-semibold">
                      {product.category}
                    </span>

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
                        <span>Details</span>
                        <ArrowRight size={11} />
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Other Collections Grid */}
        <section className="container-custom mt-20 pt-12 border-t border-[#ede5da]">
          <div className="mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#b37e44] block mb-1">
              Explore More Aesthetics
            </span>
            <h3 className="text-2xl font-serif text-[#1c1917]">Other Collections</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherCollections.map((other) => (
              <Link
                key={other.id}
                href={`/collections/${other.slug}`}
                className="group p-5 rounded-3xl bg-white border border-[#ede7df] hover:border-[#b37e44] hover:shadow-lg transition-all"
              >
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden mb-3 bg-[#faf7f2]">
                  <Image
                    src={other.image}
                    alt={other.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                  />
                  <div className="absolute top-2 left-2">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-white text-[10px] font-semibold">
                      {other.tag}
                    </span>
                  </div>
                </div>
                <h4 className="text-base font-serif font-bold text-[#1c1917] group-hover:text-[#b37e44] transition-colors mb-1">
                  {other.title}
                </h4>
                <p className="text-xs text-[#78716c] line-clamp-2">{other.description}</p>
              </Link>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

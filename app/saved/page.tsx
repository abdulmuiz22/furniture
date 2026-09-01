"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import { Product, BEST_SELLERS, getProductByIdOrSlug } from "@/data/furnitureData";
import {
  ChevronRight,
  Heart,
  Trash2,
  ArrowRight,
  Sparkles,
  MessageSquare,
  ShoppingBag,
  Star,
  Layers,
  Ruler,
} from "lucide-react";

export default function SavedFavoritesPage() {
  const { wishlist, toggleWishlist, products } = useShop();

  // Find all wishlisted products from current products or fallback
  const savedPieces: Product[] = wishlist
    .map((id) => {
      const found = products.find((p) => (p._id || p.id || p.name) === id);
      if (found) return found;
      return getProductByIdOrSlug(id, BEST_SELLERS);
    })
    .filter((p): p is Product => Boolean(p));

  const bulkInquiryText = encodeURIComponent(
    `Hello Sassy Furniture, I am interested in inquiring about my saved collection:\n` +
      savedPieces.map((p, idx) => `${idx + 1}. ${p.name} (${p.category})`).join("\n") +
      `\nCould you please provide availability, fabric swatches, and consultation details?`
  );
  const bulkWhatsappUrl = `https://wa.me/2348130575312?text=${bulkInquiryText}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Banner */}
        <section className="bg-[#f6f1eb] border-b border-[#e8ded2] py-12 sm:py-16">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-xs text-[#78716c] mb-4">
              <Link href="/" className="hover:text-[#b37e44] transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-[#1c1917]">Saved Favorites</span>
            </nav>

            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                  <Sparkles size={13} />
                  <span>Personal Curation</span>
                </span>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight mb-2">
                  Saved Pieces ({savedPieces.length})
                </h1>
                <p className="text-xs sm:text-sm text-[#5c564f] leading-relaxed">
                  Review your favorite furniture pieces, compare proportions and finishes, or request a combined consultation for your space.
                </p>
              </div>

              {savedPieces.length > 0 && (
                <a
                  href={bulkWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-primary py-3 px-6 rounded-xl text-xs sm:text-sm flex items-center justify-center gap-2 whitespace-nowrap shadow-sm"
                >
                  <MessageSquare size={16} />
                  <span>Inquire All on WhatsApp</span>
                </a>
              )}
            </div>
          </div>
        </section>

        {/* Saved Items List */}
        <section className="container-custom pt-10 sm:pt-14">
          {savedPieces.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#ede7df] p-8 max-w-md mx-auto shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center mx-auto mb-4 text-[#b37e44]">
                <Heart size={28} />
              </div>
              <h3 className="text-xl font-serif font-bold text-[#1c1917] mb-2">
                Your Saved Collection is Empty
              </h3>
              <p className="text-xs text-[#78716c] mb-6 leading-relaxed">
                Bookmark sofas, dining tables, and lighting as you browse our catalog to easily compare and request consultations.
              </p>
              <Link href="/shop" className="btn-primary py-3 px-6 rounded-xl text-xs font-semibold">
                Explore Furniture Catalog &rarr;
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {savedPieces.map((product) => {
                const productId = product._id || product.id || product.name;
                const productWhatsappUrl = `https://wa.me/2348130575312?text=${encodeURIComponent(
                  `Hello Sassy Furniture, I would like to inquire about the "${product.name}" from my saved collection.`
                )}`;

                return (
                  <div
                    key={productId}
                    className="group flex flex-col bg-white rounded-3xl border border-[#ede7df] hover:border-[#dfd7cc] hover:shadow-xl transition-all duration-300 overflow-hidden"
                  >
                    {/* Image Area */}
                    <div className="relative aspect-[4/3] w-full bg-[#faf7f2] overflow-hidden">
                      <Image
                        src={product.image || "/images/hero.jpg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />

                      <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-white/90 backdrop-blur-xs text-[#78716c] text-[10px] font-bold">
                        {product.category}
                      </span>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => toggleWishlist(productId)}
                        aria-label="Remove from saved"
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-xs text-[#71717a] hover:text-rose-600 hover:bg-white flex items-center justify-center transition-colors shadow-xs cursor-pointer"
                        title="Remove from saved"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="p-5 sm:p-6 flex flex-col flex-1 justify-between space-y-4">
                      <div>
                        <div className="flex items-center justify-between mb-1">
                          <h3 className="text-base sm:text-lg font-serif font-bold text-[#1c1917] group-hover:text-[#b37e44] transition-colors line-clamp-1">
                            {product.name}
                          </h3>
                        </div>

                        <p className="text-xs text-[#78716c] line-clamp-2 mb-3">
                          {product.description}
                        </p>

                        {/* Specs Pill */}
                        <div className="space-y-1 text-xs text-[#52525b] bg-[#faf7f2] rounded-xl p-2.5 border border-[#ede5da]">
                          {product.material && (
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <Layers size={12} className="text-[#b37e44]" />
                              <span className="truncate">{product.material}</span>
                            </div>
                          )}
                          {product.dimensions && (
                            <div className="flex items-center gap-1.5 text-[11px]">
                              <Ruler size={12} className="text-[#b37e44]" />
                              <span className="truncate">{product.dimensions}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="space-y-2 pt-2 border-t border-[#f4efe8]">
                        <Link
                          href={`/products/${encodeURIComponent(productId)}`}
                          className="btn-primary w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5"
                        >
                          <span>View Product Details</span>
                          <ArrowRight size={13} />
                        </Link>
                        <a
                          href={productWhatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-secondary w-full py-2 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 text-[#128C7E] border-[#25D366]/30 hover:bg-[#25D366]/10"
                        >
                          <MessageSquare size={13} />
                          <span>Inquire via WhatsApp</span>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>
      </main>

      <Footer />
    </div>
  );
}

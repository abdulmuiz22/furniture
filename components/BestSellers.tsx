"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Star, Video } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/furnitureData";

export default function BestSellers() {
  const {
    products,
    isLoading,
    toggleWishlist,
    isInWishlist,
    setQuickViewProduct,
    setSelectedCategory,
  } = useShop();

  return (
    <section id="best-sellers" className="w-full pb-14 sm:pb-20 bg-[#fcfbfa]">
      <div className="container-custom">
        {/* Section Header matching screenshot */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-serif text-[#1c1917] tracking-tight">
              Best Sellers
            </h2>
          </div>
          <Link
            href="/shop"
            className="group inline-flex items-center gap-1 text-xs sm:text-[13px] font-medium text-[#78716c] hover:text-[#b37e44] transition-colors"
          >
            <span>View All Products</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* Loading Skeleton */}
        {isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4 animate-pulse">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white rounded-2xl p-2.5 border border-[#ede7df] h-64 flex flex-col justify-between">
                <div className="w-full aspect-square bg-[#f0ebe3] rounded-xl" />
                <div className="h-3.5 bg-[#f0ebe3] rounded w-3/4 mt-2.5" />
                <div className="h-3 bg-[#f0ebe3] rounded w-1/2 mt-1.5" />
              </div>
            ))}
          </div>
        )}

        {/* 6 Products Grid matching exact design */}
        {!isLoading && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5 sm:gap-4">
            {products.slice(0, 6).map((product: Product) => {
              const productId = product._id || product.id || product.name;
              const isWishlisted = isInWishlist(productId);
              const hasVideo = Boolean(product.video);

              return (
                <Link
                  key={productId}
                  href={`/products/${encodeURIComponent(productId)}`}
                  className="group flex flex-col justify-between bg-white rounded-2xl p-2.5 sm:p-3 border border-[#ede7df] hover:border-[#dfd7cc] hover:shadow-md transition-all duration-300 relative cursor-pointer"
                >
                  {/* Product Image Container */}
                  <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fbf9f6] flex items-center justify-center">
                    <Image
                      src={product.image || "/images/hero.jpg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />

                    {/* Video Badge */}
                    {hasVideo && (
                      <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
                        <Video size={10} /> Video
                      </span>
                    )}

                    {/* Wishlist Heart Button */}
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
                          : "bg-white/85 backdrop-blur-2xs text-[#71717a] hover:text-rose-600 hover:bg-white"
                      }`}
                    >
                      <Heart
                        size={13}
                        className={isWishlisted ? "fill-rose-600 text-rose-600" : ""}
                      />
                    </button>
                  </div>

                  {/* Product Details */}
                  <div className="mt-2.5 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="text-xs sm:text-sm font-semibold text-[#1c1917] leading-snug group-hover:text-[#b37e44] transition-colors line-clamp-1">
                        {product.name}
                      </h3>
                      <p className="text-[11px] text-[#78716c] line-clamp-1 mt-0.5">
                        {product.material || product.category}
                      </p>
                    </div>

                    {/* Rating Stars & Count matching screenshot */}
                    <div className="flex items-center justify-between mt-2 pt-1 text-[11px]">
                      <div className="flex items-center gap-1">
                        <Star size={11} className="fill-amber-500 text-amber-500" />
                        <span className="font-semibold text-[#27272a]">
                          {product.rating || 4.8}
                        </span>
                        <span className="text-[#8e8e93]">
                          ({product.reviewsCount || 18})
                        </span>
                      </div>
                      <span className="text-[11px] font-semibold text-[#b37e44] group-hover:underline">
                        View Details &rarr;
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}

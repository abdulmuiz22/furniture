"use client";

import React, { useState, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/furnitureData";
import {
  Search,
  Filter,
  Heart,
  Star,
  Video,
  ArrowRight,
  Sparkles,
  SlidersHorizontal,
  ChevronRight,
  RotateCcw,
} from "lucide-react";

const CATEGORIES = [
  "All",
  "Living Room",
  "Bedroom",
  "Dining Room",
  "Office",
  "Outdoor",
  "Decor & Lighting",
];

function ShopContent() {
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "All";

  const { products, isLoading, isInWishlist, toggleWishlist } = useShop();

  const [activeCategory, setActiveCategory] = useState<string>(initialCategory);
  const [searchFilter, setSearchFilter] = useState<string>("");
  const [sortBy, setSortBy] = useState<"featured" | "rating" | "name" | "reviews">("featured");
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let list = [...products];

    // Filter category
    if (activeCategory !== "All") {
      list = list.filter(
        (p) => p.category.toLowerCase() === activeCategory.toLowerCase()
      );
    }

    // Search query
    if (searchFilter.trim()) {
      const q = searchFilter.toLowerCase().trim();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.material && p.material.toLowerCase().includes(q)) ||
          (p.description && p.description.toLowerCase().includes(q))
      );
    }

    // In-Stock filter
    if (onlyInStock) {
      list = list.filter((p) => p.inStock !== false);
    }

    // Sorting
    if (sortBy === "rating") {
      list.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    } else if (sortBy === "name") {
      list.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortBy === "reviews") {
      list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
    } else {
      // featured
      list.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    return list;
  }, [products, activeCategory, searchFilter, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setActiveCategory("All");
    setSearchFilter("");
    setSortBy("featured");
    setOnlyInStock(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Page Header Banner */}
        <section className="relative w-full bg-[#f6f1eb] border-b border-[#ebdccb] py-10 sm:py-14">
          <div className="container-custom">
            {/* Breadcrumbs */}
            <nav className="flex items-center gap-2 text-xs text-[#78716c] mb-4">
              <Link href="/" className="hover:text-[#b37e44] transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-[#1c1917]">Shop Catalog</span>
              {activeCategory !== "All" && (
                <>
                  <ChevronRight size={12} />
                  <span className="text-[#b37e44] font-medium">{activeCategory}</span>
                </>
              )}
            </nav>

            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                <Sparkles size={13} />
                <span>Showroom Catalog</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight mb-3">
                Shop All Furniture
              </h1>
              <p className="text-xs sm:text-sm text-[#665e56] leading-relaxed">
                Discover pieces that blend comfort, elegance, and artisanal joinery. Every item is handcrafted with kiln-dried timber and bespoke customization options.
              </p>
            </div>
          </div>
        </section>

        {/* Filter & Search Bar */}
        <section className="sticky top-[70px] z-30 bg-white/95 backdrop-blur-md border-b border-[#eee8df] shadow-2xs py-3.5">
          <div className="container-custom flex flex-col lg:flex-row lg:items-center justify-between gap-3.5">
            {/* Category Filter Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#18181b] text-white shadow-xs"
                      : "bg-[#f5efe6] text-[#52525b] hover:bg-[#ebdccb] hover:text-[#18181b]"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Search, Sort & Stock Controls */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3">
              {/* Search Box */}
              <div className="relative flex-1 sm:w-56 min-w-[160px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#a1a1aa]" />
                <input
                  type="text"
                  placeholder="Search pieces..."
                  value={searchFilter}
                  onChange={(e) => setSearchFilter(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-[#faf7f2] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                />
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-1.5 bg-[#faf7f2] border border-[#e5ded4] rounded-xl px-2.5 py-1 text-xs">
                <SlidersHorizontal size={12} className="text-[#8c827a]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as "featured" | "rating" | "name" | "reviews")}
                  className="bg-transparent border-none text-xs font-semibold text-[#27272a] focus:outline-none cursor-pointer"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="reviews">Most Reviewed</option>
                  <option value="name">Name (A-Z)</option>
                </select>
              </div>

              {/* In-Stock Toggle */}
              <label className="flex items-center gap-1.5 text-xs text-[#52525b] cursor-pointer select-none bg-[#faf7f2] border border-[#e5ded4] px-2.5 py-1.5 rounded-xl">
                <input
                  type="checkbox"
                  checked={onlyInStock}
                  onChange={(e) => setOnlyInStock(e.target.checked)}
                  className="accent-[#b37e44] rounded"
                />
                <span>In-Stock Only</span>
              </label>
            </div>
          </div>
        </section>

        {/* Products Grid & Results Count */}
        <section className="container-custom pt-8">
          <div className="flex items-center justify-between mb-6 text-xs text-[#71717a]">
            <div>
              Showing <strong className="text-[#1c1917] font-semibold">{filteredProducts.length}</strong> {filteredProducts.length === 1 ? "piece" : "pieces"}
              {activeCategory !== "All" && ` in ${activeCategory}`}
              {searchFilter && ` matching "${searchFilter}"`}
            </div>

            {(activeCategory !== "All" || searchFilter || onlyInStock || sortBy !== "featured") && (
              <button
                onClick={handleResetFilters}
                className="flex items-center gap-1 text-[#b37e44] hover:underline font-semibold cursor-pointer"
              >
                <RotateCcw size={12} />
                <span>Reset Filters</span>
              </button>
            )}
          </div>

          {/* Loading Skeleton */}
          {isLoading && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 sm:gap-6 animate-pulse">
              {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                <div key={i} className="bg-white rounded-2xl p-3 border border-[#ede7df] h-80 flex flex-col justify-between">
                  <div className="w-full aspect-square bg-[#f0ebe3] rounded-xl" />
                  <div className="h-4 bg-[#f0ebe3] rounded w-3/4 mt-3" />
                  <div className="h-3 bg-[#f0ebe3] rounded w-1/2 mt-2" />
                </div>
              ))}
            </div>
          )}

          {/* Empty State */}
          {!isLoading && filteredProducts.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-[#ede7df] p-8 max-w-lg mx-auto">
              <div className="w-14 h-14 rounded-full bg-[#f7f2ea] flex items-center justify-center mx-auto mb-4 text-[#b37e44]">
                <Filter size={24} />
              </div>
              <h3 className="text-lg font-serif font-bold text-[#1c1917] mb-1">
                No matching furniture found
              </h3>
              <p className="text-xs text-[#78716c] mb-6">
                Try clearing your search filters or exploring another room category.
              </p>
              <button
                onClick={handleResetFilters}
                className="btn-primary text-xs py-2.5 px-5 rounded-xl"
              >
                View All Furniture
              </button>
            </div>
          )}

          {/* Catalog Products Grid */}
          {!isLoading && filteredProducts.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
              {filteredProducts.map((product: Product) => {
                const productId = product._id || product.id || product.name;
                const isWishlisted = isInWishlist(productId);
                const hasVideo = Boolean(product.video);

                return (
                  <Link
                    key={productId}
                    href={`/products/${encodeURIComponent(productId)}`}
                    className="group flex flex-col justify-between bg-white rounded-2xl p-3 border border-[#ede7df] hover:border-[#dfd7cc] hover:shadow-lg transition-all duration-300 relative cursor-pointer"
                  >
                    {/* Product Image Container */}
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#fbf9f6] flex items-center justify-center">
                      <Image
                        src={product.image || "/images/hero.jpg"}
                        alt={product.name}
                        fill
                        sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />

                      {/* Video Badge */}
                      {hasVideo && (
                        <span className="absolute bottom-2 left-2 bg-black/75 backdrop-blur-xs text-white text-[9px] font-bold px-1.5 py-0.5 rounded flex items-center gap-1 shadow-xs">
                          <Video size={10} /> Video
                        </span>
                      )}

                      {/* Category Pill */}
                      <span className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-xs text-[#78716c] text-[10px] font-semibold">
                        {product.category}
                      </span>

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
                            : "bg-white/90 backdrop-blur-2xs text-[#71717a] hover:text-rose-600 hover:bg-white"
                        }`}
                      >
                        <Heart
                          size={13}
                          className={isWishlisted ? "fill-rose-600 text-rose-600" : ""}
                        />
                      </button>
                    </div>

                    {/* Product Details */}
                    <div className="mt-3 flex flex-col flex-1 justify-between">
                      <div>
                        <h3 className="text-sm font-semibold text-[#1c1917] leading-snug group-hover:text-[#b37e44] transition-colors line-clamp-1">
                          {product.name}
                        </h3>
                        <p className="text-xs text-[#78716c] line-clamp-1 mt-0.5">
                          {product.material || product.description}
                        </p>
                      </div>

                      {/* Rating & Inquire action */}
                      <div className="flex items-center justify-between mt-3 pt-2 border-t border-[#f4efe8] text-xs">
                        <div className="flex items-center gap-1">
                          <Star size={12} className="fill-amber-500 text-amber-500" />
                          <span className="font-semibold text-[#27272a]">
                            {product.rating || 4.8}
                          </span>
                          <span className="text-[#8e8e93] text-[11px]">
                            ({product.reviewsCount || 18})
                          </span>
                        </div>
                        <span className="text-xs font-semibold text-[#b37e44] group-hover:underline flex items-center gap-0.5">
                          <span>Details</span>
                          <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </section>

        {/* Custom Order Concierge Banner */}
        <section className="container-custom mt-16">
          <div className="rounded-3xl bg-[#18181b] text-white p-8 sm:p-12 flex flex-col md:flex-row items-center justify-between gap-8 border border-[#27272a]">
            <div className="max-w-xl text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d49753] mb-2 block">
                Bespoke Tailoring Available
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-bold text-white mb-2">
                Need Custom Dimensions or Specific Fabrics?
              </h2>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                Our Ila Orangun workshop crafts custom sofas, dining tables, and executive suites to your exact spatial blueprint. Book a private consultation or speak with our master joiners.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/contact"
                className="btn-primary py-3 px-6 rounded-xl text-xs sm:text-sm whitespace-nowrap"
              >
                Request Bespoke Consultation
              </Link>
              <a
                href="https://wa.me/2348130575312"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-3 px-6 rounded-xl text-xs sm:text-sm whitespace-nowrap bg-[#27272a] text-white border-[#3f3f46] hover:bg-[#3f3f46]"
              >
                WhatsApp Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#fcfbfa]">
          <div className="animate-spin w-8 h-8 border-2 border-[#b37e44] border-t-transparent rounded-full" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}

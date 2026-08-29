"use client";

import React, { useState, useMemo } from "react";
import Image from "next/image";
import { Search, X, ArrowRight, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/furnitureData";

export default function SearchModal() {
  const { isSearchOpen, setIsSearchOpen, products, setQuickViewProduct } = useShop();
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = useMemo(() => {
    if (!searchTerm.trim()) return products.slice(0, 4);
    const q = searchTerm.toLowerCase();
    return products.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        (p.material && p.material.toLowerCase().includes(q)) ||
        (p.description && p.description.toLowerCase().includes(q))
    );
  }, [searchTerm, products]);

  if (!isSearchOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4 bg-black/60 backdrop-blur-xs animate-fade-in"
      onClick={() => setIsSearchOpen(false)}
    >
      <div
        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl border border-[#ede7df] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Header Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-[#ece5da]">
          <Search size={20} className="text-[#b37e44] mr-3 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search furniture by name, material (e.g. Oak, Bouclé), or room..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            className="w-full text-sm sm:text-base bg-transparent border-none focus:outline-none text-[#1c1917] placeholder:text-[#a1a1aa]"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="text-[#a1a1aa] hover:text-[#52525b] p-1"
            >
              <X size={16} />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="ml-2 px-2.5 py-1 text-xs font-semibold text-[#71717a] hover:text-[#18181b] rounded-md hover:bg-[#f4ece1]"
          >
            ESC
          </button>
        </div>

        {/* Search Results */}
        <div className="p-4 max-h-[60vh] overflow-y-auto">
          <div className="flex items-center justify-between mb-3 text-xs text-[#71717a] uppercase tracking-wider font-semibold">
            <span>{searchTerm ? `Results (${filteredProducts.length})` : "Popular Showcase Pieces"}</span>
            {!searchTerm && <span className="flex items-center gap-1 text-[#b37e44]"><Sparkles size={12} /> Curated</span>}
          </div>

          {filteredProducts.length === 0 ? (
            <div className="text-center py-10 text-[#71717a]">
              <p className="text-sm font-medium">No matching pieces found</p>
              <p className="text-xs text-[#a1a1aa] mt-1">Try searching for &quot;Sofa&quot;, &quot;Oak&quot;, &quot;Bed&quot;, or &quot;Lighting&quot;</p>
            </div>
          ) : (
            <div className="space-y-2">
              {filteredProducts.map((product: Product) => {
                const key = product._id || product.id || product.name;
                return (
                  <div
                    key={key}
                    onClick={() => {
                      setIsSearchOpen(false);
                      setQuickViewProduct(product);
                    }}
                    className="flex items-center gap-3.5 p-2.5 rounded-xl hover:bg-[#fbf7f2] border border-transparent hover:border-[#ede5da] transition-all cursor-pointer group"
                  >
                    <div className="relative w-14 h-14 rounded-lg overflow-hidden bg-[#f4efe8] flex-shrink-0 border border-[#eae4da]">
                      <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-semibold text-[#1c1917] group-hover:text-[#b37e44] transition-colors truncate">
                          {product.name}
                        </h4>
                        <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#f0ebe3] text-[#78716c]">
                          {product.category}
                        </span>
                      </div>
                      <p className="text-xs text-[#78716c] truncate mt-0.5">
                        {product.material || product.description}
                      </p>
                    </div>
                    <div className="text-right flex-shrink-0 flex items-center gap-1 text-xs font-semibold text-[#b37e44]">
                      <span>Inquire</span>
                      <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

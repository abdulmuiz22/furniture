"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Armchair, Bed, Utensils, Laptop, Sun, Lamp } from "lucide-react";
import { CATEGORIES, MediaAsset } from "@/data/furnitureData";
import { useShop } from "@/context/ShopContext";

export default function CategoryGrid() {
  const { setSelectedCategory } = useShop();
  const [categoryMedia, setCategoryMedia] = useState<Record<string, string>>({});

  useEffect(() => {
    let ignore = false;
    async function loadCategoryMedia() {
      try {
        const res = await fetch("/api/media?section=category");
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.data && Array.isArray(data.data)) {
            const map: Record<string, string> = {};
            data.data.forEach((m: MediaAsset) => {
              if (m.categoryRef && m.url) {
                map[m.categoryRef.toLowerCase()] = m.url;
              }
            });
            setCategoryMedia(map);
          }
        }
      } catch {
        // use fallback
      }
    }
    loadCategoryMedia();
    return () => {
      ignore = true;
    };
  }, []);

  const getCategoryBadgeIcon = (iconName: string) => {
    switch (iconName) {
      case "sofa":
        return <Armchair size={14} className="text-[#3f3f46]" />;
      case "bed":
        return <Bed size={14} className="text-[#3f3f46]" />;
      case "dining":
        return <Utensils size={14} className="text-[#3f3f46]" />;
      case "desk":
        return <Laptop size={14} className="text-[#3f3f46]" />;
      case "outdoor":
        return <Sun size={14} className="text-[#3f3f46]" />;
      case "lamp":
        return <Lamp size={14} className="text-[#3f3f46]" />;
      default:
        return <Armchair size={14} className="text-[#3f3f46]" />;
    }
  };

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
    const element = document.getElementById("best-sellers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="categories" className="w-full py-12 sm:py-16 bg-[#fcfbfa]">
      <div className="container-custom">
        {/* Section Header matching design */}
        <div className="flex items-center justify-between mb-6 sm:mb-8">
          <div>
            <h2 className="text-xl sm:text-2xl lg:text-[1.75rem] font-serif text-[#1c1917] tracking-tight">
              Shop By Category
            </h2>
          </div>
          <Link
            href="#categories"
            onClick={() => setSelectedCategory("All")}
            className="group inline-flex items-center gap-1 text-xs sm:text-[13px] font-medium text-[#78716c] hover:text-[#b37e44] transition-colors"
          >
            <span>View All Categories</span>
            <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
          </Link>
        </div>

        {/* 6 Category Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-5">
          {CATEGORIES.map((category) => (
            <div
              key={category.id}
              onClick={() => handleCategoryClick(category.name)}
              className="group flex flex-col cursor-pointer"
            >
              {/* Card Image Container */}
              <div className="relative aspect-[4/3.7] w-full rounded-2xl overflow-hidden bg-[#f0ebe3] border border-[#e8e2d8] transition-all duration-300 group-hover:shadow-md group-hover:border-[#d9cfc1]">
                <Image
                  src={categoryMedia[category.name.toLowerCase()] || category.image}
                  alt={category.name}
                  fill
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 16vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Icon Badge at Top-Left */}
                <div className="absolute top-2 left-2 w-7 h-7 rounded-lg bg-white/85 backdrop-blur-md border border-white/60 flex items-center justify-center shadow-2xs transition-transform group-hover:scale-110">
                  {getCategoryBadgeIcon(category.icon)}
                </div>
              </div>

              {/* Title & Count */}
              <div className="mt-2.5 text-left">
                <h3 className="text-xs sm:text-sm font-semibold text-[#1c1917] group-hover:text-[#b37e44] transition-colors">
                  {category.name}
                </h3>
                <p className="text-[11px] text-[#8c827a] mt-0.5 font-normal">
                  {category.itemCount}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useShop } from "@/context/ShopContext";
import { MediaAsset } from "@/data/furnitureData";

export default function PromoBanners() {
  const { setSelectedCategory } = useShop();
  const [promoMedia, setPromoMedia] = useState<MediaAsset[]>([]);

  useEffect(() => {
    let ignore = false;
    async function loadPromoMedia() {
      try {
        const res = await fetch("/api/media?section=promo");
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.data && Array.isArray(data.data) && data.data.length > 0) {
            setPromoMedia(data.data);
          }
        }
      } catch {
        // use fallback
      }
    }
    loadPromoMedia();
    return () => {
      ignore = true;
    };
  }, []);

  const promo1Url = promoMedia[0]?.url || "/images/promo-minimalist.jpg";
  const promo2Url = promoMedia[1]?.url || "/images/promo-exclusive.jpg";

  const handleDiscoverClick = () => {
    setSelectedCategory("Living Room");
    const element = document.getElementById("best-sellers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="promos" className="w-full pb-14 sm:pb-18 bg-[#fcfbfa]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 sm:gap-6">
          {/* Left Promo Card: Minimalist Essentials (Light Theme) */}
          <div className="relative rounded-3xl overflow-hidden bg-[#f4efe8] border border-[#e5ded4] p-7 sm:p-9 flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
            {/* Background / Right floating image */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 sm:w-7/12 pointer-events-none">
              <Image
                src={promo1Url}
                alt="Minimalist Essentials Wooden Armchair"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-center mix-blend-multiply opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#f4efe8] via-[#f4efe8]/50 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[300px] flex flex-col items-start">
              <span className="inline-block text-[11px] font-semibold tracking-wide text-[#b37e44] mb-2">
                New Collection
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1c1917] leading-tight mb-2">
                Minimalist <br />
                Essentials
              </h3>
              <p className="text-xs sm:text-[13px] text-[#665e56] mb-7 font-normal leading-relaxed">
                Timeless designs for modern spaces.
              </p>

              <button
                onClick={handleDiscoverClick}
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-lg cursor-pointer"
              >
                Discover Collection
              </button>
            </div>
          </div>

          {/* Right Promo Card: Exclusive Offer (Dark Luxury Theme) */}
          <div className="relative rounded-3xl overflow-hidden bg-[#18181b] border border-[#27272a] p-7 sm:p-9 flex flex-col justify-between min-h-[340px] sm:min-h-[380px]">
            {/* Background / Right floating image */}
            <div className="absolute right-0 bottom-0 top-0 w-1/2 sm:w-7/12 pointer-events-none">
              <Image
                src={promo2Url}
                alt="Exclusive Offer Luxury Velvet Sofa"
                fill
                sizes="(max-width: 1024px) 50vw, 30vw"
                className="object-cover object-center opacity-70"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#18181b] via-[#18181b]/60 to-transparent" />
            </div>

            {/* Left Content */}
            <div className="relative z-10 max-w-[260px] sm:max-w-[300px] flex flex-col items-start">
              <span className="inline-block text-[11px] font-semibold tracking-wide text-[#d49753] mb-2">
                Exclusive Offer
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-white leading-tight mb-2">
                Up to 30% Off
              </h3>
              <p className="text-xs sm:text-[13px] text-[#a1a1aa] mb-7 font-normal leading-relaxed">
                On selected items this season.
              </p>

              <Link
                href="#best-sellers"
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-lg"
              >
                Shop The Sale
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

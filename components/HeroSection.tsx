"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { MediaAsset } from "@/data/furnitureData";

export default function HeroSection() {
  const [heroMedia, setHeroMedia] = useState<MediaAsset | null>(null);

  useEffect(() => {
    let ignore = false;
    async function loadHero() {
      try {
        const res = await fetch("/api/media?section=hero");
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.data && data.data.length > 0) {
            setHeroMedia(data.data[0]);
          }
        }
      } catch {
        // use fallback
      }
    }
    loadHero();
    return () => {
      ignore = true;
    };
  }, []);

  const heroUrl = heroMedia?.url || "/images/hero.jpg";
  const isVideo = heroMedia?.mediaType === "video";

  return (
    <section className="relative w-full overflow-hidden bg-[#faf8f5]">
      {/* Background Image / Video Container */}
      <div className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] xl:h-[640px]">
        {isVideo ? (
          <video
            src={heroUrl}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover object-[center_55%]"
          />
        ) : (
          <Image
            src={heroUrl}
            alt={heroMedia?.title || "Modern Living Room with Designer Sofa and Natural Light"}
            fill
            priority
            sizes="100vw"
            className="object-cover object-[center_55%]"
          />
        )}

        {/* Soft Left Overlay Gradient for optimal text legibility */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#faf8f5]/90 via-[#faf8f5]/60 to-transparent sm:w-2/3 lg:w-1/2" />

        {/* Content Box matching exact design */}
        <div className="container-custom relative h-full flex items-center">
          <div className="max-w-[500px] pt-6 pb-10 z-10">
            {/* Tagline */}
            <span className="inline-block text-[#b37e44] font-medium text-xs sm:text-sm tracking-wide mb-3">
              Live Beautifully
            </span>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-serif font-normal text-[#1c1917] leading-[1.15] tracking-tight mb-4">
              Modern Furniture <br />
              For Stylish Living
            </h1>

            {/* Description */}
            <p className="text-xs sm:text-sm lg:text-base text-[#57534e] font-normal leading-relaxed mb-7 max-w-[420px]">
              Discover pieces that blend comfort, elegance and functionality.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3.5">
              <Link
                href="/shop"
                className="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-lg group shadow-sm"
              >
                <span>Shop Now</span>
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/rooms"
                className="btn-secondary text-xs sm:text-sm py-2.5 px-5 rounded-lg"
              >
                Explore Rooms
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

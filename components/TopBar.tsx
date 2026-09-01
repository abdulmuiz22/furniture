"use client";

import React from "react";
import { MapPin, Sparkles, Phone, Mail } from "lucide-react";

export default function TopBar() {
  const tickerItems = (
    <div className="flex items-center shrink-0">
      {/* Showroom & Workshop */}
      <div className="flex items-center gap-1.5 text-[#3f3f46] px-4 whitespace-nowrap">
        <MapPin size={13} className="text-[#b37e44] shrink-0" />
        <span>
          Showroom &amp; Workshop:{" "}
          <strong className="font-semibold text-[#1c1917]">
            Ila Orangun, Osun State, Nigeria
          </strong>
        </span>
      </div>

      <span className="text-[#b37e44]/60 mx-3 font-bold text-xs select-none">&bull;</span>

      {/* Bespoke Craftsmanship */}
      <div className="flex items-center gap-1.5 text-[#3f3f46] px-4 whitespace-nowrap">
        <Sparkles size={13} className="text-[#b37e44] shrink-0" />
        <span>
          <strong className="font-semibold text-[#b37e44]">Bespoke Craftsmanship</strong> &bull; Custom Architectural Sizing &amp; Tailored Finishes
        </span>
      </div>

      <span className="text-[#b37e44]/60 mx-3 font-bold text-xs select-none">&bull;</span>

      {/* Phone */}
      <a
        href="tel:08130575312"
        className="flex items-center gap-1.5 font-semibold text-[#1c1917] hover:text-[#b37e44] transition-colors px-4 whitespace-nowrap"
      >
        <Phone size={12} className="text-[#b37e44] shrink-0" />
        <span>08130575312</span>
      </a>

      <span className="text-[#b37e44]/60 mx-3 font-bold text-xs select-none">&bull;</span>

      {/* Email */}
      <a
        href="mailto:salawudeenhammed117@gmail.com"
        className="flex items-center gap-1.5 text-[#3f3f46] hover:text-[#b37e44] transition-colors px-4 whitespace-nowrap"
      >
        <Mail size={12} className="text-[#b37e44] shrink-0" />
        <span>salawudeenhammed117@gmail.com</span>
      </a>

      <span className="text-[#b37e44]/60 mx-3 font-bold text-xs select-none">&bull;</span>
    </div>
  );

  return (
    <div className="w-full bg-[#f8f5f0] border-b border-[#eae4da] text-[#52525b] text-[11px] sm:text-xs py-2 overflow-hidden select-none relative z-30">
      <div className="flex w-max animate-marquee-left hover:[animation-play-state:paused] cursor-default">
        {tickerItems}
        {tickerItems}
        {tickerItems}
        {tickerItems}
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { MapPin, Sparkles, Phone, Mail } from "lucide-react";

export default function TopBar() {
  return (
    <div className="w-full bg-[#f8f5f0] border-b border-[#eae4da] text-[#52525b] text-[11px] sm:text-xs py-2 px-4">
      <div className="container-custom flex flex-wrap items-center justify-between gap-y-1.5 gap-x-4">
        {/* Left: Location */}
        <div className="flex items-center gap-1.5 hover:text-[#18181b] transition-colors cursor-pointer">
          <MapPin size={13} className="text-[#b37e44]" />
          <span>
            Showroom & Workshop: <strong className="font-medium text-[#27272a]">Ila Orangun, Osun State, Nigeria</strong>
          </span>
        </div>

        {/* Center: Bespoke Craftsmanship */}
        <div className="flex items-center gap-1.5 text-[#3f3f46]">
          <Sparkles size={14} className="text-[#b37e44]" />
          <span className="font-normal">
            <strong className="font-semibold text-[#b37e44]">Bespoke Craftsmanship</strong> &bull; Custom Architectural Sizing &amp; Tailored Finishes
          </span>
        </div>

        {/* Right: Contact & Email */}
        <div className="flex items-center gap-4 sm:gap-6">
          <a
            href="tel:08130575312"
            className="flex items-center gap-1.5 hover:text-[#b37e44] transition-colors"
          >
            <Phone size={12} className="text-[#b37e44]" />
            <span>08130575312</span>
          </a>
          <a
            href="mailto:salawudeenhammed117@gmail.com"
            className="flex items-center gap-1.5 hover:text-[#b37e44] transition-colors hidden md:flex"
          >
            <Mail size={12} className="text-[#b37e44]" />
            <span>salawudeenhammed117@gmail.com</span>
          </a>
        </div>
      </div>
    </div>
  );
}

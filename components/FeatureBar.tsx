"use client";

import React from "react";
import { Sparkles, Palette, ShieldCheck, Headphones } from "lucide-react";

export default function FeatureBar() {
  const features = [
    {
      id: "quality",
      title: "Premium Quality",
      description: "Crafted with the finest timber & fabrics",
      icon: <Sparkles size={18} className="text-[#b37e44]" />,
    },
    {
      id: "customization",
      title: "Bespoke Customization",
      description: "Tailored spatial sizing & finishes",
      icon: <Palette size={18} className="text-[#b37e44]" />,
    },
    {
      id: "guarantee",
      title: "Artisan Guarantee",
      description: "5-Year structural warranty",
      icon: <ShieldCheck size={18} className="text-[#b37e44]" />,
    },
    {
      id: "support",
      title: "Design Concierge",
      description: "Direct consultation: 08130575312",
      icon: <Headphones size={18} className="text-[#b37e44]" />,
    },
  ];

  return (
    <section className="w-full bg-white border-y border-[#f0ebe3] py-7">
      <div className="container-custom">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex items-center gap-3.5"
            >
              <div className="w-10 h-10 rounded-full bg-[#fbf6f0] border border-[#ebdccb] flex items-center justify-center flex-shrink-0">
                {feature.icon}
              </div>
              <div>
                <h3 className="text-xs sm:text-sm font-bold text-[#1c1917] tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-[11px] sm:text-xs text-[#78716c] mt-0.5 font-normal">
                  {feature.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

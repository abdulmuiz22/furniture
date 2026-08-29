"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle, ArrowRight, Award, Compass, ShieldCheck } from "lucide-react";

export default function AboutSection() {
  return (
    <section id="about" className="w-full py-16 sm:py-24 bg-[#fbf9f6] border-t border-[#ede5da]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Left: Imagery collage */}
          <div className="lg:col-span-6 relative">
            <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-lg border border-[#e5ded4]">
              <Image
                src="/images/cat-living-room.jpg"
                alt="Sassy Furniture Craftsmanship"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
            </div>
            {/* Floating Experience Badge */}
            <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl p-4 sm:p-5 shadow-xl border border-[#ede7df] max-w-[220px]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44]">
                  <Award size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#1c1917]">100% Bespoke</h4>
                  <p className="text-[11px] text-[#78716c]">Crafted in Ila Orangun</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Brand Story Content */}
          <div className="lg:col-span-6 space-y-6">
            <div>
              <span className="inline-block text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                Our Philosophy
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1c1917] tracking-tight mb-4 leading-tight">
                Architectural Elegance, Handcrafted For Longevity
              </h2>
              <p className="text-sm text-[#57534e] leading-relaxed mb-4">
                At <strong>Sassy Furniture</strong>, we believe every piece of furniture should be an enduring work of art. We combine timeless silhouettes with rich organic textures, sustainably sourced timber, and luxury upholstery.
              </p>
              <p className="text-sm text-[#57534e] leading-relaxed">
                Located at <strong>Number 15 Ajegunle, Ila Orangun</strong>, our workshop and design team collaborate with homeowners, interior designers, and architects across Nigeria to deliver custom-made furniture tailored to your exact lifestyle and aesthetic.
              </p>
            </div>

            {/* Core Values */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#27272a]">
                <CheckCircle size={16} className="text-[#b37e44]" />
                <span>Kiln-Dried Hardwood Framing</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#27272a]">
                <Compass size={16} className="text-[#b37e44]" />
                <span>Custom Spatial Proportions</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#27272a]">
                <ShieldCheck size={16} className="text-[#b37e44]" />
                <span>5-Year Structural Warranty</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-semibold text-[#27272a]">
                <CheckCircle size={16} className="text-[#b37e44]" />
                <span>Nationwide Delivery & Setup</span>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-3">
              <Link
                href="#contact"
                className="btn-primary inline-flex items-center gap-2"
              >
                <span>Schedule Private Viewing</span>
                <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

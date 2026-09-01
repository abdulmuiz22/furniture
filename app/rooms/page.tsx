"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { CATEGORIES, getRoomSlug } from "@/data/furnitureData";
import { ChevronRight, ArrowRight, Sparkles, Compass, ShieldCheck } from "lucide-react";

export default function RoomsDirectoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Banner */}
        <section className="bg-[#f5efe8] border-b border-[#e8ded2] py-12 sm:py-16">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-xs text-[#78716c] mb-4">
              <Link href="/" className="hover:text-[#b37e44] transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-[#1c1917]">Rooms &amp; Environments</span>
            </nav>

            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                <Compass size={13} />
                <span>Spatial Collections</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight mb-3">
                Curated Spaces &amp; Rooms
              </h1>
              <p className="text-xs sm:text-sm text-[#5c564f] leading-relaxed">
                Explore our signature room collections crafted to bring harmony, timeless warmth, and bespoke architectural balance to every corner of your home or executive workspace.
              </p>
            </div>
          </div>
        </section>

        {/* Room Categories Showcase */}
        <section className="container-custom pt-12 sm:pt-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {CATEGORIES.map((category) => {
              const slug = getRoomSlug(category.name);
              return (
                <div
                  key={category.id}
                  className="group flex flex-col bg-white rounded-3xl overflow-hidden border border-[#ede7df] hover:border-[#dfd7cc] hover:shadow-xl transition-all duration-300"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#f0ebe3]">
                    <Image
                      src={category.image}
                      alt={category.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity" />
                    
                    <span className="absolute bottom-4 left-4 text-white text-xs font-bold px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/20">
                      {category.itemCount}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="p-6 sm:p-7 flex flex-col flex-1 justify-between">
                    <div>
                      <h2 className="text-xl sm:text-2xl font-serif text-[#1c1917] group-hover:text-[#b37e44] transition-colors mb-2">
                        {category.name}
                      </h2>
                      <p className="text-xs sm:text-sm text-[#665e56] leading-relaxed mb-6">
                        {category.description}
                      </p>
                    </div>

                    <Link
                      href={`/rooms/${slug}`}
                      className="btn-secondary w-full py-2.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 group-hover:bg-[#18181b] group-hover:text-white group-hover:border-[#18181b] transition-all"
                    >
                      <span>Explore {category.name} Suite</span>
                      <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Bespoke Room Planning Banner */}
        <section className="container-custom mt-20">
          <div className="rounded-3xl bg-[#f4efe8] border border-[#e5ded4] p-8 sm:p-12 flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="max-w-xl text-left">
              <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                <Sparkles size={13} />
                <span>Interior Coordination</span>
              </span>
              <h3 className="text-2xl sm:text-3xl font-serif text-[#1c1917] mb-2 font-bold">
                Planning an Entire Room or Home Remodel?
              </h3>
              <p className="text-xs sm:text-sm text-[#665e56] leading-relaxed">
                Our Ila Orangun design team creates matching timber finishes, coordinated upholstery palettes, and dimensional layouts tailored for your specific blueprints.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="/contact" className="btn-primary py-3 px-6 rounded-xl text-xs sm:text-sm">
                Book Spatial Consultation
              </Link>
              <Link href="/shop" className="btn-secondary py-3 px-6 rounded-xl text-xs sm:text-sm">
                Browse Full Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

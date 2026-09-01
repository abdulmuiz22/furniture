"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { COLLECTIONS } from "@/data/furnitureData";
import { ChevronRight, ArrowRight, Sparkles, CheckCircle2 } from "lucide-react";

export default function CollectionsDirectoryPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Banner */}
        <section className="bg-[#18181b] text-white py-14 sm:py-20 border-b border-[#27272a]">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-xs text-[#a1a1aa] mb-4">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-white">Curated Collections</span>
            </nav>

            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#d49753] mb-2">
                <Sparkles size={13} />
                <span>Editorial Design Suites</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-white tracking-tight mb-3">
                Curated Collections
              </h1>
              <p className="text-xs sm:text-sm text-[#d4d4d8] leading-relaxed">
                Explore distinct design narratives meticulously coordinated for material synergy, architectural balance, and luxurious tactile comfort.
              </p>
            </div>
          </div>
        </section>

        {/* Collections Editorial Grid */}
        <section className="container-custom pt-12 sm:pt-16">
          <div className="space-y-12">
            {COLLECTIONS.map((col, idx) => {
              const isEven = idx % 2 === 1;
              return (
                <div
                  key={col.id}
                  className={`rounded-3xl bg-white border border-[#ede7df] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 grid grid-cols-1 lg:grid-cols-12 items-center`}
                >
                  {/* Imagery */}
                  <div
                    className={`lg:col-span-6 relative aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:h-full min-h-[300px] sm:min-h-[380px] ${
                      isEven ? "lg:order-2" : "lg:order-1"
                    }`}
                  >
                    <Image
                      src={col.image}
                      alt={col.title}
                      fill
                      sizes="(max-width: 1024px) 100vw, 50vw"
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-xs font-bold border border-white/20">
                        {col.tag}
                      </span>
                    </div>
                  </div>

                  {/* Text Content */}
                  <div
                    className={`lg:col-span-6 p-8 sm:p-12 ${
                      isEven ? "lg:order-1" : "lg:order-2"
                    } space-y-5`}
                  >
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#b37e44] block mb-1">
                        {col.subtitle}
                      </span>
                      <h2 className="text-2xl sm:text-3xl font-serif text-[#1c1917] tracking-tight">
                        {col.title}
                      </h2>
                    </div>

                    <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                      {col.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-2 pt-2 border-t border-[#f4efe8]">
                      {col.highlights.map((h, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-[#27272a] font-medium">
                          <CheckCircle2 size={14} className="text-[#b37e44] flex-shrink-0" />
                          <span>{h}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-3">
                      <Link
                        href={`/collections/${col.slug}`}
                        className="btn-primary inline-flex items-center gap-2 py-3 px-6 rounded-xl text-xs sm:text-sm"
                      >
                        <span>Explore {col.title}</span>
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* Consultation Callout */}
        <section className="container-custom mt-20">
          <div className="rounded-3xl bg-[#f5efe8] border border-[#e8ded2] p-8 sm:p-12 text-center max-w-3xl mx-auto">
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-[#1c1917] mb-2">
              Looking for a Bespoke Hybrid Concept?
            </h3>
            <p className="text-xs sm:text-sm text-[#665e56] leading-relaxed mb-6 max-w-xl mx-auto">
              You can combine finishes from Minimalist Essentials with proportions from Signature Suites. Our Ila Orangun artisans tailor every piece to order.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link href="/contact" className="btn-primary py-2.5 px-6 rounded-xl text-xs sm:text-sm">
                Book Consultation
              </Link>
              <Link href="/shop" className="btn-secondary py-2.5 px-6 rounded-xl text-xs sm:text-sm">
                Shop Full Catalog
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

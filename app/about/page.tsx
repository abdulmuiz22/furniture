"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ChevronRight,
  Sparkles,
  Award,
  Compass,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  Clock,
  ArrowRight,
  Hammer,
  TreePine,
  Layers,
  HeartHandshake,
} from "lucide-react";

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Hero Header */}
        <section className="bg-[#f6f1eb] border-b border-[#e8ded2] py-12 sm:py-20">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-xs text-[#78716c] mb-4">
              <Link href="/" className="hover:text-[#b37e44] transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-[#1c1917]">About Sassy Furniture</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                <Sparkles size={13} />
                <span>Our Heritage &amp; Craft</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight mb-4">
                Modern Furniture, Handcrafted For Longevity
              </h1>
              <p className="text-sm sm:text-base text-[#5c564f] leading-relaxed">
                Founded with a passion for timeless silhouettes and authentic materials, Sassy Furniture unites traditional artisan joinery with contemporary architectural design. Located in <strong>Ila Orangun, Osun State</strong>, we create pieces designed to endure for generations.
              </p>
            </div>
          </div>
        </section>

        {/* Brand Story & Imagery Collage */}
        <section className="container-custom py-16 sm:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Imagery */}
            <div className="lg:col-span-6 relative">
              <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-xl border border-[#e5ded4]">
                <Image
                  src="/images/cat-living-room.jpg"
                  alt="Sassy Furniture Workshop & Showroom"
                  fill
                  priority
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover"
                />
              </div>

              {/* Floating Badge */}
              <div className="absolute -bottom-6 -right-4 sm:right-6 bg-white rounded-2xl p-5 shadow-2xl border border-[#ede7df] max-w-[240px]">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44]">
                    <Award size={24} />
                  </div>
                  <div>
                    <h4 className="text-sm font-bold text-[#1c1917]">100% Bespoke</h4>
                    <p className="text-xs text-[#78716c]">Crafted in Ila Orangun</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Text */}
            <div className="lg:col-span-6 space-y-6">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b37e44] block mb-2">
                  Our Philosophy
                </span>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif text-[#1c1917] tracking-tight leading-tight mb-4">
                  Where Natural Timber Meets Tactile Luxury
                </h2>
                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed mb-4">
                  At <strong>Sassy Furniture</strong>, we believe furniture shouldn’t just fill a room — it should transform how you feel inside it. Every sofa, dining table, and bedframe begins with sustainably sourced, kiln-dried seasoned hardwood.
                </p>
                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                  Located at <strong>Number 15 Ajegunle, Ila Orangun, Osun State</strong>, our atelier is home to skilled woodworkers, master upholsterers, and design consultants who take pride in precision joinery, rich natural wood grain preservation, and tailored fabric swatches.
                </p>
              </div>

              {/* 4 Value Pillars */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <TreePine size={18} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917]">Seasoned Hardwood</h4>
                    <p className="text-[11px] text-[#78716c] mt-0.5">Kiln-dried solid oak, teak, & beechwood framing</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <Layers size={18} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917]">Tactile Upholstery</h4>
                    <p className="text-[11px] text-[#78716c] mt-0.5">Pure linen, ivory bouclé, & velvet fabrics</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <ShieldCheck size={18} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917]">5-Year Warranty</h4>
                    <p className="text-[11px] text-[#78716c] mt-0.5">Full structural durability guarantee</p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5 p-3.5 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <HeartHandshake size={18} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917]">24/7 Concierge</h4>
                    <p className="text-[11px] text-[#78716c] mt-0.5">Direct design consultations anytime</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Bespoke Custom Process Step-by-Step */}
        <section className="w-full bg-white border-y border-[#eee8df] py-16 sm:py-24">
          <div className="container-custom">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b37e44] block mb-2">
                How We Work
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1c1917] tracking-tight mb-3">
                The Bespoke Crafting Journey
              </h2>
              <p className="text-xs sm:text-sm text-[#78716c]">
                From your initial spatial sketches to white-glove setup in your home.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Step 1 */}
              <div className="p-6 rounded-3xl bg-[#faf7f2] border border-[#ede5da] relative">
                <span className="text-3xl font-serif font-bold text-[#b37e44]/40 block mb-3">01</span>
                <h3 className="text-base font-serif font-bold text-[#1c1917] mb-2">Spatial Consultation</h3>
                <p className="text-xs text-[#665e56] leading-relaxed">
                  We review your room dimensions, floor plans, and color preferences to recommend optimal silhouettes and layout proportions.
                </p>
              </div>

              {/* Step 2 */}
              <div className="p-6 rounded-3xl bg-[#faf7f2] border border-[#ede5da] relative">
                <span className="text-3xl font-serif font-bold text-[#b37e44]/40 block mb-3">02</span>
                <h3 className="text-base font-serif font-bold text-[#1c1917] mb-2">Material Curation</h3>
                <p className="text-xs text-[#665e56] leading-relaxed">
                  Select from natural oak or teak timber grains, brushed brass accents, and premium fabric swatches (bouclé, linen, velvet).
                </p>
              </div>

              {/* Step 3 */}
              <div className="p-6 rounded-3xl bg-[#faf7f2] border border-[#ede5da] relative">
                <span className="text-3xl font-serif font-bold text-[#b37e44]/40 block mb-3">03</span>
                <h3 className="text-base font-serif font-bold text-[#1c1917] mb-2">Artisan Hand-Joinery</h3>
                <p className="text-xs text-[#665e56] leading-relaxed">
                  Our master woodworkers and upholsterers build your piece with precision mortise-and-tenon joinery and multi-layer high-resilience foam.
                </p>
              </div>

              {/* Step 4 */}
              <div className="p-6 rounded-3xl bg-[#faf7f2] border border-[#ede5da] relative">
                <span className="text-3xl font-serif font-bold text-[#b37e44]/40 block mb-3">04</span>
                <h3 className="text-base font-serif font-bold text-[#1c1917] mb-2">Setup &amp; 5-Yr Warranty</h3>
                <p className="text-xs text-[#665e56] leading-relaxed">
                  Your finished furniture is thoroughly inspected, delivered, and backed by our comprehensive 5-year structural warranty.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Workshop Location & CTA Section */}
        <section className="container-custom mt-20">
          <div className="rounded-3xl bg-[#18181b] text-white p-8 sm:p-14 flex flex-col lg:flex-row items-center justify-between gap-10 border border-[#27272a]">
            <div className="max-w-xl space-y-4 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#d49753] block">
                Visit Our Showroom &amp; Workshop
              </span>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                Experience Handcrafted Elegance in Person
              </h2>
              <p className="text-xs sm:text-sm text-[#a1a1aa] leading-relaxed">
                Visit us at <strong>Number 15 Ajegunle, Ila Orangun, Osun State, Nigeria</strong>. Feel our fabric textures, test seat depths, and discuss your interior vision with our design team.
              </p>
              <div className="flex items-center gap-2 text-xs text-[#d49753] font-medium pt-1">
                <Clock size={14} />
                <span>Open 24/7 for Direct Inquiries &amp; Scheduled Showroom Visits</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3.5 w-full lg:w-auto">
              <Link
                href="/contact"
                className="btn-primary py-3.5 px-7 rounded-xl text-xs sm:text-sm font-semibold w-full sm:w-auto text-center"
              >
                Schedule Private Viewing
              </Link>
              <a
                href="https://wa.me/2348130575312"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary py-3.5 px-7 rounded-xl text-xs sm:text-sm font-semibold w-full sm:w-auto text-center bg-[#27272a] text-white border-[#3f3f46] hover:bg-[#3f3f46]"
              >
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

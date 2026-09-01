"use client";

import React, { useState } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Mail, Check } from "lucide-react";

export default function Footer() {
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail) {
      setSubscribed(true);
      setNewsletterEmail("");
    }
  };

  return (
    <footer className="w-full bg-[#18181b] text-[#a1a1aa]">
      {/* "Stay Inspired" Newsletter Banner matching screenshot */}
      <div className="container-custom pt-8 pb-10">
        <div className="rounded-3xl bg-[#f2ebe1] text-[#1c1917] p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Left: Icon & Text */}
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-full bg-[#b37e44] text-white flex items-center justify-center flex-shrink-0 shadow-sm">
              <Mail size={22} />
            </div>
            <div>
              <h3 className="text-base sm:text-lg font-serif font-bold text-[#1c1917] tracking-tight">
                Stay Inspired
              </h3>
              <p className="text-xs sm:text-[13px] text-[#78716c] mt-0.5">
                Get updates on new collections, craftsmanship stories, and interior ideas.
              </p>
            </div>
          </div>

          {/* Right: Email Input & Subscribe Button */}
          <div className="w-full md:w-auto min-w-[300px] sm:min-w-[360px] max-w-md">
            {subscribed ? (
              <div className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-[#15803d] text-xs font-semibold shadow-xs">
                <Check size={16} />
                <span>Thank you for subscribing to Sassy Furniture!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex items-center gap-2">
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-lg bg-white border border-[#ded5c8] text-[#1c1917] placeholder:text-[#a1a1aa] focus:outline-none focus:border-[#b37e44] shadow-2xs"
                />
                <button
                  type="submit"
                  className="btn-primary text-xs sm:text-sm py-2.5 px-5 rounded-lg whitespace-nowrap cursor-pointer shadow-sm"
                >
                  Subscribe
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Main Footer Links matching 5-column layout */}
      <div className="container-custom py-10 sm:py-14 border-t border-[#27272a]">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-1 space-y-4">
            <Link href="/" className="inline-block">
              <Logo variant="dark" />
            </Link>
            <p className="text-xs text-[#a1a1aa] leading-relaxed">
              We help you create beautiful, functional spaces with high-quality furniture and timeless designs.
            </p>
            {/* Social Icons matching available platforms */}
            <div className="flex items-center gap-2.5 pt-1 text-[#d4d4d8]">
              {/* X (formerly Twitter) */}
              <a
                href="https://x.com/sassyfurniture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Sassy Furniture on X"
                title="X (Twitter) - @sassyfurniture"
                className="w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              {/* TikTok */}
              <a
                href="http://tiktok.com/@sassy_furniture"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Sassy Furniture on TikTok"
                title="TikTok - @sassy_furniture"
                className="w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.51a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15.2a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V9.05a8.27 8.27 0 0 0 4.76 1.48V7.08a4.83 4.83 0 0 1-1-.39z" />
                </svg>
              </a>
              {/* Instagram */}
              <a
                href="https://www.instagram.com/sassyfurniture312?igsi=MWNudW1jY3VxbGh4Mw=="
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Sassy Furniture on Instagram"
                title="Instagram - @sassyfurniture312"
                className="w-8 h-8 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center transition-colors shadow-xs"
              >
                <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide uppercase">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><Link href="/" className="hover:text-[#b37e44] transition-colors">Home</Link></li>
              <li><Link href="/shop" className="hover:text-[#b37e44] transition-colors">Shop Catalog</Link></li>
              <li><Link href="/rooms" className="hover:text-[#b37e44] transition-colors">Rooms &amp; Categories</Link></li>
              <li><Link href="/collections" className="hover:text-[#b37e44] transition-colors">Curated Collections</Link></li>
              <li><Link href="/saved" className="hover:text-[#b37e44] transition-colors">Saved Favorites</Link></li>
              <li><Link href="/contact" className="hover:text-[#b37e44] transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Client Care & Services */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide uppercase">Bespoke Services</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><Link href="/contact" className="hover:text-[#b37e44] transition-colors">Consultation Booking</Link></li>
              <li><Link href="/about" className="hover:text-[#b37e44] transition-colors">Custom Design Process</Link></li>
              <li><Link href="/about" className="hover:text-[#b37e44] transition-colors">Timber &amp; Craftsmanship</Link></li>
              <li><Link href="/contact" className="hover:text-[#b37e44] transition-colors">Showroom Visits</Link></li>
              <li><Link href="/admin" className="hover:text-[#b37e44] transition-colors">Admin Portal</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide uppercase">Information</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><Link href="/about" className="hover:text-[#b37e44] transition-colors">About Sassy Furniture</Link></li>
              <li><Link href="/rooms/living-room" className="hover:text-[#b37e44] transition-colors">Living Room Suites</Link></li>
              <li><Link href="/rooms/bedroom" className="hover:text-[#b37e44] transition-colors">Bedroom Collections</Link></li>
              <li><Link href="/collections/minimalist-essentials" className="hover:text-[#b37e44] transition-colors">Minimalist Essentials</Link></li>
              <li><Link href="/contact" className="hover:text-[#b37e44] transition-colors">FAQs &amp; Inquiries</Link></li>
            </ul>
          </div>

          {/* Column 4: Contact Us */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Contact Us</h4>
            <div className="space-y-2.5 text-xs text-[#a1a1aa]">
              <p className="flex items-start gap-2">
                <span className="text-[#b37e44] mt-0.5">📍</span>
                <span>Number 15 Ajegunle, Ila Orangun, Osun State, Nigeria</span>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#b37e44]">📞</span>
                <a href="tel:08130575312" className="hover:text-white transition-colors">
                  08130575312
                </a>
              </p>
              <p className="flex items-center gap-2">
                <span className="text-[#b37e44]">✉️</span>
                <a href="mailto:salawudeenhammed117@gmail.com" className="hover:text-white transition-colors break-all">
                  salawudeenhammed117@gmail.com
                </a>
              </p>
              <p className="flex items-center gap-2 text-[11px] text-[#71717a]">
                <span className="text-[#b37e44]">⏰</span>
                <span>24/7 Inquiries &amp; Showroom Visits</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#27272a] bg-[#141416] py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717a]">
          <p>© 2024 Sassy Furniture. All Rights Reserved.</p>
          <div className="flex items-center gap-2 text-xs text-[#a1a1aa] font-medium">
            <span className="text-[#b37e44]">✨</span>
            <span>Handcrafted Bespoke Furniture &bull; Ila Orangun, Osun State</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

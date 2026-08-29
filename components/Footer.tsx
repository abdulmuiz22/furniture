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
                Get updates on new arrivals, offers and interior ideas.
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
            {/* Social Icons matching screenshot */}
            <div className="flex items-center gap-3 pt-1 text-[#d4d4d8]">
              {/* Facebook */}
              <a
                href="#"
                aria-label="Facebook"
                className="w-7 h-7 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center text-[11px] font-bold transition-colors"
              >
                f
              </a>
              {/* Instagram */}
              <a
                href="#"
                aria-label="Instagram"
                className="w-7 h-7 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center text-[11px] font-bold transition-colors"
              >
                ig
              </a>
              {/* Pinterest */}
              <a
                href="#"
                aria-label="Pinterest"
                className="w-7 h-7 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center text-[11px] font-bold transition-colors"
              >
                p
              </a>
              {/* YouTube */}
              <a
                href="#"
                aria-label="YouTube"
                className="w-7 h-7 rounded-full bg-[#27272a] hover:bg-[#b37e44] text-white flex items-center justify-center text-[11px] font-bold transition-colors"
              >
                yt
              </a>
            </div>
          </div>

          {/* Column 1: Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Quick Links</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#best-sellers" className="hover:text-white transition-colors">Shop</Link></li>
              <li><Link href="#categories" className="hover:text-white transition-colors">Rooms</Link></li>
              <li><Link href="#promos" className="hover:text-white transition-colors">Collections</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Contact Us</Link></li>
            </ul>
          </div>

          {/* Column 2: Customer Service */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Customer Service</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><Link href="#" className="hover:text-white transition-colors">Help Center</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Shipping & Delivery</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Returns & Refunds</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Terms & Conditions</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Column 3: Information */}
          <div className="space-y-3">
            <h4 className="text-xs font-semibold text-white tracking-wide">Information</h4>
            <ul className="space-y-2 text-xs text-[#a1a1aa]">
              <li><Link href="#about" className="hover:text-white transition-colors">About Us</Link></li>
              <li><Link href="#contact" className="hover:text-white transition-colors">Our Showroom</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Careers</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">Press</Link></li>
              <li><Link href="#" className="hover:text-white transition-colors">FAQs</Link></li>
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
                <span>24/7 Inquiries & Orders</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar matching screenshot */}
      <div className="border-t border-[#27272a] bg-[#141416] py-5">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#71717a]">
          <p>© 2024 Sassy Furniture. All Rights Reserved.</p>
          <div className="flex items-center gap-3">
            {/* VISA */}
            <span className="text-white font-bold tracking-wider text-xs px-2 py-0.5 rounded bg-[#27272a]">
              VISA
            </span>
            {/* Mastercard Badge */}
            <div className="flex items-center gap-1 px-2 py-0.5 rounded bg-[#27272a]">
              <div className="w-3 h-3 rounded-full bg-[#eb001b]" />
              <div className="w-3 h-3 rounded-full bg-[#f79e1b] -ml-2 mix-blend-screen" />
            </div>
            {/* Verve Badge */}
            <span className="text-[#009ee2] font-extrabold text-xs px-2 py-0.5 rounded bg-[#27272a]">
              Verve
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}

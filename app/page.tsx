"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ShopProvider } from "@/context/ShopContext";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeatureBar from "@/components/FeatureBar";
import CategoryGrid from "@/components/CategoryGrid";
import PromoBanners from "@/components/PromoBanners";
import BestSellers from "@/components/BestSellers";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

// Dynamically import client-only overlays to minimize initial page bundle
const ProductDetailModal = dynamic(() => import("@/components/ProductDetailModal"), { ssr: false });
const SearchModal = dynamic(() => import("@/components/SearchModal"), { ssr: false });
const Toast = dynamic(() => import("@/components/Toast"), { ssr: false });

export default function Home() {
  return (
    <ShopProvider>
      <div className="min-h-screen flex flex-col bg-[#fcfbfa] selection:bg-[#c48a48]/20 selection:text-[#8c5d28]">
        {/* Top Announcement Bar */}
        <TopBar />

        {/* Brand Navigation Bar */}
        <Navbar />

        {/* Main Content matching exact screenshot sequence */}
        <main className="flex-1">
          {/* Hero Section */}
          <HeroSection />

          {/* 4 Feature Value Props */}
          <FeatureBar />

          {/* Shop By Category */}
          <CategoryGrid />

          {/* 2 Big Promotional Banners */}
          <PromoBanners />

          {/* Best Sellers Grid */}
          <BestSellers />

          {/* About Sassy Furniture */}
          <AboutSection />

          {/* Contact, Showroom & 24/7 Consultation */}
          <ContactSection />
        </main>

        {/* Footer with Stay Inspired Banner */}
        <Footer />

        {/* Product Contact Modal & Overlays */}
        <ProductDetailModal />
        <SearchModal />
        <Toast />
      </div>
    </ShopProvider>
  );
}

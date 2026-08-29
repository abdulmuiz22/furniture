"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import { Search, User, ShoppingBag, ChevronDown, Menu, X, Shield } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function Navbar() {
  const { setIsSearchOpen, setSelectedCategory, wishlist } = useShop();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
    setActiveDropdown(null);
    setMobileMenuOpen(false);
    const element = document.getElementById("best-sellers");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <header
      className={`w-full sticky top-0 z-40 transition-all duration-200 bg-white ${
        isScrolled ? "shadow-sm border-b border-[#eae4da]" : "border-b border-[#f0ebe3]"
      }`}
    >
      <div className="container-custom flex items-center justify-between h-[70px] relative">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center">
          <Logo />
        </Link>

        {/* Center Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-7 text-[0.875rem] font-medium text-[#2d2d30]">
          <Link
            href="/"
            className="text-[#b37e44] font-semibold transition-colors hover:text-[#9c6b35]"
          >
            Home
          </Link>
          <button
            onClick={() => handleCategorySelect("All")}
            className="hover:text-[#b37e44] transition-colors font-medium text-[0.875rem] text-[#2d2d30] cursor-pointer"
          >
            Shop
          </button>

          {/* Rooms Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("rooms")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#b37e44] transition-colors py-2 cursor-pointer">
              <span>Rooms</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  activeDropdown === "rooms" ? "rotate-180 text-[#b37e44]" : "text-[#71717a]"
                }`}
              />
            </button>

            {activeDropdown === "rooms" && (
              <div className="absolute top-full left-0 w-48 bg-white rounded-xl shadow-xl border border-[#ede7df] py-2 animate-fade-in z-50">
                {["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor", "Decor & Lighting"].map(
                  (room) => (
                    <button
                      key={room}
                      onClick={() => handleCategorySelect(room)}
                      className="w-full text-left block px-4 py-2 text-xs text-[#3f3f46] hover:bg-[#fbf7f2] hover:text-[#b37e44] transition-colors"
                    >
                      {room}
                    </button>
                  )
                )}
              </div>
            )}
          </div>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("collections")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <button className="flex items-center gap-1 hover:text-[#b37e44] transition-colors py-2 cursor-pointer">
              <span>Collections</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  activeDropdown === "collections" ? "rotate-180 text-[#b37e44]" : "text-[#71717a]"
                }`}
              />
            </button>

            {activeDropdown === "collections" && (
              <div className="absolute top-full left-0 w-52 bg-white rounded-xl shadow-xl border border-[#ede7df] py-2 animate-fade-in z-50">
                <Link
                  href="#promos"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 text-xs text-[#3f3f46] hover:bg-[#fbf7f2] hover:text-[#b37e44]"
                >
                  Minimalist Essentials
                </Link>
                <Link
                  href="#promos"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 text-xs text-[#3f3f46] hover:bg-[#fbf7f2] hover:text-[#b37e44]"
                >
                  Up to 30% Off Sale
                </Link>
                <Link
                  href="#best-sellers"
                  onClick={() => setActiveDropdown(null)}
                  className="block px-4 py-2 text-xs text-[#3f3f46] hover:bg-[#fbf7f2] hover:text-[#b37e44]"
                >
                  Best Sellers 2024
                </Link>
              </div>
            )}
          </div>

          <Link href="#about" className="hover:text-[#b37e44] transition-colors">
            About Us
          </Link>
          <Link href="#contact" className="hover:text-[#b37e44] transition-colors">
            Contact
          </Link>
        </nav>

        {/* Right Icon Actions matching screenshot */}
        <div className="flex items-center gap-3 sm:gap-4 text-[#27272a]">
          {/* Search Trigger */}
          <button
            onClick={() => setIsSearchOpen(true)}
            aria-label="Search products"
            className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f8f5f0] hover:text-[#b37e44] transition-colors cursor-pointer"
          >
            <Search size={18} strokeWidth={1.8} />
          </button>

          {/* User Account / Admin Popover */}
          <div className="relative">
            <button
              onClick={() => setAccountMenuOpen(!accountMenuOpen)}
              aria-label="User Account"
              className="w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f8f5f0] hover:text-[#b37e44] transition-colors cursor-pointer"
            >
              <User size={18} strokeWidth={1.8} />
            </button>

            {accountMenuOpen && (
              <div className="absolute right-0 top-11 w-56 bg-white rounded-xl shadow-xl border border-[#ede7df] p-3 animate-fade-in z-50">
                <div className="border-b border-[#f0ebe4] pb-2 mb-2">
                  <p className="text-[11px] text-[#71717a]">Sassy Concierge</p>
                  <p className="text-xs font-semibold text-[#18181b] truncate">Client Account</p>
                </div>
                <div className="space-y-1 text-xs text-[#3f3f46]">
                  <Link
                    href="/admin"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-[#fbf7f2] text-[#b37e44] font-semibold"
                  >
                    <Shield size={13} />
                    <span>Admin Dashboard</span>
                  </Link>
                  <Link
                    href="#best-sellers"
                    onClick={() => setAccountMenuOpen(false)}
                    className="block px-2 py-1.5 rounded-lg hover:bg-[#fbf7f2] hover:text-[#b37e44]"
                  >
                    Saved Favorites ({wishlist.length})
                  </Link>
                  <Link
                    href="#contact"
                    onClick={() => setAccountMenuOpen(false)}
                    className="block px-2 py-1.5 rounded-lg hover:bg-[#fbf7f2] hover:text-[#b37e44]"
                  >
                    Book Consultation
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Shopping Bag / Saved Pieces with Badge 3 matching design */}
          <Link
            href="#best-sellers"
            aria-label="Showroom pieces"
            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f8f5f0] hover:text-[#b37e44] transition-colors"
          >
            <ShoppingBag size={18} strokeWidth={1.8} />
            <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#18181b] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
              3
            </span>
          </Link>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f8f5f0] text-[#27272a]"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-[#ede7df] px-6 py-5 space-y-4 animate-fade-in">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-semibold text-[#b37e44]"
          >
            Home
          </Link>
          <button
            onClick={() => handleCategorySelect("All")}
            className="block text-left text-sm font-medium text-[#27272a] hover:text-[#b37e44]"
          >
            Shop
          </button>
          <div className="space-y-1.5 pl-3 border-l-2 border-[#b37e44]/30">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-[#a1a1aa]">
              Rooms
            </span>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#52525b]">
              {["Living Room", "Bedroom", "Dining Room", "Office", "Outdoor", "Decor & Lighting"].map(
                (room) => (
                  <button
                    key={room}
                    onClick={() => handleCategorySelect(room)}
                    className="text-left py-1 hover:text-[#b37e44]"
                  >
                    {room}
                  </button>
                )
              )}
            </div>
          </div>
          <Link
            href="#promos"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#27272a] hover:text-[#b37e44]"
          >
            Collections
          </Link>
          <Link
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#27272a] hover:text-[#b37e44]"
          >
            About Us
          </Link>
          <Link
            href="#contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-medium text-[#27272a] hover:text-[#b37e44]"
          >
            Contact
          </Link>
          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#b37e44] pt-2 border-t border-[#f0ebe3]"
          >
            Admin Management Portal &rarr;
          </Link>
        </div>
      )}
    </header>
  );
}

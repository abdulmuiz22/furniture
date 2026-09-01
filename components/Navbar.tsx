"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { Search, User, Heart, ChevronDown, Menu, X, Shield, Sparkles, ArrowRight } from "lucide-react";
import { useShop } from "@/context/ShopContext";

const ROOM_ITEMS = [
  { name: "Living Room", href: "/rooms/living-room", desc: "Plush sofas & accent tables" },
  { name: "Bedroom", href: "/rooms/bedroom", desc: "Platform beds & nightstands" },
  { name: "Dining Room", href: "/rooms/dining-room", desc: "Solid oak dining tables & chairs" },
  { name: "Office", href: "/rooms/office", desc: "Ergonomic seating & executive desks" },
  { name: "Outdoor", href: "/rooms/outdoor", desc: "Weatherproof teak lounges" },
  { name: "Decor & Lighting", href: "/rooms/decor-and-lighting", desc: "Ambient lamps & artisan accents" },
];

const COLLECTION_ITEMS = [
  { name: "Minimalist Essentials", href: "/collections/minimalist-essentials", tag: "New Season" },
  { name: "Signature Suites", href: "/collections/signature-suites", tag: "Luxury" },
  { name: "Best Sellers 2024", href: "/collections/best-sellers", tag: "Popular" },
  { name: "Artisan Woodcraft", href: "/collections/artisan-woodcraft", tag: "Heritage" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { setIsSearchOpen, wishlist } = useShop();
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

  // Close menus on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setActiveDropdown(null);
    setAccountMenuOpen(false);
  }, [pathname]);

  const isActive = (path: string) => {
    if (path === "/" && pathname === "/") return true;
    if (path !== "/" && pathname.startsWith(path)) return true;
    return false;
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
            className={`transition-colors py-2 ${
              isActive("/") && pathname === "/"
                ? "text-[#b37e44] font-semibold"
                : "hover:text-[#b37e44]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/shop"
            className={`transition-colors py-2 ${
              isActive("/shop")
                ? "text-[#b37e44] font-semibold"
                : "hover:text-[#b37e44]"
            }`}
          >
            Shop
          </Link>

          {/* Rooms Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("rooms")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/rooms"
              className={`flex items-center gap-1 py-2 transition-colors cursor-pointer ${
                isActive("/rooms")
                  ? "text-[#b37e44] font-semibold"
                  : "hover:text-[#b37e44]"
              }`}
            >
              <span>Rooms</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  activeDropdown === "rooms" ? "rotate-180 text-[#b37e44]" : "text-[#71717a]"
                }`}
              />
            </Link>

            {activeDropdown === "rooms" && (
              <div className="absolute top-full left-0 w-64 bg-white rounded-2xl shadow-2xl border border-[#ede7df] p-2 animate-fade-in z-50">
                <div className="px-3 py-1.5 border-b border-[#f0ebe4] mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa]">
                    Browse Rooms
                  </span>
                  <Link
                    href="/rooms"
                    className="text-[11px] text-[#b37e44] font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <span>All Rooms</span>
                    <ArrowRight size={10} />
                  </Link>
                </div>
                {ROOM_ITEMS.map((room) => (
                  <Link
                    key={room.href}
                    href={room.href}
                    className="w-full text-left block px-3 py-2 rounded-xl text-xs text-[#3f3f46] hover:bg-[#fbf7f2] hover:text-[#b37e44] transition-colors"
                  >
                    <span className="font-semibold block text-[#1c1917]">{room.name}</span>
                    <span className="text-[10px] text-[#78716c]">{room.desc}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Collections Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setActiveDropdown("collections")}
            onMouseLeave={() => setActiveDropdown(null)}
          >
            <Link
              href="/collections"
              className={`flex items-center gap-1 py-2 transition-colors cursor-pointer ${
                isActive("/collections")
                  ? "text-[#b37e44] font-semibold"
                  : "hover:text-[#b37e44]"
              }`}
            >
              <span>Collections</span>
              <ChevronDown
                size={13}
                className={`transition-transform duration-200 ${
                  activeDropdown === "collections" ? "rotate-180 text-[#b37e44]" : "text-[#71717a]"
                }`}
              />
            </Link>

            {activeDropdown === "collections" && (
              <div className="absolute top-full left-0 w-60 bg-white rounded-2xl shadow-2xl border border-[#ede7df] p-2 animate-fade-in z-50">
                <div className="px-3 py-1.5 border-b border-[#f0ebe4] mb-1 flex items-center justify-between">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-[#a1a1aa]">
                    Curated Suites
                  </span>
                  <Link
                    href="/collections"
                    className="text-[11px] text-[#b37e44] font-semibold hover:underline flex items-center gap-0.5"
                  >
                    <span>Explore All</span>
                    <ArrowRight size={10} />
                  </Link>
                </div>
                {COLLECTION_ITEMS.map((col) => (
                  <Link
                    key={col.href}
                    href={col.href}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs text-[#3f3f46] hover:bg-[#fbf7f2] hover:text-[#b37e44] transition-colors"
                  >
                    <span className="font-medium">{col.name}</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-[#f4ede3] text-[#9c6b35] font-semibold">
                      {col.tag}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            className={`transition-colors py-2 ${
              isActive("/about")
                ? "text-[#b37e44] font-semibold"
                : "hover:text-[#b37e44]"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            className={`transition-colors py-2 ${
              isActive("/contact")
                ? "text-[#b37e44] font-semibold"
                : "hover:text-[#b37e44]"
            }`}
          >
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
              <div className="absolute right-0 top-11 w-56 bg-white rounded-2xl shadow-2xl border border-[#ede7df] p-3 animate-fade-in z-50">
                <div className="border-b border-[#f0ebe4] pb-2 mb-2">
                  <p className="text-[11px] text-[#71717a]">Sassy Concierge</p>
                  <p className="text-xs font-semibold text-[#18181b] truncate">Client Account</p>
                </div>
                <div className="space-y-1 text-xs text-[#3f3f46]">
                  <Link
                    href="/saved"
                    onClick={() => setAccountMenuOpen(false)}
                    className="flex items-center justify-between px-2.5 py-2 rounded-xl hover:bg-[#fbf7f2] hover:text-[#b37e44] transition-colors"
                  >
                    <span>Saved Favorites</span>
                    <span className="px-1.5 py-0.5 rounded-full bg-[#f4ede3] text-[#9c6b35] font-bold text-[10px]">
                      {wishlist.length}
                    </span>
                  </Link>
                  <Link
                    href="/contact"
                    onClick={() => setAccountMenuOpen(false)}
                    className="block px-2.5 py-2 rounded-xl hover:bg-[#fbf7f2] hover:text-[#b37e44] transition-colors"
                  >
                    Book Showroom Visit
                  </Link>
                  <div className="pt-1.5 border-t border-[#f0ebe4]">
                    <Link
                      href="/admin"
                      onClick={() => setAccountMenuOpen(false)}
                      className="flex items-center gap-1.5 px-2.5 py-2 rounded-xl hover:bg-[#fbf7f2] text-[#b37e44] font-semibold transition-colors"
                    >
                      <Shield size={13} />
                      <span>Admin Management Portal</span>
                    </Link>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Saved Pieces / Wishlist Badge leading to /saved */}
          <Link
            href="/saved"
            aria-label="View saved pieces"
            className="relative w-9 h-9 rounded-full flex items-center justify-center hover:bg-[#f8f5f0] hover:text-[#b37e44] transition-colors"
          >
            <Heart size={18} strokeWidth={1.8} className={wishlist.length > 0 ? "text-[#b37e44] fill-[#b37e44]/20" : ""} />
            {wishlist.length > 0 && (
              <span className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-[#18181b] text-white text-[10px] font-bold flex items-center justify-center shadow-xs">
                {wishlist.length}
              </span>
            )}
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
        <div className="lg:hidden bg-white border-b border-[#ede7df] px-6 py-5 space-y-4 animate-fade-in max-h-[80vh] overflow-y-auto">
          <Link
            href="/"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm ${
              isActive("/") && pathname === "/"
                ? "font-bold text-[#b37e44]"
                : "font-medium text-[#27272a] hover:text-[#b37e44]"
            }`}
          >
            Home
          </Link>

          <Link
            href="/shop"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm ${
              isActive("/shop")
                ? "font-bold text-[#b37e44]"
                : "font-medium text-[#27272a] hover:text-[#b37e44]"
            }`}
          >
            Shop All Furniture
          </Link>

          {/* Rooms Submenu */}
          <div className="space-y-1.5 pl-3 border-l-2 border-[#b37e44]/30">
            <Link
              href="/rooms"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[11px] uppercase tracking-wider font-semibold text-[#a1a1aa] block hover:text-[#b37e44]"
            >
              Rooms &rarr;
            </Link>
            <div className="grid grid-cols-2 gap-1.5 text-xs text-[#52525b]">
              {ROOM_ITEMS.map((room) => (
                <Link
                  key={room.href}
                  href={room.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-left py-1 hover:text-[#b37e44]"
                >
                  {room.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Collections Submenu */}
          <div className="space-y-1.5 pl-3 border-l-2 border-[#b37e44]/30">
            <Link
              href="/collections"
              onClick={() => setMobileMenuOpen(false)}
              className="text-[11px] uppercase tracking-wider font-semibold text-[#a1a1aa] block hover:text-[#b37e44]"
            >
              Collections &rarr;
            </Link>
            <div className="space-y-1 text-xs text-[#52525b]">
              {COLLECTION_ITEMS.map((col) => (
                <Link
                  key={col.href}
                  href={col.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="block py-0.5 hover:text-[#b37e44]"
                >
                  {col.name}
                </Link>
              ))}
            </div>
          </div>

          <Link
            href="/saved"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-between text-sm font-medium text-[#27272a] hover:text-[#b37e44]"
          >
            <span>Saved Favorites</span>
            <span className="px-2 py-0.5 rounded-full bg-[#f4ede3] text-[#9c6b35] font-bold text-xs">
              {wishlist.length}
            </span>
          </Link>

          <Link
            href="/about"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm ${
              isActive("/about")
                ? "font-bold text-[#b37e44]"
                : "font-medium text-[#27272a] hover:text-[#b37e44]"
            }`}
          >
            About Us
          </Link>

          <Link
            href="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className={`block text-sm ${
              isActive("/contact")
                ? "font-bold text-[#b37e44]"
                : "font-medium text-[#27272a] hover:text-[#b37e44]"
            }`}
          >
            Contact &amp; Showroom
          </Link>

          <Link
            href="/admin"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-sm font-bold text-[#b37e44] pt-3 border-t border-[#f0ebe3] flex items-center gap-1.5"
          >
            <Shield size={14} />
            <span>Admin Management Portal &rarr;</span>
          </Link>
        </div>
      )}
    </header>
  );
}

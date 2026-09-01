"use client";

import React, { useState, useEffect, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import { Product, BEST_SELLERS, getProductByIdOrSlug } from "@/data/furnitureData";
import {
  ChevronRight,
  Heart,
  Star,
  Video,
  Ruler,
  Layers,
  ShieldCheck,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  CheckCircle2,
  Sparkles,
  ArrowLeft,
  ArrowRight,
  Share2,
  Clock,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const router = useRouter();
  const decodedId = decodeURIComponent(id);

  const { isInWishlist, toggleWishlist, showToast, products } = useShop();

  const [product, setProduct] = useState<Product | null>(() => {
    return getProductByIdOrSlug(decodedId, BEST_SELLERS) || null;
  });
  const [isLoading, setIsLoading] = useState<boolean>(!product);
  const [activeMediaTab, setActiveMediaTab] = useState<"image" | "video">("image");

  // Form states
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [clientNotes, setClientNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formError, setFormError] = useState("");

  // Load product from API if not preloaded
  useEffect(() => {
    let ignore = false;
    async function loadProduct() {
      try {
        const res = await fetch(`/api/products/${encodeURIComponent(decodedId)}`);
        if (res.ok) {
          const data = await res.json();
          if (!ignore && data.data) {
            setProduct(data.data);
            if (data.data.mediaType === "video" || (!data.data.image && data.data.video)) {
              setActiveMediaTab("video");
            }
          }
        }
      } catch (err) {
        console.warn("Using cached product:", err);
      } finally {
        if (!ignore) setIsLoading(false);
      }
    }

    loadProduct();
    return () => {
      ignore = true;
    };
  }, [decodedId]);

  // Set default message when product loads
  useEffect(() => {
    if (product && !clientNotes) {
      setClientNotes(
        `Hi Sassy Furniture, I am interested in inquiring about the "${product.name}". Please provide details on custom dimensions, finish options, and consultation.`
      );
    }
  }, [product, clientNotes]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
        <TopBar />
        <Navbar />
        <div className="flex-1 flex items-center justify-center py-24">
          <div className="animate-spin w-8 h-8 border-2 border-[#b37e44] border-t-transparent rounded-full" />
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
        <TopBar />
        <Navbar />
        <div className="flex-1 container-custom py-24 text-center max-w-md mx-auto">
          <h2 className="text-2xl font-serif font-bold text-[#1c1917] mb-3">
            Product Not Found
          </h2>
          <p className="text-xs sm:text-sm text-[#78716c] mb-6">
            The piece you are looking for may have been updated or moved to our custom bespoke archives.
          </p>
          <Link href="/shop" className="btn-primary py-2.5 px-6 rounded-xl text-xs">
            &larr; Browse All Furniture
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const productId = product._id || product.id || product.name;
  const isWishlisted = isInWishlist(productId);
  const hasVideo = Boolean(product.video);

  const whatsappMessage = encodeURIComponent(
    `Hello Sassy Furniture, I am inquiring about the *${product.name}* (${product.category}). Could you provide specifications, lead time, and bespoke options?`
  );
  const whatsappUrl = `https://wa.me/2348130575312?text=${whatsappMessage}`;

  const handleShare = () => {
    if (typeof navigator !== "undefined" && navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      }).catch(() => {});
    } else {
      if (typeof navigator !== "undefined" && navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast("Link copied to clipboard!");
      }
    }
  };

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName || !clientEmail || !clientNotes) {
      setFormError("Please fill out your name, email, and inquiry notes.");
      return;
    }

    setIsSubmitting(true);
    setFormError("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: clientName,
          email: clientEmail,
          phone: clientPhone,
          productName: product.name,
          productId: productId,
          message: clientNotes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        showToast("Inquiry submitted! Our concierge will contact you shortly.");
      } else {
        setFormError(data.error || "Failed to send inquiry. Please try again.");
      }
    } catch {
      setFormError("Network error. Please use direct WhatsApp or call 08130575312.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Related products from the same category
  const relatedProducts = products
    .filter(
      (p) =>
        (p._id || p.id || p.name) !== productId &&
        p.category.toLowerCase() === product.category.toLowerCase()
    )
    .slice(0, 4);

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Breadcrumbs */}
        <section className="border-b border-[#f0ebe3] bg-white py-3.5">
          <div className="container-custom flex items-center justify-between">
            <nav className="flex items-center gap-2 text-xs text-[#78716c] overflow-x-auto no-scrollbar">
              <Link href="/" className="hover:text-[#b37e44] transition-colors whitespace-nowrap">
                Home
              </Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <Link href="/shop" className="hover:text-[#b37e44] transition-colors whitespace-nowrap">
                Shop
              </Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="hover:text-[#b37e44] transition-colors whitespace-nowrap"
              >
                {product.category}
              </Link>
              <ChevronRight size={12} className="flex-shrink-0" />
              <span className="font-semibold text-[#1c1917] truncate">{product.name}</span>
            </nav>

            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 text-xs text-[#71717a] hover:text-[#18181b] p-1.5 rounded-lg hover:bg-[#f8f5f0] transition-colors cursor-pointer"
              title="Share piece"
            >
              <Share2 size={14} />
              <span className="hidden sm:inline">Share</span>
            </button>
          </div>
        </section>

        {/* Product Hero Details Grid */}
        <section className="container-custom pt-8 sm:pt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Left Column: Imagery & Video Viewer */}
            <div className="lg:col-span-7 space-y-4">
              <div className="relative aspect-square sm:aspect-[4/3.5] w-full rounded-3xl overflow-hidden bg-white shadow-md border border-[#ede7df] flex items-center justify-center">
                {activeMediaTab === "video" && product.video ? (
                  <video
                    src={product.video}
                    controls
                    autoPlay
                    playsInline
                    className="w-full h-full object-cover bg-black"
                  />
                ) : (
                  <Image
                    src={product.image || "/images/hero.jpg"}
                    alt={product.name}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 60vw"
                    className="object-cover"
                  />
                )}

                {/* Wishlist floating toggle */}
                <button
                  onClick={() => toggleWishlist(productId)}
                  aria-label="Save piece"
                  className={`absolute top-4 right-4 z-10 w-10 h-10 rounded-full flex items-center justify-center shadow-md transition-all cursor-pointer ${
                    isWishlisted
                      ? "bg-rose-50 text-rose-600 border border-rose-200"
                      : "bg-white/90 backdrop-blur-md text-[#71717a] hover:text-rose-600 hover:bg-white border border-[#e5ded4]"
                  }`}
                >
                  <Heart size={18} className={isWishlisted ? "fill-rose-600 text-rose-600" : ""} />
                </button>
              </div>

              {/* Media Switcher Buttons if video is present */}
              {hasVideo && product.image && (
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab("image")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      activeMediaTab === "image"
                        ? "bg-[#18181b] text-white border-[#18181b]"
                        : "bg-white text-[#52525b] border-[#e2d8ca] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <span>High-Res Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab("video")}
                    className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold border transition-all cursor-pointer ${
                      activeMediaTab === "video"
                        ? "bg-[#b37e44] text-white border-[#b37e44]"
                        : "bg-white text-[#52525b] border-[#e2d8ca] hover:bg-[#faf7f2]"
                    }`}
                  >
                    <Video size={14} />
                    <span>Workshop Video</span>
                  </button>
                </div>
              )}

              {/* Guarantees & Specifications */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <ShieldCheck size={18} className="text-[#b37e44] mb-1.5" />
                  <h4 className="text-xs font-bold text-[#1c1917]">5-Year Warranty</h4>
                  <p className="text-[11px] text-[#78716c] mt-0.5">Kiln-dried hardwood structural guarantee</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <Sparkles size={18} className="text-[#b37e44] mb-1.5" />
                  <h4 className="text-xs font-bold text-[#1c1917]">Bespoke Sizing</h4>
                  <p className="text-[11px] text-[#78716c] mt-0.5">Custom dimensions built for your space</p>
                </div>
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <MapPin size={18} className="text-[#b37e44] mb-1.5" />
                  <h4 className="text-xs font-bold text-[#1c1917]">Ila Orangun Atelier</h4>
                  <p className="text-[11px] text-[#78716c] mt-0.5">Handcrafted in Osun State, Nigeria</p>
                </div>
              </div>
            </div>

            {/* Right Column: Details, Specifications, & Direct Inquiry */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-3 py-1 rounded-full bg-[#f4ede3] text-[#9c6b35] text-xs font-semibold uppercase tracking-wider">
                    {product.category}
                  </span>
                  {product.inStock !== false && (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 text-[11px] font-semibold border border-emerald-200">
                      In-Stock / Ready to Craft
                    </span>
                  )}
                </div>

                <h1 className="text-3xl sm:text-4xl font-serif text-[#1c1917] tracking-tight mb-3">
                  {product.name}
                </h1>

                {/* Rating */}
                <div className="flex items-center gap-2 text-xs mb-4">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} size={13} className="fill-amber-500 text-amber-500" />
                    ))}
                  </div>
                  <span className="font-bold text-[#1c1917]">{product.rating || 4.8}</span>
                  <span className="text-[#78716c]">({product.reviewsCount || 18} Verified Inquiries)</span>
                </div>

                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed mb-6">
                  {product.description}
                </p>
              </div>

              {/* Specifications Box */}
              <div className="rounded-2xl bg-white border border-[#ede7df] p-4 sm:p-5 space-y-3 shadow-2xs">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#1c1917]">
                  Specifications &amp; Materials
                </h3>
                {product.dimensions && (
                  <div className="flex items-start gap-2.5 text-xs text-[#52525b]">
                    <Ruler size={15} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c1917]">Standard Dimensions:</strong> {product.dimensions}
                    </div>
                  </div>
                )}
                {product.material && (
                  <div className="flex items-start gap-2.5 text-xs text-[#52525b]">
                    <Layers size={15} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                    <div>
                      <strong className="text-[#1c1917]">Materials &amp; Finish:</strong> {product.material}
                    </div>
                  </div>
                )}
                <div className="flex items-start gap-2.5 text-xs text-[#52525b]">
                  <Clock size={15} className="text-[#b37e44] flex-shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-[#1c1917]">Crafting Lead Time:</strong> 7 - 14 Days (Bespoke custom orders)
                  </div>
                </div>
              </div>

              {/* Direct Instant Contact Actions */}
              <div className="space-y-3">
                <p className="text-xs font-semibold text-[#27272a] uppercase tracking-wider">
                  Direct Inquiries &amp; Showroom Consultation:
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-bold text-xs transition-colors border border-[#25D366]/30 shadow-2xs"
                  >
                    <MessageSquare size={16} className="text-[#25D366]" />
                    <span>Inquire on WhatsApp</span>
                  </a>
                  <a
                    href="tel:08130575312"
                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-[#f8f5f0] hover:bg-[#f2ece2] text-[#27272a] font-bold text-xs transition-colors border border-[#ebdccb] shadow-2xs"
                  >
                    <Phone size={15} className="text-[#b37e44]" />
                    <span>Call 08130575312</span>
                  </a>
                </div>
              </div>

              {/* Dedicated Consultation Request Form */}
              <div className="rounded-3xl bg-[#faf7f2] border border-[#ede5da] p-6 shadow-sm">
                <h3 className="text-sm font-serif font-bold text-[#1c1917] mb-1">
                  Request Custom Quote or Fabric Swatches
                </h3>
                <p className="text-xs text-[#78716c] mb-4">
                  Send an inquiry to our master artisans for spatial advice, wood swatches, and custom pricing.
                </p>

                {isSubmitted ? (
                  <div className="bg-[#f0f9f3] border border-[#a3e0b5] rounded-2xl p-5 text-center space-y-2 animate-fade-in">
                    <CheckCircle2 size={32} className="text-[#15803d] mx-auto" />
                    <h4 className="text-sm font-bold text-[#15803d]">Consultation Request Received</h4>
                    <p className="text-xs text-[#166534]">
                      Thank you! Our concierge will review your inquiry for <strong>{product.name}</strong> and contact you within 2-4 hours.
                    </p>
                    <button
                      onClick={() => setIsSubmitted(false)}
                      className="text-xs text-[#15803d] font-semibold underline mt-2 hover:text-[#14532d]"
                    >
                      Send another request
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmitInquiry} className="space-y-3">
                    {formError && (
                      <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                        {formError}
                      </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your Full Name *"
                        required
                        value={clientName}
                        onChange={(e) => setClientName(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                      />
                      <input
                        type="email"
                        placeholder="Email Address *"
                        required
                        value={clientEmail}
                        onChange={(e) => setClientEmail(e.target.value)}
                        className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                      />
                    </div>

                    <input
                      type="tel"
                      placeholder="Phone / WhatsApp Number (e.g. 08130575312)"
                      value={clientPhone}
                      onChange={(e) => setClientPhone(e.target.value)}
                      className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                    />

                    <textarea
                      rows={3}
                      placeholder="Your custom sizing, preferred fabrics, or delivery location..."
                      required
                      value={clientNotes}
                      onChange={(e) => setClientNotes(e.target.value)}
                      className="w-full px-3.5 py-2 text-xs rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917] resize-none"
                    />

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full btn-primary text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 font-semibold shadow-xs"
                    >
                      <Send size={13} />
                      <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry to Concierge"}</span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Related Products Section */}
        {relatedProducts.length > 0 && (
          <section className="container-custom mt-20 pt-12 border-t border-[#ede5da]">
            <div className="flex items-center justify-between mb-8">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-[#b37e44] block mb-1">
                  Complementary Pieces
                </span>
                <h2 className="text-2xl font-serif text-[#1c1917] tracking-tight">
                  More in {product.category}
                </h2>
              </div>
              <Link
                href={`/shop?category=${encodeURIComponent(product.category)}`}
                className="group inline-flex items-center gap-1 text-xs font-medium text-[#78716c] hover:text-[#b37e44] transition-colors"
              >
                <span>View All {product.category}</span>
                <ArrowRight size={13} className="transition-transform group-hover:translate-x-1" />
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
              {relatedProducts.map((rel) => {
                const relId = rel._id || rel.id || rel.name;
                const isRelWish = isInWishlist(relId);
                return (
                  <Link
                    key={relId}
                    href={`/products/${encodeURIComponent(relId)}`}
                    className="group flex flex-col justify-between bg-white rounded-2xl p-3 border border-[#ede7df] hover:border-[#dfd7cc] hover:shadow-md transition-all cursor-pointer"
                  >
                    <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-[#faf7f2]">
                      <Image
                        src={rel.image || "/images/hero.jpg"}
                        alt={rel.name}
                        fill
                        sizes="(max-width: 768px) 50vw, 25vw"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                    <div className="mt-2.5">
                      <h4 className="text-xs sm:text-sm font-semibold text-[#1c1917] group-hover:text-[#b37e44] transition-colors truncate">
                        {rel.name}
                      </h4>
                      <p className="text-[11px] text-[#78716c] truncate mt-0.5">
                        {rel.material || rel.category}
                      </p>
                      <div className="flex items-center justify-between mt-2 pt-1 border-t border-[#f4efe8] text-[11px]">
                        <span className="font-semibold text-[#27272a]">★ {rel.rating || 4.8}</span>
                        <span className="text-[#b37e44] font-semibold group-hover:underline">View Piece &rarr;</span>
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

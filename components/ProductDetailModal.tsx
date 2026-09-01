"use client";

import React, { useState } from "react";
import Image from "next/image";
import { X, Phone, MessageSquare, Send, CheckCircle2, Heart, Sparkles, Ruler, Layers, ShieldCheck, MapPin } from "lucide-react";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/data/furnitureData";

function ProductDetailModalContent({
  product,
  onClose,
  isInWishlist,
  toggleWishlist,
  showToast,
}: {
  product: Product;
  onClose: () => void;
  isInWishlist: (productId: string) => boolean;
  toggleWishlist: (productId: string) => void;
  showToast: (msg: string) => void;
}) {
  const productId = product._id || product.id || product.name;
  const isWishlisted = isInWishlist(productId);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notes, setNotes] = useState(
    `Hi Sassy Furniture, I am interested in inquiring about the "${product.name}". Please provide details on custom dimensions, finish options, and consultation.`
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const whatsappNumber = "2348130575312";
  const whatsappMessage = encodeURIComponent(
    `Hello Sassy Furniture, I am inquiring about the *${product.name}* (${product.category}). Could you provide detailed specifications, fabric swatches, and bespoke custom options?`
  );
  const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  const handleSubmitInquiry = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !notes) {
      setErrorMessage("Please complete your name, email, and message.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          productName: product.name,
          productId: product._id || product.id || "",
          message: notes,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        showToast("Inquiry submitted! Our concierge will contact you shortly.");
      } else {
        setErrorMessage(data.error || "Failed to submit inquiry. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please try again or use direct WhatsApp.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const hasVideo = Boolean(product.video);
  const [activeMediaTab, setActiveMediaTab] = useState<"image" | "video">(
    product.mediaType === "video" || (!product.image && hasVideo) ? "video" : "image"
  );

  return (
    <div
      className="relative w-full max-w-4xl bg-white rounded-3xl shadow-2xl border border-[#ede7df] overflow-hidden my-auto max-h-[92vh] flex flex-col md:flex-row"
      onClick={(e) => e.stopPropagation()}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-[#52525b] hover:text-[#18181b] hover:bg-white flex items-center justify-center shadow-md transition-colors cursor-pointer"
        aria-label="Close modal"
      >
        <X size={18} />
      </button>

      {/* Left Side: Product Imagery & Badges */}
      <div className="w-full md:w-1/2 bg-[#faf7f2] p-6 sm:p-8 flex flex-col justify-between relative border-b md:border-b-0 md:border-r border-[#ece5da]">
        <div>
          {/* Badges & Media Switcher */}
          <div className="flex items-center justify-between gap-2 mb-4">
            <div className="flex items-center gap-1.5">
              <span className="px-3 py-1 rounded-full bg-[#f2e7d8] text-[#9c6b35] text-xs font-semibold uppercase tracking-wider">
                {product.category}
              </span>

              {hasVideo && product.image && (
                <div className="flex items-center rounded-full bg-white p-0.5 border border-[#e2d8ca]">
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab("image")}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                      activeMediaTab === "image"
                        ? "bg-[#18181b] text-white"
                        : "text-[#71717a] hover:text-[#18181b]"
                    }`}
                  >
                    Photo
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveMediaTab("video")}
                    className={`px-2 py-0.5 rounded-full text-[10px] font-semibold transition-all cursor-pointer ${
                      activeMediaTab === "video"
                        ? "bg-[#b37e44] text-white"
                        : "text-[#71717a] hover:text-[#18181b]"
                    }`}
                  >
                    Video
                  </button>
                </div>
              )}
            </div>

            <button
              onClick={() => toggleWishlist(productId)}
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all cursor-pointer ${
                isWishlisted
                  ? "bg-rose-50 text-rose-600 border border-rose-200"
                  : "bg-white text-[#71717a] border border-[#e5ded4] hover:text-rose-600"
              }`}
            >
              <Heart size={14} className={isWishlisted ? "fill-rose-600 text-rose-600" : ""} />
              <span>{isWishlisted ? "Saved" : "Save"}</span>
            </button>
          </div>

          {/* Main Product Image or Video */}
          <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-white shadow-sm border border-[#ede7df] mb-4 flex items-center justify-center">
            {activeMediaTab === "video" && product.video ? (
              <video
                src={product.video}
                controls
                autoPlay
                className="w-full h-full object-cover bg-black"
              />
            ) : product.image ? (
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="text-xs text-[#78716c]">No image available</div>
            )}
          </div>
        </div>

        {/* Specifications Pill Bar */}
        <div className="space-y-2 text-xs text-[#57534e] bg-white/80 rounded-xl p-3.5 border border-[#ede7df]">
          {product.dimensions && (
            <div className="flex items-center gap-2">
              <Ruler size={14} className="text-[#b37e44] flex-shrink-0" />
              <span><strong>Dimensions:</strong> {product.dimensions}</span>
            </div>
          )}
          {product.material && (
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#b37e44] flex-shrink-0" />
              <span><strong>Materials:</strong> {product.material}</span>
            </div>
          )}
          <div className="flex items-center gap-2">
            <ShieldCheck size={14} className="text-[#b37e44] flex-shrink-0" />
            <span><strong>Showroom Guarantee:</strong> Bespoke sizing & 5-year structural warranty</span>
          </div>
        </div>
      </div>

      {/* Right Side: Product Details & Contact Inquiry Form */}
      <div className="w-full md:w-1/2 p-6 sm:p-8 flex flex-col justify-between overflow-y-auto">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-[#b37e44] font-semibold mb-1 uppercase tracking-wider">
            <Sparkles size={13} />
            <span>Bespoke Creation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-serif text-[#1c1917] tracking-tight mb-3">
            {product.name}
          </h2>
          <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed mb-6">
            {product.description}
          </p>

          {/* Instant Contact Action Buttons */}
          <div className="mb-6 space-y-2.5">
            <p className="text-xs font-semibold text-[#27272a] uppercase tracking-wider">
              Direct Inquiries & Showroom Consultation:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {/* WhatsApp Direct */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] font-semibold text-xs transition-colors border border-[#25D366]/30"
              >
                <MessageSquare size={16} className="text-[#25D366]" />
                <span>Chat on WhatsApp</span>
              </a>

              {/* Direct Call */}
              <a
                href="tel:08130575312"
                className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-[#f8f5f0] hover:bg-[#f2ece2] text-[#27272a] font-semibold text-xs transition-colors border border-[#ebdccb]"
              >
                <Phone size={14} className="text-[#b37e44]" />
                <span>08130575312</span>
              </a>
            </div>
          </div>

          {/* In-Modal Inquiry Form */}
          <div className="pt-5 border-t border-[#f0ebe3]">
            <h3 className="text-sm font-serif font-bold text-[#1c1917] mb-1">
              Request Specifications or Bespoke Consultation
            </h3>
            <p className="text-xs text-[#78716c] mb-4">
              Leave your details and our team will reach out with fabric swatches and custom dimension options.
            </p>

            {isSubmitted ? (
              <div className="bg-[#f0f9f3] border border-[#a3e0b5] rounded-2xl p-5 text-center space-y-2 animate-fade-in">
                <CheckCircle2 size={32} className="text-[#15803d] mx-auto" />
                <h4 className="text-sm font-bold text-[#15803d]">Inquiry Sent Successfully</h4>
                <p className="text-xs text-[#166534]">
                  Thank you! Our Sassy Furniture team will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs text-[#15803d] font-semibold underline mt-2 hover:text-[#14532d]"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmitInquiry} className="space-y-3">
                {errorMessage && (
                  <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    type="text"
                    placeholder="Your Full Name *"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                  />
                  <input
                    type="email"
                    placeholder="Email Address *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                  />
                </div>

                <input
                  type="tel"
                  placeholder="Phone Number (e.g. 08130575312)"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3.5 py-2.5 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                />

                <textarea
                  rows={2}
                  placeholder="Custom dimensions, finish requests or questions *"
                  required
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-3.5 py-2 text-xs rounded-xl bg-[#fcfbfa] border border-[#e5ded4] focus:outline-none focus:border-[#b37e44] text-[#1c1917] resize-none"
                />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary text-xs py-2.5 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70"
                >
                  <Send size={13} />
                  <span>{isSubmitting ? "Submitting Inquiry..." : "Submit Inquiry to Concierge"}</span>
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Showroom address footer footnote */}
        <div className="mt-6 pt-4 border-t border-[#f4f0ea] flex items-center gap-2 text-[11px] text-[#8c827a]">
          <MapPin size={12} className="text-[#b37e44] flex-shrink-0" />
          <span>Workshop & Showroom: Number 15 Ajegunle, Ila Orangun, Osun State</span>
        </div>
      </div>
    </div>
  );
}

export default function ProductDetailModal() {
  const { quickViewProduct, setQuickViewProduct, isInWishlist, toggleWishlist, showToast } = useShop();

  if (!quickViewProduct) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs animate-fade-in overflow-y-auto"
      onClick={() => setQuickViewProduct(null)}
    >
      <ProductDetailModalContent
        key={quickViewProduct._id || quickViewProduct.id || quickViewProduct.name}
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        isInWishlist={isInWishlist}
        toggleWishlist={toggleWishlist}
        showToast={showToast}
      />
    </div>
  );
}

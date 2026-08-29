"use client";

import React, { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, CheckCircle2, MessageSquare, Sparkles } from "lucide-react";
import { useShop } from "@/context/ShopContext";

export default function ContactSection() {
  const { showToast } = useShop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("Showroom Visit");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      setErrorMessage("Please complete all required fields.");
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
          productName: `[${inquiryType}] General Consultation`,
          message: `Inquiry Type: ${inquiryType}\nMessage: ${message}`,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        setName("");
        setEmail("");
        setPhone("");
        setMessage("");
        showToast("Consultation request submitted! We will contact you shortly.");
      } else {
        setErrorMessage(data.error || "Failed to submit request. Please try again.");
      }
    } catch {
      setErrorMessage("Network error. Please reach us via WhatsApp or Phone.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const whatsappUrl = `https://wa.me/2348130575312?text=${encodeURIComponent(
    "Hello Sassy Furniture, I would like to inquire about your furniture collections, pricing, and custom orders."
  )}`;

  return (
    <section id="contact" className="w-full py-16 sm:py-24 bg-white border-t border-[#eee8df]">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left Column: Showroom Information & Direct Contacts */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                <Sparkles size={13} />
                <span>Showroom & Workshop</span>
              </span>
              <h2 className="text-3xl sm:text-4xl font-serif text-[#1c1917] tracking-tight mb-4">
                Visit Sassy Furniture
              </h2>
              <p className="text-sm text-[#57534e] leading-relaxed">
                Experience our handcrafted timber finishes, quality fabrics, and bespoke designs in person at Sassy Furniture. We are available 24/7 for consultations and orders.
              </p>
            </div>

            {/* Info Cards */}
            <div className="space-y-3.5 pt-2">
              {/* Address */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e2d8ca] flex items-center justify-center text-[#b37e44] flex-shrink-0 shadow-xs">
                  <MapPin size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Main Address / Workshop</h4>
                  <p className="text-xs sm:text-sm text-[#57534e] mt-0.5">
                    Number 15 Ajegunle, Ila Orangun, Osun State, Nigeria
                  </p>
                </div>
              </div>

              {/* Phone & WhatsApp */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e2d8ca] flex items-center justify-center text-[#b37e44] flex-shrink-0 shadow-xs">
                  <Phone size={18} />
                </div>
                <div className="flex-1">
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Direct Contact & WhatsApp</h4>
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs sm:text-sm font-semibold">
                    <a href="tel:08130575312" className="text-[#1c1917] hover:text-[#b37e44] transition-colors">
                      08130575312
                    </a>
                    <span className="text-[#d6cfc7]">•</span>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#128C7E] flex items-center gap-1 hover:underline"
                    >
                      <MessageSquare size={13} />
                      <span>WhatsApp Direct</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e2d8ca] flex items-center justify-center text-[#b37e44] flex-shrink-0 shadow-xs">
                  <Mail size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Email Inquiry</h4>
                  <a
                    href="mailto:salawudeenhammed117@gmail.com"
                    className="text-xs sm:text-sm text-[#57534e] hover:text-[#b37e44] transition-colors mt-0.5 block font-medium"
                  >
                    salawudeenhammed117@gmail.com
                  </a>
                </div>
              </div>

              {/* Opening Hours: 24/7 */}
              <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-[#faf7f2] border border-[#ede5da]">
                <div className="w-10 h-10 rounded-xl bg-white border border-[#e2d8ca] flex items-center justify-center text-[#b37e44] flex-shrink-0 shadow-xs">
                  <Clock size={18} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Operating & Support Hours</h4>
                  <p className="text-xs text-[#57534e] mt-0.5">
                    <strong>24/7 Available</strong> &ndash; Open 24 Hours, 7 Days a Week <br />
                    Direct calls, WhatsApp inquiries & custom orders anytime.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Booking Form */}
          <div className="lg:col-span-7 bg-[#fcfbfa] border border-[#ede7df] rounded-3xl p-6 sm:p-10 shadow-sm">
            <h3 className="text-2xl font-serif text-[#1c1917] mb-2">
              Book a Consultation or Custom Inquiry
            </h3>
            <p className="text-xs sm:text-sm text-[#78716c] mb-6">
              Fill out the form below to connect with our design team. We offer tailored fabric swatches, 3D room mockups, and private showroom viewings.
            </p>

            {isSubmitted ? (
              <div className="bg-[#f0f9f3] border border-[#a3e0b5] rounded-2xl p-8 text-center space-y-3 animate-fade-in">
                <CheckCircle2 size={40} className="text-[#15803d] mx-auto" />
                <h4 className="text-lg font-serif font-bold text-[#15803d]">Consultation Request Received</h4>
                <p className="text-xs sm:text-sm text-[#166534] max-w-md mx-auto">
                  Thank you! An interior concierge specialist will review your project details and contact you within 2-4 business hours.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="btn-primary text-xs py-2 px-5 mt-4"
                >
                  Submit Another Request
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                {errorMessage && (
                  <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs">
                    {errorMessage}
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                      Full Name <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tunde Balogun"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                      Email Address <span className="text-rose-500">*</span>
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. tunde@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      type="tel"
                      placeholder="e.g. 08130575312"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                      Inquiry Subject
                    </label>
                    <select
                      value={inquiryType}
                      onChange={(e) => setInquiryType(e.target.value)}
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                    >
                      <option value="Showroom Visit">Private Showroom Visit</option>
                      <option value="Bespoke Order">Custom / Bespoke Dimension Order</option>
                      <option value="Architectural Project">Architectural / Commercial Fitout</option>
                      <option value="Product Availability">Product Availability & Lead Time</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                    Project Details or Specific Pieces of Interest <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about your space, preferred pieces (e.g. Luna Sofa, Milano Dining Table), dimensions or custom fabric preferences..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-white border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917] resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm font-semibold"
                >
                  <Send size={15} />
                  <span>{isSubmitting ? "Sending Request..." : "Send Consultation Request"}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

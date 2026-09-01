"use client";

import React, { useState } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useShop } from "@/context/ShopContext";
import {
  ChevronRight,
  Phone,
  Mail,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  MessageSquare,
  Sparkles,
  ChevronDown,
  HelpCircle,
} from "lucide-react";

const FAQS = [
  {
    q: "Can I customize the dimensions and fabric of any furniture piece?",
    a: "Yes, absolutely. Every piece at Sassy Furniture can be customized to match your room dimensions, layout proportions, and preferred fabric upholstery (linen, bouclé, performance velvet, or leather).",
  },
  {
    q: "What is your typical production and crafting lead time?",
    a: "For in-stock catalog items, fulfillment is prepared within 2-4 business days. For bespoke customized pieces, crafting takes between 7 to 14 days in our Ila Orangun workshop.",
  },
  {
    q: "Do you deliver and install furniture across Nigeria?",
    a: "Yes! We coordinate secure, blanket-wrapped transport and white-glove setup for residential homes, penthouses, and commercial projects across Osun, Lagos, Abuja, Ibadan, and all states in Nigeria.",
  },
  {
    q: "What does the 5-Year Structural Warranty cover?",
    a: "Our warranty covers internal kiln-dried hardwood framing, joint integrity, suspension webbing, and craftsmanship construction against manufacturing defects for five full years.",
  },
  {
    q: "How can I visit the Sassy Furniture showroom in Ila Orangun?",
    a: "Our showroom and workshop are located at Number 15 Ajegunle, Ila Orangun, Osun State. We are open 24/7 for appointments, design consultations, and walk-in viewings. You can book an appointment above or call 08130575312.",
  },
];

export default function ContactPage() {
  const { showToast } = useShop();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [inquiryType, setInquiryType] = useState("Showroom Visit");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

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
    "Hello Sassy Furniture, I would like to inquire about your furniture collections, showroom consultation, and bespoke custom pieces."
  )}`;

  return (
    <div className="min-h-screen flex flex-col bg-[#fcfbfa]">
      <TopBar />
      <Navbar />

      <main className="flex-1 pb-20">
        {/* Banner */}
        <section className="bg-[#f6f1eb] border-b border-[#e8ded2] py-12 sm:py-16">
          <div className="container-custom">
            <nav className="flex items-center gap-2 text-xs text-[#78716c] mb-4">
              <Link href="/" className="hover:text-[#b37e44] transition-colors">
                Home
              </Link>
              <ChevronRight size={12} />
              <span className="font-semibold text-[#1c1917]">Contact &amp; Showroom</span>
            </nav>

            <div className="max-w-2xl">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#b37e44] mb-2">
                <Sparkles size={13} />
                <span>Showroom &amp; Consultation</span>
              </span>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-serif text-[#1c1917] tracking-tight mb-3">
                Get In Touch
              </h1>
              <p className="text-xs sm:text-sm text-[#5c564f] leading-relaxed">
                Connect with our design concierge for custom quotes, private showroom viewings, and spatial planning. We are available 24/7 to assist with your interior projects.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Information & Consultation Form Grid */}
        <section className="container-custom pt-12 sm:pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
            {/* Left Column: Direct Contacts */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <h2 className="text-2xl sm:text-3xl font-serif text-[#1c1917] tracking-tight mb-3">
                  Showroom &amp; Workshop
                </h2>
                <p className="text-xs sm:text-sm text-[#57534e] leading-relaxed">
                  Experience our handcrafted timber finishes, quality fabrics, and bespoke designs in person.
                </p>
              </div>

              {/* Cards */}
              <div className="space-y-3 pt-1">
                {/* Address */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44] flex-shrink-0">
                    <MapPin size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Main Address / Workshop</h4>
                    <p className="text-xs text-[#57534e] mt-0.5 font-medium">
                      Number 15 Ajegunle, Ila Orangun, Osun State, Nigeria
                    </p>
                  </div>
                </div>

                {/* Phone & WhatsApp */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44] flex-shrink-0">
                    <Phone size={18} />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Phone &amp; WhatsApp</h4>
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
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44] flex-shrink-0">
                    <Mail size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Email Inquiry</h4>
                    <a
                      href="mailto:salawudeenhammed117@gmail.com"
                      className="text-xs text-[#57534e] hover:text-[#b37e44] transition-colors mt-0.5 block font-medium"
                    >
                      salawudeenhammed117@gmail.com
                    </a>
                  </div>
                </div>

                {/* Operating Hours */}
                <div className="flex items-start gap-3.5 p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs">
                  <div className="w-10 h-10 rounded-xl bg-[#faf5ee] border border-[#ecdccb] flex items-center justify-center text-[#b37e44] flex-shrink-0">
                    <Clock size={18} />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Hours &amp; Availability</h4>
                    <p className="text-xs text-[#57534e] mt-0.5">
                      <strong>Open 24/7</strong> &ndash; 24 Hours, 7 Days a Week <br />
                      Direct calls, WhatsApp inquiries &amp; private showroom appointments anytime.
                    </p>
                  </div>
                </div>

                {/* Social Media Channels */}
                <div className="p-4 rounded-2xl bg-white border border-[#ede7df] shadow-2xs space-y-2">
                  <h4 className="text-xs font-bold text-[#1c1917] uppercase tracking-wider">Official Channels</h4>
                  <div className="flex flex-wrap items-center gap-2 pt-1">
                    <a
                      href="https://x.com/sassyfurniture"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf7f2] border border-[#e2d8ca] text-xs font-semibold text-[#1c1917] hover:text-[#b37e44] hover:border-[#b37e44] transition-colors"
                    >
                      <span>X (Twitter)</span>
                    </a>
                    <a
                      href="http://tiktok.com/@sassy_furniture"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf7f2] border border-[#e2d8ca] text-xs font-semibold text-[#1c1917] hover:text-[#b37e44] hover:border-[#b37e44] transition-colors"
                    >
                      <span>TikTok</span>
                    </a>
                    <a
                      href="https://www.instagram.com/sassyfurniture312?igsi=MWNudW1jY3VxbGh4Mw=="
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#faf7f2] border border-[#e2d8ca] text-xs font-semibold text-[#1c1917] hover:text-[#b37e44] hover:border-[#b37e44] transition-colors"
                    >
                      <span>Instagram</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Consultation Booking Form */}
            <div className="lg:col-span-7 bg-white border border-[#ede7df] rounded-3xl p-6 sm:p-10 shadow-sm">
              <h3 className="text-2xl font-serif text-[#1c1917] mb-2">
                Book a Consultation or Custom Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-[#78716c] mb-6">
                Fill out the form below to connect with our design team for fabric swatches, bespoke dimensions, or showroom visits.
              </p>

              {isSubmitted ? (
                <div className="bg-[#f0f9f3] border border-[#a3e0b5] rounded-2xl p-8 text-center space-y-3 animate-fade-in">
                  <CheckCircle2 size={40} className="text-[#15803d] mx-auto" />
                  <h4 className="text-lg font-serif font-bold text-[#15803d]">Consultation Request Received</h4>
                  <p className="text-xs sm:text-sm text-[#166534] max-w-md mx-auto">
                    Thank you! An interior concierge specialist will review your details and contact you within 2-4 hours.
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
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#faf7f2] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
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
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#faf7f2] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
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
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#faf7f2] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#27272a] mb-1.5">
                        Inquiry Subject
                      </label>
                      <select
                        value={inquiryType}
                        onChange={(e) => setInquiryType(e.target.value)}
                        className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#faf7f2] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917]"
                      >
                        <option value="Showroom Visit">Private Showroom Visit</option>
                        <option value="Bespoke Order">Custom / Bespoke Dimension Order</option>
                        <option value="Architectural Project">Architectural / Commercial Fitout</option>
                        <option value="Product Availability">Product Availability &amp; Lead Time</option>
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
                      className="w-full px-4 py-2.5 text-xs sm:text-sm rounded-xl bg-[#faf7f2] border border-[#e2d8ca] focus:outline-none focus:border-[#b37e44] text-[#1c1917] resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full btn-primary py-3 rounded-xl flex items-center justify-center gap-2 cursor-pointer disabled:opacity-70 text-sm font-semibold shadow-xs"
                  >
                    <Send size={15} />
                    <span>{isSubmitting ? "Sending Request..." : "Send Consultation Request"}</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="container-custom mt-20 pt-12 border-t border-[#ede5da]">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#b37e44] block mb-1">
                Frequently Asked Questions
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif text-[#1c1917] tracking-tight">
                Everything You Need to Know
              </h2>
            </div>

            <div className="space-y-3">
              {FAQS.map((faq, index) => {
                const isOpen = openFaqIndex === index;
                return (
                  <div
                    key={index}
                    className="rounded-2xl bg-white border border-[#ede7df] overflow-hidden transition-all shadow-2xs"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                      className="w-full flex items-center justify-between p-5 text-left text-xs sm:text-sm font-semibold text-[#1c1917] hover:text-[#b37e44] transition-colors cursor-pointer"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown
                        size={16}
                        className={`text-[#8c827a] transition-transform duration-200 flex-shrink-0 ${
                          isOpen ? "rotate-180 text-[#b37e44]" : ""
                        }`}
                      />
                    </button>
                    {isOpen && (
                      <div className="px-5 pb-5 text-xs sm:text-sm text-[#57534e] leading-relaxed border-t border-[#f4efe8] pt-3 bg-[#fdfcfa]">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

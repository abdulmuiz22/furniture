"use client";

import React from "react";
import { useShop } from "@/context/ShopContext";
import { Sparkles } from "lucide-react";

export default function Toast() {
  const { toast } = useShop();

  if (!toast) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 animate-fade-in">
      <div className="flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-[#18181b] text-white text-xs font-medium shadow-2xl border border-[#27272a]">
        <Sparkles size={15} className="text-[#d49753]" />
        <span>{toast}</span>
      </div>
    </div>
  );
}

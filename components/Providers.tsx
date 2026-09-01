"use client";

import React from "react";
import dynamic from "next/dynamic";
import { ShopProvider } from "@/context/ShopContext";

const ProductDetailModal = dynamic(() => import("@/components/ProductDetailModal"), { ssr: false });
const SearchModal = dynamic(() => import("@/components/SearchModal"), { ssr: false });
const Toast = dynamic(() => import("@/components/Toast"), { ssr: false });

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ShopProvider>
      {children}
      <ProductDetailModal />
      <SearchModal />
      <Toast />
    </ShopProvider>
  );
}

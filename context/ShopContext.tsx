"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { Product, BEST_SELLERS } from "@/data/furnitureData";

interface ShopContextType {
  products: Product[];
  isLoading: boolean;
  refreshProducts: () => Promise<void>;

  selectedCategory: string;
  setSelectedCategory: (category: string) => void;

  searchQuery: string;
  setSearchQuery: (query: string) => void;

  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;

  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;

  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;

  isInquiryModalOpen: boolean;
  setIsInquiryModalOpen: (open: boolean) => void;
  inquiryProduct: Product | null;
  openInquiryForProduct: (product: Product) => void;

  toast: string | null;
  showToast: (msg: string) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export function ShopProvider({ children }: { children: React.ReactNode }) {
  const [products, setProducts] = useState<Product[]>(BEST_SELLERS);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const [wishlist, setWishlist] = useState<string[]>(["luna-fabric-sofa"]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isInquiryModalOpen, setIsInquiryModalOpen] = useState(false);
  const [inquiryProduct, setInquiryProduct] = useState<Product | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
  };

  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const fetchProducts = useCallback(async () => {
    try {
      let url = "/api/products";
      const params = new URLSearchParams();
      if (selectedCategory && selectedCategory !== "All") {
        params.append("category", selectedCategory);
      }
      if (searchQuery.trim()) {
        params.append("search", searchQuery.trim());
      }
      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        if (data.data && Array.isArray(data.data) && data.data.length > 0) {
          setProducts(data.data);
        } else if (!selectedCategory || selectedCategory === "All") {
          setProducts(BEST_SELLERS);
        } else {
          setProducts([]);
        }
      } else {
        setProducts(BEST_SELLERS);
      }
    } catch (err) {
      console.warn("Using fallback products due to network error:", err);
      setProducts(BEST_SELLERS);
    } finally {
      setIsLoading(false);
    }
  }, [selectedCategory, searchQuery]);

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        let url = "/api/products";
        const params = new URLSearchParams();
        if (selectedCategory && selectedCategory !== "All") {
          params.append("category", selectedCategory);
        }
        if (searchQuery.trim()) {
          params.append("search", searchQuery.trim());
        }
        if (params.toString()) {
          url += `?${params.toString()}`;
        }

        const res = await fetch(url);
        if (!ignore && res.ok) {
          const data = await res.json();
          if (data.data && Array.isArray(data.data) && data.data.length > 0) {
            setProducts(data.data);
          } else if (!selectedCategory || selectedCategory === "All") {
            setProducts(BEST_SELLERS);
          } else {
            setProducts([]);
          }
        }
      } catch (err) {
        if (!ignore) {
          console.warn("Using fallback products due to network error:", err);
          setProducts(BEST_SELLERS);
        }
      } finally {
        if (!ignore) {
          setIsLoading(false);
        }
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, [selectedCategory, searchQuery]);

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast("Removed from saved collection");
        return prev.filter((id) => id !== productId);
      } else {
        showToast("Saved to your personal collection ✨");
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  const openInquiryForProduct = (product: Product) => {
    setInquiryProduct(product);
    setIsInquiryModalOpen(true);
  };

  return (
    <ShopContext.Provider
      value={{
        products,
        isLoading,
        refreshProducts: fetchProducts,
        selectedCategory,
        setSelectedCategory,
        searchQuery,
        setSearchQuery,
        wishlist,
        toggleWishlist,
        isInWishlist,
        isSearchOpen,
        setIsSearchOpen,
        quickViewProduct,
        setQuickViewProduct,
        isInquiryModalOpen,
        setIsInquiryModalOpen,
        inquiryProduct,
        openInquiryForProduct,
        toast,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export function useShop() {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error("useShop must be used within a ShopProvider");
  }
  return context;
}

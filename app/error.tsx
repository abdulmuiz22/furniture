"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Application error boundary caught:", error);
  }, [error]);

  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#ede7df] shadow-lg space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div className="w-12 h-12 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center mx-auto">
          <AlertTriangle size={24} />
        </div>

        <div>
          <h1 className="text-xl sm:text-2xl font-serif font-bold text-[#1c1917]">
            Something went wrong
          </h1>
          <p className="text-xs sm:text-sm text-[#78716c] mt-2">
            An unexpected error occurred while loading this view. Please try refreshing or return to the showroom.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={() => reset()}
            className="w-full sm:w-auto btn-primary text-xs sm:text-sm py-2.5 px-6 rounded-xl flex items-center justify-center gap-2 cursor-pointer"
          >
            <RefreshCw size={15} />
            <span>Try Again</span>
          </button>
          <Link
            href="/"
            className="w-full sm:w-auto btn-secondary text-xs sm:text-sm py-2.5 px-5 rounded-xl flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Showroom Home</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

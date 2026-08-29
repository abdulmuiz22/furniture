import Link from "next/link";
import Logo from "@/components/Logo";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#faf8f5] flex flex-col items-center justify-center p-6 text-center">
      <div className="max-w-md w-full bg-white rounded-3xl p-8 sm:p-10 border border-[#ede7df] shadow-lg space-y-6">
        <div className="flex justify-center">
          <Logo />
        </div>

        <div>
          <span className="text-5xl sm:text-6xl font-serif font-bold text-[#b37e44] block mb-2">
            404
          </span>
          <h1 className="text-2xl font-serif font-bold text-[#1c1917]">
            Piece Not Found
          </h1>
          <p className="text-xs sm:text-sm text-[#78716c] mt-2">
            The showroom page or piece you are looking for does not exist or has been relocated.
          </p>
        </div>

        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/"
            className="w-full sm:w-auto btn-primary text-xs sm:text-sm py-2.5 px-6 rounded-xl flex items-center justify-center gap-2"
          >
            <Home size={15} />
            <span>Return to Showroom</span>
          </Link>
          <Link
            href="/#contact"
            className="w-full sm:w-auto btn-secondary text-xs sm:text-sm py-2.5 px-5 rounded-xl flex items-center justify-center gap-2"
          >
            <span>Contact Concierge</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

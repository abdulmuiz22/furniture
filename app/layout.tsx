import type { Metadata, Viewport } from "next";
import { Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
  weight: ["400", "500", "600", "700", "800"],
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const appUrl =
  process.env.NEXT_PUBLIC_APP_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#b37e44",
};

export const metadata: Metadata = {
  metadataBase: new URL(appUrl),
  title: {
    default: "Sassy Furniture — Modern Furniture For Stylish Living",
    template: "%s | Sassy Furniture",
  },
  description:
    "Discover handcrafted luxury furniture pieces that blend comfort, elegance, and functionality at Sassy Furniture. Shop bespoke sofas, dining tables, ergonomic office chairs, beds, and custom home decor in Nigeria.",
  keywords: [
    "Sassy Furniture",
    "Modern Furniture",
    "Luxury Interior Design",
    "Handcrafted Furniture Nigeria",
    "Living Room Furniture",
    "Ila Orangun Furniture",
    "Designer Home Decor",
    "Bespoke Furniture Lagos",
  ],
  authors: [{ name: "Sassy Furniture" }],
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/icon", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-icon", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.svg",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Sassy Furniture — Modern Furniture For Stylish Living",
    description:
      "Discover pieces that blend comfort, elegance and functionality. Premium handcrafted furniture from Sassy Furniture.",
    url: appUrl,
    siteName: "Sassy Furniture",
    type: "website",
    locale: "en_NG",
    images: [
      {
        url: "/images/hero.jpg",
        width: 1200,
        height: 630,
        alt: "Sassy Furniture Showroom",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sassy Furniture — Modern Furniture For Stylish Living",
    description:
      "Discover handcrafted luxury furniture pieces that blend comfort, elegance, and functionality.",
    images: ["/images/hero.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${playfair.variable} ${jakarta.variable}`}>
      <body className="antialiased selection:bg-[#c48a48]/20 selection:text-[#8c5d28]">
        {children}
      </body>
    </html>
  );
}

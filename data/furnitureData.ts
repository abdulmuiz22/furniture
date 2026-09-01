export interface Category {
  id: string;
  name: string;
  itemCount: string;
  image: string;
  icon: string;
  description?: string;
}

export interface Product {
  _id?: string;
  id?: string;
  name: string;
  category: string;
  rating?: number;
  reviewsCount?: number;
  image: string;
  cloudinaryPublicId?: string;
  video?: string;
  videoCloudinaryPublicId?: string;
  mediaType?: "image" | "video";
  description: string;
  dimensions?: string;
  material?: string;
  inStock?: boolean;
  featured?: boolean;
  createdAt?: string;
}

export type MediaSection =
  | "hero"
  | "category"
  | "promo"
  | "product"
  | "showcase"
  | "gallery"
  | "general";

export interface MediaAsset {
  _id?: string;
  id?: string;
  title: string;
  section: MediaSection;
  mediaType: "image" | "video";
  url: string;
  cloudinaryPublicId?: string;
  caption?: string;
  linkUrl?: string;
  categoryRef?: string;
  productId?: string;
  tags?: string[];
  order?: number;
  isActive?: boolean;
  createdAt?: string;
}

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  // 1. Hero Showcase Picture
  {
    id: "media-hero-banner",
    title: "Main Hero Banner - Modern Living Room",
    section: "hero",
    mediaType: "image",
    url: "/images/hero.jpg",
    caption: "Hero section display showing modern designer sofa and natural light",
    linkUrl: "#best-sellers",
    order: 1,
    isActive: true,
  },
  // 2. Room Categories (6 Pictures)
  {
    id: "media-cat-living-room",
    title: "Living Room Category Banner",
    section: "category",
    mediaType: "image",
    url: "/images/cat-living-room.jpg",
    caption: "Plush sofas, accent chairs, and bespoke coffee tables",
    categoryRef: "Living Room",
    order: 2,
    isActive: true,
  },
  {
    id: "media-cat-bedroom",
    title: "Bedroom Category Banner",
    section: "category",
    mediaType: "image",
    url: "/images/cat-bedroom.jpg",
    caption: "Handcrafted platform beds, dressers, and bedside companions",
    categoryRef: "Bedroom",
    order: 3,
    isActive: true,
  },
  {
    id: "media-cat-dining-room",
    title: "Dining Room Category Banner",
    section: "category",
    mediaType: "image",
    url: "/images/cat-dining-room.jpg",
    caption: "Sculptural dining tables and ergonomic upholstered seating",
    categoryRef: "Dining Room",
    order: 4,
    isActive: true,
  },
  {
    id: "media-cat-office",
    title: "Office Category Banner",
    section: "category",
    mediaType: "image",
    url: "/images/cat-office.jpg",
    caption: "Executive desks and responsive ergonomic task chairs",
    categoryRef: "Office",
    order: 5,
    isActive: true,
  },
  {
    id: "media-cat-outdoor",
    title: "Outdoor Category Banner",
    section: "category",
    mediaType: "image",
    url: "/images/cat-outdoor.jpg",
    caption: "Weather-resistant teak lounges and contemporary patio sets",
    categoryRef: "Outdoor",
    order: 6,
    isActive: true,
  },
  {
    id: "media-cat-decor",
    title: "Decor & Lighting Category Banner",
    section: "category",
    mediaType: "image",
    url: "/images/cat-decor.jpg",
    caption: "Architectural luminaires, artisan vases, and curated accents",
    categoryRef: "Decor & Lighting",
    order: 7,
    isActive: true,
  },
  // 3. Promotional Banners (2 Pictures)
  {
    id: "media-promo-minimalist",
    title: "Promo: Minimalist Essentials Banner",
    section: "promo",
    mediaType: "image",
    url: "/images/promo-minimalist.jpg",
    caption: "New Collection: Timeless designs for modern spaces",
    linkUrl: "#best-sellers",
    order: 8,
    isActive: true,
  },
  {
    id: "media-promo-exclusive",
    title: "Promo: Architectural Living & Signature Suites",
    section: "promo",
    mediaType: "image",
    url: "/images/promo-exclusive.jpg",
    caption: "Showcase collection of luxury handcrafted furniture and bespoke suites",
    linkUrl: "#best-sellers",
    order: 9,
    isActive: true,
  },
  // 4. Products Showcase Pictures (6 Pictures)
  {
    id: "media-prod-luna-sofa",
    title: "Product: Luna Fabric Sofa",
    section: "product",
    mediaType: "image",
    url: "/images/prod-luna-sofa.jpg",
    caption: "Deep comfortable seating wrapped in premium textured linen",
    categoryRef: "Living Room",
    productId: "luna-fabric-sofa",
    order: 10,
    isActive: true,
  },
  {
    id: "media-prod-milano-table",
    title: "Product: Milano Dining Table",
    section: "product",
    mediaType: "image",
    url: "/images/prod-milano-table.jpg",
    caption: "Handcrafted round dining table with natural white oak finish",
    categoryRef: "Dining Room",
    productId: "milano-dining-table",
    order: 11,
    isActive: true,
  },
  {
    id: "media-prod-ergo-chair",
    title: "Product: Ergo Office Chair",
    section: "product",
    mediaType: "image",
    url: "/images/prod-ergo-chair.jpg",
    caption: "Ergonomic lumbar contouring task chair with breathable mesh",
    categoryRef: "Office",
    productId: "ergo-office-chair",
    order: 12,
    isActive: true,
  },
  {
    id: "media-prod-aurora-bed",
    title: "Product: Aurora Bed Frame",
    section: "product",
    mediaType: "image",
    url: "/images/prod-aurora-bed.jpg",
    caption: "Platform bed with bouclé headboard & solid birch wood framing",
    categoryRef: "Bedroom",
    productId: "aurora-bed-frame",
    order: 13,
    isActive: true,
  },
  {
    id: "media-prod-nexa-table",
    title: "Product: Nexa Coffee Table",
    section: "product",
    mediaType: "image",
    url: "/images/prod-nexa-table.jpg",
    caption: "Sculptural round coffee table with organic pedestal base",
    categoryRef: "Living Room",
    productId: "nexa-coffee-table",
    order: 14,
    isActive: true,
  },
  {
    id: "media-prod-nova-lamp",
    title: "Product: Nova Floor Lamp",
    section: "product",
    mediaType: "image",
    url: "/images/prod-nova-lamp.jpg",
    caption: "Minimalist arched steel lamp with warm ambient diffused LED",
    categoryRef: "Decor & Lighting",
    productId: "nova-floor-lamp",
    order: 15,
    isActive: true,
  },
  // 5. Showcase Video Highlights
  {
    id: "media-showcase-craftsmanship-video",
    title: "Showcase Video: Ila Orangun Workshop Craftsmanship",
    section: "showcase",
    mediaType: "video",
    url: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    caption: "Behind the scenes of handcrafted joinery and custom fabric tailoring",
    order: 16,
    isActive: true,
  },
];

export const CATEGORIES: Category[] = [
  {
    id: "living-room",
    name: "Living Room",
    itemCount: "120+ Items",
    image: "/images/cat-living-room.jpg",
    icon: "sofa",
    description: "Plush sofas, accent chairs, and bespoke coffee tables.",
  },
  {
    id: "bedroom",
    name: "Bedroom",
    itemCount: "95+ Items",
    image: "/images/cat-bedroom.jpg",
    icon: "bed",
    description: "Handcrafted platform beds, dressers, and bedside companions.",
  },
  {
    id: "dining-room",
    name: "Dining Room",
    itemCount: "80+ Items",
    image: "/images/cat-dining-room.jpg",
    icon: "dining",
    description: "Sculptural dining tables and ergonomic upholstered seating.",
  },
  {
    id: "office",
    name: "Office",
    itemCount: "60+ Items",
    image: "/images/cat-office.jpg",
    icon: "desk",
    description: "Executive desks and responsive ergonomic task chairs.",
  },
  {
    id: "outdoor",
    name: "Outdoor",
    itemCount: "45+ Items",
    image: "/images/cat-outdoor.jpg",
    icon: "outdoor",
    description: "Weather-resistant teak lounges and contemporary patio sets.",
  },
  {
    id: "decor-lighting",
    name: "Decor & Lighting",
    itemCount: "70+ Items",
    image: "/images/cat-decor.jpg",
    icon: "lamp",
    description: "Architectural luminaires, artisan vases, and curated accents.",
  },
];

export const BEST_SELLERS: Product[] = [
  {
    id: "luna-fabric-sofa",
    name: "Luna Fabric Sofa",
    category: "Living Room",
    rating: 4.8,
    reviewsCount: 24,
    image: "/images/prod-luna-sofa.jpg",
    description:
      "Deep, comfortable seating wrapped in tailored premium linen upholstery with a kiln-dried solid oak internal frame.",
    dimensions: "W 220cm x D 95cm x H 82cm",
    material: "Textured Linen & Solid Oak",
    inStock: true,
    featured: true,
  },
  {
    id: "milano-dining-table",
    name: "Milano Dining Table",
    category: "Dining Room",
    rating: 4.7,
    reviewsCount: 18,
    image: "/images/prod-milano-table.jpg",
    description:
      "Handcrafted round dining table featuring subtle tapered legs and a warm natural oak finish that seats up to six.",
    dimensions: "Dia 135cm x H 76cm",
    material: "Natural White Oak",
    inStock: true,
    featured: true,
  },
  {
    id: "ergo-office-chair",
    name: "Ergo Office Chair",
    category: "Office",
    rating: 4.6,
    reviewsCount: 30,
    image: "/images/prod-ergo-chair.jpg",
    description:
      "Engineered for posture and support, with responsive lumbar contouring, breathable mesh, and multi-directional armrests.",
    dimensions: "W 65cm x D 62cm x H 105-115cm",
    material: "Breathable Mesh & Aluminum Base",
    inStock: true,
    featured: true,
  },
  {
    id: "aurora-bed-frame",
    name: "Aurora Bed Frame",
    category: "Bedroom",
    rating: 4.9,
    reviewsCount: 21,
    image: "/images/prod-aurora-bed.jpg",
    description:
      "Low-profile platform bed with a plush padded bouclé headboard and supportive slatted wooden base.",
    dimensions: "King Size (180cm x 200cm)",
    material: "Bouclé Fabric & Solid Birch Wood",
    inStock: true,
    featured: true,
  },
  {
    id: "nexa-coffee-table",
    name: "Nexa Coffee Table",
    category: "Living Room",
    rating: 4.5,
    reviewsCount: 17,
    image: "/images/prod-nexa-table.jpg",
    description:
      "Sculptural round coffee table with an organic pedestal base crafted from sustainably sourced solid timber.",
    dimensions: "Dia 90cm x H 42cm",
    material: "Solid Teak & Oak Veneer",
    inStock: true,
    featured: true,
  },
  {
    id: "nova-floor-lamp",
    name: "Nova Floor Lamp",
    category: "Decor & Lighting",
    rating: 4.6,
    reviewsCount: 11,
    image: "/images/prod-nova-lamp.jpg",
    description:
      "Minimalist arched standing lamp with matte black steel finish and warm diffused ambient LED illumination.",
    dimensions: "H 165cm x Base Dia 30cm",
    material: "Powder-coated Steel & Opal Glass",
    inStock: true,
    featured: true,
  },
  {
    id: "sorrento-teak-lounge",
    name: "Sorrento Outdoor Teak Lounge",
    category: "Outdoor",
    rating: 4.8,
    reviewsCount: 14,
    image: "/images/cat-outdoor.jpg",
    description:
      "Weather-resistant Grade-A teak lounge with quick-dry foam cushions and sun-proof water-repellent canvas fabric.",
    dimensions: "W 190cm x D 85cm x H 75cm",
    material: "Weatherproof Solid Teak & Sunbrella Canvas",
    inStock: true,
    featured: false,
  },
  {
    id: "kyoto-executive-desk",
    name: "Kyoto Executive Desk",
    category: "Office",
    rating: 4.9,
    reviewsCount: 19,
    image: "/images/cat-office.jpg",
    description:
      "Architectural executive writing desk with concealed cable management, dual soft-close drawers, and brushed brass details.",
    dimensions: "W 160cm x D 75cm x H 76cm",
    material: "Walnut Hardwood & Brushed Brass",
    inStock: true,
    featured: false,
  },
  {
    id: "verona-dining-chairs-set",
    name: "Verona Sculptural Dining Chairs (Set of 2)",
    category: "Dining Room",
    rating: 4.7,
    reviewsCount: 16,
    image: "/images/cat-dining-room.jpg",
    description:
      "Curved backrest dining chairs with supportive lumbar contouring and stain-resistant velvet fabric.",
    dimensions: "W 54cm x D 56cm x H 80cm",
    material: "Solid Beechwood & Performance Velvet",
    inStock: true,
    featured: false,
  },
  {
    id: "celeste-boucle-armchair",
    name: "Celeste Bouclé Accent Armchair",
    category: "Living Room",
    rating: 4.9,
    reviewsCount: 28,
    image: "/images/promo-minimalist.jpg",
    description:
      "Cocoon-like curved accent chair upholstered in ultra-soft ivory bouclé with hidden 360-degree smooth swivel base.",
    dimensions: "W 88cm x D 85cm x H 78cm",
    material: "Textured Wool Bouclé & Hardwood Base",
    inStock: true,
    featured: true,
  },
  {
    id: "solis-ceramic-pendant",
    name: "Solis Artisan Ceramic Pendant Light",
    category: "Decor & Lighting",
    rating: 4.8,
    reviewsCount: 13,
    image: "/images/cat-decor.jpg",
    description:
      "Hand-thrown terracotta ceramic pendant with subtle ribbed texture and warm dimmable ambient glow.",
    dimensions: "Dia 35cm x H 28cm (Cord: 150cm)",
    material: "Handcrafted Ceramic & Brass Hardware",
    inStock: true,
    featured: false,
  },
  {
    id: "monaco-nightstand-pair",
    name: "Monaco Fluted Nightstands (Pair)",
    category: "Bedroom",
    rating: 4.7,
    reviewsCount: 22,
    image: "/images/cat-bedroom.jpg",
    description:
      "Modern bedside tables featuring hand-fluted oak drawer fronts and natural honed marble tops.",
    dimensions: "W 50cm x D 42cm x H 52cm",
    material: "Solid White Oak & Natural Marble",
    inStock: true,
    featured: false,
  },
];

export interface Collection {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  itemCount: string;
  tag: string;
  featuredCategory?: string;
  highlights: string[];
}

export const COLLECTIONS: Collection[] = [
  {
    id: "minimalist-essentials",
    slug: "minimalist-essentials",
    title: "Minimalist Essentials",
    subtitle: "Timeless designs for modern spaces",
    description:
      "A curated harmony of clean silhouettes, organic tactile fabrics, and natural wood grains engineered for serene, uncluttered living.",
    image: "/images/promo-minimalist.jpg",
    itemCount: "14 Pieces",
    tag: "New Season",
    featuredCategory: "Living Room",
    highlights: [
      "Kiln-dried solid oak & beechwood framing",
      "Neutral textured bouclé & pure linen upholstery",
      "Concealed joinery and seamless ergonomic curves",
    ],
  },
  {
    id: "signature-suites",
    slug: "signature-suites",
    title: "Signature Suites",
    subtitle: "Architectural statement living",
    description:
      "Handcrafted masterworks characterized by bold proportions, rich textural contrast, and bespoke luxury tailoring for discerning homes.",
    image: "/images/promo-exclusive.jpg",
    itemCount: "18 Pieces",
    tag: "Luxury Edition",
    featuredCategory: "Living Room",
    highlights: [
      "Custom spatial dimensions built to your room layout",
      "High-density multi-layer comfort core foam",
      "5-Year structural warranty backed by our Ila Orangun workshop",
    ],
  },
  {
    id: "best-sellers",
    slug: "best-sellers",
    title: "Best Sellers 2024",
    subtitle: "Our most requested bespoke creations",
    description:
      "The quintessential pieces most celebrated by our residential and architectural clients across Nigeria for exceptional durability and beauty.",
    image: "/images/hero.jpg",
    itemCount: "12 Pieces",
    tag: "Popular Choice",
    featuredCategory: "All",
    highlights: [
      "Proven durability for active family & executive spaces",
      "Comprehensive fabric swatch customization",
      "Ready for priority consultation & swift workshop scheduling",
    ],
  },
  {
    id: "artisan-woodcraft",
    slug: "artisan-woodcraft",
    title: "Artisan Woodcraft",
    subtitle: "Hand-selected solid hardwood heritage",
    description:
      "Sculptural dining tables, low platform bedframes, and fluted credenzas handcrafted by master woodworkers in our Osun State atelier.",
    image: "/images/cat-dining-room.jpg",
    itemCount: "10 Pieces",
    tag: "Workshop Signature",
    featuredCategory: "Dining Room",
    highlights: [
      "Sustainably harvested seasoned hardwood timber",
      "Organic hand-rubbed wax and matte oil finishes",
      "Generational heirloom joinery techniques",
    ],
  },
];

export function getRoomSlug(categoryName: string): string {
  return categoryName
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");
}

export function getCategoryFromSlug(slug: string): string {
  const normalized = slug.toLowerCase();
  if (normalized === "living-room") return "Living Room";
  if (normalized === "bedroom") return "Bedroom";
  if (normalized === "dining-room") return "Dining Room";
  if (normalized === "office") return "Office";
  if (normalized === "outdoor") return "Outdoor";
  if (normalized === "decor-and-lighting" || normalized === "decor-lighting" || normalized === "decor") return "Decor & Lighting";
  return "All";
}

export function getProductByIdOrSlug(idOrSlug: string, productList: Product[] = BEST_SELLERS): Product | undefined {
  const query = decodeURIComponent(idOrSlug).toLowerCase().trim();
  return productList.find(
    (p) =>
      (p._id && p._id.toLowerCase() === query) ||
      (p.id && p.id.toLowerCase() === query) ||
      p.name.toLowerCase() === query ||
      p.name.toLowerCase().replace(/\s+/g, "-") === query ||
      p.name.toLowerCase().replace(/[^a-z0-9]/g, "-") === query
  );
}

export const FEATURES = [
  {
    id: "quality",
    title: "Premium Quality",
    description: "Crafted with the finest timber & fabrics",
    icon: "sparkles",
  },
  {
    id: "customization",
    title: "Bespoke Customization",
    description: "Tailored spatial sizing & finishes",
    icon: "palette",
  },
  {
    id: "guarantee",
    title: "Artisan Guarantee",
    description: "5-Year structural warranty",
    icon: "shield-check",
  },
  {
    id: "support",
    title: "Design Concierge",
    description: "Direct consultation: 08130575312",
    icon: "headphones",
  },
];

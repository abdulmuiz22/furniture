import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Sassy Furniture — Modern Handcrafted Furniture",
    short_name: "Sassy Furniture",
    description: "Discover handcrafted luxury furniture pieces that blend comfort, elegance, and functionality.",
    start_url: "/",
    display: "standalone",
    background_color: "#faf8f5",
    theme_color: "#b37e44",
    icons: [
      {
        src: "/favicon.svg",
        sizes: "any",
        type: "image/svg+xml",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

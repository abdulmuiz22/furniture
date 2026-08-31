import React from "react";
import Image from "next/image";

interface LogoProps {
  variant?: "light" | "dark";
  className?: string;
  size?: "sm" | "md" | "lg";
}

export default function Logo({
  variant = "light",
  className = "",
  size = "md",
}: LogoProps) {
  const isDark = variant === "dark";
  const logoSrc = isDark ? "/logo-dark.png" : "/logo-transparent.png";

  const sizeClasses = {
    sm: "h-9",
    md: "h-11 sm:h-12",
    lg: "h-14 sm:h-16",
  };

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <Image
        src={logoSrc}
        alt="Sassy Furniture"
        width={130}
        height={110}
        className={`${sizeClasses[size]} w-auto object-contain transition-transform duration-200 hover:scale-[1.02]`}
        priority
      />
    </div>
  );
}


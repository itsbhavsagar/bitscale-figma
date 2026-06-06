import Image from "next/image";

import type { SidebarBrand } from "@/types/sidebar";

interface BrandLogoProps {
  brand: SidebarBrand;
  className?: string;
  priority?: boolean;
}

export function BrandLogo({ brand, className, priority }: BrandLogoProps) {
  return (
    <Image
      src={brand.logoSrc}
      alt={brand.name}
      width={brand.logoWidth}
      height={brand.logoHeight}
      priority={priority}
      className={className}
    />
  );
}

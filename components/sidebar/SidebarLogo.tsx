import type { SidebarBrand } from "@/types/sidebar";

import { BrandLogo } from "./BrandLogo";

interface SidebarLogoProps {
  brand: SidebarBrand;
}

export function SidebarLogo({ brand }: SidebarLogoProps) {
  return (
    <BrandLogo brand={brand} priority className="h-[22px] w-auto" />
  );
}

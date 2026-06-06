import { ChevronUp } from "lucide-react";

import type { SidebarBrand, SidebarSupportCard } from "@/types/sidebar";

import { BrandLogo } from "./BrandLogo";

interface SupportCardProps {
  brand: SidebarBrand;
  support: SidebarSupportCard;
}

export function SupportCard({ brand, support }: SupportCardProps) {
  return (
    <div className="sidebar-support-card">
      <div className="sidebar-support-card__content">
        <div className="flex min-w-0 flex-col gap-1">
          <BrandLogo brand={brand} className="h-[14px] w-auto" />
          <span className="sidebar-support-card__text">
            {support.caption}
          </span>
        </div>

        <ChevronUp
          className="sidebar-support-card__chevron"
          aria-hidden="true"
        />
      </div>
    </div>
  );
}

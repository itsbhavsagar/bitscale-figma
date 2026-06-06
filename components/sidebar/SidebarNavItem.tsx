"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight } from "lucide-react";

import type { SidebarNavItem as SidebarNavItemModel } from "@/types/sidebar";

interface SidebarNavItemProps {
  item: SidebarNavItemModel;
}

export function SidebarNavItem({ item }: SidebarNavItemProps) {
  const pathname = usePathname();
  const {
    label,
    href,
    icon: Icon,
    iconSrc,
    badgeIcon: BadgeIcon,
    active,
    disabled,
  } = item;

  const isStatic = href === null;
  const isActive = active ?? (!isStatic && pathname === href);
  const className = [
    "sidebar-nav-item",
    isActive ? "sidebar-nav-item--active" : "",
    disabled ? "sidebar-nav-item--disabled" : "",
  ].join(" ");

  const content = (
    <>
      {iconSrc ? (
        <Image
          src={iconSrc}
          alt=""
          width={18}
          height={18}
          className="sidebar-nav-item__icon"
          aria-hidden="true"
        />
      ) : Icon ? (
        <Icon className="h-[18px] w-[18px] shrink-0" aria-hidden="true" />
      ) : null}
      <span className="min-w-0 flex-1 truncate">{label}</span>
      {BadgeIcon ? (
        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#FBF1E3]">
          <BadgeIcon className="h-3 w-3 text-[#D97706]" aria-hidden="true" />
        </span>
      ) : null}
      {isActive ? (
        <ChevronRight className="h-4 w-4 shrink-0" aria-hidden="true" />
      ) : null}
    </>
  );

  if (disabled || isStatic) {
    return (
      <span className={className} aria-disabled={disabled ? "true" : undefined}>
        {content}
      </span>
    );
  }

  return (
    <Link href={href} aria-current={isActive ? "page" : undefined} className={className}>
      {content}
    </Link>
  );
}

import type { LucideIcon } from "lucide-react";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon?: LucideIcon;
  iconSrc?: string;
  href: string | null;
  active?: boolean;
  disabled?: boolean;
  badgeIcon?: LucideIcon;
}

export interface SidebarSection {
  id: string;
  title?: string;
  items: SidebarNavItem[];
}

export interface SidebarBrand {
  name: string;
  logoSrc: string;
  logoWidth: number;
  logoHeight: number;
}

export interface SidebarWorkspace {
  id: string;
  name: string;
  initials: string;
  avatarSrc?: string;
  avatarStackSrc?: string;
}

export interface SidebarSupportCard {
  caption: string;
}

export interface SidebarConfig {
  brand: SidebarBrand;
  workspace: SidebarWorkspace;
  sections: SidebarSection[];
  support: SidebarSupportCard;
}

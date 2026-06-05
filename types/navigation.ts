import { LucideIcon } from "lucide-react";

export interface NavigationItem {
  id: string;
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
  badge?: string;
}

export interface NavigationSection {
  title?: string;
  items: NavigationItem[];
}
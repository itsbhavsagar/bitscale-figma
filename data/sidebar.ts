import { BookOpen, LayoutGrid, Rocket, Settings, Tablet } from "lucide-react";

import type { SidebarConfig } from "@/types/sidebar";

export const sidebarConfig: SidebarConfig = {
  brand: {
    name: "Bitscale",
    logoSrc: "/bitscale-logo.png",
    logoWidth: 186,
    logoHeight: 22,
  },
  workspace: {
    id: "gtm-spaces",
    name: "GTM Spaces",
    initials: "GS",
    avatarSrc: "/workspace-avatar.png",
    avatarStackSrc: "/workspace-avatar2.jpg",
  },
  sections: [
    {
      id: "home",
      title: "Home",
      items: [
        {
          id: "dashboard",
          label: "My Dashboard",
          icon: LayoutGrid,
          href: "/",
        },
        {
          id: "playbooks",
          label: "Playbooks",
          icon: Tablet,
          href: "/playbooks",
          badgeIcon: Rocket,
          disabled: true,
        },
        {
          id: "integrations",
          label: "Integrations",
          iconSrc: "/navbar-icons/integration.png",
          href: "/integrations",
        },
      ],
    },
    {
      id: "other",
      title: "Other",
      items: [
        {
          id: "documentation",
          label: "Documentation",
          icon: BookOpen,
          href: null,
        },
        {
          id: "settings",
          label: "Settings",
          icon: Settings,
          href: null,
        },
      ],
    },
  ],
  support: {
    caption: "Get Support at Bitscale",
  },
};

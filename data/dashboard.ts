import { Building2, Plus, Users } from "lucide-react";

import type { DashboardConfig } from "@/types/dashboard";

export const dashboardConfig: DashboardConfig = {
  user: {
    name: "Tim",
    initials: "T",
    avatarSrc: "/avatars/User-Avatar.jpg",
  },
  credits: {
    current: 450000,
    total: 5500000,
  },
  plan: {
    label: "Booster Plan",
  },
  welcome: {
    heading: "Welcome back, Tim!",
    subtitle: "Here's your daily scoop on Bitscale!",
    actions: [
      {
        id: "find-companies",
        label: "Find Companies",
        icon: Building2,
        iconColor: "#16A34A",
        variant: "outline",
      },
      {
        id: "find-people",
        label: "Find People",
        icon: Users,
        iconColor: "#7C3AED",
        variant: "outline",
      },
      {
        id: "new-grid",
        label: "New Grid",
        icon: Plus,
        iconColor: "#FFFFFF",
        variant: "primary",
      },
    ],
  },
  demo: {
    title: "Complete product demo",
    subtitle: "92% of users nailed BitScale after this walkthrough",
    progress: 75,
    checklist: [
      { id: "1", label: "Create your data list", completed: true },
      { id: "2", label: "Connect an integration", completed: true },
      { id: "3", label: "Learn about BitAgent", completed: true },
      { id: "4", label: "Customise waterfall providers", completed: false },
    ],
  },
  searchPlaceholder: "Search grids and workbooks...",
};

import type { WelcomeAction } from "./grids";

interface DashboardUser {
  name: string;
  initials: string;
  avatarSrc?: string;
}

interface CreditBadge {
  current: number;
  total: number;
}

interface PlanBadge {
  label: string;
}

interface DemoChecklistItem {
  id: string;
  label: string;
  completed: boolean;
}

interface ProductDemoConfig {
  title: string;
  subtitle: string;
  progress: number;
  checklist: DemoChecklistItem[];
}

export interface DashboardConfig {
  user: DashboardUser;
  credits: CreditBadge;
  plan: PlanBadge;
  welcome: {
    heading: string;
    subtitle: string;
    actions: WelcomeAction[];
  };
  demo: ProductDemoConfig;
  searchPlaceholder: string;
}

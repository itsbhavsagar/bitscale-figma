import type { Metadata } from "next";

import { Dashboard } from "@/components/dashboard";

export const metadata: Metadata = {
  title: "Dashboard | Bitscale",
  description: "Overview of grids, workbooks, and activity in Bitscale.",
};

export default function HomePage() {
  return <Dashboard />;
}

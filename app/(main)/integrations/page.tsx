import type { Metadata } from "next";

import { DashboardHeader } from "@/components/header";
import { IntegrationGrid } from "@/components/integration/IntegrationGrid";

export const metadata: Metadata = {
  title: "Integrations | Bitscale",
  description: "Connect and manage your Bitscale integrations.",
};

export default function IntegrationsPage() {
  return (
    <div className="dashboard-shell">
      <DashboardHeader />
      <IntegrationGrid />
    </div>
  );
}

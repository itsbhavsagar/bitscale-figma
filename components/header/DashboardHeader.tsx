import { Avatar } from "@/components/shared/Avatar";
import { dashboardConfig } from "@/data/dashboard";

import { CreditsPill } from "./CreditsPill";

export function DashboardHeader() {
  const { user, credits, plan } = dashboardConfig;

  return (
    <header className="dashboard-header">
      <CreditsPill
        current={credits.current}
        total={credits.total}
        planLabel={plan.label}
      />

      <Avatar
        name={user.name}
        initials={user.initials}
        src={user.avatarSrc}
        size="md"
      />
    </header>
  );
}

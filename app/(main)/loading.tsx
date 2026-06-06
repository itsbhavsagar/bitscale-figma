import { DashboardSkeleton } from "@/components/dashboard/DashboardSkeleton";
import { SidebarSkeleton } from "@/components/sidebar/SidebarSkeleton";

export default function MainLoading() {
  return (
    <div className="flex h-screen overflow-hidden bg-(--page-bg)">
      <SidebarSkeleton />
      <DashboardSkeleton />
    </div>
  );
}

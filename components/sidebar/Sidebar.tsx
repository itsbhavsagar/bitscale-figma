"use client";

import { useEffect, useState } from "react";

import { sidebarConfig } from "@/data/sidebar";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { SidebarSection } from "./SidebarSection";
import { SupportCard } from "./SupportCard";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

const sidebarSkeletonSeenKey = "bitscale.sidebar.skeleton.seen";

export function Sidebar() {
  const [loading, setLoading] = useState(true);
  const { brand, workspace, sections, support } = sidebarConfig;

  useEffect(() => {
    const hasSeenSkeleton = (() => {
      try {
        return window.sessionStorage.getItem(sidebarSkeletonSeenKey) === "1";
      } catch {
        return false;
      }
    })();

    if (hasSeenSkeleton) {
      const instantTimer = window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(instantTimer);
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(sidebarSkeletonSeenKey, "1");
      } catch {
      }
      setLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  if (loading) return <SidebarSkeleton />;

  return (
    <aside className="dashboard-sidebar flex h-screen flex-col border-r border-border bg-sidebar-bg">
      <div className="border-b border-border px-4 py-4">
        <SidebarLogo brand={brand} />
      </div>

      <div className="border-b border-border">
        <WorkspaceSwitcher workspace={workspace} />
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-2 py-4">
        {sections.map((section) => (
          <SidebarSection key={section.id} section={section} />
        ))}
      </div>

      <SupportCard brand={brand} support={support} />
    </aside>
  );
}

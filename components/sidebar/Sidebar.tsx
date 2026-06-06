"use client";

import { useEffect, useState } from "react";
import { Menu } from "lucide-react";

import { sidebarConfig } from "@/data/sidebar";
import { useWorkspace } from "@/hooks/useWorkspace";
import { SidebarLogo } from "./SidebarLogo";
import { SidebarSkeleton } from "./SidebarSkeleton";
import { SidebarSection } from "./SidebarSection";
import { SupportCard } from "./SupportCard";
import { WorkspaceSwitcher } from "./WorkspaceSwitcher";

const sidebarSkeletonSeenKey = "bitscale.sidebar.skeleton.seen";

export function Sidebar() {
  const [loading, setLoading] = useState(true);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { brand, sections, support } = sidebarConfig;
  const { workspace } = useWorkspace();

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

  useEffect(() => {
    if (!isMobileOpen) return;

    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [isMobileOpen]);

  const handleOpenCommandPalette = () => {
    window.dispatchEvent(new Event("bitscale:command-palette-open"));
  };

  const sidebar = loading ? (
    <SidebarSkeleton
      className={isMobileOpen ? "dashboard-sidebar--mobile-open" : ""}
    />
  ) : (
    <aside
      className={[
        "dashboard-sidebar flex h-screen flex-col border-r border-border bg-sidebar-bg",
        isMobileOpen ? "dashboard-sidebar--mobile-open" : "",
      ].join(" ")}
    >
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

      <div className="px-2 pb-2">
        <div className="spinning-border">
          <button
            type="button"
            onClick={handleOpenCommandPalette}
            className="sidebar-command-trigger bg-white"
          >
            <span className="sidebar-command-trigger__title">Command Menu</span>
            <span className="sidebar-command-trigger__hint">⌘K / Ctrl+K</span>
          </button>
        </div>
      </div>

      <SupportCard brand={brand} support={support} />
    </aside>
  );

  return (
    <>
      <button
        type="button"
        className="sidebar-mobile-toggle"
        aria-label="Open sidebar menu"
        aria-expanded={isMobileOpen}
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-4 w-4" />
      </button>
      {isMobileOpen ? (
        <button
          type="button"
          className="sidebar-mobile-backdrop"
          aria-label="Close sidebar menu"
          onClick={() => setIsMobileOpen(false)}
        />
      ) : null}
      {sidebar}
    </>
  );
}

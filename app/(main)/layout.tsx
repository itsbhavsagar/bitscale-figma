import type { ReactNode } from "react";

import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { Sidebar } from "@/components/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-(--page-bg)">
      <Sidebar />
      {children}
      <CommandPalette />
    </div>
  );
}

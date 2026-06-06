import type { ReactNode } from "react";

import { Sidebar } from "@/components/sidebar";

interface MainLayoutProps {
  children: ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="flex h-screen overflow-hidden bg-(--page-bg)">
      <Sidebar />
      {children}
    </div>
  );
}

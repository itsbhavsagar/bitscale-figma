import type { SidebarSection as SidebarSectionModel } from "@/types/sidebar";

import { SidebarNavItem } from "./SidebarNavItem";

interface SidebarSectionProps {
  section: SidebarSectionModel;
}

export function SidebarSection({ section }: SidebarSectionProps) {
  return (
    <div className="flex flex-col gap-1">
      {section.title ? (
        <h3 className="sidebar-section-title">{section.title}</h3>
      ) : null}
      <nav className="flex flex-col gap-0.5">
        {section.items.map((item) => (
          <SidebarNavItem key={item.id} item={item} />
        ))}
      </nav>
    </div>
  );
}

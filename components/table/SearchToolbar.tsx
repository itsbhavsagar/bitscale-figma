"use client";

import { useState } from "react";

import { SearchInput } from "@/components/shared/SearchInput";
import type { GridTab, GridTabId, GridViewMode } from "@/types/grids";

import { ViewToggle } from "./ViewToggle";

interface SearchToolbarProps {
  tabs: GridTab[];
  activeTab: GridTabId;
  onTabChange: (tab: GridTabId) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  searchPlaceholder: string;
}

export function SearchToolbar({
  tabs,
  activeTab,
  onTabChange,
  searchQuery,
  onSearchChange,
  searchPlaceholder,
}: SearchToolbarProps) {
  const [viewMode, setViewMode] = useState<GridViewMode>("table");

  return (
    <div className="dashboard-toolbar">
      <div className="grid-tabs" role="tablist" aria-label="Grid filters">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            role="tab"
            aria-selected={activeTab === tab.id}
            className={[
              "grid-tab",
              activeTab === tab.id ? "grid-tab--active" : "",
            ].join(" ")}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="dashboard-toolbar-actions">
        <SearchInput
          value={searchQuery}
          onChange={onSearchChange}
          placeholder={searchPlaceholder}
          ariaLabel="Search grids and workbooks"
        />
        <ViewToggle viewMode={viewMode} onChange={setViewMode} />
      </div>
    </div>
  );
}

"use client";

import { LayoutGrid, LayoutList } from "lucide-react";

import { IconButton } from "@/components/shared/IconButton";
import type { GridViewMode } from "@/types/grids";

interface ViewToggleProps {
  viewMode: GridViewMode;
  onChange: (mode: GridViewMode) => void;
}

export function ViewToggle({ viewMode, onChange }: ViewToggleProps) {
  const isCompact = viewMode === "compact";

  return (
    <IconButton
      active={isCompact}
      onClick={() => onChange(isCompact ? "table" : "compact")}
      aria-label={isCompact ? "Switch to table view" : "Switch to compact view"}
      title={isCompact ? "Table view" : "Compact view"}
      className="h-(--search-input-height)! w-(--search-input-height)! border-border! bg-gray-100! hover:bg-[#ECEEF0]!"
    >
      {isCompact ? (
        <LayoutGrid className="h-4 w-4" />
      ) : (
        <LayoutList className="h-4 w-4" />
      )}
    </IconButton>
  );
}

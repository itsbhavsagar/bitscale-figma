import type { LucideIcon } from "lucide-react";

export type GridPlatform =
  | "workbook"
  | "linkedin"
  | "sales-navigator"
  | "google-maps"
  | "google-search"
  | "find-people"
  | "factors"
  | "apollo"
  | "form"
  | "hubspot"
  | "csv";

export type GridTabId = "my-grids" | "starred";

export type GridViewMode = "table" | "compact";
export type WelcomeActionId = "new-grid" | "find-people" | "find-companies";

interface GridEditor {
  name: string;
  initials: string;
  avatarSrc?: string;
}

export interface GridRow {
  id: string;
  name: string;
  platform: GridPlatform;
  starred?: boolean;
  editedBy: GridEditor;
  lastEdited: string;
  lastEditedDate: Date;
  expandable?: boolean;
  isWorkbook?: boolean;
  parentId?: string;
  childPlatforms?: GridPlatform[];
}

export interface GridTab {
  id: GridTabId;
  label: string;
}

export interface NewGridFormData {
  name: string;
  description: string;
  type: GridPlatform;
}

export interface WelcomeAction {
  id: WelcomeActionId;
  label: string;
  icon: LucideIcon;
  iconColor: string;
  variant: "outline" | "primary";
}

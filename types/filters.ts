import type { LucideIcon } from "lucide-react";

export interface FilterSectionConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  placeholder: string;
  defaultOpen?: boolean;
}

interface LeadFiltersConfig {
  title: string;
  filters: FilterSectionConfig[];
  usage: {
    current: number;
    total: number;
  };
  upsellText: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  tableColumns: string[];
}

export type PeopleFiltersConfig = LeadFiltersConfig;
export type CompanyFiltersConfig = LeadFiltersConfig;

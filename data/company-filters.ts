import {
  Building2,
  DollarSign,
  Globe,
  Users,
} from "lucide-react";

import type { CompanyFiltersConfig } from "@/types/filters";
import type { SavedSearchPreset } from "@/types/mock-search";

export const companyFiltersConfig: CompanyFiltersConfig = {
  title: "Find Companies",
  filters: [
    {
      id: "company-name",
      label: "Company Name",
      icon: Building2,
      placeholder: "E.g: Google, Microsoft",
      defaultOpen: true,
    },
    {
      id: "industry",
      label: "Industry",
      icon: Building2,
      placeholder: "E.g: Software, Healthcare",
    },
    {
      id: "country",
      label: "Country",
      icon: Globe,
      placeholder: "E.g: United States, UAE",
    },
    {
      id: "employee-count",
      label: "Employee Count",
      icon: Users,
      placeholder: "E.g: 11-50, 10000+",
    },
    {
      id: "revenue",
      label: "Revenue",
      icon: DollarSign,
      placeholder: "E.g: $1M-$10M, $100M+",
    },
  ],
  usage: {
    current: 8000,
    total: 50000,
  },
  upsellText: "Unlock 100,000 leads with Enterprise Plan*",
  emptyStateTitle: "Start your Company search",
  emptyStateDescription:
    "Start your company search, preview, and import companies for enrichment by applying any filter in the left panel.\nOR\nImport companies from a saved search.",
  tableColumns: [
    "COMPANY NAME",
    "INDUSTRY",
    "WEBSITE",
    "EMP COUNT",
    "LOCATION",
  ],
};

export const companySavedSearches: SavedSearchPreset[] = [
  {
    id: "saas-startups",
    label: "SaaS Startups",
    values: {
      industry: "SaaS",
      "employee-count": "11-50",
    },
  },
  {
    id: "enterprise-accounts",
    label: "Enterprise Accounts",
    values: {
      "employee-count": "5000+",
      revenue: "$100M+",
      country: "United States",
    },
  },
  {
    id: "healthcare-companies",
    label: "Healthcare Companies",
    values: {
      industry: "Healthcare",
      "employee-count": "501-5000",
    },
  },
  {
    id: "fintech-companies",
    label: "Fintech Companies",
    values: {
      industry: "FinTech",
      "employee-count": "201-500",
    },
  },
];

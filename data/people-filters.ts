import {
  Briefcase,
  Globe,
  MapPin,
  MapPinned,
  SlidersHorizontal,
  User,
  Users,
} from "lucide-react";

import type { PeopleFiltersConfig } from "@/types/filters";
import type { SavedSearchPreset } from "@/types/mock-search";

export const peopleFiltersConfig: PeopleFiltersConfig = {
  title: "Find People",
  filters: [
    {
      id: "people-keyword",
      label: "People Keyword",
      icon: User,
      placeholder: "Enter single keyword here...",
      defaultOpen: true,
    },
    {
      id: "job-title",
      label: "Job Title",
      icon: Briefcase,
      placeholder: "E.g: Manager, Software Engineer",
    },
    {
      id: "company-website",
      label: "Company Website",
      icon: Globe,
      placeholder: "Eg: Google.com, LinkedIn.com",
    },
    {
      id: "person-location",
      label: "Person Location",
      icon: MapPin,
      placeholder: "Eg: London, Great New York City",
    },
    {
      id: "company-location",
      label: "Company Location",
      icon: MapPinned,
      placeholder: "E.g: United States, UAE",
    },
    {
      id: "company-headcount",
      label: "Company Headcount",
      icon: Users,
      placeholder: "E.g: 11-50, 10000+",
    },
    {
      id: "management-level",
      label: "Management Level",
      icon: SlidersHorizontal,
      placeholder: "E.g: Owner, Founder",
    },
  ],
  usage: {
    current: 8000,
    total: 50000,
  },
  upsellText: "Unlock 100,000 leads with Enterprise Plan*",
  emptyStateTitle: "Start your people search",
  emptyStateDescription:
    "Start your people search, preview, and import contacts for enrichment by applying any filter in the left panel.\nOR\nImport contacts from a saved search.",
  tableColumns: [
    "NAME",
    "TITLE",
    "COMPANY",
    "LINKEDIN URL",
    "LOCATION",
  ],
};

export const peopleSavedSearches: SavedSearchPreset[] = [
  {
    id: "saas-startups",
    label: "SaaS Startups",
    values: {
      "people-keyword": "SaaS",
      "job-title": "Founding Engineer",
      "company-headcount": "11-50",
    },
  },
  {
    id: "enterprise-accounts",
    label: "Enterprise Accounts",
    values: {
      "job-title": "VP Sales",
      "company-headcount": "5000+",
    },
  },
  {
    id: "healthcare-companies",
    label: "Healthcare Companies",
    values: {
      "people-keyword": "Healthcare",
      "job-title": "Operations Manager",
    },
  },
  {
    id: "fintech-companies",
    label: "Fintech Companies",
    values: {
      "people-keyword": "FinTech",
      "job-title": "Engineering Manager",
    },
  },
];

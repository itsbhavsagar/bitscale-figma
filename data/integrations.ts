import type {
  Integration,
  IntegrationCategory,
  IntegrationConnectConfig,
  IntegrationFilterOption,
} from "@/types/integration";

export const integrationCategories: IntegrationCategory[] = [
  "Sales Intelligence",
  "CRM",
  "Data Sources",
  "Automation",
  "Storage",
];

export const integrationFilterOptions: IntegrationFilterOption[] = [
  { value: "all", label: "All" },
  { value: "connected", label: "Connected" },
  { value: "available", label: "Available" },
  { value: "coming_soon", label: "Coming Soon" },
];

export const integrationData: Integration[] = [
  {
    id: "linkedin",
    name: "LinkedIn",
    category: "Sales Intelligence",
    icon: "linkedin",
    status: "connected",
    description: "Connected successfully",
    lastSynced: "2026-06-06T03:45:00.000Z",
  },
  {
    id: "sales-navigator",
    name: "Sales Navigator",
    category: "Sales Intelligence",
    icon: "sales-navigator",
    status: "available",
    description: "Connect account",
  },
  {
    id: "apollo",
    name: "Apollo",
    category: "Sales Intelligence",
    icon: "apollo",
    status: "available",
    description: "Connect account",
  },
  {
    id: "zoominfo",
    name: "ZoomInfo",
    category: "Sales Intelligence",
    icon: "zoominfo",
    status: "coming_soon",
    description: "Coming soon",
  },
  {
    id: "hubspot",
    name: "HubSpot",
    category: "CRM",
    icon: "hubspot",
    status: "available",
    description: "Connect account",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    category: "CRM",
    icon: "salesforce",
    status: "available",
    description: "Connect account",
  },
  {
    id: "pipedrive",
    name: "Pipedrive",
    category: "CRM",
    icon: "pipedrive",
    status: "available",
    description: "Connect account",
  },
  {
    id: "google-maps",
    name: "Google Maps",
    category: "Data Sources",
    icon: "google-maps",
    status: "connected",
    description: "Connected successfully",
    lastSynced: "2026-06-06T01:10:00.000Z",
  },
  {
    id: "google-search",
    name: "Google Search",
    category: "Data Sources",
    icon: "google-search",
    status: "available",
    description: "Connect account",
  },
  {
    id: "clearbit",
    name: "Clearbit",
    category: "Data Sources",
    icon: "clearbit",
    status: "coming_soon",
    description: "Coming soon",
  },
  {
    id: "webhook",
    name: "Webhook",
    category: "Automation",
    icon: "webhook",
    status: "available",
    description: "Connect account",
  },
  {
    id: "zapier",
    name: "Zapier",
    category: "Automation",
    icon: "zapier",
    status: "available",
    description: "Connect account",
  },
  {
    id: "make",
    name: "Make",
    category: "Automation",
    icon: "make",
    status: "coming_soon",
    description: "Coming soon",
  },
  {
    id: "airtable",
    name: "Airtable",
    category: "Storage",
    icon: "airtable",
    status: "available",
    description: "Connect account",
  },
  {
    id: "google-sheets",
    name: "Google Sheets",
    category: "Storage",
    icon: "google-sheets",
    status: "available",
    description: "Connect account",
  },
  {
    id: "csv-import",
    name: "CSV Import",
    category: "Storage",
    icon: "csv-import",
    status: "available",
    description: "Connect account",
  },
];

export const integrationConnectConfigs: IntegrationConnectConfig[] = [
  {
    integrationId: "hubspot",
    title: "Connect HubSpot",
    submitLabel: "Connect",
    fields: [
      {
        id: "apiKey",
        label: "API Key",
        placeholder: "Enter HubSpot API key",
        type: "password",
      },
    ],
  },
  {
    integrationId: "salesforce",
    title: "Connect Salesforce",
    submitLabel: "Connect",
    fields: [
      {
        id: "clientId",
        label: "Client ID",
        placeholder: "Enter Salesforce client ID",
        type: "text",
      },
      {
        id: "clientSecret",
        label: "Client Secret",
        placeholder: "Enter Salesforce client secret",
        type: "password",
      },
    ],
  },
  {
    integrationId: "webhook",
    title: "Connect Webhook",
    submitLabel: "Save",
    fields: [
      {
        id: "endpointUrl",
        label: "Endpoint URL",
        placeholder: "https://example.com/webhook",
        type: "url",
      },
    ],
  },
];

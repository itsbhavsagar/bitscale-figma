type IntegrationStatus = "connected" | "available" | "coming_soon";

export type IntegrationCategory =
  | "Sales Intelligence"
  | "CRM"
  | "Data Sources"
  | "Automation"
  | "Storage";

type IntegrationIcon =
  | "linkedin"
  | "sales-navigator"
  | "apollo"
  | "zoominfo"
  | "hubspot"
  | "salesforce"
  | "pipedrive"
  | "google-maps"
  | "google-search"
  | "clearbit"
  | "webhook"
  | "zapier"
  | "make"
  | "airtable"
  | "google-sheets"
  | "csv-import";

export interface Integration {
  id: string;
  name: string;
  category: IntegrationCategory;
  icon: IntegrationIcon;
  status: IntegrationStatus;
  description: string;
  lastSynced?: string;
}

export interface IntegrationFilterOption {
  value: "all" | "connected" | "available";
  label: string;
}

interface IntegrationConnectField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "password" | "url";
}

export interface IntegrationConnectConfig {
  integrationId: string;
  title: string;
  submitLabel: string;
  fields: IntegrationConnectField[];
}

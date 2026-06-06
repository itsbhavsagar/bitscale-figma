"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Link2, Settings2, Unplug } from "lucide-react";

import { Badge, Button } from "@/components/shared";
import type { Integration } from "@/types/integration";

interface IntegrationCardProps {
  integration: Integration;
  onConnect: (integration: Integration) => void;
  onDisconnect: (integration: Integration) => void;
  onManage: (integration: Integration) => void;
}

function formatLastSynced(lastSynced?: string): string {
  if (!lastSynced) return "Last synced recently";

  const syncDate = new Date(lastSynced);
  const deltaMs = Date.now() - syncDate.getTime();
  const deltaHours = Math.max(1, Math.round(deltaMs / (1000 * 60 * 60)));
  return `Last synced ${deltaHours} hour${deltaHours === 1 ? "" : "s"} ago`;
}

function StatusBadge({ status }: { status: Integration["status"] }) {
  if (status === "connected") return <Badge variant="green">Connected</Badge>;
  if (status === "available") return <Badge variant="neutral">Available</Badge>;
  return <Badge variant="orange">Coming Soon</Badge>;
}

const imageIconByType = {
  linkedin: "/company-icons/linkedin.png",
  "sales-navigator": "/company-icons/sales-nav.png",
  apollo: "/company-icons/factors.png",
  zoominfo: "/company-icons/users.png",
  hubspot: "/company-icons/hubspot.png",
  salesforce: "/company-icons/factors.png",
  pipedrive: "/company-icons/factors.png",
  "google-maps": "/company-icons/google.png",
  "google-search": "/company-icons/google-logo.png",
  clearbit: "/company-icons/users.png",
  webhook: "/company-icons/file.png",
  zapier: "/company-icons/factors.png",
  make: "/company-icons/factors.png",
  airtable: "/company-icons/file.png",
  "google-sheets": "/company-icons/google-logo.png",
  "csv-import": "/company-icons/file.png",
} as const satisfies Record<Integration["icon"], string>;

const chipsByCategory: Record<Integration["category"], string[]> = {
  "Sales Intelligence": ["Prospecting", "Enrichment"],
  CRM: ["Contacts", "Sync"],
  "Data Sources": ["Intent Signals", "Enrichment"],
  Automation: ["Automation", "Workflows"],
  Storage: ["Import", "Sync"],
};

const detailTextById: Partial<Record<Integration["id"], string>> = {
  apollo: "Run Apollo APIs to enrich leads and automate prospecting workflows in your grids.",
  zoominfo:
    "Use ZoomInfo data to identify target accounts and discover real-time intent signals.",
  linkedin:
    "Enrich people and company data from LinkedIn activity to keep your pipeline fresh.",
  "sales-navigator":
    "Connect your Sales Navigator account to sync saved leads directly into your workspace.",
  hubspot: "Sync contacts and companies from HubSpot to keep your GTM data unified.",
  salesforce: "Bi-directional Salesforce sync for accounts, contacts, and opportunity context.",
  pipedrive: "Import and map deals from Pipedrive into your outreach and enrichment workflows.",
  "google-maps":
    "Source verified business location and category data from Google Maps into grids.",
  "google-search":
    "Collect company-level public signals from Google Search for faster qualification.",
  clearbit: "Enrich records with firmographic and technographic insights from Clearbit.",
  webhook: "Push lead and account events to any downstream system via secure webhooks.",
  zapier: "Trigger no-code automations whenever leads, companies, or grids are updated.",
  make: "Design advanced automation scenarios across your GTM stack with Make.",
  airtable: "Sync your Airtable bases to centralize prospecting and enrichment execution.",
  "google-sheets": "Keep Google Sheets and Bitscale grids in sync for collaborative workflows.",
  "csv-import": "Import CSV files in seconds and map columns for consistent data operations.",
};

const chipsById: Partial<Record<Integration["id"], string[]>> = {
  apollo: ["Prospecting", "Enrichment"],
  zoominfo: ["Intent Signals", "Enrichment"],
  linkedin: ["Prospecting", "Social", "Enrichment"],
  "sales-navigator": ["Prospecting", "Social"],
  hubspot: ["CRM Sync", "Contacts"],
  salesforce: ["CRM Sync", "Accounts"],
  pipedrive: ["Deals", "CRM Sync"],
  "google-maps": ["Geo Data", "Enrichment"],
  "google-search": ["Signals", "Research"],
  clearbit: ["Firmographics", "Enrichment"],
  webhook: ["Outbound", "Automation"],
  zapier: ["No-Code", "Automation"],
  make: ["Scenarios", "Automation"],
  airtable: ["Storage", "Sync"],
  "google-sheets": ["Sheets", "Sync"],
  "csv-import": ["Import", "Storage"],
};

function IntegrationIcon({ integration }: { integration: Integration }) {
  return (
    <span className="integration-icon-shell">
      <Image
        src={imageIconByType[integration.icon]}
        alt={integration.name}
        width={20}
        height={20}
        className="integration-icon-image"
      />
    </span>
  );
}

export function IntegrationCard({
  integration,
  onConnect,
  onDisconnect,
  onManage,
}: IntegrationCardProps) {
  const chips = chipsById[integration.id] ?? chipsByCategory[integration.category];
  const detailText = detailTextById[integration.id] ?? integration.description;

  return (
    <motion.article
      className="integration-card"
      whileHover={{ y: -3, boxShadow: "0 12px 28px rgba(15, 23, 42, 0.12)" }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <div className="integration-card__body">
        <div className="integration-card__header">
          <div className="integration-card__title-row">
            <IntegrationIcon integration={integration} />
            <StatusBadge status={integration.status} />
          </div>

          <p className="integration-card__title">{integration.name}</p>
          <p className="integration-card__description">{detailText}</p>

          <div className="integration-card__chips">
            {chips.map((chip) => (
              <span key={`${integration.id}-${chip}`} className="integration-card__chip">
                {chip}
              </span>
            ))}
          </div>
        </div>

        <div className="integration-card__status-row">
          {integration.status === "connected" ? formatLastSynced(integration.lastSynced) : integration.category}
        </div>
      </div>

      <div className="integration-card__actions">
        {integration.status === "connected" ? (
          <>
            <Button
              variant="primary"
              className="flex-1"
              onClick={() => onManage(integration)}
              aria-label={`Manage ${integration.name}`}
            >
              <Settings2 className="h-4 w-4" />
              Manage
            </Button>
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onDisconnect(integration)}
              aria-label={`Disconnect ${integration.name}`}
            >
              <Unplug className="h-4 w-4" />
              Disconnect
            </Button>
          </>
        ) : null}

        {integration.status === "available" ? (
          <Button variant="outline" className="integration-card__icon-action" onClick={() => onConnect(integration)}>
            <Link2 className="h-4 w-4" />
          </Button>
        ) : null}

        {integration.status === "available" ? (
          <Button variant="primary" className="flex-1" onClick={() => onConnect(integration)}>
            Connect
          </Button>
        ) : null}

        {integration.status === "coming_soon" ? (
          <Button variant="outline" className="w-full" disabled>
            Coming Soon
          </Button>
        ) : null}
      </div>
    </motion.article>
  );
}

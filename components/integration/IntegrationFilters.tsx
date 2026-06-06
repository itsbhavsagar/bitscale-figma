"use client";

import { Badge, SearchInput, Select } from "@/components/shared";
import { integrationFilterOptions } from "@/data/integrations";
import type { IntegrationFilterOption } from "@/types/integration";

interface IntegrationFiltersProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
  statusFilter: IntegrationFilterOption["value"];
  onStatusFilterChange: (value: IntegrationFilterOption["value"]) => void;
  connectedCount: number;
}

export function IntegrationFilters({
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  connectedCount,
}: IntegrationFiltersProps) {
  return (
    <div className="integration-toolbar">
      <div className="integration-toolbar__row">
        <div>
          <h1 className="section-title">Integrations</h1>
          <p className="section-subtitle mt-(--spacing-1)">
            Connect external platforms to enrich and automate workflows
          </p>
        </div>

        <div className="integration-toolbar__controls">
          <SearchInput
            value={searchQuery}
            onChange={onSearchChange}
            placeholder="Search integrations"
            ariaLabel="Search integrations"
            className="w-full md:w-(--search-input-width)"
          />

          <div className="integration-toolbar__select">
            <Select
              value={statusFilter}
              onChange={onStatusFilterChange}
              options={integrationFilterOptions}
              id="integration-status-filter"
            />
          </div>
        </div>
      </div>

      <div className="integration-status-row">
        <Badge variant="green">{connectedCount} Connected</Badge>
      </div>
    </div>
  );
}

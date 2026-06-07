"use client";

import { Eye, FileSearch, Lock, Search } from "lucide-react";
import Image from "next/image";
import { useMemo, useState } from "react";

import { Badge } from "@/components/shared/Badge";
import { Button } from "@/components/shared/Button";
import { EmptyState } from "@/components/shared/EmptyState";
import { Modal } from "@/components/shared/Modal";
import {
  generateMockSearchResult,
  getLoadingFlowStage,
  getLoadingFlowStageCount,
  hasAtLeastOneSearchCriterion,
} from "@/lib/mock-search";
import type { FilterSectionConfig } from "@/types/filters";
import type {
  SavedSearchPreset,
  SearchMode,
  SearchTableRow,
} from "@/types/mock-search";

import { FilterPanel } from "./FilterSection";
import { ResultsTable } from "./ResultsTable";
import { SavedSearchDropdown } from "./SavedSearchDropdown";

interface LeadSearchModalProps {
  open: boolean;
  onClose: () => void;
  mode: SearchMode;
  title: string;
  filters: FilterSectionConfig[];
  usage: { current: number; total: number };
  upsellText: string;
  emptyStateTitle: string;
  emptyStateDescription: string;
  tableColumns: string[];
  savedSearches: SavedSearchPreset[];
}

type PreviewState = "idle" | "loading" | "loaded";

const sleep = (ms: number) =>
  new Promise((resolve) => window.setTimeout(resolve, ms));

export function LeadSearchModal({
  open,
  onClose,
  mode,
  title,
  filters,
  usage,
  upsellText,
  emptyStateTitle,
  emptyStateDescription,
  tableColumns,
  savedSearches,
}: LeadSearchModalProps) {
  const [filterValues, setFilterValues] = useState<Record<string, string>>(() =>
    Object.fromEntries(filters.map((filter) => [filter.id, ""])),
  );
  const [previewState, setPreviewState] = useState<PreviewState>("idle");
  const [loadingStageIndex, setLoadingStageIndex] = useState(0);
  const [rows, setRows] = useState<SearchTableRow[]>([]);
  const [resultCount, setResultCount] = useState<number>(0);
  const [validationMessage, setValidationMessage] = useState<string | null>(
    null,
  );

  const resetState = () => {
    setFilterValues(
      Object.fromEntries(filters.map((filter) => [filter.id, ""])),
    );
    setPreviewState("idle");
    setLoadingStageIndex(0);
    setRows([]);
    setResultCount(0);
    setValidationMessage(null);
  };

  const handleClose = () => {
    resetState();
    onClose();
  };

  const handleFilterChange = (id: string, value: string) => {
    setFilterValues((previous) => ({ ...previous, [id]: value }));
  };

  const handleSavedSearchSelect = (preset: SavedSearchPreset) => {
    setFilterValues((previous) => ({ ...previous, ...preset.values }));
    setValidationMessage(null);
  };

  const handlePreview = async () => {
    if (!hasAtLeastOneSearchCriterion(filterValues)) {
      setValidationMessage("Please enter at least one search criterion.");
      setPreviewState("idle");
      setRows([]);
      return;
    }

    setValidationMessage(null);
    setPreviewState("loading");
    setRows([]);

    for (let index = 0; index < getLoadingFlowStageCount(); index += 1) {
      setLoadingStageIndex(index);
      await sleep(500);
    }

    const result = generateMockSearchResult(mode, filterValues);
    setRows(result.rows);
    setResultCount(result.totalCount);
    setPreviewState("loaded");
  };

  const summaryText = useMemo(() => {
    if (previewState === "loading") {
      return getLoadingFlowStage(loadingStageIndex);
    }

    if (previewState === "loaded") {
      const formatted = new Intl.NumberFormat("en-US").format(resultCount);
      return mode === "people"
        ? `Found ${formatted} matching people`
        : `Found ${formatted} matching companies`;
    }

    return mode === "people"
      ? "Found 0 people. Click preview to view results"
      : "Found 0 companies. Click preview to view results";
  }, [loadingStageIndex, mode, previewState, resultCount]);

  const entityLabel = mode === "people" ? "people" : "companies";

  return (
    <Modal open={open} onClose={handleClose} size="xl" hideHeader title={title}>
      <div className="lead-search-modal px-6 py-6 flex h-full items-start gap-6 overflow-hidden">
        <FilterPanel
          title={title}
          headerAction={
            <SavedSearchDropdown
              options={savedSearches}
              onSelect={handleSavedSearchSelect}
            />
          }
          filters={filters}
          values={filterValues}
          onChange={handleFilterChange}
          footer={
            <>
              <button type="button" className="btn-secondary w-44.5">
                <FileSearch
                  className="btn-secondary__icon"
                  style={{ strokeWidth: 2.15 }}
                />
                Save Search
              </button>
              <Button
                variant="primary"
                size="sm"
                onClick={handlePreview}
                className="w-44.5 shadow-none"
              >
                <Eye className="h-4 w-4" />
                Preview Result
              </Button>
            </>
          }
        />

        <div className="lead-search-results ml-0 mt-2 flex h-144 w-155.75 min-w-0 shrink-0 flex-col gap-2">
          <div className="results-info">
            <div className="results-info__badge-row">
              <Badge variant="neutral" className="results-info__badge">
                <Search className="results-info__badge-icon" />
                {usage.current}/{usage.total}
              </Badge>
            </div>

            <div className="results-info__row">
              <span className="results-info__found">{summaryText}</span>
              <span className="results-info__unlock">
                <Lock className="results-info__unlock-icon" />
                {upsellText}
              </span>
            </div>
            {validationMessage ? (
              <p className="text-[12px] font-medium text-(--platform-google-maps)">
                {validationMessage}
              </p>
            ) : null}
          </div>

          <div className="lead-search-results-card flex h-full flex-col overflow-hidden rounded-lg border border-border bg-background shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]">
            <div
              className="grid gap-4 border-b border-border px-5 py-2.5"
              style={{
                gridTemplateColumns: `repeat(${tableColumns.length}, minmax(0, 1fr))`,
                backgroundColor: "var(--table-header-bg)",
              }}
            >
              {tableColumns.map((column, index) => (
                <div
                  key={`header-${column}-${index}`}
                  className="truncate text-left text-[11px] font-medium tracking-wide text-text-secondary"
                >
                  {column}
                </div>
              ))}
            </div>

            {previewState === "idle" ? (
              <div className="flex flex-1 items-center justify-center overflow-hidden">
                <div className="flex h-63.5 w-102.75 items-center justify-center">
                  <EmptyState
                    title={emptyStateTitle}
                    illustration={
                      <Image
                        src="/modal-view.png"
                        alt=""
                        width={200}
                        height={200}
                        className="h-auto w-50"
                      />
                    }
                    containerClassName="h-full w-full px-0 py-0"
                    illustrationClassName="-mb-3"
                    description={emptyStateDescription}
                    descriptionClassName="max-w-[351px] min-h-[72px]"
                  />
                </div>
              </div>
            ) : previewState === "loaded" && rows.length === 0 ? (
              <div className="flex flex-1 items-center justify-center overflow-hidden">
                <EmptyState
                  title={`No matching ${entityLabel} found.`}
                  description="Try adjusting your filters."
                  containerClassName="h-full w-full px-0 py-0"
                  descriptionClassName="max-w-[351px] min-h-[24px]"
                />
              </div>
            ) : (
              <ResultsTable
                columns={tableColumns}
                rows={rows}
                totalCount={resultCount}
                entityLabel={entityLabel}
                loading={previewState === "loading"}
                loadingLabel={getLoadingFlowStage(loadingStageIndex)}
              />
            )}
          </div>
        </div>
      </div>
    </Modal>
  );
}

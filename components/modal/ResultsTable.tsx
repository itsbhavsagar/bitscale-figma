"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useMemo, useState } from "react";

import type { SearchTableRow } from "@/types/mock-search";

interface ResultsTableProps {
  columns: string[];
  rows: SearchTableRow[];
  totalCount: number;
  entityLabel: string;
  loading: boolean;
  loadingLabel?: string;
  pageSize?: number;
}

function SkeletonRows({
  columns,
  count,
}: {
  columns: string[];
  count: number;
}) {
  return (
    <div className="flex flex-col">
      {Array.from({ length: count }).map((_, rowIndex) => (
        <div
          key={`skeleton-row-${rowIndex}`}
          className="grid h-10 animate-pulse items-center gap-4 border-b border-(--table-row-border-color) px-5"
          style={{
            gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
          }}
        >
          {columns.map((column, columnIndex) => (
            <span
              key={`${column}-${columnIndex}`}
              className="h-3 w-[85%] rounded-sm bg-gray-100"
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export function ResultsTable({
  columns,
  rows,
  totalCount,
  entityLabel,
  loading,
  loadingLabel,
  pageSize = 8,
}: ResultsTableProps) {
  const [page, setPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<SearchTableRow | null>(null);

  const pageCount = Math.max(1, Math.ceil(rows.length / pageSize));

  const pagedRows = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rows.slice(start, start + pageSize);
  }, [page, pageSize, rows]);

  const canGoPrev = page > 1;
  const canGoNext = page < pageCount;
  const showingFrom = rows.length === 0 ? 0 : (page - 1) * pageSize + 1;
  const showingTo = Math.min(page * pageSize, rows.length);

  return (
    <div className="relative flex h-full flex-col overflow-hidden">
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">
          {loading ? (
            <motion.div
              key="results-loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {loadingLabel ? (
                <div className="px-5 py-3 text-[13px] font-medium text-text-secondary">
                  {loadingLabel}
                </div>
              ) : null}
              <SkeletonRows columns={columns} count={pageSize} />
            </motion.div>
          ) : (
            <motion.div
              key="results-loaded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {pagedRows.map((row) => (
                <div
                  key={row.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setSelectedRow(row)}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      setSelectedRow(row);
                    }
                  }}
                  className="grid h-10 cursor-pointer items-center gap-4 border-b border-(--table-row-border-color) px-5 text-[12px] text-text-primary transition-colors duration-200 hover:bg-(--table-row-child-bg)"
                  style={{
                    gridTemplateColumns: `repeat(${columns.length}, minmax(0, 1fr))`,
                  }}
                >
                  {row.cells.map((cell, index) => (
                    <span key={`${row.id}-${index}`} className="truncate">
                      {cell}
                    </span>
                  ))}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-[12px] text-text-secondary">
          Showing {showingFrom}-{showingTo} of{" "}
          {new Intl.NumberFormat("en-US").format(totalCount)} {entityLabel}
        </span>
        <div className="flex items-center gap-1">
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary disabled:opacity-50"
            onClick={() => setPage((value) => Math.max(1, value - 1))}
            disabled={loading || !canGoPrev}
            aria-label="Go to previous page"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-md bg-(--table-row-child-bg) px-2 text-[12px] font-medium text-text-primary">
            {page}
          </span>
          <button
            type="button"
            className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary disabled:opacity-50"
            onClick={() => setPage((value) => Math.min(pageCount, value + 1))}
            disabled={loading || !canGoNext}
            aria-label="Go to next page"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {selectedRow ? (
          <motion.aside
            className="results-details-panel absolute inset-y-0 right-0 z-20 w-70 border-l border-border bg-background p-4 shadow-[-4px_0_12px_rgba(0,0,0,0.08)]"
            initial={{ x: 24, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 24, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[14px] font-semibold text-text-primary">
                Details
              </h3>
              <button
                type="button"
                onClick={() => setSelectedRow(null)}
                className="inline-flex h-7 w-7 items-center justify-center rounded-md border border-border text-text-secondary"
                aria-label="Close details panel"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="space-y-3">
              {columns.map((column, index) => (
                <div key={`${selectedRow.id}-${column}`}>
                  <p className="text-[11px] font-medium text-text-secondary">
                    {column}
                  </p>
                  <p className="mt-0.5 text-[13px] text-text-primary">
                    {selectedRow.cells[index] ?? "-"}
                  </p>
                </div>
              ))}
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

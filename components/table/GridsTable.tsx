"use client";

import { EmptyState } from "@/components/shared/EmptyState";
import type {
  GridRow,
} from "@/types/grids";

import { GridsTableHeader } from "./GridsTableHeader";
import { GridsTableRow } from "./GridsTableRow";

interface GridsTableProps {
  rows: GridRow[];
  expandedWorkbooks: Set<string>;
  onToggleWorkbook: (workbookId: string) => void;
  onToggleStar: (gridId: string) => void;
  onEditRow: (gridId: string) => void;
  onDeleteRow: (gridId: string) => void;
}

export function GridsTable({
  rows,
  expandedWorkbooks,
  onToggleWorkbook,
  onToggleStar,
  onEditRow,
  onDeleteRow,
}: GridsTableProps) {
  return (
    <div className="dashboard-table">
      {rows.length === 0 ? (
        <EmptyState
          description="No grids match your search or filter. Try adjusting your criteria."
        />
      ) : (
        <div className="table-body-wrapper">
          <table className="grids-table">
            <GridsTableHeader />
            <tbody>
              {rows.map((row) => (
                <GridsTableRow
                  key={row.id}
                  row={row}
                  isWorkbookExpanded={
                    row.isWorkbook ? expandedWorkbooks.has(row.id) : undefined
                  }
                  onToggleWorkbook={
                    row.isWorkbook
                      ? () => onToggleWorkbook(row.id)
                      : undefined
                  }
                  onToggleStar={() => onToggleStar(row.id)}
                  onEdit={() => onEditRow(row.id)}
                  onDelete={() => onDeleteRow(row.id)}
                />
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

"use client";

import { ChevronDown, ChevronRight, Star } from "lucide-react";
import { motion } from "framer-motion";

import { Avatar } from "@/components/shared/Avatar";
import { PlatformIcon, WorkbookIconStack } from "@/components/shared/PlatformIcon";
import type { GridRow } from "@/types/grids";

import { RowActionsMenu } from "./RowActionsMenu";

interface GridsTableRowProps {
  row: GridRow;
  isWorkbookExpanded?: boolean;
  onToggleWorkbook?: () => void;
  onToggleStar?: () => void;
  onEdit: () => void;
  onDelete: () => void;
}

function StarButton({
  starred,
  onClick,
  label,
}: {
  starred?: boolean;
  onClick?: () => void;
  label: string;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      className="table-star-button"
      aria-label={label}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.94 }}
    >
      <Star
        className={[
          "table-star-icon",
          starred ? "table-star-icon--starred" : "table-star-icon--unstarred",
        ].join(" ")}
      />
    </motion.button>
  );
}

export function GridsTableRow({
  row,
  isWorkbookExpanded = true,
  onToggleWorkbook,
  onToggleStar,
  onEdit,
  onDelete,
}: GridsTableRowProps) {
  const isChildRow = Boolean(row.parentId);
  const rowToneClass = getRowToneClass({
    isChildRow,
    isWorkbookRow: Boolean(row.isWorkbook),
  });

  return (
    <motion.tr
      className={["grids-table-row", rowToneClass].filter(Boolean).join(" ")}
      whileHover={{ backgroundColor: "rgba(243, 244, 246, 0.9)" }}
      transition={{ duration: 0.16, ease: "easeOut" }}
    >
      <td className="grids-col-name">
        <div className="table-name-cell">
          <span className="table-name-cell__slot">
            {row.isWorkbook ? (
              <motion.button
                type="button"
                onClick={onToggleWorkbook}
                className="table-name-cell__chevron-button"
                aria-label={
                  isWorkbookExpanded ? "Collapse workbook" : "Expand workbook"
                }
                aria-expanded={isWorkbookExpanded}
                whileTap={{ scale: 0.92 }}
              >
                {isWorkbookExpanded ? (
                  <ChevronDown className="h-4 w-4 text-text-secondary" />
                ) : (
                  <ChevronRight className="h-4 w-4 text-text-secondary" />
                )}
              </motion.button>
            ) : null}
          </span>

          <span className="table-name-cell__slot">
            <StarButton
              starred={row.starred}
              onClick={onToggleStar}
              label={row.starred ? "Unstar grid" : "Star grid"}
            />
          </span>

          {row.isWorkbook && row.childPlatforms?.length ? (
            <WorkbookIconStack platforms={row.childPlatforms} />
          ) : (
            <PlatformIcon platform={row.platform} size="table" />
          )}

          <span className="grids-table-row-text truncate">{row.name}</span>
        </div>
      </td>
      <td className="grids-col-edited">
        <div className="table-editor-cell">
          <Avatar
            name={row.editedBy.name}
            initials={row.editedBy.initials}
            src={row.editedBy.avatarSrc}
            size="xs"
          />
          <span className="grids-table-row-meta truncate">
            {row.editedBy.name}
          </span>
        </div>
      </td>
      <td className="grids-col-last-edited">
        <span className="grids-table-row-meta">{row.lastEdited}</span>
      </td>
      <td className="grids-col-actions text-left">
        <RowActionsMenu onEdit={onEdit} onDelete={onDelete} />
      </td>
    </motion.tr>
  );
}

function getRowToneClass({
  isChildRow,
  isWorkbookRow,
}: {
  isChildRow: boolean;
  isWorkbookRow: boolean;
}) {
  if (isChildRow || isWorkbookRow) return "grids-table-row--muted";
  return "";
}

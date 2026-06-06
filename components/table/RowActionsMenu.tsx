"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";

import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";

interface RowActionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function RowActionsMenu({ onEdit, onDelete }: RowActionsMenuProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  useDismissibleLayer({
    open,
    onDismiss: () => setOpen(false),
    rootRef: containerRef,
  });

  return (
    <div ref={containerRef} className="relative inline-flex">
      <motion.button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="inline-flex cursor-pointer rounded p-1 text-text-secondary hover:bg-gray-100 active:bg-gray-200"
        aria-label="Row actions"
        aria-expanded={open}
        whileTap={{ scale: 0.94 }}
      >
        <MoreHorizontal className="h-4 w-4" aria-hidden="true" />
      </motion.button>

      <AnimatePresence>
        {open ? (
          <motion.div
            className="row-actions-menu"
            role="menu"
            initial={{ opacity: 0, y: -4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -3, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
          >
            <motion.button
              type="button"
              role="menuitem"
              onClick={() => {
                onEdit();
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-[13px] text-text-primary hover:bg-gray-100"
              whileHover={{ x: 2 }}
            >
              <Pencil className="h-3.5 w-3.5 text-text-secondary" />
              Edit
            </motion.button>
            <motion.button
              type="button"
              role="menuitem"
              onClick={() => {
                onDelete();
                setOpen(false);
              }}
              className="flex w-full cursor-pointer items-center gap-2 px-3 py-2 text-left text-[13px] text-text-primary hover:bg-gray-100"
              whileHover={{ x: 2 }}
            >
              <Trash2 className="h-3.5 w-3.5 text-text-secondary" />
              Delete
            </motion.button>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

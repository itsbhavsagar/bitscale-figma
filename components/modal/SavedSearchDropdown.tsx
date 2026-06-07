"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useRef, useState } from "react";

import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";
import type { SavedSearchPreset } from "@/types/mock-search";

interface SavedSearchDropdownProps {
  options: SavedSearchPreset[];
  onSelect: (preset: SavedSearchPreset) => void;
}

const dropdownTextClass = "text-[10px]";

export function SavedSearchDropdown({
  options,
  onSelect,
}: SavedSearchDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [label, setLabel] = useState("Saved Search");
  const rootRef = useRef<HTMLDivElement>(null);
  useDismissibleLayer({
    open: isOpen,
    onDismiss: () => setIsOpen(false),
    rootRef,
  });

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label="Saved search presets"
        className={[
          "inline-flex h-5.5 w-29.25 items-center gap-1 rounded-md bg-gray-100 px-2.5 py-0.5 font-medium text-text-dark transition-colors hover:bg-(--table-row-child-bg)",
          dropdownTextClass,
        ].join(" ")}
      >
        <ChevronDown
          className={[
            "h-3 w-3 text-text-dark transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
        <span className="max-w-33 truncate">{label}</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="absolute right-0 top-[calc(100%+4px)] z-20 w-50 rounded-lg border border-border bg-background p-1 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
            role="listbox"
            aria-label="Saved searches"
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.16 }}
          >
            {options.map((option) => {
              const isSelected = label === option.label;
              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => {
                    setLabel(option.label);
                    setIsOpen(false);
                    onSelect(option);
                  }}
                  role="option"
                  aria-selected={isSelected}
                  className={[
                    "flex h-8 w-full items-center rounded-md px-2 text-left text-text-dark hover:bg-(--table-row-child-bg)",
                    dropdownTextClass,
                  ].join(" ")}
                >
                  {option.label}
                </button>
              );
            })}
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

"use client";

import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";
import type { SavedSearchPreset } from "@/types/mock-search";

interface SavedSearchDropdownProps {
  options: SavedSearchPreset[];
  onSelect: (preset: SavedSearchPreset) => void;
}

const dropdownTextClass = "text-[12px]";

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
          "inline-flex h-8 items-center gap-1.5 rounded-lg bg-gray-100 px-3 font-medium text-text-primary transition-colors hover:bg-(--table-row-child-bg)",
          dropdownTextClass,
        ].join(" ")}
      >
        <ChevronDown
          className={[
            "h-3.5 w-3.5 text-text-secondary transition-transform",
            isOpen ? "rotate-180" : "",
          ].join(" ")}
        />
        <span className="max-w-[132px] truncate">{label}</span>
      </button>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="absolute right-0 top-[calc(100%+4px)] z-20 w-[200px] rounded-lg border border-border bg-background p-1 shadow-[0_4px_12px_rgba(0,0,0,0.08)]"
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
                    "flex h-8 w-full items-center rounded-md px-2 text-left text-text-primary hover:bg-(--table-row-child-bg)",
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

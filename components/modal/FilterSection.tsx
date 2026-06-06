"use client";

import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Search } from "lucide-react";

import type { FilterSectionConfig } from "@/types/filters";

const modalHeadingClass = "text-[16px] font-semibold leading-[22px] text-text-primary";
const filterTextShiftClass = "relative left-[-4px]";
const filterSearchRowClass = "mt-1 flex items-center gap-2 border-b border-border pb-2";

interface FilterSectionProps {
  config: FilterSectionConfig;
  value: string;
  onChange: (value: string) => void;
}

function FilterSection({ config, value, onChange }: FilterSectionProps) {
  const { label, icon: Icon, placeholder, defaultOpen = false } = config;
  const inputId = `filter-input-${config.id}`;
  
  if (defaultOpen) {
    return (
      <div className="px-4 py-3">
        <div className="flex items-center gap-2">
          <Icon className="h-[18px] w-[18px] shrink-0 text-text-primary" />
          <span className={`${filterTextShiftClass} text-[14px] font-semibold text-text-primary`}>
            {label}
          </span>
        </div>
        <div className={filterSearchRowClass}>
          <Search className="h-4 w-4 shrink-0 text-text-secondary" />
          <label htmlFor={inputId} className="sr-only">
            {label}
          </label>
          <input
            id={inputId}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="w-full appearance-none border-0 bg-transparent p-0 text-[14px] text-text-primary placeholder:text-text-secondary shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
            style={{ border: 0, outline: 0, boxShadow: "none" }}
          />
        </div>
      </div>
    );
  }

  return <CollapsibleFilterSection config={config} value={value} onChange={onChange} />;
}

function CollapsibleFilterSection({
  config,
  value,
  onChange,
}: FilterSectionProps) {
  const { label, icon: Icon, placeholder } = config;
  const [isOpen, setIsOpen] = useState(false);
  const contentId = `filter-content-${config.id}`;
  const inputId = `filter-input-${config.id}`;

  return (
    <div className="relative">
      <motion.button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-expanded={isOpen}
        aria-controls={contentId}
        className="flex w-full items-start gap-2 px-4 py-4 text-left hover:bg-[#F9FAFB]"
        whileTap={{ scale: 0.99 }}
      >
        <span className="flex flex-1 flex-col gap-2">
          <span className="flex items-start justify-between gap-2">
            <span className="flex items-center gap-2">
              <Icon className="mt-0.5 h-[18px] w-[18px] shrink-0 text-text-primary" />
              <span className={`block text-[14px] font-semibold text-text-primary ${filterTextShiftClass}`}>
                {label}
              </span>
            </span>
            <ChevronDown
              className={`mt-0.5 h-4 w-4 shrink-0 text-text-secondary transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </span>
          {!isOpen ? (
            <span className="block text-[12px] text-text-secondary">
              {placeholder}
            </span>
          ) : null}
        </span>
      </motion.button>

      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            id={contentId}
            className="px-4 pb-3"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <div className={filterSearchRowClass}>
              <label htmlFor={inputId} className="sr-only">
                {label}
              </label>
              <input
                id={inputId}
                type="text"
                value={value}
                onChange={(event) => onChange(event.target.value)}
                placeholder={placeholder}
                className="w-full appearance-none border-0 bg-transparent p-0 text-[14px] text-text-primary placeholder:text-text-secondary shadow-none outline-none ring-0 focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0"
                style={{ border: 0, outline: 0, boxShadow: "none" }}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-0 right-0 ml-4 border-b border-border"
      />
    </div>
  );
}

interface FilterPanelProps {
  filters: FilterSectionConfig[];
  values: Record<string, string>;
  onChange: (id: string, value: string) => void;
  footer: ReactNode;
  title?: string;
  headerAction?: ReactNode;
}

export function FilterPanel({
  filters,
  values,
  onChange,
  footer,
  title,
  headerAction,
}: FilterPanelProps) {
  return (
    <div className="ml-8 mt-8 mb-[18px] flex h-[668px] w-[319px] shrink-0 flex-col bg-background pl-2">
      {title || headerAction ? (
        <div className="flex shrink-0 items-center justify-between gap-[5px] px-4 pb-3 pt-0 mt-[-2px]">
          {title ? (
            <h2 className={`${modalHeadingClass} relative left-[-6px]`}>
              {title}
            </h2>
          ) : (
            <span />
          )}
          {headerAction ? <div className="relative left-[9px]">{headerAction}</div> : null}
        </div>
      ) : null}
      <div className="flex-1 overflow-y-auto">
        {filters.map((filter) => (
          <FilterSection
            key={filter.id}
            config={filter}
            value={values[filter.id] ?? ""}
            onChange={(value) => onChange(filter.id, value)}
          />
        ))}
      </div>
      <div className="flex shrink-0 justify-center py-3">
        <div className="flex h-[34px] w-[314px] items-center gap-4">
          {footer}
        </div>
      </div>
    </div>
  );
}

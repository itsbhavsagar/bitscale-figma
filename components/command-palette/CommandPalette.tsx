"use client";

import { useEffect, useMemo, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  Building2,
  Grid2x2Plus,
  Home,
  PlugZap,
  Search,
  Users,
  type LucideIcon,
} from "lucide-react";

import { useCommandPalette } from "@/hooks/useCommandPalette";
import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";

type DashboardModalAction = "findPeople" | "findCompanies" | "newGrid";
type CommandSection = "Navigation" | "Actions";

interface PaletteActionMeta {
  id: string;
  title: string;
  description: string;
  shortcutHint: string;
  section: CommandSection;
  icon: LucideIcon;
  run: () => void;
}

function buildDashboardModalHref(modal: DashboardModalAction) {
  return `/?modal=${modal}`;
}

export function CommandPalette() {
  const panelRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();

  const actions = useMemo(
    () => [
      {
        id: "go-dashboard",
        title: "Go to Dashboard",
        description: "Navigate to the main dashboard view",
        shortcutHint: "G D",
        section: "Navigation",
        icon: Home,
        keywords: ["home", "grids", "dashboard"],
        run: () => router.push("/"),
      },
      {
        id: "go-integrations",
        title: "Go to Integrations",
        description: "Open integrations and connection settings",
        shortcutHint: "G I",
        section: "Navigation",
        icon: PlugZap,
        keywords: ["integrations", "connections", "apps"],
        run: () => router.push("/integrations"),
      },
      {
        id: "open-find-people",
        title: "Open Find People modal",
        description: "Jump to dashboard and open Find People",
        shortcutHint: "M P",
        section: "Actions",
        icon: Users,
        keywords: ["people", "search", "leads", "modal"],
        run: () => router.push(buildDashboardModalHref("findPeople")),
      },
      {
        id: "open-find-companies",
        title: "Open Find Companies modal",
        description: "Jump to dashboard and open Find Companies",
        shortcutHint: "M C",
        section: "Actions",
        icon: Building2,
        keywords: ["companies", "accounts", "search", "modal"],
        run: () => router.push(buildDashboardModalHref("findCompanies")),
      },
      {
        id: "open-new-grid",
        title: "Open New Grid modal",
        description: "Jump to dashboard and create a new grid",
        shortcutHint: "M N",
        section: "Actions",
        icon: Grid2x2Plus,
        keywords: ["new", "grid", "create", "modal"],
        run: () => router.push(buildDashboardModalHref("newGrid")),
      },
    ],
    [router],
  );

  const actionsById = useMemo(() => {
    return Object.fromEntries(
      actions.map((action) => [action.id, action as PaletteActionMeta]),
    ) as Record<string, PaletteActionMeta>;
  }, [actions]);

  const {
    isOpen,
    close,
    query,
    setQuery,
    filteredActions,
    selectedIndex,
    setSelectedIndex,
    executeAction,
    handleInputKeyDown,
  } = useCommandPalette({ actions });

  const groupedResults = useMemo(() => {
    const grouped = new Map<CommandSection, typeof filteredActions>();
    for (const action of filteredActions) {
      const actionMeta = actionsById[action.id];
      const section = actionMeta.section;
      grouped.set(section, [...(grouped.get(section) ?? []), action]);
    }
    return grouped;
  }, [actionsById, filteredActions]);

  const filteredIndexById = useMemo(() => {
    return new Map(filteredActions.map((action, index) => [action.id, index]));
  }, [filteredActions]);

  useDismissibleLayer({
    open: isOpen,
    onDismiss: close,
    rootRef: panelRef,
  });

  useEffect(() => {
    if (!isOpen) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 0);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  useEffect(() => {
    close();
  }, [pathname, close]);

  return (
    <AnimatePresence>
      {isOpen ? (
        <motion.div
          className="command-palette-layer"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.div
            className="command-palette-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
          <motion.div
            ref={panelRef}
            role="dialog"
            aria-modal="true"
            aria-label="Command palette"
            className="command-palette-panel"
            initial={{ opacity: 0, y: 10, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.985 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            <div className="command-palette-input-row">
              <Search className="command-palette-search-icon" aria-hidden="true" />
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={handleInputKeyDown}
                placeholder="Search actions..."
                className="command-palette-input"
              />
              <span className="command-palette-esc-hint">Esc</span>
            </div>

            <div className="command-palette-list" role="listbox" aria-label="Command actions">
              {filteredActions.length ? (
                <>
                  {Array.from(groupedResults.entries()).map(([section, sectionActions]) => (
                    <div key={section} className="command-palette-group">
                      <div className="command-palette-group__title">{section}</div>
                      {sectionActions.map((action) => {
                        const index = filteredIndexById.get(action.id) ?? 0;
                        const actionMeta = actionsById[action.id];
                        const Icon = actionMeta.icon;
                        const isCurrentRoute =
                          (action.id === "go-dashboard" && pathname === "/") ||
                          (action.id === "go-integrations" && pathname === "/integrations");

                        return (
                          <button
                            key={action.id}
                            type="button"
                            role="option"
                            aria-selected={selectedIndex === index}
                            className={[
                              "command-palette-item",
                              selectedIndex === index ? "command-palette-item--active" : "",
                            ]
                              .filter(Boolean)
                              .join(" ")}
                            onMouseEnter={() => setSelectedIndex(index)}
                            onClick={() => executeAction(index)}
                          >
                            <span className="command-palette-item__content">
                              <span className="command-palette-item__title-row">
                                <span className="command-palette-item__icon-wrap">
                                  <Icon className="command-palette-item__icon" aria-hidden="true" />
                                </span>
                                <span className="command-palette-item__title">{action.title}</span>
                                {isCurrentRoute ? (
                                  <span className="command-palette-item__badge">Current</span>
                                ) : null}
                              </span>
                              <span className="command-palette-item__description">{action.description}</span>
                            </span>
                            <span className="command-palette-item__hint">{action.shortcutHint}</span>
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </>
              ) : (
                <div className="command-palette-empty">No commands found for this search.</div>
              )}
            </div>
            <div className="command-palette-footer">
              <span>↑↓ Navigate</span>
              <span>Enter Select</span>
              <span>Esc Close</span>
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type KeyboardEvent as ReactKeyboardEvent,
} from "react";

export interface CommandPaletteAction {
  id: string;
  title: string;
  description: string;
  shortcutHint: string;
  keywords?: string[];
  run: () => void;
}

interface UseCommandPaletteOptions {
  actions: CommandPaletteAction[];
}

const commandPaletteOpenEvent = "bitscale:command-palette-open";

function matchesQuery(action: CommandPaletteAction, query: string) {
  if (!query) return true;

  const haystack = [
    action.title,
    action.description,
    ...(action.keywords ?? []),
  ]
    .join(" ")
    .toLowerCase();

  return haystack.includes(query.toLowerCase());
}

export function useCommandPalette({ actions }: UseCommandPaletteOptions) {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);

  const filteredActions = useMemo(
    () => actions.filter((action) => matchesQuery(action, query.trim())),
    [actions, query],
  );

  const close = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setSelectedIndex(0);
  }, []);

  const open = useCallback(() => {
    setIsOpen(true);
    setSelectedIndex(0);
  }, []);

  const setSearchQuery = useCallback((value: string) => {
    setQuery(value);
    setSelectedIndex(0);
  }, []);

  const selectedActionIndex = filteredActions.length
    ? Math.min(selectedIndex, filteredActions.length - 1)
    : 0;

  const executeAction = useCallback(
    (index: number) => {
      if (!filteredActions.length) return;
      const safeIndex = Math.min(index, filteredActions.length - 1);
      const action = filteredActions[safeIndex];
      if (!action) return;
      action.run();
      close();
    },
    [close, filteredActions],
  );

  const handleInputKeyDown = useCallback(
    (event: ReactKeyboardEvent<HTMLInputElement>) => {
      if (!isOpen) return;

      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (!filteredActions.length) return;
        setSelectedIndex((previous) =>
          previous + 1 >= filteredActions.length ? 0 : previous + 1,
        );
        return;
      }

      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (!filteredActions.length) return;
        setSelectedIndex((previous) =>
          previous - 1 < 0 ? filteredActions.length - 1 : previous - 1,
        );
        return;
      }

      if (event.key === "Enter") {
        event.preventDefault();
        executeAction(selectedActionIndex);
        return;
      }

      if (event.key === "Escape") {
        event.preventDefault();
        close();
      }
    },
    [close, executeAction, filteredActions.length, isOpen, selectedActionIndex],
  );

  useEffect(() => {
    const handleGlobalKeyDown = (event: globalThis.KeyboardEvent) => {
      const isShortcutKey = event.key.toLowerCase() === "k";
      if (!isShortcutKey) return;

      if (!(event.metaKey || event.ctrlKey)) return;
      event.preventDefault();
      setIsOpen((previous) => !previous);
      setSelectedIndex(0);
    };

    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, []);

  useEffect(() => {
    const handleOpenEvent = () => {
      setIsOpen(true);
      setSelectedIndex(0);
    };

    window.addEventListener(commandPaletteOpenEvent, handleOpenEvent);
    return () => window.removeEventListener(commandPaletteOpenEvent, handleOpenEvent);
  }, []);

  return {
    isOpen,
    open,
    close,
    query,
    setQuery: setSearchQuery,
    filteredActions,
    selectedIndex: selectedActionIndex,
    setSelectedIndex,
    executeAction,
    handleInputKeyDown,
  };
}

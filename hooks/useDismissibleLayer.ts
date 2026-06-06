"use client";

import { useEffect, type RefObject } from "react";

interface UseDismissibleLayerOptions {
  open: boolean;
  onDismiss: () => void;
  rootRef: RefObject<HTMLElement | null>;
}

export function useDismissibleLayer({
  open,
  onDismiss,
  rootRef,
}: UseDismissibleLayerOptions) {
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        onDismiss();
      }
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onDismiss();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onDismiss, rootRef]);
}

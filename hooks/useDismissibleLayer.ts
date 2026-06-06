"use client";

import { useEffect, type RefObject } from "react";

interface UseDismissibleLayerOptions {
  open: boolean;
  onDismiss: () => void;
  rootRef: RefObject<HTMLElement | null>;
  layerRef?: RefObject<HTMLElement | null>;
}

function isInsideLayer(
  target: Node,
  rootRef: RefObject<HTMLElement | null>,
  layerRef?: RefObject<HTMLElement | null>,
) {
  if (rootRef.current?.contains(target)) return true;
  if (layerRef?.current?.contains(target)) return true;
  return false;
}

export function useDismissibleLayer({
  open,
  onDismiss,
  rootRef,
  layerRef,
}: UseDismissibleLayerOptions) {
  useEffect(() => {
    if (!open) return;

    const handlePointerDown = (event: MouseEvent) => {
      if (!isInsideLayer(event.target as Node, rootRef, layerRef)) {
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
  }, [open, onDismiss, rootRef, layerRef]);
}

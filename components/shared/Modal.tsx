"use client";

import { useEffect, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  descriptionId?: string;
  children: ReactNode;
  size?: "md" | "lg" | "xl";
  headerActions?: ReactNode;
  hideHeader?: boolean;
}

const sizeClasses = {
  md: "w-full max-w-lg max-h-[90vh]",
  lg: "w-full max-w-3xl max-h-[90vh]",
  xl: "w-[1025px] max-w-[calc(100vw-32px)] h-[718px] max-h-[calc(100vh-32px)]",
};

export function Modal({
  open,
  onClose,
  title,
  descriptionId,
  children,
  size = "md",
  headerActions,
  hideHeader = false,
}: ModalProps) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.18, ease: "easeOut" }}
        >
          <motion.button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Close modal"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
          />
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby={title ? "modal-title" : undefined}
            aria-describedby={descriptionId}
            className={[
              "relative z-10 flex flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_2px_0_rgba(0,0,0,0.08)]",
              sizeClasses[size],
            ].join(" ")}
            initial={{ opacity: 0, scale: 0.98, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.98, y: 6 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
          >
            {hideHeader && title ? (
              <h2 id="modal-title" className="sr-only">
                {title}
              </h2>
            ) : null}
            {!hideHeader && (title || headerActions) && (
              <div className="flex shrink-0 items-center justify-between border-b border-border px-6 py-4">
                <div className="flex items-center gap-3">
                  {title ? (
                    <h2
                      id="modal-title"
                      className="text-[18px] font-semibold leading-[25.2px] text-text-primary"
                    >
                      {title}
                    </h2>
                  ) : null}
                  {headerActions}
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-text-secondary hover:bg-[#F9FAFB]"
                  aria-label="Close"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            )}
            {hideHeader ? (
              <button
                type="button"
                onClick={onClose}
                className="absolute right-2 top-2 z-20 inline-flex h-8 w-8 items-center justify-center rounded-lg border border-border bg-white text-text-secondary shadow-sm hover:bg-[#F9FAFB]"
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            ) : null}
            {children}
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

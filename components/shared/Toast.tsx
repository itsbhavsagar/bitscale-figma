"use client";

import { useEffect } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  message: string | null;
  onDismiss: () => void;
  duration?: number;
}

export function Toast({ message, onDismiss, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (!message) return;

    const timer = window.setTimeout(onDismiss, duration);
    return () => window.clearTimeout(timer);
  }, [message, onDismiss, duration]);

  if (!message) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="fixed right-6 top-6 z-60 flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-3 shadow-lg"
    >
      <CheckCircle2 className="h-4 w-4 text-[#16A34A]" aria-hidden="true" />
      <span className="text-[14px] font-medium text-text-primary">{message}</span>
    </div>
  );
}

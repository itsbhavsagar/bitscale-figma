import type { ReactNode } from "react";

interface BadgeProps {
  children: ReactNode;
  variant?: "green" | "dark" | "orange" | "neutral";
  className?: string;
}

const variantClasses = {
  green:
    "bg-[var(--badge-green-bg)] text-[var(--badge-green-text)] border border-[#BBF7D0]",
  dark: "bg-[var(--badge-plan-bg)] text-white",
  orange: "bg-[#FFF7ED] text-[#EA580C]",
  neutral: "bg-[#F3F4F6] text-text-secondary",
};

export function Badge({
  children,
  variant = "neutral",
  className = "",
}: BadgeProps) {
  return (
    <span
      className={[
        "inline-flex items-center gap-1.5 rounded-full px-3 py-1",
        "text-[13px] font-medium leading-none",
        variantClasses[variant],
        className,
      ].join(" ")}
    >
      {children}
    </span>
  );
}

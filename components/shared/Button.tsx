"use client";

import { motion, type HTMLMotionProps } from "framer-motion";
import type { ReactNode } from "react";

type ButtonVariant = "primary" | "outline" | "ghost";
type ButtonSize = "md" | "sm";

interface ButtonProps extends HTMLMotionProps<"button"> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  children: ReactNode;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-button-dark text-background hover:bg-[var(--button-primary-hover)] active:bg-[var(--button-primary-active)] disabled:opacity-50",
  outline:
    "border border-border bg-background text-button-dark hover:bg-[#F9FAFB] active:bg-[#F3F4F6] disabled:opacity-50",
  ghost:
    "text-text-secondary hover:bg-[#F9FAFB] active:bg-[#F3F4F6] disabled:opacity-50",
};

const sizeClasses: Record<ButtonSize, string> = {
  md: "h-9 rounded-[8.5px] px-3 text-[var(--font-size-body)] leading-[var(--line-height-body)]",
  sm: "h-[34px] rounded-lg px-3 text-[var(--font-size-button)] leading-[var(--line-height-button)] font-[var(--font-weight-button)]",
};

export function Button({
  variant = "outline",
  size = "md",
  className = "",
  children,
  ...props
}: ButtonProps) {
  return (
    <motion.button
      type="button"
      className={[
        "inline-flex cursor-pointer items-center justify-center gap-2 font-medium transition-[background-color,transform,color,border-color] duration-150 disabled:cursor-not-allowed",
        sizeClasses[size],
        variantClasses[variant],
        className,
      ].join(" ")}
      whileHover={props.disabled ? undefined : { y: -1 }}
      whileTap={props.disabled ? undefined : { y: 0, scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}

"use client";

import type { ReactNode } from "react";
import { motion, type HTMLMotionProps } from "framer-motion";

interface IconButtonProps extends HTMLMotionProps<"button"> {
  children: ReactNode;
  active?: boolean;
  size?: "sm" | "md";
}

export function IconButton({
  children,
  active = false,
  size = "md",
  className = "",
  ...props
}: IconButtonProps) {
  const sizeClass = size === "sm" ? "h-8 w-8" : "h-9 w-9";

  return (
    <motion.button
      type="button"
      className={[
        "inline-flex shrink-0 items-center justify-center rounded-lg border transition-[background-color,transform,color,border-color] duration-150 active:scale-[0.98]",
        active
          ? "border-primary-blue bg-[#EEF2FB] text-primary-blue"
          : "border-border bg-background text-text-secondary hover:bg-[#F9FAFB] active:bg-[#F3F4F6]",
        sizeClass,
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

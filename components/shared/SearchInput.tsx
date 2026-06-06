"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  ariaLabel?: string;
  className?: string;
}

export function SearchInput({
  value,
  onChange,
  placeholder = "Search...",
  ariaLabel = "Search",
  className = "",
}: SearchInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <motion.div
      className={["search-input-wrapper relative", className].join(" ")}
      animate={{
        scale: isFocused ? 1.005 : 1,
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    >
      <Search
        className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-text-secondary"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        aria-label={ariaLabel}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="search-input"
      />
    </motion.div>
  );
}

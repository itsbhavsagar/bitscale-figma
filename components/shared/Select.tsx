"use client";

import {
  useCallback,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";

import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";

interface SelectOption<T extends string = string> {
  value: T;
  label: string;
  icon?: ReactNode;
}

interface SelectProps<T extends string> {
  value: T;
  onChange: (value: T) => void;
  options: SelectOption<T>[];
  id?: string;
}

export function Select<T extends string>({
  value,
  onChange,
  options,
  id,
}: SelectProps<T>) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const [open, setOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState<{
    top: number;
    left: number;
    width: number;
  } | null>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const selected = options.find((option) => option.value === value);
  const closeMenu = useCallback(() => setOpen(false), []);
  useDismissibleLayer({
    open,
    onDismiss: closeMenu,
    rootRef,
    layerRef: menuRef,
  });

  useEffect(() => {
    if (!open || !rootRef.current) return;

    const updateMenuPosition = () => {
      if (!rootRef.current) return;

      const rect = rootRef.current.getBoundingClientRect();
      setMenuStyle({
        top: rect.bottom + 4,
        left: rect.left,
        width: rect.width,
      });
    };

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [open]);

  return (
    <div className="form-select" ref={rootRef}>
      <motion.button
        type="button"
        id={selectId}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((current) => !current)}
        className={[
          "form-select__trigger",
          open ? "form-select__trigger--open" : "",
        ]
          .filter(Boolean)
          .join(" ")}
        whileTap={{ scale: 0.99 }}
      >
        <span className="form-select__value">
          {selected?.icon ? (
            <span className="form-select__value-icon">{selected.icon}</span>
          ) : null}
          <span className="truncate">{selected?.label}</span>
        </span>
        <ChevronDown
          className={[
            "form-select__chevron",
            open ? "form-select__chevron--open" : "",
          ]
            .filter(Boolean)
            .join(" ")}
          aria-hidden="true"
        />
      </motion.button>

      {typeof document !== "undefined"
        ? createPortal(
            <AnimatePresence>
              {open && menuStyle ? (
                <motion.ul
                  ref={menuRef}
                  role="listbox"
                  aria-labelledby={selectId}
                  className="form-select__menu form-select__menu--fixed"
                  style={{
                    top: menuStyle.top,
                    left: menuStyle.left,
                    width: menuStyle.width,
                  }}
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -4, scale: 0.98 }}
                  transition={{ duration: 0.16, ease: "easeOut" }}
                >
                  {options.map((option) => {
                    const isSelected = option.value === value;

                    return (
                      <li key={option.value} role="presentation">
                        <motion.button
                          type="button"
                          role="option"
                          aria-selected={isSelected}
                          className={[
                            "form-select__option",
                            isSelected ? "form-select__option--selected" : "",
                          ]
                            .filter(Boolean)
                            .join(" ")}
                          onClick={() => {
                            onChange(option.value);
                            closeMenu();
                          }}
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.99 }}
                        >
                          {option.icon ? (
                            <span className="form-select__option-icon">
                              {option.icon}
                            </span>
                          ) : null}
                          <span className="min-w-0 flex-1 truncate text-left">
                            {option.label}
                          </span>
                          {isSelected ? (
                            <Check
                              className="form-select__check"
                              aria-hidden="true"
                            />
                          ) : null}
                        </motion.button>
                      </li>
                    );
                  })}
                </motion.ul>
              ) : null}
            </AnimatePresence>,
            document.body,
          )
        : null}
    </div>
  );
}

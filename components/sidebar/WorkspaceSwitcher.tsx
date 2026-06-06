import Image from "next/image";
import { useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronsUpDown } from "lucide-react";

import { useWorkspace } from "@/hooks/useWorkspace";
import { useDismissibleLayer } from "@/hooks/useDismissibleLayer";
import type { SidebarWorkspace } from "@/types/sidebar";

interface WorkspaceSwitcherProps {
  workspace: SidebarWorkspace;
}

export function WorkspaceSwitcher({ workspace }: WorkspaceSwitcherProps) {
  const { name, initials, avatarSrc, avatarStackSrc } = workspace;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const { workspaces, switchWorkspace } = useWorkspace();

  useDismissibleLayer({
    open,
    onDismiss: () => setOpen(false),
    rootRef,
  });

  const options = useMemo(
    () => workspaces.filter((item) => item.id !== workspace.id),
    [workspace.id, workspaces],
  );

  const handleSelectWorkspace = (workspaceId: string) => {
    switchWorkspace(workspaceId);
    setOpen(false);
  };

  return (
    <div ref={rootRef} className="sidebar-workspace-switcher relative">
      <button
        type="button"
        aria-label={`Current workspace: ${name}`}
        aria-expanded={open}
        aria-haspopup="listbox"
        className="sidebar-workspace-row flex w-full items-center gap-3 text-left"
        onClick={() => setOpen((prev) => !prev)}
      >
        {avatarSrc ? (
          <span className="sidebar-workspace-avatars">
            {avatarStackSrc ? (
              <Image
                src={avatarStackSrc}
                alt=""
                width={28}
                height={28}
                className="sidebar-workspace-avatar sidebar-workspace-avatar--back"
                aria-hidden="true"
              />
            ) : null}
            <Image
              src={avatarSrc}
              alt={name}
              width={28}
              height={28}
              className="sidebar-workspace-avatar sidebar-workspace-avatar--front"
            />
          </span>
        ) : (
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-button-dark text-[11px] font-medium text-background">
            {initials}
          </span>
        )}
        <span className="min-w-0 flex-1 truncate text-[14px] font-medium leading-[21px] text-button-dark">
          {name}
        </span>
        <ChevronsUpDown
          className={`h-4 w-4 shrink-0 text-text-secondary transition-transform duration-150 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden="true"
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            role="listbox"
            aria-label="Switch workspace"
            className="sidebar-workspace-dropdown absolute left-2 right-2 top-[calc(100%+6px)] z-30"
            initial={{ opacity: 0, y: 4, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.98 }}
            transition={{ duration: 0.16, ease: "easeOut" }}
          >
            <div className="p-1">
              <button
                type="button"
                role="option"
                aria-selected
                className="sidebar-workspace-option sidebar-workspace-option--active"
                onClick={() => setOpen(false)}
              >
                <span className="sidebar-workspace-option__name">{workspace.name}</span>
                <span className="sidebar-workspace-option__meta">Current</span>
              </button>
              {options.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  role="option"
                  aria-selected={false}
                  className="sidebar-workspace-option"
                  onClick={() => handleSelectWorkspace(item.id)}
                >
                  <span className="sidebar-workspace-option__name">{item.name}</span>
                </button>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

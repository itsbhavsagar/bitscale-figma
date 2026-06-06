import Image from "next/image";
import { ChevronsUpDown } from "lucide-react";

import type { SidebarWorkspace } from "@/types/sidebar";

interface WorkspaceSwitcherProps {
  workspace: SidebarWorkspace;
}

export function WorkspaceSwitcher({ workspace }: WorkspaceSwitcherProps) {
  const { name, initials, avatarSrc, avatarStackSrc } = workspace;

  return (
    <button
      type="button"
      aria-label={`Current workspace: ${name}`}
      className="sidebar-workspace-row flex w-full items-center gap-3 text-left"
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
        className="h-4 w-4 shrink-0 text-text-secondary"
        aria-hidden="true"
      />
    </button>
  );
}

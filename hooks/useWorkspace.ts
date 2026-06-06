"use client";

import {
  useCallback,
  useSyncExternalStore,
} from "react";

import { sidebarConfig } from "@/data/sidebar";
import type { SidebarWorkspace } from "@/types/sidebar";

const workspaceStorageKey = "bitscale.workspace.selected";
const workspaceSwitchDurationMs = 620;

const workspaces: SidebarWorkspace[] = [
  {
    id: "gtm-spaces",
    name: "GTM Spaces",
    initials: "GS",
    avatarSrc: "/workspace-avatar.png",
    avatarStackSrc: "/workspace-avatar2.jpg",
  },
  {
    id: "revenue-team",
    name: "Revenue Team",
    initials: "RT",
    avatarSrc: "/workspace-avatar2.jpg",
    avatarStackSrc: "/workspace-avatar.png",
  },
  {
    id: "outbound-ops",
    name: "Outbound Ops",
    initials: "OO",
  },
  {
    id: "sdr-workspace",
    name: "SDR Workspace",
    initials: "SW",
    avatarSrc: "/workspace-avatar.png",
  },
];

interface WorkspaceContextValue {
  workspace: SidebarWorkspace;
  workspaces: SidebarWorkspace[];
  isSwitching: boolean;
  switchSequence: number;
  toastMessage: string | null;
  clearToast: () => void;
  switchWorkspace: (workspaceId: string) => void;
}

interface WorkspaceStoreState {
  workspace: SidebarWorkspace;
  isSwitching: boolean;
  switchSequence: number;
  toastMessage: string | null;
}

function resolveWorkspace(workspaceId: string | null) {
  if (!workspaceId) return sidebarConfig.workspace;
  return workspaces.find((workspace) => workspace.id === workspaceId) ?? sidebarConfig.workspace;
}

const listeners = new Set<() => void>();
let switchMidpointTimer: number | null = null;
let switchCompleteTimer: number | null = null;
let hasHydrated = false;
let state: WorkspaceStoreState = {
  workspace: sidebarConfig.workspace,
  isSwitching: false,
  switchSequence: 0,
  toastMessage: null,
};

function emitChange() {
  listeners.forEach((listener) => listener());
}

function setStoreState(nextState: Partial<WorkspaceStoreState>) {
  state = { ...state, ...nextState };
  emitChange();
}

function hydrateWorkspaceStore() {
  if (hasHydrated || typeof window === "undefined") return;
  hasHydrated = true;

  try {
    try {
      const persistedWorkspaceId = window.localStorage.getItem(workspaceStorageKey);
      state = {
        ...state,
        workspace: resolveWorkspace(persistedWorkspaceId),
      };
    } catch {
      state = {
        ...state,
        workspace: sidebarConfig.workspace,
      };
    }
  } finally {
    emitChange();
  }
}

export function useWorkspace() {
  hydrateWorkspaceStore();

  const snapshot = useSyncExternalStore(
    (listener) => {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    () => state,
    () => state,
  );

  const clearToast = useCallback(() => {
    setStoreState({ toastMessage: null });
  }, []);

  const switchWorkspace = useCallback(
    (workspaceId: string) => {
      const nextWorkspace = workspaces.find((candidate) => candidate.id === workspaceId);
      if (!nextWorkspace || nextWorkspace.id === state.workspace.id) return;

      setStoreState({
        isSwitching: true,
        switchSequence: state.switchSequence + 1,
      });

      if (switchMidpointTimer) {
        window.clearTimeout(switchMidpointTimer);
      }
      if (switchCompleteTimer) {
        window.clearTimeout(switchCompleteTimer);
      }

      switchMidpointTimer = window.setTimeout(() => {
        setStoreState({
          workspace: nextWorkspace,
          toastMessage: `Switched to ${nextWorkspace.name}`,
        });
        try {
          window.localStorage.setItem(workspaceStorageKey, nextWorkspace.id);
        } catch {
        }
        switchMidpointTimer = null;
      }, workspaceSwitchDurationMs / 2);

      switchCompleteTimer = window.setTimeout(() => {
        setStoreState({ isSwitching: false });
        switchCompleteTimer = null;
      }, workspaceSwitchDurationMs);
    },
    [],
  );

  return {
    workspace: snapshot.workspace,
    workspaces,
    isSwitching: snapshot.isSwitching,
    switchSequence: snapshot.switchSequence,
    toastMessage: snapshot.toastMessage,
    clearToast,
    switchWorkspace,
  } satisfies WorkspaceContextValue;
}

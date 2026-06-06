"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import { LatestFromBitscaleCard } from "@/components/cards/LatestFromBitscaleCard";
import { ProductDemoCard } from "@/components/cards/ProductDemoCard";
import { FindCompaniesModal } from "@/components/modal/FindCompaniesModal";
import { FindPeopleModal } from "@/components/modal/FindPeopleModal";
import { NewGridModal } from "@/components/modal/NewGridModal";
import { Toast } from "@/components/shared/Toast";
import { GridsTable } from "@/components/table/GridsTable";
import { SearchToolbar } from "@/components/table/SearchToolbar";
import { dashboardConfig } from "@/data/dashboard";
import { gridTabs, initialGrids } from "@/data/grids";
import { useDebouncedValue } from "@/hooks/useDebouncedValue";
import { filterAndSortGrids } from "@/lib/grids-utils";
import type {
  GridRow,
  GridTabId,
  NewGridFormData,
  WelcomeActionId,
} from "@/types/grids";

import { DashboardHeader } from "@/components/header";
import { DashboardSkeleton } from "./DashboardSkeleton";
import { WelcomeSection } from "./WelcomeSection";

type ModalId = "newGrid" | "findPeople" | "findCompanies";
const dashboardSkeletonSeenKey = "bitscale.dashboard.skeleton.seen";

function isModalId(value: string | null): value is ModalId {
  return value === "newGrid" || value === "findPeople" || value === "findCompanies";
}

export function Dashboard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const { searchPlaceholder } = dashboardConfig;

  const [grids, setGrids] = useState<GridRow[]>(initialGrids);
  const [activeTab, setActiveTab] = useState<GridTabId>("my-grids");
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearch = useDebouncedValue(searchQuery, 300);
  const [openModal, setOpenModal] = useState<ModalId | null>(null);
  const requestedModal = (() => {
    const modal = searchParams.get("modal");
    return isModalId(modal) ? modal : null;
  })();
  const activeModal = openModal ?? requestedModal;

  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [expandedWorkbooks, setExpandedWorkbooks] = useState<Set<string>>(
    () => new Set(["workbook-1"]),
  );

  const clearRequestedModalQuery = useCallback(() => {
    if (!requestedModal) return;
    const nextParams = new URLSearchParams(searchParams.toString());
    nextParams.delete("modal");
    const query = nextParams.toString();
    router.replace(query ? `/?${query}` : "/", { scroll: false });
  }, [requestedModal, router, searchParams]);

  const closeModal = useCallback(() => {
    setOpenModal(null);
    clearRequestedModalQuery();
  }, [clearRequestedModalQuery]);

  useEffect(() => {
    const hasSeenSkeleton = (() => {
      try {
        return window.sessionStorage.getItem(dashboardSkeletonSeenKey) === "1";
      } catch {
        return false;
      }
    })();

    if (hasSeenSkeleton) {
      const instantTimer = window.setTimeout(() => setLoading(false), 0);
      return () => window.clearTimeout(instantTimer);
    }

    const timer = window.setTimeout(() => {
      try {
        window.sessionStorage.setItem(dashboardSkeletonSeenKey, "1");
      } catch {
      }
      setLoading(false);
    }, 350);

    return () => window.clearTimeout(timer);
  }, []);

  const visibleRows = useMemo(() => {
    const filtered = filterAndSortGrids(grids, {
      activeTab,
      searchQuery: debouncedSearch,
    });

    return filtered.filter(
      (row) => !row.parentId || expandedWorkbooks.has(row.parentId),
    );
  }, [
    grids,
    activeTab,
    debouncedSearch,
    expandedWorkbooks,
  ]);

  const handleToggleStar = useCallback((gridId: string) => {
    setGrids((prev) =>
      prev.map((row) =>
        row.id === gridId ? { ...row, starred: !row.starred } : row,
      ),
    );
  }, []);

  const handleToggleWorkbook = useCallback((workbookId: string) => {
    setExpandedWorkbooks((prev) => {
      const next = new Set(prev);
      if (next.has(workbookId)) {
        next.delete(workbookId);
      } else {
        next.add(workbookId);
      }
      return next;
    });
  }, []);

  const handleEditRow = useCallback((gridId: string) => {
    const row = grids.find((item) => item.id === gridId);
    setToastMessage(`Edit "${row?.name ?? "grid"}"`);
  }, [grids]);

  const handleDeleteRow = useCallback((gridId: string) => {
    const rowToDelete = grids.find((item) => item.id === gridId);
    if (rowToDelete?.isWorkbook) {
      setExpandedWorkbooks((prev) => {
        const next = new Set(prev);
        next.delete(gridId);
        return next;
      });
    }
    setGrids((prev) =>
      prev.filter((item) =>
        rowToDelete?.isWorkbook
          ? item.id !== gridId && item.parentId !== gridId
          : item.id !== gridId,
      ),
    );
    setToastMessage(`Deleted "${rowToDelete?.name ?? "grid"}"`);
  }, [grids]);

  const handleCreateGrid = useCallback((data: NewGridFormData) => {
    const now = new Date();
    const newGrid: GridRow = {
      id: `grid-${Date.now()}`,
      name: data.name.trim(),
      platform: data.type,
      editedBy: {
        name: dashboardConfig.user.name,
        initials: dashboardConfig.user.initials,
      },
      lastEdited: now.toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      lastEditedDate: now,
    };

    setGrids((prev) => [newGrid, ...prev]);
    closeModal();
    setToastMessage(`"${data.name.trim()}" created successfully`);
  }, [closeModal]);

  const handleWelcomeAction = useCallback((actionId: WelcomeActionId) => {
    if (actionId === "new-grid") setOpenModal("newGrid");
    if (actionId === "find-people") setOpenModal("findPeople");
    if (actionId === "find-companies") setOpenModal("findCompanies");
  }, []);

  return loading ? (
    <DashboardSkeleton />
  ) : (
    <div className="dashboard-shell">
      <DashboardHeader />

      <main className="dashboard-content">
        <WelcomeSection onAction={handleWelcomeAction} />

        <div className="dashboard-cards">
          <LatestFromBitscaleCard />
          <ProductDemoCard />
        </div>

        <SearchToolbar
          tabs={gridTabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder={searchPlaceholder}
        />

        <GridsTable
          rows={visibleRows}
          expandedWorkbooks={expandedWorkbooks}
          onToggleWorkbook={handleToggleWorkbook}
          onToggleStar={handleToggleStar}
          onEditRow={handleEditRow}
          onDeleteRow={handleDeleteRow}
        />
      </main>

      <NewGridModal
        open={activeModal === "newGrid"}
        onClose={closeModal}
        onCreate={handleCreateGrid}
      />
      <FindPeopleModal
        open={activeModal === "findPeople"}
        onClose={closeModal}
      />
      <FindCompaniesModal
        open={activeModal === "findCompanies"}
        onClose={closeModal}
      />

      <Toast
        message={toastMessage}
        onDismiss={() => setToastMessage(null)}
      />
    </div>
  );
}

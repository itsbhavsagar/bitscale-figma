import type {
  GridRow,
  GridTabId,
} from "@/types/grids";

export function filterAndSortGrids(
  grids: GridRow[],
  options: {
    activeTab: GridTabId;
    searchQuery: string;
  },
): GridRow[] {
  const { activeTab, searchQuery } = options;

  const normalizedSearch = searchQuery.trim().toLowerCase();

  return grids.filter((row) => {
    if (activeTab === "starred" && !row.starred) {
      return false;
    }

    if (
      normalizedSearch &&
      !row.name.toLowerCase().includes(normalizedSearch)
    ) {
      return false;
    }

    return true;
  });
}

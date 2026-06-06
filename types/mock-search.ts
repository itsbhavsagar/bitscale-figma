export type SearchMode = "people" | "companies";

export interface SearchTableRow {
  id: string;
  cells: string[];
}

export interface SavedSearchPreset {
  id: string;
  label: string;
  values: Record<string, string>;
}

export interface MockSearchResult {
  rows: SearchTableRow[];
  totalCount: number;
}

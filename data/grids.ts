import type { GridRow, GridTab } from "@/types/grids";

export const gridTabs: GridTab[] = [
  { id: "my-grids", label: "My Grids" },
  { id: "starred", label: "Starred" },
];

export const initialGrids: GridRow[] = [
  {
    id: "workbook-1",
    name: "Workbook - Testing design Ideas for grid and workbook",
    platform: "workbook",
    isWorkbook: true,
    expandable: true,
    starred: false,
    childPlatforms: ["find-people", "hubspot", "form"],
    editedBy: {
      name: "Sam Taylor",
      initials: "ST",
      avatarSrc: "/avatars/sam-taylor.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-1",
    name: "LinkedIn",
    platform: "linkedin",
    parentId: "workbook-1",
    starred: false,
    editedBy: {
      name: "Chris Parker",
      initials: "CP",
      avatarSrc: "/avatars/chris-parker.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-2",
    name: "Sales nav",
    platform: "sales-navigator",
    parentId: "workbook-1",
    starred: false,
    editedBy: {
      name: "Jane Doe",
      initials: "JD",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-3",
    name: "Find company",
    platform: "form",
    starred: true,
    editedBy: {
      name: "Jane Doe",
      initials: "AM",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-4",
    name: "import csv",
    platform: "csv",
    starred: true,
    editedBy: {
      name: "Drew Wilson",
      initials: "DW",
      avatarSrc: "/avatars/drew-wilson.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-5",
    name: "Find people",
    platform: "find-people",
    starred: true,
    editedBy: {
      name: "Jane Doe",
      initials: "JD",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-6",
    name: "Google maps",
    platform: "google-maps",
    starred: false,
    editedBy: {
      name: "Jane Doe",
      initials: "JD",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-7",
    name: "google search results",
    platform: "google-search",
    starred: false,
    editedBy: {
      name: "Jane Doe",
      initials: "JD",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-8",
    name: "Factors",
    platform: "factors",
    starred: false,
    editedBy: {
      name: "Jane Doe",
      initials: "JD",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
  {
    id: "grid-9",
    name: "Hubspot List - 10 (05 Aug 25)",
    platform: "hubspot",
    starred: true,
    editedBy: {
      name: "Jane Doe",
      initials: "JD",
      avatarSrc: "/avatars/jone-doe.jpg",
    },
    lastEdited: "06 Aug, 2025",
    lastEditedDate: new Date("2025-08-06"),
  },
];

export const gridTypeOptions: { value: GridRow["platform"]; label: string }[] =
  [
    { value: "linkedin", label: "LinkedIn" },
    { value: "sales-navigator", label: "Sales Navigator" },
    { value: "google-maps", label: "Google Maps" },
    { value: "google-search", label: "Google Search" },
    { value: "find-people", label: "Find People" },
    { value: "factors", label: "Factors" },
    { value: "apollo", label: "Apollo" },
    { value: "form", label: "Form" },
    { value: "hubspot", label: "HubSpot" },
    { value: "csv", label: "CSV" },
    { value: "workbook", label: "Workbook" },
  ];

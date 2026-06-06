import type {
  MockSearchResult,
  SearchMode,
  SearchTableRow,
} from "@/types/mock-search";

const firstNames = [
  "John",
  "Priya",
  "Alex",
  "Maya",
  "Sam",
  "Jordan",
  "Avery",
  "Taylor",
  "Ravi",
  "Nina",
];

const lastNames = [
  "Smith",
  "Patel",
  "Chen",
  "Wilson",
  "Miller",
  "Garcia",
  "Brown",
  "Davis",
  "Khan",
  "Martin",
];

const peopleTitles = [
  "Engineering Manager",
  "Senior Product Manager",
  "Marketing Director",
  "Head of Sales",
  "Founder",
  "Growth Lead",
];

const companyNames = [
  "Stripe",
  "Notion",
  "Canva",
  "Figma",
  "Airtable",
  "HubSpot",
  "Datadog",
  "Amplitude",
  "Linear",
  "Rippling",
];

const industries = [
  "FinTech",
  "SaaS",
  "Healthcare",
  "E-commerce",
  "AI",
  "Cybersecurity",
];

const locations = [
  "New York",
  "San Francisco",
  "London",
  "Bengaluru",
  "Singapore",
  "Dubai",
];

const loadingFlowStages = [
  "Analyzing filters...",
  "Searching database...",
  "Ranking results...",
] as const;

const countMap: Record<string, number> = {
  saas: 2138,
  fintech: 856,
  healthcare: 1042,
  enterprise: 2784,
  google: 1644,
  microsoft: 1403,
  stripe: 922,
  hubspot: 788,
};

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pick<T>(items: T[]): T {
  return items[randomInt(0, items.length - 1)];
}

function toSlug(value: string): string {
  return value.trim().toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

function toDomain(value: string): string {
  const clean = value.replace(/^https?:\/\//, "").replace(/^www\./, "");
  return clean.split("/")[0] || `${toSlug(value)}.com`;
}

function seededFromFilter(
  filterValue: string | undefined,
  fallbackList: string[],
): string {
  const trimmed = filterValue?.trim();
  return trimmed ? trimmed : pick(fallbackList);
}

function getSearchNeedle(values: Record<string, string>): string {
  return Object.values(values).join(" ").toLowerCase();
}

function isNoMatchSearch(values: Record<string, string>): boolean {
  return getSearchNeedle(values).includes("xyzrandomcompany123");
}

function getCompanyCandidates(companySeed: string | undefined): string[] {
  const seed = companySeed?.trim();
  if (!seed) return companyNames;

  const needle = seed.toLowerCase();
  if (needle.includes("google")) return ["Google", "Google Cloud", "Google India"];
  if (needle.includes("microsoft")) {
    return ["Microsoft", "Microsoft Azure", "Microsoft India"];
  }
  if (needle.includes("stripe")) return ["Stripe", "Stripe Atlas", "Stripe India"];
  if (needle.includes("hubspot")) return ["HubSpot", "HubSpot CRM", "HubSpot Labs"];
  return [seed, `${seed} Cloud`, `${seed} India`];
}

function getPeopleCompanyCandidates(
  keywordSeed: string | undefined,
  websiteSeed: string | undefined,
): string[] {
  if (websiteSeed?.trim()) {
    const companyFromDomain = toDomain(websiteSeed).split(".")[0];
    return getCompanyCandidates(companyFromDomain);
  }
  if (keywordSeed?.trim()) {
    return getCompanyCandidates(keywordSeed);
  }
  return companyNames;
}

function buildPeopleRows(filterValues: Record<string, string>): SearchTableRow[] {
  if (isNoMatchSearch(filterValues)) return [];

  const rowsCount = randomInt(10, 20);
  const keywordSeed = filterValues["people-keyword"];
  const titleSeed = filterValues["job-title"];
  const companySeed = filterValues["company-website"];
  const locationSeed = filterValues["person-location"] || filterValues["company-location"];
  const companyCandidates = getPeopleCompanyCandidates(keywordSeed, companySeed);

  return Array.from({ length: rowsCount }).map((_, index) => {
    const firstName = pick(firstNames);
    const lastName = pick(lastNames);
    const fullName = `${firstName} ${lastName}`;
    const title = seededFromFilter(titleSeed, peopleTitles);
    const company = pick(companyCandidates);
    const linkedIn = `linkedin.com/in/${toSlug(fullName)}`;
    const location = seededFromFilter(locationSeed, locations);

    return {
      id: `person-${index}-${toSlug(fullName)}`,
      cells: [fullName, title, company, linkedIn, location],
    };
  });
}

function buildCompanyRows(filterValues: Record<string, string>): SearchTableRow[] {
  if (isNoMatchSearch(filterValues)) return [];

  const rowsCount = randomInt(10, 20);
  const companySeed = filterValues["company-name"];
  const industrySeed = filterValues["industry"];
  const employeeSeed = filterValues["employee-count"];
  const locationSeed = filterValues["country"];
  const companyCandidates = getCompanyCandidates(companySeed);

  return Array.from({ length: rowsCount }).map((_, index) => {
    const baseName = pick(companyCandidates);
    const companyName =
      companySeed?.trim() && companyCandidates.length === 1
        ? `${baseName} ${index + 1}`
        : baseName;
    const industry = seededFromFilter(industrySeed, industries);
    const website = `${toSlug(companyName)}.com`;
    const employeeCount = employeeSeed?.trim()
      ? employeeSeed.trim()
      : `${randomInt(150, 9500)}`;
    const location = seededFromFilter(locationSeed, locations);

    return {
      id: `company-${index}-${toSlug(companyName)}`,
      cells: [companyName, industry, website, employeeCount, location],
    };
  });
}

export function hasAtLeastOneSearchCriterion(values: Record<string, string>): boolean {
  return Object.values(values).some((value) => value.trim().length > 0);
}

export function getLoadingFlowStage(index: number): string {
  return loadingFlowStages[Math.min(index, loadingFlowStages.length - 1)];
}

export function getLoadingFlowStageCount(): number {
  return loadingFlowStages.length;
}

function getCountForNeedle(mode: SearchMode, values: Record<string, string>): number {
  const needle = getSearchNeedle(values);
  const mapped = Object.entries(countMap).find(([key]) => needle.includes(key));
  if (mapped) return mapped[1];
  return mode === "people" ? randomInt(900, 4500) : randomInt(1200, 7000);
}

export function generateMockSearchResult(
  mode: SearchMode,
  filterValues: Record<string, string>,
): MockSearchResult {
  const rows =
    mode === "people"
      ? buildPeopleRows(filterValues)
      : buildCompanyRows(filterValues);

  const totalCount = rows.length === 0 ? 0 : getCountForNeedle(mode, filterValues);

  return { rows, totalCount };
}

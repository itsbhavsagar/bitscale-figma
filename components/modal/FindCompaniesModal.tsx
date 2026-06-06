import {
  companySavedSearches,
  companyFiltersConfig,
} from "@/data/company-filters";

import { LeadSearchModal } from "./LeadSearchModal";

interface FindCompaniesModalProps {
  open: boolean;
  onClose: () => void;
}

export function FindCompaniesModal({ open, onClose }: FindCompaniesModalProps) {
  return (
    <LeadSearchModal
      open={open}
      onClose={onClose}
      mode="companies"
      title={companyFiltersConfig.title}
      filters={companyFiltersConfig.filters}
      usage={companyFiltersConfig.usage}
      upsellText={companyFiltersConfig.upsellText}
      emptyStateTitle={companyFiltersConfig.emptyStateTitle}
      emptyStateDescription={companyFiltersConfig.emptyStateDescription}
      tableColumns={companyFiltersConfig.tableColumns}
      savedSearches={companySavedSearches}
    />
  );
}

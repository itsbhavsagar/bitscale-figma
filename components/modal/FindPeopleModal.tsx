import {
  peopleSavedSearches,
  peopleFiltersConfig,
} from "@/data/people-filters";

import { LeadSearchModal } from "./LeadSearchModal";

interface FindPeopleModalProps {
  open: boolean;
  onClose: () => void;
}

export function FindPeopleModal({ open, onClose }: FindPeopleModalProps) {
  return (
    <LeadSearchModal
      open={open}
      onClose={onClose}
      mode="people"
      title={peopleFiltersConfig.title}
      filters={peopleFiltersConfig.filters}
      usage={peopleFiltersConfig.usage}
      upsellText={peopleFiltersConfig.upsellText}
      emptyStateTitle={peopleFiltersConfig.emptyStateTitle}
      emptyStateDescription={peopleFiltersConfig.emptyStateDescription}
      tableColumns={peopleFiltersConfig.tableColumns}
      savedSearches={peopleSavedSearches}
    />
  );
}

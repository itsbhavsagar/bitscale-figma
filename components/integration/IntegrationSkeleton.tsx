export function IntegrationSkeleton() {
  return (
    <div className="integration-skeleton-grid">
      {Array.from({ length: 6 }).map((_, index) => (
        <div
          key={`integration-skeleton-${index}`}
          className="integration-skeleton-card animate-pulse"
        >
          <div className="flex items-start justify-between gap-(--spacing-3)">
            <div className="flex items-center gap-(--spacing-3)">
              <div className="h-[36px] w-[36px] rounded-md bg-gray-100" />
              <div className="space-y-(--spacing-1)">
                <div className="h-[14px] w-[120px] rounded-sm bg-gray-100" />
                <div className="h-[12px] w-[72px] rounded-sm bg-gray-100" />
              </div>
            </div>
            <div className="h-[24px] w-[92px] rounded-(--radius-full) bg-gray-100" />
          </div>

          <div className="mt-(--spacing-4) h-[52px] rounded-md bg-gray-100" />
          <div className="mt-(--spacing-4) h-[36px] rounded-(--radius-button) bg-gray-100" />
        </div>
      ))}
    </div>
  );
}

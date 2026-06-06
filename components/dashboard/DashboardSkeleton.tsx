export function DashboardSkeleton() {
  return (
    <div className="dashboard-shell">
      <div className="dashboard-header">
        <div className="h-8 w-[190px] animate-pulse rounded-(--radius-button) bg-gray-100" style={{ animationDelay: "30ms" }} />
      </div>

      <main className="dashboard-content flex flex-col gap-(--spacing-5) overflow-hidden">
        <div className="flex items-center justify-between gap-(--spacing-4)">
          <div className="space-y-(--spacing-2)">
            <div className="h-6 w-[210px] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "70ms" }} />
            <div className="h-4 w-[280px] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "110ms" }} />
          </div>
          <div className="flex gap-(--spacing-2)">
            <div className="h-9 w-[108px] animate-pulse rounded-(--radius-button) bg-gray-100" style={{ animationDelay: "140ms" }} />
            <div className="h-9 w-[108px] animate-pulse rounded-(--radius-button) bg-gray-100" style={{ animationDelay: "170ms" }} />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-(--spacing-6)">
          <div className="rounded-lg border border-border bg-background p-(--spacing-4)">
            <div className="space-y-(--spacing-3)">
              <div className="h-4 w-[120px] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "200ms" }} />
              <div className="h-[92px] w-full animate-pulse rounded-md bg-gray-100" style={{ animationDelay: "230ms" }} />
              <div className="h-3 w-[75%] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "260ms" }} />
            </div>
          </div>
          <div className="rounded-lg border border-border bg-background p-(--spacing-4)">
            <div className="space-y-(--spacing-3)">
              <div className="h-4 w-[120px] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "220ms" }} />
              <div className="h-[92px] w-full animate-pulse rounded-md bg-gray-100" style={{ animationDelay: "250ms" }} />
              <div className="h-3 w-[70%] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "280ms" }} />
            </div>
          </div>
        </div>

        <div className="flex items-end justify-between gap-(--spacing-4)">
          <div className="h-9 w-[260px] animate-pulse rounded-(--radius-button) bg-gray-100" style={{ animationDelay: "300ms" }} />
          <div className="h-9 w-[286px] animate-pulse rounded-(--radius-button) bg-gray-100" style={{ animationDelay: "330ms" }} />
        </div>

        <div className="flex-1 overflow-hidden rounded-lg border border-border bg-background p-(--spacing-4)">
          <div className="space-y-(--spacing-3)">
            {Array.from({ length: 8 }).map((_, index) => (
              <div
                key={`dashboard-row-skeleton-${index}`}
                className="h-8 w-full animate-pulse rounded-sm bg-gray-100"
                style={{ animationDelay: `${360 + index * 30}ms` }}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

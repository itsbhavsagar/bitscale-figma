interface SidebarSkeletonProps {
  className?: string;
}

export function SidebarSkeleton({ className = "" }: SidebarSkeletonProps) {
  const navRowWidths = ["75%", "88%", "68%", "82%"];

  return (
    <aside
      className={[
        "dashboard-sidebar flex h-screen flex-col border-r border-border bg-sidebar-bg",
        className,
      ].join(" ")}
    >
      <div className="border-b border-border px-4 py-4">
        <div className="h-[22px] w-[120px] animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: "40ms" }} />
      </div>

      <div className="border-b border-border px-4 py-3">
        <div className="h-7 w-full animate-pulse rounded-(--radius-button) bg-gray-100" style={{ animationDelay: "80ms" }} />
      </div>

      <div className="flex flex-1 flex-col gap-4 overflow-hidden px-2 py-4">
        {Array.from({ length: 3 }).map((_, sectionIndex) => (
          <div
            key={`sidebar-skeleton-section-${sectionIndex}`}
            className="flex flex-col gap-(--spacing-2)"
          >
            <div className="h-3 w-16 animate-pulse rounded-sm bg-gray-100" style={{ animationDelay: `${120 + sectionIndex * 40}ms` }} />
            {Array.from({ length: 4 }).map((__, itemIndex) => (
              <div
                key={`sidebar-skeleton-item-${sectionIndex}-${itemIndex}`}
                className="flex h-9 items-center gap-3 rounded-lg px-3"
              >
                <div
                  className="h-4 w-4 shrink-0 animate-pulse rounded-sm bg-gray-100"
                  style={{ animationDelay: `${160 + sectionIndex * 40 + itemIndex * 30}ms` }}
                />
                <div
                  className="h-3 animate-pulse rounded-sm bg-gray-100"
                  style={{
                    width: navRowWidths[itemIndex % navRowWidths.length],
                    animationDelay: `${190 + sectionIndex * 40 + itemIndex * 30}ms`,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="p-2">
        <div className="h-[72px] w-full animate-pulse rounded-lg bg-gray-100" style={{ animationDelay: "260ms" }} />
      </div>
    </aside>
  );
}

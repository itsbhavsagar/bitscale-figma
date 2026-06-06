import type { ReactNode } from "react";

interface EmptyStateProps {
  illustration?: ReactNode;
  title?: string;
  description: string;
  descriptionClassName?: string;
  illustrationClassName?: string;
  containerClassName?: string;
}

export function EmptyState({
  illustration,
  title,
  description,
  descriptionClassName,
  illustrationClassName,
  containerClassName,
}: EmptyStateProps) {
  return (
    <div
      className={[
        "flex flex-col items-center justify-center px-6 py-12 text-center",
        containerClassName ?? "",
      ].join(" ")}
    >
      {illustration ? (
        <div className={illustrationClassName ?? "mb-6"}>{illustration}</div>
      ) : null}
      {title ? (
        <h3 className="mb-2 text-[14px] font-semibold text-text-primary">
          {title}
        </h3>
      ) : null}
      <p
        className={[
          "whitespace-pre-line text-center text-[12px] font-medium leading-[150%] tracking-normal text-[#9CA3AF]",
          descriptionClassName ?? "max-w-md",
        ].join(" ")}
      >
        {description}
      </p>
    </div>
  );
}

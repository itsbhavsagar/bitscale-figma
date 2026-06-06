import Image from "next/image";
import {
  Building2,
  FileInput,
  Layers,
  MapPin,
  Search,
  Telescope,
  Users,
} from "lucide-react";

import type { GridPlatform } from "@/types/grids";

interface PlatformIconProps {
  platform: GridPlatform;
  size?: "table" | "sm" | "md";
}

const platformImageSrc: Partial<Record<GridPlatform, string>> = {
  linkedin: "/company-icons/linkedin.png",
  "sales-navigator": "/company-icons/sales-nav.png",
  "google-maps": "/company-icons/google.png",
  "google-search": "/company-icons/google-logo.png",
  hubspot: "/company-icons/hubspot.png",
  factors: "/company-icons/factors.png",
  csv: "/company-icons/file.png",
  "find-people": "/company-icons/users.png",
};

const mutedTablePlatforms = new Set<GridPlatform>([
  "form",
  "csv",
  "find-people",
  "hubspot",
]);

const platformStyles: Record<GridPlatform, string> = {
  workbook: "var(--platform-form)",
  linkedin: "var(--platform-linkedin)",
  "sales-navigator": "var(--platform-sales-navigator)",
  "google-maps": "var(--platform-google-maps)",
  "google-search": "var(--platform-google-search)",
  "find-people": "var(--platform-find-people)",
  factors: "var(--platform-factors)",
  apollo: "var(--platform-apollo)",
  form: "var(--platform-form)",
  hubspot: "var(--platform-hubspot)",
  csv: "var(--platform-csv)",
};

const iconInnerClass = "h-2.5 w-2.5 text-white";

function PlatformImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className: string;
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={18}
      height={18}
      className={className}
    />
  );
}

function WorkbookStackGlyph({ platform }: { platform: GridPlatform }) {
  if (platform === "find-people") {
    return (
      <Users
        className="h-3.5 w-3.5"
        style={{ color: "var(--platform-find-people)" }}
        aria-hidden="true"
      />
    );
  }

  if (platform === "form") {
    return (
      <Building2
        className="h-3.5 w-3.5"
        style={{ color: "#16a34a" }}
        aria-hidden="true"
      />
    );
  }

  const src = platformImageSrc[platform];
  if (src) {
    return (
      <Image
        src={src}
        alt={platform}
        width={16}
        height={16}
        className="h-4 w-4 object-contain"
      />
    );
  }

  return null;
}

export function WorkbookIconStack({ platforms }: { platforms: GridPlatform[] }) {
  return (
    <span className="workbook-icon-stack">
      {platforms.slice(0, 3).map((platform, index) => (
        <span
          key={`${platform}-${index}`}
          className="workbook-icon-tile"
          style={{
            marginLeft: index === 0 ? 0 : "-8px",
          }}
        >
          <WorkbookStackGlyph platform={platform} />
        </span>
      ))}
    </span>
  );
}

function WorkbookStackedIcons() {
  const icons = [

    { src: platformImageSrc.linkedin!, alt: "LinkedIn" },
    { src: platformImageSrc.hubspot!, alt: "HubSpot" },
  ];

  return (
    <span className="relative flex h-[18px] w-[42px] shrink-0 items-center">
      <span className="table-platform-icon absolute left-0 overflow-hidden rounded-[3px] ">
        <PlatformImage
          src={icons[0].src}
          alt={icons[0].alt}
          className="h-full w-full object-cover"
        />
      </span>
      <span
        className="table-platform-icon absolute left-[10px] flex items-center justify-center overflow-hidden rounded-[3px] text-white "
        style={{ backgroundColor: platformStyles.form }}
      >
        <FileInput className="h-2.5 w-2.5" aria-hidden="true" />
      </span>
      <span className="table-platform-icon absolute left-[20px] overflow-hidden rounded-[3px]">
        <PlatformImage
          src={icons[1].src}
          alt={icons[1].alt}
          className="h-full w-full object-cover"
        />
      </span>
    </span>
  );
}

export function PlatformIcon({ platform, size = "md" }: PlatformIconProps) {
  const bg = platformStyles[platform];
  const isTable = size === "table";
  const imageSrc = platformImageSrc[platform];

  if (platform === "workbook") {
    return <WorkbookStackedIcons />;
  }

  if (imageSrc) {
    const image = (
      <PlatformImage
        src={imageSrc}
        alt={platform}
        className={
          isTable ? "h-full w-full object-contain p-[2px]" : "h-full w-full object-cover"
        }
      />
    );

    return (
      <span
        className={[
          "flex shrink-0 items-center justify-center overflow-hidden rounded-[3px]",
          isTable ? "table-platform-icon" : size === "sm" ? "h-5 w-5" : "h-6 w-6",
          isTable && mutedTablePlatforms.has(platform)
            ? "table-platform-icon--muted"
            : "",
        ]
          .filter(Boolean)
          .join(" ")}
      >
        {image}
      </span>
    );
  }

  return (
    <span
      className={[
        "flex shrink-0 items-center justify-center rounded-[3px] text-white",
        isTable ? "table-platform-icon" : size === "sm" ? "h-5 w-5" : "h-6 w-6",
        isTable && mutedTablePlatforms.has(platform)
          ? "table-platform-icon--muted"
          : "",
      ]
        .filter(Boolean)
        .join(" ")}
      style={
        isTable && mutedTablePlatforms.has(platform)
          ? undefined
          : { backgroundColor: bg }
      }
    >
      {platform === "find-people" && (
        <Users className={iconInnerClass} aria-hidden="true" />
      )}
      {platform === "apollo" && (
        <Telescope className={iconInnerClass} aria-hidden="true" />
      )}
      {platform === "form" && (
        <Building2
          className="h-3 w-3"
          style={{ color: "#16a34a" }}
          aria-hidden="true"
        />
      )}
      {platform === "sales-navigator" && (
        <Search className={iconInnerClass} aria-hidden="true" />
      )}
      {platform === "google-maps" && (
        <MapPin className={iconInnerClass} aria-hidden="true" />
      )}
      {platform === "google-search" && (
        <Search className={iconInnerClass} aria-hidden="true" />
      )}
      {platform === "factors" && (
        <Layers className={iconInnerClass} aria-hidden="true" />
      )}
    </span>
  );
}

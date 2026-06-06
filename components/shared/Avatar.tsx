import Image from "next/image";

interface AvatarProps {
  name: string;
  initials: string;
  src?: string;
  size?: "xs" | "sm" | "md";
}

const sizeClasses = {
  xs: "table-avatar",
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-[13px]",
};

const sizePixels = {
  xs: 24,
  sm: 24,
  md: 32,
};

export function Avatar({ name, initials, src, size = "md" }: AvatarProps) {
  if (src) {
    return (
      <Image
        src={src}
        alt={name}
        width={sizePixels[size]}
        height={sizePixels[size]}
        className={[
          "rounded-full object-cover",
          size === "xs" ? "table-avatar" : sizeClasses[size],
        ].join(" ")}
      />
    );
  }

  return (
    <span
      className={[
        "flex shrink-0 items-center justify-center rounded-full bg-gray-100 font-medium text-text-primary",
        sizeClasses[size],
      ].join(" ")}
    >
      {initials}
    </span>
  );
}

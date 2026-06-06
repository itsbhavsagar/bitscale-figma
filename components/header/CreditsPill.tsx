import Image from "next/image";

interface CreditsPillProps {
  current: number;
  total: number;
  planLabel: string;
}

export function CreditsPill({ current, total, planLabel }: CreditsPillProps) {
  return (
    <div className="credits-pill">
      <div className="credits-pill__usage">
      <Image
  src="/header-coins.png"
  alt=""
  width={16}
  height={12}
  className="credits-pill__icon"
  aria-hidden="true"
/>
        <span className="credits-pill__text">
          {current}/{total}
        </span>
      </div>

      <div className="credits-pill__plan">{planLabel}</div>
    </div>
  );
}

import type { CRMSegment } from "@/lib/server/crm/types";

const classMap: Record<CRMSegment, string> = {
  NEW: "bg-[#f3e7dc] text-[#75645d]",
  REGULAR: "bg-[#fff0d7] text-[#8a5a21]",
  LOYAL: "bg-[#335f50]/10 text-[#335f50]",
  VIP: "bg-[#201713] text-[#efc28b]",
  AT_RISK: "bg-[#7c241e]/10 text-[#7c241e]",
  DORMANT: "bg-[#ddd3ca] text-[#6e625c]",
};

export default function CRMSegmentBadge({
  segment,
}: {
  segment: CRMSegment;
}) {
  return (
    <span
      className={`inline-flex rounded-full px-3 py-2 text-[8px] uppercase tracking-[.1em] ${classMap[segment]}`}
    >
      {segment.replace("_", " ")}
    </span>
  );
}

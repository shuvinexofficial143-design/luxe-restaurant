import type { CMSStatus } from "@/lib/cms/types";

export default function CMSStatusBadge({
  status,
}: {
  status: CMSStatus;
}) {
  return (
    <span
      className={`rounded-full px-3 py-2 text-[8px] uppercase tracking-[.1em] ${
        status === "PUBLISHED"
          ? "bg-[#335f50]/10 text-[#335f50]"
          : status === "ARCHIVED"
            ? "bg-[#7c241e]/10 text-[#7c241e]"
            : "bg-[#fff0d7] text-[#8a5a21]"
      }`}
    >
      {status}
    </span>
  );
}

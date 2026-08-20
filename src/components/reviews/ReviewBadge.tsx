export default function ReviewBadge({
  verified,
}: {
  verified: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-2 text-[8px] uppercase tracking-[.11em] ${
        verified
          ? "bg-[#335f50]/10 text-[#335f50]"
          : "bg-[#f3e7dc] text-[#75645d]"
      }`}
    >
      {verified ? "Verified demo guest" : "Guest review"}
    </span>
  );
}

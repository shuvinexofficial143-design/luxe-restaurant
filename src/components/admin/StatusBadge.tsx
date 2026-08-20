export default function StatusBadge({
  value,
}: {
  value: string;
}) {
  const positive = [
    "CONFIRMED",
    "COMPLETED",
    "ACTIVE",
    "OFFER",
    "READY",
  ].includes(value);
  const negative = ["CANCELLED", "CLOSED", "USED"].includes(value);

  return (
    <span
      className={`inline-flex rounded-full px-3 py-2 text-[8px] uppercase tracking-[.1em] ${
        positive
          ? "bg-[#335f50]/10 text-[#335f50]"
          : negative
            ? "bg-[#7c241e]/10 text-[#7c241e]"
            : "bg-[#fff0d7] text-[#8a5a21]"
      }`}
    >
      {value || "—"}
    </span>
  );
}

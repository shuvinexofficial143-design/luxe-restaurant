export default function VintageBadge({
  vintage,
  dark = false,
}: {
  vintage: number | "NV";
  dark?: boolean;
}) {
  return (
    <span
      className={`rounded-full px-3 py-2 text-[8px] uppercase tracking-[.12em] ${
        dark
          ? "bg-[#201713] text-white"
          : "border border-white/60 bg-white/90 text-[#7c241e]"
      }`}
    >
      {vintage}
    </span>
  );
}

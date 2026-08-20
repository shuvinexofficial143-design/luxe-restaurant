
export default function GlowDivider({
  label = "LUXE",
}: {
  label?: string;
}) {
  return (
    <div className="flex items-center gap-4 py-2">
      <span className="h-px flex-1 bg-[linear-gradient(90deg,transparent,rgba(201,148,75,.28))]" />
      <span className="text-[7px] uppercase tracking-[.28em] text-[#80674b]">
        {label}
      </span>
      <span className="h-px flex-1 bg-[linear-gradient(90deg,rgba(201,148,75,.28),transparent)]" />
    </div>
  );
}

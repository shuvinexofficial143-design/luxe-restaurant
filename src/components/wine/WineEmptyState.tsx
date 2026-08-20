export default function WineEmptyState({
  onReset,
}: {
  onReset: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-10 text-center">
      <p className="text-4xl">🍷</p>
      <h3 className="lx-serif mt-3 text-3xl">No bottle matches.</h3>
      <p className="mt-3 text-sm text-[#75645d]">
        Try a broader region, body style or budget.
      </p>
      <button
        type="button"
        onClick={onReset}
        className="mt-5 rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.12em] text-white"
      >
        Reset filters
      </button>
    </div>
  );
}

export default function MenuEmptyState({ onReset }: { onReset: () => void }) {
  return (
    <div className="rounded-[28px] border border-dashed border-[#7c241e]/25 bg-[#fffaf4] px-5 py-16 text-center">
      <p className="text-3xl">🍽️</p>
      <h3 className="lx-serif mt-4 text-3xl">No dishes match.</h3>
      <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#75645d]">
        Try removing a dietary filter or increasing your price limit.
      </p>
      <button onClick={onReset} className="mt-6 rounded-full bg-[#7c241e] px-5 py-3 text-[9px] uppercase tracking-[.15em] text-white">
        Reset filters
      </button>
    </div>
  );
}

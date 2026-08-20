"use client";

export default function FloatingSearchButton({
  onClick,
}: {
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Search LUXE"
      className="fixed bottom-20 right-5 z-[76] hidden h-12 w-12 place-items-center border border-white/20 bg-[#170c09]/88 text-sm text-white shadow-[0_12px_40px_rgba(0,0,0,.2)] backdrop-blur-xl transition hover:bg-[#6b231d] md:grid"
    >
      ⌕
    </button>
  );
}

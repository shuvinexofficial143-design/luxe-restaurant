export default function MobileBookingBar({
  label,
  disabled,
  onClick,
}: {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <div className="fixed inset-x-3 bottom-[88px] z-[90] md:hidden">
      <button
        type="button"
        disabled={disabled}
        onClick={onClick}
        className="h-14 w-full rounded-[20px] bg-[#7c241e] px-5 text-[10px] uppercase tracking-[.16em] text-white shadow-[0_18px_45px_rgba(124,36,30,.28)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {label}
      </button>
    </div>
  );
}

export default function SpiceLevel({ level }: { level: 0 | 1 | 2 | 3 }) {
  if (level === 0) return <span className="text-[9px] text-[#7a685f]">Mild</span>;

  return (
    <span className="text-[10px]" title={`Spice level ${level} of 3`}>
      {Array.from({ length: level }).map((_, index) => (
        <span key={index}>🌶</span>
      ))}
    </span>
  );
}

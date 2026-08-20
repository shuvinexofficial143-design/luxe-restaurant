
export default function AnimatedRibbon() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <div className="lx-ribbon lx-ribbon-one opacity-70" />
      <div className="lx-ribbon lx-ribbon-two" />
    </div>
  );
}

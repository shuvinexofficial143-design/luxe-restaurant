
const embers = [
  [9, 88, "7.8s", "-1.2s", "14px"],
  [18, 76, "9.1s", "-4.1s", "-18px"],
  [29, 92, "6.9s", "-2.5s", "24px"],
  [37, 80, "8.4s", "-6s", "-12px"],
  [49, 96, "10s", "-3.6s", "19px"],
  [58, 83, "7.4s", "-5.5s", "-23px"],
  [66, 91, "8.9s", "-1.7s", "16px"],
  [73, 78, "9.8s", "-7.2s", "-15px"],
  [82, 93, "7.1s", "-4.8s", "20px"],
  [91, 82, "8.3s", "-2.1s", "-18px"],
  [14, 64, "10.2s", "-8.1s", "18px"],
  [42, 69, "7.6s", "-3.3s", "-14px"],
  [62, 62, "9.4s", "-6.7s", "22px"],
  [87, 68, "8.1s", "-5.2s", "-16px"],
] as const;

export default function AnimatedEmberBackdrop() {
  return (
    <div aria-hidden="true" className="lx-ember-field">
      <div className="lx-ribbon lx-ribbon-one" />
      <div className="lx-ribbon lx-ribbon-two" />

      <div className="lx-orbit-glow left-[-20%] top-[12%] h-[440px] w-[440px]" />
      <div className="lx-orbit-glow bottom-[-30%] right-[-28%] h-[520px] w-[520px]" />

      {embers.map(([left, top, duration, delay, x], index) => (
        <i
          key={index}
          className="lx-ember"
          style={{
            left: `${left}%`,
            top: `${top}%`,
            ["--d" as string]: duration,
            ["--delay" as string]: delay,
            ["--x" as string]: x,
          }}
        />
      ))}
    </div>
  );
}

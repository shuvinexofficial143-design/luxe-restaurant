
const promises = [
  ["Fire", "Bold ingredients, open flame, real smoke."],
  ["Intent", "Every plate designed with purpose."],
  ["Ease", "A refined experience without stiffness."],
  ["Care", "Hospitality that feels quietly personal."],
];

export default function ServicePromise() {
  return (
    <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
      {promises.map(([title, text], index) => (
        <article
          key={title}
          className="rounded-[20px] border border-[#e7c58f]/10 bg-white/[.015] p-4"
        >
          <p className="text-[7px] text-[#9b7342]">
            {String(index + 1).padStart(2, "0")}
          </p>
          <p className="lx-serif mt-3 text-xl text-[#ead9c2]">{title}</p>
          <p className="mt-2 text-[9px] leading-5 text-white/30">{text}</p>
        </article>
      ))}
    </div>
  );
}

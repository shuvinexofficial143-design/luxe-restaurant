export default function TeamValues() {
  const items = [
    ["Craft", "Learn the why behind the work, not only the task."],
    ["Respect", "Treat every role — kitchen, service or support — as part of one guest experience."],
    ["Consistency", "Great restaurants repeat good standards every day."],
    ["Curiosity", "Ask questions, taste, observe and improve."],
  ];

  return (
    <div className="rounded-[28px] bg-[#201713] p-5 text-white md:p-7">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc28b]">
        Team mindset
      </p>
      <h2 className="lx-serif mt-2 text-4xl">How we work.</h2>

      <div className="mt-5 grid gap-2 sm:grid-cols-2">
        {items.map(([title, text]) => (
          <div key={title} className="rounded-[18px] bg-white/[.06] p-4">
            <p className="lx-serif text-2xl text-[#efc28b]">{title}</p>
            <p className="mt-2 text-xs leading-6 text-white/50">{text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

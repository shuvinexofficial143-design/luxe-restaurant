export default function CRMInsightsPanel() {
  const insights = [
    ["VIP", "High-score guests for recognition and priority service."],
    ["AT RISK", "Previously active guests whose recent activity has dropped."],
    ["DORMANT", "Guests with no tracked activity for roughly six months."],
    ["LOYAL", "Repeat guests with strong visit/order frequency."],
  ];

  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {insights.map(([title, text]) => (
        <div key={title} className="rounded-[18px] bg-[#fffaf4] p-4">
          <p className="lx-serif text-2xl text-[#7c241e]">{title}</p>
          <p className="mt-2 text-[10px] leading-5 text-[#75645d]">
            {text}
          </p>
        </div>
      ))}
    </div>
  );
}

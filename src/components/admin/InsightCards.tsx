export type AnalyticsInsight = {
  title: string;
  text: string;
  tone: "POSITIVE" | "ATTENTION" | "NEUTRAL";
};

export default function InsightCards({
  items,
}: {
  items: AnalyticsInsight[];
}) {
  const classes = {
    POSITIVE: "bg-[#335f50] text-white",
    ATTENTION: "bg-[#7c241e] text-white",
    NEUTRAL: "bg-[#fffaf4] text-[#201713]",
  };

  return (
    <div className="grid gap-2 md:grid-cols-2 xl:grid-cols-3">
      {items.map((item) => (
        <div
          key={`${item.title}-${item.text}`}
          className={`rounded-[20px] p-4 ${classes[item.tone]}`}
        >
          <p className="lx-serif text-2xl">{item.title}</p>
          <p className="mt-2 text-[10px] leading-5 opacity-60">
            {item.text}
          </p>
        </div>
      ))}
    </div>
  );
}

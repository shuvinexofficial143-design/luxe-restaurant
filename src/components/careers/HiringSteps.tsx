export default function HiringSteps() {
  const steps = [
    ["01", "Apply", "Submit the role form and CV filename in demo mode."],
    ["02", "Review", "The real hiring team would screen experience and fit."],
    ["03", "Conversation", "Shortlisted candidates move to an interview or trial."],
    ["04", "Decision", "Final feedback, offer or closure."],
  ];

  return (
    <div className="grid gap-2 md:grid-cols-4">
      {steps.map(([number, title, text]) => (
        <div key={number} className="rounded-[20px] bg-[#fffaf4] p-4">
          <span className="text-[9px] text-[#7c241e]">{number}</span>
          <p className="lx-serif mt-2 text-2xl">{title}</p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}

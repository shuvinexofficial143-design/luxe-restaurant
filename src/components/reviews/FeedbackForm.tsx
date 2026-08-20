"use client";

import { FormEvent, useState } from "react";
import { feedbackStore } from "@/lib/reviews/storage";
import FeedbackMeter from "./FeedbackMeter";

export default function FeedbackForm() {
  const [overall, setOverall] = useState(5);
  const [food, setFood] = useState(5);
  const [service, setService] = useState(5);
  const [ambience, setAmbience] = useState(5);
  const [value, setValue] = useState(4);
  const [wouldReturn, setWouldReturn] = useState(true);
  const [saved, setSaved] = useState(false);

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    feedbackStore.save({
      id: `FDB-${Date.now().toString(36).toUpperCase()}`,
      overall,
      food,
      service,
      ambience,
      value,
      wouldReturn,
      note: String(form.get("note") || ""),
      createdAt: new Date().toISOString(),
    });

    setSaved(true);
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Post-visit feedback</p>
      <h2 className="lx-serif mt-2 text-4xl">Help us improve.</h2>

      <div className="mt-6 space-y-5">
        <FeedbackMeter label="Overall" value={overall} onChange={setOverall} />
        <FeedbackMeter label="Food" value={food} onChange={setFood} />
        <FeedbackMeter label="Service" value={service} onChange={setService} />
        <FeedbackMeter label="Ambience" value={ambience} onChange={setAmbience} />
        <FeedbackMeter label="Value" value={value} onChange={setValue} />
      </div>

      <div className="mt-6">
        <p className="text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
          Would you return?
        </p>
        <div className="mt-2 grid grid-cols-2 gap-2">
          {[true, false].map((answer) => (
            <button
              key={String(answer)}
              type="button"
              onClick={() => setWouldReturn(answer)}
              className={`h-11 rounded-[14px] border text-[9px] uppercase tracking-[.1em] ${
                wouldReturn === answer
                  ? "border-[#7c241e] bg-[#7c241e] text-white"
                  : "border-[#4a3025]/10 bg-white"
              }`}
            >
              {answer ? "Yes" : "Not yet"}
            </button>
          ))}
        </div>
      </div>

      <textarea
        name="note"
        rows={4}
        placeholder="Anything we should know?"
        className="mt-4 w-full rounded-[18px] border border-[#4a3025]/10 bg-white p-4 text-sm"
      />

      <button className="mt-4 h-13 w-full rounded-[18px] bg-[#335f50] text-[9px] uppercase tracking-[.13em] text-white">
        {saved ? "Feedback saved ✓" : "Save feedback"}
      </button>

      <p className="mt-3 text-[9px] leading-5 text-[#8a756b]">
        Stored locally in demo mode. No email or CRM submission occurs yet.
      </p>
    </form>
  );
}

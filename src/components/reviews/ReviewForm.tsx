"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import type { ReviewCategory } from "@/lib/reviews/types";
import { reviewStore } from "@/lib/reviews/storage";
import RatingStars from "./RatingStars";

export default function ReviewForm() {
  const router = useRouter();
  const [rating, setRating] = useState(5);
  const [category, setCategory] = useState<ReviewCategory>("Dining");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = `REV-${Date.now().toString(36).toUpperCase()}`;

    reviewStore.add({
      id,
      name: String(form.get("name") || "Guest"),
      city: String(form.get("city") || ""),
      rating: rating as 1 | 2 | 3 | 4 | 5,
      category,
      title: String(form.get("title") || ""),
      text: String(form.get("text") || ""),
      visitDate: String(form.get("visitDate") || ""),
      verified: false,
      createdAt: new Date().toISOString(),
    });

    router.push(`/reviews/thanks?id=${encodeURIComponent(id)}`);
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5 md:p-7">
      <p className="lx-kicker">Your experience</p>
      <h2 className="lx-serif mt-2 text-4xl">How was LUXE?</h2>

      <div className="mt-5">
        <p className="text-[9px] uppercase tracking-[.11em] text-[#7c241e]">Overall rating</p>
        <div className="mt-2">
          <RatingStars value={rating} onChange={setRating} size="lg" />
        </div>
      </div>

      <label className="mt-5 grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
        Category
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value as ReviewCategory)}
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case"
        >
          <option>Dining</option>
          <option>Service</option>
          <option>Wine</option>
          <option>Events</option>
          <option>Private Dining</option>
        </select>
      </label>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        {[
          ["Name", "name", "text"],
          ["City", "city", "text"],
          ["Visit date", "visitDate", "date"],
          ["Review title", "title", "text"],
        ].map(([label, name, type]) => (
          <label key={name} className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            {label}
            <input
              required
              name={name}
              type={type}
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
            />
          </label>
        ))}
      </div>

      <label className="mt-3 grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
        Review
        <textarea
          required
          name="text"
          rows={5}
          minLength={20}
          placeholder="Tell us what stood out..."
          className="rounded-[18px] border border-[#4a3025]/10 bg-white p-4 text-sm normal-case tracking-normal"
        />
      </label>

      <p className="mt-4 rounded-[16px] bg-[#fff2dd] p-3 text-[10px] leading-5 text-[#75645d]">
        Demo review only. Production moderation, verified-order matching and anti-spam controls are not connected yet.
      </p>

      <button className="mt-4 h-13 w-full rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.13em] text-white">
        Submit review ↗
      </button>
    </form>
  );
}

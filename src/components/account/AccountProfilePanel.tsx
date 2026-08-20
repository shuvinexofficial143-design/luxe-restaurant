"use client";

import { FormEvent, useState } from "react";
import type { CustomerProfileRow } from "@/lib/server/account/types";

const dietOptions = [
  "Vegetarian",
  "Vegan",
  "Gluten-Free",
  "Nut-Free",
  "Dairy-Free",
  "No Shellfish",
];

export default function AccountProfilePanel({
  customer,
  profile,
  onSaved,
}: {
  customer: {
    name: string;
    email: string;
    phone: string | null;
  };
  profile: CustomerProfileRow;
  onSaved: () => void;
}) {
  const [dietary, setDietary] = useState(profile.dietary_preferences);
  const [message, setMessage] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    const response = await fetch("/api/v1/account/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        favouriteArea: String(form.get("favouriteArea") || ""),
        dietaryPreferences: dietary,
        favouriteCuisines: String(form.get("favouriteCuisines") || "")
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean),
        marketingOptIn: form.get("marketingOptIn") === "on",
        notes: String(form.get("notes") || ""),
      }),
    });

    const payload = (await response.json()) as {
      ok?: boolean;
      error?: { message?: string };
    };

    setMessage(
      response.ok && payload.ok
        ? "Profile saved to database."
        : payload.error?.message || "Profile could not be saved."
    );

    if (response.ok && payload.ok) onSaved();
  }

  function toggleDiet(value: string) {
    setDietary((current) =>
      current.includes(value)
        ? current.filter((item) => item !== value)
        : [...current, value]
    );
  }

  return (
    <form onSubmit={submit} className="rounded-[28px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Guest profile</p>
      <h2 className="lx-serif mt-2 text-4xl">{customer.name}</h2>
      <p className="mt-2 text-xs text-[#75645d]">{customer.email}</p>

      <label className="mt-5 grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Favourite dining area
        <input
          name="favouriteArea"
          defaultValue={profile.favourite_area || ""}
          placeholder="Terrace, Window, Chef Table…"
          className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
        />
      </label>

      <div className="mt-4">
        <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
          Dietary preferences
        </p>
        <div className="mt-2 flex flex-wrap gap-2">
          {dietOptions.map((option) => (
            <button
              key={option}
              type="button"
              onClick={() => toggleDiet(option)}
              className={`rounded-full px-3 py-2 text-[8px] ${
                dietary.includes(option)
                  ? "bg-[#335f50] text-white"
                  : "border border-[#4a3025]/10 bg-white"
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <label className="mt-4 grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Favourite cuisines
        <input
          name="favouriteCuisines"
          defaultValue={profile.favourite_cuisines.join(", ")}
          placeholder="Indian, French, Japanese"
          className="h-11 rounded-[14px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
        />
      </label>

      <label className="mt-4 grid gap-2 text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Guest notes
        <textarea
          name="notes"
          rows={3}
          defaultValue={profile.notes || ""}
          className="rounded-[14px] border border-[#4a3025]/10 bg-white p-3 text-sm normal-case tracking-normal"
        />
      </label>

      <label className="mt-4 flex items-center gap-3 rounded-[14px] bg-[#f3e7dc] p-3 text-xs">
        <input
          name="marketingOptIn"
          type="checkbox"
          defaultChecked={profile.marketing_opt_in}
        />
        Receive restaurant updates and member offers
      </label>

      <button className="mt-4 h-11 w-full rounded-[14px] bg-[#7c241e] text-[8px] uppercase tracking-[.11em] text-white">
        Save profile
      </button>

      {message ? (
        <p className="mt-3 text-[10px] text-[#75645d]">{message}</p>
      ) : null}
    </form>
  );
}

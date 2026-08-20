"use client";

import { useSyncExternalStore } from "react";
import { accountStore } from "@/lib/account/storage";
import PreferenceChips from "./PreferenceChips";

export default function DietaryPreferenceEditor() {
  const account = useSyncExternalStore(
    accountStore.subscribe,
    accountStore.getSnapshot,
    accountStore.getServerSnapshot
  );

  const preferences = account.preferences;

  const values = [
    { key: "vegetarian", label: "Vegetarian", active: preferences.vegetarian },
    { key: "vegan", label: "Vegan", active: preferences.vegan },
    { key: "glutenFree", label: "Gluten Free", active: preferences.glutenFree },
    { key: "lowSpice", label: "Low Spice", active: preferences.lowSpice },
    { key: "noNuts", label: "No Nuts", active: preferences.noNuts },
  ];

  function toggle(key: string) {
    accountStore.update({
      preferences: {
        ...preferences,
        [key]: !preferences[key as keyof typeof preferences],
      },
    });
  }

  return (
    <div className="rounded-[26px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Dining preferences</p>
      <h2 className="lx-serif mt-2 text-3xl">Remember what matters.</h2>
      <p className="mt-2 text-xs leading-6 text-[#75645d]">
        These demo preferences can later personalize menu recommendations and booking notes.
      </p>
      <div className="mt-4"><PreferenceChips values={values} onToggle={toggle} /></div>

      <label className="mt-5 grid gap-2 text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
        Favourite dining area
        <select
          value={preferences.favouriteArea}
          onChange={(event) =>
            accountStore.update({
              preferences: {
                ...preferences,
                favouriteArea: event.target.value as typeof preferences.favouriteArea,
              },
            })
          }
          className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
        >
          <option>Main Dining</option>
          <option>Window</option>
          <option>Terrace</option>
          <option>Chef Table</option>
        </select>
      </label>
    </div>
  );
}

"use client";

import { useState } from "react";
import type { SommelierAnswers, Wine } from "@/lib/wine/types";
import { recommendWines } from "@/lib/wine/recommendations";
import SommelierResultCard from "./SommelierResultCard";

const initial: SommelierAnswers = {
  colour: "Any",
  body: "Any",
  budget: 7000,
  mood: "Elegant",
  dish: "Any",
};

export default function SommelierQuiz() {
  const [answers, setAnswers] = useState(initial);
  const [results, setResults] = useState<Wine[]>([]);

  return (
    <div className="grid gap-4 lg:grid-cols-[.8fr_1.2fr]">
      <div className="rounded-[28px] bg-[#fffaf4] p-5">
        <p className="lx-kicker">Taste finder</p>
        <h2 className="lx-serif mt-2 text-4xl">Tell us your mood.</h2>

        <div className="mt-5 grid gap-4">
          <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Colour
            <select
              value={answers.colour}
              onChange={(event) =>
                setAnswers({
                  ...answers,
                  colour: event.target.value as SommelierAnswers["colour"],
                })
              }
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case"
            >
              <option>Any</option>
              <option>Red</option>
              <option>White</option>
            </select>
          </label>

          <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Body
            <select
              value={answers.body}
              onChange={(event) =>
                setAnswers({
                  ...answers,
                  body: event.target.value as SommelierAnswers["body"],
                })
              }
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case"
            >
              <option>Any</option>
              <option>Light</option>
              <option>Medium</option>
              <option>Full</option>
            </select>
          </label>

          <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Mood
            <select
              value={answers.mood}
              onChange={(event) =>
                setAnswers({
                  ...answers,
                  mood: event.target.value as SommelierAnswers["mood"],
                })
              }
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case"
            >
              <option>Fresh</option>
              <option>Elegant</option>
              <option>Bold</option>
              <option>Celebration</option>
            </select>
          </label>

          <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Dish
            <select
              value={answers.dish}
              onChange={(event) =>
                setAnswers({
                  ...answers,
                  dish: event.target.value as SommelierAnswers["dish"],
                })
              }
              className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case"
            >
              <option>Any</option>
              <option>Seafood</option>
              <option>Vegetarian</option>
              <option>Duck</option>
              <option>Lamb</option>
              <option>Dessert</option>
            </select>
          </label>

          <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Bottle budget · ₹{answers.budget.toLocaleString("en-IN")}
            <input
              type="range"
              min="3500"
              max="12000"
              step="500"
              value={answers.budget}
              onChange={(event) =>
                setAnswers({ ...answers, budget: Number(event.target.value) })
              }
              className="accent-[#7c241e]"
            />
          </label>

          <button
            type="button"
            onClick={() => setResults(recommendWines(answers))}
            className="h-13 rounded-[18px] bg-[#7c241e] text-[9px] uppercase tracking-[.14em] text-white"
          >
            Find my wines ↗
          </button>
        </div>
      </div>

      <div>
        {results.length ? (
          <div className="grid gap-3">
            {results.map((wine, index) => (
              <SommelierResultCard
                key={wine.slug}
                wine={wine}
                rank={index + 1}
              />
            ))}
          </div>
        ) : (
          <div className="grid min-h-[420px] place-items-center rounded-[28px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-8 text-center">
            <div>
              <p className="text-4xl">🍷</p>
              <h3 className="lx-serif mt-3 text-4xl">Your match awaits.</h3>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[#75645d]">
                Answer a few questions and the demo sommelier will rank three cellar options.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

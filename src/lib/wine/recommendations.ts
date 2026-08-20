import { wines } from "./data";
import type { SommelierAnswers, Wine } from "./types";

function scoreWine(wine: Wine, answers: SommelierAnswers) {
  let score = 0;

  if (answers.colour !== "Any") {
    if (answers.colour === "Red" && wine.type === "Red") score += 4;
    if (answers.colour === "White" && ["White", "Sparkling", "Rosé"].includes(wine.type)) score += 4;
  }

  if (answers.body !== "Any" && wine.body === answers.body) score += 3;
  if (wine.priceBottle <= answers.budget) score += 3;
  else score -= 3;

  if (answers.mood === "Fresh" && wine.acidity >= 4) score += 3;
  if (answers.mood === "Elegant" && wine.body !== "Full") score += 2;
  if (answers.mood === "Bold" && wine.body === "Full") score += 3;
  if (answers.mood === "Celebration" && wine.type === "Sparkling") score += 5;

  const dishMap: Record<SommelierAnswers["dish"], string[]> = {
    Seafood: ["charred-scallop", "river-trout", "line-caught-seabass"],
    Vegetarian: ["ember-cauliflower", "green-garden", "pumpkin-ravioli"],
    Duck: ["ember-duck"],
    Lamb: ["lamb-saddle", "short-rib"],
    Dessert: ["burnt-honey", "dark-chocolate", "mango-saffron"],
    Any: [],
  };

  if (answers.dish !== "Any" && wine.pairWith.some((slug) => dishMap[answers.dish].includes(slug))) {
    score += 5;
  }

  if (wine.sommelierChoice) score += 1;

  return score;
}

export function recommendWines(answers: SommelierAnswers) {
  return wines
    .map((wine) => ({ wine, score: scoreWine(wine, answers) }))
    .sort((a, b) => b.score - a.score || a.wine.priceBottle - b.wine.priceBottle)
    .slice(0, 3)
    .map((item) => item.wine);
}

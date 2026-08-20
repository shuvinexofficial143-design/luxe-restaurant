import type { Intent } from "./types";
export function detectIntent(text:string):Intent {
  const v=text.toLowerCase();
  if(/allergy|allergen|vegan|vegetarian|gluten|nut|एलर्जी|वेज|वीगन/.test(v)) return "DIETARY";
  if(/menu|dish|food|starter|main|dessert|खाना|मेन्यू|डिश/.test(v)) return "MENU";
  if(/book|reservation|table|seat|date|time|बुक|टेबल/.test(v)) return "BOOKING";
  if(/wine|sommelier|pairing|वाइन/.test(v)) return "WINE";
  if(/event|workshop|brunch|इवेंट/.test(v)) return "EVENTS";
  if(/private|party|celebration|hall|room|प्राइवेट|पार्टी/.test(v)) return "PRIVATE";
  if(/order|pickup|cart|checkout|ऑर्डर/.test(v)) return "ORDER";
  return "GENERAL";
}

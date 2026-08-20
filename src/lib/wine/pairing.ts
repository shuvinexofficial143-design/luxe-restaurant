import { wines } from "./data";

export function winesForDish(dishSlug: string) {
  return wines.filter((wine) => wine.pairWith.includes(dishSlug));
}

export function pairingReason(wineSlug: string, dishSlug: string) {
  const wine = wines.find((item) => item.slug === wineSlug);
  if (!wine) return "A balanced sommelier-style pairing.";

  if (dishSlug.includes("duck")) {
    return `${wine.body} body and ${wine.notes[0]} notes complement the richness of duck.`;
  }

  if (dishSlug.includes("scallop") || dishSlug.includes("seabass") || dishSlug.includes("trout")) {
    return `Bright acidity and ${wine.notes[0]} keep seafood flavours precise and fresh.`;
  }

  if (dishSlug.includes("lamb") || dishSlug.includes("rib")) {
    return `${wine.body} structure and savoury notes stand up to fire-cooked meat.`;
  }

  if (dishSlug.includes("chocolate") || dishSlug.includes("honey") || dishSlug.includes("mango")) {
    return `${wine.sweetness} style and layered fruit make this a natural dessert pairing.`;
  }

  return `${wine.notes.slice(0, 2).join(" and ")} echo the dish while keeping the finish balanced.`;
}

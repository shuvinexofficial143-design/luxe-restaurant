export function reviewShareText(title: string, rating: number) {
  return `I rated my LUXE experience ${rating}/5 — ${title}`;
}

export function shareUrl(path = "/reviews") {
  if (typeof window === "undefined") return path;
  return `${window.location.origin}${path}`;
}

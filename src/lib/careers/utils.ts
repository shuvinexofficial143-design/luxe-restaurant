export function createApplicationId() {
  return `APP-${Date.now().toString(36).toUpperCase().slice(-7)}`;
}

export function applicationStatusText(
  status: "RECEIVED" | "REVIEW" | "INTERVIEW" | "OFFER" | "CLOSED"
) {
  if (status === "RECEIVED") return "Application received";
  if (status === "REVIEW") return "Under review";
  if (status === "INTERVIEW") return "Interview stage";
  if (status === "OFFER") return "Offer stage";
  return "Application closed";
}

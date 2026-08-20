const policies = [
  ["Arrival", "Please arrive within 15 minutes of your reservation time so the full service can run comfortably."],
  ["Large parties", "Groups of 6 or more may require a deposit and may be offered a set menu."],
  ["Chef Table", "Chef Table requests require a higher demo deposit because seats are limited."],
  ["Allergies", "Share allergies in the notes field. Serious allergies must be confirmed directly with the restaurant."],
  ["Cancellation", "Production cancellation windows and fees should be configured before launch."],
  ["Children", "Children are welcome in the main dining room. Chef Table seating is best suited to older guests."],
];

export default function ReservationPolicies() {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {policies.map(([title, text]) => (
        <article key={title} className="rounded-[22px] border border-[#4a3025]/10 bg-[#fffaf4] p-5">
          <h3 className="lx-serif text-2xl">{title}</h3>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{text}</p>
        </article>
      ))}
    </div>
  );
}

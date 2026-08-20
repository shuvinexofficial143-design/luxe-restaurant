const highlights = [
  ["Food", "Seasonal tasting menus and chef-choice dishes"],
  ["Service", "Personal occasions and calmer pacing"],
  ["Wine", "Easy-to-understand pairing guidance"],
  ["Private Dining", "Rooms, packages and event flow"],
];

export default function ReviewHighlights() {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {highlights.map(([title, text]) => (
        <div key={title} className="rounded-[20px] bg-[#fffaf4] p-4">
          <p className="lx-serif text-2xl">{title}</p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}

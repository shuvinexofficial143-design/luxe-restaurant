
export default function MenuTile({
  title,
  note,
  price,
  image,
}: {
  title: string;
  note: string;
  price: string;
  image: string;
}) {
  return (
    <article className="flex items-center gap-3 rounded-[17px] border border-[#e7c58f]/10 bg-white/[.025] p-3">
      <div
        className="h-14 w-14 shrink-0 rounded-full bg-cover bg-center ring-1 ring-[#e7c58f]/18"
        style={{ backgroundImage: `url("${image}")` }}
      />
      <div className="min-w-0 flex-1">
        <p className="lx-serif truncate text-base text-[#f1e4d2]">{title}</p>
        <p className="mt-1 truncate text-[8px] text-white/34">{note}</p>
      </div>
      <span className="lx-serif text-lg text-[#c9944b]">{price}</span>
    </article>
  );
}

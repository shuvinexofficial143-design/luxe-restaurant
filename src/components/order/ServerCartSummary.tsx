type CartLine = {
  item: {
    slug: string;
    title: string;
    price: number;
  };
  quantity: number;
};

export default function ServerCartSummary({
  lines,
  onQuantity,
}: {
  lines: CartLine[];
  onQuantity: (slug: string, quantity: number) => void;
}) {
  const estimate = lines.reduce(
    (sum, line) => sum + line.item.price * line.quantity,
    0
  );

  return (
    <div className="rounded-[20px] border border-white/10 bg-[#11100d] p-3 text-[#f4eadc]">
      <div className="flex items-center justify-between">
        <p className="text-[7px] uppercase tracking-[.14em] text-[#d49c4b]">
          Your items
        </p>
        <p className="text-[8px] text-white/34">
          {lines.reduce((sum, line) => sum + line.quantity, 0)} item(s)
        </p>
      </div>

      <div className="mt-3 space-y-2">
        {lines.map((line) => (
          <div
            key={line.item.slug}
            className="rounded-[14px] border border-white/8 bg-white/[.035] p-3"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="lx-serif truncate text-base text-[#f1e3d0]">
                  {line.item.title}
                </p>
                <p className="mt-1 text-[9px] text-[#62c9ff]">
                  ₹{line.item.price.toLocaleString("en-IN")} each
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-2 rounded-full border border-white/10 bg-black/25 p-1">
                <button
                  type="button"
                  aria-label={`Decrease ${line.item.title}`}
                  onClick={() =>
                    onQuantity(line.item.slug, line.quantity - 1)
                  }
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#ff6f91]/16 text-[#ff88a5]"
                >
                  −
                </button>
                <span className="min-w-5 text-center text-xs font-semibold text-white">
                  {line.quantity}
                </span>
                <button
                  type="button"
                  aria-label={`Increase ${line.item.title}`}
                  onClick={() =>
                    onQuantity(line.item.slug, line.quantity + 1)
                  }
                  className="grid h-8 w-8 place-items-center rounded-full bg-[#39c58f]/18 text-[#55daa4]"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        {!lines.length ? (
          <div className="rounded-[14px] border border-dashed border-white/10 p-4 text-center">
            <p className="text-xs text-white/42">Choose a dish above to start.</p>
          </div>
        ) : null}
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
        <span className="text-[8px] uppercase tracking-[.12em] text-white/38">
          Estimated total
        </span>
        <span className="lx-serif text-2xl text-[#e5b35f]">
          ₹{estimate.toLocaleString("en-IN")}
        </span>
      </div>

      <p className="mt-2 text-[7px] leading-4 text-white/24">
        Final server total is recalculated when the live database is connected.
      </p>
    </div>
  );
}

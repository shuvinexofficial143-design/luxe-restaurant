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
    <div className="rounded-[22px] bg-white p-4">
      <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
        Cart estimate
      </p>

      <div className="mt-3 space-y-2">
        {lines.map((line) => (
          <div
            key={line.item.slug}
            className="rounded-[14px] bg-[#f7f1e8] p-3"
          >
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="lx-serif text-lg">{line.item.title}</p>
                <p className="mt-1 text-[9px] text-[#75645d]">
                  ₹{line.item.price.toLocaleString("en-IN")} each
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    onQuantity(line.item.slug, line.quantity - 1)
                  }
                  className="grid h-8 w-8 place-items-center rounded-full bg-white"
                >
                  −
                </button>
                <span className="text-xs">{line.quantity}</span>
                <button
                  type="button"
                  onClick={() =>
                    onQuantity(line.item.slug, line.quantity + 1)
                  }
                  className="grid h-8 w-8 place-items-center rounded-full bg-white"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}

        {!lines.length ? (
          <p className="text-xs text-[#75645d]">Your cart is empty.</p>
        ) : null}
      </div>

      <div className="mt-4 flex items-center justify-between border-t border-[#4a3025]/10 pt-4">
        <span className="text-[9px] uppercase tracking-[.1em] text-[#75645d]">
          Browser estimate
        </span>
        <span className="lx-serif text-2xl">
          ₹{estimate.toLocaleString("en-IN")}
        </span>
      </div>

      <p className="mt-2 text-[8px] leading-4 text-[#8a756b]">
        Final prices and service charge are recalculated inside PostgreSQL.
      </p>
    </div>
  );
}

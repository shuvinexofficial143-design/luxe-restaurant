export default function ChannelMixCard({
  tableOrders,
  pickupOrders,
}: {
  tableOrders: number;
  pickupOrders: number;
}) {
  const total = tableOrders + pickupOrders;
  const tablePercent = total ? (tableOrders / total) * 100 : 0;

  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">Order channel mix</p>
      <div className="mt-4 h-4 overflow-hidden rounded-full bg-[#eadfd4]">
        <div
          className="h-full bg-[#335f50]"
          style={{ width: `${tablePercent}%` }}
        />
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        <div className="rounded-[14px] bg-white p-3">
          <p className="lx-serif text-2xl text-[#335f50]">
            {tableOrders}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.08em] text-[#75645d]">
            table
          </p>
        </div>
        <div className="rounded-[14px] bg-white p-3">
          <p className="lx-serif text-2xl text-[#7c241e]">
            {pickupOrders}
          </p>
          <p className="mt-1 text-[8px] uppercase tracking-[.08em] text-[#75645d]">
            pickup
          </p>
        </div>
      </div>
    </div>
  );
}

export default function DatabaseSchemaCard() {
  const tables = [
    ["admin_users", "Staff identities + password hashes"],
    ["admin_sessions", "Revocable server sessions"],
    ["reservations", "Guest table bookings"],
    ["orders", "Pickup/table order headers"],
    ["order_items", "Order line items"],
    ["cms_content", "Published/draft CMS records"],
    ["audit_logs", "Security and admin audit trail"],
  ];

  return (
    <div className="rounded-[26px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.14em] text-[#efc99a]">
        PostgreSQL schema
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Core tables prepared.</h2>

      <div className="mt-5 space-y-2">
        {tables.map(([name, text]) => (
          <div key={name} className="rounded-[15px] bg-white/[.07] p-3">
            <p className="text-sm">{name}</p>
            <p className="mt-1 text-[9px] leading-5 text-white/45">{text}</p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-[9px] leading-5 text-white/40">
        Schema files are ready under /database, but no migration has been
        applied to a real database in this batch.
      </p>
    </div>
  );
}

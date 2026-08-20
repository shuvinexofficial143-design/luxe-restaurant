const endpoints = [
  ["GET", "/api/v1/health", "Backend/environment health"],
  ["GET/POST", "/api/v1/reservations", "Reservation repository API"],
  ["GET", "/api/v1/orders", "Open-order repository API"],
  ["GET", "/api/v1/cms?collection=menu", "Published CMS content API"],
  ["GET", "/api/v1/admin/audit", "Admin audit repository API"],
];

export default function ApiEndpointGrid() {
  return (
    <div className="grid gap-2 md:grid-cols-2">
      {endpoints.map(([method, path, text]) => (
        <div key={path} className="rounded-[20px] bg-[#fffaf4] p-4">
          <div className="flex items-start justify-between gap-3">
            <p className="lx-serif text-xl">{path}</p>
            <span className="rounded-full bg-[#335f50]/10 px-3 py-2 text-[8px] uppercase tracking-[.09em] text-[#335f50]">
              {method}
            </span>
          </div>
          <p className="mt-2 text-[10px] leading-5 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}

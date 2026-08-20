export default function HealthCheckTable() {
  const rows = [
    [
      "/api/health/live",
      "Public liveness check",
      "Does not expose provider/database details.",
    ],
    [
      "/api/health/deep",
      "Authenticated deep health",
      "Checks configuration and database responsiveness.",
    ],
    [
      "/api/v1/jobs/health",
      "Async operations health",
      "Shows queue/webhook/notification counters.",
    ],
  ];

  return (
    <div className="rounded-[24px] bg-[#201713] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc28b]">
        Health endpoints
      </p>

      <div className="mt-4 space-y-2">
        {rows.map(
          ([
            path,
            title,
            text,
          ]) => (
            <div
              key={path}
              className="rounded-[15px] bg-white/[.06] p-3"
            >
              <p className="font-mono text-[9px] text-[#efc28b]">
                {
                  path
                }
              </p>
              <p className="mt-2 text-xs">
                {
                  title
                }
              </p>
              <p className="mt-1 text-[9px] leading-5 text-white/40">
                {
                  text
                }
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

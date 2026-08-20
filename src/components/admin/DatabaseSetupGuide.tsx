export default function DatabaseSetupGuide() {
  const steps = [
    [
      "01",
      "Create Supabase project",
      "Use an empty PostgreSQL project for LUXE.",
    ],
    [
      "02",
      "Run migration",
      "Paste database/migrations/002_supabase_core.sql into Supabase SQL Editor and run it.",
    ],
    [
      "03",
      "Add server credentials",
      "Set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.local.",
    ],
    [
      "04",
      "Restart Next.js",
      "Environment variables are loaded when the dev/build process starts.",
    ],
    [
      "05",
      "Check Database page",
      "Credentials, connection and schema should all show Yes.",
    ],
    [
      "06",
      "Migrate browser data",
      "Use the migration assistant only after the connection is green.",
    ],
  ];

  return (
    <div className="grid gap-2 md:grid-cols-2">
      {steps.map(([number, title, text]) => (
        <div key={number} className="rounded-[20px] bg-[#fffaf4] p-4">
          <p className="text-[9px] text-[#7c241e]">{number}</p>
          <p className="lx-serif mt-2 text-2xl">{title}</p>
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{text}</p>
        </div>
      ))}
    </div>
  );
}

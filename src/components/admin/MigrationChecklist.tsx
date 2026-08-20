import {
  expectedLatestMigration,
  expectedMigrationFiles,
} from "@/lib/deployment/migrations";

export default function MigrationChecklist() {
  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">
        Database migration sequence
      </p>
      <p className="mt-2 text-[9px] leading-5 text-[#75645d]">
        Expected latest database version:{" "}
        <strong>
          {expectedLatestMigration}
        </strong>
      </p>

      <div className="mt-4 grid gap-2 sm:grid-cols-2">
        {expectedMigrationFiles.map(
          (name, index) => (
            <div
              key={name}
              className="rounded-[14px] bg-white p-3"
            >
              <span className="text-[8px] text-[#7c241e]">
                {String(
                  index + 1
                ).padStart(2, "0")}
              </span>
              <p className="mt-1 font-mono text-[9px]">
                {name}
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
}

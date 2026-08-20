import LuxeShell from "@/components/luxe/LuxeShell";
import DataExportButton from "@/components/account/DataExportButton";
import DeleteAccountRequest from "@/components/account/DeleteAccountRequest";

export const metadata = {
  title: "Privacy & Data · LUXE",
};

export default function PrivacyPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[980px]">
          <div className="rounded-[30px] bg-[#fffaf4] p-6">
            <p className="text-[9px] uppercase tracking-[.14em] text-[#7c241e]">
              Privacy & data
            </p>
            <h1 className="lx-serif mt-2 text-5xl">
              Access your data and request changes.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-[#75645d]">
              Self-service export is immediate when the database is available.
              Deletion is recorded for review rather than falsely claiming that
              every historical record was instantly removed.
            </p>
          </div>

          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DataExportButton />
            <DeleteAccountRequest />
          </div>
        </div>
      </section>
    </LuxeShell>
  );
}

export default function AccountDatabaseNotice() {
  return (
    <div className="rounded-[22px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc99a]">
        Database account
      </p>
      <h2 className="lx-serif mt-2 text-3xl">Preferences now travel with you.</h2>
      <p className="mt-3 text-xs leading-6 text-white/55">
        Profile preferences, special dates, saved dishes and loyalty records
        are stored against the authenticated customer identity instead of only
        this browser.
      </p>
    </div>
  );
}

export default function Loading() {
  return (
    <main className="grid min-h-screen place-items-center bg-[#170c09] px-5 text-white">
      <div className="text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border border-white/15 border-t-[#efb36c]" />
        <p className="lx-serif mt-7 text-4xl tracking-[.18em]">LUXE</p>
        <p className="mt-4 text-[9px] uppercase tracking-[.3em] text-white/36">
          Preparing the room
        </p>
      </div>
    </main>
  );
}

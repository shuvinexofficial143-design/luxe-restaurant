export default function GalleryEmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-[#7c241e]/20 bg-[#fffaf4] p-10 text-center">
      <p className="text-4xl">◫</p>
      <h3 className="lx-serif mt-3 text-3xl">No moments found.</h3>
      <p className="mt-2 text-sm text-[#75645d]">
        Try another category or search term.
      </p>
    </div>
  );
}

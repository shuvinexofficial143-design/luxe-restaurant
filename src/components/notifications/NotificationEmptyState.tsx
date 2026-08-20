export default function NotificationEmptyState() {
  return (
    <div className="rounded-[28px] border border-dashed border-[#4a3025]/15 bg-[#fffaf4] p-10 text-center">
      <p className="text-4xl">♢</p>
      <h3 className="lx-serif mt-3 text-3xl">Nothing here.</h3>
      <p className="mt-2 text-sm text-[#75645d]">
        Try another notification category.
      </p>
    </div>
  );
}

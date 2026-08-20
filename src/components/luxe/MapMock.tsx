export default function MapMock() {
  return (
    <div className="relative min-h-[520px] overflow-hidden bg-[#d8c5ad]">
      <div className="absolute inset-0 bg-[linear-gradient(25deg,transparent_48%,rgba(54,89,76,.13)_49%,rgba(54,89,76,.13)_51%,transparent_52%),linear-gradient(115deg,transparent_43%,rgba(92,56,39,.12)_44%,rgba(92,56,39,.12)_46%,transparent_47%)] bg-[length:180px_180px,240px_240px]" />
      <div className="absolute left-[12%] top-[18%] h-[64%] w-[72%] rounded-[42%_58%_47%_53%/55%_36%_64%_45%] border border-[#6b231d]/15" />
      <div className="absolute left-[48%] top-[46%] -translate-x-1/2 -translate-y-1/2">
        <div className="grid h-16 w-16 place-items-center rounded-full bg-[#6b231d] text-white shadow-[0_20px_50px_rgba(78,33,24,.28)]">
          L
        </div>
        <div className="mx-auto h-8 w-px bg-[#6b231d]" />
      </div>
      <div className="absolute bottom-6 left-6 max-w-xs bg-[#fff8ed]/94 p-5 backdrop-blur">
        <p className="text-[9px] uppercase tracking-[.24em] text-[#8d3a25]">LUXE</p>
        <p className="lx-serif mt-2 text-2xl">18 Ember House</p>
        <p className="mt-2 text-sm leading-6 text-[#625048]">
          River Quarter, Ujjain · demo location block
        </p>
      </div>
    </div>
  );
}

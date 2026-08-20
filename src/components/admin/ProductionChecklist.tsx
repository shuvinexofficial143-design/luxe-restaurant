import {
  productionChecklist,
} from "@/lib/deployment/checklist";

export default function ProductionChecklist() {
  return (
    <div className="rounded-[24px] bg-[#fffaf4] p-5">
      <p className="lx-kicker">
        Launch checklist
      </p>

      <div className="mt-4 space-y-2">
        {productionChecklist.map(
          (item, index) => (
            <div
              key={`${item.group}-${item.item}`}
              className="grid grid-cols-[34px_1fr] gap-3 rounded-[14px] bg-white p-3"
            >
              <div className="grid h-8 w-8 place-items-center rounded-full bg-[#201713] text-[8px] text-[#efc28b]">
                {index + 1}
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[.1em] text-[#7c241e]">
                  {item.group}
                </p>
                <p className="mt-1 text-[10px] leading-5 text-[#5f514b]">
                  {item.item}
                </p>
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
}

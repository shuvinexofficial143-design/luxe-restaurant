import {
  productionCriticalRoutes,
} from "@/lib/deployment/routes";

export default function RouteCoverage() {
  return (
    <div className="rounded-[24px] bg-[#335f50] p-5 text-white">
      <p className="text-[9px] uppercase tracking-[.13em] text-[#efc99a]">
        Critical route map
      </p>
      <div className="mt-4 space-y-2">
        {productionCriticalRoutes.map(
          (route) => (
            <div
              key={route.path}
              className="flex items-center justify-between rounded-[14px] bg-white/[.07] p-3"
            >
              <div>
                <p className="text-xs">
                  {route.label}
                </p>
                <p className="mt-1 font-mono text-[8px] text-white/40">
                  {route.path}
                </p>
              </div>
              <span className="text-[8px] uppercase text-[#efc99a]">
                {route.public
                  ? "PUBLIC"
                  : "AUTH"}
              </span>
            </div>
          )
        )}
      </div>
    </div>
  );
}

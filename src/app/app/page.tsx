import LuxeShell from "@/components/luxe/LuxeShell";
import PWAStatusCard from "@/components/pwa/PWAStatusCard";
import AppHomeGrid from "@/components/pwa/AppHomeGrid";

export const metadata = { title: "LUXE App" };

export default function LUXEAppPage() {
  return (
    <LuxeShell>
      <section className="px-3 pt-[100px] md:px-5 md:pt-[120px]">
        <div className="mx-auto max-w-[1000px]">
          <div className="overflow-hidden rounded-[30px] bg-[#201713] p-6 text-white md:p-8">
            <p className="text-[9px] uppercase tracking-[.16em] text-[#efc28b]">
              Progressive web app
            </p>
            <h1 className="lx-serif mt-2 text-5xl md:text-7xl">
              LUXE, app-like.
            </h1>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-white/55">
              Install the restaurant experience, keep core routes available through
              an offline service-worker foundation and jump into QR-powered dining.
            </p>
          </div>

          <div className="mt-5">
            <PWAStatusCard />
          </div>

          <div className="mt-6">
            <p className="lx-kicker">Quick launch</p>
            <h2 className="lx-serif mt-2 text-4xl">Everything one tap away.</h2>
            <div className="mt-4">
              <AppHomeGrid />
            </div>
          </div>

          <p className="mt-6 rounded-[18px] bg-[#fff4de] p-4 text-[9px] leading-5 text-[#75645d]">
            Install prompts normally require HTTPS and a supported browser. Localhost
            usually works for development; production should be tested on the final domain.
          </p>
        </div>
      </section>
    </LuxeShell>
  );
}

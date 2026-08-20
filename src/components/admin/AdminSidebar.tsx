"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminNav, demoAdminNotes } from "@/lib/admin/data";

export default function AdminSidebar({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const pathname = usePathname();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close admin menu"
          onClick={onClose}
          className="fixed inset-0 z-[190] bg-black/40 lg:hidden"
        />
      ) : null}

      <aside
        className={`fixed inset-y-0 left-0 z-[200] w-[270px] overflow-y-auto bg-[#201713] p-4 text-white transition-transform lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="rounded-[24px] bg-white/[.06] p-5">
          <p className="text-[8px] uppercase tracking-[.18em] text-[#efc28b]">
            LUXE
          </p>
          <p className="lx-serif mt-2 text-3xl">Admin.</p>
          <p className="mt-2 text-[10px] leading-5 text-white/45">
            Browser-local operations dashboard.
          </p>
        </div>

        <nav className="mt-4 space-y-1">
          {adminNav.map((item) => {
            const active =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href);

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={`flex min-h-12 items-center gap-3 rounded-[16px] px-4 text-sm ${
                  active
                    ? "bg-[#7c241e] text-white"
                    : "text-white/55 hover:bg-white/[.06] hover:text-white"
                }`}
              >
                <span className="w-5 text-center">{item.icon}</span>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-5 rounded-[20px] bg-[#fff4de] p-4 text-[#59463f]">
          <p className="text-[8px] uppercase tracking-[.12em] text-[#7c241e]">
            Demo admin
          </p>
          <p className="mt-2 text-[9px] leading-5">{demoAdminNotes[1]}</p>
        </div>

        <Link
          href="/"
          className="mt-4 flex min-h-11 items-center justify-center rounded-[15px] border border-white/10 text-[8px] uppercase tracking-[.12em] text-white/55"
        >
          ← Restaurant site
        </Link>
      </aside>
    </>
  );
}

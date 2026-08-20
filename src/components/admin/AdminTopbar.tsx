"use client";

import SessionStatus from "@/components/auth/SessionStatus";
import LogoutButton from "@/components/auth/LogoutButton";

export default function AdminTopbar({
  title,
  eyebrow,
  onMenu,
}: {
  title: string;
  eyebrow: string;
  onMenu: () => void;
}) {
  return (
    <header className="sticky top-0 z-[80] border-b border-[#4a3025]/8 bg-[#eee6dc]/92 px-3 py-3 backdrop-blur-xl md:px-5">
      <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-3">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onMenu}
            className="grid h-11 w-11 shrink-0 place-items-center rounded-[15px] bg-[#201713] text-white lg:hidden"
            aria-label="Open admin menu"
          >
            ☰
          </button>

          <div className="min-w-0">
            <p className="truncate text-[8px] uppercase tracking-[.14em] text-[#7c241e]">
              {eyebrow}
            </p>
            <h1 className="lx-serif truncate text-2xl md:text-3xl">{title}</h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <SessionStatus />
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}

"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import AdminSidebar from "./AdminSidebar";
import AdminTopbar from "./AdminTopbar";

export default function AdminShellClient({
  title,
  eyebrow = "LUXE Control Room",
  children,
}: {
  title: string;
  eyebrow?: string;
  children: ReactNode;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#eee6dc] text-[#201713]">
      <AdminSidebar open={menuOpen} onClose={() => setMenuOpen(false)} />

      <div className="lg:pl-[270px]">
        <AdminTopbar
          title={title}
          eyebrow={eyebrow}
          onMenu={() => setMenuOpen(true)}
        />
        <div className="px-3 pb-10 pt-4 md:px-5">{children}</div>

        <div className="px-3 pb-8 md:px-5">
          <div className="mx-auto max-w-[1320px] rounded-[16px] border border-[#4a3025]/8 bg-white/55 p-3 text-[10px] uppercase tracking-[.1em] text-[#8a756b]">
            Secure restaurant operations · authenticated admin access
          </div>
        </div>
      </div>
    </main>
  );
}

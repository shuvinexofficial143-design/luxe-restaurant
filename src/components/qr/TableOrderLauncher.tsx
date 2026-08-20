"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { tableOptions } from "@/lib/qr/data";
import TableQRSelector from "./TableQRSelector";
import QRCodeCard from "./QRCodeCard";
import { qrHistoryStorage } from "@/lib/qr/storage";
import { absoluteAppUrl } from "@/lib/qr/utils";

export default function TableOrderLauncher() {
  const [tableId, setTableId] = useState(tableOptions[0].id);

  const path = useMemo(
    () => `/order?table=${encodeURIComponent(tableId)}`,
    [tableId]
  );

  function remember() {
    qrHistoryStorage.add(
      "TABLE",
      `Table ordering · ${tableId}`,
      absoluteAppUrl(path)
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_390px]">
      <div className="rounded-[28px] bg-[#fffaf4] p-5">
        <p className="lx-kicker">Table-side ordering</p>
        <h1 className="lx-serif mt-2 text-4xl">One QR per table.</h1>
        <p className="mt-3 text-sm leading-7 text-[#75645d]">
          Select a table to generate a scannable order link with the table ID attached.
        </p>

        <div className="mt-5">
          <TableQRSelector value={tableId} onChange={setTableId} />
        </div>

        <div className="mt-5 grid grid-cols-2 gap-2">
          <Link
            href={path}
            className="flex min-h-12 items-center justify-center rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
          >
            Open order
          </Link>
          <button
            type="button"
            onClick={remember}
            className="rounded-[16px] border border-[#4a3025]/10 bg-white text-[9px] uppercase tracking-[.12em]"
          >
            Save QR history
          </button>
        </div>

        <p className="mt-4 rounded-[16px] bg-[#fff4de] p-3 text-[9px] leading-5 text-[#75645d]">
          Production table ordering should validate the table token server-side so guests cannot spoof another table.
        </p>
      </div>

      <QRCodeCard
        title={`Table ${tableId}`}
        path={path}
        subtitle="Scan to open the ordering flow with this demo table ID."
      />
    </div>
  );
}

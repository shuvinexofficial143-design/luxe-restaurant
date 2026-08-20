"use client";

import { useMemo, useState } from "react";
import type { QRShareType } from "@/lib/qr/types";
import { absoluteAppUrl, qrTypeLabel, sharePath } from "@/lib/qr/utils";
import { qrHistoryStorage } from "@/lib/qr/storage";
import ShareTypeTabs from "./ShareTypeTabs";
import QRCodeCard from "./QRCodeCard";

export default function ShareQRBuilder() {
  const [type, setType] = useState<QRShareType>("MENU");
  const [value, setValue] = useState("");

  const path = useMemo(() => sharePath(type, value), [type, value]);

  const placeholder =
    type === "RESERVATION"
      ? "Reservation reference"
      : type === "EVENT"
        ? "Event slug"
        : type === "GIFT"
          ? "Gift code"
          : type === "CUSTOM"
            ? "/your-custom-path or full URL"
            : "No extra value needed";

  function save() {
    qrHistoryStorage.add(
      type,
      `${qrTypeLabel(type)} QR`,
      absoluteAppUrl(path)
    );
  }

  return (
    <div className="grid gap-4 lg:grid-cols-[1fr_390px]">
      <div className="rounded-[28px] bg-[#fffaf4] p-5">
        <p className="lx-kicker">Shareable QR</p>
        <h2 className="lx-serif mt-2 text-4xl">Turn any LUXE flow into a scan.</h2>

        <div className="mt-5">
          <ShareTypeTabs value={type} onChange={(next) => {
            setType(next);
            setValue("");
          }} />
        </div>

        {type !== "MENU" ? (
          <input
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder={placeholder}
            className="mt-4 h-12 w-full rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm"
          />
        ) : null}

        <div className="mt-4 rounded-[18px] bg-[#f3e7dc] p-4">
          <p className="text-[8px] uppercase tracking-[.1em] text-[#75645d]">
            Generated path
          </p>
          <p className="mt-2 break-all text-xs">{path}</p>
        </div>

        <button
          type="button"
          onClick={save}
          className="mt-4 h-12 w-full rounded-[16px] bg-[#7c241e] text-[9px] uppercase tracking-[.12em] text-white"
        >
          Save to QR history
        </button>
      </div>

      <QRCodeCard
        title={`${qrTypeLabel(type)} QR`}
        path={path}
        subtitle="Scan from another device to open this LUXE route."
      />
    </div>
  );
}

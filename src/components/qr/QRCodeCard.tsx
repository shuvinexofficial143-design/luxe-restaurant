"use client";

import { useEffect, useMemo, useState } from "react";
import { absoluteAppUrl, qrImageUrl } from "@/lib/qr/utils";
import ShareNativeButton from "./ShareNativeButton";
import QRInfoNotice from "./QRInfoNotice";

export default function QRCodeCard({
  title,
  path,
  subtitle,
}: {
  title: string;
  path: string;
  subtitle?: string;
}) {
  const [originReady, setOriginReady] = useState(false);

  useEffect(() => {
    const originCheck = window.setTimeout(() => {
      setOriginReady(true);
    }, 0);

    return () => window.clearTimeout(originCheck);
  }, []);

  const absolute = useMemo(
    () => (originReady ? absoluteAppUrl(path) : path),
    [originReady, path]
  );

  const image = qrImageUrl(absolute);

  return (
    <div className="rounded-[28px] bg-[#fffaf4] p-5">
      <div className="text-center">
        <p className="lx-kicker">Scan with camera</p>
        <h2 className="lx-serif mt-2 text-3xl">{title}</h2>
        {subtitle ? (
          <p className="mt-2 text-xs leading-6 text-[#75645d]">{subtitle}</p>
        ) : null}
      </div>

      <div className="mx-auto mt-5 aspect-square w-full max-w-[360px] overflow-hidden rounded-[24px] border-[12px] border-white bg-white shadow-sm">
        <div
          className="h-full w-full bg-contain bg-center bg-no-repeat"
          style={{ backgroundImage: `url("${image}")` }}
          aria-label={`QR code for ${absolute}`}
        />
      </div>

      <p className="mt-4 break-all text-center text-[9px] leading-5 text-[#8a756b]">
        {absolute}
      </p>

      <div className="mt-4">
        <ShareNativeButton title={title} url={absolute} />
      </div>

      <div className="mt-3">
        <QRInfoNotice />
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function ConnectionBadge() {
  const [online, setOnline] = useState(true);
  const [show, setShow] = useState(false);

  useEffect(() => {
    let hideTimer = 0;

    const applyInitialStatus = window.setTimeout(() => {
      const next = navigator.onLine;
      setOnline(next);
      setShow(!next);
    }, 0);

    const update = () => {
      const next = navigator.onLine;
      setOnline(next);
      setShow(!next);

      window.clearTimeout(hideTimer);

      if (next) {
        hideTimer = window.setTimeout(() => {
          setShow(false);
        }, 1600);
      }
    };

    window.addEventListener("online", update);
    window.addEventListener("offline", update);

    return () => {
      window.clearTimeout(applyInitialStatus);
      window.clearTimeout(hideTimer);
      window.removeEventListener("online", update);
      window.removeEventListener("offline", update);
    };
  }, []);

  if (!show) return null;

  return (
    <div
      role="status"
      className={`fixed left-1/2 top-3 z-[150] -translate-x-1/2 rounded-full px-4 py-2 text-[8px] uppercase shadow-xl ${
        online ? "bg-[#335f50]" : "bg-[#7c241e]"
      } text-white`}
    >
      {online ? "Back online" : "You are offline"}
    </div>
  );
}

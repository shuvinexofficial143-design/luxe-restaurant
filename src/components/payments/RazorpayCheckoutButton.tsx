"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

declare global {
  interface Window {
    Razorpay?: new (
      options: Record<string, unknown>
    ) => {
      open: () => void;
    };
  }
}

async function loadRazorpayScript() {
  if (window.Razorpay) return true;

  return new Promise<boolean>((resolve) => {
    const existing =
      document.querySelector<HTMLScriptElement>(
        'script[data-luxe-razorpay="1"]'
      );

    if (existing) {
      existing.addEventListener(
        "load",
        () => resolve(true),
        { once: true }
      );
      existing.addEventListener(
        "error",
        () => resolve(false),
        { once: true }
      );
      return;
    }

    const script =
      document.createElement("script");
    script.src =
      "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    script.dataset.luxeRazorpay = "1";
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

export default function RazorpayCheckoutButton({
  entityType,
  entityId,
  label = "Pay securely",
}: {
  entityType: "ORDER" | "RESERVATION";
  entityId: string;
  label?: string;
}) {
  const router = useRouter();
  const [message, setMessage] =
    useState("");
  const [busy, setBusy] =
    useState(false);

  async function start() {
    if (busy) return;

    setBusy(true);
    setMessage("");

    try {
      const loaded =
        await loadRazorpayScript();

      if (!loaded || !window.Razorpay) {
        setMessage(
          "Razorpay checkout script could not be loaded."
        );
        return;
      }

      const response = await fetch(
        "/api/v1/payments/checkout",
        {
          method: "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify({
            entityType,
            entityId,
          }),
        }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: {
          paymentIntent?: {
            id: string;
            amount: number;
            currency: string;
            razorpay_order_id: string | null;
          };
          customer?: {
            customerName?: string | null;
            customerEmail?: string | null;
            customerPhone?: string | null;
          };
          razorpayKeyId?: string;
        };
        error?: {
          message?: string;
        };
      };

      if (
        !response.ok ||
        !payload.ok ||
        !payload.data?.paymentIntent
      ) {
        setMessage(
          payload.error?.message ||
            "Checkout could not start."
        );
        return;
      }

      const intent =
        payload.data.paymentIntent;
      const customer =
        payload.data.customer;

      const checkout = new window.Razorpay({
        key: payload.data.razorpayKeyId,
        amount: Math.round(
          Number(intent.amount) * 100
        ),
        currency: intent.currency,
        name: "LUXE Restaurant",
        description:
          entityType === "ORDER"
            ? "Food order payment"
            : "Reservation deposit",
        order_id:
          intent.razorpay_order_id,
        prefill: {
          name:
            customer?.customerName || "",
          email:
            customer?.customerEmail || "",
          contact:
            customer?.customerPhone || "",
        },
        theme: {
          color: "#7c241e",
        },
        handler: async (
          payment: Record<string, unknown>
        ) => {
          const confirmResponse =
            await fetch(
              "/api/v1/payments/confirm",
              {
                method: "POST",
                headers: {
                  "Content-Type":
                    "application/json",
                },
                body: JSON.stringify({
                  paymentIntentId:
                    intent.id,
                  razorpayOrderId:
                    payment.razorpay_order_id,
                  razorpayPaymentId:
                    payment.razorpay_payment_id,
                  razorpaySignature:
                    payment.razorpay_signature,
                }),
              }
            );

          const confirmed =
            (await confirmResponse.json()) as {
              ok?: boolean;
              data?: {
                receipt?: {
                  id?: string;
                };
              };
              error?: {
                message?: string;
              };
            };

          if (
            !confirmResponse.ok ||
            !confirmed.ok
          ) {
            setMessage(
              confirmed.error?.message ||
                "Payment verification failed."
            );
            return;
          }

          const receiptId =
            confirmed.data?.receipt?.id || "";

          router.push(
            `/payment/success?intent=${encodeURIComponent(
              intent.id
            )}&receipt=${encodeURIComponent(
              receiptId
            )}`
          );
          router.refresh();
        },
      });

      checkout.open();
    } catch {
      setMessage(
        "Payment checkout request failed."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <div>
      <button
        type="button"
        disabled={busy}
        onClick={() => void start()}
        className="h-12 w-full rounded-[16px] bg-[#7c241e] px-5 text-[9px] uppercase tracking-[.12em] text-white disabled:opacity-40"
      >
        {busy ? "Preparing…" : label}
      </button>

      {message ? (
        <p className="mt-3 text-[10px] leading-5 text-[#7c241e]">
          {message}
        </p>
      ) : null}
    </div>
  );
}

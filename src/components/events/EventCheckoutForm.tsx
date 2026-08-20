"use client";

import { FormEvent, useState } from "react";
import type { EventRecord } from "@/lib/events/types";
import { bookingTotal, maxTicketQuantity } from "@/lib/events/tickets";
import { createEventBookingId } from "@/lib/events/utils";
import { eventBookingStorage } from "@/lib/events/storage";
import EventSeatPicker from "./EventSeatPicker";
import EventConfirmation from "./EventConfirmation";

export default function EventCheckoutForm({
  event,
}: {
  event: EventRecord;
}) {
  const max = maxTicketQuantity(event);
  const [quantity, setQuantity] = useState(max > 0 ? 1 : 0);
  const [confirmationId, setConfirmationId] = useState("");

  function submit(formEvent: FormEvent<HTMLFormElement>) {
    formEvent.preventDefault();
    if (max === 0) return;

    const form = new FormData(formEvent.currentTarget);
    const id = createEventBookingId();
    const subtotal = bookingTotal(event, quantity);

    eventBookingStorage.save({
      id,
      eventSlug: event.slug,
      eventTitle: event.title,
      quantity,
      guestName: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      notes: String(form.get("notes") || ""),
      subtotal,
      total: subtotal,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
    });

    setConfirmationId(id);
  }

  if (confirmationId) {
    return <EventConfirmation id={confirmationId} />;
  }

  return (
    <form onSubmit={submit} className="space-y-5">
      <EventSeatPicker event={event} value={quantity} onChange={setQuantity} />

      {max > 0 ? (
        <>
          <div className="rounded-[22px] bg-[#201713] p-5 text-white">
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="text-[8px] uppercase tracking-[.12em] text-white/45">
                  {quantity} ticket{quantity > 1 ? "s" : ""}
                </p>
                <p className="lx-serif mt-1 text-3xl text-[#efc28b]">
                  ₹{bookingTotal(event, quantity).toLocaleString("en-IN")}
                </p>
              </div>
              <p className="text-[9px] text-white/45">Demo payment</p>
            </div>
          </div>

          <div className="rounded-[24px] bg-[#fffaf4] p-5">
            <p className="text-[9px] uppercase tracking-[.12em] text-[#7c241e]">
              Guest details
            </p>

            <div className="mt-4 grid gap-3">
              {[
                ["Name", "name", "text"],
                ["Email", "email", "email"],
                ["Phone", "phone", "tel"],
              ].map(([label, name, type]) => (
                <label
                  key={name}
                  className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]"
                >
                  {label}
                  <input
                    required
                    name={name}
                    type={type}
                    className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-4 text-sm normal-case tracking-normal"
                  />
                </label>
              ))}

              <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
                Notes
                <textarea
                  name="notes"
                  rows={3}
                  className="rounded-[16px] border border-[#4a3025]/10 bg-white p-4 text-sm normal-case tracking-normal"
                  placeholder="Dietary needs or accessibility..."
                />
              </label>
            </div>
          </div>

          <div className="rounded-[20px] bg-[#fff4de] p-4">
            <p className="text-[9px] uppercase tracking-[.12em] text-[#8a5a21]">
              Payment
            </p>
            <p className="mt-2 text-xs leading-6 text-[#75645d]">
              Ticket checkout is demo-only until a real payment gateway is connected.
            </p>
          </div>

          <button className="h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.14em] text-white">
            Confirm demo tickets ↗
          </button>
        </>
      ) : null}
    </form>
  );
}

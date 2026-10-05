"use client";

import type { FormEvent } from "react";
import { useCallback, useState } from "react";
import { useRouter } from "next/navigation";
import type {
  AvailabilitySlot,
  ReservationHold,
} from "@/lib/server/reservations/types";
import { reservationAreas } from "@/lib/server/reservations/config";
import LiveAvailabilityPanel from "./LiveAvailabilityPanel";
import ReservationHoldTimer from "./ReservationHoldTimer";
import DepositRequirementCard from "./DepositRequirementCard";
import RealBookingSummary from "./RealBookingSummary";
import WaitlistSignup from "./WaitlistSignup";

type ApiErrorShape = {
  error?: {
    message?: string;
  };
};

export default function RealReservationForm() {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState(2);
  const [area, setArea] = useState("Any");
  const [slots, setSlots] = useState<AvailabilitySlot[]>([]);
  const [time, setTime] = useState("");
  const [tableId, setTableId] = useState("");
  const [hold, setHold] = useState<ReservationHold | null>(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const clearHold = useCallback(() => {
    setHold(null);
    setMessage("Table hold expired. Please check availability again.");
  }, []);

  async function checkAvailability() {
    if (!date) {
      setMessage("Choose a date first.");
      return;
    }

    setLoading(true);
    setMessage("");
    setHold(null);
    setTime("");
    setTableId("");

    try {
      const query = new URLSearchParams({
        date,
        guests: String(guests),
        area,
      });

      const response = await fetch(
        `/api/v1/reservation-engine/availability?${query.toString()}`,
        { cache: "no-store" }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { slots?: AvailabilitySlot[] };
      } & ApiErrorShape;

      if (!response.ok || !payload.ok) {
        setMessage(
          payload.error?.message || "Availability could not be loaded."
        );
        setSlots([]);
        return;
      }

      setSlots(payload.data?.slots || []);
    } catch {
      setMessage("Availability request failed.");
    } finally {
      setLoading(false);
    }
  }

  async function holdTable() {
    if (!time) {
      setMessage("Choose an available time.");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch(
        "/api/v1/reservation-engine/hold",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date,
            time,
            guests,
            area,
            tableId,
          }),
        }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: { hold?: ReservationHold };
      } & ApiErrorShape;

      if (!response.ok || !payload.ok || !payload.data?.hold) {
        setMessage(
          payload.error?.message || "Table could not be held."
        );
        return;
      }

      setHold(payload.data.hold);
    } catch {
      setMessage("Table hold request failed.");
    } finally {
      setLoading(false);
    }
  }

  async function submitGuestDetails(
    event: FormEvent<HTMLFormElement>
  ) {
    event.preventDefault();

    if (!hold?.holdId) {
      setMessage("Your booking does not have an active hold.");
      return;
    }

    setLoading(true);
    setMessage("");

    const form = new FormData(event.currentTarget);

    try {
      const response = await fetch(
        "/api/v1/reservation-engine/book",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            holdId: hold.holdId,
            guestName: String(form.get("guestName") || ""),
            email: String(form.get("email") || ""),
            phone: String(form.get("phone") || ""),
            occasion: String(form.get("occasion") || ""),
            notes: String(form.get("notes") || ""),
          }),
        }
      );

      const payload = (await response.json()) as {
        ok?: boolean;
        data?: {
          reservation?: {
            reservationId?: string;
          };
        };
      } & ApiErrorShape;

      const reservationId =
        payload.data?.reservation?.reservationId;

      if (!response.ok || !payload.ok || !reservationId) {
        setMessage(
          payload.error?.message || "Booking could not be confirmed."
        );
        return;
      }

      router.push(
        `/reservations/confirmation/${encodeURIComponent(
          reservationId
        )}`
      );
    } catch {
      setMessage("Booking request failed.");
    } finally {
      setLoading(false);
    }
  }

  const hasAvailable = slots.some(
    (slot) => slot.availableTables > 0
  );

  return (
    <div className="space-y-4">
      <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[28px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">Find a table</p>
          <h2 className="lx-serif mt-2 text-4xl">
            Check availability.
          </h2>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <label className="grid gap-2 text-[10px] uppercase tracking-[.1em] text-[#7c241e]">
              Date
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                className="h-12 rounded-[15px] border border-[#4a3025]/10 bg-white px-3 text-sm"
              />
            </label>

            <label className="grid gap-2 text-[10px] uppercase tracking-[.1em] text-[#7c241e]">
              Guests
              <select
                value={guests}
                onChange={(event) =>
                  setGuests(Number(event.target.value))
                }
                className="h-12 rounded-[15px] border border-[#4a3025]/10 bg-white px-3 text-sm"
              >
                {Array.from({ length: 12 }, (_, index) => index + 1).map(
                  (count) => (
                    <option key={count} value={count}>
                      {count}
                    </option>
                  )
                )}
              </select>
            </label>

            <label className="grid gap-2 text-[10px] uppercase tracking-[.1em] text-[#7c241e]">
              Area
              <select
                value={area}
                onChange={(event) => setArea(event.target.value)}
                className="h-12 rounded-[15px] border border-[#4a3025]/10 bg-white px-3 text-sm"
              >
                {reservationAreas.map((item) => (
                  <option key={item}>{item}</option>
                ))}
              </select>
            </label>
          </div>

          <button
            type="button"
            onClick={() => void checkAvailability()}
            disabled={loading}
            className="mt-4 h-12 w-full rounded-[16px] bg-[#7c241e] text-[10px] uppercase tracking-[.12em] text-white disabled:opacity-50"
          >
            {loading ? "Checking…" : "Check availability"}
          </button>
        </div>

        <DepositRequirementCard guests={guests} date={date} />
      </div>

      {slots.length ? (
        <LiveAvailabilityPanel
          slots={slots}
          selectedTime={time}
          selectedTable={tableId}
          onTime={setTime}
          onTable={setTableId}
        />
      ) : null}

      {slots.length && !hasAvailable ? (
        <WaitlistSignup
          date={date}
          time={time || "19:30"}
          guests={guests}
          area={area}
        />
      ) : null}

      {slots.length && hasAvailable && !hold ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <button
            type="button"
            onClick={() => void holdTable()}
            disabled={!time || loading}
            className="h-14 rounded-[18px] bg-[#335f50] text-[10px] uppercase tracking-[.12em] text-white disabled:opacity-40"
          >
            Hold selected table for 8 minutes
          </button>
          <RealBookingSummary
            date={date}
            time={time}
            guests={guests}
            area={area}
            tableId={tableId}
          />
        </div>
      ) : null}

      {hold?.holdId && hold.expiresAt ? (
        <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
          <form
            onSubmit={submitGuestDetails}
            className="rounded-[28px] bg-[#fffaf4] p-5"
          >
            <p className="lx-kicker">Guest details</p>
            <h2 className="lx-serif mt-2 text-4xl">
              Complete your booking.
            </h2>

            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {[
                ["Name", "guestName", "text"],
                ["Email", "email", "email"],
                ["Phone", "phone", "tel"],
                ["Occasion", "occasion", "text"],
              ].map(([label, name, type]) => (
                <label
                  key={name}
                  className="grid gap-2 text-[10px] uppercase tracking-[.1em] text-[#7c241e]"
                >
                  {label}
                  <input
                    required={["guestName", "email", "phone"].includes(name)}
                    name={name}
                    type={type}
                    className="h-12 rounded-[15px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case tracking-normal"
                  />
                </label>
              ))}
            </div>

            <textarea
              name="notes"
              rows={3}
              placeholder="Allergies or guest notes"
              className="mt-3 w-full rounded-[15px] border border-[#4a3025]/10 bg-white p-3 text-sm"
            />

            <button
              disabled={loading}
              className="mt-4 h-12 w-full rounded-[16px] bg-[#7c241e] text-[10px] uppercase tracking-[.12em] text-white disabled:opacity-50"
            >
              {loading ? "Confirming…" : "Confirm reservation"}
            </button>
          </form>

          <div className="space-y-3">
            <ReservationHoldTimer
              expiresAt={hold.expiresAt}
              onExpired={clearHold}
            />
            <RealBookingSummary
              date={date}
              time={time}
              guests={guests}
              area={hold.area || area}
              tableId={hold.tableId || tableId}
            />
          </div>
        </div>
      ) : null}

      {message ? (
        <p className="rounded-[17px] bg-[#fff4de] p-4 text-xs leading-6 text-[#75645d]">
          {message}
        </p>
      ) : null}
    </div>
  );
}

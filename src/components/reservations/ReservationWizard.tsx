"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import BookingStepper from "./BookingStepper";
import GuestSelector from "./GuestSelector";
import DateSelector from "./DateSelector";
import TimeSlotGrid from "./TimeSlotGrid";
import DiningAreaSelector from "./DiningAreaSelector";
import TableMap from "./TableMap";
import GuestDetailsForm from "./GuestDetailsForm";
import BookingSummary from "./BookingSummary";
import MobileBookingBar from "./MobileBookingBar";
import DepositNotice from "./DepositNotice";
import type { ReservationDraft } from "@/lib/reservations/types";
import { createBookingId, depositFor, todayISO } from "@/lib/reservations/utils";
import { reservationStorage } from "@/lib/reservations/storage";

const initialDraft: ReservationDraft = {
  guests: 2,
  date: todayISO(),
  time: "",
  area: "Main Dining",
  tableId: "",
  occasion: "Just dining",
  name: "",
  email: "",
  phone: "",
  notes: "",
};

export default function ReservationWizard() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [draft, setDraft] = useState<ReservationDraft>(initialDraft);

  const canContinue = useMemo(() => {
    if (step === 0) return draft.guests > 0;
    if (step === 1) return Boolean(draft.date);
    if (step === 2) return Boolean(draft.time);
    if (step === 3) return Boolean(draft.area);
    if (step === 4) return Boolean(draft.tableId);
    return Boolean(draft.name && draft.email && draft.phone);
  }, [draft, step]);

  function patch(next: Partial<ReservationDraft>) {
    setDraft((current) => ({ ...current, ...next }));
  }

  function next() {
    if (!canContinue) return;
    if (step < 5) {
      setStep((value) => value + 1);
      return;
    }

    const id = createBookingId();
    const deposit = depositFor(draft.guests, draft.area);

    reservationStorage.saveBooking({
      ...draft,
      id,
      status: "CONFIRMED",
      createdAt: new Date().toISOString(),
      depositRequired: deposit > 0,
      depositAmount: deposit,
    });

    router.push(`/reservations/confirmation/${id}`);
  }

  function back() {
    setStep((value) => Math.max(0, value - 1));
  }

  return (
    <>
      <div className="mb-5"><BookingStepper step={step} /></div>

      <div className="grid gap-4 lg:grid-cols-[1fr_340px]">
        <div className="rounded-[28px] border border-[#4a3025]/10 bg-[#fffaf4] p-5 md:p-7">
          {step === 0 ? <GuestSelector value={draft.guests} onChange={(guests) => patch({ guests, tableId: "" })} /> : null}
          {step === 1 ? <DateSelector value={draft.date} onChange={(date) => patch({ date, time: "", tableId: "" })} /> : null}
          {step === 2 ? <TimeSlotGrid date={draft.date} guests={draft.guests} value={draft.time} onChange={(time) => patch({ time })} /> : null}
          {step === 3 ? <DiningAreaSelector value={draft.area} onChange={(area) => patch({ area, tableId: "" })} /> : null}
          {step === 4 ? <TableMap area={draft.area} guests={draft.guests} value={draft.tableId} onChange={(tableId) => patch({ tableId })} /> : null}
          {step === 5 ? (
            <div className="space-y-5">
              <GuestDetailsForm draft={draft} onChange={patch} />
              <DepositNotice amount={depositFor(draft.guests, draft.area)} />
            </div>
          ) : null}

          <div className="mt-7 hidden items-center justify-between gap-3 md:flex">
            <button
              type="button"
              onClick={back}
              disabled={step === 0}
              className="min-h-12 rounded-[16px] border border-[#4a3025]/10 px-5 text-[9px] uppercase tracking-[.13em] disabled:opacity-30"
            >
              Back
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!canContinue}
              className="min-h-12 rounded-[16px] bg-[#7c241e] px-6 text-[9px] uppercase tracking-[.14em] text-white disabled:opacity-35"
            >
              {step === 5 ? "Confirm booking" : "Continue"} ↗
            </button>
          </div>
        </div>

        <BookingSummary draft={draft} />
      </div>

      <MobileBookingBar
        label={step === 5 ? "Confirm booking ↗" : "Continue ↗"}
        disabled={!canContinue}
        onClick={next}
      />
    </>
  );
}

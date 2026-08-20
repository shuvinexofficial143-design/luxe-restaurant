"use client";

import { FormEvent, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  privateDiningPackages,
  privateDiningRooms,
} from "@/lib/private-dining/data";
import {
  createPrivateDiningId,
  estimatePrivateDining,
} from "@/lib/private-dining/pricing";
import { privateDiningStorage } from "@/lib/private-dining/storage";
import PackageSelector from "./PackageSelector";
import PrivateDiningSummary from "./PrivateDiningSummary";
import InquiryConfirmation from "./InquiryConfirmation";

export default function PrivateDiningForm() {
  const searchParams = useSearchParams();
  const initialRoomSlug =
    searchParams.get("room") || privateDiningRooms[0].slug;

  const [roomSlug, setRoomSlug] = useState(
    privateDiningRooms.some((room) => room.slug === initialRoomSlug)
      ? initialRoomSlug
      : privateDiningRooms[0].slug
  );
  const [packageId, setPackageId] = useState(privateDiningPackages[0].id);
  const [guests, setGuests] = useState(privateDiningRooms[0].minGuests);
  const [confirmationId, setConfirmationId] = useState("");

  const room =
    privateDiningRooms.find((item) => item.slug === roomSlug) ||
    privateDiningRooms[0];
  const diningPackage =
    privateDiningPackages.find((item) => item.id === packageId) ||
    privateDiningPackages[0];

  const total = useMemo(
    () => estimatePrivateDining(room, diningPackage, guests),
    [diningPackage, guests, room]
  );

  function changeRoom(nextSlug: string) {
    const nextRoom =
      privateDiningRooms.find((item) => item.slug === nextSlug) ||
      privateDiningRooms[0];

    setRoomSlug(nextSlug);
    setGuests((current) =>
      Math.min(nextRoom.maxGuests, Math.max(nextRoom.minGuests, current))
    );
  }

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const id = createPrivateDiningId();

    privateDiningStorage.save({
      id,
      roomSlug: room.slug,
      roomName: room.name,
      packageId: diningPackage.id,
      packageName: diningPackage.name,
      guests,
      date: String(form.get("date") || ""),
      time: String(form.get("time") || ""),
      occasion: String(form.get("occasion") || ""),
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      phone: String(form.get("phone") || ""),
      notes: String(form.get("notes") || ""),
      estimatedTotal: total,
      status: "ENQUIRY_RECEIVED",
      createdAt: new Date().toISOString(),
    });

    setConfirmationId(id);
  }

  if (confirmationId) {
    return <InquiryConfirmation id={confirmationId} />;
  }

  return (
    <form onSubmit={submit}>
      <div>
        <p className="lx-kicker">01 · Room</p>
        <h2 className="lx-serif mt-2 text-4xl">Choose your space.</h2>

        <div className="mt-4 grid gap-2 md:grid-cols-2">
          {privateDiningRooms.map((item) => (
            <button
              key={item.slug}
              type="button"
              onClick={() => changeRoom(item.slug)}
              className={`rounded-[20px] border p-4 text-left ${
                room.slug === item.slug
                  ? "border-[#7c241e] bg-[#7c241e] text-white"
                  : "border-[#4a3025]/10 bg-[#fffaf4]"
              }`}
            >
              <p className="lx-serif text-2xl">{item.name}</p>
              <p className="mt-1 text-[10px] opacity-65">
                {item.minGuests}–{item.maxGuests} guests
              </p>
            </button>
          ))}
        </div>
      </div>

      <div className="mt-7">
        <p className="lx-kicker">02 · Package</p>
        <h2 className="lx-serif mt-2 text-4xl">Choose the experience.</h2>
        <div className="mt-4">
          <PackageSelector value={packageId} onChange={setPackageId} />
        </div>
      </div>

      <div className="mt-7 grid gap-4 lg:grid-cols-[1fr_330px]">
        <div className="rounded-[26px] bg-[#fffaf4] p-5">
          <p className="lx-kicker">03 · Details</p>

          <label className="mt-4 grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
            Guests · {guests}
            <input
              type="range"
              min={room.minGuests}
              max={room.maxGuests}
              value={guests}
              onChange={(event) => setGuests(Number(event.target.value))}
              className="accent-[#7c241e]"
            />
          </label>

          <div className="mt-4 grid grid-cols-2 gap-3">
            <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
              Date
              <input
                required
                name="date"
                type="date"
                className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case"
              />
            </label>
            <label className="grid gap-2 text-[9px] uppercase tracking-[.11em] text-[#7c241e]">
              Time
              <select
                name="time"
                className="h-12 rounded-[16px] border border-[#4a3025]/10 bg-white px-3 text-sm normal-case"
              >
                <option>Lunch</option>
                <option>6:00 PM</option>
                <option>7:00 PM</option>
                <option>8:00 PM</option>
              </select>
            </label>
          </div>

          <div className="mt-3 grid gap-3">
            {[
              ["Occasion", "occasion", "text"],
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
                rows={4}
                placeholder="Layout, allergies, AV, celebration details..."
                className="rounded-[16px] border border-[#4a3025]/10 bg-white p-4 text-sm normal-case tracking-normal"
              />
            </label>
          </div>
        </div>

        <PrivateDiningSummary
          room={room}
          diningPackage={diningPackage}
          guests={guests}
          total={total}
        />
      </div>

      <button className="mt-4 h-14 w-full rounded-[18px] bg-[#7c241e] text-[10px] uppercase tracking-[.14em] text-white">
        Send private dining enquiry ↗
      </button>
    </form>
  );
}

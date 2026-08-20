export const promoCodes = [
  {
    code: "LUXE10",
    label: "10% off food",
    type: "PERCENT" as const,
    value: 10,
    minSubtotal: 1500,
  },
  {
    code: "EMBER250",
    label: "₹250 off",
    type: "FLAT" as const,
    value: 250,
    minSubtotal: 2000,
  },
  {
    code: "TASTING15",
    label: "15% off orders above ₹4,000",
    type: "PERCENT" as const,
    value: 15,
    minSubtotal: 4000,
  },
];

export const pickupSlots = [
  "6:00 PM",
  "6:20 PM",
  "6:40 PM",
  "7:00 PM",
  "7:20 PM",
  "7:40 PM",
  "8:00 PM",
  "8:20 PM",
  "8:40 PM",
  "9:00 PM",
  "9:20 PM",
  "9:40 PM",
];

export const tableNumbers = [
  "M1",
  "M2",
  "M3",
  "M4",
  "W1",
  "W2",
  "T1",
  "T2",
  "T3",
  "C1",
  "C2",
];

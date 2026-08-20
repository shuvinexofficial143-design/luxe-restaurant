import type { TableOption } from "./types";

export const tableOptions: TableOption[] = [
  { id: "T01", label: "Table 01", area: "Main Dining", seats: 2 },
  { id: "T02", label: "Table 02", area: "Main Dining", seats: 4 },
  { id: "W01", label: "Window 01", area: "Window", seats: 2 },
  { id: "W02", label: "Window 02", area: "Window", seats: 4 },
  { id: "TR1", label: "Terrace 01", area: "Terrace", seats: 4 },
  { id: "CT1", label: "Chef Table", area: "Chef Table", seats: 6 },
];

export const qrQuickLinks = [
  {
    id: "menu",
    title: "Main Menu",
    text: "Open the full searchable menu.",
    path: "/menu",
    type: "MENU" as const,
  },
  {
    id: "wine",
    title: "Wine List",
    text: "Open the cellar and sommelier tools.",
    path: "/wine",
    type: "MENU" as const,
  },
  {
    id: "book",
    title: "Reservations",
    text: "Start the table-booking flow.",
    path: "/reservations",
    type: "RESERVATION" as const,
  },
  {
    id: "events",
    title: "Events",
    text: "View ticketed dining experiences.",
    path: "/events",
    type: "EVENT" as const,
  },
];

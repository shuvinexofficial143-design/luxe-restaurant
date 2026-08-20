export type QRShareType =
  | "MENU"
  | "TABLE"
  | "RESERVATION"
  | "EVENT"
  | "GIFT"
  | "CUSTOM";

export type QRHistoryItem = {
  id: string;
  type: QRShareType;
  title: string;
  url: string;
  createdAt: string;
};

export type TableOption = {
  id: string;
  label: string;
  area: string;
  seats: number;
};

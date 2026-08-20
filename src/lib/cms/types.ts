export type CMSCollection =
  | "menu"
  | "wine"
  | "events"
  | "journal"
  | "gallery"
  | "homepage";

export type CMSStatus = "DRAFT" | "PUBLISHED" | "ARCHIVED";

export type CMSItem = {
  id: string;
  collection: CMSCollection;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  price?: number;
  status: CMSStatus;
  featured: boolean;
  sortOrder: number;
  createdAt: string;
  updatedAt: string;
};

export type CMSRevision = {
  id: string;
  itemId: string;
  collection: CMSCollection;
  action: "CREATED" | "UPDATED" | "PUBLISHED" | "ARCHIVED" | "DELETED";
  snapshot: CMSItem;
  createdAt: string;
};

export type CMSMediaItem = {
  id: string;
  name: string;
  url: string;
  alt: string;
  createdAt: string;
};

export type CMSApproval = {
  id: string;
  itemId: string;
  collection: CMSCollection;
  title: string;
  requestedAt: string;
  status: "PENDING" | "APPROVED" | "REJECTED";
};

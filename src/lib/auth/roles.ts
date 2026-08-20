import type { AdminRole } from "./types";

export const roleMeta: Record<
  AdminRole,
  { label: string; description: string }
> = {
  OWNER: {
    label: "Owner",
    description: "Full restaurant, security and business-control access.",
  },
  ADMIN: {
    label: "Administrator",
    description: "Full operational and content-management access.",
  },
  MANAGER: {
    label: "Restaurant Manager",
    description: "Reservations, orders, events, reviews and analytics.",
  },
  CONTENT: {
    label: "Content Editor",
    description: "CMS editing, media and publishing workflow.",
  },
  HOST: {
    label: "Host",
    description: "Reservations, guest notes and private-dining enquiries.",
  },
  KITCHEN: {
    label: "Kitchen",
    description: "Order queue and event-service visibility.",
  },
};

export const adminRoles = Object.keys(roleMeta) as AdminRole[];

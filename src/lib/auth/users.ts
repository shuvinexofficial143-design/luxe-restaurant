import type { AdminUser } from "./types";

export const demoAdminUsers: AdminUser[] = [
  {
    id: "USR-OWNER",
    name: "LUXE Owner",
    email: "owner@luxe.demo",
    role: "OWNER",
    active: true,
    lastLogin: "Demo account",
  },
  {
    id: "USR-ADMIN",
    name: "LUXE Admin",
    email: "admin@luxe.demo",
    role: "ADMIN",
    active: true,
    lastLogin: "Demo account",
  },
  {
    id: "USR-MANAGER",
    name: "Restaurant Manager",
    email: "manager@luxe.demo",
    role: "MANAGER",
    active: true,
    lastLogin: "Not signed in",
  },
  {
    id: "USR-CONTENT",
    name: "Content Editor",
    email: "content@luxe.demo",
    role: "CONTENT",
    active: true,
    lastLogin: "Not signed in",
  },
  {
    id: "USR-HOST",
    name: "Reservations Host",
    email: "host@luxe.demo",
    role: "HOST",
    active: true,
    lastLogin: "Not signed in",
  },
  {
    id: "USR-KITCHEN",
    name: "Kitchen Lead",
    email: "kitchen@luxe.demo",
    role: "KITCHEN",
    active: true,
    lastLogin: "Not signed in",
  },
];

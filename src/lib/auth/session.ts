import type { AdminRole, AdminSession } from "./types";
import { adminRoles } from "./roles";

export function normalizeRole(value: string | undefined): AdminRole {
  return adminRoles.includes(value as AdminRole)
    ? (value as AdminRole)
    : "ADMIN";
}

export function emptyAdminSession(): AdminSession {
  return {
    active: false,
    email: "",
    role: "ADMIN",
  };
}

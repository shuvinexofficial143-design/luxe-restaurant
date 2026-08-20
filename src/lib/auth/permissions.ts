import type { AdminRole, Permission } from "./types";

export const permissionLabels: Record<Permission, string> = {
  "admin.view": "Open admin dashboard",
  "reservations.manage": "Manage reservations",
  "orders.manage": "Manage orders",
  "events.manage": "Manage event bookings",
  "privateDining.manage": "Manage private dining",
  "reviews.moderate": "Moderate reviews",
  "gifts.manage": "Manage gift cards",
  "careers.manage": "Manage career applications",
  "analytics.view": "View analytics",
  "cms.read": "View CMS",
  "cms.write": "Edit CMS content",
  "cms.publish": "Publish CMS content",
  "users.manage": "Manage admin users",
  "roles.manage": "Manage roles",
  "security.view": "View security settings",
};

const allPermissions = Object.keys(permissionLabels) as Permission[];

export const rolePermissions: Record<AdminRole, Permission[]> = {
  OWNER: allPermissions,
  ADMIN: allPermissions,
  MANAGER: [
    "admin.view",
    "reservations.manage",
    "orders.manage",
    "events.manage",
    "privateDining.manage",
    "reviews.moderate",
    "gifts.manage",
    "careers.manage",
    "analytics.view",
    "cms.read",
    "security.view",
  ],
  CONTENT: [
    "admin.view",
    "cms.read",
    "cms.write",
    "cms.publish",
    "analytics.view",
  ],
  HOST: [
    "admin.view",
    "reservations.manage",
    "privateDining.manage",
    "events.manage",
    "cms.read",
  ],
  KITCHEN: ["admin.view", "orders.manage", "events.manage"],
};

export function roleCan(role: AdminRole, permission: Permission) {
  return rolePermissions[role].includes(permission);
}

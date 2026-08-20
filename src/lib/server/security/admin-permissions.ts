import type {
  AdminPermission,
  AdminRole,
} from "./admin-types";

const allPermissions: AdminPermission[] = [
  "admin.view",
  "reservations.manage",
  "orders.manage",
  "events.manage",
  "privateDining.manage",
  "reviews.moderate",
  "gifts.manage",
  "careers.manage",
  "analytics.view",
  "crm.view",
  "crm.write",
  "cms.read",
  "cms.write",
  "cms.publish",
  "users.manage",
  "roles.manage",
  "security.view",
];

export const permissionsByRole: Record<
  AdminRole,
  AdminPermission[]
> = {
  OWNER: allPermissions,
  ADMIN: allPermissions.filter(
    (permission) => permission !== "roles.manage"
  ),
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
    "crm.view",
    "crm.write",
    "cms.read",
  ],
  CONTENT: [
    "admin.view",
    "cms.read",
    "cms.write",
    "cms.publish",
    "reviews.moderate",
  ],
  HOST: [
    "admin.view",
    "reservations.manage",
    "events.manage",
    "privateDining.manage",
    "crm.view",
  ],
  KITCHEN: ["admin.view", "orders.manage"],
};

export function rolePermissions(role: AdminRole) {
  return permissionsByRole[role] || [];
}

export function roleHasPermission(
  role: AdminRole,
  permission: AdminPermission
) {
  return rolePermissions(role).includes(permission);
}

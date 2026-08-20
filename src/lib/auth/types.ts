export type AdminRole =
  | "OWNER"
  | "ADMIN"
  | "MANAGER"
  | "CONTENT"
  | "HOST"
  | "KITCHEN";

export type Permission =
  | "admin.view"
  | "reservations.manage"
  | "orders.manage"
  | "events.manage"
  | "privateDining.manage"
  | "reviews.moderate"
  | "gifts.manage"
  | "careers.manage"
  | "analytics.view"
  | "cms.read"
  | "cms.write"
  | "cms.publish"
  | "users.manage"
  | "roles.manage"
  | "security.view";

export type AdminUser = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  active: boolean;
  lastLogin: string;
};

export type AdminSession = {
  active: boolean;
  email: string;
  role: AdminRole;
};

export type AuditEvent = {
  id: string;
  action: string;
  detail: string;
  createdAt: string;
};

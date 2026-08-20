export type AdminRole =
  | "OWNER"
  | "ADMIN"
  | "MANAGER"
  | "CONTENT"
  | "HOST"
  | "KITCHEN";

export type AdminPermission =
  | "admin.view"
  | "reservations.manage"
  | "orders.manage"
  | "events.manage"
  | "privateDining.manage"
  | "reviews.moderate"
  | "gifts.manage"
  | "careers.manage"
  | "analytics.view"
  | "crm.view"
  | "crm.write"
  | "cms.read"
  | "cms.write"
  | "cms.publish"
  | "users.manage"
  | "roles.manage"
  | "security.view";

export type AdminUserRow = {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: AdminRole;
  active: boolean;
  last_login_at: string | null;
  created_at?: string;
  updated_at?: string;
};

export type AdminSessionRow = {
  id: string;
  user_id: string;
  token_hash: string;
  expires_at: string;
  revoked_at: string | null;
  user_agent: string | null;
  ip_hint: string | null;
  last_seen_at?: string;
  created_at?: string;
};

export type ResolvedAdminSession = {
  user: Omit<AdminUserRow, "password_hash">;
  session: AdminSessionRow;
  permissions: AdminPermission[];
};

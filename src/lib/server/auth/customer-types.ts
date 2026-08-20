export type CustomerDBRow = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  password_hash: string;
  email_verified: boolean;
  active: boolean;
  created_at?: string;
  updated_at?: string;
};

export type CustomerSessionDBRow = {
  id: string;
  customer_id: string;
  token_hash: string;
  user_agent: string | null;
  ip_hint: string | null;
  expires_at: string;
  revoked_at: string | null;
  created_at?: string;
};

export type PasswordResetDBRow = {
  id: string;
  customer_id: string;
  token_hash: string;
  expires_at: string;
  used_at: string | null;
  created_at?: string;
};

export type SafeCustomer = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  emailVerified: boolean;
};

export type CustomerSessionView = {
  active: boolean;
  customer: SafeCustomer | null;
};

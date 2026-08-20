import { ApiError } from "@/lib/server/api/errors";
import { serverIds } from "@/lib/server/db/ids";
import { supabaseCustomers } from "@/lib/server/supabase/customers";
import { supabaseCustomerSessions } from "@/lib/server/supabase/customer-sessions";
import type { CustomerDBRow, SafeCustomer } from "./customer-types";
import { hashPassword, verifyPassword } from "./password-hash";
import {
  createOpaqueToken,
  hashOpaqueToken,
  sessionExpiry,
} from "./tokens";

function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function safeCustomer(customer: CustomerDBRow): SafeCustomer {
  return {
    id: customer.id,
    name: customer.name,
    email: customer.email,
    phone: customer.phone,
    emailVerified: customer.email_verified,
  };
}

export async function registerCustomer(input: {
  name: string;
  email: string;
  phone?: string;
  password: string;
  userAgent?: string;
  ipHint?: string;
}) {
  const email = normalizeEmail(input.email);
  const existing = await supabaseCustomers.findByEmail(email);

  if (existing) {
    throw new ApiError(
      "ACCOUNT_EXISTS",
      "An account with this email already exists.",
      409
    );
  }

  const customer = await supabaseCustomers.insert({
    id: serverIds.user(),
    name: input.name.trim(),
    email,
    phone: input.phone?.trim() || null,
    password_hash: hashPassword(input.password),
    email_verified: false,
    active: true,
  });

  const session = await createCustomerSession({
    customer,
    userAgent: input.userAgent,
    ipHint: input.ipHint,
  });

  return { customer: safeCustomer(customer), ...session };
}

export async function loginCustomer(input: {
  email: string;
  password: string;
  userAgent?: string;
  ipHint?: string;
}) {
  const customer = await supabaseCustomers.findByEmail(
    normalizeEmail(input.email)
  );

  if (
    !customer ||
    !customer.active ||
    !verifyPassword(input.password, customer.password_hash)
  ) {
    throw new ApiError(
      "INVALID_CREDENTIALS",
      "Email or password is incorrect.",
      401
    );
  }

  const session = await createCustomerSession({
    customer,
    userAgent: input.userAgent,
    ipHint: input.ipHint,
  });

  return { customer: safeCustomer(customer), ...session };
}

export async function createCustomerSession(input: {
  customer: CustomerDBRow;
  userAgent?: string;
  ipHint?: string;
}) {
  const token = createOpaqueToken();
  const expires = sessionExpiry(30);

  await supabaseCustomerSessions.insert({
    id: `CSESS-${crypto.randomUUID()}`,
    customer_id: input.customer.id,
    token_hash: hashOpaqueToken(token),
    user_agent: input.userAgent?.slice(0, 500) || null,
    ip_hint: input.ipHint?.slice(0, 120) || null,
    expires_at: expires.toISOString(),
    revoked_at: null,
  });

  return { token, expires };
}

export async function resolveCustomerSession(token: string) {
  if (!token) return null;

  const session = await supabaseCustomerSessions.findActiveByHash(
    hashOpaqueToken(token)
  );

  if (!session) return null;

  if (new Date(session.expires_at).getTime() <= Date.now()) {
    await supabaseCustomerSessions.revoke(session.id).catch(() => undefined);
    return null;
  }

  const customer = await supabaseCustomers.findById(session.customer_id);

  if (!customer || !customer.active) return null;

  return {
    session,
    customer: safeCustomer(customer),
  };
}

export async function revokeCustomerSession(token: string) {
  if (!token) return;
  const session = await supabaseCustomerSessions.findActiveByHash(
    hashOpaqueToken(token)
  );
  if (session) {
    await supabaseCustomerSessions.revoke(session.id);
  }
}

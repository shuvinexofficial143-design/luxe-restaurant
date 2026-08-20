import { NextResponse } from "next/server";
import { supabaseRest } from "@/lib/server/supabase/http";
import type {
  AdminSessionRow,
  AdminUserRow,
  ResolvedAdminSession,
} from "./admin-types";
import {
  ADMIN_SESSION_COOKIE,
  adminSessionExpiry,
  createAdminSessionToken,
  hashAdminSessionToken,
  secureIdentifier,
} from "./admin-token";
import { rolePermissions } from "./admin-permissions";

export async function findAdminByEmail(email: string) {
  const rows = await supabaseRest<AdminUserRow[]>("admin_users", {
    query:
      `select=*&email=eq.${encodeURIComponent(
        email.trim().toLowerCase()
      )}&limit=1`,
  });

  return rows[0] || null;
}

export async function createAdminSession(input: {
  userId: string;
  userAgent?: string;
  ipHint?: string;
}) {
  const token = createAdminSessionToken();
  const expires = adminSessionExpiry();

  const rows = await supabaseRest<AdminSessionRow[]>(
    "admin_sessions",
    {
      method: "POST",
      body: {
        id: secureIdentifier("ASESS"),
        user_id: input.userId,
        token_hash: hashAdminSessionToken(token),
        expires_at: expires.toISOString(),
        revoked_at: null,
        user_agent: input.userAgent?.slice(0, 500) || null,
        ip_hint: input.ipHint?.slice(0, 120) || null,
        last_seen_at: new Date().toISOString(),
      },
      prefer: "return=representation",
    }
  );

  return {
    token,
    expires,
    session: rows[0] || null,
  };
}

export async function resolveAdminSession(
  token: string
): Promise<ResolvedAdminSession | null> {
  if (!token) return null;

  const sessions = await supabaseRest<AdminSessionRow[]>(
    "admin_sessions",
    {
      query:
        `select=*&token_hash=eq.${hashAdminSessionToken(token)}` +
        `&revoked_at=is.null&limit=1`,
    }
  );

  const session = sessions[0];

  if (
    !session ||
    new Date(session.expires_at).getTime() <= Date.now()
  ) {
    return null;
  }

  const users = await supabaseRest<AdminUserRow[]>("admin_users", {
    query: `select=*&id=eq.${encodeURIComponent(
      session.user_id
    )}&active=eq.true&limit=1`,
  });

  const user = users[0];
  if (!user) return null;

  const { password_hash: _passwordHash, ...safeUser } = user;
  void _passwordHash;

  return {
    user: safeUser,
    session,
    permissions: rolePermissions(user.role),
  };
}

export async function revokeAdminSession(token: string) {
  if (!token) return;

  const tokenHash = hashAdminSessionToken(token);

  await supabaseRest<unknown>("admin_sessions", {
    method: "PATCH",
    query: `token_hash=eq.${tokenHash}&revoked_at=is.null`,
    body: {
      revoked_at: new Date().toISOString(),
    },
    prefer: "return=minimal",
  });
}

export function setAdminSessionCookie(
  response: NextResponse,
  token: string,
  expires: Date
) {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires,
  });

  response.cookies.set("luxe_admin_demo", "", {
    path: "/",
    expires: new Date(0),
  });
}

export function clearAdminSessionCookie(response: NextResponse) {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    expires: new Date(0),
  });

  response.cookies.set("luxe_admin_demo", "", {
    path: "/",
    expires: new Date(0),
  });
}

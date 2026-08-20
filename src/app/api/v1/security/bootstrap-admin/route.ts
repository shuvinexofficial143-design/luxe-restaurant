import { NextRequest } from "next/server";
import { ApiError } from "@/lib/server/api/errors";
import { apiFailure, apiSuccess } from "@/lib/server/api/response";
import {
  parseJsonObject,
  requireString,
} from "@/lib/server/api/validation";
import { getRequestId } from "@/lib/server/security/request-id";
import { hashAdminPassword } from "@/lib/server/security/admin-password";
import {
  privateRateKey,
  requireDatabaseRateLimit,
} from "@/lib/server/security/db-rate-limit";
import { writeSecurityAudit } from "@/lib/server/security/audit-log";
import { secureIdentifier } from "@/lib/server/security/admin-token";
import { supabaseRest } from "@/lib/server/supabase/http";
import type { AdminUserRow } from "@/lib/server/security/admin-types";

export async function POST(request: NextRequest) {
  const requestId = getRequestId(request);

  try {
    const expected =
      process.env.LUXE_ADMIN_BOOTSTRAP_SECRET || "";
    const provided =
      request.headers.get("x-bootstrap-secret") || "";

    if (!expected || provided !== expected) {
      throw new ApiError(
        "BOOTSTRAP_FORBIDDEN",
        "Bootstrap secret is missing or invalid.",
        403
      );
    }

    const ip =
      request.headers
        .get("x-forwarded-for")
        ?.split(",")[0]
        ?.trim() || "unknown";

    await requireDatabaseRateLimit({
      key: privateRateKey("bootstrap-admin", ip),
      limit: 3,
      windowSeconds: 60 * 60,
    });

    const existing = await supabaseRest<AdminUserRow[]>(
      "admin_users",
      {
        query: "select=*&active=eq.true&limit=1",
      }
    );

    if (existing.length) {
      throw new ApiError(
        "BOOTSTRAP_ALREADY_COMPLETE",
        "An active admin already exists. Bootstrap is disabled.",
        409
      );
    }

    const body = await parseJsonObject(request);
    const email = requireString(body, "email", {
      min: 5,
      max: 200,
    })
      .trim()
      .toLowerCase();

    const userRows = await supabaseRest<AdminUserRow[]>(
      "admin_users",
      {
        method: "POST",
        body: {
          id: secureIdentifier("ADMIN"),
          name: requireString(body, "name", {
            min: 2,
            max: 100,
          }),
          email,
          password_hash: hashAdminPassword(
            requireString(body, "password", {
              min: 14,
              max: 300,
            })
          ),
          role: "OWNER",
          active: true,
          updated_at: new Date().toISOString(),
        },
        prefer: "return=representation",
      }
    );

    const user = userRows[0];

    await writeSecurityAudit({
      adminUserId: user?.id || null,
      eventType: "OWNER_BOOTSTRAPPED",
      severity: "CRITICAL",
      resource: "/api/v1/security/bootstrap-admin",
      action: "create-owner",
      request,
    }).catch(() => undefined);

    return apiSuccess(
      {
        created: Boolean(user),
        user: user
          ? {
              id: user.id,
              name: user.name,
              email: user.email,
              role: user.role,
            }
          : null,
      },
      requestId,
      201
    );
  } catch (error) {
    return apiFailure(error, requestId);
  }
}

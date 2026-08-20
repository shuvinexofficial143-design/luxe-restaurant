import { NextResponse } from "next/server";
import { createCsrfToken, CSRF_COOKIE } from "@/lib/server/security/csrf";

export async function GET() {
  const token = createCsrfToken();

  const response = NextResponse.json({
    ok: true,
    data: { token },
  });

  response.cookies.set(CSRF_COOKIE, token, {
    httpOnly: false,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 2,
  });

  return response;
}

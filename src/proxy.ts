import { NextRequest, NextResponse } from "next/server";
import { applySecurityHeaders } from "@/lib/server/security/security-headers";

const publicAdminPaths = [
  "/admin/login",
  "/admin/unauthorized",
];

function secure(response: NextResponse) {
  return applySecurityHeaders(response);
}

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  if (pathname.startsWith("/admin")) {
    if (
      publicAdminPaths.some((path) =>
        pathname.startsWith(path)
      )
    ) {
      return secure(NextResponse.next());
    }

    const adminToken =
      request.cookies.get("luxe_admin_session")?.value;

    if (!adminToken) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return secure(NextResponse.redirect(loginUrl));
    }
  }

  if (pathname.startsWith("/account/secure")) {
    const customerToken =
      request.cookies.get("luxe_customer_session")?.value;

    if (!customerToken) {
      const loginUrl = new URL("/auth/login", request.url);
      loginUrl.searchParams.set("next", pathname);
      return secure(NextResponse.redirect(loginUrl));
    }
  }

  return secure(NextResponse.next());
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};

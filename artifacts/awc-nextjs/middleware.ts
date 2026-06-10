import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { verifySession } from "@/lib/auth";

const PROTECTED_PATHS = ["/admin", "/api/content"];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public read of site content
  if (pathname === "/api/content" && request.method === "GET") {
    return NextResponse.next();
  }

  const isProtected =
    PROTECTED_PATHS.some((p) => pathname.startsWith(p)) &&
    !pathname.startsWith("/api/admin") &&
    pathname !== "/admin/login";

  if (!isProtected) return NextResponse.next();

  const token = request.cookies.get("awc_admin_session")?.value;
  const valid = token ? await verifySession(token) : false;

  if (!valid) {
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/content/:path*"],
};

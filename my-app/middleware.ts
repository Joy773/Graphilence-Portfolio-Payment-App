import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Read the 'auth' cookie
  const auth = request.cookies.get("auth")?.value;

  // Protect /admin route
  if (request.nextUrl.pathname.startsWith("/admin") && auth !== "true") {
    // If not authenticated, redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Otherwise, allow the request
  return NextResponse.next();
}

// Apply middleware only to /admin route
export const config = {
  matcher: ["/admin/:path*"],
};
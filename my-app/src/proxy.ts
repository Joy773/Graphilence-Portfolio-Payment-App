import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Only protect /admin routes (exclude /api routes)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/api")) {
    const authCookie = request.cookies.get("auth")?.value;

    // If no cookie or empty, redirect to login
    if (!authCookie || authCookie.trim() === "") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    // Validate session expiration (60 seconds = 1 minute)
    const loginTime = parseInt(authCookie);
    if (isNaN(loginTime)) {
      // Invalid cookie value, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth");
      return response;
    }

    const currentTime = Math.floor(Date.now() / 1000);
    const sessionDurationStr = process.env.SESSION_DURATION;
    
    // Validate session duration from environment variable
    if (!sessionDurationStr) {
      // If SESSION_DURATION is not set, redirect to login for security
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth");
      return response;
    }

    const sessionDuration = parseInt(sessionDurationStr);
    if (isNaN(sessionDuration)) {
      // Invalid session duration, redirect to login
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth");
      return response;
    }

    if ((currentTime - loginTime) > sessionDuration) {
      // Session expired, clear cookie and redirect
      const response = NextResponse.redirect(new URL("/login", request.url));
      response.cookies.delete("auth");
      return response;
    }
  }

  return NextResponse.next();
}

// Matcher specifically for /admin routes - this ensures proxy only runs for admin paths
export const config = {
  matcher: [
    "/admin",
    "/admin/:path*"
  ],
};

import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Only protect the /admin route (not /studio which has its own auth)
  if (pathname.startsWith("/admin")) {
    const authCookie = request.cookies.get("admin_auth");

    // If cookie exists and matches the secret, allow access
    if (authCookie?.value === process.env.ADMIN_SESSION_SECRET) {
      return NextResponse.next();
    }

    // Otherwise, check for Basic Auth header
    const authHeader = request.headers.get("authorization");

    if (authHeader) {
      const [type, credentials] = authHeader.split(" ");
      if (type === "Basic" && credentials) {
        const [user, pass] = atob(credentials).split(":");
        if (
          user === process.env.ADMIN_USER &&
          pass === process.env.ADMIN_PASSWORD
        ) {
          // Set a session cookie for subsequent requests
          const response = NextResponse.next();
          response.cookies.set("admin_auth", process.env.ADMIN_SESSION_SECRET || "authenticated", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 60 * 60 * 8, // 8 hours
            path: "/admin",
          });
          return response;
        }
      }
    }

    // Prompt for Basic Auth credentials
    return new NextResponse("Acceso no autorizado.", {
      status: 401,
      headers: {
        "WWW-Authenticate": 'Basic realm="Panel de Administración - Portfolio"',
      },
    });
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

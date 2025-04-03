import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// We can't import the env utility directly in middleware
// So we access process.env directly
const ADMIN_SECRET_TOKEN = process.env.ADMIN_SECRET_TOKEN || "admin"

export function middleware(request: NextRequest) {
  // Protect admin routes
  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Check for a secret token in the URL for demo purposes
    // In production, use a proper authentication system
    const token = request.nextUrl.searchParams.get("token")

    if (!token || token !== ADMIN_SECRET_TOKEN) {
      return NextResponse.redirect(new URL("/", request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}


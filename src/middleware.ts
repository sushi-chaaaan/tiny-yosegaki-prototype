import type { NextRequest } from "next/server"

import { updateSession } from "@/lib/supabase/middleware"

/**
 * This example is best practice for handling session data in Next.js middleware.
 * @see https://github.com/vercel/nextjs-subscription-payments/blob/main/middleware.ts
 */
export async function middleware(request: NextRequest) {
  return await updateSession(request)
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
}

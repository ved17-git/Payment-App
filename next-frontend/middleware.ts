import { NextRequest, NextResponse } from "next/server";

// Public routes that can be accessed without token
const publicPaths = ['/signIn', '/signUp', '/' ];

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const pathname = req.nextUrl.pathname;

  if (!token && !publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // if token exists and user tries to access public route (e.g., /signIn), redirect to /dashboard
  if (token && publicPaths.includes(pathname)) {
    return NextResponse.redirect(new URL('/dashboard', req.url));
  }

  return NextResponse.next();
}
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
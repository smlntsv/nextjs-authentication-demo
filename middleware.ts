import { NextRequest, NextResponse, MiddlewareConfig } from 'next/server'

const protectedRoutes = ['/dashboard']

export async function middleware(request: NextRequest) {
  // TODO: replace with actual authentication check
  const isUserAuthenticated = false
  const nextPathname = request.nextUrl.pathname

  // Redirect authenticated users trying to access /auth/* routes to /dashboard
  if (isUserAuthenticated && nextPathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users trying to access protected routes to /auth/sign-in
  if (!isUserAuthenticated && protectedRoutes.some((route) => nextPathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  // Redirect outside the /auth/sign-up/confirmation-awaiting if email query param is not provided
  if (
    nextPathname.startsWith('/auth/sign-up/confirmation-awaiting') &&
    !request.nextUrl.searchParams.has('email')
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*'],
} satisfies MiddlewareConfig

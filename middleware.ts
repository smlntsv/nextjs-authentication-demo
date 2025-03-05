import { NextRequest, NextResponse, MiddlewareConfig } from 'next/server'
import { isUserSessionValid } from '@/lib/auth/session'

const isProduction = process.env.NODE_ENV === 'production'
const protectedRoutes = ['/dashboard']
const requiresEmailQueryParamRoutes = [
  '/auth/sign-up/confirmation-awaiting',
  '/auth/password-reset/confirmation',
  '/auth/password-reset/success',
]
const storybookStaticRedirect = {
  from: '/storybook-static',
  to: '/storybook-static/index.html',
}

export async function middleware(request: NextRequest) {
  const isUserAuthenticated = await isUserSessionValid(request)
  const nextPathname = request.nextUrl.pathname

  // Redirect authenticated users trying to access /auth/* routes to /dashboard
  if (isUserAuthenticated && nextPathname.startsWith('/auth')) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users trying to access protected routes to /auth/sign-in
  if (!isUserAuthenticated && protectedRoutes.some((route) => nextPathname.startsWith(route))) {
    return NextResponse.redirect(new URL('/auth/sign-in', request.url))
  }

  // Redirect to /not-found if the route requires an 'email' query param and it is missing
  if (
    requiresEmailQueryParamRoutes.some((route) => nextPathname.startsWith(route)) &&
    !request.nextUrl.searchParams.has('email')
  ) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // Block access to dev-only routes (like email templates preview) in production
  if (nextPathname.startsWith('/dev') && isProduction) {
    return NextResponse.rewrite(new URL('/not-found', request.url))
  }

  // Redirect to Storybook's index file
  if (nextPathname === storybookStaticRedirect.from) {
    return NextResponse.redirect(new URL(storybookStaticRedirect.to, request.url))
  }
}

export const config = {
  matcher: ['/auth/:path*', '/dashboard/:path*', storybookStaticRedirect.from],
} satisfies MiddlewareConfig

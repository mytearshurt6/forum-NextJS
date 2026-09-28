import { NextRequest, NextResponse } from 'next/server'
import { getUserFromSession, updateUserSessionExpiration } from './features/auth/utils/session'

const authRoutes = ['/login', '/signup']
const privateRoutes = ['/private']
const adminRoutes = ['/admin']

export async function proxy(request: NextRequest) {
  //redirect response or nothing, in case of nothing do nothing, proceed as normal
  const response = (await proxyAuth(request)) ?? NextResponse.next()

  await updateUserSessionExpiration({
    set: (key, value, options) => {
      response.cookies.set({ ...options, name: key, value })
    },
    get: (key) => request.cookies.get(key),
  })

  return response
}

async function proxyAuth(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuthRoute = authRoutes.includes(path)
  const isPrivateRoute = privateRoutes.includes(path)
  const isAdminRoute = adminRoutes.includes(path)
  if (!isAuthRoute && !isPrivateRoute && !isAdminRoute) return

  const user = await getUserFromSession()

  if (isPrivateRoute || isAdminRoute) {
    if (!user) {
      return NextResponse.redirect(new URL('/login', request.url))
    }
    if (isAdminRoute && user.role !== 'ADMIN') {
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  if (isAuthRoute && user) {
    return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
}

import { NextRequest, NextResponse } from 'next/server'
import { getUserFromSession, updateUserSessionExpiration } from './features/auth/utils/session'

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
  if (privateRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession()
    if (!user) return NextResponse.redirect(new URL('/login', request.url))
  }

  if (adminRoutes.includes(request.nextUrl.pathname)) {
    const user = await getUserFromSession()
    if (!user) return NextResponse.redirect(new URL('/login', request.url))
    //does this redirect load the page? i guess not, cuz it's a proxy
    if (user.role !== 'ADMIN') return NextResponse.redirect(new URL('/', request.url))
  }
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
    // Always run for Clerk-specific frontend API routes
    '/__clerk/(.*)',
  ],
}

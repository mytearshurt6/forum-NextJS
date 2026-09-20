import 'server-only' // why(forgot)
import { cookies } from 'next/headers'
import { SESSION_COOKIE, SESSION_TTL } from '../constants'
import { UserRole } from '@/generated/prisma/enums'
import z from 'zod'
import crypto from 'crypto'
import { redisClient } from '@/redis/redis'

export interface CookieAdapter {
  get: (key: string) => { name: string; value: string } | undefined
  set(
    key: string,
    value: string,
    options: {
      httpOnly?: boolean
      secure?: boolean
      sameSite?: 'lax' | 'strict' | 'none'
      path?: string
      maxAge?: number
    },
  ): void
}

const sessionSchema = z.object({
  id: z.string(),
  role: z.enum(UserRole),
})

type UserSession = z.infer<typeof sessionSchema>

export async function createSession(user: UserSession) {
  const sessionId = crypto.randomBytes(512).toString('hex').normalize()

  //better than plain db cuz auto-deletes on expiry
  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_TTL,
  })

  const store = await cookies()
  store.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  })
}

export async function getUserFromSession() {
  const store = await cookies()
  const sessionId = store.get(SESSION_COOKIE)?.value
  if (!sessionId) return null

  //no need to be async, if all lthe async would've been here
  return getUserSessionById(sessionId)
}

export async function getUserSessionById(sessionId: string) {
  const rawUser = await redisClient.get(`session:${sessionId}`)

  const { success, data: user } = sessionSchema.safeParse(rawUser)

  return success ? user : null
}

export async function updateUserSessionData(user: UserSession) {
  const store = await cookies()
  const sessionId = store.get(SESSION_COOKIE)?.value
  if (!sessionId) return null

  await redisClient.set(`session:${sessionId}`, sessionSchema.parse(user), {
    ex: SESSION_TTL,
  })
}

export async function updateUserSessionExpiration(cookies: CookieAdapter) {
  const sessionId = cookies.get(SESSION_COOKIE)?.value
  if (!sessionId) return null //mb just return

  const user = await getUserSessionById(sessionId)
  if (!user) return null

  //why there's no safe parse here(55)
  await redisClient.set(`session:${sessionId}`, user, {
    ex: SESSION_TTL,
  })

  cookies.set(SESSION_COOKIE, sessionId, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_TTL,
  })
}

export async function destroySession() {
  const store = await cookies()
  const sessionId = store.get(SESSION_COOKIE)?.value
  if (!sessionId) return null

  await redisClient.del(`session:${sessionId}`)
  store.delete(SESSION_COOKIE)
}

//fix the function namings

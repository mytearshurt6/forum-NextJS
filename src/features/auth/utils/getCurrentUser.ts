import { getUserFromSession } from './session'
import { cache } from 'react'
import { redirect } from 'next/navigation'
import { prisma } from '@/lib/prisma'

type FullUser = Exclude<Awaited<ReturnType<typeof getUserFromDb>>, undefined | null>

type User = Exclude<Awaited<ReturnType<typeof getUserFromSession>>, undefined | null>

//this complex typing in ok/necessary when writing library-lvl complex code
function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound: true
}): Promise<FullUser>
function _getCurrentUser(options: {
  withFullUser: true
  redirectIfNotFound?: false
}): Promise<FullUser | null>
function _getCurrentUser(options: { withFullUser?: false; redirectIfNotFound: true }): Promise<User>
function _getCurrentUser(options?: {
  withFullUser?: false
  redirectIfNotFound?: false
}): Promise<User | null>
async function _getCurrentUser({ withFullUser = false, redirectIfNotFound = false } = {}) {
  const user = await getUserFromSession()

  if (user == null) {
    if (redirectIfNotFound) return redirect('/login')
    return null
  }

  if (withFullUser) {
    const fullUser = await getUserFromDb(user.id)
    // This should never happen
    if (fullUser == null) throw new Error('User not found in database')
    return fullUser
  }

  return user
}

//if we call this multiple times in one instance, it accesses the db/cookies once
export const getCurrentUser = cache(_getCurrentUser)

//in case we need extra data
function getUserFromDb(id: string) {
  return prisma.user.findFirst({
    where: { id },
    select: { id: true, email: true, role: true, username: true },
  })
}

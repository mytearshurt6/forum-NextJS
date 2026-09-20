'use server'

import { updateUserSessionData } from '../utils/session'
import { getCurrentUser } from '../utils/getCurrentUser'
import { prisma } from '@/lib/prisma'

export async function toggleRoleAction() {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  const updatedUser = await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      role: user.role === 'ADMIN' ? 'USER' : 'ADMIN',
    },
    select: { id: true, role: true },
  })

  await updateUserSessionData(updatedUser)
}

'use server'

import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import { createSession } from '../utils/session'
import { verifyPassword } from '../utils/passwordHasher'
import { redirect } from 'next/navigation'

const loignSchema = z.object({
  identifier: z.string().min(3).max(30),
  password: z.string().min(8).max(64),
})

export type LoginState = { error: string }

export async function loginAction(formData: FormData): Promise<LoginState> {
  const parsed = loignSchema.safeParse({
    identifier: formData.get('identifier'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { identifier, password } = parsed.data
  const isEmail = identifier.includes('@')
  const normalizedIdentifier = identifier.trim()

  const user = await prisma.user.findFirst({
    where: isEmail ? { email: normalizedIdentifier } : { username: normalizedIdentifier },
    select: { id: true, email: true, passwordHash: true, role: true },
  })

  if (!user) return { error: 'Invalid credentials' }

  const isCorrectPassword = await verifyPassword(password, user.passwordHash)
  if (!isCorrectPassword) return { error: 'Invalid credentials' }

  //TODO: 2:09(do i need try/catch for this?)
  await createSession(user)

  redirect('/')
}

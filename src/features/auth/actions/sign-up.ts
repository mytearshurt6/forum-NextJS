'use server'

import { prisma } from '@/lib/prisma'
import { signUpServerSchema } from '../schemas/sign-up'
import { hashPassword } from '../utils/passwordHasher'
import { redirect } from 'next/navigation'
import { createSession } from '../utils/session'

export type SignUpState = { error: string }

export async function signUpAction(formData: FormData): Promise<SignUpState> {
  const parsed = signUpServerSchema.safeParse({
    username: formData.get('username'),
    email: formData.get('email'),
    password: formData.get('password'),
  })

  if (!parsed.success) {
    return { error: parsed.error.issues[0]?.message ?? 'Invalid input' }
  }

  const { username, email, password } = parsed.data
  const normalizedEmail = email.trim()

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email: normalizedEmail }, { username }],
    },
    select: { email: true, username: true },
  })

  if (existingUser) {
    if (existingUser.email === normalizedEmail) return { error: 'Email already in use' }
    return { error: 'Username already taken' }
  }

  try {
    const passwordHash = await hashPassword(password)

    const user = await prisma.user.create({
      data: {
        email: normalizedEmail,
        username,
        passwordHash,
      },
      select: { id: true, role: true },
    })

    // TODO: const headerList = await headers()

    await createSession(
      user,
      // TODO: userAgent: headerList.get('user-agent'),
      // TODO: ipAddress: headerList.get('x-forwarded-for'),
    )
  } catch {
    return { error: 'Could not create account. Try again.' }
  }

  redirect('/') // TODO: either redirect to login, or log in the user authomatically
}

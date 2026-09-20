import z from 'zod'

const identifierField = z
  .string()
  .min(3, 'Username or email must be at least 3 characters long.')
  .max(254, 'Username or email must be at most 254 characters long.')

const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .max(64, 'Password must be at most 64 characters long.')

export const loginClientSchema = z.object({
  identifier: identifierField,
  password: passwordField,
})

export type LoginClientSchema = z.infer<typeof loginClientSchema>

export const loginServerSchema = z.object({
  identifier: identifierField,
  password: passwordField,
})

export type LoginServerSchema = z.infer<typeof loginServerSchema>

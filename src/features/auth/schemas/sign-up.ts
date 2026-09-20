import z from 'zod'

const emailField = z.email()
const usernameField = z
  .string()
  .min(3, 'Username must be at least 3 characters long.')
  .max(30, 'Username must be at most 30 characters long.')
const passwordField = z
  .string()
  .min(8, 'Password must be at least 8 characters long.')
  .max(64, 'Password must be at most 64 characters long.')

export const signUpClientSchema = z
  .object({
    email: emailField,
    username: usernameField,
    password: passwordField,
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match",
    path: ['confirmPassword'],
  })

export type SignUpClientSchema = z.infer<typeof signUpClientSchema>

export const signUpServerSchema = z.object({
  email: emailField,
  username: usernameField,
  password: passwordField,
})

export type SignUpServerSchema = z.infer<typeof signUpServerSchema>

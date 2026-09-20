'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { signUpClientSchema, type SignUpClientSchema } from '@/features/auth/schemas/sign-up'
import { signUpAction } from '@/features/auth/actions/sign-up'
import Link from 'next/link'

// (value) => value.every((addon) => addons.some((a) => a.id === addon)),
export function SignUpForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const form = useForm<SignUpClientSchema>({
    resolver: zodResolver(signUpClientSchema),
    defaultValues: {
      email: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
  })

  async function onSubmit(data: SignUpClientSchema) {
    setServerError(null)
    setIsPending(true)

    const formData = new FormData()
    formData.append('username', data.username)
    formData.append('email', data.email)
    formData.append('password', data.password)

    const result = await signUpAction(formData)
    setIsPending(false)

    if (result.error) {
      setServerError(result.error)
    }
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Sign Up</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="signup" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              name="username"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-username">Username</FieldLabel>
                  <Input
                    {...field}
                    id="signup-username"
                    aria-invalid={fieldState.invalid}
                    placeholder="kitty66"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    aria-describedby={fieldState.error ? 'username-error' : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="username-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-email">Email</FieldLabel>
                  <Input
                    {...field}
                    id="signup-email"
                    aria-invalid={fieldState.invalid}
                    placeholder="example@example.com"
                    autoComplete="email"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                    aria-describedby={fieldState.error ? 'email-error' : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="email-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            {/* <FieldSeparator /> */}
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-password">Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="signup-password"
                    aria-invalid={fieldState.invalid}
                    placeholder="Min. 8 characters"
                    autoComplete="new-password"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-describedby={fieldState.error ? 'password-error' : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="password-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="confirmPassword"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="signup-confirmPassword">Confirm Password</FieldLabel>
                  <Input
                    {...field}
                    type="password"
                    id="signup-confirmPassword"
                    aria-invalid={fieldState.invalid}
                    autoComplete="new-password"
                    autoCapitalize="none"
                    spellCheck={false}
                    aria-describedby={fieldState.error ? 'confirm-password-error' : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="confirm-password-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
          </FieldGroup>
        </form>
        {serverError && (
          <p role="alert" className="mt-4 text-sm text-destructive">
            {serverError}
          </p>
        )}
      </CardContent>
      <CardFooter>
        <Field orientation="vertical">
          <FieldDescription className="text-white [&>a:hover]:text-white">
            {/* man i hate shadcn+tailwind for not caring about WCAG contrast reccomendations */}
            Already have an account?{' '}
            <Link href="/login" className="underline">
              Log In
            </Link>
          </FieldDescription>
          <div className="flex gap-2">
            <Button
              className="px-7.5 py-5"
              type="button"
              variant="outline"
              onClick={() => form.reset()}>
              Reset
            </Button>
            <Button className="px-7.5 py-5" type="submit" form="signup" disabled={isPending}>
              {isPending ? 'Creating account…' : 'Submit'}
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}

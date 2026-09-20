'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { Controller, useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldError, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { loginClientSchema, LoginClientSchema } from '@/features/auth/schemas/login'
import { useState } from 'react'
import { loginAction } from '@/features/auth/actions/login'
import Link from 'next/link'

export function LoginForm() {
  const [serverError, setServerError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const form = useForm<LoginClientSchema>({
    resolver: zodResolver(loginClientSchema),
    defaultValues: {
      identifier: '',
      password: '',
    },
  })

  async function onSubmit(data: LoginClientSchema) {
    setServerError(null)
    setIsPending(true)

    const formData = new FormData()
    formData.append('identifier', data.identifier)
    formData.append('password', data.password)

    const result = await loginAction(formData)
    setIsPending(false)

    if ('error' in result) setServerError(result.error)
  }

  return (
    <Card className="w-full sm:max-w-md">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-semibold">Log In</CardTitle>
      </CardHeader>
      <CardContent>
        <form id="login" onSubmit={form.handleSubmit(onSubmit)} noValidate>
          <FieldGroup>
            <Controller
              name="identifier"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="login-identifier">Username or email</FieldLabel>
                  <Input
                    {...field}
                    id="login-identifier"
                    aria-invalid={fieldState.invalid}
                    placeholder="kitty66 or you@example.com"
                    autoComplete="username"
                    autoCapitalize="none"
                    autoCorrect="off"
                    spellCheck={false}
                    inputMode="email"
                    aria-describedby={fieldState.error ? 'identifier-error' : undefined}
                  />
                  {fieldState.invalid && (
                    <FieldError id="identifier-error" errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <div className="flex justify-between items-center">
                    <FieldLabel htmlFor="login-password">Password</FieldLabel>
                    <FieldDescription className="text-white [&>a:hover]:text-white">
                      <a href="#" className="underline">
                        Forgot password?
                      </a>
                    </FieldDescription>
                  </div>
                  <Input
                    {...field}
                    type="password"
                    id="login-password"
                    aria-invalid={fieldState.invalid}
                    autoComplete="current-password"
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
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="underline">
              Sign Up
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
            <Button className="px-7.5 py-5" type="submit" form="login" disabled={isPending}>
              {isPending ? 'Logging in…' : 'Submit'}
            </Button>
          </div>
        </Field>
      </CardFooter>
    </Card>
  )
}

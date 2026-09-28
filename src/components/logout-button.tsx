'use client'

import { useFormStatus } from 'react-dom'
import { logoutAction } from '@/features/auth/actions/logout'
import { Button } from '@/components/ui/button'

function SubmitButton() {
  const { pending } = useFormStatus()
  return (
    <Button type="submit" variant="outline" disabled={pending} className="h-10 px-5">
      {pending ? 'Logging out…' : 'Log out'}
    </Button>
  )
}

export function LogoutButton() {
  return (
    <form action={logoutAction}>
      <SubmitButton />
    </form>
  )
}

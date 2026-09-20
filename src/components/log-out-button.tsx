'use client'

import { logoutAction } from '@/features/auth/actions/logout'
import { Button } from './ui/button'

export function LogOutButton() {
  return (
    <form action={logoutAction}>
      <Button type="submit" variant="destructive">
        Log Out
      </Button>
    </form>
  )
}

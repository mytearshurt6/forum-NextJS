'use client'

import { toggleRoleAction } from '@/features/auth/actions/toggle-role'
import { Button } from './ui/button'

export function ToggleRoleButton() {
  return <Button onClick={toggleRoleAction}>Toggle Role</Button>
}

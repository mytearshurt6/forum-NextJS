'use server'

import { redirect } from 'next/navigation'
import { destroySession } from '../utils/session'

export async function logoutAction() {
  await destroySession()
  redirect('/')
}

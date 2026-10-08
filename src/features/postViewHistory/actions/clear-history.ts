'use server'

import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import { clearRecentlyViewedPosts } from '@/lib/recentlyViewedPosts'
import { revalidatePath } from 'next/cache'

export async function clearHistoryAction() {
  const user = await getCurrentUser()
  if (!user) return { error: 'Not logged in' }

  await clearRecentlyViewedPosts(user.id)
  revalidatePath('/')

  return { success: true }
}

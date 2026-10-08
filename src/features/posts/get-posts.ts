'use server'

import { getPosts } from '@/lib/posts'
import { getCurrentUser } from '../auth/utils/getCurrentUser'

export async function loadMorePostsAction({
  cursor,
  communityId,
}: {
  cursor: string
  communityId?: string
}) {
  const user = await getCurrentUser()
  return getPosts({ cursor, communityId, userId: user?.id })
}

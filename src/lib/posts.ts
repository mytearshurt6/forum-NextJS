import 'server-only'
import { prisma } from '@/lib/prisma'

const PAGE_SIZE = 20

export async function getPosts({
  communityId,
  cursor,
  userId,
}: {
  communityId?: string
  cursor?: string
  userId?: string
} = {}) {
  const posts = await prisma.post.findMany({
    where: {
      deletedAt: null,
      ...(communityId ? { communityId } : {}),
    },
    orderBy: { createdAt: 'desc' },
    take: PAGE_SIZE + 1,
    ...(cursor ? { cursor: { id: cursor }, skip: 1 } : {}),

    select: {
      id: true,
      title: true,
      slug: true,
      upvoteCount: true,
      downvoteCount: true,
      createdAt: true,
      community: { select: { id: true, name: true, slug: true, communityLogo: true } },
      attachments: { take: 1, orderBy: { order: 'asc' }, select: { url: true, altText: true } },
      votes: {
        where: { userId: userId ?? '00000000-0000-0000-0000-000000000000' },
        select: { value: true },
      },
      _count: { select: { comments: true } },
    },
  })

  const hasMore = posts.length > PAGE_SIZE
  const items = hasMore ? posts.slice(0, PAGE_SIZE) : posts
  const nextCursor = hasMore ? items[items.length - 1].id : null

  return { items, nextCursor }
}

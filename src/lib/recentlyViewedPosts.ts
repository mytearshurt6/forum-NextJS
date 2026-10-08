import 'server-only'
import { prisma } from '@/lib/prisma'
import { redisClient } from '@/redis/redis'
import { after } from 'next/server'
import { VIEW_LIMIT, VIEW_TTL } from '@/features/auth/constants'

export async function addPostOnView(userId: string, postId: string) {
  const key = `user:${userId}:recently-viewed`
  after(async () => {
    try {
      await redisClient.zadd(key, { score: Date.now(), member: postId })
      await redisClient.zremrangebyrank(key, 0, -(VIEW_LIMIT + 1))
      await redisClient.expire(key, VIEW_TTL)
    } catch (err) {
      console.error('Failed to record post view', err)
    }
  })
}

export async function getViewedPosts(userId: string) {
  const ids = await redisClient.zrange<string[]>(`user:${userId}:recently-viewed`, 0, 19, {
    rev: true,
  })
  if (ids.length === 0) return []

  const posts = await prisma.post.findMany({
    where: { id: { in: ids }, deletedAt: null },
    select: {
      id: true,
      title: true,
      slug: true,
      upvoteCount: true,
      downvoteCount: true,
      createdAt: true,

      community: {
        select: {
          id: true,
          name: true,
          slug: true,
          communityLogo: true,
        },
      },

      attachments: {
        take: 1,
        orderBy: { order: 'asc' },
        select: { url: true, altText: true },
      },

      _count: {
        select: {
          comments: true,
          attachments: true,
        },
      },
    },
  })

  const postsById = new Map(posts.map((p) => [p.id, p]))
  const ordered = []
  for (const id of ids) {
    const post = postsById.get(id)
    if (post) ordered.push(post)
  }
  return ordered
}

export async function clearRecentlyViewedPosts(userId: string) {
  await redisClient.del(`user:${userId}:recently-viewed`)
}

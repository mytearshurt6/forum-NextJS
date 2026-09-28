import { getUserFromSession } from '@/features/auth/utils/session'
import { prisma } from './prisma'

export async function getUserCommunities() {
  const user = await getUserFromSession()
  if (!user) return []

  const memberships = await prisma.communityMember.findMany({
    where: { userId: user.id },
    select: {
      role: true,
      joinedAt: true,
      community: true,
    },
    orderBy: { joinedAt: 'desc' },
  })

  return memberships.map((m) => ({
    ...m.community,
    memberRole: m.role,
    joinedAt: m.joinedAt,
  }))
}

export async function getPopularCommunities(limit = 10) {
  return prisma.community.findMany({
    where: { deletedAt: null },
    orderBy: {
      members: { _count: 'desc' },
    },
    take: limit,
    include: {
      _count: { select: { members: true, posts: true } },
    },
  })
}

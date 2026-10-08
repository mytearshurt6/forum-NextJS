import bcrypt from 'bcryptjs'
import { prisma } from '../src/lib/prisma'

async function main() {
  console.log('Clearing existing data...')
  // Delete in order to respect foreign keys
  await prisma.postReport.deleteMany()
  await prisma.commentReport.deleteMany()
  await prisma.communityReport.deleteMany()
  await prisma.userReport.deleteMany()
  await prisma.commentVote.deleteMany()
  await prisma.postVote.deleteMany()
  await prisma.commentAttachment.deleteMany()
  await prisma.postAttachment.deleteMany()
  await prisma.comment.deleteMany()
  await prisma.post.deleteMany()
  await prisma.communityMember.deleteMany()
  await prisma.community.deleteMany()
  await prisma.user.deleteMany()

  console.log('Seeding users...')
  const passwordHash = await bcrypt.hash('password123', 12)

  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      username: 'admin',
      passwordHash,
      profilePicture: 'https://i.pravatar.cc/150?img=1',
      role: 'ADMIN',
    },
  })

  const moderator = await prisma.user.create({
    data: {
      email: 'moderator@example.com',
      username: 'moderator',
      passwordHash,
      profilePicture: 'https://i.pravatar.cc/150?img=2',
      role: 'USER',
    },
  })

  const user1 = await prisma.user.create({
    data: {
      email: 'user1@example.com',
      username: 'user1',
      passwordHash,
      profilePicture: 'https://i.pravatar.cc/150?img=3',
      role: 'USER',
    },
  })

  const user2 = await prisma.user.create({
    data: {
      email: 'user2@example.com',
      username: 'user2',
      passwordHash,
      profilePicture: 'https://i.pravatar.cc/150?img=4',
      role: 'USER',
    },
  })

  const user3 = await prisma.user.create({
    data: {
      email: 'user3@example.com',
      username: 'user3',
      passwordHash,
      profilePicture: 'https://i.pravatar.cc/150?img=5',
      role: 'USER',
    },
  })

  console.log('Seeding communities...')
  const techCommunity = await prisma.community.create({
    data: {
      name: 'Technology',
      slug: 'technology',
      category: 'Tech',
      description: 'All about technology, programming, and gadgets.',
      communityLogo: 'https://i.pravatar.cc/150?img=1',
      creatorId: admin.id,
    },
  })

  const gamingCommunity = await prisma.community.create({
    data: {
      name: 'Gaming',
      slug: 'gaming',
      category: 'Gaming',
      description: 'Discuss games, consoles, and PC gaming.',
      communityLogo: 'https://i.pravatar.cc/150?img=1',
      creatorId: user1.id,
    },
  })

  const scienceCommunity = await prisma.community.create({
    data: {
      name: 'Science',
      slug: 'science',
      category: 'Science',
      description: 'Explore science, space, and nature.',
      communityLogo: 'https://i.pravatar.cc/150?img=1',
      creatorId: moderator.id,
    },
  })

  console.log('Seeding community members...')
  // Admin is creator and admin of Technology
  await prisma.communityMember.create({
    data: {
      communityId: techCommunity.id,
      userId: admin.id,
      role: 'ADMIN',
    },
  })
  // Moderator as moderator in Technology
  await prisma.communityMember.create({
    data: {
      communityId: techCommunity.id,
      userId: moderator.id,
      role: 'MODERATOR',
    },
  })
  // User1 as member
  await prisma.communityMember.create({
    data: {
      communityId: techCommunity.id,
      userId: user1.id,
      role: 'MEMBER',
    },
  })
  // User2 as member in Gaming
  await prisma.communityMember.create({
    data: {
      communityId: gamingCommunity.id,
      userId: user2.id,
      role: 'MEMBER',
    },
  })
  // User1 as admin in Gaming
  await prisma.communityMember.create({
    data: {
      communityId: gamingCommunity.id,
      userId: user1.id,
      role: 'ADMIN',
    },
  })
  // Moderator as member in Science
  await prisma.communityMember.create({
    data: {
      communityId: scienceCommunity.id,
      userId: moderator.id,
      role: 'MEMBER',
    },
  })

  console.log('Seeding posts...')
  const post1 = await prisma.post.create({
    data: {
      title: 'What is your favorite programming language?',
      content: 'I love TypeScript for its type safety and ecosystem.',
      slug: 'favorite-programming-language',
      upvoteCount: 5,
      downvoteCount: 3,
      authorId: user1.id,
      communityId: techCommunity.id,
    },
  })

  const post2 = await prisma.post.create({
    data: {
      title: 'Best games of 2024',
      content: "Elden Ring DLC, Baldur's Gate 3, and more!",
      slug: 'best-games-2024',
      upvoteCount: 2,
      downvoteCount: 9,
      authorId: user2.id,
      communityId: gamingCommunity.id,
    },
  })

  const post3 = await prisma.post.create({
    data: {
      title: 'Latest discoveries in astronomy',
      content: 'James Webb telescope finds new exoplanet.',
      slug: 'latest-astronomy',
      upvoteCount: 22,
      downvoteCount: 5,
      authorId: moderator.id,
      communityId: scienceCommunity.id,
    },
  })

  console.log('Seeding comments...')
  const comment1 = await prisma.comment.create({
    data: {
      content: 'Rust is gaining popularity for systems programming.',
      postId: post1.id,
      authorId: moderator.id,
    },
  })

  const comment2 = await prisma.comment.create({
    data: {
      content: 'TypeScript is indeed awesome!',
      postId: post1.id,
      authorId: user3.id,
    },
  })

  // Nested reply to comment1
  const reply1 = await prisma.comment.create({
    data: {
      content: 'True, Rust is great for performance.',
      postId: post1.id,
      authorId: user2.id,
      parentId: comment1.id,
    },
  })

  const comment3 = await prisma.comment.create({
    data: {
      content: "I can't wait for the next Cyberpunk update.",
      postId: post2.id,
      authorId: user1.id,
    },
  })

  console.log('Seeding votes...')
  // Post votes
  await prisma.postVote.create({
    data: {
      value: 1,
      userId: user2.id,
      postId: post1.id,
    },
  })
  await prisma.postVote.create({
    data: {
      value: 1,
      userId: user3.id,
      postId: post1.id,
    },
  })
  await prisma.postVote.create({
    data: {
      value: 1,
      userId: user1.id,
      postId: post2.id,
    },
  })
  await prisma.postVote.create({
    data: {
      value: -1,
      userId: moderator.id,
      postId: post2.id,
    },
  })

  // Comment votes
  await prisma.commentVote.create({
    data: {
      value: 1,
      userId: user1.id,
      commentId: comment1.id,
    },
  })
  await prisma.commentVote.create({
    data: {
      value: 1,
      userId: user3.id,
      commentId: comment2.id,
    },
  })

  console.log('Seeding attachments...')
  await prisma.postAttachment.create({
    data: {
      postId: post1.id,
      url: 'https://picsum.photos/400/200',
      altText: 'Programming image',
      order: 0,
    },
  })

  await prisma.commentAttachment.create({
    data: {
      commentId: comment1.id,
      url: 'https://picsum.photos/100/100',
      altText: 'Small image',
      order: 0,
    },
  })

  console.log('Seeding reports...')
  await prisma.postReport.create({
    data: {
      reporterId: user2.id,
      postId: post3.id,
      reason: 'Spam content',
      status: 'OPEN',
    },
  })

  await prisma.commentReport.create({
    data: {
      reporterId: user1.id,
      commentId: comment3.id,
      reason: 'Offensive language',
      status: 'OPEN',
    },
  })

  await prisma.communityReport.create({
    data: {
      reporterId: user3.id,
      communityId: gamingCommunity.id,
      reason: 'Inappropriate content',
      status: 'OPEN',
    },
  })

  await prisma.userReport.create({
    data: {
      reporterId: moderator.id,
      reportedUserId: user2.id,
      reason: 'Harassment',
      status: 'OPEN',
    },
  })

  console.log('Seed completed successfully.')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

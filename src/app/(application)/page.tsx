import { LogoutButton } from '@/app/(application)/components/logout-button'
import { RecentlyViewedPosts } from './components/recently-viewed-posts'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import Link from 'next/link'
import { PostList } from './components/post-list'
import { getPosts } from '@/lib/posts'

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true })
  // const { items, nextCursor } = await getPosts({userId: user?.id})
  const nextCursor = null
  const items: {
    id: string
    createdAt: Date
    _count: {
      comments: number
    }
    title: string
    slug: string
    upvoteCount: number
    downvoteCount: number
    community: {
      id: string
      name: string
      slug: string
      communityLogo: string
    }
    votes: {
      value: 1 | -1
    }[]
    attachments: {
      url: string
      altText: string | null
    }[]
  }[] = [
    {
      id: 'post-001',
      createdAt: new Date('2026-10-02T12:00:00Z'),
      _count: { comments: 24 },
      title:
        'What programming language are you learning right now? What programming language are you learning right now? What programming language are you learning right now?What programming language are you learning right now?What programming language are you learning right now? What programming language are you learning right now?',
      slug: 'what-programming-language-are-you-learning-right-now',
      upvoteCount: 142,
      downvoteCount: 7,
      community: {
        id: 'community-001',
        name: 'Programmingaaaaaaaaaaaaaaaaaaaaaa',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: 1 }],
      attachments: [
        {
          url: 'https://picsum.photos/1002?grayscale',
          altText: 'Programming setup',
        },
      ],
    },
    {
      id: 'post-002',
      createdAt: new Date('2026-10-02T11:30:00Z'),
      _count: { comments: 18 },
      title: 'PostgreSQL indexing strategies that actually helped',
      slug: 'postgresql-indexing-strategies-that-actually-helped',
      upvoteCount: 98,
      downvoteCount: 4,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Database diagram',
        },
      ],
    },
    {
      id: 'post-003',
      createdAt: new Date('2026-10-02T11:00:00Z'),
      _count: { comments: 61 },
      title: "What's the best game you've played this year?",
      slug: 'whats-the-best-game-youve-played-this-year',
      upvoteCount: 231,
      downvoteCount: 15,
      community: {
        id: 'community-002',
        name: 'Gaming',
        slug: 'gaming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Gaming setup',
        },
      ],
    },
    {
      id: 'post-004',
      createdAt: new Date('2026-10-02T10:20:00Z'),
      _count: { comments: 12 },
      title: 'Show me your desktop setup',
      slug: 'show-me-your-desktop-setup',
      upvoteCount: 176,
      downvoteCount: 9,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Desktop setup',
        },
      ],
    },
    {
      id: 'post-005',
      createdAt: new Date('2026-10-02T09:45:00Z'),
      _count: { comments: 37 },
      title: 'How do you stay focused while coding?',
      slug: 'how-do-you-stay-focused-while-coding',
      upvoteCount: 83,
      downvoteCount: 6,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Coding desk',
        },
      ],
    },
    {
      id: 'post-006',
      createdAt: new Date('2026-10-02T09:10:00Z'),
      _count: { comments: 45 },
      title: 'Albums that completely changed your taste in music',
      slug: 'albums-that-completely-changed-your-taste-in-music',
      upvoteCount: 154,
      downvoteCount: 8,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Music album artwork',
        },
      ],
    },
    {
      id: 'post-007',
      createdAt: new Date('2026-10-02T08:35:00Z'),
      _count: { comments: 29 },
      title: 'My first custom mechanical keyboard build',
      slug: 'my-first-custom-mechanical-keyboard-build',
      upvoteCount: 117,
      downvoteCount: 3,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Mechanical keyboard',
        },
      ],
    },
    {
      id: 'post-008',
      createdAt: new Date('2026-10-02T08:00:00Z'),
      _count: { comments: 53 },
      title: 'What are you building right now?',
      slug: 'what-are-you-building-right-now',
      upvoteCount: 126,
      downvoteCount: 5,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Software project',
        },
      ],
    },
    {
      id: 'post-009',
      createdAt: new Date('2026-10-02T07:20:00Z'),
      _count: { comments: 74 },
      title: 'Favorite single-player RPG of all time?',
      slug: 'favorite-single-player-rpg-of-all-time',
      upvoteCount: 203,
      downvoteCount: 11,
      community: {
        id: 'community-002',
        name: 'Gaming',
        slug: 'gaming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Role-playing game',
        },
      ],
    },
    {
      id: 'post-010',
      createdAt: new Date('2026-10-02T06:40:00Z'),
      _count: { comments: 16 },
      title: 'How I improved my guitar playing',
      slug: 'how-i-improved-my-guitar-playing',
      upvoteCount: 91,
      downvoteCount: 4,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Electric guitar',
        },
      ],
    },
    {
      id: 'post-011',
      createdAt: new Date('2026-10-02T05:55:00Z'),
      _count: { comments: 33 },
      title: 'Understanding React Server Components',
      slug: 'understanding-react-server-components',
      upvoteCount: 138,
      downvoteCount: 6,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'React development',
        },
      ],
    },
    {
      id: 'post-012',
      createdAt: new Date('2026-10-02T05:10:00Z'),
      _count: { comments: 82 },
      title: 'Best budget GPU right now',
      slug: 'best-budget-gpu-right-now',
      upvoteCount: 194,
      downvoteCount: 12,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Graphics card',
        },
      ],
    },
    {
      id: 'post-013',
      createdAt: new Date('2026-10-02T04:35:00Z'),
      _count: { comments: 21 },
      title: 'Science podcasts worth listening to',
      slug: 'science-podcasts-worth-listening-to',
      upvoteCount: 72,
      downvoteCount: 2,
      community: {
        id: 'community-005',
        name: 'Science',
        slug: 'science',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Science illustration',
        },
      ],
    },
    {
      id: 'post-014',
      createdAt: new Date('2026-10-02T04:00:00Z'),
      _count: { comments: 27 },
      title: 'How should a clean REST API be structured?',
      slug: 'how-should-a-clean-rest-api-be-structured',
      upvoteCount: 109,
      downvoteCount: 5,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'API architecture',
        },
      ],
    },
    {
      id: 'post-015',
      createdAt: new Date('2026-10-02T03:20:00Z'),
      _count: { comments: 48 },
      title: 'Which game soundtracks do you love?',
      slug: 'which-game-soundtracks-do-you-love',
      upvoteCount: 131,
      downvoteCount: 7,
      community: {
        id: 'community-002',
        name: 'Gaming',
        slug: 'gaming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Game soundtrack',
        },
      ],
    },
    {
      id: 'post-016',
      createdAt: new Date('2026-10-02T02:45:00Z'),
      _count: { comments: 39 },
      title: 'What is your favorite metal guitar riff?',
      slug: 'what-is-your-favorite-metal-guitar-riff',
      upvoteCount: 167,
      downvoteCount: 9,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Metal guitar',
        },
      ],
    },
    {
      id: 'post-017',
      createdAt: new Date('2026-10-02T02:05:00Z'),
      _count: { comments: 14 },
      title: 'My first open-source contribution',
      slug: 'my-first-open-source-contribution',
      upvoteCount: 84,
      downvoteCount: 1,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Open source contribution',
        },
      ],
    },
    {
      id: 'post-018',
      createdAt: new Date('2026-10-02T01:20:00Z'),
      _count: { comments: 57 },
      title: 'Show us your PC build',
      slug: 'show-us-your-pc-build',
      upvoteCount: 188,
      downvoteCount: 10,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Gaming PC build',
        },
      ],
    },
    {
      id: 'post-019',
      createdAt: new Date('2026-10-02T00:40:00Z'),
      _count: { comments: 31 },
      title: 'How do you organize large TypeScript projects?',
      slug: 'how-do-you-organize-large-typescript-projects',
      upvoteCount: 121,
      downvoteCount: 4,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'TypeScript project',
        },
      ],
    },
    {
      id: 'post-020',
      createdAt: new Date('2026-10-01T23:55:00Z'),
      _count: { comments: 43 },
      title: 'Which album changed your life?',
      slug: 'which-album-changed-your-life',
      upvoteCount: 149,
      downvoteCount: 6,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      votes: [{ value: -1 }],
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Music album',
        },
      ],
    },
  ]

  return (
    <div className="flex min-h-screen items-center justify-center py-4 sm:p-4 mt-18">
      <div className="flex min-h-screen w-full max-w-[1200px] justify-between items-start py-6 sm:px-4 md:px-16 gap-8">
        {/* {user && (
          <Card className="max-w-[500px] h-2000">
            <CardHeader>
              <CardTitle>User: {user.username}</CardTitle>
              <CardDescription>Role: {user.role}</CardDescription>
            </CardHeader>
            <CardFooter className="flex gap-4">
              <Button variant="outline">
                <Link href="/private">Private page</Link>
              </Button>
              {user.role === 'ADMIN' && (
                <Button variant="outline">
                  <Link href="/admin">Admin page</Link>
                </Button>
              )}
              <LogoutButton />
            </CardFooter>
          </Card>
        )} */}
        <PostList initialPosts={items} initialCursor={nextCursor} />
        <RecentlyViewedPosts />
      </div>
    </div>
  )
}

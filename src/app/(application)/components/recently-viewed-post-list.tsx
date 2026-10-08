import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import { getViewedPosts } from '@/lib/recentlyViewedPosts'
import { timeAgo } from '@/lib/time-ago'
import Image from 'next/image'
import Link from 'next/link'
import { Separator } from '@/components/ui/separator'
import { Fragment } from 'react/jsx-runtime'
import { bigNumberNormalizer } from '@/lib/big-number-normalizer'
import { CommunityPostInfo } from './community-post-info'

export async function RecentlyViewedPostList() {
  const user = await getCurrentUser()
  if (!user)
    return <p className="p-3 text-sm text-muted-foreground">Login to see recently viewed posts</p>

  //   const recentlyViewedPosts = await getViewedPosts(user.id)
  const recentlyViewedPosts: ({
    community: {
      name: string
      id: string
      slug: string
      createdAt: Date
      communityLogo: string
    }
    attachments: { url: string; altText: string }[]
    _count: {
      comments: number
      attachments: number
    }
  } & {
    id: string
    title: string
    content: string
    slug: string
    authorId: string | null
    communityId: string
    upvoteCount: number
    downvoteCount: number
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  })[] = [
    {
      id: 'post-001',
      title:
        "What's your favorite programming language? What's your favorite programming language? What's your favorite programming language? What's your favorite programming language?",
      content: "I've been using TypeScript a lot lately and really enjoy it.",
      slug: 'favorite-programming-language',
      authorId: 'user-001',
      communityId: 'community-001',
      upvoteCount: 1412,
      downvoteCount: 112,
      createdAt: new Date('2026-09-28T14:30:00Z'),
      updatedAt: new Date('2026-09-28T15:10:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://picsum.photos/318?greyscale',
      },
      attachments: [
        {
          url: 'https://picsum.photos/301?greyscale',
          altText: '',
        },
      ],
      _count: {
        comments: 8888,
        attachments: 2,
      },
    },
    {
      id: 'post-002',
      title: 'PostgreSQL indexing tips',
      content: 'What indexing strategies have made the biggest difference in your projects?',
      slug: 'postgresql-indexing-tips',
      authorId: 'user-002',
      communityId: 'community-001',
      upvoteCount: 9811112929,
      downvoteCount: 500000000,
      createdAt: new Date('2026-09-28T11:20:00Z'),
      updatedAt: new Date('2026-09-28T12:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://picsum.photos/311?greyscale',
      },
      attachments: [],
      _count: {
        comments: 21,
        attachments: 1,
      },
    },
    {
      id: 'post-003',
      title: "Best games you've played this year?",
      content: 'Looking for something new to play this weekend.',
      slug: 'best-games-this-year',
      authorId: 'user-003',
      communityId: 'community-002',
      upvoteCount: 231,
      downvoteCount: 19,
      createdAt: new Date('2026-09-27T20:15:00Z'),
      updatedAt: new Date('2026-09-28T08:45:00Z'),
      deletedAt: null,
      community: {
        id: 'community-002',
        name: 'Gaming',
        slug: 'gaming',
        createdAt: new Date('2025-02-15T12:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [
        {
          url: 'https://picsum.photos/201?greyscale',
          altText: '',
        },
      ],
      _count: {
        comments: 87,
        attachments: 4,
      },
    },
    {
      id: 'post-004',
      title: 'My first mechanical keyboard',
      content: "Finally built my first custom keyboard and I'm loving it.",
      slug: 'my-first-mechanical-keyboard',
      authorId: 'user-004',
      communityId: 'community-003',
      upvoteCount: 76,
      downvoteCount: 3,
      createdAt: new Date('2026-09-27T16:00:00Z'),
      updatedAt: new Date('2026-09-27T16:30:00Z'),
      deletedAt: null,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        createdAt: new Date('2025-03-01T09:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 14,
        attachments: 6,
      },
    },
    {
      id: 'post-005',
      title: 'How do you stay focused while coding?',
      content: 'Looking for practical ways to avoid distractions during long sessions.',
      slug: 'how-do-you-stay-focused-while-coding',
      authorId: 'user-005',
      communityId: 'community-001',
      upvoteCount: 64,
      downvoteCount: 6,
      createdAt: new Date('2026-09-27T12:40:00Z'),
      updatedAt: new Date('2026-09-27T13:10:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 19,
        attachments: 0,
      },
    },
    {
      id: 'post-006',
      title: 'Best albums for late-night listening',
      content: 'Drop your favorite atmospheric albums.',
      slug: 'best-albums-for-late-night-listening',
      authorId: 'user-006',
      communityId: 'community-004',
      upvoteCount: 119,
      downvoteCount: 4,
      createdAt: new Date('2026-09-26T23:30:00Z'),
      updatedAt: new Date('2026-09-27T00:20:00Z'),
      deletedAt: null,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        createdAt: new Date('2025-01-20T18:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 42,
        attachments: 3,
      },
    },
    {
      id: 'post-007',
      title: 'Show off your desk setup',
      content: "Here's my current setup after a few upgrades.",
      slug: 'show-off-your-desk-setup',
      authorId: 'user-007',
      communityId: 'community-003',
      upvoteCount: 187,
      downvoteCount: 11,
      createdAt: new Date('2026-09-26T18:45:00Z'),
      updatedAt: new Date('2026-09-26T19:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        createdAt: new Date('2025-03-01T09:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 51,
        attachments: 8,
      },
    },
    {
      id: 'post-008',
      title: 'What are you building right now?',
      content: "Share your side projects and what you've learned from them.",
      slug: 'what-are-you-building-right-now',
      authorId: 'user-008',
      communityId: 'community-001',
      upvoteCount: 91,
      downvoteCount: 2,
      createdAt: new Date('2026-09-26T14:10:00Z'),
      updatedAt: new Date('2026-09-26T15:45:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 27,
        attachments: 2,
      },
    },
    {
      id: 'post-009',
      title: 'Favorite single-player RPGs?',
      content: 'I want something immersive with a great story.',
      slug: 'favorite-single-player-rpgs',
      authorId: 'user-009',
      communityId: 'community-002',
      upvoteCount: 153,
      downvoteCount: 9,
      createdAt: new Date('2026-09-25T21:00:00Z'),
      updatedAt: new Date('2026-09-25T22:15:00Z'),
      deletedAt: null,
      community: {
        id: 'community-002',
        name: 'Gaming',
        slug: 'gaming',
        createdAt: new Date('2025-02-15T12:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 63,
        attachments: 1,
      },
    },
    {
      id: 'post-010',
      title: 'Learning guitar as an adult',
      content: 'What helped you improve the most during your first year?',
      slug: 'learning-guitar-as-an-adult',
      authorId: 'user-010',
      communityId: 'community-004',
      upvoteCount: 72,
      downvoteCount: 7,
      createdAt: new Date('2026-09-25T17:20:00Z'),
      updatedAt: new Date('2026-09-25T18:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        createdAt: new Date('2025-01-20T18:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 31,
        attachments: 2,
      },
    },
    {
      id: 'post-011',
      title: 'Understanding React Server Components',
      content: "I'm trying to understand when and why I'd use server components.",
      slug: 'understanding-react-server-components',
      authorId: 'user-011',
      communityId: 'community-001',
      upvoteCount: 132,
      downvoteCount: 4,
      createdAt: new Date('2026-09-25T12:30:00Z'),
      updatedAt: new Date('2026-09-25T14:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 38,
        attachments: 0,
      },
    },
    {
      id: 'post-012',
      title: 'Best budget GPU in 2026',
      content: 'Which GPU gives the best performance per dollar right now?',
      slug: 'best-budget-gpu-in-2026',
      authorId: 'user-012',
      communityId: 'community-003',
      upvoteCount: 205,
      downvoteCount: 13,
      createdAt: new Date('2026-09-24T19:10:00Z'),
      updatedAt: new Date('2026-09-24T20:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        createdAt: new Date('2025-03-01T09:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 76,
        attachments: 5,
      },
    },
    {
      id: 'post-013',
      title: 'Science podcasts worth listening to',
      content: 'Looking for interesting science podcasts for long walks.',
      slug: 'science-podcasts-worth-listening-to',
      authorId: null,
      communityId: 'community-005',
      upvoteCount: 58,
      downvoteCount: 1,
      createdAt: new Date('2026-09-24T14:45:00Z'),
      updatedAt: new Date('2026-09-24T15:15:00Z'),
      deletedAt: null,
      community: {
        id: 'community-005',
        name: 'Science',
        slug: 'science',
        createdAt: new Date('2025-02-05T11:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 12,
        attachments: 1,
      },
    },
    {
      id: 'post-014',
      title: 'Tips for writing clean APIs',
      content: 'What conventions have worked well for you when designing APIs?',
      slug: 'tips-for-writing-clean-apis',
      authorId: 'user-014',
      communityId: 'community-001',
      upvoteCount: 83,
      downvoteCount: 3,
      createdAt: new Date('2026-09-23T18:20:00Z'),
      updatedAt: new Date('2026-09-23T19:05:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 23,
        attachments: 2,
      },
    },
    {
      id: 'post-015',
      title: 'What game soundtracks do you love?',
      content: 'Some games have soundtracks that are better than the game itself.',
      slug: 'what-game-soundtracks-do-you-love',
      authorId: 'user-015',
      communityId: 'community-002',
      upvoteCount: 97,
      downvoteCount: 6,
      createdAt: new Date('2026-09-23T13:00:00Z'),
      updatedAt: new Date('2026-09-23T14:30:00Z'),
      deletedAt: null,
      community: {
        id: 'community-002',
        name: 'Gaming',
        slug: 'gaming',
        createdAt: new Date('2025-02-15T12:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 29,
        attachments: 3,
      },
    },
    {
      id: 'post-016',
      title: 'Favorite metal guitar riffs',
      content: 'Which riffs never get old for you?',
      slug: 'favorite-metal-guitar-riffs',
      authorId: 'user-016',
      communityId: 'community-004',
      upvoteCount: 164,
      downvoteCount: 10,
      createdAt: new Date('2026-09-22T22:10:00Z'),
      updatedAt: new Date('2026-09-22T23:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        createdAt: new Date('2025-01-20T18:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 46,
        attachments: 7,
      },
    },
    {
      id: 'post-017',
      title: 'My first open-source contribution',
      content: 'Finally submitted a PR to an open-source project.',
      slug: 'my-first-open-source-contribution',
      authorId: 'user-017',
      communityId: 'community-001',
      upvoteCount: 111,
      downvoteCount: 2,
      createdAt: new Date('2026-09-22T15:35:00Z'),
      updatedAt: new Date('2026-09-22T16:10:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 17,
        attachments: 1,
      },
    },
    {
      id: 'post-018',
      title: 'Show us your PC build',
      content: 'Just finished building my new PC and wanted to share it.',
      slug: 'show-us-your-pc-build',
      authorId: 'user-018',
      communityId: 'community-003',
      upvoteCount: 143,
      downvoteCount: 8,
      createdAt: new Date('2026-09-21T20:25:00Z'),
      updatedAt: new Date('2026-09-21T21:00:00Z'),
      deletedAt: null,
      community: {
        id: 'community-003',
        name: 'Hardware',
        slug: 'hardware',
        createdAt: new Date('2025-03-01T09:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 35,
        attachments: 9,
      },
    },
    {
      id: 'post-019',
      title: 'How do you organize large TypeScript projects?',
      content: 'Looking for folder structure and architecture ideas that scale.',
      slug: 'organize-large-typescript-projects',
      authorId: 'user-019',
      communityId: 'community-001',
      upvoteCount: 126,
      downvoteCount: 5,
      createdAt: new Date('2026-09-20T13:40:00Z'),
      updatedAt: new Date('2026-09-20T14:20:00Z'),
      deletedAt: null,
      community: {
        id: 'community-001',
        name: 'Programming',
        slug: 'programming',
        createdAt: new Date('2025-01-10T10:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 44,
        attachments: 0,
      },
    },
    {
      id: 'post-020',
      title: 'Albums that changed your taste in music',
      content: "What's one album that completely changed what you listen to?",
      slug: 'albums-that-changed-your-taste-in-music',
      authorId: 'user-020',
      communityId: 'community-004',
      upvoteCount: 154,
      downvoteCount: 7,
      createdAt: new Date('2026-09-19T19:50:00Z'),
      updatedAt: new Date('2026-09-19T21:10:00Z'),
      deletedAt: null,
      community: {
        id: 'community-004',
        name: 'Music',
        slug: 'music',
        createdAt: new Date('2025-01-20T18:00:00Z'),
        communityLogo: 'https://i.pravatar.cc/150?img=1',
      },
      attachments: [],
      _count: {
        comments: 52,
        attachments: 4,
      },
    },
  ]

  if (recentlyViewedPosts.length === 0)
    return <p className="p-2 text-sm text-muted-foreground">No recently viewed posts</p>

  return (
    //Fuck knows how max-h helped here
    <ul className="flex-1 min-h-0 p-3 overflow-y-auto scrollbar-on-hover">
      {recentlyViewedPosts.map((post, index) => (
        <Fragment key={post.id}>
          <li className="p-0.5">
            <div className="flex justify-between">
              <div className=" mr-2">
                <CommunityPostInfo
                  community={{
                    slug: post.community.slug,
                    name: post.community.name,
                    communityLogo: post.community.communityLogo,
                  }}
                  createdAt={post.createdAt}
                />
                <Link
                  //TODO: CHANGE THE LINK
                  href={`/c/${post.community.slug}`}
                  className="line-clamp-2 text-muted-foreground my-3 hover:underline">
                  {post.title}
                </Link>
              </div>
              {post.attachments[0] && (
                <Link href={`/c/${post.community.slug}`}>
                  <div className="relative h-[84px] w-[84px] overflow-hidden rounded-md">
                    <Image
                      src={post.attachments[0].url}
                      fill
                      alt={post.attachments[0].altText ?? ''}
                      sizes="84px"
                      className="object-cover"
                    />
                  </div>
                </Link>
              )}
            </div>
            <div className="flex items-center">
              <p className="text-xs">
                {bigNumberNormalizer(post.upvoteCount - post.downvoteCount)} upvotes
              </p>
              <span aria-hidden={true} className="mx-2 text-sm">
                &middot;
              </span>
              <p className="text-xs">{bigNumberNormalizer(post._count.comments)} comments</p>
            </div>
          </li>
          {index !== recentlyViewedPosts.length - 1 && <Separator className="w-full my-3" />}
        </Fragment>
      ))}
    </ul>
  )
}

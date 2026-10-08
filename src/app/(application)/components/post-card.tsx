import { CommunityPostInfo } from './community-post-info'
import { Post } from './post-list'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ElipsisControlsSvg } from '@/components/elipsis-controls-svg'
import { Flag } from 'lucide-react'
import Link from 'next/link'
import Image from 'next/image'
import { InteractionBlock } from './interaction-block'
import { env } from '@/data/env/client'

type Props = {
  post: Post
}

export function PostCard({ post }: Props) {
  return (
    <article className="relative hover:bg-accent-foreground/15 rounded-lg px-4 py-1">
      <div className="flex justify-between gap-2">
        <CommunityPostInfo
          community={{
            slug: post.community.slug,
            name: post.community.name,
            communityLogo: post.community.communityLogo,
          }}
          createdAt={post.createdAt}
          className="relative z-10 min-w-0"
        />
        <div className="relative z-10 flex gap-2">
          <Button variant="default" className="px-3">
            Join
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" aria-label="Open user actions" />}>
              <ElipsisControlsSvg />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Flag />
                Report
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
      <Link
        //TODO: CHANGE THE LINK
        href={`/c/${post.community.slug}/post/${post.slug}`}
        className="my-3 block text-lg font-semibold after:absolute after:inset-0 after:content-[''] after:z-1">
        {post.title}
      </Link>
      {post.attachments[0] && (
        <div className="border relative aspect-4/3 w-full overflow-hidden rounded-lg">
          {/* Blurry background */}
          <Image
            src={post.attachments[0].url}
            fill
            alt=""
            aria-hidden
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover blur-2xl scale-110"
          />

          {/* Main image */}
          <Image
            src={post.attachments[0].url}
            fill
            alt={`${post.attachments[0].altText}`}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-contain"
          />
        </div>
      )}
      <InteractionBlock
        postId={post.id}
        vote={post.upvoteCount - post.downvoteCount}
        userVote={post.votes[0]?.value}
        commentCount={post._count.comments}
        linkToCopy={`${env.NEXT_PUBLIC_APP_URL}/c/${post.community.slug}/post/${post.slug}`}
      />
    </article>
  )
}

/*
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
      attachments: [
        {
          url: 'https://i.pravatar.cc/150?img=1',
          altText: 'Music album',
        },
      ],
    } */

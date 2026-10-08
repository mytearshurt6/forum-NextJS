'use client'

import { loadMorePostsAction } from '@/features/posts/get-posts'
import { Fragment, useEffect, useRef, useState, useTransition } from 'react'
import { PostCard } from './post-card'
import { Separator } from '@/components/ui/separator'

export type Post = Awaited<ReturnType<typeof loadMorePostsAction>>['items'][number]

export function PostList({
  initialPosts,
  initialCursor,
  communityId,
}: {
  initialPosts: Post[]
  initialCursor: string | null
  communityId?: string
}) {
  const [posts, setPosts] = useState(initialPosts)
  const [cursor, setCursor] = useState(initialCursor)
  const [isPending, startTransition] = useTransition()
  const sentinel = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!cursor || isPending) return
    const el = sentinel.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        startTransition(async () => {
          const { items, nextCursor } = await loadMorePostsAction({ cursor, communityId })
          setPosts((prev) => [...prev, ...items])
          setCursor(nextCursor)
        })
      },
      { rootMargin: '200px' }, // start loading 200px before reaching the bottom
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [cursor, isPending, communityId])

  return (
    <div className="w-full">
      <div className="flex flex-col gap-1">
        {posts.map((post, index) => (
          <Fragment key={post.id}>
            {index === 0 && <Separator />}
            <PostCard post={post} />
            {index !== posts.length - 1 && <Separator />}
          </Fragment>
        ))}
      </div>
      {cursor && (
        <div ref={sentinel} className="h-10 flex items-center justify-center">
          {isPending && <span className="text-muted-foreground text-sm">Loading…</span>}
        </div>
      )}
      {!cursor && (
        <p className="text-center text-muted-foreground text-sm py-4">
          You&apos;ve reached the end
        </p>
      )}
    </div>
  )
}

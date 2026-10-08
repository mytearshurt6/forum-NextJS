'use client'

import { useOptimistic, useTransition } from 'react'
import { bigNumberNormalizer } from '@/lib/big-number-normalizer'
import { Button, buttonVariants } from '@/components/ui/button'
import { ArrowBigDown, ArrowBigUp } from 'lucide-react'
import { votePostAction } from '@/features/posts/actions/vote-post'
import { cn } from '@/lib/utils'

type Props = {
  postId: string
  vote: number
  userVote?: number
}

export function VoteBlock({ postId, vote, userVote }: Props) {
  const [isPending, startTransition] = useTransition()
  const [optimistic, setOptimistic] = useOptimistic(
    { vote, userVote },
    (current, nextVote: number | undefined) => {
      let vote = current.vote
      if (current.userVote === 1) vote -= 1
      if (current.userVote === -1) vote += 1
      if (nextVote === 1) vote += 1
      if (nextVote === -1) vote -= 1
      return { vote, userVote: nextVote }
    },
  )

  function handleVote(value: number) {
    startTransition(async () => {
      setOptimistic(optimistic.userVote === value ? undefined : value)
      await votePostAction({ postId, value })
    })
  }

  let bgColor = ''
  if (optimistic.userVote) {
    if (optimistic.userVote === 1) bgColor = 'bg-primary'
    else bgColor = 'bg-destructive'
  }

  //TODO: Add the actions for the buttons,
  return (
    <div className={cn(`relative z-10 flex items-center border rounded-lg mt-2 ${bgColor}`)}>
      <Button
        variant="ghost"
        className={`px-1.5 ${!optimistic.userVote && 'hover:text-primary'}`}
        disabled={isPending}
        onClick={() => handleVote(1)}
        aria-pressed={optimistic.userVote === 1}>
        <ArrowBigUp className="size-5" fill={optimistic.userVote === 1 ? '#ffffff' : 'none'} />
      </Button>
      <p className="text-xs font-semibold">{bigNumberNormalizer(optimistic.vote)}</p>
      <Button
        variant="ghost"
        className={`px-1.5 ${!optimistic.userVote && 'hover:text-destructive'}`}
        disabled={isPending}
        onClick={() => handleVote(-1)}
        aria-pressed={optimistic.vote === -1}>
        <ArrowBigDown className="size-5" fill={optimistic.userVote === -1 ? '#ffffff' : 'none'} />
      </Button>
    </div>
  )
}

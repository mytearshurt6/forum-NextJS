import { VoteBlock } from './vote-block'
import { Copy, MessageCircle, Share2 } from 'lucide-react'
import { bigNumberNormalizer } from '@/lib/big-number-normalizer'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Fragment } from 'react/jsx-runtime'
import { Button } from '@/components/ui/button'

type Props = {
  postId: string
  vote: number
  userVote?: number
  commentCount: number
  linkToCopy: string
}

export function InteractionBlock({ postId, vote, userVote, commentCount, linkToCopy }: Props) {
  return (
    <div className="flex gap-3">
      <VoteBlock postId={postId} vote={vote} userVote={userVote} />
      <div className="flex justify-center items-center border rounded-lg mt-2 px-1.5">
        <MessageCircle className="m-1.5 size-5" />
        <p className="text-xs font-semibold mr-1.5">{bigNumberNormalizer(commentCount)}</p>
      </div>
      <div className="relative z-10 flex justify-center items-center border rounded-lg mt-2">
        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                onClick={() => {
                  navigator.clipboard.writeText(linkToCopy)
                }}
                variant="ghost"
                className="px-1.5 hover:bg-none">
                <Share2 className="m-1.5 size-5" />
              </Button>
            }>
            <p className="text-xs font-semibold mr-1.5">Share</p>
          </DropdownMenuTrigger>
          <DropdownMenuContent side="top">
            <DropdownMenuItem>
              <Copy />
              Copy Link
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}

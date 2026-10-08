import { timeAgo } from '@/lib/time-ago'
import Image from 'next/image'
import Link from 'next/link'

type Props = {
  community: { slug: string; name: string; communityLogo: string }
  createdAt: Date
  className?: string
}

export function CommunityPostInfo({ community, createdAt, className }: Props) {
  return (
    <div className={`flex items-center text-sm ${className}`}>
      <Link href={`/c/${community.slug}`} className={`contents`}>
        <Image
          src={community.communityLogo}
          width="24"
          height="24"
          alt=""
          className="rounded-full me-2"
        />
        <div className="min-w-0 whitespace-nowrap text-ellipsis overflow-hidden">
          {community.name}
        </div>
      </Link>
      <span aria-hidden={true} className="mx-2 text-sm">
        &middot;
      </span>
      <p className="text-sm whitespace-nowrap">{timeAgo(createdAt)}</p>
    </div>
  )
}

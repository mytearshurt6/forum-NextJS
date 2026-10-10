import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import { ClearPostHistoryButton } from './clear-post-history-button'
import { RecentlyViewedPostList } from './recently-viewed-post-list'
import { Separator } from '@/components/ui/separator'
import { TypographyH3 } from '@/components/ui/typography-h3'

export async function RecentlyViewedPosts() {
  //React cache baby, we're getting cached data here
  const user = await getCurrentUser()

  return (
    <aside
      className={`hidden lg:flex none sticky top-(--header-height) min-w-0 w-80 max-w-80 ${user ? 'h-[calc(100dvh-var(--header-height))]' : ''} border rounded-lg flex flex-col`}>
      <div className="flex justify-between items-center px-8 py-4">
        <TypographyH3>RECENT POSTS</TypographyH3>
        <ClearPostHistoryButton />
      </div>
      <Separator />
      <RecentlyViewedPostList />
    </aside>
  )
}

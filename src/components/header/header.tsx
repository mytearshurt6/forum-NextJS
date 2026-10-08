import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import { AccountNavigation } from './header-nav'
import { Search } from './search'
import Link from 'next/link'
import Image from 'next/image'

export async function Header() {
  const user = await getCurrentUser()

  return (
    <header className="fixed top-0 z-9999 h-18 w-full mx-auto flex justify-between items-center gap-3 p-2 sm:p-4 border-b bg-background">
      <Link href="/" aria-label="Home">
        <Image src="/logo.svg" alt="" width={32} height={32} priority />
      </Link>
      <Search />
      <AccountNavigation user={user} />
    </header>
  )
}

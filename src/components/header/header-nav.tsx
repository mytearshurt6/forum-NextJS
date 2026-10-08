import Link from 'next/link'
//TODO: IDK whether this should sit in header folder or not, maybe i'm gonna use this elsewhere
import { LogoutButton } from '@/app/(application)/components/logout-button'
import { buttonVariants } from '../ui/button'

type Props = {
  user: {
    id: string
    role: 'USER' | 'ADMIN'
  } | null
}

export function AccountNavigation({ user }: Props) {
  // TODO: extract the data and map over
  return (
    <nav aria-label="Account" className="min-w-0">
      <ul className="flex justify-center items-center gap-3">
        {user ? (
          <li>
            <LogoutButton />
          </li>
        ) : (
          <>
            <li>
              <Link href="/login" className={`h-10 px-5 ${buttonVariants({ variant: 'outline' })}`}>
                Log in
              </Link>
            </li>
            <li>
              <Link
                href="/signup"
                className={`h-10 px-5 ${buttonVariants({ variant: 'outline' })}`}>
                Sign up
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  )
}

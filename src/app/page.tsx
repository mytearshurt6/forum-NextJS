import { LogOutButton } from '@/components/log-out-button'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import Link from 'next/link'

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true, redirectIfNotFound: true })

  return (
    <div>
      <main>
        {!user ? (
          <div className="flex gap-4">
            <Button variant="outline">
              <Link href="/login">Login</Link>
              <Link href="/signup">Sign Up</Link>
            </Button>
          </div>
        ) : (
          <Card className="max-w-[500px] mt-4">
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
              <LogOutButton />
            </CardFooter>
          </Card>
        )}
      </main>
    </div>
  )
}

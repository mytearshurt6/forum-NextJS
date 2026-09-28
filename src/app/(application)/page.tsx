import { LogOutButton } from '@/components/log-out-button'
import { Button } from '@/components/ui/button'
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import Link from 'next/link'

export default async function Home() {
  const user = await getCurrentUser({ withFullUser: true })

  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center py-32 px-16">
        {user && (
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

import { ToggleRoleButton } from '@/components/toggle-role-button'
import { Button } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography-h1'
import { getCurrentUser } from '@/features/auth/utils/getCurrentUser'
import Link from 'next/link'

export default async function Page() {
  const user = await getCurrentUser({ redirectIfNotFound: true })

  return (
    <div className="container mx-auto p-4">
      <TypographyH1>Private: {user.role}</TypographyH1>
      <div className="flex gap-2">
        <ToggleRoleButton />
        <Button variant="outline">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  )
}

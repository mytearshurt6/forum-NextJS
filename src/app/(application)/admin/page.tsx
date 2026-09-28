import { Button } from '@/components/ui/button'
import { TypographyH1 } from '@/components/ui/typography-h1'
import Link from 'next/link'

export default function Page() {
  return (
    <div className="container mx-auto p-4">
      <TypographyH1>Admin</TypographyH1>
      <Button variant="outline">
        <Link href="/">Home</Link>
      </Button>
    </div>
  )
}

'use client'

import { Button } from '../../../components/ui/button'
import { clearHistoryAction } from '@/features/postViewHistory/actions/clear-history'
import { useTransition } from 'react'
import { toast } from 'sonner'

export function ClearPostHistoryButton() {
  const [isPending, startTransition] = useTransition()

  function handleClick() {
    startTransition(async () => {
      const result = await clearHistoryAction()
      if ('error' in result) {
        toast.error(result.error)
      } else {
        toast.success('History cleared')
      }
    })
  }

  return (
    <Button variant="destructive" disabled={isPending} onClick={handleClick}>
      {isPending ? 'Clearing...' : 'Clear'}
    </Button>
  )
}

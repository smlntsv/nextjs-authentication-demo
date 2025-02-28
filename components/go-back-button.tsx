'use client'

import { Button } from '@/components/ui/button'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { useRouter } from 'next/navigation'

// TODO: try to implement with server action using referer, should work with disabled JS

const GoBackButton = () => {
  const isMounted = useIsMounted()
  const router = useRouter()

  if (!isMounted) {
    return null
  }

  return (
    <Button onClick={router.back} size={'2xl'} variant={'secondaryGray'}>
      Go back
    </Button>
  )
}

export { GoBackButton }

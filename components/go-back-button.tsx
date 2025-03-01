'use client'

import { FC } from 'react'
import { ButtonProps } from '@/components/ui/button/button'
import { Button } from '@/components/ui/button'
import { useIsMounted } from '@/hooks/use-is-mounted'
import { useRouter } from 'next/navigation'

// TODO: try to implement with server action using referer, should work with disabled JS

const GoBackButton: FC<ButtonProps> = (props) => {
  const isMounted = useIsMounted()
  const router = useRouter()

  if (!isMounted) {
    return null
  }

  return (
    <Button onClick={router.back} {...props}>
      Go back
    </Button>
  )
}

export { GoBackButton }

'use client'

import { signOutAction } from '@/lib/auth/actions/sign-out-action'
import { Button } from '@/components/ui/button'
import { FC, useActionState } from 'react'
import styles from './sign-out-button.module.css'
import { clsx } from 'clsx'

interface SignOutButtonProps {
  className?: string
}

const SignOutButton: FC<SignOutButtonProps> = ({ className }) => {
  const [, formAction, isPending] = useActionState<void, FormData>(signOutAction, undefined)

  return (
    <form className={clsx(styles.signOutForm, className)}>
      <Button loading={isPending} formAction={formAction} size={'lg'}>
        Sign Out
      </Button>
    </form>
  )
}

export { SignOutButton }

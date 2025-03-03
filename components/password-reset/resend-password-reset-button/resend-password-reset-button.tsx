'use client'

import { FC, useActionState } from 'react'
import {
  requestPasswordResetLinkAction,
  RequestPasswordResetLinkState,
} from '@/lib/auth/actions/request-password-reset-link-action'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import { Alert } from '@/components/alert'
import styles from './resend-password-reset-button.module.css'
import { useResendPasswordResetAlertConfigs } from './use-resend-password-reset-alert-configs'

type Props = {
  email: string
  className?: string
}

const ResendPasswordResetButton: FC<Props> = ({ email, className }) => {
  const [state, formAction, isSubmitting] = useActionState<RequestPasswordResetLinkState, FormData>(
    requestPasswordResetLinkAction,
    { fields: { email, redirect: 'false' } }
  )

  const alertConfigs = useResendPasswordResetAlertConfigs(state)

  return (
    <div className={clsx(styles.wrapper, className)}>
      <form action={formAction} className={styles.form}>
        <input type={'hidden'} name={'redirect'} value={'false'} />
        <input type={'hidden'} name={'email'} value={email} />
        <Button
          className={styles.button}
          data-testid={'resend-password-reset-link-button'}
          type={'submit'}
          loading={isSubmitting}
          disabled={isSubmitting || alertConfigs.some(({ preventsSubmit }) => preventsSubmit)}
          aria-describedby={alertConfigs.map(({ id }) => id).join(' ')}
        >
          Resend Password Reset Link
        </Button>
      </form>

      {alertConfigs.map(({ id, type, text, testId }) => (
        <Alert
          key={id}
          className={styles.alert}
          id={id}
          type={type}
          text={text}
          data-testid={testId}
        />
      ))}
    </div>
  )
}

export { ResendPasswordResetButton }

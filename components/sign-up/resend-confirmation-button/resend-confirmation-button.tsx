'use client'

import { FC, useActionState } from 'react'
import {
  resendConfirmationEmailAction,
  ResendConfirmationEmailFormState,
} from '@/lib/auth/actions/resend-confirmation-email-action'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/alert'
import { useResendConfirmationEmailAlertConfigs } from './use-resend-confirmation-button-alert-configs'
import styles from '@/components/password-reset/resend-password-reset-button/resend-password-reset-button.module.css'
import { clsx } from 'clsx'
import { useIsMounted } from '@/hooks/use-is-mounted'

type Props = {
  email: string
  className?: string
}

const ResendConfirmationEmailButton: FC<Props> = ({ email, className }) => {
  const [state, formAction, isSubmitting] = useActionState<
    ResendConfirmationEmailFormState,
    FormData
  >(resendConfirmationEmailAction, {})

  const alertConfigs = useResendConfirmationEmailAlertConfigs(state)

  const isMounted = useIsMounted()

  return (
    <div className={clsx(styles.wrapper, className)}>
      <form action={formAction} className={styles.form}>
        <input type={'hidden'} name={'email'} value={email} />

        <Button
          className={styles.button}
          data-testid={'resend-confirmation-email-button'}
          type={'submit'}
          loading={isSubmitting}
          disabled={
            isSubmitting || (isMounted && alertConfigs.some(({ preventsSubmit }) => preventsSubmit))
          }
        >
          Resend Confirmation
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

export { ResendConfirmationEmailButton }

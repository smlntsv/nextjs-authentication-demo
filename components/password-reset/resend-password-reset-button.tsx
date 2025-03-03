'use client'

import { FC, useActionState, useId } from 'react'
import {
  requestPasswordResetLinkAction,
  RequestPasswordResetLinkState,
} from '@/lib/auth/actions/request-password-reset-link-action'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { Button } from '@/components/ui/button'
import { clsx } from 'clsx'
import { Alert } from '@/components/alert'
import styles from './resend-password-reset-button.module.css'

type Props = {
  email: string
  className?: string
}

const ResendPasswordResetButton: FC<Props> = ({ email, className }) => {
  const emailSentAlertId = useId()
  const rateLimiterAlertId = useId()
  const validationErrorAlertId = useId()
  const globalErrorAlertId = useId()

  const [state, formAction, isSubmitting] = useActionState<RequestPasswordResetLinkState, FormData>(
    requestPasswordResetLinkAction,
    { fields: { email, redirect: 'false' } }
  )

  const rateLimiterCountdownState = useCountdown(state.rateLimit?.secondsRemaining ?? 0)

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
          disabled={isSubmitting || rateLimiterCountdownState?.isCounting}
          aria-describedby={`${emailSentAlertId} ${rateLimiterAlertId} ${validationErrorAlertId} ${globalErrorAlertId}`}
        >
          Resend Password Reset Link
        </Button>
      </form>

      <Alert
        id={emailSentAlertId}
        data-testid={'auth-form-global-error'}
        type={'success'}
        text={state.emailSent ? 'Password reset link was sent again.' : undefined}
      />
      <Alert
        id={rateLimiterAlertId}
        type={'warning'}
        aria-live={'polite'}
        text={
          rateLimiterCountdownState?.secondsRemaining > 0
            ? `Too many attempts. Please wait ${rateLimiterCountdownState.secondsRemaining} seconds.`
            : undefined
        }
      />
      <Alert
        id={validationErrorAlertId}
        type={'error'}
        text={state.errors?.email ? state.errors.email[0] : undefined}
      />
      <Alert
        id={globalErrorAlertId}
        type={'error'}
        text={state.globalError ? state.globalError : undefined}
      />
    </div>
  )
}

export { ResendPasswordResetButton }

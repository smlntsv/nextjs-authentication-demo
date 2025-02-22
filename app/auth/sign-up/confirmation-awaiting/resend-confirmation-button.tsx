'use client'

import { FC, useActionState } from 'react'
import {
  resendConfirmationEmailAction,
  ResendConfirmationEmailFormState,
} from '@/lib/auth/actions/resend-confirmation-email-action'
import { useCountdown } from '@/lib/hooks/use-countdown'

type Props = {
  email: string
}

const ResendConfirmationEmailButton: FC<Props> = ({ email }) => {
  const [state, formAction, isSubmitting] = useActionState<
    ResendConfirmationEmailFormState,
    FormData
  >(resendConfirmationEmailAction, {})

  const rateLimiterCountdownState = useCountdown(state.rateLimit?.secondsRemaining ?? 0)

  return (
    <>
      <form action={formAction}>
        <input type={'hidden'} name={'email'} value={email} />
        <button
          data-testid={'resend-confirmation-email-button'}
          type={'submit'}
          disabled={isSubmitting || rateLimiterCountdownState?.isCounting}
        >
          {isSubmitting ? 'Please wait...' : 'Resend Confirmation'}
        </button>
      </form>
      {state.emailSent && <p>Confirmation email was sent!</p>}
      {rateLimiterCountdownState && rateLimiterCountdownState.secondsRemaining > 0 && (
        <p>Too many attempts. Please wait {rateLimiterCountdownState.secondsRemaining} seconds.</p>
      )}
      {state.errors?.email && (
        <div>
          <p style={{ color: 'red' }}>{state.errors.email[0]}</p>
        </div>
      )}
      {state.globalError && <p style={{ color: 'red' }}>{state.globalError}</p>}
    </>
  )
}

export { ResendConfirmationEmailButton }

'use client'

import { FC, useActionState } from 'react'
import {
  requestPasswordResetLinkAction,
  RequestPasswordResetLinkState,
} from '@/lib/auth/actions/request-password-reset-link-action'
import { useCountdown } from '@/lib/hooks/use-countdown'

type Props = {
  email: string
}

const ResendPasswordResetButton: FC<Props> = ({ email }) => {
  const [state, formAction, isSubmitting] = useActionState<RequestPasswordResetLinkState, FormData>(
    requestPasswordResetLinkAction,
    { fields: { email, redirect: 'false' } }
  )

  const rateLimiterCountdownState = useCountdown(state.rateLimit?.secondsRemaining ?? 0)

  return (
    <>
      <form action={formAction}>
        <input type={'hidden'} name={'redirect'} value={'false'} />
        <input type={'hidden'} name={'email'} value={email} />
        <button
          data-testid={'resend-password-reset-link-button'}
          type={'submit'}
          disabled={isSubmitting || rateLimiterCountdownState?.isCounting}
        >
          {isSubmitting ? 'Please wait...' : 'Resend Password Reset Link'}
        </button>
      </form>
      {state.emailSent && <p>Password reset link was sent again!</p>}
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

export { ResendPasswordResetButton }

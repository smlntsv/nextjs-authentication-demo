'use client'

import { FC, useActionState, useEffect, useState } from 'react'
import {
  resendConfirmationEmailAction,
  ResendConfirmationEmailFormState,
} from '@/lib/auth/actions/resend-confirmation-email-action'

type Props = {
  email: string
}

const ResendConfirmationEmailButton: FC<Props> = ({ email }) => {
  const [state, formAction, isSubmitting] = useActionState<
    ResendConfirmationEmailFormState,
    FormData
  >(resendConfirmationEmailAction, {})

  const [rateLimitState, setRateLimitState] = useState<
    ResendConfirmationEmailFormState['rateLimit']
  >(state.rateLimit)

  useEffect(() => {
    let timer: NodeJS.Timeout | undefined

    if (state.rateLimit?.secondsRemaining && state.rateLimit?.secondsRemaining > 0) {
      setRateLimitState({
        isCounting: true,
        secondsRemaining: state.rateLimit.secondsRemaining,
      })

      const willExpireAt = Date.now() + state.rateLimit.secondsRemaining * 1000

      timer = setInterval(() => {
        const newSecondsRemaining = Math.floor((willExpireAt - Date.now()) / 1000)

        setRateLimitState({
          isCounting: newSecondsRemaining > 0,
          secondsRemaining: newSecondsRemaining,
        })

        if (newSecondsRemaining <= 0) clearInterval(timer)
      }, 1000)
    }

    return () => clearInterval(timer)
  }, [state])

  return (
    <>
      <form action={formAction}>
        <input type={'hidden'} name={'email'} value={email} />
        <button type={'submit'} disabled={isSubmitting || rateLimitState?.isCounting}>
          {isSubmitting ? 'Please wait...' : 'Resend Confirmation'}
        </button>
      </form>
      {state.emailSent && <p>Confirmation email was sent!</p>}
      {rateLimitState && rateLimitState.secondsRemaining > 0 && (
        <p>Too many attempts. Please wait {rateLimitState.secondsRemaining} seconds.</p>
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

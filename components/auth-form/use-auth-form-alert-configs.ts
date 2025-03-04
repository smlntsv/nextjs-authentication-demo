import { AriaAttributes, useId } from 'react'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { AlertType } from '@/components/alert'
import { AuthFormState } from '@/components/auth-form/auth-form'

type AuthFormAlertConfig = {
  id: string
  type: AlertType
  preventsSubmit: boolean
  text?: string
  ariaLive?: AriaAttributes['aria-live']
  testId: string
}

function useAuthFormAlertConfig(state: AuthFormState): AuthFormAlertConfig[] {
  const rateLimiterErrorId = useId()
  const globalErrorId = useId()
  const rateLimitState = useCountdown(state.rateLimit?.secondsRemaining ?? 0)

  return [
    {
      id: rateLimiterErrorId,
      type: 'warning',
      ariaLive: 'polite',
      preventsSubmit: rateLimitState?.secondsRemaining > 0,
      text:
        rateLimitState && rateLimitState.secondsRemaining
          ? `Too many attempts. Please wait ${rateLimitState.secondsRemaining} seconds.`
          : undefined,
      testId: 'auth-form-rate-limiter-warning',
    },
    {
      id: globalErrorId,
      type: 'error',
      preventsSubmit: false,
      text: state.globalError,
      testId: 'auth-form-global-error',
    },
  ]
}

export { useAuthFormAlertConfig }

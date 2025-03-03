import { AlertType } from '@/components/alert'
import { AriaAttributes, useId } from 'react'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { RequestPasswordResetLinkState } from '@/lib/auth/actions/request-password-reset-link-action'

type AlertConfig = {
  id: string
  type: AlertType
  text?: string
  ariaLive?: AriaAttributes['aria-live']
  testId?: string
  preventsSubmit?: boolean
}

function useResendPasswordResetAlertConfigs(state: RequestPasswordResetLinkState): AlertConfig[] {
  const rateLimiterAlertId = useId()
  const validationErrorAlertId = useId()
  const globalErrorAlertId = useId()
  const emailSentAlertId = useId()

  const rateLimiterCountdownState = useCountdown(state.rateLimit?.secondsRemaining ?? 0)

  return [
    {
      id: rateLimiterAlertId,
      type: 'warning',
      ariaLive: 'polite',
      text:
        rateLimiterCountdownState?.secondsRemaining > 0
          ? `Too many attempts. Please wait ${rateLimiterCountdownState.secondsRemaining} seconds.`
          : undefined,
      testId: 'rate-limiter-alert',
      preventsSubmit: rateLimiterCountdownState?.secondsRemaining > 0,
    },
    {
      id: validationErrorAlertId,
      type: 'error',
      text: state.errors?.email ? state.errors.email[0] : undefined,
      testId: 'validation-error-alert',
    },
    {
      id: globalErrorAlertId,
      type: 'error',
      text: state.globalError,
      testId: 'global-error-alert',
    },
    {
      id: emailSentAlertId,
      type: 'success',
      text: state.emailSent ? 'Password reset link was sent again.' : undefined,
      testId: 'email-sent-alert',
    },
  ]
}

export { useResendPasswordResetAlertConfigs }

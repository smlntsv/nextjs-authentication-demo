import { AlertType } from '@/components/alert'
import { AriaAttributes, useId } from 'react'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { ResendConfirmationEmailFormState } from '@/lib/auth/actions/resend-confirmation-email-action'

type ResendConfirmationEmailAlertConfig = {
  id: string
  type: AlertType
  text?: string
  ariaLive?: AriaAttributes['aria-live']
  testId?: string
  preventsSubmit: boolean
}

function useResendConfirmationEmailAlertConfigs(
  state: ResendConfirmationEmailFormState
): ResendConfirmationEmailAlertConfig[] {
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
      preventsSubmit: false,
    },
    {
      id: globalErrorAlertId,
      type: 'error',
      text: state.globalError,
      testId: 'global-error-alert',
      preventsSubmit: false,
    },
    {
      id: emailSentAlertId,
      type: 'success',
      text: state.emailSent ? 'Confirmation email was sent again.' : undefined,
      testId: 'email-sent-alert',
      preventsSubmit: false,
    },
  ]
}

export { useResendConfirmationEmailAlertConfigs }

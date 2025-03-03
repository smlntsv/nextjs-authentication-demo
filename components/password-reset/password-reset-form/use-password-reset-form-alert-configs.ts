import { AriaAttributes, useId } from 'react'
import { useCountdown } from '@/lib/hooks/use-countdown'
import { RequestPasswordResetLinkState } from '@/lib/auth/actions/request-password-reset-link-action'
import { AlertType } from '@/components/alert'

type PasswordResetFormAlertConfig = {
  id: string
  type: AlertType
  text?: string
  ariaLive?: AriaAttributes['aria-live']
  testId?: string
  preventsSubmit?: boolean
}

function usePasswordResetFormAlertConfigs(
  state: RequestPasswordResetLinkState
): PasswordResetFormAlertConfig[] {
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
      testId: '',
    },
    {
      id: globalErrorId,
      type: 'error',
      text: state.globalError,
      testId: '',
    },
  ]
}

export { usePasswordResetFormAlertConfigs }

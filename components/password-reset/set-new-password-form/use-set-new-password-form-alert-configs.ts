import { AriaAttributes, useId } from 'react'
import { AlertType } from '@/components/alert'
import { SetNewPasswordState } from '@/lib/auth/actions/set-new-password-action'

type SetNewPasswordFormAlertConfig = {
  id: string
  type: AlertType
  preventsSubmit: boolean
  ariaLive?: AriaAttributes['aria-live']
  text?: string
  testId?: string
}

function useSetNewPasswordFormAlertConfig(
  state: SetNewPasswordState
): SetNewPasswordFormAlertConfig[] {
  const globalErrorId = useId()

  return [
    {
      id: globalErrorId,
      type: 'error',
      preventsSubmit: false,
      text: state.globalError,
      testId: 'global-error-alert',
    },
  ]
}

export { useSetNewPasswordFormAlertConfig }

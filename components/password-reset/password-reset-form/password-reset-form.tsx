'use client'

import {
  requestPasswordResetLinkAction,
  RequestPasswordResetLinkState,
} from '@/lib/auth/actions/request-password-reset-link-action'
import {
  ComponentProps,
  FC,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  RequestPasswordResetData,
  requestPasswordResetSchema,
} from '@/lib/auth/validation/request-password-reset-schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/alert'
import styles from './password-reset-form.module.css'
import { usePasswordResetFormAlertConfigs } from './use-password-reset-form-alert-configs'

const PasswordResetForm: FC<ComponentProps<'div'>> = (props) => {
  const initialState: RequestPasswordResetLinkState = { fields: { email: '', redirect: 'true' } }
  const [state, formAction, isSubmitting] = useActionState<RequestPasswordResetLinkState, FormData>(
    requestPasswordResetLinkAction,
    initialState
  )

  const alertConfigs = usePasswordResetFormAlertConfigs(state)

  const [validationErrors, setValidationErrors] = useState<RequestPasswordResetLinkState['errors']>(
    state.errors
  )

  const { handleSubmit, register, formState, setError } = useForm<RequestPasswordResetData>({
    resolver: zodResolver(requestPasswordResetSchema),
    mode: 'onChange',
  })

  // Handle react-hook-form validation errors
  useEffect(() => {
    const emailError = formState.errors.email?.message

    setValidationErrors({
      email: emailError ? [emailError] : undefined,
    })
  }, [formState.errors.email, formState.errors])

  // Handle useActionState state errors
  useEffect(() => {
    Object.keys(state.errors ?? []).forEach((value) => {
      const field = value as keyof NonNullable<RequestPasswordResetLinkState['errors']>
      setError(field, { type: 'server', message: state.errors![field]![0] })
    })
  }, [setError, state])

  const onSubmit: SubmitHandler<RequestPasswordResetData> = useCallback(
    (data) => {
      const formData = new FormData()
      Object.entries(data).forEach(([field, value]) => formData.append(field, value))
      startTransition(() => formAction(formData))
    },
    [formAction]
  )

  return (
    <div {...props}>
      <form
        className={styles.form}
        data-testid={'reset-password-form'}
        aria-describedby={alertConfigs.map(({ id }) => id).join(' ')}
        action={formAction}
        onSubmit={handleSubmit(onSubmit)}
      >
        {/* Email */}
        <Input
          data-testid={'email-field'}
          type={'email'}
          label={'Email'}
          defaultValue={state.fields.email}
          placeholder={'Enter your email address'}
          disabled={isSubmitting}
          autoComplete={'email'}
          error={validationErrors?.email ? validationErrors.email[0] : undefined}
          {...register('email')}
        />

        {/* Redirect (hidden) */}
        <input
          data-testid={'redirect-field'}
          type={'hidden'}
          value={'true'}
          {...register('redirect')}
        />

        <Button
          className={styles.resetPasswordButton}
          type={'submit'}
          size={'lg'}
          loading={isSubmitting}
          disabled={isSubmitting || alertConfigs.some(({ preventsSubmit }) => preventsSubmit)}
          data-testid={'reset-password-button'}
        >
          Reset Password
        </Button>
      </form>

      {alertConfigs.map(({ id, type, text, ariaLive, testId }) => (
        <Alert
          key={id}
          className={styles.alert}
          id={id}
          data-testid={testId}
          type={type}
          text={text}
          aria-live={ariaLive}
        />
      ))}
    </div>
  )
}

export { PasswordResetForm }

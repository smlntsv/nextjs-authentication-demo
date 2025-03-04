'use client'

import {
  ComponentProps,
  FC,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from 'react'
import {
  setNewPasswordAction,
  SetNewPasswordState,
} from '@/lib/auth/actions/set-new-password-action'
import { SubmitHandler, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  SetNewPasswordData,
  setNewPasswordSchema,
} from '@/lib/auth/validation/set-new-password-schema'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import styles from './set-new-password-form.module.css'
import { useSetNewPasswordFormAlertConfig } from '@/components/password-reset/set-new-password-form/use-set-new-password-form-alert-configs'
import { Alert } from '@/components/alert'

interface Props extends ComponentProps<'div'> {
  email: string
  passwordResetToken: string
}

const SetNewPasswordForm: FC<Props> = ({ email, passwordResetToken, ...rest }) => {
  const initialState: SetNewPasswordState = { fields: { password: '', passwordResetToken } }
  const [state, formAction, isSubmitting] = useActionState<SetNewPasswordState, FormData>(
    setNewPasswordAction,
    initialState
  )

  const alertConfigs = useSetNewPasswordFormAlertConfig(state)

  const [validationErrors, setValidationErrors] = useState<SetNewPasswordState['errors']>(
    state.errors
  )

  const { handleSubmit, register, formState, setError } = useForm<SetNewPasswordData>({
    resolver: zodResolver(setNewPasswordSchema),
    mode: 'onChange',
  })

  // Handle react-hook-form validation errors
  useEffect(() => {
    const passwordError = formState.errors.password?.message
    const passwordResetTokenError = formState.errors.passwordResetToken?.message

    setValidationErrors({
      password: passwordError ? [passwordError] : undefined,
      passwordResetToken: passwordResetTokenError ? [passwordResetTokenError] : undefined,
    })
  }, [formState.errors.password, formState.errors])

  // Handle useActionState state errors
  useEffect(() => {
    Object.keys(state.errors ?? []).forEach((value) => {
      const field = value as keyof NonNullable<SetNewPasswordState['errors']>
      setError(field, { type: 'server', message: state.errors![field]![0] })
    })
  }, [setError, state])

  const onSubmit: SubmitHandler<SetNewPasswordData> = useCallback(
    (data) => {
      const formData = new FormData()
      Object.entries(data).forEach(([field, value]) => formData.append(field, value))
      startTransition(() => formAction(formData))
    },
    [formAction]
  )

  return (
    <div {...rest}>
      <form
        data-testid={'set-new-password-form'}
        aria-describedby={alertConfigs.map(({ id }) => id).join(' ')}
        action={formAction}
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type={'hidden'} value={passwordResetToken} {...register('passwordResetToken')} />

        <Input
          type={'email'}
          label={'Email'}
          id={'email'}
          defaultValue={email}
          placeholder={'Your email'}
          disabled={true}
          autoComplete={'email'}
          inputDataTestId={'email-field'}
          errorDataTestId={'email-error'}
        />

        <Input
          className={styles.formField}
          type={'password'}
          label={'New password'}
          id={'password'}
          defaultValue={state.fields.password}
          placeholder={'Enter new password'}
          disabled={isSubmitting}
          autoComplete={'new-password'}
          error={validationErrors?.password ? validationErrors.password[0] : undefined}
          inputDataTestId={'password-field'}
          errorDataTestId={'password-error'}
          {...register('password')}
        />

        <Button
          className={styles.setNewPasswordButton}
          type={'submit'}
          loading={isSubmitting}
          disabled={isSubmitting}
          data-testid={'set-new-password-button'}
        >
          Set New Password
        </Button>

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
      </form>
    </div>
  )
}

export { SetNewPasswordForm }

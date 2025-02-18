'use client'

import { FC, startTransition, useActionState, useCallback, useEffect, useState } from 'react'
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

type Props = {
  passwordResetToken: string
}

const SetNewPasswordForm: FC<Props> = ({ passwordResetToken }) => {
  const initialState: SetNewPasswordState = { fields: { password: '', passwordResetToken } }
  const [state, formAction, isSubmitting] = useActionState<SetNewPasswordState, FormData>(
    setNewPasswordAction,
    initialState
  )

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

  const renderValidationError = (field: keyof NonNullable<SetNewPasswordState['errors']>) => {
    if (!validationErrors) return

    const errorMessage = validationErrors[field] ? validationErrors[field][0] : undefined
    if (!errorMessage) return null

    return (
      <div id={`${field}-error`}>
        <p style={{ color: 'red' }}>{errorMessage}</p>
      </div>
    )
  }

  const getAriaLabelBy = (field: keyof NonNullable<SetNewPasswordState['errors']>) => {
    return validationErrors && validationErrors[field] ? `${field}-error` : undefined
  }

  return (
    <>
      <h1>Set new password</h1>
      <p>Your new password must be different to previously used passwords.</p>
      <form action={formAction} onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor={'password'}>Password</label>
          <input
            type="password"
            id={'password'}
            defaultValue={state.fields.password}
            placeholder={'Enter new password'}
            disabled={isSubmitting}
            aria-describedby={getAriaLabelBy('password')}
            autoComplete={'new-password'}
            {...register('password')}
          />
          {renderValidationError('password')}
        </div>

        <input type={'hidden'} value={passwordResetToken} {...register('passwordResetToken')} />

        <button type={'submit'} disabled={isSubmitting}>
          Reset password
        </button>
        {renderValidationError('passwordResetToken')}
        {state.globalError && <p style={{ color: 'red' }}>{state.globalError}</p>}
      </form>
    </>
  )
}

export { SetNewPasswordForm }

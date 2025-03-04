'use client'

import {
  FC,
  HTMLInputAutoCompleteAttribute,
  startTransition,
  useActionState,
  useCallback,
  useEffect,
  useState,
} from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { EmailPassword, emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert } from '@/components/alert'
import { useAuthFormAlertConfig } from '@/components/auth-form/use-auth-form-alert-configs'
import { useIsMounted } from '@/hooks/use-is-mounted'
import styles from './auth-form.module.css'

export type AuthFormState = {
  fields: {
    email: string
    password: string
  }
  errors?: {
    email?: string[]
    password?: string[]
  }
  rateLimit?: {
    isCounting: boolean
    secondsRemaining: number
  }
  globalError?: string
}

type Props = {
  action: (state: AuthFormState, payload: FormData) => AuthFormState | Promise<AuthFormState>
  submitButtonText: string
  passwordAutocomplete: HTMLInputAutoCompleteAttribute
  className?: string
}

const AuthForm: FC<Props> = ({ action, submitButtonText, passwordAutocomplete, className }) => {
  const [state, formAction, isSubmitting] = useActionState<AuthFormState, FormData>(action, {
    fields: { email: '', password: '' },
  })
  const alertConfigs = useAuthFormAlertConfig(state)
  const [validationErrors, setValidationErrors] = useState<AuthFormState['errors']>(state.errors)
  const { handleSubmit, register, formState, setError } = useForm<EmailPassword>({
    resolver: zodResolver(emailPasswordSchema),
    mode: 'onChange',
  })
  const isMounted = useIsMounted()

  // Handle react-hook-form validation errors
  useEffect(() => {
    const emailError = formState.errors.email?.message
    const passwordError = formState.errors.password?.message

    setValidationErrors({
      email: emailError ? [emailError] : undefined,
      password: passwordError ? [passwordError] : undefined,
    })
  }, [formState.errors.email, formState.errors.password, formState.errors])

  // Handle useActionState state errors
  useEffect(() => {
    Object.keys(state.errors ?? []).forEach((value) => {
      const field = value as keyof NonNullable<AuthFormState['errors']>
      setError(field, { type: 'server', message: state.errors![field]![0] })
    })
  }, [setError, state])

  const onSubmit: SubmitHandler<EmailPassword> = useCallback(
    (data) => {
      const formData = new FormData()
      Object.entries(data).forEach(([field, value]) => formData.append(field, value))
      startTransition(() => formAction(formData))
    },
    [formAction]
  )

  return (
    <div className={className}>
      <form
        className={styles.form}
        data-testid={'auth-form'}
        aria-describedby={alertConfigs.map(({ id }) => id).join(' ')}
        action={formAction}
        onSubmit={handleSubmit(onSubmit)}
      >
        <Input
          type={'email'}
          label={'Email'}
          defaultValue={state.fields.email}
          placeholder={'Enter your email address'}
          disabled={isSubmitting}
          autoComplete={'email'}
          error={validationErrors?.email ? validationErrors.email[0] : undefined}
          inputDataTestId={'auth-form-email'}
          errorDataTestId={'auth-form-email-error'}
          {...register('email')}
        />
        <Input
          className={styles.formField}
          type="password"
          label={'Password'}
          defaultValue={state.fields.password}
          placeholder={'Enter your password'}
          disabled={isSubmitting}
          autoComplete={passwordAutocomplete}
          error={validationErrors?.password ? validationErrors.password[0] : undefined}
          inputDataTestId={'auth-form-password'}
          errorDataTestId={'auth-form-password-error'}
          {...register('password')}
        />
        <Button
          className={styles.submitButton}
          type={'submit'}
          size={'lg'}
          loading={isSubmitting}
          disabled={
            isSubmitting || (isMounted && alertConfigs.some(({ preventsSubmit }) => preventsSubmit))
          }
          data-testid={'auth-form-submit-button'}
        >
          {submitButtonText}
        </Button>

        {alertConfigs.map(({ id, type, text, testId }) => (
          <Alert
            key={id}
            className={styles.alert}
            id={id}
            type={type}
            text={text}
            data-testid={testId}
          />
        ))}
      </form>
    </div>
  )
}

export { AuthForm }

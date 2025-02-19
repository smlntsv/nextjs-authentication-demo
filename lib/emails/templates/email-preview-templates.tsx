import { FC } from 'react'
import { ConfirmEmail, ConfirmEmailProps } from '@/lib/emails/templates/confirm-email'
import { EmailConfirmed, EmailConfirmedProps } from '@/lib/emails/templates/email-confirmed'
import {
  PasswordResetRequest,
  PasswordResetRequestProps,
} from '@/lib/emails/templates/password-reset-request'
import {
  PasswordResetSuccess,
  PasswordResetSuccessProps,
} from '@/lib/emails/templates/password-reset-success'

const projectName = process.env.PROJECT_NAME ?? 'Project Name'
const userEmail = 'test@test.com'
const signInUrl = new URL('/auth/sign-in', process.env.FRONTEND_BASE_URL).toString()
const setNewPasswordUrl = new URL(
  `/auth/password-reset/invalid-token`,
  process.env.FRONTEND_BASE_URL
).toString()
const emailConfirmationUrl = new URL(
  '/auth/email-confirmation/invalid-token',
  process.env.FRONTEND_BASE_URL
).toString()

type EmailTemplate<T> = {
  title: string
  template: FC<T>
  props: T
}

type EmailTemplates = {
  'confirm-email': EmailTemplate<ConfirmEmailProps>
  'email-confirmed': EmailTemplate<EmailConfirmedProps>
  'password-reset-request': EmailTemplate<PasswordResetRequestProps>
  'password-reset-success': EmailTemplate<PasswordResetSuccessProps>
}

const emailPreviewTemplates: EmailTemplates = {
  'confirm-email': {
    title: 'Confirm Email (User Signup)',
    template: ConfirmEmail,
    props: {
      projectName,
      userEmail,
      emailConfirmationUrl,
    },
  },
  'email-confirmed': {
    title: 'Email Confirmed (Registration Completed)',
    template: EmailConfirmed,
    props: {
      projectName,
      userEmail,
      signInUrl,
    },
  },
  'password-reset-request': {
    title: 'Password Reset Request',
    template: PasswordResetRequest,
    props: {
      projectName,
      userEmail,
      setNewPasswordUrl,
    },
  },
  'password-reset-success': {
    title: 'Password Reset Success',
    template: PasswordResetSuccess,
    props: {
      projectName,
      userEmail,
      signInUrl,
    },
  },
}

function isEmailPreviewTemplateKey<T extends keyof EmailTemplates>(key: string): key is T {
  return key in emailPreviewTemplates
}

export { emailPreviewTemplates, isEmailPreviewTemplateKey }

'use server'

import { signUpSchema } from '@/lib/auth/validation/sign-up-schema'

export type SignUpFormState = {
  fields: {
    email: string
    password: string
    passwordConfirmation: string
  }
  errors?: {
    email?: string[]
    password?: string[]
    passwordConfirmation?: string[]
  }
}

async function signUpAction(_: SignUpFormState, formData: FormData): Promise<SignUpFormState> {
  const nextState = {
    fields: {
      email: formData.get('email'),
      password: formData.get('password'),
      passwordConfirmation: formData.get('passwordConfirmation'),
    },
  } as SignUpFormState

  const validationResult = signUpSchema.safeParse(nextState.fields)

  if (!validationResult.success) {
    nextState.errors = validationResult.error.flatten().fieldErrors
  }

  // TODO: create new user, send email, redirect

  return nextState
}

export { signUpAction }

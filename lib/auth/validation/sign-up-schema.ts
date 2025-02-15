import { z } from 'zod'

const signUpSchema = z
  .object({
    email: z
      .string({
        required_error: 'Email is required',
        invalid_type_error: 'Email must be a string',
      })
      .min(1, 'Email is required')
      .email('Invalid email'),
    password: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password must be a string',
      })
      .min(1, 'Password is required')
      .min(6, 'Password must be at least 6 characters')
      .max(32, 'Password must be at most 32 characters')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number')
      .regex(/[\W_]/, 'Password must contain at least one special character'),
    passwordConfirmation: z
      .string({
        required_error: 'Password is required',
        invalid_type_error: 'Password confirmation must be a string',
      })
      .min(1, 'Password confirmation is required'),
  })
  .refine(({ password, passwordConfirmation }) => password === passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  })

type SignUpData = z.output<typeof signUpSchema>

export type { SignUpData }
export { signUpSchema }

import { emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { z } from 'zod'

const setNewPasswordSchema = emailPasswordSchema.extend({
  passwordResetToken: z
    .string({
      required_error: 'Password reset token is required',
      invalid_type_error: 'Password reset token must be a string',
    })
    .min(1, 'Password reset token is required'),
})

type SetNewPasswordData = z.infer<typeof setNewPasswordSchema>

export type { SetNewPasswordData }
export { setNewPasswordSchema }

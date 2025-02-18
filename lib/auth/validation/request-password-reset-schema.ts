import { emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { z } from 'zod'

const requestPasswordResetSchema = emailPasswordSchema.pick({ email: true }).extend({
  redirect: z.enum(['true', 'false']),
})

type RequestPasswordResetData = z.output<typeof requestPasswordResetSchema>

export type { RequestPasswordResetData }
export { requestPasswordResetSchema }

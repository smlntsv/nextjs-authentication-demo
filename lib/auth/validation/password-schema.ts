import { emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { z } from 'zod'

const passwordSchema = emailPasswordSchema.pick({ password: true })

type Password = z.output<typeof passwordSchema>

export type { Password }
export { passwordSchema }

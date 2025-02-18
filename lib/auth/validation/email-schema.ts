import { emailPasswordSchema } from '@/lib/auth/validation/email-password-schema'
import { z } from 'zod'

const emailSchema = emailPasswordSchema.pick({ email: true })

type Email = z.output<typeof emailSchema>

export type { Email }
export { emailSchema }

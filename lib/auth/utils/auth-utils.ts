import { sql } from '@vercel/postgres'
import { makeBcryptHash } from '@/lib/hash/bcrypt.node'
import { makeSha256Hash } from '@/lib/hash/sha256.edge'

async function isUserRegisteredByEmail(email: string): Promise<boolean> {
  try {
    const queryResult = await sql`SELECT id FROM users WHERE email=${email};`
    return queryResult.rows.length > 0
  } catch (error) {
    console.error('Error checking user registration: ', error)
    throw new Error('Unable to check user registration status.')
  }
}

async function processPendingUserSignUp(email: string, password: string): Promise<void> {
  const hashedPassword = await hashUserPassword(password)
  const { token: emailConfirmationToken, hashedToken } = await generateEmailConfirmationToken()

  await upsertPendingUserRecord(email, hashedPassword, hashedToken)

  const emailConfirmationURL = new URL(
    `/auth/sign-up/confirm-email/${emailConfirmationToken}`,
    process.env.FRONTEND_URL
  )

  console.log('Pending user created/update. Email confirmation URL:', emailConfirmationURL)

  // TODO: send email
  // sendConfirmationEmail(email, emailConfirmationURL)
}

async function upsertPendingUserRecord(
  email: string,
  hashedPassword: string,
  hashedToken: string
): Promise<void> {
  try {
    await sql`
        INSERT INTO pending_users (email, password, token, expires_at, created_at, updated_at)
        VALUES (${email}, ${hashedPassword}, ${hashedToken}, NOW() + INTERVAL '1 day', NOW(), NOW())
        ON CONFLICT (email)
        DO UPDATE SET password = EXCLUDED.password, token = EXCLUDED.token, expires_at = EXCLUDED.expires_at, updated_at = NOW();`
  } catch (error) {
    console.error('Unable to create/update user record in pending_users table: ', error)
    throw new Error('Unable to create user record in pending_users table.')
  }
}

async function hashUserPassword(password: string): Promise<string> {
  return makeBcryptHash(password)
}

async function generateEmailConfirmationToken(): Promise<{ token: string; hashedToken: string }> {
  const token = crypto.randomUUID()
  const hashedToken = await makeSha256Hash(token)

  return { token, hashedToken }
}

export { isUserRegisteredByEmail, processPendingUserSignUp }

import { sql } from '@vercel/postgres'
import { makeBcryptHash } from '@/lib/hash/bcrypt.node'
import { makeSha256Hash } from '@/lib/hash/sha256.edge'

async function isUserRegisteredByEmail(email: string): Promise<boolean> {
  try {
    const queryResult = await sql`SELECT id FROM users WHERE email = ${email};`
    return queryResult.rows.length > 0
  } catch (error) {
    console.error('Error checking user registration: ', error)
    throw new Error('Unable to check user registration status.')
  }
}

async function isPendingUserExistsByEmail(email: string): Promise<boolean> {
  try {
    const queryResult = await sql`SELECT email FROM pending_users WHERE email = ${email};`
    return queryResult.rows.length > 0
  } catch (error) {
    console.error('Error checking email existence in pending_users: ', error)
    throw new Error('Failed to verify if email exists in pending_users.')
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

  console.log(
    'Pending user created/update. Email confirmation URL:',
    emailConfirmationURL.toString()
  )

  // TODO: send email
  // sendConfirmationEmail(email, emailConfirmationURL)
}

async function processResendConfirmationEmail(email: string): Promise<void> {
  const { token: emailConfirmationToken, hashedToken } = await generateEmailConfirmationToken()

  await updatePendingUserTokenByEmail(email, hashedToken)

  const emailConfirmationURL = new URL(
    `/auth/sign-up/confirm-email/${emailConfirmationToken}`,
    process.env.FRONTEND_URL
  )

  console.log(
    "Pending user's token updated. Email confirmation URL:",
    emailConfirmationURL.toString()
  )

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

async function updatePendingUserTokenByEmail(email: string, hashedToken: string): Promise<void> {
  let updated = false

  try {
    const queryResult = await sql`
      UPDATE pending_users 
      SET token = ${hashedToken}, expires_at = NOW() + INTERVAL '1 day', updated_at = NOW()
      WHERE email = ${email}
      RETURNING expires_at;
    `

    updated = queryResult.rows.length !== 0
  } catch (error) {
    console.error('Unable to update token of pending_users table: ', error)
    throw new Error('Unable to update token of pending_users table.')
  }

  if (!updated) {
    throw new Error('No rows was updated.')
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

export {
  isUserRegisteredByEmail,
  processPendingUserSignUp,
  isPendingUserExistsByEmail,
  processResendConfirmationEmail,
}

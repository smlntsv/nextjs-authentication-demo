import { sql } from '@vercel/postgres'
import { makeBcryptHash, verifyBcryptHash } from '@/lib/hash/bcrypt.node'
import { makeSha256Hash } from '@/lib/hash/sha256.edge'
import { User } from '@/lib/auth/utils/auth-types'

async function isUserRegisteredByEmail(email: string): Promise<boolean> {
  try {
    const queryResult = await sql`SELECT id FROM users WHERE email = ${email};`
    return queryResult.rows.length > 0
  } catch (error) {
    console.error('Error checking user registration: ', error)
    throw new Error('Unable to check user registration status.')
  }
}

async function isUserPasswordValid(email: string, password: string): Promise<boolean> {
  try {
    const userQueryResult = await sql`SELECT password FROM users WHERE email = ${email};`

    if (userQueryResult.rowCount === 0) {
      return false
    }

    const hashedPassword = userQueryResult.rows[0].password

    return verifyUserPassword(password, hashedPassword)
  } catch (error) {
    console.error('Unable to validate user password: ', error)
    throw new Error('Unable to validate user password.')
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
    process.env.FRONTEND_BASE_URL
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
    process.env.FRONTEND_BASE_URL
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

async function isEmailConfirmationTokenValid(plainToken: string): Promise<boolean> {
  try {
    const hashedToken = await hashEmailConfirmationToken(plainToken)

    const queryResult =
      await sql`SELECT token FROM pending_users WHERE token = ${hashedToken} AND expires_at > NOW();`

    return queryResult.rows.length > 0
  } catch (error) {
    console.error('Unable to verify email confirmation token: ', error)
    throw new Error('Unable to verify email confirmation token.')
  }
}

async function hashUserPassword(password: string): Promise<string> {
  return makeBcryptHash(password)
}

async function verifyUserPassword(password: string, hashedPassword: string): Promise<boolean> {
  return verifyBcryptHash(password, hashedPassword)
}

async function generateEmailConfirmationToken(): Promise<{ token: string; hashedToken: string }> {
  const token = crypto.randomUUID()
  const hashedToken = await hashEmailConfirmationToken(token)

  return { token, hashedToken }
}

async function hashEmailConfirmationToken(token: string): Promise<string> {
  return await makeSha256Hash(token)
}

async function completeSignUpProcess(token: string): Promise<boolean> {
  try {
    const hashedToken = await hashEmailConfirmationToken(token)

    const pendingUsersQueryResult =
      await sql`SELECT email, password, created_at FROM pending_users WHERE token = ${hashedToken};`

    if (pendingUsersQueryResult.rowCount === 0) {
      console.error('No pending user found for provided token.')
      return false
    }

    const { email, password, created_at } = pendingUsersQueryResult.rows[0]
    const userId = crypto.randomUUID()

    const usersQueryResult = await sql`
        INSERT INTO users (id, email, password, created_at, updated_at)
        VALUES (${userId}, ${email}, ${password}, ${created_at}, NOW())
        RETURNING id;
    `

    if (usersQueryResult.rowCount === 0) {
      console.error('Failed to insert new user into users table.')
      return false
    }

    const deletePendingUserQueryResult =
      await sql`DELETE FROM pending_users WHERE token = ${hashedToken};`

    if (deletePendingUserQueryResult.rowCount === 0) {
      console.error('Failed to delete pending user record.')
      return false
    }

    // TODO: send email
    // sendEmailConfirmedEmail(email)

    return true
  } catch (error) {
    console.error('Unable to complete user registration process: ', error)
  }

  return false
}

async function getUserByEmail(email: string): Promise<User | null> {
  try {
    const userQueryResult = await sql`
        SELECT id, email, created_at, updated_at FROM users WHERE email = ${email};
    `

    if (userQueryResult.rows.length === 0) {
      return null
    }

    return {
      id: userQueryResult.rows[0].id,
      email: userQueryResult.rows[0].email,
      createdAt: userQueryResult.rows[0].created_at,
      updatedAt: userQueryResult.rows[0].updated_at,
    } satisfies User
  } catch (error) {
    console.error('Unable to get user by email: ', (error as Error).message)
    throw new Error('Unable to get user by email')
  }
}

async function processPasswordResetLinkRequest(userId: User['id']): Promise<void> {
  const { token, hashedToken } = await generatePasswordResetToken()

  await createPasswordResetRecord(userId, hashedToken)

  const passwordResetURL = new URL(`/auth/password-reset/${token}`, process.env.FRONTEND_BASE_URL)

  console.log('Password reset link created. URL:', passwordResetURL.toString())

  // TODO: send email
  // sendPasswordResetLinkEmail(email, passwordResetURL)
}

async function createPasswordResetRecord(userId: User['id'], hashedToken: string): Promise<void> {
  try {
    const queryResult = await sql`
        INSERT INTO password_resets (user_id, token, is_used, expires_at, created_at, updated_at)
        VALUES (${userId}, ${hashedToken}, FALSE, NOW() + INTERVAL '1 hour', NOW(), NOW());
    `

    if (queryResult.rowCount !== 0) {
      return
    }
  } catch (error) {
    console.error('Error during password_resets record creating: ', error)
  }

  throw new Error('Failed to create password reset record.')
}

async function generatePasswordResetToken(): Promise<{ token: string; hashedToken: string }> {
  const token = crypto.randomUUID()
  const hashedToken = await hashPasswordResetToken(token)
  return { token, hashedToken }
}

async function hashPasswordResetToken(token: string): Promise<string> {
  return makeSha256Hash(token)
}

async function isPasswordResetTokenValid(token: string): Promise<boolean> {
  try {
    const hashedToken = await hashPasswordResetToken(token)

    const queryResult = await sql`
        SELECT user_id FROM password_resets
        WHERE token = ${hashedToken} AND is_used = FALSE AND expires_at > NOW();
    `

    return queryResult.rows.length > 0
  } catch (error) {
    console.error('Unable to verify password reset token: ', error)
    throw new Error('Failed to verify password reset token.')
  }
}

export {
  isUserRegisteredByEmail,
  processPendingUserSignUp,
  isPendingUserExistsByEmail,
  processResendConfirmationEmail,
  isEmailConfirmationTokenValid,
  completeSignUpProcess,
  isUserPasswordValid,
  getUserByEmail,
  processPasswordResetLinkRequest,
  isPasswordResetTokenValid,
}

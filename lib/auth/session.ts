import { NextRequest } from 'next/server'
import { makeSha256Hash } from '@/lib/hash/sha256.edge'
import { sql } from '@vercel/postgres'
import { cookies } from 'next/headers'
import { User } from '@/lib/auth/utils/auth-types'

const SESSION_COOKIE_NAME = 'auth_session'

async function isUserSessionValid(request?: NextRequest): Promise<boolean> {
  let sessionToken: string | undefined

  if (request) {
    // Extract session token from request cookies (when called from middleware)
    sessionToken = request.cookies.get(SESSION_COOKIE_NAME)?.value
  } else {
    // Extract token from server-side cookies (when called from server actions)
    const cookieStore = await cookies()
    sessionToken = cookieStore.get(SESSION_COOKIE_NAME)?.value
  }

  if (!sessionToken) {
    return false
  }

  try {
    const hashedToken = await hashSessionToken(sessionToken)
    const queryResult = await sql`SELECT expires_at FROM sessions WHERE token = ${hashedToken};`
    if (queryResult.rows.length === 0) {
      return false
    }

    const expiresAt: Date = queryResult.rows[0].expires_at
    return expiresAt.getTime() > new Date().getTime()
  } catch (error) {
    console.error('Failed to check user session: ', error)
  }

  return false
}

async function createSessionByEmail(email: string): Promise<boolean> {
  try {
    // Find user by email
    const userQueryResult = await sql`SELECT id FROM users WHERE email = ${email};`

    if (userQueryResult.rows.length === 0) {
      return false
    }

    const userId = userQueryResult.rows[0].id as string
    const { token, hashedToken } = await generateSessionToken()

    const createSessionQueryResult = await sql`
        INSERT INTO sessions (user_id, token, expires_at, created_at, updated_at)
        VALUES (${userId}, ${hashedToken}, NOW() + INTERVAL '1 week', NOW(), NOW())
    `

    if (createSessionQueryResult.rowCount === 0) {
      return false
    }

    const cookieStore = await cookies()

    const expires = new Date()
    expires.setDate(expires.getDate() + 30) // expire in 30 days

    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      expires: expires.getTime(),
    })

    return true
  } catch (error) {
    console.error('Failed to create session: ', error)
    return false
  }
}

async function deleteSession(): Promise<void> {
  const cookieStore = await cookies()
  const tokenCookie = cookieStore.get(SESSION_COOKIE_NAME)

  if (!tokenCookie) {
    return
  }

  cookieStore.delete(SESSION_COOKIE_NAME)

  // Delete record in sessions table
  const hashedToken = await hashSessionToken(tokenCookie.value)
  try {
    await sql`DELETE FROM sessions WHERE token = ${hashedToken};`
  } catch (error) {
    console.error('Failed to delete session: ', error)
  }
}

async function generateSessionToken(): Promise<{ token: string; hashedToken: string }> {
  const token = crypto.randomUUID()
  const hashedToken = await hashSessionToken(token)

  return { token, hashedToken }
}

async function hashSessionToken(token: string): Promise<string> {
  return makeSha256Hash(token)
}

async function getAuthenticatedUser(): Promise<User | null> {
  try {
    const sessionValid = await isUserSessionValid()

    if (!sessionValid) {
      return null
    }

    const cookiesStore = await cookies()
    const token = cookiesStore.get(SESSION_COOKIE_NAME)?.value
    if (!token) {
      return null
    }

    const hashedSessionToken = await hashSessionToken(token)

    const userQueryResult = await sql`
        SELECT users.id, users.email, users.created_at, users.updated_at
        FROM users
        JOIN sessions ON users.id = sessions.user_id
        WHERE sessions.token = ${hashedSessionToken}
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
    console.error('Unable to get authenticated user data: ', error)
  }

  return null
}

export {
  isUserSessionValid,
  generateSessionToken,
  createSessionByEmail,
  deleteSession,
  getAuthenticatedUser,
}

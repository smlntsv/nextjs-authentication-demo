import { sql } from '@vercel/postgres'
import { User } from '@/lib/auth/utils/auth-types'
import { makeBcryptHash } from '@/lib/hash/bcrypt.node'

async function createUserRecordIfNotExists(email: string, password: string): Promise<User> {
  const userId = crypto.randomUUID()
  const hashedPassword = await makeBcryptHash(password)

  const queryResult = await sql`
        INSERT INTO users (id, email, password, created_at, updated_at)
        VALUES (${userId}, ${email}, ${hashedPassword}, NOW(), NOW())
        ON CONFLICT (email)
        DO NOTHING
        RETURNING id, email, created_at, updated_at`

  if (queryResult.rows.length === 0) {
    throw new Error('Failed to create user record')
  }

  return {
    id: queryResult.rows[0].id,
    email: queryResult.rows[0].email,
    createdAt: queryResult.rows[0].creted_at,
    updatedAt: queryResult.rows[0].updated_at,
  } satisfies User
}

async function isUserExists(email: string): Promise<boolean> {
  const queryResult = await sql`SELECT id FROM users WHERE email = ${email};`

  return queryResult.rows.length > 0
}

async function deleteUserRecord(email: string): Promise<boolean> {
  await sql`DELETE FROM users WHERE email = ${email}`

  return true
}

export { createUserRecordIfNotExists, isUserExists, deleteUserRecord }

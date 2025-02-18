type User = {
  id: string
  email: string
  createdAt: Date
  updatedAt: Date
}

type PasswordReset = {
  userId: string
  token: string
  isUsed: boolean
  expiresAt: Date
  createdAt: Date
  updatedAt: Date
}

export type { User, PasswordReset }

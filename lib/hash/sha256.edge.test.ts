import { describe, it, expect } from 'vitest'
import { makeSha256Hash, verifySha256Hash } from '@/lib/hash/sha256.edge'

describe('SHA256 Hashing', () => {
  const data = 'string-to-hash'

  // Example: 14d46722fd3553e45740e6021d45ad5a23b780d28c739e8ec9ff0435b1faedd
  it('should create a valid sha256 hash', async () => {
    const hash = await makeSha256Hash(data)
    const sha256RegExp = /^[0-9a-f]{64}$/

    expect(hash).match(sha256RegExp)
  })

  it('should verify a correct sha256 hash', async () => {
    const hash = await makeSha256Hash(data)
    const isValid = await verifySha256Hash(data, hash)

    expect(isValid).toBe(true)
  })

  it('should not verify an incorrect sha256 hash', async () => {
    const wrongData = 'wrong-data'
    const hash = await makeSha256Hash(data)
    const isValid = await verifySha256Hash(wrongData, hash)

    expect(isValid).toBe(false)
  })

  it('should not throw on invalid input for hashing', () => {
    const invalidData = null as unknown as string
    expect(() => makeSha256Hash(invalidData)).not.toThrow()
  })

  it('should not throw on invalid input for verification', () => {
    const invalidData = null as unknown as string
    const invalidHash = {} as unknown as string

    expect(() => verifySha256Hash(invalidData, invalidHash)).not.toThrow()
  })
})

import { describe, it, expect } from 'vitest'
import { makeBcryptHash, verifyBcryptHash } from '@/lib/hash/bcrypt.node'

describe('Bcrypt Hashing', () => {
  const data = 'string-to-hash'

  it('should create a valid bcrypt hash', async () => {
    const hash = await makeBcryptHash(data)

    // Example: $2b $10 $hNVz2rAUbaIs0Bwap3qKge4/pE57KuoWYAMKCfn1RHT.vzPMW9J9i
    const bcryptRegExp = new RegExp(/^(\$2b)(\$\d{2})(\$[A-Za-z0-9./]{22})/)

    expect(hash).toBeTypeOf('string')
    expect(hash).toMatch(bcryptRegExp)
  })

  it('should verify a correct bcrypt hash', async () => {
    const hash = await makeBcryptHash(data)
    const isValid = await verifyBcryptHash(data, hash)

    expect(isValid).toBe(true)
  })

  it('should not verify an incorrect bcrypt hash', async () => {
    const wrongData = 'wrong-data'
    const hash = await makeBcryptHash(data)
    const isValid = await verifyBcryptHash(wrongData, hash)

    expect(isValid).toBe(false)
  })

  it('should throw on non-string input for hashing', async () => {
    expect(() => makeBcryptHash(123 as unknown as string)).rejects.toThrow('Error creating hash.')
  })

  it('should throw on non-string input for verification', async () => {
    const invalidData = 123 as unknown as string
    const invalidHash = {} as unknown as string
    expect(() => verifyBcryptHash(invalidData, invalidHash)).rejects.toThrow('Error compare hash.')
  })
})

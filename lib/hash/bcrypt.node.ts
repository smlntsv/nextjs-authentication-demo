import { hash, compare } from 'bcrypt'

async function makeBcryptHash(data: string): Promise<string> {
  try {
    const SALT_ROUNDS = 10
    return await hash(data, SALT_ROUNDS)
  } catch (error) {
    console.error('Error creating hash: ', error)
    throw new Error('Error creating hash.')
  }
}

async function verifyBcryptHash(data: string, encrypted: string): Promise<boolean> {
  try {
    return await compare(data, encrypted)
  } catch (error) {
    console.error('Error compare hash: ', error)
    throw new Error('Error compare hash.')
  }
}

export { makeBcryptHash, verifyBcryptHash }

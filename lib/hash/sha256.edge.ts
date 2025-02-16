async function makeSha256Hash(data: string) {
  const hashedDataBuffer: ArrayBuffer = await crypto.subtle.digest(
    'SHA-256',
    new TextEncoder().encode(data)
  )

  return Array.from(new Uint32Array(hashedDataBuffer))
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function verifySha256Hash(data: string, encrypted: string): Promise<boolean> {
  const dataHashed = await makeSha256Hash(data)
  return dataHashed === encrypted
}

export { makeSha256Hash, verifySha256Hash }

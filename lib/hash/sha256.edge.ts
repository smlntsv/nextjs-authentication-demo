async function makeSha256Hash(data: string) {
  const encodedData = new TextEncoder().encode(data)
  const hashedDataBuffer: ArrayBuffer = await crypto.subtle.digest('SHA-256', encodedData)
  const byteArray = new Uint8Array(hashedDataBuffer)

  return Array.from(byteArray)
    .map((byte) => byte.toString(16).padStart(2, '0'))
    .join('')
}

async function verifySha256Hash(data: string, encrypted: string): Promise<boolean> {
  const dataHashed = await makeSha256Hash(data)
  return dataHashed === encrypted
}

export { makeSha256Hash, verifySha256Hash }

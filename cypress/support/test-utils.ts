function randomizeStringCase(email: string): string {
  return email
    .split('')
    .map((char) => (Math.random() < 0.5 ? char.toLowerCase() : char.toUpperCase()))
    .join('')
}

export { randomizeStringCase }

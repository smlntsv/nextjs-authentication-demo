import 'server-only'
import { RateLimiterMemory, IRateLimiterOptions, RateLimiterRes } from 'rate-limiter-flexible'

type RateLimiterStatus = {
  passed: boolean
  msBeforeNext: number
}

function createRateLimiter(
  options: IRateLimiterOptions
): (key: string) => Promise<RateLimiterStatus> {
  const rateLimiter = new RateLimiterMemory(options)

  return async (key: string): Promise<RateLimiterStatus> => {
    try {
      const { msBeforeNext } = await rateLimiter.consume(key, 1)

      return {
        passed: true,
        msBeforeNext,
      }
    } catch (e) {
      return {
        passed: false,
        msBeforeNext: (e as RateLimiterRes).msBeforeNext,
      }
    }
  }
}

export { createRateLimiter }

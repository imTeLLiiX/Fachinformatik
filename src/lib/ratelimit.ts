import { Ratelimit } from '@upstash/ratelimit'
import { redis } from './redis'

// Create a new ratelimiter, that allows 10 requests per 10 seconds
export const limiter = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
  prefix: '@upstash/ratelimit',
}) 
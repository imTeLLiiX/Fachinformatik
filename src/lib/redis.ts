import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('Redis environment variables are not set')
}

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

// Create a new ratelimiter that allows 10 requests per 10 seconds
export const ratelimit = new Ratelimit({
  redis,
  limiter: Ratelimit.slidingWindow(10, '10 s'),
  analytics: true,
})

// Cache configuration
export const CACHE_TTL = 86400 // 24 hours in seconds

export async function getCachedData<T>(key: string): Promise<T | null> {
  const data = await redis.get<T>(key)
  return data
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
  await redis.set(key, data, { ex: CACHE_TTL })
}

export async function invalidateCache(key: string): Promise<void> {
  await redis.del(key)
}

const MODULE_CACHE_PREFIX = 'module:'
const MODULES_LIST_CACHE_KEY = 'modules:list'

export async function getCachedModule(moduleId: string) {
  const cachedData = await redis.get(`module:${moduleId}`);
  return cachedData;
}

export async function setCachedModule(moduleId: string, moduleData: any) {
  await redis.set(`module:${moduleId}`, moduleData, {
    ex: CACHE_TTL
  });
}

export async function invalidateModuleCache(moduleId: string) {
  await redis.del(`module:${moduleId}`);
}

export async function getCachedModules() {
  const cachedData = await redis.get('modules:all');
  return cachedData;
}

export async function setCachedModules(modules: any[]) {
  await redis.set('modules:all', modules, {
    ex: CACHE_TTL
  });
}

export async function invalidateAllModulesCache() {
  await redis.del('modules:all');
}

export async function getCachedModulesList(): Promise<any> {
  const data = await redis.get<string>(MODULES_LIST_CACHE_KEY)
  return data ? JSON.parse(data) : null
}

export async function setCachedModulesList(data: any): Promise<void> {
  await redis.set(MODULES_LIST_CACHE_KEY, JSON.stringify(data))
  await redis.expire(MODULES_LIST_CACHE_KEY, CACHE_TTL)
}

export async function invalidateModulesListCache(): Promise<void> {
  await redis.del(MODULES_LIST_CACHE_KEY)
}

export default redis 
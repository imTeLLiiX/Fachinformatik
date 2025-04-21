import { Redis } from '@upstash/redis'

if (!process.env.UPSTASH_REDIS_REST_URL) {
  throw new Error('UPSTASH_REDIS_REST_URL is not defined')
}

if (!process.env.UPSTASH_REDIS_REST_TOKEN) {
  throw new Error('UPSTASH_REDIS_REST_TOKEN is not defined')
}

export const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
})

const MODULE_CACHE_PREFIX = 'module:'
const MODULES_LIST_CACHE_KEY = 'modules:list'
const CACHE_TTL = 3600 // 1 hour in seconds

export async function getCachedModule(id: string): Promise<any> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${id}`
  const data = await redis.get<string>(cacheKey)
  return data ? JSON.parse(data) : null
}

export async function setCachedModule(id: string, data: any): Promise<void> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${id}`
  await redis.set(cacheKey, JSON.stringify(data))
  await redis.expire(cacheKey, CACHE_TTL)
}

export async function invalidateModuleCache(id: string): Promise<void> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${id}`
  await redis.del(cacheKey)
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
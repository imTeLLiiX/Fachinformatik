import { redis, CACHE_TTL } from './redis'
import type { Module } from '@prisma/client'

const MODULE_CACHE_PREFIX = 'module:'
const MODULES_LIST_CACHE_KEY = 'modules:list'

export async function getCachedModule(id: string): Promise<Module | null> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${id}`
  const cachedModule = await redis.get<Module>(cacheKey)
  return cachedModule
}

export async function setCachedModule(module: Module): Promise<void> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${module.id}`
  await redis.set(cacheKey, module, { ex: CACHE_TTL })
}

export async function getCachedModulesList(): Promise<Module[] | null> {
  const cachedModules = await redis.get<Module[]>(MODULES_LIST_CACHE_KEY)
  return cachedModules
}

export async function setCachedModulesList(modules: Module[]): Promise<void> {
  await redis.set(MODULES_LIST_CACHE_KEY, modules, { ex: CACHE_TTL })
}

export async function invalidateModuleCache(id: string): Promise<void> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${id}`
  await redis.del(cacheKey)
  await redis.del(MODULES_LIST_CACHE_KEY)
}

export async function invalidateAllModuleCache(): Promise<void> {
  const keys = await redis.keys(`${MODULE_CACHE_PREFIX}*`)
  if (keys.length > 0) {
    for (const key of keys) {
      await redis.del(key)
    }
  }
  await redis.del(MODULES_LIST_CACHE_KEY)
} 
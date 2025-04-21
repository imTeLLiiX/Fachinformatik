import { Redis } from '@upstash/redis'
import { Module } from "@/types/module"

const redis = new Redis({
  url: process.env.REDIS_URL || '',
  token: process.env.REDIS_TOKEN || '',
})

const MODULE_CACHE_PREFIX = 'module:'
const MODULES_LIST_CACHE_KEY = 'modules:list'
const CACHE_TTL = 3600 // 1 hour in seconds

export class ModuleCache {
  static async getModule(moduleId: string): Promise<Module | null> {
    try {
      const cached = await redis.get(`${MODULE_CACHE_PREFIX}${moduleId}`)
      if (cached) {
        return JSON.parse(cached)
      }
      return null
    } catch (error) {
      console.error("Fehler beim Abrufen des Moduls aus dem Cache:", error)
      return null
    }
  }

  static async setModule(moduleId: string, module: Module): Promise<void> {
    try {
      await redis.setex(
        `${MODULE_CACHE_PREFIX}${moduleId}`,
        CACHE_TTL,
        JSON.stringify(module)
      )
    } catch (error) {
      console.error("Fehler beim Speichern des Moduls im Cache:", error)
    }
  }

  static async invalidateModule(moduleId: string): Promise<void> {
    try {
      await redis.del(`${MODULE_CACHE_PREFIX}${moduleId}`)
    } catch (error) {
      console.error("Fehler beim Invalidieren des Modul-Caches:", error)
    }
  }

  static async getModulesForCourse(courseId: string): Promise<Module[] | null> {
    try {
      const cached = await redis.get(`${MODULE_CACHE_PREFIX}course:${courseId}`)
      if (cached) {
        return JSON.parse(cached)
      }
      return null
    } catch (error) {
      console.error("Fehler beim Abrufen der Module aus dem Cache:", error)
      return null
    }
  }

  static async setModulesForCourse(courseId: string, modules: Module[]): Promise<void> {
    try {
      await redis.setex(
        `${MODULE_CACHE_PREFIX}course:${courseId}`,
        CACHE_TTL,
        JSON.stringify(modules)
      )
    } catch (error) {
      console.error("Fehler beim Speichern der Module im Cache:", error)
    }
  }

  static async invalidateCourseModules(courseId: string): Promise<void> {
    try {
      await redis.del(`${MODULE_CACHE_PREFIX}course:${courseId}`)
    } catch (error) {
      console.error("Fehler beim Invalidieren des Kurs-Modul-Caches:", error)
    }
  }
}

export async function getCachedModule(id: string): Promise<any> {
  const cacheKey = `${MODULE_CACHE_PREFIX}${id}`
  const data = await redis.get(cacheKey)
  return data ? JSON.parse(data as string) : null
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
  const data = await redis.get(MODULES_LIST_CACHE_KEY)
  return data ? JSON.parse(data as string) : null
}

export async function setCachedModulesList(data: any): Promise<void> {
  await redis.set(MODULES_LIST_CACHE_KEY, JSON.stringify(data))
  await redis.expire(MODULES_LIST_CACHE_KEY, CACHE_TTL)
}

export async function invalidateModulesListCache(): Promise<void> {
  await redis.del(MODULES_LIST_CACHE_KEY)
}

export default redis 
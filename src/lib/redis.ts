import { Redis } from "ioredis"
import { Module } from "@/types/module"

if (!process.env.REDIS_URL) {
  throw new Error("REDIS_URL ist nicht definiert")
}

const redis = new Redis(process.env.REDIS_URL)

export class ModuleCache {
  private static readonly CACHE_PREFIX = "module:"
  private static readonly CACHE_TTL = 3600 // 1 Stunde

  static async getModule(moduleId: string): Promise<Module | null> {
    try {
      const cached = await redis.get(`${this.CACHE_PREFIX}${moduleId}`)
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
        `${this.CACHE_PREFIX}${moduleId}`,
        this.CACHE_TTL,
        JSON.stringify(module)
      )
    } catch (error) {
      console.error("Fehler beim Speichern des Moduls im Cache:", error)
    }
  }

  static async invalidateModule(moduleId: string): Promise<void> {
    try {
      await redis.del(`${this.CACHE_PREFIX}${moduleId}`)
    } catch (error) {
      console.error("Fehler beim Invalidieren des Modul-Caches:", error)
    }
  }

  static async getModulesForCourse(courseId: string): Promise<Module[] | null> {
    try {
      const cached = await redis.get(`${this.CACHE_PREFIX}course:${courseId}`)
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
        `${this.CACHE_PREFIX}course:${courseId}`,
        this.CACHE_TTL,
        JSON.stringify(modules)
      )
    } catch (error) {
      console.error("Fehler beim Speichern der Module im Cache:", error)
    }
  }

  static async invalidateCourseModules(courseId: string): Promise<void> {
    try {
      await redis.del(`${this.CACHE_PREFIX}course:${courseId}`)
    } catch (error) {
      console.error("Fehler beim Invalidieren des Kurs-Modul-Caches:", error)
    }
  }
}

export async function getCachedModulesList() {
  const cached = await redis.get("modules:list")
  return cached ? JSON.parse(cached) : null
}

export async function setCachedModulesList(data: any) {
  await redis.set("modules:list", JSON.stringify(data), "EX", 1800) // 30 minutes
}

export async function invalidateModulesListCache() {
  await redis.del("modules:list")
}

export default redis 
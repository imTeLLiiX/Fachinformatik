import { Redis } from '@upstash/redis'
import { Ratelimit } from '@upstash/ratelimit'

// In-memory cache für Fallback
const inMemoryCache = new Map<string, { data: any; expiry: number }>();
const DEFAULT_TTL = 60 * 60 * 1000; // 1 hour in milliseconds

// Fallback-Funktionen für In-Memory Cache
const getInMemoryData = async <T>(key: string): Promise<T | null> => {
  const item = inMemoryCache.get(key);
  if (!item) return null;
  
  if (Date.now() > item.expiry) {
    inMemoryCache.delete(key);
    return null;
  }
  
  return item.data as T;
};

const setInMemoryData = async <T>(key: string, data: T, ttl = DEFAULT_TTL): Promise<void> => {
  inMemoryCache.set(key, {
    data,
    expiry: Date.now() + ttl
  });
};

const invalidateInMemoryCache = async (key: string): Promise<void> => {
  inMemoryCache.delete(key);
};

// Dummy rate limiter für Fallback
const dummyRateLimiter = {
  limit: async (identifier: string) => {
    return {
      success: true,
      limit: 10,
      remaining: 9,
      reset: Date.now() + 10000
    };
  }
};

// Redis-Instanz und Rate Limiter
let redis: Redis | null = null;
let ratelimit: Ratelimit | typeof dummyRateLimiter = dummyRateLimiter;

// Initialisiere Redis, wenn die Umgebungsvariablen gesetzt sind
if (process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN) {
  try {
    redis = new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    });
    
    ratelimit = new Ratelimit({
      redis,
      limiter: Ratelimit.slidingWindow(10, '10 s'),
      analytics: true,
    });
    
    console.log('Redis initialized successfully');
  } catch (error) {
    console.error('Failed to initialize Redis:', error);
  }
} else {
  console.warn('Redis environment variables are not set. Using in-memory cache instead.');
}

// Cache configuration
const CACHE_TTL = 86400; // 24 hours in seconds

// Exportierte Funktionen
export async function getCachedData<T>(key: string): Promise<T | null> {
  if (redis) {
    try {
      return await redis.get<T>(key);
    } catch (error) {
      console.error('Redis get error:', error);
      return getInMemoryData<T>(key);
    }
  }
  return getInMemoryData<T>(key);
}

export async function setCachedData<T>(key: string, data: T): Promise<void> {
  if (redis) {
    try {
      await redis.set(key, data, { ex: CACHE_TTL });
      return;
    } catch (error) {
      console.error('Redis set error:', error);
    }
  }
  await setInMemoryData(key, data, CACHE_TTL * 1000);
}

export async function invalidateCache(key: string): Promise<void> {
  if (redis) {
    try {
      await redis.del(key);
      return;
    } catch (error) {
      console.error('Redis del error:', error);
    }
  }
  await invalidateInMemoryCache(key);
}

const MODULE_CACHE_PREFIX = 'module:';
const MODULES_LIST_CACHE_KEY = 'modules:list';

export async function getCachedModule(moduleId: string) {
  return getCachedData(`module:${moduleId}`);
}

export async function setCachedModule(moduleId: string, moduleData: any) {
  return setCachedData(`module:${moduleId}`, moduleData);
}

export async function invalidateModuleCache(moduleId: string) {
  return invalidateCache(`module:${moduleId}`);
}

export async function getCachedModules() {
  return getCachedData('modules:all');
}

export async function setCachedModules(modules: any[]) {
  return setCachedData('modules:all', modules);
}

export async function invalidateAllModulesCache() {
  return invalidateCache('modules:all');
}

export async function getCachedModulesList(): Promise<any> {
  const data = await getCachedData<string>(MODULES_LIST_CACHE_KEY);
  return data ? JSON.parse(data) : null;
}

export async function setCachedModulesList(data: any): Promise<void> {
  await setCachedData(MODULES_LIST_CACHE_KEY, JSON.stringify(data));
}

export async function invalidateModulesListCache(): Promise<void> {
  return invalidateCache(MODULES_LIST_CACHE_KEY);
}

// Exportiere den Rate Limiter
export { ratelimit };

// Exportiere Redis oder den In-Memory Cache als Default
export default redis || inMemoryCache; 
import { prisma } from './prisma';
import { Module } from '@prisma/client';

/**
 * Modul-Manager für Plug-and-Play Modulintegration
 * Bietet Funktionen zum Laden, Speichern und Verwalten von Modulen
 */
export class ModuleManager {
  private static instance: ModuleManager;
  private moduleData: Module | null = null;
  private modulesCache: Map<string, Module[]> = new Map();
  private lastFetchTime: Map<string, number> = new Map();
  private cacheExpiryTime = 5 * 60 * 1000; // 5 Minuten

  private constructor() {}

  /**
   * Singleton-Instanz des ModuleManagers
   */
  public static getInstance(): ModuleManager {
    if (!ModuleManager.instance) {
      ModuleManager.instance = new ModuleManager();
    }
    return ModuleManager.instance;
  }

  /**
   * Lädt Module für einen bestimmten Kurs
   * @param courseId ID des Kurses
   * @param forceRefresh Erzwingt ein Neuladen der Module, auch wenn sie im Cache sind
   * @returns Promise mit den Modulen des Kurses
   */
  public async getModulesForCourse(courseId: string, forceRefresh = false): Promise<Module[]> {
    try {
      // Prüfe Cache, wenn kein Neuladen erzwungen wird
      if (!forceRefresh && this.isCacheValid(courseId)) {
        return this.modulesCache.get(courseId) || [];
      }

      // Lade Module aus der Datenbank
      const modules = await prisma.module.findMany({
        where: { courseId },
        orderBy: { order: 'asc' },
      });

      // Aktualisiere Cache
      this.modulesCache.set(courseId, modules);
      this.lastFetchTime.set(courseId, Date.now());

      return modules;
    } catch (error) {
      console.error(`Fehler beim Laden der Module für Kurs ${courseId}:`, error);
      // Bei Fehler: Versuche, Module aus dem Cache zu laden, auch wenn sie abgelaufen sind
      return this.modulesCache.get(courseId) || [];
    }
  }

  /**
   * Speichert ein neues Modul in der Datenbank
   * @param moduleData Das zu speichernde Modul
   * @returns Promise mit der ID des gespeicherten Moduls
   */
  public async saveModule(moduleData: Module): Promise<string> {
    try {
      const result = await prisma.module.create({
        data: moduleData,
      });
      
      if (!result.id) {
        throw new Error('Fehler beim Speichern des Moduls');
      }
      
      // Aktualisiere Cache
      this.invalidateCache(moduleData.courseId);
      
      return result.id.toString();
    } catch (error) {
      console.error('Fehler beim Speichern des Moduls:', error);
      throw error;
    }
  }

  /**
   * Aktualisiert ein bestehendes Modul
   * @param moduleId ID des zu aktualisierenden Moduls
   * @param updates Aktualisierungen für das Modul
   * @returns Promise mit dem aktualisierten Modul
   */
  public async updateModule(moduleId: string, updates: Partial<Module>): Promise<Module | null> {
    try {
      const moduleData = await prisma.module.update({
        where: { id: moduleId },
        data: updates,
      });
      this.moduleData = moduleData;
      return moduleData;
    } catch (error) {
      console.error('Error updating module:', error);
      return null;
    }
  }

  /**
   * Löscht ein Modul
   * @param moduleId ID des zu löschenden Moduls
   * @returns Promise mit dem Ergebnis des Löschvorgangs
   */
  public async deleteModule(moduleId: string): Promise<boolean> {
    try {
      const result = await prisma.module.delete({
        where: { id: moduleId },
      });
      
      // Aktualisiere Cache
      this.invalidateCache(this.moduleData?.courseId || '');
      
      return result.id !== null;
    } catch (error) {
      console.error(`Fehler beim Löschen des Moduls ${moduleId}:`, error);
      throw error;
    }
  }

  /**
   * Prüft, ob der Cache für einen Kurs gültig ist
   * @param courseId ID des Kurses
   * @returns true, wenn der Cache gültig ist, sonst false
   */
  private isCacheValid(courseId: string): boolean {
    const lastFetch = this.lastFetchTime.get(courseId);
    if (!lastFetch) return false;
    
    return Date.now() - lastFetch < this.cacheExpiryTime;
  }

  /**
   * Invalidiert den Cache für einen Kurs
   * @param courseId ID des Kurses
   */
  private invalidateCache(courseId: string): void {
    this.lastFetchTime.delete(courseId);
    this.modulesCache.delete(courseId);
  }

  public async loadModule(moduleId: string): Promise<Module | null> {
    try {
      this.moduleData = await prisma.module.findUnique({
        where: { id: moduleId },
      });
      return this.moduleData;
    } catch (error) {
      console.error('Error loading module:', error);
      return null;
    }
  }

  public getCurrentModule(): Module | null {
    return this.moduleData;
  }
}

// Exportiere eine Instanz des ModuleManagers
export const moduleManager = ModuleManager.getInstance();

export async function getModule(slug: string): Promise<Module | null> {
  return prisma.module.findUnique({
    where: { slug }
  });
}

export async function getAllModules(): Promise<Module[]> {
  return prisma.module.findMany({
    orderBy: { order: 'asc' }
  });
}

export async function saveModule(module: Omit<Module, 'id'>): Promise<Module> {
  return prisma.module.create({
    data: module
  });
}

export async function deleteModule(id: string): Promise<void> {
  await prisma.module.delete({
    where: { id }
  });
} 
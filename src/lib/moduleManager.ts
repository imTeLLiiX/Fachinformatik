import { Module } from '@/app/courses/[courseId]/modules';
import { connectToDatabase } from './mongodb';

/**
 * Modul-Manager für Plug-and-Play Modulintegration
 * Bietet Funktionen zum Laden, Speichern und Verwalten von Modulen
 */
export class ModuleManager {
  private static instance: ModuleManager;
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
      const { db } = await connectToDatabase();
      const modules = await db.collection('modules')
        .find({ courseId })
        .toArray() as Module[];

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
   * @param module Das zu speichernde Modul
   * @returns Promise mit der ID des gespeicherten Moduls
   */
  public async saveModule(module: Module): Promise<string> {
    try {
      const { db } = await connectToDatabase();
      
      // Füge Zeitstempel hinzu
      module.createdAt = new Date();
      module.updatedAt = new Date();
      
      const result = await db.collection('modules').insertOne(module);
      
      if (!result.acknowledged) {
        throw new Error('Fehler beim Speichern des Moduls');
      }
      
      // Aktualisiere Cache
      this.invalidateCache(module.courseId);
      
      return result.insertedId.toString();
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
      const { db } = await connectToDatabase();
      
      // Füge Zeitstempel hinzu
      updates.updatedAt = new Date();
      
      const result = await db.collection('modules').findOneAndUpdate(
        { id: moduleId },
        { $set: updates },
        { returnDocument: 'after' }
      );
      
      if (!result) {
        return null;
      }
      
      // Aktualisiere Cache
      this.invalidateCache(result.courseId);
      
      return result as Module;
    } catch (error) {
      console.error(`Fehler beim Aktualisieren des Moduls ${moduleId}:`, error);
      throw error;
    }
  }

  /**
   * Löscht ein Modul
   * @param moduleId ID des zu löschenden Moduls
   * @returns Promise mit dem Ergebnis des Löschvorgangs
   */
  public async deleteModule(moduleId: string): Promise<boolean> {
    try {
      const { db } = await connectToDatabase();
      
      // Hole das Modul, um die courseId zu erhalten
      const module = await db.collection('modules').findOne({ id: moduleId });
      
      if (!module) {
        return false;
      }
      
      const result = await db.collection('modules').deleteOne({ id: moduleId });
      
      // Aktualisiere Cache
      this.invalidateCache(module.courseId);
      
      return result.deletedCount === 1;
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
}

// Exportiere eine Instanz des ModuleManagers
export const moduleManager = ModuleManager.getInstance(); 
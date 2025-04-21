import { prisma } from './prisma';
import type { Module, User, Enrollment } from '@prisma/client';

export class ArchitectureGuard {
  private static instance: ArchitectureGuard;
  private dependencies: any = {};

  private constructor() {}

  public static getInstance(): ArchitectureGuard {
    if (!ArchitectureGuard.instance) {
      ArchitectureGuard.instance = new ArchitectureGuard();
    }
    return ArchitectureGuard.instance;
  }

  public async validateModuleStructure(moduleData: Module): Promise<boolean> {
    try {
      // Validiere Modul-Struktur
      if (!moduleData.title || !moduleData.content) {
        return false;
      }

      const existingModule = await prisma.module.findUnique({
        where: { id: moduleData.id },
      });

      if (!existingModule) {
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error validating module structure:', error);
      return false;
    }
  }

  public async checkModuleDependencies(moduleId: string): Promise<boolean> {
    try {
      const moduleData = await prisma.module.findUnique({
        where: { id: moduleId },
      });

      if (!moduleData) {
        return false;
      }

      // Prüfe Abhängigkeiten
      const dependencies = this.dependencies[moduleId] || [];
      for (const depId of dependencies) {
        const depModule = await prisma.module.findUnique({
          where: { id: depId },
        });
        if (!depModule) {
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error checking module dependencies:', error);
      return false;
    }
  }

  public async validateModuleAccess(moduleId: string, userId: string): Promise<boolean> {
    try {
      const moduleData = await prisma.module.findUnique({
        where: { id: moduleId },
        include: {
          course: {
            include: {
              enrollments: true
            }
          }
        }
      });

      if (!moduleData || !moduleData.course) {
        return false;
      }

      // Prüfe, ob der Benutzer für den Kurs eingeschrieben ist
      const isEnrolled = moduleData.course.enrollments.some(
        (enrollment: Enrollment) => enrollment.userId === userId
      );

      return isEnrolled;
    } catch (error) {
      console.error('Error validating module access:', error);
      return false;
    }
  }
} 
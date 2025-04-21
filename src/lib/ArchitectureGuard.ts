import { connectToDatabase } from './mongodb';
import { Module } from '@/models/Module';
import { User } from '@/models/User';

export class ArchitectureGuard {
  private db: any;

  constructor() {
    this.initialize();
  }

  private async initialize() {
    const { db } = await connectToDatabase();
    this.db = db;
  }

  async autoFix() {
    await this.checkGridStructure();
    await this.validateContentHierarchy();
    await this.synchronizeProgress();
  }

  private async checkGridStructure() {
    // Überprüfe die Grid-Struktur in der Datenbank
    const modules = await this.db.collection('modules').find({}).toArray();
    
    for (const module of modules) {
      // Stelle sicher, dass alle Module eine gültige Reihenfolge haben
      if (typeof module.order !== 'number') {
        await this.db.collection('modules').updateOne(
          { _id: module._id },
          { $set: { order: 0 } }
        );
      }

      // Stelle sicher, dass alle Module einen gültigen Status haben
      if (!['draft', 'published'].includes(module.status)) {
        await this.db.collection('modules').updateOne(
          { _id: module._id },
          { $set: { status: 'draft' } }
        );
      }
    }
  }

  private async validateContentHierarchy() {
    // Überprüfe die Inhaltshierarchie
    const modules = await this.db.collection('modules').find({}).toArray();
    
    for (const module of modules) {
      // Stelle sicher, dass alle Module die erforderlichen Felder haben
      const requiredFields = ['title', 'description', 'topics', 'exercises', 'quizzes', 'flashcards'];
      const missingFields = requiredFields.filter(field => !module[field]);
      
      if (missingFields.length > 0) {
        await this.db.collection('modules').updateOne(
          { _id: module._id },
          { 
            $set: Object.fromEntries(
              missingFields.map(field => [field, field === 'topics' ? [] : field === 'description' ? '' : []])
            )
          }
        );
      }

      // Stelle sicher, dass alle Module eine gültige Schwierigkeitsstufe haben
      if (!['beginner', 'intermediate', 'advanced'].includes(module.difficulty)) {
        await this.db.collection('modules').updateOne(
          { _id: module._id },
          { $set: { difficulty: 'beginner' } }
        );
      }
    }
  }

  private async synchronizeProgress() {
    // Synchronisiere den Fortschritt zwischen Benutzern und Modulen
    const users = await this.db.collection('users').find({}).toArray();
    
    for (const user of users) {
      if (!user.progress) {
        await this.db.collection('users').updateOne(
          { _id: user._id },
          { $set: { progress: {} } }
        );
      }

      // Stelle sicher, dass der Fortschritt für jedes Modul gültig ist
      const modules = await this.db.collection('modules').find({}).toArray();
      const progress = user.progress || {};
      
      for (const module of modules) {
        if (!progress[module._id.toString()]) {
          progress[module._id.toString()] = {
            completed: false,
            lastAccessed: new Date(),
            score: 0
          };
        }
      }

      await this.db.collection('users').updateOne(
        { _id: user._id },
        { $set: { progress } }
      );
    }
  }
} 
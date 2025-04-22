# ENTERPRISE LEARNING PLATFORM - PROJEKTÜBERSICHT

## SYSTEMARCHITEKTUR
Die IT Learning Platform ist eine moderne Webanwendung zur Vermittlung von IT-Kenntnissen. Die Plattform ist mit Next.js, TypeScript, Tailwind CSS und MongoDB aufgebaut.

### Routenstruktur
```code
// CORE STRUCTURE
{
  "root": "/src",
  "routes": {
    "home": "/",
    "learning": {
      "dashboard": "/dashboard",
      "modules": "/courses/[courseId]",
      "submodules": "/courses/[courseId]/[moduleId]"
    },
    "shop": "/shop",
    "tools": "/lern-tools",
    "admin": "/admin"
  }
}
```

### Datenbank-Integration
```typescript
// DATENBANK-INTEGRATION
const DB_CONFIG = {
  URI: "mongodb+srv://nicomerkel:crazy-TeLLiiX8918@cluster0.h9ynj8u.mongodb.net/learning-platform",
  MODELS: {
    User: {
      roles: ["learner", "content-admin", "super-admin"],
      progress: "Map<ModuleID, ProgressData>",
      subscriptions: ["basic", "pro", "lifetime"]
    },
    Module: {
      structure: "yml-based",
      contentTypes: ["theory", "exercise", "quiz", "flashcard"]
    }
  }
}
```

## FRONTEND-SPEZIFIKATIONEN

### Responsive Grid Engine
```typescript
// RESPONSIVE GRID ENGINE
const GRID_CONFIG = {
  breakpoints: {
    desktop: { min: 1280, columns: 4 },
    tablet: { min: 768, columns: 2 },
    mobile: { max: 767, columns: 1 }
  },
  modules: 12,
  card: {
    dimensions: "300x200px",
    aspectRatio: "16:9 → 4:3 (adaptive)",
    spacing: "clamp(1rem, 4vw, 4rem)"
  },
  progress: {
    radialSize: "100px",
    animation: "stroke-dashoffset 1s ease-out"
  }
}
```

### Hauptkomponenten

#### Frontend
- **ModuleView**: Die zentrale Komponente zur Darstellung von Kursmodulen
  - Unterstützt verschiedene Inhaltstypen: Themen, Übungen, Quizze und Karteikarten
  - Responsive Design mit unterschiedlichen Layouts für Mobile und Desktop
  - Fortschrittsanzeige für jedes Modul

#### UI-Komponenten
- **Button**: Anpassbare Button-Komponente mit verschiedenen Varianten
  - Default, Destructive, Outline, Secondary, Ghost, Link
  - Verschiedene Größen: Default, Small, Large, Icon
- **Card**: Container-Komponente mit verschiedenen Unterkomponenten
  - CardHeader, CardTitle, CardDescription, CardContent, CardFooter
- **Progress**: Fortschrittsanzeige für Module und Übungen

#### Datenmodelle
- **Module**: Zentrale Datenstruktur für Kursinhalte
  - Grundlegende Informationen (id, title, description, duration)
  - Topics: Theoretische Inhalte
  - Exercises: Praktische Übungen
  - Quiz: Wissenstests
  - Flashcards: Lernkarten

#### Backend
- **MongoDB Integration**: Datenbankanbindung für Module und Benutzer
- **API Routes**: Endpunkte für CRUD-Operationen
- **ModuleManager**: Verwaltung und Caching von Modulinhalten

## BACKEND-SERVICES
```typescript
// CRITICAL SERVICES
class ModuleManager {
  async getModulesForCourse(courseId: string, forceRefresh = false): Promise<Module[]> {
    // Implementierung vorhanden
  }
  
  async saveModule(module: Module): Promise<string> {
    // Implementierung vorhanden
  }
  
  async updateModule(moduleId: string, updates: Partial<Module>): Promise<Module | null> {
    // Implementierung vorhanden
  }
  
  async deleteModule(moduleId: string): Promise<boolean> {
    // Implementierung vorhanden
  }
}

class PaymentService {
  async handleSubscription(
    tier: "monthly" | "yearly" | "lifetime"
  ) {
    // Stripe/Lemon Squeezy Integration (noch zu implementieren)
  }
}
```

## TESTING & QUALITÄTSSICHERUNG
```typescript
// AUTOMATISIERTE TESTS
const TEST_SUITE = {
  unit: ["grid-recovery", "role-validation", "payment-calculations"],
  e2e: {
    criticalPaths: [
      "Purchase Flow → Module Unlock",
      "Admin → User Role Update",
      "Progress Sync Across Devices"
    ],
    performance: {
      loadTime: "<3s",
      fps: ">50fps"
    }
  }
}

// SICHERHEITSMASSNAHMEN
const SECURITY = {
  db: {
    ipWhitelisting: true,
    readOnlyUsers: true,
    encryptedConnections: true
  },
  app: {
    csp: true,
    rateLimiting: "100req/min",
    sanitization: ["inputs", "outputs"]
  }
}
```

### Technologie-Stack
- **Frontend**: Next.js, TypeScript, Tailwind CSS
- **Backend**: Node.js, MongoDB
- **Authentication**: NextAuth.js
- **Styling**: Tailwind CSS mit benutzerdefinierten Komponenten
- **State Management**: React Hooks
- **API**: RESTful API mit Next.js API Routes

### Aktuelle Features
1. Modulare Kursstruktur
2. Interaktive Lerninhalte
3. Fortschrittsverfolgung
4. Responsive Design
5. Benutzerauthentifizierung
6. Datenbankanbindung
7. Admin-Dashboard (Grundstruktur)
8. Shop-Seite mit Abonnement-Plänen

### Entwicklungsumgebung
- Node.js
- MongoDB
- TypeScript
- ESLint für Code-Qualität
- Git für Versionskontrolle

## IMPLEMENTIERUNGSANWEISUNG
/** 
 * Anweisung für Cursor:
 * 1. Analysiere existierende Codebase auf Architekturprobleme
 * 2. Implementiere fehlende Features in Prioritätenreihenfolge:
 *    a) Admin Dashboard mit RBAC
 *    b) Payment Gateway Integration
 *    c) Lern-Toolkit Komponenten
 * 3. Optimiere Performance durch:
 *    - Lazy Loading von Shop-Komponenten
 *    - Redis Caching für Module
 *    - Code-Splitting nach Routen
 * 4. Dokumentiere alle Änderungen im ARCHITECTURE.md
 * 
 * Bei Konflikten:
 * - Priorisiere Funktionsfähigkeit
 * - Zeige Alternativlösungen mit Tradeoffs
 * - Erhalte Bestätigung für Major Refactorings
 */ 
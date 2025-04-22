const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

// Module templates for each course
const moduleTemplates = {
  'html-css': [
    {
      id: 'html-css-1',
      courseId: 'html-css',
      title: 'Modul 1: HTML Grundlagen',
      description: 'Einführung in HTML und Webentwicklung',
      duration: '4 Stunden',
      topics: [
        {
          id: 'html-css-1-topic-1',
          title: 'Einführung in HTML',
          content: 'Was ist HTML, Geschichte und Grundstruktur'
        },
        {
          id: 'html-css-1-topic-2',
          title: 'Grundlegende HTML-Elemente',
          content: 'Text, Links, Bilder und Listen'
        }
      ],
      exercises: [
        {
          id: 'html-css-1-exercise-1',
          title: 'Erste Webseite',
          description: 'Erstellen Sie eine einfache HTML-Seite',
          solution: '<!DOCTYPE html>\n<html>\n<head>\n<title>Meine erste Webseite</title>\n</head>\n<body>\n<h1>Willkommen!</h1>\n</body>\n</html>'
        }
      ],
      quiz: {
        id: 'html-css-1-quiz-1',
        title: 'HTML Grundlagen Quiz',
        questions: [
          {
            id: 'html-css-1-quiz-1-q1',
            question: 'Was bedeutet HTML?',
            options: [
              'Hypertext Markup Language',
              'High Tech Modern Language',
              'Hypertext Modern Layout',
              'High Tech Markup Layout'
            ],
            correctAnswer: 'Hypertext Markup Language'
          }
        ]
      },
      flashcards: {
        id: 'html-css-1-flashcards-1',
        title: 'HTML Grundbegriffe',
        cards: [
          {
            id: 'html-css-1-flashcards-1-c1',
            front: 'Was ist ein HTML-Tag?',
            back: 'Ein Element zur Strukturierung von Webseiten-Inhalten'
          }
        ]
      }
    },
    {
      id: 'html-css-2',
      courseId: 'html-css',
      title: 'Modul 2: CSS Grundlagen',
      description: 'Einführung in CSS und Styling',
      duration: '4 Stunden',
      topics: [
        {
          id: 'html-css-2-topic-1',
          title: 'Einführung in CSS',
          content: 'Was ist CSS und wie wird es eingebunden'
        },
        {
          id: 'html-css-2-topic-2',
          title: 'CSS Selektoren',
          content: 'Verschiedene Arten von CSS-Selektoren'
        }
      ],
      exercises: [
        {
          id: 'html-css-2-exercise-1',
          title: 'Styling einer Webseite',
          description: 'Fügen Sie CSS zu Ihrer HTML-Seite hinzu',
          solution: 'body { font-family: Arial; }\nh1 { color: blue; }'
        }
      ],
      quiz: {
        id: 'html-css-2-quiz-1',
        title: 'CSS Grundlagen Quiz',
        questions: [
          {
            id: 'html-css-2-quiz-1-q1',
            question: 'Wie bindet man CSS ein?',
            options: [
              '<style>, <link>, inline-style',
              'nur <style>',
              'nur <link>',
              'nur inline-style'
            ],
            correctAnswer: '<style>, <link>, inline-style'
          }
        ]
      },
      flashcards: {
        id: 'html-css-2-flashcards-1',
        title: 'CSS Grundbegriffe',
        cards: [
          {
            id: 'html-css-2-flashcards-1-c1',
            front: 'Was ist ein CSS-Selektor?',
            back: 'Ein Muster, das HTML-Elemente identifiziert, die gestylt werden sollen'
          }
        ]
      }
    }
  ],
  'sql': [
    {
      id: 'sql-1',
      courseId: 'sql',
      title: 'Modul 1: SQL Grundlagen',
      description: 'Einführung in SQL und Datenbankabfragen',
      duration: '3 Stunden',
      topics: [
        {
          id: 'sql-1-topic-1',
          title: 'Einführung in SQL',
          content: 'Was ist SQL und wozu wird es verwendet'
        },
        {
          id: 'sql-1-topic-2',
          title: 'SELECT Abfragen',
          content: 'Grundlegende SELECT-Anweisungen'
        }
      ],
      exercises: [
        {
          id: 'sql-1-exercise-1',
          title: 'Erste SELECT-Abfrage',
          description: 'Schreiben Sie eine einfache SELECT-Abfrage',
          solution: 'SELECT * FROM users;'
        }
      ],
      quiz: {
        id: 'sql-1-quiz-1',
        title: 'SQL Grundlagen Quiz',
        questions: [
          {
            id: 'sql-1-quiz-1-q1',
            question: 'Welcher Befehl wird zum Abrufen von Daten verwendet?',
            options: ['SELECT', 'INSERT', 'UPDATE', 'DELETE'],
            correctAnswer: 'SELECT'
          }
        ]
      },
      flashcards: {
        id: 'sql-1-flashcards-1',
        title: 'SQL Grundbegriffe',
        cards: [
          {
            id: 'sql-1-flashcards-1-c1',
            front: 'Was ist eine Tabelle?',
            back: 'Eine strukturierte Sammlung von Daten in Zeilen und Spalten'
          }
        ]
      }
    }
  ],
  bwl: [
    {
      id: 'bwl-1',
      courseId: 'bwl',
      title: 'Modul 1: BWL Grundlagen',
      description: 'Einführung in die Betriebswirtschaftslehre',
      duration: '6 Stunden',
      topics: [
        {
          id: 'bwl-1-topic-1',
          title: 'Was ist BWL?',
          content: 'Grundlegende Konzepte der Betriebswirtschaftslehre'
        },
        {
          id: 'bwl-1-topic-2',
          title: 'Unternehmensformen',
          content: 'Verschiedene Rechtsformen von Unternehmen'
        }
      ],
      exercises: [
        {
          id: 'bwl-1-exercise-1',
          title: 'Unternehmensformen',
          description: 'Vergleichen Sie verschiedene Unternehmensformen',
          solution: '1. GmbH\n2. AG\n3. OHG\n4. KG'
        }
      ],
      quiz: {
        id: 'bwl-1-quiz-1',
        title: 'BWL Grundlagen Quiz',
        questions: [
          {
            id: 'bwl-1-quiz-1-q1',
            question: 'Was ist eine GmbH?',
            options: [
              'Gesellschaft mit beschränkter Haftung',
              'Gesellschaft mit besonderer Haftung',
              'Gesellschaft mit breiter Haftung',
              'Gesellschaft mit begrenzter Haftung'
            ],
            correctAnswer: 'Gesellschaft mit beschränkter Haftung'
          }
        ]
      },
      flashcards: {
        id: 'bwl-1-flashcards-1',
        title: 'BWL Grundbegriffe',
        cards: [
          {
            id: 'bwl-1-flashcards-1-c1',
            front: 'Was ist ein Unternehmen?',
            back: 'Eine wirtschaftliche Einheit zur Erstellung von Gütern oder Dienstleistungen'
          }
        ]
      }
    }
  ],
  csharp: [
    {
      id: 'csharp-1',
      courseId: 'csharp',
      title: 'Modul 1: C# Grundlagen',
      description: 'Einführung in die C#-Programmierung',
      duration: '5 Stunden',
      topics: [
        {
          id: 'csharp-1-topic-1',
          title: 'Einführung in C#',
          content: 'Was ist C#, Installation und erste Schritte'
        },
        {
          id: 'csharp-1-topic-2',
          title: 'Variablen und Datentypen',
          content: 'Grundlegende Datentypen in C#'
        }
      ],
      exercises: [
        {
          id: 'csharp-1-exercise-1',
          title: 'Hello World',
          description: 'Erstellen Sie Ihr erstes C#-Programm',
          solution: 'using System;\n\nclass Program {\n    static void Main() {\n        Console.WriteLine("Hello, World!");\n    }\n}'
        }
      ],
      quiz: {
        id: 'csharp-1-quiz-1',
        title: 'C# Grundlagen Quiz',
        questions: [
          {
            id: 'csharp-1-quiz-1-q1',
            question: 'Welcher Datentyp wird für ganze Zahlen verwendet?',
            options: ['int', 'float', 'string', 'bool'],
            correctAnswer: 'int'
          }
        ]
      },
      flashcards: {
        id: 'csharp-1-flashcards-1',
        title: 'C# Grundbegriffe',
        cards: [
          {
            id: 'csharp-1-flashcards-1-c1',
            front: 'Was ist eine Variable?',
            back: 'Ein benannter Speicherplatz für Daten im Programm'
          }
        ]
      }
    }
  ],
  ipv4: [
    {
      id: 'ipv4-1',
      courseId: 'ipv4',
      title: 'Modul 1: IPv4 Grundlagen',
      description: 'Einführung in IPv4 und Netzwerke',
      duration: '2 Stunden',
      topics: [
        {
          id: 'ipv4-1-topic-1',
          title: 'Was ist IPv4?',
          content: 'Grundlagen des IPv4 Protokolls'
        },
        {
          id: 'ipv4-1-topic-2',
          title: 'IP-Adressen',
          content: 'Aufbau und Struktur von IPv4-Adressen'
        }
      ],
      exercises: [
        {
          id: 'ipv4-1-exercise-1',
          title: 'IP-Adressen analysieren',
          description: 'Analysieren Sie verschiedene IPv4-Adressen',
          solution: '1. Netzwerk-ID identifizieren\n2. Host-ID identifizieren\n3. Adresstyp bestimmen'
        }
      ],
      quiz: {
        id: 'ipv4-1-quiz-1',
        title: 'IPv4 Grundlagen Quiz',
        questions: [
          {
            id: 'ipv4-1-quiz-1-q1',
            question: 'Wie viele Bits hat eine IPv4-Adresse?',
            options: [
              '32 Bits',
              '64 Bits',
              '128 Bits',
              '256 Bits'
            ],
            correctAnswer: '32 Bits'
          }
        ]
      },
      flashcards: {
        id: 'ipv4-1-flashcards-1',
        title: 'IPv4 Grundbegriffe',
        cards: [
          {
            id: 'ipv4-1-flashcards-1-c1',
            front: 'Was ist eine IP-Adresse?',
            back: 'Eine eindeutige numerische Adresse, die ein Gerät in einem Netzwerk identifiziert'
          }
        ]
      }
    }
  ],
  ipv6: [
    {
      id: 'ipv6-1',
      courseId: 'ipv6',
      title: 'Modul 1: IPv6 Grundlagen',
      description: 'Einführung in IPv6',
      duration: '2 Stunden',
      topics: [
        {
          id: 'ipv6-1-topic-1',
          title: 'IPv6 Grundlagen',
          content: 'Aufbau und Struktur von IPv6-Adressen'
        },
        {
          id: 'ipv6-1-topic-2',
          title: 'IPv6 vs IPv4',
          content: 'Unterschiede zwischen IPv6 und IPv4'
        }
      ],
      exercises: [
        {
          id: 'ipv6-1-exercise-1',
          title: 'IPv6-Adressen',
          description: 'Analysieren Sie IPv6-Adressen',
          solution: '1. Präfix\n2. Interface-ID\n3. Adresstypen'
        }
      ],
      quiz: {
        id: 'ipv6-1-quiz-1',
        title: 'IPv6 Quiz',
        questions: [
          {
            id: 'ipv6-1-quiz-1-q1',
            question: 'Wie viele Bits hat eine IPv6-Adresse?',
            options: ['32', '64', '128', '256'],
            correctAnswer: '128'
          }
        ]
      },
      flashcards: {
        id: 'ipv6-1-flashcards-1',
        title: 'IPv6 Begriffe',
        cards: [
          {
            id: 'ipv6-1-flashcards-1-c1',
            front: 'Was ist ein IPv6-Präfix?',
            back: 'Der Netzwerkteil einer IPv6-Adresse'
          }
        ]
      }
    }
  ],
  subnetting: [
    {
      id: 'subnetting-1',
      courseId: 'subnetting',
      title: 'Modul 1: Subnetting Grundlagen',
      description: 'Einführung in das Subnetting von Netzwerken',
      duration: '2 Stunden',
      topics: [
        {
          id: 'subnetting-1-topic-1',
          title: 'Was ist Subnetting?',
          content: 'Grundlagen des Subnettings'
        },
        {
          id: 'subnetting-1-topic-2',
          title: 'Subnetzmasken',
          content: 'Verwendung und Berechnung von Subnetzmasken'
        }
      ],
      exercises: [
        {
          id: 'subnetting-1-exercise-1',
          title: 'Subnetzmasken berechnen',
          description: 'Berechnen Sie Subnetzmasken für verschiedene Netzwerke',
          solution: '1. Netzwerkgröße bestimmen\n2. Anzahl der benötigten Hosts berechnen\n3. Subnetzmaske ableiten'
        }
      ],
      quiz: {
        id: 'subnetting-1-quiz-1',
        title: 'Subnetting Grundlagen Quiz',
        questions: [
          {
            id: 'subnetting-1-quiz-1-q1',
            question: 'Was ist eine Subnetzmaske?',
            options: [
              'Eine Bitmaske zur Trennung von Netzwerk- und Hostanteil',
              'Ein Filter für Netzwerkpakete',
              'Eine Sicherheitseinstellung',
              'Ein Routing-Protokoll'
            ],
            correctAnswer: 'Eine Bitmaske zur Trennung von Netzwerk- und Hostanteil'
          }
        ]
      },
      flashcards: {
        id: 'subnetting-1-flashcards-1',
        title: 'Subnetting Grundbegriffe',
        cards: [
          {
            id: 'subnetting-1-flashcards-1-c1',
            front: 'Was ist der Zweck des Subnettings?',
            back: 'Aufteilung eines Netzwerks in kleinere, effizientere Teilnetze'
          }
        ]
      }
    }
  ],
  english: [
    {
      id: 'english-1',
      courseId: 'english',
      title: 'Modul 1: Englisch Grundlagen',
      description: 'Grundlagen der englischen Sprache für IT-Profis',
      duration: '2 Stunden',
      topics: [
        {
          id: 'english-1-topic-1',
          title: 'IT-Fachbegriffe',
          content: 'Wichtige englische Fachbegriffe aus der IT'
        },
        {
          id: 'english-1-topic-2',
          title: 'Technische Dokumentation',
          content: 'Lesen und Verstehen von technischer Dokumentation'
        }
      ],
      exercises: [
        {
          id: 'english-1-exercise-1',
          title: 'Fachbegriffe übersetzen',
          description: 'Übersetzen Sie wichtige IT-Fachbegriffe',
          solution: '1. Hardware-Begriffe\n2. Software-Begriffe\n3. Netzwerk-Begriffe'
        }
      ],
      quiz: {
        id: 'english-1-quiz-1',
        title: 'Englisch Grundlagen Quiz',
        questions: [
          {
            id: 'english-1-quiz-1-q1',
            question: 'Was bedeutet "debugging"?',
            options: [
              'Fehlerbehebung',
              'Programmierung',
              'Testen',
              'Dokumentation'
            ],
            correctAnswer: 'Fehlerbehebung'
          }
        ]
      },
      flashcards: {
        id: 'english-1-flashcards-1',
        title: 'IT-Fachbegriffe',
        cards: [
          {
            id: 'english-1-flashcards-1-c1',
            front: 'Was bedeutet "interface"?',
            back: 'Schnittstelle oder Benutzeroberfläche'
          }
        ]
      }
    }
  ]
};

async function generateModules() {
  const uri = 'mongodb+srv://nicomerkel:crazy-TeLLiiX8918@cluster0.h9ynj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('it_learning_platform');
    
    // Clear existing modules
    console.log('Clearing existing modules...');
    await db.collection('modules').deleteMany({});
    
    // Insert modules for each course
    for (const [courseId, modules] of Object.entries(moduleTemplates)) {
      console.log(`Inserting modules for ${courseId}...`);
      const result = await db.collection('modules').insertMany(modules);
      console.log(`Inserted ${result.insertedCount} modules for ${courseId}`);
    }
    
    // Verify modules
    const allModules = await db.collection('modules').find({}).toArray();
    console.log('\nAll modules:');
    allModules.forEach(module => {
      console.log(`- ${module.title} (${module.id}) for course ${module.courseId}`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

generateModules(); 
interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: {
    title: string;
    content: string[];
    exercises: string[];
  }[];
  quiz: {
    questions: number;
    timeLimit: string;
  };
}

export const courseModules: { [key: string]: Module[] } = {
  'html-css': [
    {
      id: 'html-1',
      title: 'Einführung in HTML & CSS',
      description: 'Grundlegende Konzepte und Einrichtung der Entwicklungsumgebung',
      duration: '1 Woche',
      topics: [
        {
          title: 'Was ist HTML und CSS?',
          content: [
            'Geschichte und Entwicklung von HTML/CSS',
            'Rolle von HTML in Webseiten',
            'Rolle von CSS in Webseiten',
            'Aktuelle Standards: HTML5 und CSS3'
          ],
          exercises: [
            'Erste HTML-Datei erstellen',
            'Grundlegende Struktur analysieren'
          ]
        },
        {
          title: 'Entwicklungsumgebung einrichten',
          content: [
            'Installation von Visual Studio Code',
            'Installation wichtiger Extensions',
            'Einrichtung des Live Servers',
            'Chrome Developer Tools kennenlernen'
          ],
          exercises: [
            'VS Code konfigurieren',
            'Erste Datei mit Live Server öffnen'
          ]
        }
      ],
      quiz: {
        questions: 10,
        timeLimit: '15 Minuten'
      }
    },
    {
      id: 'html-2',
      title: 'HTML Grundlagen',
      description: 'HTML-Syntax und grundlegende Elemente',
      duration: '2 Wochen',
      topics: [
        {
          title: 'HTML-Syntax',
          content: [
            'Elemente und Tags',
            'Attribute',
            'Verschachtelung',
            'HTML-Dokumentstruktur'
          ],
          exercises: [
            'Tags richtig verschachteln',
            'Attribute hinzufügen',
            'Dokumentstruktur erstellen'
          ]
        },
        {
          title: 'Grundlegende HTML-Elemente',
          content: [
            'Überschriften (h1-h6)',
            'Absätze (p)',
            'Links (a)',
            'Bilder (img)',
            'Listen (ul, ol, li)'
          ],
          exercises: [
            'Textseite erstellen',
            'Bilder einbinden',
            'Navigation mit Links erstellen'
          ]
        }
      ],
      quiz: {
        questions: 15,
        timeLimit: '20 Minuten'
      }
    }
  ],
  'sql': [
    {
      id: 'sql-1',
      title: 'Einführung in Datenbanken',
      description: 'Grundlagen relationaler Datenbanken und SQL',
      duration: '2 Wochen',
      topics: [
        {
          title: 'Datenbankgrundlagen',
          content: [
            'Was sind Datenbanken?',
            'Relationale Datenbanken',
            'Tabellen und Beziehungen',
            'Primär- und Fremdschlüssel'
          ],
          exercises: [
            'Datenbankentwurf erstellen',
            'Beziehungen definieren'
          ]
        },
        {
          title: 'SQL Basics',
          content: [
            'SELECT Anweisungen',
            'WHERE Bedingungen',
            'ORDER BY Sortierung',
            'INSERT, UPDATE, DELETE'
          ],
          exercises: [
            'Einfache Abfragen schreiben',
            'Daten manipulieren'
          ]
        }
      ],
      quiz: {
        questions: 12,
        timeLimit: '25 Minuten'
      }
    }
  ],
  'networking': [
    {
      id: 'net-1',
      title: 'Netzwerkgrundlagen',
      description: 'Grundlegende Konzepte der Netzwerktechnik',
      duration: '3 Wochen',
      topics: [
        {
          title: 'IPv4 Grundlagen',
          content: [
            'IPv4-Adressen verstehen',
            'Subnetzmasken',
            'Netzwerk- und Hostanteile',
            'Private und öffentliche Adressen'
          ],
          exercises: [
            'IP-Adressen berechnen',
            'Subnetzmasken anwenden'
          ]
        },
        {
          title: 'Subnetting',
          content: [
            'Subnetz-Planung',
            'CIDR-Notation',
            'Subnetz-Berechnung',
            'Netzwerkdesign'
          ],
          exercises: [
            'Subnetze berechnen',
            'Netzwerkplan erstellen'
          ]
        }
      ],
      quiz: {
        questions: 15,
        timeLimit: '30 Minuten'
      }
    }
  ],
  'programming': [
    {
      id: 'prog-1',
      title: 'C# Grundlagen',
      description: 'Einführung in die C# Programmierung',
      duration: '4 Wochen',
      topics: [
        {
          title: 'C# Basics',
          content: [
            'Variablen und Datentypen',
            'Kontrollstrukturen',
            'Methoden und Funktionen',
            'Objektorientierung'
          ],
          exercises: [
            'Einfache Programme schreiben',
            'Klassen erstellen'
          ]
        },
        {
          title: 'Fortgeschrittene Konzepte',
          content: [
            'Vererbung',
            'Interfaces',
            'Exception Handling',
            'LINQ Grundlagen'
          ],
          exercises: [
            'Vererbungshierarchie implementieren',
            'Fehlerbehandlung einbauen'
          ]
        }
      ],
      quiz: {
        questions: 20,
        timeLimit: '45 Minuten'
      }
    }
  ],
  'business': [
    {
      id: 'bwl-1',
      title: 'BWL Grundlagen',
      description: 'Einführung in die Betriebswirtschaftslehre',
      duration: '3 Wochen',
      topics: [
        {
          title: 'Unternehmensformen',
          content: [
            'Einzelunternehmen',
            'Personengesellschaften',
            'Kapitalgesellschaften',
            'Vor- und Nachteile'
          ],
          exercises: [
            'Unternehmensformen vergleichen',
            'Fallstudien analysieren'
          ]
        },
        {
          title: 'Grundlagen des Rechnungswesens',
          content: [
            'Buchführung',
            'Bilanz',
            'Gewinn- und Verlustrechnung',
            'Kostenrechnung'
          ],
          exercises: [
            'Buchungssätze erstellen',
            'Bilanzen aufstellen'
          ]
        }
      ],
      quiz: {
        questions: 15,
        timeLimit: '30 Minuten'
      }
    }
  ],
  'english': [
    {
      id: 'eng-1',
      title: 'Technical English',
      description: 'Englisch für IT-Professionals',
      duration: '4 Wochen',
      topics: [
        {
          title: 'IT Vocabulary',
          content: [
            'Hardware Terms',
            'Software Development',
            'Network Terminology',
            'Common Abbreviations'
          ],
          exercises: [
            'Vocabulary Exercises',
            'Reading Comprehension'
          ]
        },
        {
          title: 'Technical Documentation',
          content: [
            'Reading Documentation',
            'Writing Documentation',
            'Email Communication',
            'Technical Presentations'
          ],
          exercises: [
            'Write Technical Descriptions',
            'Create Documentation'
          ]
        }
      ],
      quiz: {
        questions: 20,
        timeLimit: '30 Minuten'
      }
    }
  ]
}; 
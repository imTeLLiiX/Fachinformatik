import { quizQuestions } from './quizQuestions';

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
    questionIds: string[];
  };
}

export const courseModules: { [key: string]: Module[] } = {
  '1': [ // Grundlagen der Informatik
    {
      id: '1-1',
      title: 'Binärsystem und Zahlendarstellung',
      description: 'Grundlegende Konzepte der digitalen Informationsverarbeitung',
      duration: '2 Wochen',
      topics: [
        {
          title: 'Binärsystem',
          content: [
            'Grundlagen des Binärsystems',
            'Umrechnung zwischen Dezimal- und Binärsystem',
            'Binäre Addition und Subtraktion',
            'Zweierkomplement-Darstellung'
          ],
          exercises: [
            'Binär-Dezimal Umrechnungen',
            'Binäre Rechenaufgaben',
            'Zweierkomplement-Übungen'
          ]
        },
        {
          title: 'Zahlendarstellung',
          content: [
            'Gleitkommazahlen',
            'IEEE 754 Standard',
            'Rundungsfehler',
            'Zahlendarstellung in verschiedenen Systemen'
          ],
          exercises: [
            'Gleitkommazahlen konvertieren',
            'Rundungsfehler berechnen',
            'Zahlensysteme vergleichen'
          ]
        }
      ],
      quiz: {
        questions: 10,
        timeLimit: '30 Minuten',
        questionIds: ['bwl-1', 'bwl-2'] // Example question IDs
      }
    },
    {
      id: '1-2',
      title: 'Netzwerke und Kommunikation',
      description: 'Grundlagen der Netzwerktechnik und Kommunikationsprotokolle',
      duration: '2 Wochen',
      topics: [
        {
          title: 'Netzwerkgrundlagen',
          content: [
            'OSI-Modell',
            'TCP/IP-Protokollsuite',
            'Netzwerktopologien',
            'Netzwerkkomponenten'
          ],
          exercises: [
            'OSI-Schichten zuordnen',
            'TCP/IP-Konfiguration',
            'Netzwerktopologien analysieren'
          ]
        },
        {
          title: 'Netzwerkprotokolle',
          content: [
            'DHCP und DNS',
            'HTTP und HTTPS',
            'FTP und SMTP',
            'Netzwerksicherheit'
          ],
          exercises: [
            'Protokolle konfigurieren',
            'Sicherheitsmaßnahmen implementieren',
            'Netzwerkprobleme diagnostizieren'
          ]
        }
      ],
      quiz: {
        questions: 12,
        timeLimit: '45 Minuten',
        questionIds: ['net-1', 'net-2'] // Example question IDs
      }
    },
    {
      id: '1-3',
      title: 'Betriebssysteme',
      description: 'Grundlagen der Betriebssysteme und Systemverwaltung',
      duration: '2 Wochen',
      topics: [
        {
          title: 'Betriebssystemgrundlagen',
          content: [
            'Aufgaben eines Betriebssystems',
            'Prozessverwaltung',
            'Speicherverwaltung',
            'Dateisysteme'
          ],
          exercises: [
            'Prozesse verwalten',
            'Speicher allokieren',
            'Dateisysteme verwalten'
          ]
        },
        {
          title: 'Systemadministration',
          content: [
            'Benutzerverwaltung',
            'Berechtigungen',
            'Systemkonfiguration',
            'Sicherheit'
          ],
          exercises: [
            'Benutzer erstellen und verwalten',
            'Berechtigungen setzen',
            'Systeme absichern'
          ]
        }
      ],
      quiz: {
        questions: 15,
        timeLimit: '45 Minuten',
        questionIds: ['os-1'] // Example question IDs
      }
    },
    {
      id: '1-4',
      title: 'Programmierung und Datenbanken',
      description: 'Einführung in Programmierung und Datenbankmanagement',
      duration: '2 Wochen',
      topics: [
        {
          title: 'Programmierung',
          content: [
            'Grundlagen der Programmierung',
            'Variablen und Datentypen',
            'Kontrollstrukturen',
            'Funktionen und Module'
          ],
          exercises: [
            'Programme schreiben',
            'Algorithmen implementieren',
            'Code debuggen'
          ]
        },
        {
          title: 'Datenbanken',
          content: [
            'Datenbankgrundlagen',
            'SQL-Grundlagen',
            'Datenmodellierung',
            'Datenbankdesign'
          ],
          exercises: [
            'SQL-Abfragen schreiben',
            'Datenbanken entwerfen',
            'Daten modellieren'
          ]
        }
      ],
      quiz: {
        questions: 12,
        timeLimit: '40 Minuten',
        questionIds: ['prog-1', 'db-1'] // Example question IDs
      }
    }
  ]
}; 
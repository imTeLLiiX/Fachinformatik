export interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  topics: {
    title: string;
    content: string[];
  }[];
  exercises: {
    id: string;
    title: string;
    description: string;
    solution?: string;
  }[];
  quiz: {
    questions: {
      question: string;
      options: string[];
      answer: string;
      explanation: string;
    }[];
    timeLimit: string;
  };
  flashcards: {
    question: string;
    answer: string;
  }[];
}

export const courseModules: Module[] = [
  {
    id: "html-css-1",
    title: "Einführung in HTML & CSS",
    description: "Grundlegende Konzepte und Werkzeuge für Webentwicklung",
    duration: "2 Wochen",
    topics: [
      {
        title: "Kursübersicht",
        content: [
          "Ziele und Struktur des Kurses",
          "Benötigte Software und Tools",
          "Grundlegende Webkonzepte"
        ]
      }
    ],
    exercises: [
      {
        id: "ex-1",
        title: "Erste Schritte",
        description: "Erstellen Sie Ihre erste HTML-Seite",
        solution: "<!DOCTYPE html>\n<html>\n<head>\n<title>Meine erste Seite</title>\n</head>\n<body>\n<h1>Willkommen!</h1>\n</body>\n</html>"
      }
    ],
    quiz: {
      questions: [
        {
          question: "Was bedeutet HTML?",
          options: [
            "Hyper Text Markup Language",
            "High Tech Modern Language",
            "Hyper Transfer Markup Language",
            "Home Tool Markup Language"
          ],
          answer: "Hyper Text Markup Language",
          explanation: "HTML steht für Hyper Text Markup Language und ist die Standardsprache für Webseiten."
        }
      ],
      timeLimit: "30 Minuten"
    },
    flashcards: [
      {
        question: "Was ist HTML?",
        answer: "Eine Auszeichnungssprache zur Strukturierung von Webinhalten"
      }
    ]
  },
  {
    id: "html-css-2",
    title: "HTML Grundlagen",
    description: "Erste Schritte mit HTML-Tags und Dokumentstruktur",
    duration: "2 Wochen",
    topics: [
      {
        title: "HTML-Dokumentstruktur",
        content: [
          "DOCTYPE-Deklaration",
          "HTML, Head und Body Tags",
          "Meta-Tags und Zeichenkodierung"
        ]
      }
    ],
    exercises: [
      {
        id: "ex-2",
        title: "Grundlegende HTML-Struktur",
        description: "Erstellen Sie eine HTML-Seite mit korrekter Dokumentstruktur",
        solution: "<!DOCTYPE html>\n<html lang=\"de\">\n<head>\n<meta charset=\"UTF-8\">\n<title>Meine Seite</title>\n</head>\n<body>\n<h1>Überschrift</h1>\n<p>Ein Absatz Text.</p>\n</body>\n</html>"
      }
    ],
    quiz: {
      questions: [
        {
          question: "Welches Tag wird für die Hauptüberschrift verwendet?",
          options: [
            "<h1>",
            "<header>",
            "<title>",
            "<heading>"
          ],
          answer: "<h1>",
          explanation: "Das <h1> Tag wird für die Hauptüberschrift einer Webseite verwendet."
        }
      ],
      timeLimit: "30 Minuten"
    },
    flashcards: [
      {
        question: "Was ist der Zweck des DOCTYPE-Tags?",
        answer: "Es gibt den HTML-Standard an, den der Browser verwenden soll"
      }
    ]
  },
  {
    id: "html-css-3",
    title: "CSS Einführung",
    description: "Grundlagen der CSS-Formatierung und Styling",
    duration: "2 Wochen",
    topics: [
      {
        title: "CSS-Grundlagen",
        content: [
          "Inline, Internal und External CSS",
          "CSS-Selektoren",
          "Farben und Einheiten"
        ]
      }
    ],
    exercises: [
      {
        id: "ex-3",
        title: "Erstes CSS-Styling",
        description: "Fügen Sie CSS zu Ihrer HTML-Seite hinzu",
        solution: "<style>\nbody {\n  font-family: Arial, sans-serif;\n  margin: 20px;\n}\nh1 {\n  color: #333;\n}\n</style>"
      }
    ],
    quiz: {
      questions: [
        {
          question: "Wie wird eine externe CSS-Datei eingebunden?",
          options: [
            "<link rel=\"stylesheet\" href=\"style.css\">",
            "<style src=\"style.css\">",
            "<css file=\"style.css\">",
            "<import css=\"style.css\">"
          ],
          answer: "<link rel=\"stylesheet\" href=\"style.css\">",
          explanation: "Externe CSS-Dateien werden mit dem <link> Tag im <head> Bereich eingebunden."
        }
      ],
      timeLimit: "30 Minuten"
    },
    flashcards: [
      {
        question: "Was ist der Unterschied zwischen ID und Class Selektoren?",
        answer: "IDs sind eindeutig (einmal pro Seite), Classes können mehrfach verwendet werden"
      }
    ]
  }
]; 
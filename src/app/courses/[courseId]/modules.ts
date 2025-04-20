export interface Module {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: string;
  topics: {
    id: string;
    title: string;
    content: string;
  }[];
  exercises: {
    id: string;
    title: string;
    description: string;
    solution: string;
  }[];
  quiz: {
    id: string;
    title: string;
    questions: {
      id: string;
      question: string;
      options: string[];
      correctAnswer: string;
    }[];
  };
  flashcards: {
    id: string;
    title: string;
    cards: {
      id: string;
      front: string;
      back: string;
    }[];
  };
  createdAt?: Date;
  updatedAt?: Date;
}

export const courseModules: Module[] = [
  {
    id: 'html-css-1',
    courseId: 'html-css',
    title: 'Modul 1: Einführung',
    description: 'Kursübersicht und Voraussetzungen für HTML und CSS',
    duration: '1 Stunde',
    topics: [
      {
        id: 'html-css-1-topic-1',
        title: 'Kursübersicht und Voraussetzungen',
        content: 'Einführung in den Kurs und Überblick über die Lernziele'
      },
      {
        id: 'html-css-1-topic-2',
        title: 'Was ist HTML und CSS?',
        content: 'Grundlegende Konzepte von HTML als Auszeichnungssprache und CSS als Styling-Sprache'
      }
    ],
    exercises: [
      {
        id: 'html-css-1-exercise-1',
        title: 'Kursvorbereitung',
        description: 'Überprüfen Sie Ihre Vorkenntnisse und erstellen Sie einen Lernplan',
        solution: '1. Notieren Sie Ihre Vorkenntnisse\n2. Erstellen Sie einen Zeitplan\n3. Legen Sie Ihre Lernziele fest'
      }
    ],
    quiz: {
      id: 'html-css-1-quiz-1',
      title: 'Einführungsquiz',
      questions: [
        {
          id: 'html-css-1-quiz-1-q1',
          question: 'Was ist HTML?',
          options: [
            'Eine Programmiersprache',
            'Eine Auszeichnungssprache',
            'Ein Styling-Tool',
            'Ein Datenbankformat'
          ],
          correctAnswer: 'Eine Auszeichnungssprache'
        }
      ]
    },
    flashcards: {
      id: 'html-css-1-flashcards-1',
      title: 'Grundbegriffe',
      cards: [
        {
          id: 'html-css-1-flashcards-1-c1',
          front: 'Was bedeutet HTML?',
          back: 'HyperText Markup Language'
        },
        {
          id: 'html-css-1-flashcards-1-c2',
          front: 'Was bedeutet CSS?',
          back: 'Cascading Style Sheets'
        }
      ]
    }
  },
  {
    id: 'html-css-2',
    courseId: 'html-css',
    title: 'Modul 2: Vorbereitung',
    description: 'Installation der notwendigen Software',
    duration: '1 Stunde',
    topics: [
      {
        id: 'html-css-2-topic-1',
        title: 'Visual Studio Code installieren',
        content: 'Schritt-für-Schritt-Anleitung zur Installation von VS Code'
      },
      {
        id: 'html-css-2-topic-2',
        title: 'Google Chrome Browser installieren',
        content: 'Installation und Einrichtung des Chrome Browsers für die Webentwicklung'
      }
    ],
    exercises: [
      {
        id: 'html-css-2-exercise-1',
        title: 'Entwicklungsumgebung einrichten',
        description: 'Installieren Sie VS Code und Chrome, und öffnen Sie die Entwicklertools',
        solution: '1. VS Code herunterladen und installieren\n2. Chrome installieren\n3. Entwicklertools öffnen (F12)'
      }
    ],
    quiz: {
      id: 'html-css-2-quiz-1',
      title: 'Installationsquiz',
      questions: [
        {
          id: 'html-css-2-quiz-1-q1',
          question: 'Wie öffnet man die Entwicklertools in Chrome?',
          options: [
            'F12 Taste',
            'Strg + Alt + F4',
            'Alt + Tab',
            'Windows + R'
          ],
          correctAnswer: 'F12 Taste'
        }
      ]
    },
    flashcards: {
      id: 'html-css-2-flashcards-1',
      title: 'Entwicklungsumgebung',
      cards: [
        {
          id: 'html-css-2-flashcards-1-c1',
          front: 'Was ist VS Code?',
          back: 'Ein kostenloser Code-Editor von Microsoft mit vielen nützlichen Features für Webentwicklung'
        }
      ]
    }
  },
  {
    id: 'html-css-3',
    courseId: 'html-css',
    title: 'Modul 3: HTML Grundkurs - Grundwissen',
    description: 'Grundlegende HTML-Konzepte und Syntax',
    duration: '2 Stunden',
    topics: [
      {
        id: 'html-css-3-topic-1',
        title: 'Überblick über Visual Studio Code',
        content: 'Wichtige Funktionen und Tastenkombinationen in VS Code'
      },
      {
        id: 'html-css-3-topic-2',
        title: 'HTML-Dateien erzeugen und im Browser öffnen',
        content: 'Erstellen und Öffnen von HTML-Dateien'
      },
      {
        id: 'html-css-3-topic-3',
        title: 'HTML-Syntax: Elemente',
        content: 'Grundlegende HTML-Elemente und ihre Verwendung'
      },
      {
        id: 'html-css-3-topic-4',
        title: 'HTML-Syntax: Selbstschließende Tags',
        content: 'Verwendung von selbstschließenden Tags in HTML'
      },
      {
        id: 'html-css-3-topic-5',
        title: 'HTML-Syntax: Attribute',
        content: 'Attribute von HTML-Elementen und ihre Bedeutung'
      },
      {
        id: 'html-css-3-topic-6',
        title: 'Grundgerüst einer HTML-Seite',
        content: 'Die grundlegende Struktur einer HTML-Seite'
      },
      {
        id: 'html-css-3-topic-7',
        title: 'Meta Tags',
        content: 'Wichtige Meta-Tags und ihre Funktionen'
      }
    ],
    exercises: [
      {
        id: 'html-css-3-exercise-1',
        title: 'Erste HTML-Seite erstellen',
        description: 'Erstellen Sie eine einfache HTML-Seite mit allen wichtigen Elementen',
        solution: '<!DOCTYPE html>\n<html>\n<head>\n<meta charset="UTF-8">\n<title>Meine erste Seite</title>\n</head>\n<body>\n<h1>Willkommen</h1>\n<p>Dies ist mein erster Absatz.</p>\n</body>\n</html>'
      }
    ],
    quiz: {
      id: 'html-css-3-quiz-1',
      title: 'HTML Grundlagen Quiz',
      questions: [
        {
          id: 'html-css-3-quiz-1-q1',
          question: 'Welches Tag ist für den Dokumenttyp erforderlich?',
          options: [
            '<!DOCTYPE>',
            '<html>',
            '<head>',
            '<body>'
          ],
          correctAnswer: '<!DOCTYPE>'
        }
      ]
    },
    flashcards: {
      id: 'html-css-3-flashcards-1',
      title: 'HTML Grundlagen',
      cards: [
        {
          id: 'html-css-3-flashcards-1-c1',
          front: 'Was ist ein Meta-Tag?',
          back: 'Ein HTML-Element, das Metadaten über das Dokument enthält'
        }
      ]
    }
  },
  {
    id: 'html-css-4',
    courseId: 'html-css',
    title: 'Modul 4: HTML Grundkurs - Wichtige HTML-Elemente',
    description: 'Lernen Sie die wichtigsten HTML-Elemente kennen',
    duration: '2 Stunden',
    topics: [
      {
        id: 'html-css-4-topic-1',
        title: 'Überschriften und Paragraphen',
        content: 'Verwendung von h1-h6 und p Tags'
      },
      {
        id: 'html-css-4-topic-2',
        title: 'Kommentare',
        content: 'HTML-Kommentare und ihre Verwendung'
      },
      {
        id: 'html-css-4-topic-3',
        title: 'Links',
        content: 'Erstellung und Verwendung von Links mit dem a-Tag'
      },
      {
        id: 'html-css-4-topic-4',
        title: 'Bilder',
        content: 'Einbinden und Optimieren von Bildern'
      },
      {
        id: 'html-css-4-topic-5',
        title: 'Listen',
        content: 'Geordnete und ungeordnete Listen erstellen'
      },
      {
        id: 'html-css-4-topic-6',
        title: 'Tabellen',
        content: 'Tabellen mit HTML erstellen und strukturieren'
      },
      {
        id: 'html-css-4-topic-7',
        title: 'HTML Entities',
        content: 'Spezielle Zeichen in HTML darstellen'
      },
      {
        id: 'html-css-4-topic-8',
        title: 'Block-Level und Inline Elemente',
        content: 'Unterschiede und Verwendung der verschiedenen Elementtypen'
      },
      {
        id: 'html-css-4-topic-9',
        title: 'Divs und Spans',
        content: 'Container-Elemente für Layout und Styling'
      },
      {
        id: 'html-css-4-topic-10',
        title: 'Semantische HTML Elemente',
        content: 'Moderne semantische Elemente und ihre Bedeutung'
      }
    ],
    exercises: [
      {
        id: 'html-css-4-exercise-1',
        title: 'Komplexe HTML-Struktur',
        description: 'Erstellen Sie eine Seite mit verschiedenen HTML-Elementen',
        solution: '<!DOCTYPE html>\n<html>\n<head>\n<title>HTML Elemente</title>\n</head>\n<body>\n<header>\n<h1>Meine Webseite</h1>\n<nav>\n<ul>\n<li><a href="#home">Home</a></li>\n<li><a href="#about">Über uns</a></li>\n</ul>\n</nav>\n</header>\n<main>\n<section>\n<h2>Willkommen</h2>\n<p>Dies ist ein Absatz mit <strong>wichtigen</strong> Informationen.</p>\n</section>\n<table>\n<tr>\n<th>Name</th>\n<th>Alter</th>\n</tr>\n<tr>\n<td>Max</td>\n<td>25</td>\n</tr>\n</table>\n</main>\n<footer>\n<p>&copy; 2024 Meine Webseite</p>\n</footer>\n</body>\n</html>'
      }
    ],
    quiz: {
      id: 'html-css-4-quiz-1',
      title: 'HTML Elemente Quiz',
      questions: [
        {
          id: 'html-css-4-quiz-1-q1',
          question: 'Welches Element wird für die Hauptnavigation verwendet?',
          options: [
            '<nav>',
            '<menu>',
            '<navigation>',
            '<header>'
          ],
          correctAnswer: '<nav>'
        }
      ]
    },
    flashcards: {
      id: 'html-css-4-flashcards-1',
      title: 'HTML Elemente',
      cards: [
        {
          id: 'html-css-4-flashcards-1-c1',
          front: 'Was ist der Unterschied zwischen Block-Level und Inline Elementen?',
          back: 'Block-Level Elemente beginnen in einer neuen Zeile und nehmen die volle Breite ein, während Inline Elemente in der gleichen Zeile bleiben'
        }
      ]
    }
  },
  {
    id: 'html-css-5',
    courseId: 'html-css',
    title: 'Modul 5: CSS Grundkurs - CSS implementieren',
    description: 'Lernen Sie die verschiedenen Möglichkeiten, CSS in HTML einzubinden',
    duration: '2 Stunden',
    topics: [
      {
        id: 'html-css-5-topic-1',
        title: 'Einführung in den CSS Grundkurs',
        content: 'Überblick über CSS und seine Bedeutung'
      },
      {
        id: 'html-css-5-topic-2',
        title: 'Drei CSS Implementierungs-Varianten',
        content: 'Vergleich der verschiedenen Implementierungsmethoden'
      },
      {
        id: 'html-css-5-topic-3',
        title: 'Inline CSS',
        content: 'Direkte Styling-Angaben in HTML-Elementen'
      },
      {
        id: 'html-css-5-topic-4',
        title: 'Internal CSS',
        content: 'CSS im style-Tag innerhalb des HTML-Dokuments'
      },
      {
        id: 'html-css-5-topic-5',
        title: 'External CSS',
        content: 'Externe CSS-Dateien einbinden'
      },
      {
        id: 'html-css-5-topic-6',
        title: 'Best Practices',
        content: 'Empfehlungen für die CSS-Implementierung'
      }
    ],
    exercises: [
      {
        id: 'html-css-5-exercise-1',
        title: 'CSS-Implementierung',
        description: 'Implementieren Sie CSS auf drei verschiedene Arten',
        solution: '1. Inline: <p style="color: blue;">Text</p>\n2. Internal: <style>p { color: blue; }</style>\n3. External: <link rel="stylesheet" href="styles.css">'
      }
    ],
    quiz: {
      id: 'html-css-5-quiz-1',
      title: 'CSS Implementierung Quiz',
      questions: [
        {
          id: 'html-css-5-quiz-1-q1',
          question: 'Welche CSS-Implementierung ist am besten für große Projekte geeignet?',
          options: [
            'External CSS',
            'Internal CSS',
            'Inline CSS',
            'Alle gleich gut'
          ],
          correctAnswer: 'External CSS'
        }
      ]
    },
    flashcards: {
      id: 'html-css-5-flashcards-1',
      title: 'CSS Implementierung',
      cards: [
        {
          id: 'html-css-5-flashcards-1-c1',
          front: 'Wie bindet man eine externe CSS-Datei ein?',
          back: 'Mit dem link-Tag im head-Bereich: <link rel="stylesheet" href="styles.css">'
        }
      ]
    }
  },
  {
    id: 'html-css-6',
    courseId: 'html-css',
    title: 'Modul 6: CSS Grundkurs - CSS Basis Selektoren',
    description: 'Lernen Sie die verschiedenen CSS-Selektoren kennen',
    duration: '2 Stunden',
    topics: [
      {
        id: 'html-css-6-topic-1',
        title: 'Einführung und Typ-Selektoren',
        content: 'Grundlegende Selektoren in CSS'
      },
      {
        id: 'html-css-6-topic-2',
        title: 'Universal-Selektor',
        content: 'Verwendung des *-Selektors'
      },
      {
        id: 'html-css-6-topic-3',
        title: 'ID- und Klassen-Selektoren',
        content: 'Selektieren von Elementen mit IDs und Klassen'
      },
      {
        id: 'html-css-6-topic-4',
        title: 'Attribut-Selektoren',
        content: 'Selektieren von Elementen basierend auf Attributen'
      },
      {
        id: 'html-css-6-topic-5',
        title: 'Kombinatoren',
        content: 'Kombinieren von Selektoren für präzisere Auswahl'
      }
    ],
    exercises: [
      {
        id: 'html-css-6-exercise-1',
        title: 'CSS-Selektoren',
        description: 'Erstellen Sie verschiedene CSS-Selektoren',
        solution: '/* Typ-Selektor */\np { color: blue; }\n\n/* Klassen-Selektor */\n.highlight { background: yellow; }\n\n/* ID-Selektor */\n#header { font-size: 24px; }\n\n/* Attribut-Selektor */\n[type="text"] { border: 1px solid gray; }\n\n/* Kombinator */\ndiv > p { margin: 10px; }'
      }
    ],
    quiz: {
      id: 'html-css-6-quiz-1',
      title: 'CSS Selektoren Quiz',
      questions: [
        {
          id: 'html-css-6-quiz-1-q1',
          question: 'Wie selektiert man ein Element mit der ID "header"?',
          options: [
            '#header',
            '.header',
            'header',
            '@header'
          ],
          correctAnswer: '#header'
        }
      ]
    },
    flashcards: {
      id: 'html-css-6-flashcards-1',
      title: 'CSS Selektoren',
      cards: [
        {
          id: 'html-css-6-flashcards-1-c1',
          front: 'Was ist der Unterschied zwischen ID- und Klassen-Selektoren?',
          back: 'IDs müssen eindeutig sein und werden mit # selektiert, Klassen können mehrfach verwendet werden und werden mit . selektiert'
        }
      ]
    }
  },
  {
    id: 'html-css-7',
    courseId: 'html-css',
    title: 'Modul 7: CSS Grundkurs - Wichtige CSS Eigenschaften',
    description: 'Lernen Sie die wichtigsten CSS-Eigenschaften kennen',
    duration: '3 Stunden',
    topics: [
      {
        id: 'html-css-7-topic-1',
        title: 'Fonts',
        content: 'Schriftarten und Textformatierung'
      },
      {
        id: 'html-css-7-topic-2',
        title: 'Google Fonts',
        content: 'Einbinden und Verwenden von Google Fonts'
      },
      {
        id: 'html-css-7-topic-3',
        title: 'Hintergrund',
        content: 'Hintergrundfarben und -bilder'
      },
      {
        id: 'html-css-7-topic-4',
        title: 'Ränder',
        content: 'Margin, Padding und Borders'
      },
      {
        id: 'html-css-7-topic-5',
        title: 'Farben',
        content: 'Farbdefinitionen in CSS'
      },
      {
        id: 'html-css-7-topic-6',
        title: 'Box Model',
        content: 'Das CSS Box Model verstehen'
      },
      {
        id: 'html-css-7-topic-7',
        title: 'Display-Eigenschaften',
        content: 'Block, Inline, Inline-Block und None'
      }
    ],
    exercises: [
      {
        id: 'html-css-7-exercise-1',
        title: 'CSS-Styling',
        description: 'Erstellen Sie ein Styling mit verschiedenen CSS-Eigenschaften',
        solution: '.box {\n  font-family: Arial, sans-serif;\n  background-color: #f0f0f0;\n  margin: 20px;\n  padding: 15px;\n  border: 1px solid #ccc;\n  display: block;\n}'
      }
    ],
    quiz: {
      id: 'html-css-7-quiz-1',
      title: 'CSS Eigenschaften Quiz',
      questions: [
        {
          id: 'html-css-7-quiz-1-q1',
          question: 'Welche Eigenschaft kontrolliert den inneren Abstand?',
          options: [
            'padding',
            'margin',
            'border',
            'spacing'
          ],
          correctAnswer: 'padding'
        }
      ]
    },
    flashcards: {
      id: 'html-css-7-flashcards-1',
      title: 'CSS Eigenschaften',
      cards: [
        {
          id: 'html-css-7-flashcards-1-c1',
          front: 'Was ist der Unterschied zwischen margin und padding?',
          back: 'Margin ist der äußere Abstand, Padding ist der innere Abstand eines Elements'
        }
      ]
    }
  },
  {
    id: 'html-css-8',
    courseId: 'html-css',
    title: 'Modul 8: CSS Grundkurs - Elemente mit CSS positionieren',
    description: 'Lernen Sie verschiedene Positionierungstechniken in CSS',
    duration: '2 Stunden',
    topics: [
      {
        id: 'html-css-8-topic-1',
        title: 'Position Property',
        content: 'Grundlagen der CSS-Positionierung'
      },
      {
        id: 'html-css-8-topic-2',
        title: 'Relative und Absolute Positionierung',
        content: 'Verwendung von relative und absolute'
      },
      {
        id: 'html-css-8-topic-3',
        title: 'Fixed Position',
        content: 'Elemente an einer festen Position platzieren'
      },
      {
        id: 'html-css-8-topic-4',
        title: 'Sticky Position',
        content: 'Elemente mit sticky position fixieren'
      },
      {
        id: 'html-css-8-topic-5',
        title: 'Z-Index',
        content: 'Überlagerung von Elementen steuern'
      }
    ],
    exercises: [
      {
        id: 'html-css-8-exercise-1',
        title: 'Positionierung',
        description: 'Erstellen Sie ein Layout mit verschiedenen Positionierungstechniken',
        solution: '.fixed-header {\n  position: fixed;\n  top: 0;\n  width: 100%;\n}\n\n.relative-box {\n  position: relative;\n  top: 20px;\n}\n\n.absolute-element {\n  position: absolute;\n  right: 0;\n  top: 0;\n}'
      }
    ],
    quiz: {
      id: 'html-css-8-quiz-1',
      title: 'CSS Positionierung Quiz',
      questions: [
        {
          id: 'html-css-8-quiz-1-q1',
          question: 'Welche Position bleibt beim Scrollen an der gleichen Stelle?',
          options: [
            'fixed',
            'relative',
            'absolute',
            'static'
          ],
          correctAnswer: 'fixed'
        }
      ]
    },
    flashcards: {
      id: 'html-css-8-flashcards-1',
      title: 'CSS Positionierung',
      cards: [
        {
          id: 'html-css-8-flashcards-1-c1',
          front: 'Was ist der Unterschied zwischen position: relative und position: absolute?',
          back: 'Relative positioniert relativ zur normalen Position, absolute relativ zum nächsten positionierten Elternelement'
        }
      ]
    }
  },
  {
    id: 'html-css-9',
    courseId: 'html-css',
    title: 'Modul 9: CSS Grundkurs - CSS Floating',
    description: 'Lernen Sie Layout-Techniken mit Float',
    duration: '2 Stunden',
    topics: [
      {
        id: 'html-css-9-topic-1',
        title: 'Floats',
        content: 'Grundlagen des Float-Layouts'
      },
      {
        id: 'html-css-9-topic-2',
        title: 'Clearing Floats',
        content: 'Float-Probleme lösen'
      },
      {
        id: 'html-css-9-topic-3',
        title: 'Float Layout',
        content: 'Komplexe Layouts mit Float erstellen'
      }
    ],
    exercises: [
      {
        id: 'html-css-9-exercise-1',
        title: 'Float Layout',
        description: 'Erstellen Sie ein zweispaltiges Layout mit Float',
        solution: '.column {\n  float: left;\n  width: 50%;\n}\n\n.clearfix::after {\n  content: "";\n  clear: both;\n  display: table;\n}'
      }
    ],
    quiz: {
      id: 'html-css-9-quiz-1',
      title: 'CSS Float Quiz',
      questions: [
        {
          id: 'html-css-9-quiz-1-q1',
          question: 'Wie löscht man einen Float?',
          options: [
            'clear: both',
            'float: none',
            'reset: float',
            'clear: float'
          ],
          correctAnswer: 'clear: both'
        }
      ]
    },
    flashcards: {
      id: 'html-css-9-flashcards-1',
      title: 'CSS Float',
      cards: [
        {
          id: 'html-css-9-flashcards-1-c1',
          front: 'Was bewirkt float: left?',
          back: 'Das Element wird nach links geschoben und andere Elemente fließen rechts daran vorbei'
        }
      ]
    }
  },
  {
    id: 'html-css-10',
    courseId: 'html-css',
    title: 'Modul 10: Praxisprojekt - Portfolio Website',
    description: 'Erstellen Sie Ihre eigene Portfolio-Website',
    duration: '4 Stunden',
    topics: [
      {
        id: 'html-css-10-topic-1',
        title: 'Projektvorstellung',
        content: 'Überblick über das Portfolio-Projekt'
      },
      {
        id: 'html-css-10-topic-2',
        title: 'Projektstruktur',
        content: 'Organisation der Projektdateien'
      },
      {
        id: 'html-css-10-topic-3',
        title: 'HTML Grundgerüst',
        content: 'Erstellen der Basis-HTML-Struktur'
      },
      {
        id: 'html-css-10-topic-4',
        title: 'Navigationsmenü',
        content: 'Responsive Navigation implementieren'
      },
      {
        id: 'html-css-10-topic-5',
        title: 'Startseite Sections',
        content: 'Welcome, About und Skills Sections erstellen'
      },
      {
        id: 'html-css-10-topic-6',
        title: 'Kontakt-Seite',
        content: 'Kontaktformular und Footer erstellen'
      },
      {
        id: 'html-css-10-topic-7',
        title: 'Finalisierung',
        content: 'Letzte Anpassungen und Optimierungen'
      }
    ],
    exercises: [
      {
        id: 'html-css-10-exercise-1',
        title: 'Portfolio Website',
        description: 'Erstellen Sie eine vollständige Portfolio-Website',
        solution: '<!-- HTML-Struktur -->\n<!DOCTYPE html>\n<html>\n<head>\n  <title>Mein Portfolio</title>\n  <link rel="stylesheet" href="styles.css">\n</head>\n<body>\n  <nav>\n    <ul>\n      <li><a href="#home">Home</a></li>\n      <li><a href="#about">Über mich</a></li>\n      <li><a href="#contact">Kontakt</a></li>\n    </ul>\n  </nav>\n  <main>\n    <section id="home">...</section>\n    <section id="about">...</section>\n    <section id="contact">...</section>\n  </main>\n  <footer>...</footer>\n</body>\n</html>'
      }
    ],
    quiz: {
      id: 'html-css-10-quiz-1',
      title: 'Portfolio Projekt Quiz',
      questions: [
        {
          id: 'html-css-10-quiz-1-q1',
          question: 'Welche Sektion sollte zuerst auf der Portfolio-Website erscheinen?',
          options: [
            'Welcome Section',
            'About Section',
            'Skills Section',
            'Contact Section'
          ],
          correctAnswer: 'Welcome Section'
        }
      ]
    },
    flashcards: {
      id: 'html-css-10-flashcards-1',
      title: 'Portfolio Website',
      cards: [
        {
          id: 'html-css-10-flashcards-1-c1',
          front: 'Was sind die wichtigsten Sektionen einer Portfolio-Website?',
          back: 'Welcome, About, Skills, Projects und Contact'
        }
      ]
    }
  },
  {
    id: 'sql-1',
    courseId: 'sql',
    title: 'Modul 1: SQL Einführung',
    description: 'Grundlegende Konzepte von SQL und Datenbanken',
    duration: '2 Stunden',
    topics: [
      {
        id: 'sql-1-topic-1',
        title: 'Was ist SQL?',
        content: 'Einführung in SQL als Standardsprache für Datenbankoperationen'
      },
      {
        id: 'sql-1-topic-2',
        title: 'Was ist eine Datenbank?',
        content: 'Grundlegende Konzepte von Datenbanken und deren Bedeutung'
      },
      {
        id: 'sql-1-topic-3',
        title: 'Tabellen und Beziehungen',
        content: 'Wie Daten in Tabellen organisiert werden und wie Tabellen miteinander verknüpft sind'
      },
      {
        id: 'sql-1-topic-4',
        title: 'SQL-Syntax Grundlagen',
        content: 'Grundlegende Syntax-Regeln in SQL'
      }
    ],
    exercises: [
      {
        id: 'sql-1-exercise-1',
        title: 'Datenbankmodell erstellen',
        description: 'Erstellen Sie ein einfaches Datenbankmodell für eine Bibliothek',
        solution: 'Tabellen: Bücher (id, titel, autor, isbn), Leser (id, name, email), Ausleihen (buch_id, leser_id, datum)'
      }
    ],
    quiz: {
      id: 'sql-1-quiz-1',
      title: 'SQL Grundlagen Quiz',
      questions: [
        {
          id: 'sql-1-quiz-1-q1',
          question: 'Was bedeutet SQL?',
          options: [
            'Structured Query Language',
            'Simple Query Language',
            'Standard Query Logic',
            'System Query Language'
          ],
          correctAnswer: 'Structured Query Language'
        }
      ]
    },
    flashcards: {
      id: 'sql-1-flashcards-1',
      title: 'SQL Grundbegriffe',
      cards: [
        {
          id: 'sql-1-flashcards-1-c1',
          front: 'Was ist eine Tabelle in SQL?',
          back: 'Eine Sammlung von Daten, die in Zeilen und Spalten organisiert sind'
        }
      ]
    }
  },
  {
    id: 'sql-2',
    courseId: 'sql',
    title: 'Modul 2: SQL Installation und erste Schritte',
    description: 'Installation einer SQL-Datenbank und erste Befehle',
    duration: '2 Stunden',
    topics: [
      {
        id: 'sql-2-topic-1',
        title: 'MySQL Installation',
        content: 'Schritt-für-Schritt-Anleitung zur Installation von MySQL'
      },
      {
        id: 'sql-2-topic-2',
        title: 'Datenbank erstellen',
        content: 'Erstellen einer ersten Datenbank mit SQL-Befehlen'
      },
      {
        id: 'sql-2-topic-3',
        title: 'Tabellen erstellen',
        content: 'Erstellen von Tabellen mit CREATE TABLE'
      },
      {
        id: 'sql-2-topic-4',
        title: 'Daten einfügen',
        content: 'Einfügen von Daten mit INSERT INTO'
      }
    ],
    exercises: [
      {
        id: 'sql-2-exercise-1',
        title: 'Erste Datenbank erstellen',
        description: 'Erstellen Sie eine Datenbank und eine Tabelle mit Beispieldaten',
        solution: 'CREATE DATABASE bibliothek;\nUSE bibliothek;\nCREATE TABLE buecher (id INT PRIMARY KEY, titel VARCHAR(100), autor VARCHAR(100));\nINSERT INTO buecher VALUES (1, "Harry Potter", "J.K. Rowling");'
      }
    ],
    quiz: {
      id: 'sql-2-quiz-1',
      title: 'SQL Installation Quiz',
      questions: [
        {
          id: 'sql-2-quiz-1-q1',
          question: 'Welcher Befehl erstellt eine neue Datenbank?',
          options: [
            'CREATE DATABASE',
            'NEW DATABASE',
            'MAKE DATABASE',
            'BUILD DATABASE'
          ],
          correctAnswer: 'CREATE DATABASE'
        }
      ]
    },
    flashcards: {
      id: 'sql-2-flashcards-1',
      title: 'SQL Befehle',
      cards: [
        {
          id: 'sql-2-flashcards-1-c1',
          front: 'Wie fügt man Daten in eine Tabelle ein?',
          back: 'Mit dem INSERT INTO Befehl: INSERT INTO tabellenname (spalte1, spalte2) VALUES (wert1, wert2);'
        }
      ]
    }
  },
  {
    id: 'sql-3',
    courseId: 'sql',
    title: 'Modul 3: SQL Abfragen - SELECT',
    description: 'Daten aus Datenbanken abrufen',
    duration: '3 Stunden',
    topics: [
      {
        id: 'sql-3-topic-1',
        title: 'SELECT Grundlagen',
        content: 'Grundlegende SELECT-Abfragen erstellen'
      },
      {
        id: 'sql-3-topic-2',
        title: 'WHERE Klausel',
        content: 'Daten filtern mit WHERE'
      },
      {
        id: 'sql-3-topic-3',
        title: 'ORDER BY',
        content: 'Ergebnisse sortieren'
      },
      {
        id: 'sql-3-topic-4',
        title: 'LIMIT und OFFSET',
        content: 'Ergebnisse begrenzen'
      },
      {
        id: 'sql-3-topic-5',
        title: 'Aggregatfunktionen',
        content: 'COUNT, SUM, AVG, MIN, MAX verwenden'
      }
    ],
    exercises: [
      {
        id: 'sql-3-exercise-1',
        title: 'Komplexe Abfragen',
        description: 'Erstellen Sie verschiedene SELECT-Abfragen mit Filtern und Sortierung',
        solution: 'SELECT titel, autor FROM buecher WHERE autor LIKE "%Rowling%" ORDER BY titel LIMIT 5;\nSELECT COUNT(*) FROM buecher WHERE jahr > 2000;'
      }
    ],
    quiz: {
      id: 'sql-3-quiz-1',
      title: 'SELECT Quiz',
      questions: [
        {
          id: 'sql-3-quiz-1-q1',
          question: 'Welcher Befehl zählt die Anzahl der Zeilen in einer Tabelle?',
          options: [
            'COUNT(*)',
            'SUM(*)',
            'TOTAL(*)',
            'NUMBER(*)'
          ],
          correctAnswer: 'COUNT(*)'
        }
      ]
    },
    flashcards: {
      id: 'sql-3-flashcards-1',
      title: 'SELECT Befehle',
      cards: [
        {
          id: 'sql-3-flashcards-1-c1',
          front: 'Wie filtert man Daten in SQL?',
          back: 'Mit der WHERE-Klausel: SELECT * FROM tabellenname WHERE bedingung;'
        }
      ]
    }
  },
  {
    id: 'bwl-1',
    courseId: 'bwl',
    title: 'Modul 1: BWL Grundlagen',
    description: 'Einführung in die Betriebswirtschaftslehre',
    duration: '2 Stunden',
    topics: [
      {
        id: 'bwl-1-topic-1',
        title: 'Was ist BWL?',
        content: 'Definition und Bedeutung der Betriebswirtschaftslehre'
      },
      {
        id: 'bwl-1-topic-2',
        title: 'Betrieb und Unternehmen',
        content: 'Unterschiede und Definitionen'
      },
      {
        id: 'bwl-1-topic-3',
        title: 'Betriebliche Funktionen',
        content: 'Beschaffung, Produktion, Absatz, Finanzierung, Personal'
      },
      {
        id: 'bwl-1-topic-4',
        title: 'Betriebsziele',
        content: 'Gewinnmaximierung, Umsatzmaximierung, soziale Ziele'
      }
    ],
    exercises: [
      {
        id: 'bwl-1-exercise-1',
        title: 'Betriebsanalyse',
        description: 'Analysieren Sie ein Unternehmen nach betrieblichen Funktionen',
        solution: '1. Beschaffung: Rohstoffe, Materialien\n2. Produktion: Herstellung von Gütern\n3. Absatz: Verkauf der Produkte\n4. Finanzierung: Kapitalbeschaffung\n5. Personal: Mitarbeiterverwaltung'
      }
    ],
    quiz: {
      id: 'bwl-1-quiz-1',
      title: 'BWL Grundlagen Quiz',
      questions: [
        {
          id: 'bwl-1-quiz-1-q1',
          question: 'Was ist das Hauptziel eines gewinnorientierten Unternehmens?',
          options: [
            'Gewinnmaximierung',
            'Umsatzmaximierung',
            'Mitarbeiterzufriedenheit',
            'Umweltschutz'
          ],
          correctAnswer: 'Gewinnmaximierung'
        }
      ]
    },
    flashcards: {
      id: 'bwl-1-flashcards-1',
      title: 'BWL Grundbegriffe',
      cards: [
        {
          id: 'bwl-1-flashcards-1-c1',
          front: 'Was ist BWL?',
          back: 'Die Wissenschaft von der wirtschaftlichen Führung von Betrieben'
        }
      ]
    }
  },
  {
    id: 'csharp-1',
    courseId: 'csharp',
    title: 'Modul 1: C# Einführung',
    description: 'Grundlegende Konzepte der Programmiersprache C#',
    duration: '2 Stunden',
    topics: [
      {
        id: 'csharp-1-topic-1',
        title: 'Was ist C#?',
        content: 'Einführung in C# als moderne Programmiersprache'
      },
      {
        id: 'csharp-1-topic-2',
        title: 'Entwicklungsumgebung',
        content: 'Installation von Visual Studio und erste Schritte'
      },
      {
        id: 'csharp-1-topic-3',
        title: 'Erstes C# Programm',
        content: 'Hello World Programm erstellen und verstehen'
      },
      {
        id: 'csharp-1-topic-4',
        title: 'Grundlegende Syntax',
        content: 'Variablen, Datentypen und Operatoren'
      }
    ],
    exercises: [
      {
        id: 'csharp-1-exercise-1',
        title: 'Erstes Programm',
        description: 'Erstellen Sie ein Programm, das Ihren Namen ausgibt',
        solution: 'using System;\n\nclass Program\n{\n    static void Main()\n    {\n        Console.WriteLine("Mein Name ist Max");\n        Console.ReadLine();\n    }\n}'
      }
    ],
    quiz: {
      id: 'csharp-1-quiz-1',
      title: 'C# Grundlagen Quiz',
      questions: [
        {
          id: 'csharp-1-quiz-1-q1',
          question: 'Welche Methode gibt Text in der Konsole aus?',
          options: [
            'Console.WriteLine()',
            'System.Print()',
            'Output.Text()',
            'Display.Console()'
          ],
          correctAnswer: 'Console.WriteLine()'
        }
      ]
    },
    flashcards: {
      id: 'csharp-1-flashcards-1',
      title: 'C# Grundbegriffe',
      cards: [
        {
          id: 'csharp-1-flashcards-1-c1',
          front: 'Was ist C#?',
          back: 'Eine moderne, objektorientierte Programmiersprache von Microsoft'
        }
      ]
    }
  },
  {
    id: 'networking-1',
    courseId: 'networking',
    title: 'Modul 1: Netzwerkgrundlagen',
    description: 'Einführung in Computernetzwerke',
    duration: '2 Stunden',
    topics: [
      {
        id: 'networking-1-topic-1',
        title: 'Was ist ein Netzwerk?',
        content: 'Definition und Bedeutung von Computernetzwerken'
      },
      {
        id: 'networking-1-topic-2',
        title: 'Netzwerktypen',
        content: 'LAN, WAN, WLAN und ihre Unterschiede'
      },
      {
        id: 'networking-1-topic-3',
        title: 'Netzwerkkomponenten',
        content: 'Router, Switch, Hub, Netzwerkkabel'
      },
      {
        id: 'networking-1-topic-4',
        title: 'OSI-Modell',
        content: 'Die 7 Schichten des OSI-Modells'
      }
    ],
    exercises: [
      {
        id: 'networking-1-exercise-1',
        title: 'Netzwerkanalyse',
        description: 'Analysieren Sie ein einfaches Heimnetzwerk',
        solution: '1. Identifizieren Sie die Komponenten (Router, Computer, Smartphone)\n2. Bestimmen Sie den Netzwerktyp (WLAN)\n3. Skizzieren Sie die Verbindungen'
      }
    ],
    quiz: {
      id: 'networking-1-quiz-1',
      title: 'Netzwerkgrundlagen Quiz',
      questions: [
        {
          id: 'networking-1-quiz-1-q1',
          question: 'Welches Netzwerk deckt einen größeren Bereich ab?',
          options: [
            'WAN',
            'LAN',
            'PAN',
            'MAN'
          ],
          correctAnswer: 'WAN'
        }
      ]
    },
    flashcards: {
      id: 'networking-1-flashcards-1',
      title: 'Netzwerkgrundlagen',
      cards: [
        {
          id: 'networking-1-flashcards-1-c1',
          front: 'Was ist ein LAN?',
          back: 'Local Area Network - ein lokales Netzwerk, das auf einen begrenzten Bereich beschränkt ist'
        }
      ]
    }
  },
  {
    id: 'ipv4-1',
    courseId: 'ipv4',
    title: 'Modul 1: IPv4 Grundlagen',
    description: 'Einführung in IPv4-Adressierung',
    duration: '2 Stunden',
    topics: [
      {
        id: 'ipv4-1-topic-1',
        title: 'Was ist IPv4?',
        content: 'Definition und Bedeutung von IPv4'
      },
      {
        id: 'ipv4-1-topic-2',
        title: 'IPv4-Adressformat',
        content: 'Aufbau einer IPv4-Adresse (32 Bit, 4 Oktette)'
      },
      {
        id: 'ipv4-1-topic-3',
        title: 'Adressklassen',
        content: 'Klasse A, B, C, D, E und ihre Verwendung'
      },
      {
        id: 'ipv4-1-topic-4',
        title: 'Private und öffentliche Adressen',
        content: 'Unterschiede und Verwendung'
      }
    ],
    exercises: [
      {
        id: 'ipv4-1-exercise-1',
        title: 'IPv4-Adressen analysieren',
        description: 'Bestimmen Sie die Klasse und den Typ (privat/öffentlich) von IPv4-Adressen',
        solution: '192.168.1.1 - Klasse C, privat\n8.8.8.8 - Klasse A, öffentlich\n10.0.0.1 - Klasse A, privat'
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
            '32',
            '64',
            '128',
            '256'
          ],
          correctAnswer: '32'
        }
      ]
    },
    flashcards: {
      id: 'ipv4-1-flashcards-1',
      title: 'IPv4 Grundbegriffe',
      cards: [
        {
          id: 'ipv4-1-flashcards-1-c1',
          front: 'Was ist der Bereich für private Klasse C Adressen?',
          back: '192.168.0.0 bis 192.168.255.255'
        }
      ]
    }
  },
  {
    id: 'ipv6-1',
    courseId: 'ipv6',
    title: 'Modul 1: IPv6 Grundlagen',
    description: 'Einführung in IPv6-Adressierung',
    duration: '2 Stunden',
    topics: [
      {
        id: 'ipv6-1-topic-1',
        title: 'Was ist IPv6?',
        content: 'Definition und Bedeutung von IPv6'
      },
      {
        id: 'ipv6-1-topic-2',
        title: 'IPv6-Adressformat',
        content: 'Aufbau einer IPv6-Adresse (128 Bit, 8 Hextette)'
      },
      {
        id: 'ipv6-1-topic-3',
        title: 'Adresstypen',
        content: 'Unicast, Multicast, Anycast'
      },
      {
        id: 'ipv6-1-topic-4',
        title: 'Vorteile von IPv6',
        content: 'Größerer Adressraum, verbesserte Sicherheit, Auto-Konfiguration'
      }
    ],
    exercises: [
      {
        id: 'ipv6-1-exercise-1',
        title: 'IPv6-Adressen analysieren',
        description: 'Bestimmen Sie den Typ von IPv6-Adressen',
        solution: '2001:0db8:85a3:0000:0000:8a2e:0370:7334 - Global Unicast\nff02::1 - Link-local Multicast\nfe80::1 - Link-local Unicast'
      }
    ],
    quiz: {
      id: 'ipv6-1-quiz-1',
      title: 'IPv6 Grundlagen Quiz',
      questions: [
        {
          id: 'ipv6-1-quiz-1-q1',
          question: 'Wie viele Bits hat eine IPv6-Adresse?',
          options: [
            '128',
            '64',
            '32',
            '256'
          ],
          correctAnswer: '128'
        }
      ]
    },
    flashcards: {
      id: 'ipv6-1-flashcards-1',
      title: 'IPv6 Grundbegriffe',
      cards: [
        {
          id: 'ipv6-1-flashcards-1-c1',
          front: 'Was ist der Präfix für Link-local Adressen in IPv6?',
          back: 'fe80::/10'
        }
      ]
    }
  },
  {
    id: 'subnetting-1',
    courseId: 'subnetting',
    title: 'Modul 1: Subnetting Grundlagen',
    description: 'Einführung in das Subnetting von IPv4-Netzwerken',
    duration: '2 Stunden',
    topics: [
      {
        id: 'subnetting-1-topic-1',
        title: 'Was ist Subnetting?',
        content: 'Definition und Bedeutung von Subnetting'
      },
      {
        id: 'subnetting-1-topic-2',
        title: 'Netzwerk- und Hostanteil',
        content: 'Unterscheidung zwischen Netzwerk- und Hostbits'
      },
      {
        id: 'subnetting-1-topic-3',
        title: 'Subnetzmasken',
        content: 'Aufbau und Bedeutung von Subnetzmasken'
      },
      {
        id: 'subnetting-1-topic-4',
        title: 'CIDR-Notation',
        content: 'Verwendung der CIDR-Notation für Subnetze'
      }
    ],
    exercises: [
      {
        id: 'subnetting-1-exercise-1',
        title: 'Subnetzmasken bestimmen',
        description: 'Bestimmen Sie die Subnetzmaske für verschiedene Netzwerkgrößen',
        solution: '8 Hosts benötigt: 255.255.255.248 (/29)\n16 Hosts benötigt: 255.255.255.240 (/28)\n32 Hosts benötigt: 255.255.255.224 (/27)'
      }
    ],
    quiz: {
      id: 'subnetting-1-quiz-1',
      title: 'Subnetting Grundlagen Quiz',
      questions: [
        {
          id: 'subnetting-1-quiz-1-q1',
          question: 'Was bedeutet /24 in der CIDR-Notation?',
          options: [
            '255.255.255.0',
            '255.255.0.0',
            '255.0.0.0',
            '255.255.255.255'
          ],
          correctAnswer: '255.255.255.0'
        }
      ]
    },
    flashcards: {
      id: 'subnetting-1-flashcards-1',
      title: 'Subnetting Grundbegriffe',
      cards: [
        {
          id: 'subnetting-1-flashcards-1-c1',
          front: 'Was ist der Zweck von Subnetting?',
          back: 'Ein großes Netzwerk in kleinere, effizientere Teilnetze aufzuteilen'
        }
      ]
    }
  },
  {
    id: 'english-1',
    courseId: 'english',
    title: 'Modul 1: Englisch Grundlagen',
    description: 'Einführung in die englische Sprache',
    duration: '2 Stunden',
    topics: [
      {
        id: 'english-1-topic-1',
        title: 'Alphabet und Aussprache',
        content: 'Das englische Alphabet und grundlegende Ausspracheregeln'
      },
      {
        id: 'english-1-topic-2',
        title: 'Begrüßungen und Vorstellungen',
        content: 'Grundlegende Begrüßungen und sich vorstellen'
      },
      {
        id: 'english-1-topic-3',
        title: 'Personalpronomen',
        content: 'I, you, he, she, it, we, they'
      },
      {
        id: 'english-1-topic-4',
        title: 'Verb "to be"',
        content: 'Konjugation und Verwendung des Verbs "to be"'
      }
    ],
    exercises: [
      {
        id: 'english-1-exercise-1',
        title: 'Begrüßungsdialog',
        description: 'Erstellen Sie einen kurzen Dialog mit Begrüßungen und Vorstellungen',
        solution: 'A: Hello!\nB: Hi! How are you?\nA: I\'m fine, thank you. And you?\nB: I\'m good, thanks. What\'s your name?\nA: My name is John. Nice to meet you.\nB: Nice to meet you too, John. I\'m Sarah.'
      }
    ],
    quiz: {
      id: 'english-1-quiz-1',
      title: 'Englisch Grundlagen Quiz',
      questions: [
        {
          id: 'english-1-quiz-1-q1',
          question: 'Welches Personalpronomen wird für die dritte Person Singular (männlich) verwendet?',
          options: [
            'he',
            'she',
            'it',
            'they'
          ],
          correctAnswer: 'he'
        }
      ]
    },
    flashcards: {
      id: 'english-1-flashcards-1',
      title: 'Englisch Grundbegriffe',
      cards: [
        {
          id: 'english-1-flashcards-1-c1',
          front: 'Wie konjugiert man "to be" in der ersten Person Singular?',
          back: 'I am (I\'m)'
        }
      ]
    }
  }
]; 
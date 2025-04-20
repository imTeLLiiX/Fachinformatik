import { QuizQuestion } from '@/components/Quiz';

export const quizQuestions: Record<string, QuizQuestion[]> = {
  'grundlagen': [
    {
      question: 'Was ist das Binärsystem?',
      options: [
        'Ein Zahlensystem mit der Basis 2',
        'Ein Zahlensystem mit der Basis 10',
        'Ein Zahlensystem mit der Basis 16',
        'Ein Zahlensystem mit der Basis 8'
      ],
      correctAnswer: 0
    },
    {
      question: 'Welche Einheit wird für die Speicherkapazität verwendet?',
      options: [
        'Byte',
        'Meter',
        'Kilogramm',
        'Sekunde'
      ],
      correctAnswer: 0
    }
  ],
  'programmierung': [
    {
      question: 'Was ist eine Variable in JavaScript?',
      options: [
        'Ein Container für Datenwerte',
        'Eine mathematische Funktion',
        'Ein Datentyp',
        'Eine Programmiersprache'
      ],
      correctAnswer: 0
    },
    {
      question: 'Welches Symbol wird für Kommentare in JavaScript verwendet?',
      options: [
        '//',
        '/* */',
        '#',
        '--'
      ],
      correctAnswer: 0
    }
  ],
  'netzwerke': [
    {
      question: 'Was ist das Internet?',
      options: [
        'Ein globales Netzwerk von Computern',
        'Ein lokales Netzwerk',
        'Ein Betriebssystem',
        'Eine Programmiersprache'
      ],
      correctAnswer: 0
    },
    {
      question: 'Welches Protokoll wird für die Übertragung von Webseiten verwendet?',
      options: [
        'HTTP',
        'FTP',
        'SMTP',
        'SSH'
      ],
      correctAnswer: 0
    }
  ]
}; 
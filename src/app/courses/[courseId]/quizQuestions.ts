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
      answer: 'Ein Zahlensystem mit der Basis 2',
      explanation: 'Das Binärsystem ist ein Zahlensystem mit der Basis 2, das nur die Ziffern 0 und 1 verwendet.'
    },
    {
      question: 'Welche Einheit wird für die Speicherkapazität verwendet?',
      options: [
        'Byte',
        'Meter',
        'Kilogramm',
        'Sekunde'
      ],
      answer: 'Byte',
      explanation: 'Byte ist die grundlegende Einheit für die Speicherkapazität in Computern.'
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
      answer: 'Ein Container für Datenwerte',
      explanation: 'Eine Variable ist ein Container, der einen Wert speichert, der sich während der Programmausführung ändern kann.'
    },
    {
      question: 'Welches Symbol wird für Kommentare in JavaScript verwendet?',
      options: [
        '//',
        '/* */',
        '#',
        '--'
      ],
      answer: '//',
      explanation: 'In JavaScript werden einzeilige Kommentare mit // und mehrzeilige Kommentare mit /* */ geschrieben.'
    }
  ],
  'netzwerke': [
    {
      question: 'Was ist das Internet?',
      options: [
        'Ein weltweites Netzwerk von Computern',
        'Ein lokales Netzwerk',
        'Ein Betriebssystem',
        'Eine Programmiersprache'
      ],
      answer: 'Ein weltweites Netzwerk von Computern',
      explanation: 'Das Internet ist ein weltweites Netzwerk von Computern, die miteinander verbunden sind und Daten austauschen können.'
    }
  ]
}; 
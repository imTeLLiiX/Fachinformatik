const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

function loadEnvVars() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars = {};
  
  envContent.split('\n').forEach(line => {
    if (line.trim() && !line.startsWith('#')) {
      const [key, ...valueParts] = line.split('=');
      if (key && valueParts.length > 0) {
        envVars[key.trim()] = valueParts.join('=').trim();
      }
    }
  });
  
  return envVars;
}

const modules = [
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
  }
];

async function saveModules() {
  const envVars = loadEnvVars();
  
  if (!envVars.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  const uri = envVars.MONGODB_URI;
  console.log('Connecting to MongoDB with URI:', uri);
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(envVars.MONGODB_DB || 'it_learning_platform');
    const collection = db.collection('modules');
    
    // Insert the modules
    await collection.deleteMany({}); // Clear existing modules
    const result = await collection.insertMany(modules);
    
    console.log(`Successfully inserted ${result.insertedCount} modules`);
    
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

saveModules(); 
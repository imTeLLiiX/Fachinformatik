import { MongoClient } from 'mongodb';

if (!process.env.MONGODB_URI) {
  throw new Error('Bitte füge deine MongoDB URI zu .env.local hinzu');
}

const uri = process.env.MONGODB_URI;
const options = {
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
};

let client;
let clientPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  // Im Entwicklungsmodus verwenden wir eine globale Variable, damit der Wert
  // über Module-Reloads hinweg erhalten bleibt (Hot Module Replacement).
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  clientPromise = globalWithMongo._mongoClientPromise;
} else {
  // Im Produktionsmodus ist es besser, keine globale Variable zu verwenden.
  client = new MongoClient(uri, options);
  clientPromise = client.connect();
}

export async function connectToDatabase() {
  try {
    console.log('Versuche Verbindung zu MongoDB herzustellen...');
    console.log('MongoDB URI:', process.env.MONGODB_URI?.substring(0, 20) + '...');
    console.log('MongoDB DB:', process.env.MONGODB_DB);
    console.log('NODE_ENV:', process.env.NODE_ENV);
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB);
    
    // Test the connection
    await db.command({ ping: 1 });
    console.log('Erfolgreich mit MongoDB verbunden');
    
    return { db, client };
  } catch (error: unknown) {
    console.error('MongoDB Verbindungsfehler:', error);
    console.error('MongoDB URI:', process.env.MONGODB_URI?.substring(0, 20) + '...');
    console.error('MongoDB DB:', process.env.MONGODB_DB);
    console.error('NODE_ENV:', process.env.NODE_ENV);
    
    if (error instanceof Error) {
      throw new Error('Verbindung zur Datenbank fehlgeschlagen: ' + error.message);
    } else {
      throw new Error('Verbindung zur Datenbank fehlgeschlagen: Unbekannter Fehler');
    }
  }
}

// Exportiere ein modul-scoped MongoClient Promise. Durch die Verwendung eines
// separaten Moduls kann der Client über Funktionen hinweg geteilt werden.
export default clientPromise; 
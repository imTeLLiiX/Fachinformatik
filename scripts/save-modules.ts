import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { courseModules } from '../src/app/courses/[courseId]/modules';

function loadEnvVars() {
  const envPath = path.join(process.cwd(), '.env.local');
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envVars: Record<string, string> = {};
  
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

async function saveModules() {
  const envVars = loadEnvVars();
  
  if (!envVars.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable in .env.local');
  }

  const uri = envVars.MONGODB_URI;
  console.log('Connecting to MongoDB...');
  
  try {
    const client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB successfully');
    
    const db = client.db(envVars.MONGODB_DB || 'it_learning_platform');
    const collection = db.collection('modules');
    
    // Insert the modules
    await collection.deleteMany({}); // Clear existing modules
    const result = await collection.insertMany(courseModules);
    
    console.log(`Successfully inserted ${result.insertedCount} modules`);
    
    await client.close();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

saveModules(); 
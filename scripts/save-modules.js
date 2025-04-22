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

// Import the modules from modules.ts
const modulesPath = path.join(process.cwd(), 'src', 'app', 'courses', '[courseId]', 'modules.ts');
const modulesContent = fs.readFileSync(modulesPath, 'utf8');

// Extract the modules array from the TypeScript file
const modulesMatch = modulesContent.match(/export const courseModules: Module\[\] = (\[[\s\S]*?\]);/);
if (!modulesMatch) {
  throw new Error('Could not find modules array in modules.ts');
}

// Parse the modules array
const modules = eval(modulesMatch[1]);

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
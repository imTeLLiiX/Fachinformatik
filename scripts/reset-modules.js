const { MongoClient } = require('mongodb');
const fs = require('fs');
const path = require('path');

async function resetModules() {
  const uri = 'mongodb+srv://nicomerkel:crazy-TeLLiiX8918@cluster0.h9ynj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('it_learning_platform');
    
    // Clear existing modules
    console.log('Clearing existing modules...');
    await db.collection('modules').deleteMany({});
    
    // Read modules from modules.ts
    const modulesPath = path.join(process.cwd(), 'src', 'app', 'courses', '[courseId]', 'modules.ts');
    const modulesContent = fs.readFileSync(modulesPath, 'utf8');
    
    // Extract the modules array
    const modulesMatch = modulesContent.match(/export const courseModules: Module\[\] = (\[[\s\S]*?\]);/);
    if (!modulesMatch) {
      throw new Error('Could not find modules array in modules.ts');
    }
    
    // Parse the modules array
    const modules = eval(modulesMatch[1]);
    
    // Insert modules
    console.log('Inserting modules...');
    const result = await db.collection('modules').insertMany(modules);
    console.log(`Inserted ${result.insertedCount} modules`);
    
    // Verify modules
    const insertedModules = await db.collection('modules').find({}).toArray();
    console.log('\nInserted modules:');
    insertedModules.forEach(module => {
      console.log(`- ${module.title} (${module.id})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

resetModules(); 
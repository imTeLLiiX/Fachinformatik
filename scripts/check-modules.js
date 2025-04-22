const { MongoClient } = require('mongodb');

async function checkModules() {
  const uri = 'mongodb+srv://nicomerkel:crazy-TeLLiiX8918@cluster0.h9ynj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('it_learning_platform');
    const modules = await db.collection('modules').find({}).toArray();
    
    console.log(`Found ${modules.length} modules:`);
    
    // Check for duplicates
    const moduleIds = new Set();
    const duplicates = [];
    
    modules.forEach(module => {
      if (moduleIds.has(module.id)) {
        duplicates.push(module.id);
      } else {
        moduleIds.add(module.id);
      }
      console.log(`- ${module.title} (${module.id})`);
    });
    
    if (duplicates.length > 0) {
      console.log('\nFound duplicate modules:');
      duplicates.forEach(id => console.log(`- ${id}`));
      
      // Remove duplicates
      console.log('\nRemoving duplicates...');
      for (const id of duplicates) {
        await db.collection('modules').deleteMany({ id });
      }
      console.log('Duplicates removed');
    }
    
    // Count remaining modules
    const remainingModules = await db.collection('modules').find({}).toArray();
    console.log(`\nRemaining modules: ${remainingModules.length}`);
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

checkModules(); 
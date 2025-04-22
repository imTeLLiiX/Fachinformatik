const { MongoClient } = require('mongodb');

async function testModules() {
  const uri = 'mongodb+srv://nicomerkel:crazy-TeLLiiX8918@cluster0.h9ynj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('it_learning_platform');
    const modules = await db.collection('modules').find({}).toArray();
    
    console.log(`Found ${modules.length} modules:`);
    modules.forEach(module => {
      console.log(`- ${module.title} (${module.id})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testModules(); 
import { MongoClient } from 'mongodb';
import { courseModules } from '../app/courses/[courseId]/modules';

async function saveModules() {
  if (!process.env.MONGODB_URI) {
    throw new Error('Please define the MONGODB_URI environment variable');
  }

  const client = new MongoClient(process.env.MONGODB_URI);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db();
    const modulesCollection = db.collection('modules');

    // Clear existing modules
    await modulesCollection.deleteMany({});
    console.log('Cleared existing modules');

    // Insert new modules
    const result = await modulesCollection.insertMany(courseModules);
    console.log(`Successfully inserted ${result.insertedCount} modules`);

  } catch (error) {
    console.error('Error saving modules:', error);
  } finally {
    await client.close();
    console.log('Disconnected from MongoDB');
  }
}

// Execute the function
saveModules().catch(console.error); 
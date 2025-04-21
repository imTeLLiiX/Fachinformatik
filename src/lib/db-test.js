import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const client = new MongoClient(uri);

async function testConnection() {
  try {
    await client.connect();
    console.log('Connected to MongoDB');

    const db = client.db('test');
    const collection = db.collection('users');

    // Test insert
    const result = await collection.insertOne({
      name: 'Test User',
      email: 'test@example.com',
      createdAt: new Date()
    });
    console.log('Inserted document:', result);

    // Test find
    const user = await collection.findOne({ name: 'Test User' });
    console.log('Found user:', user);

    // Test update
    const updateResult = await collection.updateOne(
      { name: 'Test User' },
      { $set: { email: 'updated@example.com' } }
    );
    console.log('Updated document:', updateResult);

    // Test delete
    const deleteResult = await collection.deleteOne({ name: 'Test User' });
    console.log('Deleted document:', deleteResult);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

testConnection(); 
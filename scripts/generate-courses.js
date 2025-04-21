const { MongoClient } = require('mongodb');

const courses = [
  {
    _id: 'html-css',
    title: 'HTML & CSS',
    description: 'Lerne die Grundlagen von HTML und CSS, um Webseiten zu erstellen.',
    image: '/images/courses/html-css.jpg',
    category: 'web-development',
    level: 'Anfänger',
    duration: '20 Stunden',
    prerequisites: [],
    tags: ['HTML', 'CSS', 'Web Development'],
    color: '#1e40af'
  },
  {
    _id: 'csharp',
    title: 'C#',
    description: 'Lerne die Grundlagen der C#-Programmierung.',
    image: '/images/courses/csharp.jpg',
    category: 'programming',
    level: 'Anfänger',
    duration: '25 Stunden',
    prerequisites: [],
    tags: ['C#', '.NET', 'Programming'],
    color: '#7e22ce'
  },
  {
    _id: 'sql',
    title: 'SQL',
    description: 'Lerne, wie du Datenbanken mit SQL abfragen kannst.',
    image: '/images/courses/sql.jpg',
    category: 'database',
    level: 'Anfänger',
    duration: '15 Stunden',
    prerequisites: [],
    tags: ['SQL', 'Database', 'Data'],
    color: '#15803d'
  },
  {
    _id: 'bwl',
    title: 'BWL',
    description: 'Lerne die Grundlagen der Betriebswirtschaftslehre.',
    image: '/images/courses/bwl.jpg',
    category: 'business',
    level: 'Anfänger',
    duration: '30 Stunden',
    prerequisites: [],
    tags: ['BWL', 'Business', 'Management'],
    color: '#dc2626'
  },
  {
    _id: 'ipv4-subnetting',
    title: 'IPv4 Subnetting',
    description: 'Lerne, wie du IPv4-Netzwerke in Subnetze aufteilen kannst.',
    image: '/images/courses/networking.jpg',
    category: 'networking',
    level: 'Fortgeschritten',
    duration: '10 Stunden',
    prerequisites: ['Grundlagen der Netzwerktechnik'],
    tags: ['Networking', 'IPv4', 'Subnetting'],
    color: '#ca8a04'
  },
  {
    _id: 'ipv6',
    title: 'IPv6',
    description: 'Lerne die Grundlagen von IPv6 und wie es sich von IPv4 unterscheidet.',
    image: '/images/courses/ipv6.jpg',
    category: 'networking',
    level: 'Fortgeschritten',
    duration: '12 Stunden',
    prerequisites: ['Grundlagen der Netzwerktechnik'],
    tags: ['Networking', 'IPv6'],
    color: '#2563eb'
  }
];

async function generateCourses() {
  const uri = 'mongodb+srv://nicomerkel:crazy-TeLLiiX8918@cluster0.h9ynj8u.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
  const client = new MongoClient(uri);
  
  try {
    await client.connect();
    console.log('Connected to MongoDB');
    
    const db = client.db('it_learning_platform');
    
    // Clear existing courses
    console.log('Clearing existing courses...');
    await db.collection('courses').deleteMany({});
    
    // Insert courses
    console.log('Inserting courses...');
    const result = await db.collection('courses').insertMany(courses);
    console.log(`Inserted ${result.insertedCount} courses`);
    
    // Verify courses
    const allCourses = await db.collection('courses').find({}).toArray();
    console.log('\nAll courses:');
    allCourses.forEach(course => {
      console.log(`- ${course.title} (${course._id})`);
    });
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await client.close();
  }
}

generateCourses(); 
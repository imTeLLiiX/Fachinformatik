import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';
import { courseModules } from '../src/app/courses/[courseId]/modules';

const prisma = new PrismaClient();

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
  
  if (!envVars.DATABASE_URL) {
    throw new Error('Please define the DATABASE_URL environment variable in .env.local');
  }

  console.log('Connecting to database...');
  
  try {
    // Delete existing modules
    await prisma.module.deleteMany({});
    console.log('Deleted existing modules');
    
    // Transform modules to match Prisma schema
    const transformedModules = courseModules.map((module, index) => ({
      title: module.title,
      description: module.description,
      content: JSON.stringify(module.topics),
      order: index + 1,
      slug: module.title.toLowerCase().replace(/\s+/g, '-'),
      courseId: module.courseId,
      duration: module.duration,
      topics: module.topics,
      exercises: module.exercises,
      quiz: module.quiz,
      flashcards: module.flashcards
    }));
    
    // Insert the modules
    const result = await prisma.module.createMany({
      data: transformedModules,
    });
    
    console.log(`Successfully inserted ${result.count} modules`);
    
    await prisma.$disconnect();
    console.log('Connection closed');
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

saveModules(); 
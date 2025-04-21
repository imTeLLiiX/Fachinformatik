import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { User, UserInput } from '@/models/User';
import bcrypt from 'bcryptjs';

// GET /api/users - Alle Benutzer abrufen (nur für Admins)
export async function GET(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Überprüfen, ob der Benutzer angemeldet ist und Admin-Rechte hat
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 });
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
    
    // Benutzer abrufen, aber Passwörter ausschließen
    const users = await db.collection('users')
      .find({})
      .project({ password: 0 })
      .toArray();
    
    return NextResponse.json(users);
  } catch (error) {
    console.error('Fehler beim Abrufen der Benutzer:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}

// POST /api/users - Neuen Benutzer erstellen (nur für Admins)
export async function POST(req: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    
    // Überprüfen, ob der Benutzer angemeldet ist und Admin-Rechte hat
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 });
    }
    
    const body = await req.json();
    const { name, email, password, role = 'learner', status = 'active', subscription = 'basic' } = body;
    
    // Validierung
    if (!name || !email || !password) {
      return NextResponse.json({ error: 'Name, E-Mail und Passwort sind erforderlich' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
    
    // Überprüfen, ob die E-Mail bereits existiert
    const existingUser = await db.collection('users').findOne({ email });
    if (existingUser) {
      return NextResponse.json({ error: 'E-Mail wird bereits verwendet' }, { status: 400 });
    }
    
    // Passwort hashen
    const hashedPassword = await bcrypt.hash(password, 10);
    
    // Neuen Benutzer erstellen
    const newUser: UserInput = {
      name,
      email,
      password: hashedPassword,
      role,
      status,
      subscription
    };
    
    const result = await db.collection('users').insertOne({
      ...newUser,
      progress: {},
      createdAt: new Date(),
      updatedAt: new Date(),
      lastLogin: new Date()
    });
    
    return NextResponse.json({ 
      message: 'Benutzer erfolgreich erstellt',
      userId: result.insertedId
    }, { status: 201 });
  } catch (error) {
    console.error('Fehler beim Erstellen des Benutzers:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
} 
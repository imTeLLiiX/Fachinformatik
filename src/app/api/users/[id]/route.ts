import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import clientPromise from '@/lib/mongodb';
import { ObjectId } from 'mongodb';
import { UserUpdate } from '@/models/User';
import bcrypt from 'bcryptjs';

// GET /api/users/[id] - Einen bestimmten Benutzer abrufen
export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Überprüfen, ob der Benutzer angemeldet ist und Admin-Rechte hat
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 });
    }
    
    const { id } = params;
    
    // Überprüfen, ob die ID gültig ist
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Ungültige Benutzer-ID' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
    
    // Benutzer abrufen, aber Passwort ausschließen
    const user = await db.collection('users').findOne(
      { _id: new ObjectId(id) },
      { projection: { password: 0 } }
    );
    
    if (!user) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error) {
    console.error('Fehler beim Abrufen des Benutzers:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}

// PUT /api/users/[id] - Einen Benutzer aktualisieren
export async function PUT(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Überprüfen, ob der Benutzer angemeldet ist und Admin-Rechte hat
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 });
    }
    
    const { id } = params;
    
    // Überprüfen, ob die ID gültig ist
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Ungültige Benutzer-ID' }, { status: 400 });
    }
    
    const body = await req.json();
    const { name, email, password, role, status, subscription } = body;
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
    
    // Überprüfen, ob der Benutzer existiert
    const existingUser = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!existingUser) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
    }
    
    // Überprüfen, ob die E-Mail bereits von einem anderen Benutzer verwendet wird
    if (email && email !== existingUser.email) {
      const emailExists = await db.collection('users').findOne({ email, _id: { $ne: new ObjectId(id) } });
      if (emailExists) {
        return NextResponse.json({ error: 'E-Mail wird bereits verwendet' }, { status: 400 });
      }
    }
    
    // Aktualisierungsdaten vorbereiten
    const updateData: UserUpdate = {};
    
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (role) updateData.role = role;
    if (status) updateData.status = status;
    if (subscription) updateData.subscription = subscription;
    
    // Passwort aktualisieren, falls angegeben
    if (password) {
      updateData.password = await bcrypt.hash(password, 10);
    }
    
    // Benutzer aktualisieren
    await db.collection('users').updateOne(
      { _id: new ObjectId(id) },
      { 
        $set: {
          ...updateData,
          updatedAt: new Date()
        }
      }
    );
    
    return NextResponse.json({ message: 'Benutzer erfolgreich aktualisiert' });
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Benutzers:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
}

// DELETE /api/users/[id] - Einen Benutzer löschen
export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    
    // Überprüfen, ob der Benutzer angemeldet ist und Admin-Rechte hat
    if (!session || !session.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Nicht autorisiert' }, { status: 403 });
    }
    
    const { id } = params;
    
    // Überprüfen, ob die ID gültig ist
    if (!ObjectId.isValid(id)) {
      return NextResponse.json({ error: 'Ungültige Benutzer-ID' }, { status: 400 });
    }
    
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_DB || 'it-learning-platform');
    
    // Überprüfen, ob der Benutzer existiert
    const existingUser = await db.collection('users').findOne({ _id: new ObjectId(id) });
    if (!existingUser) {
      return NextResponse.json({ error: 'Benutzer nicht gefunden' }, { status: 404 });
    }
    
    // Benutzer löschen
    await db.collection('users').deleteOne({ _id: new ObjectId(id) });
    
    return NextResponse.json({ message: 'Benutzer erfolgreich gelöscht' });
  } catch (error) {
    console.error('Fehler beim Löschen des Benutzers:', error);
    return NextResponse.json({ error: 'Interner Serverfehler' }, { status: 500 });
  }
} 
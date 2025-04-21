'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { User, UserUpdate, UserRole, UserStatus, SubscriptionType } from '@/models/User';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface UserDetailPageProps {
  params: {
    id: string;
  };
}

export default function UserDetailPage({ params }: UserDetailPageProps) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<UserUpdate>({});

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login');
    } else if (status === 'authenticated' && session?.user?.role !== 'admin') {
      router.push('/');
    }
  }, [status, session, router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`);
        if (!response.ok) {
          throw new Error('Fehler beim Abrufen des Benutzers');
        }
        const data = await response.json();
        setUser(data);
        setFormData({
          name: data.name,
          email: data.email,
          role: data.role,
          status: data.status,
          subscription: data.subscription
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
      } finally {
        setLoading(false);
      }
    };

    if (session?.user?.role === 'admin') {
      fetchUser();
    }
  }, [session, params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Aktualisieren des Benutzers');
      }

      const updatedUser = await response.json();
      setUser(updatedUser);
      setIsEditing(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
    }
  };

  const handleDelete = async () => {
    if (!confirm('Möchten Sie diesen Benutzer wirklich löschen?')) {
      return;
    }

    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Fehler beim Löschen des Benutzers');
      }

      router.push('/admin/dashboard');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ein unbekannter Fehler ist aufgetreten');
    }
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Laden...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-center p-4">Benutzer nicht gefunden</div>;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Benutzerdetails</h1>
        <div className="space-x-4">
          <Button
            variant="outline"
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? 'Abbrechen' : 'Bearbeiten'}
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
          >
            Löschen
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Benutzerinformationen</CardTitle>
            <CardDescription>Grundlegende Informationen über den Benutzer</CardDescription>
          </CardHeader>
          <CardContent>
            {isEditing ? (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={formData.name || ''}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">E-Mail</label>
                  <input
                    type="email"
                    value={formData.email || ''}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-2 border rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Rolle</label>
                  <select
                    value={formData.role || ''}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="learner">Lernender</option>
                    <option value="instructor">Dozent</option>
                    <option value="admin">Administrator</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Status</label>
                  <select
                    value={formData.status || ''}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as UserStatus })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="active">Aktiv</option>
                    <option value="inactive">Inaktiv</option>
                    <option value="suspended">Gesperrt</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Abonnement</label>
                  <select
                    value={formData.subscription || ''}
                    onChange={(e) => setFormData({ ...formData, subscription: e.target.value as SubscriptionType })}
                    className="w-full p-2 border rounded"
                  >
                    <option value="basic">Basic</option>
                    <option value="premium">Premium</option>
                    <option value="enterprise">Enterprise</option>
                  </select>
                </div>
                <Button type="submit">Speichern</Button>
              </form>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Name</label>
                  <p className="mt-1">{user.name}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">E-Mail</label>
                  <p className="mt-1">{user.email}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Rolle</label>
                  <p className="mt-1">{user.role}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Status</label>
                  <p className="mt-1">{user.status}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium">Abonnement</label>
                  <p className="mt-1">{user.subscription}</p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kursfortschritt</CardTitle>
            <CardDescription>Übersicht der abgeschlossenen Kurse und Module</CardDescription>
          </CardHeader>
          <CardContent>
            {Object.entries(user.progress).map(([courseId, progress]) => (
              <div key={courseId} className="mb-4">
                <h3 className="font-medium mb-2">{courseId}</h3>
                <Progress value={progress.progress} className="mb-2" />
                <p className="text-sm text-gray-500">
                  {progress.completedModules.length} von {progress.completedModules.length + progress.completedExercises.length} Modulen abgeschlossen
                </p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
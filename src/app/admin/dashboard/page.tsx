'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

interface DashboardUser {
  _id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  subscription: 'basic' | 'premium';
}

export default function DashboardPage() {
  const { status } = useSession();
  const router = useRouter();
  const [users, setUsers] = useState<DashboardUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users');
        if (!response.ok) throw new Error('Failed to fetch users');
        const data = await response.json();
        setUsers(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  const activeUsers = users.filter(user => user.status === 'active').length;
  const premiumUsers = users.filter(user => user.subscription === 'premium').length;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-gray-500">Übersicht über Ihre Plattform</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Gesamtnutzer</CardTitle>
            <CardDescription>Aktive Nutzer auf der Plattform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{users.length}</div>
            <p className="text-xs text-gray-500">+12% gegenüber letztem Monat</p>
            <Progress value={activeUsers / users.length * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Premium Nutzer</CardTitle>
            <CardDescription>Zahlende Abonnenten</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{premiumUsers}</div>
            <p className="text-xs text-gray-500">+5% gegenüber letztem Monat</p>
            <Progress value={premiumUsers / users.length * 100} className="mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Kursabschlüsse</CardTitle>
            <CardDescription>Erfolgreich beendete Kurse</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-gray-500">+18% gegenüber letztem Monat</p>
            <Progress value={75} className="mt-2" />
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Neueste Aktivitäten</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {users.slice(0, 5).map(user => (
                <div key={user._id} className="flex items-center">
                  <div className="ml-4">
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button className="w-full mt-4" variant="outline">
              Alle Aktivitäten anzeigen
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Systemstatus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Server Status</span>
                <span className="text-sm text-green-500">Online</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Datenbank Status</span>
                <span className="text-sm text-green-500">Verbunden</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">API Status</span>
                <span className="text-sm text-green-500">Funktionsfähig</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Cache Status</span>
                <span className="text-sm text-green-500">Aktiv</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 
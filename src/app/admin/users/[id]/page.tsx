'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { UserDocument, UserUpdate } from '@/models/User';

// Define our own types that match the Prisma schema
type Role = 'ADMIN' | 'USER';
type SubscriptionStatus = 'ACTIVE' | 'CANCELED' | 'PAST_DUE' | 'UNPAID' | 'TRIAL';
type SubscriptionTier = 'FREE' | 'BASIC' | 'PREMIUM';

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
  subscriptionStatus: SubscriptionStatus;
  subscriptionTier: SubscriptionTier;
};

export default function UserEditPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [user, setUser] = useState<UserDocument | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    role: 'USER',
    subscriptionStatus: 'UNPAID',
    subscriptionTier: 'FREE'
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`/api/users/${params.id}`);
        if (!response.ok) throw new Error('Failed to fetch user');
        const data = await response.json();
        setUser(data);
        setFormData({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          role: data.role,
          subscriptionStatus: data.subscriptionStatus,
          subscriptionTier: data.subscriptionTier
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/users/${params.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to update user');
      router.push('/admin/users');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!user) return <div>User not found</div>;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Benutzer bearbeiten</h1>
        <p className="text-gray-500">Bearbeiten Sie die Benutzerinformationen</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Benutzerinformationen</CardTitle>
            <CardDescription>Bearbeiten Sie die grundlegenden Informationen des Benutzers</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="email">E-Mail</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="role">Rolle</Label>
              <Select
                value={formData.role}
                onValueChange={(value) => setFormData({ ...formData, role: value as Role })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie eine Rolle" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="USER">Benutzer</SelectItem>
                  <SelectItem value="ADMIN">Administrator</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subscriptionStatus">Abonnement-Status</Label>
              <Select
                value={formData.subscriptionStatus}
                onValueChange={(value) => setFormData({ ...formData, subscriptionStatus: value as SubscriptionStatus })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie einen Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ACTIVE">Aktiv</SelectItem>
                  <SelectItem value="CANCELED">Gekündigt</SelectItem>
                  <SelectItem value="PAST_DUE">Überfällig</SelectItem>
                  <SelectItem value="UNPAID">Nicht bezahlt</SelectItem>
                  <SelectItem value="TRIAL">Testphase</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="subscriptionTier">Abonnement-Tarif</Label>
              <Select
                value={formData.subscriptionTier}
                onValueChange={(value) => setFormData({ ...formData, subscriptionTier: value as SubscriptionTier })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Wählen Sie einen Tarif" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="FREE">Kostenlos</SelectItem>
                  <SelectItem value="BASIC">Basic</SelectItem>
                  <SelectItem value="PREMIUM">Premium</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <div className="flex justify-end space-x-4">
          <Button variant="outline" onClick={() => router.push('/admin/users')}>
            Abbrechen
          </Button>
          <Button type="submit">Speichern</Button>
        </div>
      </form>
    </div>
  );
} 
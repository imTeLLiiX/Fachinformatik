'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, AdminStats, UserManagementData } from '@/types/user';

export default function AdminDashboard() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserManagementData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('authToken');
      if (!token) {
        router.push('/auth/login');
        return;
      }

      try {
        // Hier später API-Aufruf für Admin-Daten
        const mockData: UserManagementData = {
          users: [
            {
              id: '1',
              name: 'Admin User',
              email: 'admin@example.com',
              role: 'admin',
              createdAt: new Date(),
              lastLogin: new Date(),
              isPremium: true
            }
          ],
          stats: {
            totalUsers: 100,
            premiumUsers: 25,
            activeUsers: 75,
            revenue: 2500
          }
        };
        setUserData(mockData);
      } catch (err) {
        setError('Fehler beim Laden der Admin-Daten');
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">Laden...</div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
        
        {/* Statistiken */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Gesamt Nutzer</h3>
            <p className="text-3xl font-bold">{userData?.stats.totalUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Premium Nutzer</h3>
            <p className="text-3xl font-bold">{userData?.stats.premiumUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Aktive Nutzer</h3>
            <p className="text-3xl font-bold">{userData?.stats.activeUsers}</p>
          </div>
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Umsatz</h3>
            <p className="text-3xl font-bold">€{userData?.stats.revenue}</p>
          </div>
        </div>

        {/* Nutzer Tabelle */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-6">
            <h2 className="text-xl font-semibold mb-4">Nutzer Verwaltung</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">Name</th>
                    <th className="text-left py-3 px-4">Email</th>
                    <th className="text-left py-3 px-4">Rolle</th>
                    <th className="text-left py-3 px-4">Premium</th>
                    <th className="text-left py-3 px-4">Aktionen</th>
                  </tr>
                </thead>
                <tbody>
                  {userData?.users.map((user) => (
                    <tr key={user.id} className="border-b">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-sm ${
                          user.role === 'admin' ? 'bg-red-100 text-red-800' :
                          user.role === 'queen' ? 'bg-purple-100 text-purple-800' :
                          user.role === 'support' ? 'bg-blue-100 text-blue-800' :
                          user.role === 'premium' ? 'bg-green-100 text-green-800' :
                          'bg-gray-100 text-gray-800'
                        }`}>
                          {user.role}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {user.isPremium ? 'Ja' : 'Nein'}
                      </td>
                      <td className="py-3 px-4">
                        <button className="text-blue-600 hover:text-blue-800 mr-2">
                          Bearbeiten
                        </button>
                        <button className="text-red-600 hover:text-red-800">
                          Löschen
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 
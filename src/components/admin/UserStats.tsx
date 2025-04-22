import { User } from '@/models/User';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UserStatsProps {
  users: User[];
}

export default function UserStats({ users }: UserStatsProps) {
  // Berechnung der Statistiken
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.subscriptionStatus === 'ACTIVE').length;
  const inactiveUsers = users.filter(user => user.subscriptionStatus === 'CANCELED').length;
  const unpaidUsers = users.filter(user => user.subscriptionStatus === 'UNPAID').length;
  
  const freeUsers = users.filter(user => user.subscriptionTier === 'FREE').length;
  const basicUsers = users.filter(user => user.subscriptionTier === 'BASIC').length;
  const premiumUsers = users.filter(user => user.subscriptionTier === 'PREMIUM').length;
  
  const adminUsers = users.filter(user => user.role === 'ADMIN').length;
  const regularUsers = users.filter(user => user.role === 'USER').length;
  
  // Berechnung der Prozentsätze
  const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const premiumPercentage = totalUsers > 0 ? Math.round((premiumUsers / totalUsers) * 100) : 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
      <Card>
        <CardHeader>
          <CardTitle>Benutzer</CardTitle>
          <CardDescription>Gesamtzahl der registrierten Benutzer</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{totalUsers}</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Aktiv</span>
              <span>{activeUsers} ({activePercentage}%)</span>
            </div>
            <Progress value={activePercentage} className="mb-2" />
            <div className="flex justify-between text-sm">
              <span>Inaktiv/Gekündigt</span>
              <span>{inactiveUsers + unpaidUsers} ({100 - activePercentage}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abonnements</CardTitle>
          <CardDescription>Verteilung der Abonnement-Typen</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{premiumUsers}</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Premium</span>
              <span>{premiumUsers} ({premiumPercentage}%)</span>
            </div>
            <Progress value={premiumPercentage} className="mb-2" />
            <div className="flex justify-between text-sm">
              <span>Basic/Free</span>
              <span>{basicUsers + freeUsers} ({100 - premiumPercentage}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Benutzerrollen</CardTitle>
          <CardDescription>Verteilung der Benutzerrollen</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{adminUsers}</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Administratoren</span>
              <span>{adminUsers} ({Math.round((adminUsers / totalUsers) * 100)}%)</span>
            </div>
            <Progress value={Math.round((adminUsers / totalUsers) * 100)} className="mb-2" />
            <div className="flex justify-between text-sm">
              <span>Reguläre Benutzer</span>
              <span>{regularUsers} ({Math.round((regularUsers / totalUsers) * 100)}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
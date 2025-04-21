import { User } from '@/models/User';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface UserStatsProps {
  users: User[];
}

export default function UserStats({ users }: UserStatsProps) {
  // Berechnung der Statistiken
  const totalUsers = users.length;
  const activeUsers = users.filter(user => user.status === 'active').length;
  const inactiveUsers = users.filter(user => user.status === 'inactive').length;
  const suspendedUsers = users.filter(user => user.status === 'suspended').length;
  
  const basicUsers = users.filter(user => user.subscription === 'basic').length;
  const premiumUsers = users.filter(user => user.subscription === 'premium').length;
  const enterpriseUsers = users.filter(user => user.subscription === 'enterprise').length;
  
  const adminUsers = users.filter(user => user.role === 'admin').length;
  const instructorUsers = users.filter(user => user.role === 'instructor').length;
  const learnerUsers = users.filter(user => user.role === 'learner').length;
  
  // Berechnung der Prozentsätze
  const activePercentage = totalUsers > 0 ? Math.round((activeUsers / totalUsers) * 100) : 0;
  const premiumPercentage = totalUsers > 0 ? Math.round(((premiumUsers + enterpriseUsers) / totalUsers) * 100) : 0;
  
  // Berechnung der durchschnittlichen Kursfortschritte
  const calculateAverageProgress = () => {
    if (totalUsers === 0) return 0;
    
    let totalProgress = 0;
    let usersWithProgress = 0;
    
    users.forEach(user => {
      const courseProgresses = Object.values(user.progress);
      if (courseProgresses.length > 0) {
        const userProgress = courseProgresses.reduce((sum, progress) => sum + progress.progress, 0) / courseProgresses.length;
        totalProgress += userProgress;
        usersWithProgress++;
      }
    });
    
    return usersWithProgress > 0 ? Math.round(totalProgress / usersWithProgress) : 0;
  };
  
  const averageProgress = calculateAverageProgress();
  
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
              <span>Inaktiv/Gesperrt</span>
              <span>{inactiveUsers + suspendedUsers} ({100 - activePercentage}%)</span>
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
          <p className="text-3xl font-bold">{premiumUsers + enterpriseUsers}</p>
          <div className="mt-4">
            <div className="flex justify-between text-sm mb-1">
              <span>Premium/Enterprise</span>
              <span>{premiumUsers + enterpriseUsers} ({premiumPercentage}%)</span>
            </div>
            <Progress value={premiumPercentage} className="mb-2" />
            <div className="flex justify-between text-sm">
              <span>Basic</span>
              <span>{basicUsers} ({100 - premiumPercentage}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kursfortschritt</CardTitle>
          <CardDescription>Durchschnittlicher Fortschritt aller Benutzer</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">{averageProgress}%</p>
          <div className="mt-4">
            <Progress value={averageProgress} className="mb-4" />
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div>
                <p className="font-medium">{adminUsers}</p>
                <p className="text-gray-500">Admins</p>
              </div>
              <div>
                <p className="font-medium">{instructorUsers}</p>
                <p className="text-gray-500">Dozenten</p>
              </div>
              <div>
                <p className="font-medium">{learnerUsers}</p>
                <p className="text-gray-500">Lernende</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
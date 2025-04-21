import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, CreditCard, Download } from 'lucide-react';

// TODO: Replace with real data from database
const transactions = [
  {
    id: 'tx_1',
    user: 'Max Mustermann',
    email: 'max@example.com',
    amount: '29.99',
    currency: 'EUR',
    status: 'completed',
    date: '2024-02-20',
    subscription: 'premium',
    period: 'monthly'
  },
  {
    id: 'tx_2',
    user: 'Anna Admin',
    email: 'anna@example.com',
    amount: '299.99',
    currency: 'EUR',
    status: 'completed',
    date: '2024-02-19',
    subscription: 'premium',
    period: 'yearly'
  },
  // Add more mock transactions as needed
];

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Zahlungen</h1>
          <p className="text-gray-500">Verwalten Sie Abonnements und Transaktionen</p>
        </div>
        <Button>
          <Download className="w-4 h-4 mr-2" />
          Exportieren
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monatlicher Umsatz</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,500 €</div>
            <p className="text-xs text-gray-500">+15% seit letztem Monat</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Aktive Abonnements</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">150</div>
            <p className="text-xs text-gray-500">+5 neue diese Woche</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Durchschnittlicher Wert</CardTitle>
            <CreditCard className="h-4 w-4 text-gray-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">25 €</div>
            <p className="text-xs text-gray-500">pro Abonnement</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaktionshistorie</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
              <Input
                placeholder="Transaktionen suchen..."
                className="pl-8"
              />
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Benutzer</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Betrag</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Datum</th>
                  <th className="text-left py-3 px-4">Abonnement</th>
                  <th className="text-left py-3 px-4">Periode</th>
                  <th className="text-left py-3 px-4">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction) => (
                  <tr key={transaction.id} className="border-b">
                    <td className="py-3 px-4">{transaction.user}</td>
                    <td className="py-3 px-4">{transaction.email}</td>
                    <td className="py-3 px-4">
                      {transaction.amount} {transaction.currency}
                    </td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.status === 'completed' ? 'bg-green-100 text-green-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {transaction.status === 'completed' ? 'Abgeschlossen' : 'Fehlgeschlagen'}
                      </span>
                    </td>
                    <td className="py-3 px-4">{transaction.date}</td>
                    <td className="py-3 px-4">
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        transaction.subscription === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-blue-100 text-blue-800'
                      }`}>
                        {transaction.subscription}
                      </span>
                    </td>
                    <td className="py-3 px-4">{transaction.period}</td>
                    <td className="py-3 px-4">
                      <Button variant="outline" size="sm">
                        Details
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Download } from 'lucide-react';

type Transaction = {
  id: string;
  user: string;
  email: string;
  status: string;
  tier: string;
};

export default function PaymentsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTransactions() {
      try {
        const response = await fetch('/api/admin/transactions');
        if (!response.ok) {
          throw new Error('Failed to fetch transactions');
        }
        const data = await response.json();
        setTransactions(data);
        setFilteredTransactions(data);
      } catch (error) {
        console.error('Error fetching transactions:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchTransactions();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setFilteredTransactions(transactions);
    } else {
      const filtered = transactions.filter(
        (transaction) =>
          transaction.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
          transaction.tier.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredTransactions(filtered);
    }
  }, [searchTerm, transactions]);

  const handleExport = () => {
    // Create CSV content
    const headers = ['Benutzer', 'E-Mail', 'Status', 'Tier'];
    const csvContent = [
      headers.join(','),
      ...filteredTransactions.map((transaction) =>
        [
          `"${transaction.user}"`,
          `"${transaction.email}"`,
          `"${transaction.status}"`,
          `"${transaction.tier}"`,
        ].join(',')
      ),
    ].join('\n');

    // Create and download the file
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `transactions-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewDetails = (transactionId: string) => {
    // Implement view details functionality
    console.log('View details for transaction:', transactionId);
    // You could open a modal or navigate to a details page
  };

  if (loading) {
    return (
      <div className="container mx-auto py-10">
        <Card>
          <CardHeader>
            <CardTitle>Zahlungen</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center items-center h-40">
              <p>Lade Daten...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Zahlungen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <Search className="w-4 h-4 text-gray-500" />
              <Input
                placeholder="Suchen..."
                className="w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="w-4 h-4 mr-2" />
              Exportieren
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Benutzer</th>
                  <th className="text-left py-3 px-4">E-Mail</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Tier</th>
                  <th className="text-left py-3 px-4">Aktionen</th>
                </tr>
              </thead>
              <tbody>
                {filteredTransactions.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-4 text-center">
                      Keine Transaktionen gefunden
                    </td>
                  </tr>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b">
                      <td className="py-3 px-4">{transaction.user}</td>
                      <td className="py-3 px-4">{transaction.email}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.status === 'active' ? 'bg-green-100 text-green-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {transaction.status === 'active' ? 'Aktiv' : 'Inaktiv'}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          transaction.tier === 'premium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-blue-100 text-blue-800'
                        }`}>
                          {transaction.tier}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => handleViewDetails(transaction.id)}
                        >
                          Details
                        </Button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
} 
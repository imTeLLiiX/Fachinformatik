'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Download, Eye } from 'lucide-react'

interface Transaction {
  id: string
  userId: string
  userName: string
  amount: number
  currency: string
  status: 'succeeded' | 'failed' | 'pending'
  type: 'subscription' | 'one-time'
  createdAt: string
}

export function BillingManagement() {
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      userId: 'user1',
      userName: 'Max Mustermann',
      amount: 29.99,
      currency: 'EUR',
      status: 'succeeded',
      type: 'subscription',
      createdAt: '2024-03-20'
    },
    // Weitere Beispieldaten hier...
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [selectedStatus, setSelectedStatus] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = 
      transaction.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.id.toLowerCase().includes(searchTerm.toLowerCase())
    
    const matchesStatus = selectedStatus === 'all' || transaction.status === selectedStatus
    const matchesType = selectedType === 'all' || transaction.type === selectedType

    return matchesSearch && matchesStatus && matchesType
  })

  return (
    <div className="space-y-8">
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Monatlicher Umsatz</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12,345 €</div>
            <p className="text-xs text-muted-foreground">
              +15% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Aktive Abonnements</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">789</div>
            <p className="text-xs text-muted-foreground">
              +5% seit letztem Monat
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Durchschnittlicher Wert</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">29.99 €</div>
            <p className="text-xs text-muted-foreground">
              Pro Abonnement
            </p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Transaktionen</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Suchen..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select
                value={selectedStatus}
                onValueChange={setSelectedStatus}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Status auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Status</SelectItem>
                  <SelectItem value="succeeded">Erfolgreich</SelectItem>
                  <SelectItem value="failed">Fehlgeschlagen</SelectItem>
                  <SelectItem value="pending">Ausstehend</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={selectedType}
                onValueChange={setSelectedType}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Typ auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Alle Typen</SelectItem>
                  <SelectItem value="subscription">Abonnement</SelectItem>
                  <SelectItem value="one-time">Einmalzahlung</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button>
              <Download className="mr-2 h-4 w-4" />
              Exportieren
            </Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Benutzer</TableHead>
                <TableHead>Betrag</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Typ</TableHead>
                <TableHead>Datum</TableHead>
                <TableHead className="text-right">Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id}>
                  <TableCell>{transaction.id}</TableCell>
                  <TableCell>{transaction.userName}</TableCell>
                  <TableCell>
                    {transaction.amount.toFixed(2)} {transaction.currency}
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.status === 'succeeded' ? 'bg-green-100 text-green-800' :
                      transaction.status === 'failed' ? 'bg-red-100 text-red-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      transaction.type === 'subscription' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {transaction.type}
                    </span>
                  </TableCell>
                  <TableCell>{new Date(transaction.createdAt).toLocaleDateString()}</TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
} 
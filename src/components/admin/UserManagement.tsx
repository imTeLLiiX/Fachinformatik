'use client'

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, Plus, Pencil, Trash2 } from 'lucide-react'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'
import { Badge } from '@/components/ui/badge'

interface User {
  id: string
  email: string
  firstName: string
  lastName: string
  role: 'USER' | 'ADMIN' | 'INSTRUCTOR'
  isVerified: boolean
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [roleFilter, setRoleFilter] = useState<string>('all')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Benutzer konnten nicht geladen werden',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId: string, newRole: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole })
      })

      if (!response.ok) throw new Error('Fehler beim Aktualisieren der Rolle')

      toast({
        title: 'Erfolg',
        description: 'Benutzerrolle wurde erfolgreich aktualisiert'
      })

      fetchUsers()
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Benutzerrolle konnte nicht aktualisiert werden',
        variant: 'destructive'
      })
    }
  }

  const handleDelete = async (userId: string) => {
    if (!confirm('Möchten Sie diesen Benutzer wirklich löschen?')) return

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Fehler beim Löschen des Benutzers')

      toast({
        title: 'Erfolg',
        description: 'Benutzer wurde erfolgreich gelöscht'
      })

      fetchUsers()
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Benutzer konnte nicht gelöscht werden',
        variant: 'destructive'
      })
    }
  }

  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.lastName?.toLowerCase().includes(searchQuery.toLowerCase())
    
    const matchesRole = roleFilter === 'all' || user.role === roleFilter

    return matchesSearch && matchesRole
  })

  if (loading) return <div>Laden...</div>

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <div className="flex-1">
            <Label htmlFor="search">Benutzer suchen</Label>
            <Input
              id="search"
              placeholder="Nach Name oder E-Mail suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="w-48">
            <Label htmlFor="role">Rolle filtern</Label>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Alle Rollen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Alle Rollen</SelectItem>
                <SelectItem value="USER">Benutzer</SelectItem>
                <SelectItem value="ADMIN">Administrator</SelectItem>
                <SelectItem value="INSTRUCTOR">Dozent</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-4">
          {filteredUsers.map((user) => (
            <Card key={user.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">
                    {user.firstName} {user.lastName}
                  </h3>
                  <p className="text-gray-600">{user.email}</p>
                  <div className="mt-2 space-x-2">
                    <Badge variant={user.isVerified ? "default" : "secondary"}>
                      {user.isVerified ? 'Verifiziert' : 'Nicht verifiziert'}
                    </Badge>
                    <Badge variant="outline">
                      {user.role}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    Registriert am: {new Date(user.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <div className="space-x-2">
                  <Select
                    value={user.role}
                    onValueChange={(value) => handleRoleChange(user.id, value)}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="USER">Benutzer</SelectItem>
                      <SelectItem value="ADMIN">Administrator</SelectItem>
                      <SelectItem value="INSTRUCTOR">Dozent</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(user.id)}
                  >
                    Löschen
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
    </div>
  )
} 
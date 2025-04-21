import { useState } from 'react'
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

interface Module {
  id: string
  title: string
  description: string
  status: 'draft' | 'published' | 'archived'
  lastUpdated: string
  completionRate: number
}

export default function ModuleManagement() {
  const [searchQuery, setSearchQuery] = useState("")
  
  // Beispiel-Module (später durch echte Daten ersetzen)
  const modules: Module[] = [
    {
      id: "1",
      title: "HTML & CSS Grundlagen",
      description: "Einführung in die Webentwicklung",
      status: "published",
      lastUpdated: "2024-03-20",
      completionRate: 85
    },
    {
      id: "2",
      title: "JavaScript Basics",
      description: "Grundlagen der Programmierung",
      status: "draft",
      lastUpdated: "2024-03-19",
      completionRate: 0
    }
  ]

  const filteredModules = modules.filter(module => 
    module.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    module.description.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const getStatusColor = (status: Module['status']) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-800'
      case 'draft':
        return 'bg-yellow-100 text-yellow-800'
      case 'archived':
        return 'bg-gray-100 text-gray-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: Module['status']) => {
    switch (status) {
      case 'published':
        return 'Veröffentlicht'
      case 'draft':
        return 'Entwurf'
      case 'archived':
        return 'Archiviert'
      default:
        return status
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Modulverwaltung</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Input
              placeholder="Module suchen..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="max-w-sm"
            />
            <Button>Neues Modul</Button>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Titel</TableHead>
                <TableHead>Beschreibung</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Zuletzt aktualisiert</TableHead>
                <TableHead>Abschlussrate</TableHead>
                <TableHead>Aktionen</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredModules.map((module) => (
                <TableRow key={module.id}>
                  <TableCell>{module.title}</TableCell>
                  <TableCell>{module.description}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(module.status)}`}>
                      {getStatusText(module.status)}
                    </span>
                  </TableCell>
                  <TableCell>{module.lastUpdated}</TableCell>
                  <TableCell>{module.completionRate}%</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">Bearbeiten</Button>
                      <Button variant="outline" size="sm">Status ändern</Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
} 
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
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { toast } from '@/components/ui/use-toast'

interface Module {
  id: string
  title: string
  description: string
  content: any
  order: number
  courseId: string
}

interface ModuleManagementProps {
  courseId: string
}

export default function ModuleManagement({ courseId }: ModuleManagementProps) {
  const [modules, setModules] = useState<Module[]>([])
  const [loading, setLoading] = useState(true)
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    content: '',
    order: 0
  })

  useEffect(() => {
    fetchModules()
  }, [courseId])

  const fetchModules = async () => {
    try {
      const response = await fetch(`/api/modules?courseId=${courseId}`)
      const data = await response.json()
      setModules(data)
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Module konnten nicht geladen werden',
        variant: 'destructive'
      })
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const moduleData = {
        ...formData,
        courseId,
        content: JSON.parse(formData.content)
      }

      const response = await fetch('/api/modules', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(moduleData)
      })

      if (!response.ok) throw new Error('Fehler beim Erstellen des Moduls')

      toast({
        title: 'Erfolg',
        description: 'Modul wurde erfolgreich erstellt'
      })

      setFormData({ title: '', description: '', content: '', order: 0 })
      fetchModules()
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Modul konnte nicht erstellt werden',
        variant: 'destructive'
      })
    }
  }

  const handleUpdate = async (moduleId: string, updates: Partial<Module>) => {
    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updates)
      })

      if (!response.ok) throw new Error('Fehler beim Aktualisieren des Moduls')

      toast({
        title: 'Erfolg',
        description: 'Modul wurde erfolgreich aktualisiert'
      })

      fetchModules()
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Modul konnte nicht aktualisiert werden',
        variant: 'destructive'
      })
    }
  }

  const handleDelete = async (moduleId: string) => {
    if (!confirm('Möchten Sie dieses Modul wirklich löschen?')) return

    try {
      const response = await fetch(`/api/modules/${moduleId}`, {
        method: 'DELETE'
      })

      if (!response.ok) throw new Error('Fehler beim Löschen des Moduls')

      toast({
        title: 'Erfolg',
        description: 'Modul wurde erfolgreich gelöscht'
      })

      fetchModules()
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Modul konnte nicht gelöscht werden',
        variant: 'destructive'
      })
    }
  }

  const handleReorder = async (moduleId: string, newOrder: number) => {
    try {
      await handleUpdate(moduleId, { order: newOrder })
    } catch (error) {
      toast({
        title: 'Fehler',
        description: 'Reihenfolge konnte nicht geändert werden',
        variant: 'destructive'
      })
    }
  }

  if (loading) return <div>Laden...</div>

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Neues Modul erstellen</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Titel</Label>
            <Input
              id="title"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="description">Beschreibung</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="content">Inhalt (JSON)</Label>
            <Textarea
              id="content"
              value={formData.content}
              onChange={(e) => setFormData({ ...formData, content: e.target.value })}
              required
            />
          </div>
          <div>
            <Label htmlFor="order">Reihenfolge</Label>
            <Input
              id="order"
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
              required
            />
          </div>
          <Button type="submit">Modul erstellen</Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Module verwalten</h2>
        <div className="space-y-4">
          {modules.map((module) => (
            <Card key={module.id} className="p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-semibold">{module.title}</h3>
                  <p className="text-gray-600">{module.description}</p>
                  <div className="mt-2">
                    <span>Reihenfolge: {module.order}</span>
                  </div>
                </div>
                <div className="space-x-2">
                  <Button
                    variant="outline"
                    onClick={() => handleReorder(module.id, module.order - 1)}
                    disabled={module.order === 0}
                  >
                    ↑
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleReorder(module.id, module.order + 1)}
                  >
                    ↓
                  </Button>
                  <Button
                    variant="destructive"
                    onClick={() => handleDelete(module.id)}
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
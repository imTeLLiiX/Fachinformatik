import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

interface SystemSettings {
  maintenanceMode: boolean
  allowNewRegistrations: boolean
  maxUsersPerCourse: number
  backupFrequency: string
  emailNotifications: boolean
}

export default function SystemSettings() {
  const [settings, setSettings] = useState<SystemSettings>({
    maintenanceMode: false,
    allowNewRegistrations: true,
    maxUsersPerCourse: 100,
    backupFrequency: "daily",
    emailNotifications: true
  })

  const handleSettingChange = (key: keyof SystemSettings, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }))
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Systemeinstellungen</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Wartungsmodus</Label>
              <p className="text-sm text-muted-foreground">
                Aktivieren Sie den Wartungsmodus, um temporäre Wartungsarbeiten durchzuführen
              </p>
            </div>
            <Switch
              checked={settings.maintenanceMode}
              onCheckedChange={(checked) => handleSettingChange('maintenanceMode', checked)}
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Neue Registrierungen</Label>
              <p className="text-sm text-muted-foreground">
                Erlauben Sie neue Benutzerregistrierungen
              </p>
            </div>
            <Switch
              checked={settings.allowNewRegistrations}
              onCheckedChange={(checked) => handleSettingChange('allowNewRegistrations', checked)}
            />
          </div>

          <div className="space-y-2">
            <Label>Maximale Benutzer pro Kurs</Label>
            <Input
              type="number"
              value={settings.maxUsersPerCourse}
              onChange={(e) => handleSettingChange('maxUsersPerCourse', parseInt(e.target.value))}
              className="max-w-xs"
            />
          </div>

          <div className="space-y-2">
            <Label>Backup-Frequenz</Label>
            <select
              value={settings.backupFrequency}
              onChange={(e) => handleSettingChange('backupFrequency', e.target.value)}
              className="w-full max-w-xs rounded-md border border-input bg-background px-3 py-2"
            >
              <option value="hourly">Stündlich</option>
              <option value="daily">Täglich</option>
              <option value="weekly">Wöchentlich</option>
              <option value="monthly">Monatlich</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>E-Mail-Benachrichtigungen</Label>
              <p className="text-sm text-muted-foreground">
                Aktivieren Sie systemweite E-Mail-Benachrichtigungen
              </p>
            </div>
            <Switch
              checked={settings.emailNotifications}
              onCheckedChange={(checked) => handleSettingChange('emailNotifications', checked)}
            />
          </div>

          <div className="flex justify-end space-x-4">
            <Button variant="outline">Zurücksetzen</Button>
            <Button>Speichern</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
} 
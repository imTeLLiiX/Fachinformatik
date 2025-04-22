import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Save } from 'lucide-react';

export default function SettingsPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">Einstellungen</h1>
        <p className="text-gray-500">Konfigurieren Sie die Plattform-Einstellungen</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Allgemeine Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="site-name">Website-Name</Label>
              <Input id="site-name" defaultValue="IT Learning Platform" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="site-description">Website-Beschreibung</Label>
              <Input
                id="site-description"
                defaultValue="Eine moderne Lernplattform für IT-Profis"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="contact-email">Kontakt-E-Mail</Label>
              <Input
                id="contact-email"
                type="email"
                defaultValue="support@example.com"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Abonnement-Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="monthly-price">Monatlicher Preis (€)</Label>
              <Input
                id="monthly-price"
                type="number"
                defaultValue="29.99"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="yearly-price">Jährlicher Preis (€)</Label>
              <Input
                id="yearly-price"
                type="number"
                defaultValue="299.99"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lifetime-price">Lebenslanger Preis (€)</Label>
              <Input
                id="lifetime-price"
                type="number"
                defaultValue="999.99"
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Funktionen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-registration">Registrierung aktivieren</Label>
              <Switch id="enable-registration" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-comments">Kommentare aktivieren</Label>
              <Switch id="enable-comments" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-forum">Forum aktivieren</Label>
              <Switch id="enable-forum" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <Label htmlFor="enable-gamification">Gamification aktivieren</Label>
              <Switch id="enable-gamification" defaultChecked />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>API-Einstellungen</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="stripe-key">Stripe API Key</Label>
              <Input
                id="stripe-key"
                type="password"
                defaultValue="sk_test_..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="stripe-webhook">Stripe Webhook Secret</Label>
              <Input
                id="stripe-webhook"
                type="password"
                defaultValue="whsec_..."
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email-api">E-Mail API Key</Label>
              <Input
                id="email-api"
                type="password"
                defaultValue="..."
              />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex justify-end">
        <Button>
          <Save className="w-4 h-4 mr-2" />
          Einstellungen speichern
        </Button>
      </div>
    </div>
  );
} 
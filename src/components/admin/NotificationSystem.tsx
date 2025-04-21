import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Settings
} from "lucide-react";

interface Notification {
  id: string;
  type: "success" | "warning" | "error" | "info";
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
}

interface NotificationSetting {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  threshold?: number;
}

export function NotificationSystem() {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: "1",
      type: "warning",
      title: "Abbrecherate gestiegen",
      message: "Die Abbrecherate ist im letzten Monat um 5% gestiegen.",
      timestamp: new Date(Date.now() - 3600000),
      read: false
    },
    {
      id: "2",
      type: "success",
      title: "Umsatzziel erreicht",
      message: "Das monatliche Umsatzziel wurde erreicht.",
      timestamp: new Date(Date.now() - 7200000),
      read: false
    },
    {
      id: "3",
      type: "error",
      title: "Systemfehler",
      message: "Es gab einen Fehler bei der Synchronisation der Nutzerdaten.",
      timestamp: new Date(Date.now() - 86400000),
      read: true
    }
  ]);

  const [settings, setSettings] = useState<NotificationSetting[]>([
    {
      id: "churn",
      name: "Abbrecherate",
      description: "Benachrichtigung bei Anstieg der Abbrecherate",
      enabled: true,
      threshold: 5
    },
    {
      id: "revenue",
      name: "Umsatz",
      description: "Benachrichtigung bei Erreichen des Umsatzziels",
      enabled: true
    },
    {
      id: "users",
      name: "Nutzerwachstum",
      description: "Benachrichtigung bei Rückgang des Nutzerwachstums",
      enabled: true,
      threshold: 10
    },
    {
      id: "system",
      name: "Systemfehler",
      description: "Benachrichtigung bei Systemfehlern",
      enabled: true
    }
  ]);

  const [showSettings, setShowSettings] = useState(false);

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const toggleSetting = (id: string) => {
    setSettings(settings.map(setting => 
      setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
    ));
  };

  const getIconForType = (type: Notification["type"]) => {
    switch (type) {
      case "success":
            return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "warning":
            return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case "error":
            return <XCircle className="h-5 w-5 text-red-500" />;
      case "info":
            return <Bell className="h-5 w-5 text-blue-500" />;
      default:
            return <Bell className="h-5 w-5" />;
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Benachrichtigungen</h3>
        <Button 
          variant="outline" 
          size="sm"
          onClick={() => setShowSettings(!showSettings)}
          className="flex items-center gap-2"
        >
          <Settings className="h-4 w-4" />
          Einstellungen
        </Button>
      </div>

      {showSettings ? (
        <div className="space-y-4">
          <h4 className="font-medium">Benachrichtigungseinstellungen</h4>
          <div className="space-y-3">
            {settings.map(setting => (
              <div key={setting.id} className="flex items-start justify-between p-3 border rounded-lg">
                <div>
                  <p className="font-medium">{setting.name}</p>
                  <p className="text-sm text-muted-foreground">{setting.description}</p>
                  {setting.threshold && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Schwellenwert: {setting.threshold}%
                    </p>
                  )}
                </div>
                <Button 
                  variant={setting.enabled ? "default" : "outline"}
                  size="sm"
                  onClick={() => toggleSetting(setting.id)}
                >
                  {setting.enabled ? "Aktiviert" : "Deaktiviert"}
                </Button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          {notifications.length === 0 ? (
            <p className="text-center text-muted-foreground py-4">
              Keine Benachrichtigungen vorhanden
            </p>
          ) : (
            notifications.map(notification => (
              <div 
                key={notification.id} 
                className={`p-4 border rounded-lg ${notification.read ? 'bg-muted/50' : 'bg-background'}`}
              >
                <div className="flex items-start gap-3">
                  {getIconForType(notification.type)}
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <h4 className="font-medium">{notification.title}</h4>
                      <span className="text-xs text-muted-foreground">
                        {notification.timestamp.toLocaleString('de-DE')}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                  </div>
                  {!notification.read && (
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => markAsRead(notification.id)}
                    >
                      Als gelesen markieren
                    </Button>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      )}
    </Card>
  );
} 
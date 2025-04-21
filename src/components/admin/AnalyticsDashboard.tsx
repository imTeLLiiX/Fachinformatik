import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  BookOpen, 
  CreditCard, 
  TrendingUp,
  Activity,
  Award
} from "lucide-react";
import { UserAnalytics } from "./UserAnalytics";
import { ContentAnalytics } from "./ContentAnalytics";
import { RevenueAnalytics } from "./RevenueAnalytics";
import { NotificationSystem } from "./NotificationSystem";

interface AnalyticsMetric {
  label: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
}

const metrics: AnalyticsMetric[] = [
  {
    label: "Aktive Nutzer",
    value: "1,234",
    change: 12.5,
    icon: <Users className="h-4 w-4" />
  },
  {
    label: "Module abgeschlossen",
    value: "8,765",
    change: 8.2,
    icon: <BookOpen className="h-4 w-4" />
  },
  {
    label: "Monatlicher Umsatz",
    value: "€12,345",
    change: 15.3,
    icon: <CreditCard className="h-4 w-4" />
  },
  {
    label: "Durchschnittliche Bewertung",
    value: "4.8/5",
    change: 0.2,
    icon: <Award className="h-4 w-4" />
  }
];

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Übersicht</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Aktive Nutzer</p>
              <p className="text-2xl font-bold">1,234</p>
              <p className="text-sm text-green-500">+12% zum Vormonat</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Umsatz</p>
              <p className="text-2xl font-bold">€45,678</p>
              <p className="text-sm text-green-500">+8% zum Vormonat</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Abgeschlossene Kurse</p>
              <p className="text-2xl font-bold">567</p>
              <p className="text-sm text-green-500">+15% zum Vormonat</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittliche Bewertung</p>
              <p className="text-2xl font-bold">4.8</p>
              <p className="text-sm text-green-500">+0.2 zum Vormonat</p>
            </div>
          </div>
        </Card>
        <NotificationSystem />
      </div>

      <Tabs defaultValue="users" className="space-y-4">
        <TabsList>
          <TabsTrigger value="users">Nutzer</TabsTrigger>
          <TabsTrigger value="content">Inhalte</TabsTrigger>
          <TabsTrigger value="revenue">Umsatz</TabsTrigger>
        </TabsList>
        <TabsContent value="users">
          <UserAnalytics />
        </TabsContent>
        <TabsContent value="content">
          <ContentAnalytics />
        </TabsContent>
        <TabsContent value="revenue">
          <RevenueAnalytics />
        </TabsContent>
      </Tabs>
    </div>
  );
} 
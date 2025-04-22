import { Card } from "@/components/ui/card";
import { 
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const userData = [
  { month: "Jan", new: 120, active: 850, premium: 320 },
  { month: "Feb", new: 150, active: 920, premium: 380 },
  { month: "Mar", new: 180, active: 980, premium: 420 },
  { month: "Apr", new: 210, active: 1050, premium: 460 },
  { month: "Mai", new: 240, active: 1120, premium: 500 },
  { month: "Jun", new: 270, active: 1180, premium: 540 },
];

interface UserSegment {
  name: string;
  count: number;
  percentage: number;
}

const userSegments: UserSegment[] = [
  { name: "Basic", count: 850, percentage: 45 },
  { name: "Pro", count: 650, percentage: 35 },
  { name: "Lifetime", count: 400, percentage: 20 }
];

export function UserAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nutzerwachstum</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={userData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="new" fill="#4f46e5" name="Neue Nutzer" />
                <Bar dataKey="active" fill="#22c55e" name="Aktive Nutzer" />
                <Bar dataKey="premium" fill="#f59e0b" name="Premium Nutzer" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nutzeraktivität</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittliche Sitzungsdauer</p>
              <p className="text-2xl font-bold">45 Minuten</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktive Nutzer pro Tag</p>
              <p className="text-2xl font-bold">789</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Bounce Rate</p>
              <p className="text-2xl font-bold">32%</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Nutzerengagement</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittliche Kursabschlussrate</p>
              <p className="text-2xl font-bold">76%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittliche Quiz-Bewertung</p>
              <p className="text-2xl font-bold">82%</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Community-Beiträge pro Tag</p>
              <p className="text-2xl font-bold">156</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Nutzersegmente</h3>
        <div className="space-y-4">
          {userSegments.map((segment) => (
            <div key={segment.name} className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm font-medium">{segment.name}</span>
                <span className="text-sm text-muted-foreground">
                  {segment.count} Nutzer
                </span>
              </div>
              <div className="h-2 bg-secondary rounded-full">
                <div
                  className="h-full bg-primary rounded-full"
                  style={{ width: `${segment.percentage}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Engagement-Metriken</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">Durchschnittliche Lernzeit</p>
            <p className="text-2xl font-bold">45 Minuten</p>
            <p className="text-sm text-green-500">+5% vs. letzter Monat</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Abschlussrate</p>
            <p className="text-2xl font-bold">78%</p>
            <p className="text-sm text-green-500">+3% vs. letzter Monat</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">NPS Score</p>
            <p className="text-2xl font-bold">8.5</p>
            <p className="text-sm text-green-500">+0.5 vs. letzter Monat</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 
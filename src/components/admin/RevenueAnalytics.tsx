import { Card } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

interface RevenueStats {
  date: string;
  revenue: number;
  subscriptions: number;
}

const revenueData: RevenueStats[] = [
  { date: "Jan", revenue: 12500, subscriptions: 150 },
  { date: "Feb", revenue: 15000, subscriptions: 180 },
  { date: "Mar", revenue: 18000, subscriptions: 220 },
  { date: "Apr", revenue: 21000, subscriptions: 250 },
  { date: "Mai", revenue: 24000, subscriptions: 280 },
  { date: "Jun", revenue: 27000, subscriptions: 300 }
];

interface SubscriptionTier {
  name: string;
  revenue: number;
  percentage: number;
  growth: number;
}

const subscriptionTiers: SubscriptionTier[] = [
  {
    name: "Basic",
    revenue: 45000,
    percentage: 30,
    growth: 15
  },
  {
    name: "Pro",
    revenue: 85000,
    percentage: 55,
    growth: 25
  },
  {
    name: "Lifetime",
    revenue: 25000,
    percentage: 15,
    growth: 10
  }
];

export function RevenueAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Umsatzentwicklung</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#8884d8"
                  fill="#8884d8"
                  name="Umsatz (€)"
                />
                <Area
                  yAxisId="right"
                  type="monotone"
                  dataKey="subscriptions"
                  stroke="#82ca9d"
                  fill="#82ca9d"
                  name="Abonnements"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Umsatz nach Tarif</h3>
          <div className="space-y-4">
            {subscriptionTiers.map((tier) => (
              <div key={tier.name} className="space-y-2">
                <div className="flex justify-between items-center">
                  <div>
                    <p className="font-medium">{tier.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {tier.revenue.toLocaleString()} €
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{tier.percentage}%</p>
                    <p className="text-sm text-green-500">
                      +{tier.growth}% vs. letzter Monat
                    </p>
                  </div>
                </div>
                <div className="h-2 bg-secondary rounded-full">
                  <div
                    className="h-full bg-primary rounded-full"
                    style={{ width: `${tier.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Finanzielle Kennzahlen</h3>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="space-y-2">
            <p className="text-sm font-medium">MRR</p>
            <p className="text-2xl font-bold">27.000 €</p>
            <p className="text-sm text-green-500">+12% vs. letzter Monat</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">ARR</p>
            <p className="text-2xl font-bold">324.000 €</p>
            <p className="text-sm text-green-500">+15% vs. letzter Monat</p>
          </div>
          <div className="space-y-2">
            <p className="text-sm font-medium">Churn Rate</p>
            <p className="text-2xl font-bold">2.5%</p>
            <p className="text-sm text-green-500">-0.5% vs. letzter Monat</p>
          </div>
        </div>
      </Card>
    </div>
  );
} 
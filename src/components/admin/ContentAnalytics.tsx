import { Card } from "@/components/ui/card";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from "recharts";

const contentData = [
  { month: "Jan", completions: 450, engagement: 780, satisfaction: 4.2 },
  { month: "Feb", completions: 520, engagement: 850, satisfaction: 4.3 },
  { month: "Mar", completions: 580, engagement: 920, satisfaction: 4.4 },
  { month: "Apr", completions: 650, engagement: 980, satisfaction: 4.5 },
  { month: "Mai", completions: 720, engagement: 1050, satisfaction: 4.6 },
  { month: "Jun", completions: 790, engagement: 1120, satisfaction: 4.7 },
];

const topCourses = [
  { title: "Web Development Grundlagen", students: 1250, rating: 4.8, completion: 85 },
  { title: "Python für Anfänger", students: 980, rating: 4.7, completion: 82 },
  { title: "Data Science Basics", students: 850, rating: 4.6, completion: 78 },
  { title: "Cloud Computing", students: 720, rating: 4.5, completion: 75 },
  { title: "Cybersecurity", students: 650, rating: 4.4, completion: 72 },
];

export function ContentAnalytics() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Kurs-Performance</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={contentData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="completions" stroke="#4f46e5" name="Abschlüsse" />
                <Line type="monotone" dataKey="engagement" stroke="#22c55e" name="Engagement" />
                <Line type="monotone" dataKey="satisfaction" stroke="#f59e0b" name="Zufriedenheit" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content-Metriken</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittliche Kursdauer</p>
              <p className="text-2xl font-bold">4.5 Stunden</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Aktive Kurse</p>
              <p className="text-2xl font-bold">24</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Durchschnittliche Bewertung</p>
              <p className="text-2xl font-bold">4.6/5.0</p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4">Content-Qualität</h3>
          <div className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Überarbeitete Kurse</p>
              <p className="text-2xl font-bold">8</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Neue Module</p>
              <p className="text-2xl font-bold">12</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Community-Feedback</p>
              <p className="text-2xl font-bold">245</p>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Top Kurse</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4">Kurs</th>
                <th className="text-right py-3 px-4">Studenten</th>
                <th className="text-right py-3 px-4">Bewertung</th>
                <th className="text-right py-3 px-4">Abschlussrate</th>
              </tr>
            </thead>
            <tbody>
              {topCourses.map((course) => (
                <tr key={course.title} className="border-b">
                  <td className="py-3 px-4">{course.title}</td>
                  <td className="text-right py-3 px-4">{course.students}</td>
                  <td className="text-right py-3 px-4">{course.rating}/5.0</td>
                  <td className="text-right py-3 px-4">{course.completion}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
} 
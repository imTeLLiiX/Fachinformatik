import React from 'react'
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProgressAnalyticsProps {
  userProgress: {
    completedModules: string[];
    quizScores: Record<string, number>;
    exerciseCompletions: Record<string, boolean>;
  };
  isSubscriptionActive: boolean;
}

const ProgressAnalytics: React.FC<ProgressAnalyticsProps> = ({ userProgress, isSubscriptionActive }) => {
  // Calculate overall progress
  const calculateOverallProgress = () => {
    const totalModules = 10; // Total number of modules in the course
    return (userProgress.completedModules.length / totalModules) * 100;
  };

  // Identify weak areas based on quiz scores
  const identifyWeakAreas = () => {
    const weakAreas: { moduleId: string; score: number }[] = [];
    Object.entries(userProgress.quizScores).forEach(([moduleId, score]) => {
      if (score < 70) { // Consider scores below 70% as weak areas
        weakAreas.push({ moduleId, score });
      }
    });
    return weakAreas;
  };

  // Generate learning recommendations
  const generateRecommendations = () => {
    const weakAreas = identifyWeakAreas();
    const recommendations: string[] = [];
    
    weakAreas.forEach(({ moduleId }) => {
      recommendations.push(`Review module ${moduleId} to improve your understanding`);
    });

    if (recommendations.length === 0) {
      recommendations.push("Great job! Keep up the good work!");
    }

    return recommendations;
  };

  if (!isSubscriptionActive) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Progress Analytics</CardTitle>
          <CardDescription>
            Upgrade to Premium to access detailed progress analytics and personalized recommendations.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Progress value={calculateOverallProgress()} className="w-full" />
          <p className="mt-2 text-sm text-muted-foreground">
            Overall Progress: {Math.round(calculateOverallProgress())}%
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Progress Analytics</CardTitle>
        <CardDescription>
          Track your learning progress and get personalized recommendations
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="overview">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="weaknesses">Areas to Improve</TabsTrigger>
            <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview">
            <div className="space-y-4">
              <Progress value={calculateOverallProgress()} className="w-full" />
              <p className="text-sm text-muted-foreground">
                Overall Progress: {Math.round(calculateOverallProgress())}%
              </p>
              <p className="text-sm">
                Completed Modules: {userProgress.completedModules.length}
              </p>
            </div>
          </TabsContent>

          <TabsContent value="weaknesses">
            <div className="space-y-4">
              {identifyWeakAreas().map(({ moduleId, score }) => (
                <div key={moduleId} className="flex justify-between items-center">
                  <span>Module {moduleId}</span>
                  <span className="text-red-500">{score}%</span>
                </div>
              ))}
              {identifyWeakAreas().length === 0 && (
                <p className="text-sm text-green-500">
                  No significant weak areas identified. Keep up the good work!
                </p>
              )}
            </div>
          </TabsContent>

          <TabsContent value="recommendations">
            <ul className="space-y-2 list-disc pl-4">
              {generateRecommendations().map((recommendation, index) => (
                <li key={index} className="text-sm">
                  {recommendation}
                </li>
              ))}
            </ul>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ProgressAnalytics; 
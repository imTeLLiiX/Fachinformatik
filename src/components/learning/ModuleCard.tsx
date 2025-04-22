import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Lock, BookOpen, Clock, Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModuleCardProps {
  variant: 'basic' | 'pro' | 'locked';
  title: string;
  description: string;
  progress?: number;
  estimatedTime?: number;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  topics?: number;
  exercises?: number;
  quizzes?: number;
  flashcards?: number;
  onClick?: () => void;
  className?: string;
}

export function ModuleCard({
  variant,
  title,
  description,
  progress = 0,
  estimatedTime = 0,
  difficulty = 'beginner',
  topics = 0,
  exercises = 0,
  quizzes = 0,
  flashcards = 0,
  onClick,
  className
}: ModuleCardProps) {
  const isLocked = variant === 'locked';
  const isPro = variant === 'pro';

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800'
  };

  return (
    <Card 
      className={cn(
        'transition-all duration-200 hover:shadow-md',
        isLocked && 'opacity-75',
        className
      )}
    >
      <CardHeader className="relative">
        {isLocked && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/5 rounded-t-lg">
            <Lock className="w-8 h-8 text-gray-400" />
          </div>
        )}
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center">
            <BookOpen className="w-5 h-5 mr-2 text-gray-500" />
            {title}
          </span>
          {isPro && (
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-800 rounded-full">
              PRO
            </span>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-500">{description}</p>
        
        <div className="flex items-center text-sm text-gray-500">
          <Clock className="w-4 h-4 mr-1" />
          {estimatedTime} Minuten
        </div>

        <div className="flex items-center">
          <span className={cn(
            'px-2 py-1 text-xs font-medium rounded-full',
            difficultyColors[difficulty]
          )}>
            {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
          </span>
        </div>

        {!isLocked && progress > 0 && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Fortschritt</span>
              <span>{progress}%</span>
            </div>
            <Progress value={progress} />
          </div>
        )}

        <div className="grid grid-cols-2 gap-2 text-sm">
          <div className="flex items-center text-gray-500">
            <BookOpen className="w-4 h-4 mr-1" />
            {topics} Themen
          </div>
          <div className="flex items-center text-gray-500">
            <Award className="w-4 h-4 mr-1" />
            {exercises} Übungen
          </div>
          <div className="flex items-center text-gray-500">
            <BookOpen className="w-4 h-4 mr-1" />
            {quizzes} Quizze
          </div>
          <div className="flex items-center text-gray-500">
            <BookOpen className="w-4 h-4 mr-1" />
            {flashcards} Karteikarten
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          className="w-full" 
          variant={isLocked ? 'outline' : 'default'}
          onClick={onClick}
          disabled={isLocked}
        >
          {isLocked ? 'Geschlossen' : 'Starten'}
        </Button>
      </CardFooter>
    </Card>
  );
} 
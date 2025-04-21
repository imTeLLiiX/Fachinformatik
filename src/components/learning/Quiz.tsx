import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { cn } from "@/lib/utils"

interface Question {
  id: string
  question: string
  options: string[]
  correctAnswer: number
  explanation?: string
}

interface QuizProps {
  questions: Question[]
  onComplete?: (score: number, total: number) => void
  className?: string
}

export function Quiz({ questions, onComplete, className }: QuizProps) {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showExplanation, setShowExplanation] = useState(false)
  const [score, setScore] = useState(0)

  const progress = ((currentQuestion + 1) / questions.length) * 100
  const question = questions[currentQuestion]

  const handleAnswer = (index: number) => {
    setSelectedAnswer(index)
    setShowExplanation(true)
    
    if (index === question.correctAnswer) {
      setScore(score + 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1)
      setSelectedAnswer(null)
      setShowExplanation(false)
    } else {
      onComplete?.(score, questions.length)
    }
  }

  return (
    <Card className={cn("w-full max-w-2xl mx-auto", className)}>
      <CardHeader>
        <CardTitle>Quiz</CardTitle>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <h3 className="text-lg font-medium">
            {currentQuestion + 1}. {question.question}
          </h3>
          
          <div className="grid gap-2">
            {question.options.map((option, index) => (
              <Button
                key={index}
                variant="outline"
                className={cn(
                  "justify-start text-left",
                  selectedAnswer === index && (
                    index === question.correctAnswer
                      ? "border-green-500 bg-green-50"
                      : "border-red-500 bg-red-50"
                  )
                )}
                onClick={() => handleAnswer(index)}
                disabled={selectedAnswer !== null}
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {showExplanation && question.explanation && (
          <div className="rounded-lg bg-muted p-4">
            <p className="text-sm">{question.explanation}</p>
          </div>
        )}

        {selectedAnswer !== null && (
          <Button
            className="w-full"
            onClick={handleNext}
          >
            {currentQuestion < questions.length - 1 ? "Nächste Frage" : "Quiz beenden"}
          </Button>
        )}
      </CardContent>
    </Card>
  )
} 
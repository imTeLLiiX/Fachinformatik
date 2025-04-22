import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { RotateCw, Check, X } from "lucide-react"

interface FlashcardProps {
  front: string
  back: string
  onResult?: (correct: boolean) => void
  className?: string
}

export function Flashcard({ front, back, onResult, className }: FlashcardProps) {
  const [isFlipped, setIsFlipped] = useState(false)
  const [isAnswered, setIsAnswered] = useState(false)

  const handleFlip = () => {
    if (!isAnswered) {
      setIsFlipped(!isFlipped)
    }
  }

  const handleAnswer = (correct: boolean) => {
    setIsAnswered(true)
    onResult?.(correct)
  }

  const handleNext = () => {
    setIsFlipped(false)
    setIsAnswered(false)
  }

  return (
    <div className={cn("perspective-1000", className)}>
      <Card
        className={cn(
          "relative h-64 w-full cursor-pointer transition-all duration-500",
          isFlipped && "rotate-y-180"
        )}
        onClick={handleFlip}
      >
        <CardContent className="absolute inset-0 flex items-center justify-center p-6">
          {!isFlipped ? (
            <div className="text-center">
              <p className="text-lg font-medium">{front}</p>
              <p className="mt-2 text-sm text-muted-foreground">
                Klicken Sie zum Umdrehen
              </p>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-lg font-medium">{back}</p>
              {!isAnswered ? (
                <div className="mt-4 flex justify-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-green-500 hover:bg-green-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAnswer(true)
                    }}
                  >
                    <Check className="mr-2 h-4 w-4" />
                    Gewusst
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-500 hover:bg-red-50"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleAnswer(false)
                    }}
                  >
                    <X className="mr-2 h-4 w-4" />
                    Nicht gewusst
                  </Button>
                </div>
              ) : (
                <Button
                  className="mt-4"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleNext()
                  }}
                >
                  <RotateCw className="mr-2 h-4 w-4" />
                  Nächste Karte
                </Button>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
} 
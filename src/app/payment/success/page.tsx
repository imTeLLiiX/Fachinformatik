import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentSuccessPage() {
  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>Zahlung erfolgreich</CardTitle>
          <CardDescription>
            Vielen Dank für Ihren Kauf! Ihre Premium-Mitgliedschaft ist jetzt aktiv.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sie haben jetzt Zugriff auf alle Premium-Features. 
            Genießen Sie Ihre erweiterte Lernplattform!
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Zum Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/billing">
              Abrechnung verwalten
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 
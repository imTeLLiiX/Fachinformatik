import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function PaymentCancelPage() {
  return (
    <div className="container max-w-lg py-10">
      <Card>
        <CardHeader>
          <CardTitle>Zahlung abgebrochen</CardTitle>
          <CardDescription>
            Der Zahlungsvorgang wurde abgebrochen. Keine Sorge, es wurden keine Kosten berechnet.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Sie können den Zahlungsvorgang jederzeit wiederholen. 
            Bei Fragen stehen wir Ihnen gerne zur Verfügung.
          </p>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" asChild>
            <Link href="/dashboard">
              Zum Dashboard
            </Link>
          </Button>
          <Button asChild>
            <Link href="/subscription">
              Erneut versuchen
            </Link>
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
} 
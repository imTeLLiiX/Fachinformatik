import { useState } from 'react'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"
import { SUBSCRIPTION_PLANS, SubscriptionTier } from '@/lib/stripe'

interface SubscriptionPlansProps {
  currentTier?: SubscriptionTier
}

export default function SubscriptionPlans({ currentTier }: SubscriptionPlansProps) {
  const [isLoading, setIsLoading] = useState<SubscriptionTier | null>(null)

  const handleSubscribe = async (tier: SubscriptionTier) => {
    try {
      setIsLoading(tier)
      
      const response = await fetch('/api/payment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tier,
          successUrl: `${window.location.origin}/payment/success`,
          cancelUrl: `${window.location.origin}/payment/cancel`,
        }),
      })

      const data = await response.json()
      
      if (data.url) {
        window.location.href = data.url
      } else {
        throw new Error('Keine Checkout-URL erhalten')
      }
    } catch (error) {
      console.error('Subscription error:', error)
      alert('Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.')
    } finally {
      setIsLoading(null)
    }
  }

  return (
    <div className="grid gap-6 md:grid-cols-3">
      {Object.entries(SUBSCRIPTION_PLANS).map(([tier, plan]) => (
        <Card key={tier} className={currentTier === tier ? 'border-primary' : ''}>
          <CardHeader>
            <CardTitle>{plan.name}</CardTitle>
            <CardDescription>
              {plan.price.toFixed(2)} €
              {tier !== 'LIFETIME' ? '/ Monat' : ' einmalig'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              {plan.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <Check className="mr-2 h-4 w-4 text-green-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter>
            <Button
              className="w-full"
              variant={currentTier === tier ? 'outline' : 'default'}
              disabled={isLoading === tier || currentTier === tier}
              onClick={() => handleSubscribe(tier as SubscriptionTier)}
            >
              {currentTier === tier
                ? 'Aktueller Plan'
                : isLoading === tier
                ? 'Wird geladen...'
                : tier === 'LIFETIME'
                ? 'Jetzt kaufen'
                : 'Upgrade'}
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
} 
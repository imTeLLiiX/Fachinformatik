import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/auth'
import { PaymentService } from '@/lib/stripe'
import { SubscriptionTier } from '@prisma/client'

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { tier, successUrl, cancelUrl } = await req.json()

    if (!tier || !successUrl || !cancelUrl) {
      return NextResponse.json(
        { error: 'Fehlende Parameter' },
        { status: 400 }
      )
    }

    const paymentService = new PaymentService()
    const checkoutSession = await paymentService.createCheckoutSession({
      customerId: session.user.id,
      tier: tier as SubscriptionTier,
      successUrl,
      cancelUrl
    })

    return NextResponse.json({ url: checkoutSession.url })
  } catch (error) {
    console.error('Payment error:', error)
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Nicht autorisiert' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(req.url)
    const returnUrl = searchParams.get('returnUrl')

    if (!returnUrl) {
      return NextResponse.json(
        { error: 'Fehlende Parameter' },
        { status: 400 }
      )
    }

    const paymentService = new PaymentService()
    const portalSession = await paymentService.createPortalSession(
      session.user.id,
      returnUrl
    )

    return NextResponse.json({ url: portalSession.url })
  } catch (error) {
    console.error('Portal error:', error)
    return NextResponse.json(
      { error: 'Interner Serverfehler' },
      { status: 500 }
    )
  }
} 
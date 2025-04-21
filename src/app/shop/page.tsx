import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

// Lazy load components
const SubscriptionPlans = dynamic(() => import('@/components/shop/SubscriptionPlans'), {
  loading: () => <SubscriptionPlansSkeleton />,
  ssr: false
});

const PaymentForm = dynamic(() => import('@/components/shop/PaymentForm'), {
  loading: () => <PaymentFormSkeleton />,
  ssr: false
});

function SubscriptionPlansSkeleton() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {[1, 2, 3].map((i) => (
        <Card key={i} className="p-6">
          <CardHeader>
            <Skeleton className="h-8 w-3/4" />
            <Skeleton className="h-4 w-1/2 mt-2" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-6 w-1/4 mb-4" />
            <div className="space-y-2">
              {[1, 2, 3, 4].map((j) => (
                <Skeleton key={j} className="h-4 w-full" />
              ))}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

function PaymentFormSkeleton() {
  return (
    <Card className="p-6">
      <CardHeader>
        <Skeleton className="h-8 w-1/2" />
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
          <Skeleton className="h-10 w-full" />
        </div>
      </CardContent>
    </Card>
  );
}

export default function ShopPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Premium-Features</h1>
      
      <Suspense fallback={<SubscriptionPlansSkeleton />}>
        <SubscriptionPlans />
      </Suspense>

      <div className="mt-8">
        <Suspense fallback={<PaymentFormSkeleton />}>
          <PaymentForm />
        </Suspense>
      </div>
    </div>
  );
} 
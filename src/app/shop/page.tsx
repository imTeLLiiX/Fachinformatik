import { Suspense } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import dynamic from "next/dynamic"

// Lazy load shop components
const ShopProducts = dynamic(() => import("@/components/shop/ShopProducts"), {
  loading: () => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(6)].map((_, i) => (
        <Card key={i}>
          <CardHeader>
            <Skeleton className="h-6 w-3/4" />
          </CardHeader>
          <CardContent>
            <Skeleton className="h-24 w-full" />
          </CardContent>
        </Card>
      ))}
    </div>
  ),
})

const ShopFilters = dynamic(() => import("@/components/shop/ShopFilters"), {
  loading: () => (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-1/2" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
    </Card>
  ),
})

export default function ShopPage() {
  return (
    <div className="container py-8">
      <h1 className="mb-8 text-3xl font-bold">Shop</h1>
      
      <div className="grid gap-8 md:grid-cols-4">
        <div className="md:col-span-1">
          <Suspense fallback={<ShopFilters />}>
            <ShopFilters />
          </Suspense>
        </div>
        
        <div className="md:col-span-3">
          <Suspense fallback={<ShopProducts />}>
            <ShopProducts />
          </Suspense>
        </div>
      </div>
    </div>
  )
} 
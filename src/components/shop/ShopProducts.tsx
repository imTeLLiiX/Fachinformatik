import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import Image from 'next/image'

interface Product {
  id: string
  title: string
  description: string
  price: number
  image: string
  category: string
  rating: number
  reviews: number
}

const products: Product[] = [
  {
    id: "1",
    title: "Premium Mitgliedschaft",
    description: "Zugang zu allen Premium-Kursen und Features",
    price: 29.99,
    image: "/images/premium.jpg",
    category: "subscription",
    rating: 4.8,
    reviews: 124
  },
  {
    id: "2",
    title: "Jahresabo",
    description: "Spare 20% mit unserem Jahresabo",
    price: 299.99,
    image: "/images/yearly.jpg",
    category: "subscription",
    rating: 4.9,
    reviews: 89
  },
  {
    id: "3",
    title: "Lifetime Zugang",
    description: "Einmalige Zahlung für lebenslangen Zugang",
    price: 499.99,
    image: "/images/lifetime.jpg",
    category: "subscription",
    rating: 4.7,
    reviews: 56
  }
]

export default function ShopProducts() {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader>
            <CardTitle>{product.title}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="aspect-video overflow-hidden rounded-lg bg-muted">
              <Image
                src={product.image || '/placeholder.jpg'}
                alt={product.title}
                width={400}
                height={300}
                className="h-full w-full object-cover"
              />
            </div>
            
            <p className="text-sm text-muted-foreground">
              {product.description}
            </p>
            
            <div className="flex items-center justify-between">
              <div className="text-2xl font-bold">
                €{product.price.toFixed(2)}
              </div>
              <div className="flex items-center space-x-2">
                <Progress value={product.rating * 20} className="h-2 w-24" />
                <span className="text-sm text-muted-foreground">
                  ({product.reviews})
                </span>
              </div>
            </div>
            
            <Button className="w-full">Jetzt kaufen</Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
} 
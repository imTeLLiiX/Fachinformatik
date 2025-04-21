import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ShopFilters() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Suche</label>
          <Input placeholder="Produkt suchen..." />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Kategorie</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Kategorie auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Kategorien</SelectItem>
              <SelectItem value="subscription">Abonnements</SelectItem>
              <SelectItem value="course">Kurse</SelectItem>
              <SelectItem value="tool">Tools</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Preisbereich</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Preisbereich auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Preise</SelectItem>
              <SelectItem value="0-50">€0 - €50</SelectItem>
              <SelectItem value="50-100">€50 - €100</SelectItem>
              <SelectItem value="100-500">€100 - €500</SelectItem>
              <SelectItem value="500+">€500+</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Bewertung</label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder="Bewertung auswählen" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Alle Bewertungen</SelectItem>
              <SelectItem value="5">5 Sterne</SelectItem>
              <SelectItem value="4">4+ Sterne</SelectItem>
              <SelectItem value="3">3+ Sterne</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <Button className="w-full">Filter anwenden</Button>
      </CardContent>
    </Card>
  )
} 
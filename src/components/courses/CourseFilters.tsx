'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Button } from '@/components/ui/button';

interface Filters {
  level: string;
  duration: string;
  isPremium: boolean;
}

export default function CourseFilters() {
  const [filters, setFilters] = useState<Filters>({
    level: 'all',
    duration: 'all',
    isPremium: false,
  });

  const handleFilterChange = (key: keyof Filters, value: string | boolean) => {
    setFilters((prev) => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleReset = () => {
    setFilters({
      level: 'all',
      duration: 'all',
      isPremium: false,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Filter</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Level Filter */}
        <div className="space-y-4">
          <Label>Schwierigkeitsgrad</Label>
          <RadioGroup
            value={filters.level}
            onValueChange={(value) => handleFilterChange('level', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-levels" />
              <Label htmlFor="all-levels">Alle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="beginner" id="beginner" />
              <Label htmlFor="beginner">Anfänger</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="intermediate" id="intermediate" />
              <Label htmlFor="intermediate">Fortgeschritten</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="advanced" id="advanced" />
              <Label htmlFor="advanced">Experte</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Duration Filter */}
        <div className="space-y-4">
          <Label>Kursdauer</Label>
          <RadioGroup
            value={filters.duration}
            onValueChange={(value) => handleFilterChange('duration', value)}
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="all" id="all-durations" />
              <Label htmlFor="all-durations">Alle</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="short" id="short" />
              <Label htmlFor="short">&lt; 5 Stunden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="medium" id="medium" />
              <Label htmlFor="medium">5-10 Stunden</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="long" id="long" />
              <Label htmlFor="long">&gt; 10 Stunden</Label>
            </div>
          </RadioGroup>
        </div>

        {/* Premium Filter */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="premium"
            checked={filters.isPremium}
            onCheckedChange={(checked) => 
              handleFilterChange('isPremium', checked === true)
            }
          />
          <Label htmlFor="premium">Nur Premium-Kurse</Label>
        </div>

        {/* Reset Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={handleReset}
        >
          Filter zurücksetzen
        </Button>
      </CardContent>
    </Card>
  );
}
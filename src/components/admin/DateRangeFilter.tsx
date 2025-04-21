import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { format } from "date-fns";
import { de } from "date-fns/locale";

interface DateRangeFilterProps {
  onDateRangeChange: (startDate: Date, endDate: Date) => void;
}

export function DateRangeFilter({ onDateRangeChange }: DateRangeFilterProps) {
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().setMonth(new Date().getMonth() - 1)));
  const [endDate, setEndDate] = useState<Date>(new Date());

  const handleApplyFilter = () => {
    onDateRangeChange(startDate, endDate);
  };

  const presetRanges = [
    {
      label: "Letzte 7 Tage",
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setDate(start.getDate() - 7);
        return { start, end };
      }
    },
    {
      label: "Letzter Monat",
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 1);
        return { start, end };
      }
    },
    {
      label: "Letztes Quartal",
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setMonth(start.getMonth() - 3);
        return { start, end };
      }
    },
    {
      label: "Letztes Jahr",
      getValue: () => {
        const end = new Date();
        const start = new Date();
        start.setFullYear(start.getFullYear() - 1);
        return { start, end };
      }
    }
  ];

  const applyPreset = (preset: typeof presetRanges[0]) => {
    const { start, end } = preset.getValue();
    setStartDate(start);
    setEndDate(end);
    onDateRangeChange(start, end);
  };

  return (
    <Card className="p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4">
        <div className="flex items-center gap-2">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium">Zeitraum:</span>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {presetRanges.map((preset) => (
            <Button 
              key={preset.label}
              variant="outline" 
              size="sm"
              onClick={() => applyPreset(preset)}
            >
              {preset.label}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2 ml-auto">
          <div className="text-sm">
            {format(startDate, "dd.MM.yyyy", { locale: de })} - {format(endDate, "dd.MM.yyyy", { locale: de })}
          </div>
          <Button 
            size="sm" 
            onClick={handleApplyFilter}
          >
            Anwenden
          </Button>
        </div>
      </div>
    </Card>
  );
} 
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Download, 
  FileText, 
  Table, 
  BarChart2,
  Calendar
} from "lucide-react";

interface ExportOption {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  format: "csv" | "json" | "pdf";
}

const exportOptions: ExportOption[] = [
  {
    id: "users",
    name: "Nutzerdaten",
    description: "Exportiert alle Nutzerinformationen",
    icon: <FileText className="h-5 w-5" />,
    format: "csv"
  },
  {
    id: "analytics",
    name: "Analysedaten",
    description: "Exportiert alle Analysedaten",
    icon: <BarChart2 className="h-5 w-5" />,
    format: "json"
  },
  {
    id: "transactions",
    name: "Transaktionsdaten",
    description: "Exportiert alle Zahlungsinformationen",
    icon: <Table className="h-5 w-5" />,
    format: "csv"
  },
  {
    id: "reports",
    name: "Monatsberichte",
    description: "Exportiert monatliche Berichte",
    icon: <Calendar className="h-5 w-5" />,
    format: "pdf"
  }
];

export function ExportData() {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExport = async () => {
    if (!selectedOption) return;
    
    setIsExporting(true);
    
    // Simuliere Export-Prozess
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Hier würde der tatsächliche Export-Code stehen
    console.log(`Exporting ${selectedOption} data...`);
    
    setIsExporting(false);
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Daten exportieren</h3>
        <Button 
          onClick={handleExport} 
          disabled={!selectedOption || isExporting}
          className="flex items-center gap-2"
        >
          <Download className="h-4 w-4" />
          {isExporting ? "Exportiere..." : "Exportieren"}
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {exportOptions.map((option) => (
          <div 
            key={option.id}
            className={`p-4 border rounded-lg cursor-pointer transition-colors ${
              selectedOption === option.id 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50"
            }`}
            onClick={() => setSelectedOption(option.id)}
          >
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-md ${
                selectedOption === option.id 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted"
              }`}>
                {option.icon}
              </div>
              <div>
                <h4 className="font-medium">{option.name}</h4>
                <p className="text-sm text-muted-foreground">{option.description}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Format: {option.format.toUpperCase()}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
} 
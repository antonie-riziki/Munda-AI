import { Leaf, Droplets, Thermometer, Gauge } from "lucide-react";

const readings = [
  { label: "Nitrogen (N)", value: 45, unit: "mg/kg", icon: Leaf, color: "bg-leaf" },
  { label: "Phosphorus (P)", value: 32, unit: "mg/kg", icon: Leaf, color: "bg-wheat" },
  { label: "Potassium (K)", value: 180, unit: "mg/kg", icon: Leaf, color: "bg-earth" },
  { label: "Moisture", value: 42, unit: "%", icon: Droplets, color: "bg-water" },
  { label: "Temperature", value: 22, unit: "°C", icon: Thermometer, color: "bg-sky" },
  { label: "pH Level", value: 6.5, unit: "", icon: Gauge, color: "bg-primary" },
];

export function SoilReadings() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Latest Soil Readings</h3>
        <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
          Updated 2h ago
        </span>
      </div>
      
      <div className="space-y-4">
        {readings.map((reading) => {
          const Icon = reading.icon;
          const percentage = reading.label.includes("Moisture") 
            ? reading.value 
            : reading.label.includes("pH") 
            ? (reading.value / 14) * 100 
            : Math.min((reading.value / 200) * 100, 100);
          
          return (
            <div key={reading.label} className="flex items-center gap-4">
              <div className={`p-2 rounded-lg ${reading.color}/10`}>
                <Icon className={`w-4 h-4 ${reading.color.replace('bg-', 'text-')}`} />
              </div>
              <div className="flex-1">
                <div className="flex justify-between mb-1">
                  <span className="text-sm text-muted-foreground">{reading.label}</span>
                  <span className="text-sm font-semibold text-foreground">
                    {reading.value}{reading.unit}
                  </span>
                </div>
                <div className="h-2 bg-muted rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${reading.color}`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

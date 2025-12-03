import { Brain, Activity, Sprout, ChevronRight } from "lucide-react";

const predictions = [
  { label: "Soil pH", value: "6.5", confidence: 94, status: "Slightly Acidic - Good for most crops" },
  { label: "Soil Type", value: "Loamy Clay", confidence: 91, status: "High water retention, good fertility" },
  { label: "Recommended Crop", value: "Maize", confidence: 92, status: "Best match based on soil conditions" },
];

export function PredictionsSection() {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Model Predictions</h2>
        <p className="text-muted-foreground">AI-powered analysis based on your soil data</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {predictions.map((pred) => (
          <div key={pred.label} className="bg-card rounded-xl p-6 shadow-card hover:shadow-soft transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 rounded-xl bg-primary/10">
                <Brain className="w-6 h-6 text-primary" />
              </div>
              <span className="text-sm text-muted-foreground">{pred.label}</span>
            </div>
            <div className="text-3xl font-bold text-foreground mb-2">{pred.value}</div>
            <div className="flex items-center gap-2 mb-3">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full bg-leaf rounded-full" style={{ width: `${pred.confidence}%` }} />
              </div>
              <span className="text-sm font-medium text-leaf">{pred.confidence}%</span>
            </div>
            <p className="text-sm text-muted-foreground">{pred.status}</p>
          </div>
        ))}
      </div>

      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-4">Analysis Details</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Input Parameters</h4>
            <ul className="space-y-2 text-sm">
              {["Nitrogen: 45 mg/kg", "Phosphorus: 32 mg/kg", "Potassium: 180 mg/kg", "Temperature: 22°C", "Humidity: 65%", "Moisture: 42%"].map((item) => (
                <li key={item} className="flex items-center gap-2 text-foreground">
                  <Activity className="w-3 h-3 text-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-medium text-muted-foreground mb-3">Confidence Factors</h4>
            <ul className="space-y-2 text-sm">
              {[
                { factor: "Data Quality", score: 95 },
                { factor: "Sensor Calibration", score: 92 },
                { factor: "Historical Accuracy", score: 89 },
                { factor: "Model Version", score: 96 },
              ].map((item) => (
                <li key={item.factor} className="flex items-center justify-between text-foreground">
                  <span>{item.factor}</span>
                  <span className="font-medium text-leaf">{item.score}%</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

import { Sprout, TrendingUp, Calendar, ArrowRight } from "lucide-react";

const recommendedCrops = [
  { name: "Maize", confidence: 92, season: "March - August", yield: "4.5 tons/ha", profit: "KES 180,000" },
  { name: "Beans", confidence: 87, season: "March - June", yield: "1.2 tons/ha", profit: "KES 96,000" },
  { name: "Sorghum", confidence: 78, season: "April - September", yield: "2.8 tons/ha", profit: "KES 112,000" },
];

export function CropRecommendation() {
  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Recommended Crops</h3>
        <span className="text-xs text-primary font-medium">Based on your soil</span>
      </div>

      <div className="space-y-4">
        {recommendedCrops.map((crop, index) => (
          <div
            key={crop.name}
            className="group p-4 rounded-xl border border-border hover:border-primary/30 hover:bg-leaf-light/30 transition-all duration-300 cursor-pointer"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-leaf/10 flex items-center justify-center">
                  <Sprout className="w-5 h-5 text-leaf" />
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{crop.name}</h4>
                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                    <Calendar className="w-3 h-3" />
                    {crop.season}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-leaf">{crop.confidence}%</span>
                <span className="text-xs text-muted-foreground">match</span>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <div className="flex gap-4">
                <span className="text-muted-foreground">
                  Yield: <span className="text-foreground font-medium">{crop.yield}</span>
                </span>
                <span className="text-muted-foreground">
                  Est. Profit: <span className="text-leaf font-medium">{crop.profit}</span>
                </span>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
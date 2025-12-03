import { StatCard } from "../dashboard/StatCard";
import { Leaf, Droplets, Thermometer, Wind, Gauge, Activity } from "lucide-react";

interface SoilTestingSectionProps {
  subsection?: string;
}

const npkData = [
  { nutrient: "Nitrogen (N)", value: 45, optimal: "40-60", status: "optimal", desc: "Essential for leaf growth" },
  { nutrient: "Phosphorus (P)", value: 32, optimal: "25-50", status: "optimal", desc: "Root development & flowering" },
  { nutrient: "Potassium (K)", value: 180, optimal: "150-250", status: "optimal", desc: "Disease resistance & quality" },
];

export function SoilTestingSection({ subsection }: SoilTestingSectionProps) {
  if (subsection === "soil-npk") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Soil Nutrients (NPK)</h2>
          <p className="text-muted-foreground">Detailed analysis of soil macronutrients</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {npkData.map((item) => (
            <div key={item.nutrient} className="bg-card rounded-xl p-6 shadow-card">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-lg bg-leaf/10">
                  <Leaf className="w-5 h-5 text-leaf" />
                </div>
                <span className="font-semibold text-foreground">{item.nutrient}</span>
              </div>
              <div className="text-4xl font-bold text-foreground mb-2">
                {item.value} <span className="text-lg font-normal text-muted-foreground">mg/kg</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Optimal: {item.optimal}</span>
                <span className="px-2 py-1 rounded-full bg-leaf/10 text-leaf text-xs font-medium">
                  {item.status}
                </span>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">NPK Ratio Analysis</h3>
          <div className="h-8 rounded-full overflow-hidden flex bg-muted">
            <div className="bg-leaf h-full" style={{ width: "35%" }} />
            <div className="bg-wheat h-full" style={{ width: "25%" }} />
            <div className="bg-earth h-full" style={{ width: "40%" }} />
          </div>
          <div className="flex justify-between mt-3 text-sm">
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-leaf" /> Nitrogen 35%</span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-wheat" /> Phosphorus 25%</span>
            <span className="flex items-center gap-2"><div className="w-3 h-3 rounded bg-earth" /> Potassium 40%</span>
          </div>
        </div>
      </div>
    );
  }

  if (subsection === "soil-humidity" || subsection === "soil-moisture") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">
            {subsection === "soil-humidity" ? "Humidity Levels" : "Moisture Levels"}
          </h2>
          <p className="text-muted-foreground">Real-time moisture monitoring from IoT sensors</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Current Level" value={subsection === "soil-humidity" ? 65 : 42} unit="%" icon={Droplets} color="water" />
          <StatCard title="Today's Average" value={subsection === "soil-humidity" ? 62 : 40} unit="%" icon={Droplets} color="water" />
          <StatCard title="Weekly Average" value={subsection === "soil-humidity" ? 58 : 38} unit="%" icon={Droplets} color="water" />
          <StatCard title="Optimal Range" value="40-60" unit="%" icon={Gauge} color="leaf" />
        </div>

        <div className="bg-card rounded-xl p-6 shadow-card">
          <h3 className="font-semibold text-foreground mb-4">24-Hour Trend</h3>
          <div className="h-40 flex items-end justify-between gap-1">
            {Array.from({ length: 24 }, (_, i) => {
              const height = 30 + Math.random() * 50;
              return (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full bg-water/80 rounded-t transition-all hover:bg-water" style={{ height: `${height}%` }} />
                  {i % 4 === 0 && <span className="text-[10px] text-muted-foreground">{i}:00</span>}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  if (subsection === "soil-temperature") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Soil Temperature</h2>
          <p className="text-muted-foreground">Monitor soil temperature for optimal crop growth</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Current Temp" value={22} unit="°C" icon={Thermometer} color="wheat" />
          <StatCard title="Surface Temp" value={26} unit="°C" icon={Thermometer} color="soil" />
          <StatCard title="Depth 10cm" value={20} unit="°C" icon={Thermometer} color="soil" />
          <StatCard title="Depth 30cm" value={18} unit="°C" icon={Thermometer} color="water" />
        </div>
      </div>
    );
  }

  if (subsection === "soil-windspeed") {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Wind Speed</h2>
          <p className="text-muted-foreground">Current wind conditions affecting your farm</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard title="Current Speed" value={12} unit="km/h" icon={Wind} color="sky" />
          <StatCard title="Max Today" value={25} unit="km/h" icon={Wind} color="sky" />
          <StatCard title="Direction" value="NE" icon={Wind} color="primary" />
          <StatCard title="Gusts" value={18} unit="km/h" icon={Activity} color="wheat" />
        </div>
      </div>
    );
  }

  // Default soil testing overview
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Soil Testing Kit Data</h2>
        <p className="text-muted-foreground">Complete overview of your IoT soil sensor readings</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Nitrogen (N)" value={45} unit="mg/kg" icon={Leaf} color="leaf" />
        <StatCard title="Phosphorus (P)" value={32} unit="mg/kg" icon={Leaf} color="wheat" />
        <StatCard title="Potassium (K)" value={180} unit="mg/kg" icon={Leaf} color="soil" />
        <StatCard title="Humidity" value={65} unit="%" icon={Droplets} color="water" />
        <StatCard title="Temperature" value={22} unit="°C" icon={Thermometer} color="sky" />
        <StatCard title="Moisture" value={42} unit="%" icon={Droplets} color="water" />
        <StatCard title="Wind Speed" value={12} unit="km/h" icon={Wind} color="sky" />
        <StatCard title="pH Level" value={6.5} icon={Gauge} color="primary" />
      </div>
    </div>
  );
}

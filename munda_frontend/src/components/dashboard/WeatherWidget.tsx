import { Cloud, Sun, Droplets, Wind, Thermometer } from "lucide-react";

export function WeatherWidget() {
  return (
    <div className="bg-gradient-to-br from-sky/90 to-sky rounded-xl p-6 text-primary-foreground shadow-soft">
      <div className="flex items-start justify-between mb-6">
        <div>
          <p className="text-primary-foreground/80 text-sm mb-1">Today's Weather</p>
          <p className="text-sm text-primary-foreground/70">Nairobi, Kenya</p>
        </div>
        <Sun className="w-12 h-12 text-wheat" />
      </div>
      
      <div className="mb-6">
        <span className="text-5xl font-bold">24°</span>
        <span className="text-xl text-primary-foreground/80 ml-2">Partly Cloudy</span>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="flex items-center gap-2">
          <Droplets className="w-4 h-4 text-primary-foreground/70" />
          <div>
            <p className="text-xs text-primary-foreground/70">Humidity</p>
            <p className="text-sm font-semibold">65%</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Wind className="w-4 h-4 text-primary-foreground/70" />
          <div>
            <p className="text-xs text-primary-foreground/70">Wind</p>
            <p className="text-sm font-semibold">12 km/h</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Cloud className="w-4 h-4 text-primary-foreground/70" />
          <div>
            <p className="text-xs text-primary-foreground/70">Rain</p>
            <p className="text-sm font-semibold">20%</p>
          </div>
        </div>
      </div>
    </div>
  );
}

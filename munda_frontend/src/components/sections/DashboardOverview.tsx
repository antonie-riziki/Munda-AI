import { WeatherWidget } from "../dashboard/WeatherWidget";
import { SoilReadings } from "../dashboard/SoilReadings";
import { CropRecommendation } from "../dashboard/CropRecommendation";
import { QuickActions } from "../dashboard/QuickActions";
import { StatCard } from "../dashboard/StatCard";
import { Sprout, TrendingUp, Droplets, Thermometer } from "lucide-react";

interface DashboardOverviewProps {
  onNavigate: (section: string) => void;
}

export function DashboardOverview({ onNavigate }: DashboardOverviewProps) {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-1">Welcome back, John!</h2>
        <p className="text-muted-foreground">Here's what's happening on your farm today.</p>
      </div>

      {/* Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Active Crops"
          value={3}
          icon={Sprout}
          color="leaf"
          trend={{ value: 12, isPositive: true }}
        />
        <StatCard
          title="Soil Health"
          value="Good"
          icon={TrendingUp}
          color="primary"
        />
        <StatCard
          title="Moisture Level"
          value={42}
          unit="%"
          icon={Droplets}
          color="water"
        />
        <StatCard
          title="Soil Temp"
          value={22}
          unit="°C"
          icon={Thermometer}
          color="wheat"
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <WeatherWidget />
          <CropRecommendation />
        </div>
        <div className="space-y-6">
          <SoilReadings />
          <QuickActions onNavigate={onNavigate} />
        </div>
      </div>
    </div>
  );
}

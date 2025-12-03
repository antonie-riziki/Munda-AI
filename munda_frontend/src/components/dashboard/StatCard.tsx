import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  unit?: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: "primary" | "accent" | "soil" | "leaf" | "water" | "wheat" | "sky" | "earth";
}

const colorClasses = {
  primary: "bg-primary/10 text-primary",
  accent: "bg-accent/20 text-accent-foreground",
  soil: "bg-soil/10 text-soil",
  leaf: "bg-leaf/10 text-leaf",
  water: "bg-water/10 text-water",
  wheat: "bg-wheat/20 text-amber-700",
  sky: "bg-sky/10 text-sky",
  earth: "bg-earth/10 text-earth",
};

export function StatCard({ title, value, unit, icon: Icon, trend, color = "primary" }: StatCardProps) {
  return (
    <div className="bg-card rounded-xl p-5 shadow-card hover:shadow-soft transition-shadow duration-300">
      <div className="flex items-start justify-between mb-4">
        <div className={cn("p-2.5 rounded-lg", colorClasses[color])}>
          <Icon className="w-5 h-5" />
        </div>
        {trend && (
          <span
            className={cn(
              "text-xs font-medium px-2 py-1 rounded-full",
              trend.isPositive ? "bg-leaf/10 text-leaf" : "bg-destructive/10 text-destructive"
            )}
          >
            {trend.isPositive ? "+" : "-"}{Math.abs(trend.value)}%
          </span>
        )}
      </div>
      <div>
        <p className="text-muted-foreground text-sm mb-1">{title}</p>
        <p className="text-2xl font-bold text-foreground">
          {value}
          {unit && <span className="text-base font-normal text-muted-foreground ml-1">{unit}</span>}
        </p>
      </div>
    </div>
  );
}

import { Map, TrendingUp, BookOpen, FlaskConical, Sprout, CreditCard } from "lucide-react";

const actions = [
  { label: "View Land Map", icon: Map, color: "bg-leaf text-primary-foreground" },
  { label: "Market Prices", icon: TrendingUp, color: "bg-wheat text-accent-foreground" },
  { label: "Farming Guide", icon: BookOpen, color: "bg-soil text-primary-foreground" },
  { label: "Soil Analysis", icon: FlaskConical, color: "bg-water text-primary-foreground" },
  { label: "Crop Calendar", icon: Sprout, color: "bg-primary text-primary-foreground" },
  { label: "Credit Score", icon: CreditCard, color: "bg-sky text-primary-foreground" },
];

interface QuickActionsProps {
  onNavigate: (section: string) => void;
}

export function QuickActions({ onNavigate }: QuickActionsProps) {
  const sectionMap: Record<string, string> = {
    "View Land Map": "land-mapping",
    "Market Prices": "market-intelligence",
    "Farming Guide": "farming-guide",
    "Soil Analysis": "soil-testing",
    "Crop Calendar": "crop-recommendation",
    "Credit Score": "credit-score",
  };

  return (
    <div className="bg-card rounded-xl p-6 shadow-card">
      <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {actions.map((action) => {
          const Icon = action.icon;
          return (
            <button
              key={action.label}
              onClick={() => onNavigate(sectionMap[action.label])}
              className="flex flex-col items-center gap-2 p-4 rounded-xl border border-border hover:border-primary/30 hover:shadow-soft transition-all duration-300 group"
            >
              <div className={`p-3 rounded-xl ${action.color} group-hover:scale-110 transition-transform`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground transition-colors">
                {action.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

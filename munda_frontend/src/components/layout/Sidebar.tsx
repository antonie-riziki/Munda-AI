import { useState } from "react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FlaskConical,
  Leaf,
  Droplets,
  Thermometer,
  Wind,
  Brain,
  Sprout,
  BookOpen,
  Tractor,
  Bug,
  Warehouse,
  RefreshCw,
  Map,
  TrendingUp,
  CreditCard,
  User,
  ChevronDown,
  ChevronRight,
  Menu,
  X,
  Wheat,
} from "lucide-react";

interface SidebarProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { id: "dashboard", label: "Dashboard Overview", icon: LayoutDashboard },
  {
    id: "soil-testing",
    label: "Soil Testing Kit Data",
    icon: FlaskConical,
    children: [
      { id: "soil-npk", label: "Soil Nutrients (NPK)", icon: Leaf },
      { id: "soil-humidity", label: "Humidity", icon: Droplets },
      { id: "soil-temperature", label: "Temperature", icon: Thermometer },
      { id: "soil-moisture", label: "Moisture Levels", icon: Droplets },
      { id: "soil-windspeed", label: "Windspeed", icon: Wind },
    ],
  },
  { id: "predictions", label: "Model Predictions", icon: Brain },
  { id: "crop-recommendation", label: "Crop Recommendation", icon: Sprout },
  {
    id: "farming-guide",
    label: "Crop Metadata & Guide",
    icon: BookOpen,
    children: [
      { id: "land-preparation", label: "Land Preparation", icon: Tractor },
      { id: "ploughing", label: "Ploughing", icon: Tractor },
      { id: "sowing", label: "Sowing", icon: Sprout },
      { id: "nutrient-application", label: "Nutrient Application", icon: FlaskConical },
      { id: "irrigation", label: "Irrigation", icon: Droplets },
      { id: "pest-disease", label: "Pest & Disease Advisory", icon: Bug },
      { id: "harvesting", label: "Harvesting", icon: Wheat },
      { id: "storage", label: "Storage", icon: Warehouse },
      { id: "intercropping", label: "Intercropping & Rotation", icon: RefreshCw },
    ],
  },
  { id: "land-mapping", label: "Land Mapping", icon: Map },
  { id: "market-intelligence", label: "Market Intelligence", icon: TrendingUp },
  { id: "credit-score", label: "Credit Risk Score", icon: CreditCard },
  { id: "profile", label: "Profile & Settings", icon: User },
];

export function Sidebar({ activeSection, onSectionChange }: SidebarProps) {
  const [expandedItems, setExpandedItems] = useState<string[]>(["soil-testing", "farming-guide"]);
  const [mobileOpen, setMobileOpen] = useState(false);

  const toggleExpanded = (id: string) => {
    setExpandedItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const handleNavClick = (item: NavItem) => {
    if (item.children) {
      toggleExpanded(item.id);
    } else {
      onSectionChange(item.id);
      setMobileOpen(false);
    }
  };

  const renderNavItem = (item: NavItem, depth = 0) => {
    const isExpanded = expandedItems.includes(item.id);
    const isActive = activeSection === item.id;
    const hasChildren = item.children && item.children.length > 0;
    const Icon = item.icon;

    return (
      <div key={item.id}>
        <button
          onClick={() => handleNavClick(item)}
          className={cn(
            "w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium rounded-lg transition-all duration-200",
            "hover:bg-sidebar-accent",
            isActive && "bg-sidebar-accent text-sidebar-primary",
            !isActive && "text-sidebar-foreground/80 hover:text-sidebar-foreground",
            depth > 0 && "pl-10 text-xs"
          )}
        >
          <Icon className={cn("w-4 h-4 flex-shrink-0", isActive && "text-sidebar-primary")} />
          <span className="flex-1 text-left truncate">{item.label}</span>
          {hasChildren && (
            <span className="transition-transform duration-200">
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
            </span>
          )}
        </button>
        {hasChildren && isExpanded && (
          <div className="mt-1 space-y-0.5">
            {item.children!.map((child) => renderNavItem(child, depth + 1))}
          </div>
        )}
      </div>
    );
  };

  return (
    <>
      {/* Mobile Toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-sidebar rounded-lg shadow-soft text-sidebar-foreground"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Overlay */}
      {mobileOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-foreground/20 backdrop-blur-sm z-40"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-40 w-72 bg-sidebar flex flex-col transition-transform duration-300",
          "lg:translate-x-0",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="p-6 border-b border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-sidebar-primary flex items-center justify-center">
              <Sprout className="w-6 h-6 text-sidebar-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-sidebar-foreground">FarmFlow</h1>
              <p className="text-xs text-sidebar-foreground/60">Smart Agriculture</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 overflow-y-auto scrollbar-thin space-y-1">
          {navItems.map((item) => renderNavItem(item))}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-sidebar-accent/50">
            <div className="w-9 h-9 rounded-full bg-sidebar-primary flex items-center justify-center">
              <User className="w-5 h-5 text-sidebar-primary-foreground" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Farmer</p>
              <p className="text-xs text-sidebar-foreground/60">Premium Member</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}

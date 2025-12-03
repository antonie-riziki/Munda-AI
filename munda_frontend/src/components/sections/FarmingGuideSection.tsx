import { Tractor, Sprout, FlaskConical, Droplets, Bug, Wheat, Warehouse, RefreshCw, CheckCircle, Clock, AlertTriangle } from "lucide-react";

interface FarmingGuideSectionProps {
  subsection?: string;
}

const guideContent: Record<string, { title: string; icon: React.ElementType; steps: { title: string; desc: string; status: string }[] }> = {
  "land-preparation": {
    title: "Land Preparation",
    icon: Tractor,
    steps: [
      { title: "Clear the Field", desc: "Remove weeds, crop residues, and debris from the field", status: "completed" },
      { title: "Test Soil Quality", desc: "Collect samples and analyze NPK levels, pH, and moisture", status: "completed" },
      { title: "Apply Amendments", desc: "Add lime or sulfur to adjust pH if needed", status: "in-progress" },
      { title: "Level the Field", desc: "Ensure proper drainage and uniform water distribution", status: "pending" },
    ],
  },
  "ploughing": {
    title: "Ploughing Guide",
    icon: Tractor,
    steps: [
      { title: "Check Soil Moisture", desc: "Soil should be moist but not waterlogged (40-50%)", status: "completed" },
      { title: "Primary Tillage", desc: "Deep ploughing to 20-30cm depth to break compaction", status: "completed" },
      { title: "Secondary Tillage", desc: "Harrowing to break clods and create fine tilth", status: "in-progress" },
      { title: "Final Leveling", desc: "Create uniform seedbed for planting", status: "pending" },
    ],
  },
  "sowing": {
    title: "Sowing Guide",
    icon: Sprout,
    steps: [
      { title: "Seed Selection", desc: "Use certified, disease-free seeds with 85%+ germination rate", status: "completed" },
      { title: "Seed Treatment", desc: "Treat seeds with fungicide and inoculants", status: "completed" },
      { title: "Spacing", desc: "Maize: 75cm between rows, 25cm between plants", status: "in-progress" },
      { title: "Planting Depth", desc: "Plant seeds 5-7cm deep for optimal emergence", status: "pending" },
    ],
  },
  "nutrient-application": {
    title: "Nutrient Application",
    icon: FlaskConical,
    steps: [
      { title: "Basal Application", desc: "Apply DAP (18:46:0) at 50kg/acre during planting", status: "completed" },
      { title: "Top Dressing 1", desc: "Apply CAN at 50kg/acre 3 weeks after emergence", status: "in-progress" },
      { title: "Top Dressing 2", desc: "Apply CAN at 50kg/acre at knee height stage", status: "pending" },
      { title: "Foliar Feeding", desc: "Apply micronutrients if deficiency symptoms appear", status: "pending" },
    ],
  },
  "irrigation": {
    title: "Irrigation Guide",
    icon: Droplets,
    steps: [
      { title: "Water Requirement", desc: "Maize needs 500-800mm total water during growth cycle", status: "completed" },
      { title: "Critical Stages", desc: "Ensure adequate water during tasseling and grain filling", status: "in-progress" },
      { title: "Irrigation Schedule", desc: "Irrigate every 7-10 days based on soil moisture", status: "pending" },
      { title: "Drainage", desc: "Avoid waterlogging - maintain proper field drainage", status: "pending" },
    ],
  },
  "pest-disease": {
    title: "Pest & Disease Advisory",
    icon: Bug,
    steps: [
      { title: "Fall Armyworm", desc: "Scout weekly. Apply recommended insecticide if threshold exceeded", status: "warning" },
      { title: "Stem Borers", desc: "Monitor for dead hearts. Use push-pull technology", status: "completed" },
      { title: "Maize Streak Virus", desc: "Control leafhopper vectors. Remove infected plants", status: "completed" },
      { title: "Gray Leaf Spot", desc: "Rotate crops. Apply fungicide preventively", status: "in-progress" },
    ],
  },
  "harvesting": {
    title: "Harvesting Guide",
    icon: Wheat,
    steps: [
      { title: "Maturity Signs", desc: "Black layer formation at grain base, moisture 20-25%", status: "pending" },
      { title: "Timing", desc: "Harvest when grain moisture drops to 13-14%", status: "pending" },
      { title: "Method", desc: "Manual or mechanical harvesting based on scale", status: "pending" },
      { title: "Post-Harvest", desc: "Dry to 12-13% moisture before storage", status: "pending" },
    ],
  },
  "storage": {
    title: "Storage Guide",
    icon: Warehouse,
    steps: [
      { title: "Drying", desc: "Ensure grain moisture is below 13% before storage", status: "pending" },
      { title: "Storage Facility", desc: "Clean, dry, and well-ventilated storage space", status: "pending" },
      { title: "Pest Control", desc: "Use hermetic bags or apply storage protectants", status: "pending" },
      { title: "Monitoring", desc: "Check regularly for pests, mold, and temperature", status: "pending" },
    ],
  },
  "intercropping": {
    title: "Intercropping & Rotation",
    icon: RefreshCw,
    steps: [
      { title: "Companion Crops", desc: "Beans fix nitrogen; plant between maize rows", status: "completed" },
      { title: "Rotation Plan", desc: "Year 1: Maize → Year 2: Beans → Year 3: Sorghum", status: "in-progress" },
      { title: "Cover Crops", desc: "Plant legumes during off-season to improve soil", status: "pending" },
      { title: "Benefits", desc: "Reduces pests, improves soil, diversifies income", status: "pending" },
    ],
  },
};

const statusIcons = {
  completed: { icon: CheckCircle, color: "text-leaf bg-leaf/10" },
  "in-progress": { icon: Clock, color: "text-wheat bg-wheat/10" },
  pending: { icon: Clock, color: "text-muted-foreground bg-muted" },
  warning: { icon: AlertTriangle, color: "text-destructive bg-destructive/10" },
};

export function FarmingGuideSection({ subsection }: FarmingGuideSectionProps) {
  const content = subsection ? guideContent[subsection] : null;

  if (!content) {
    return (
      <div className="space-y-6 animate-fade-in-up">
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Crop Metadata & Farming Guide</h2>
          <p className="text-muted-foreground">Complete guide for your recommended crop: Maize</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {Object.entries(guideContent).map(([key, guide]) => {
            const Icon = guide.icon;
            const completedCount = guide.steps.filter(s => s.status === "completed").length;
            return (
              <div key={key} className="bg-card rounded-xl p-5 shadow-card hover:shadow-soft transition-all cursor-pointer group">
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2.5 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">{guide.title}</h3>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-leaf rounded-full transition-all" style={{ width: `${(completedCount / guide.steps.length) * 100}%` }} />
                  </div>
                  <span className="text-xs text-muted-foreground">{completedCount}/{guide.steps.length}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  const Icon = content.icon;
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-xl bg-primary/10">
          <Icon className="w-8 h-8 text-primary" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-foreground">{content.title}</h2>
          <p className="text-muted-foreground">Step-by-step guide for your maize crop</p>
        </div>
      </div>

      <div className="space-y-4">
        {content.steps.map((step, index) => {
          const status = statusIcons[step.status as keyof typeof statusIcons];
          const StatusIcon = status.icon;
          return (
            <div key={index} className="bg-card rounded-xl p-5 shadow-card flex items-start gap-4">
              <div className={`p-2 rounded-lg ${status.color}`}>
                <StatusIcon className="w-5 h-5" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-foreground mb-1">{step.title}</h4>
                <p className="text-sm text-muted-foreground">{step.desc}</p>
              </div>
              <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted text-muted-foreground capitalize">
                {step.status.replace("-", " ")}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

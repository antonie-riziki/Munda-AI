import { useState } from "react";
import { Sidebar } from "@/components/layout/Sidebar";
import { DashboardOverview } from "@/components/sections/DashboardOverview";
import { SoilTestingSection } from "@/components/sections/SoilTestingSection";
import { PredictionsSection } from "@/components/sections/PredictionsSection";
import { CropRecommendation } from "@/components/dashboard/CropRecommendation";
import { FarmingGuideSection } from "@/components/sections/FarmingGuideSection";
import { LandMappingSection } from "@/components/sections/LandMappingSection";
import { MarketIntelligenceSection } from "@/components/sections/MarketIntelligenceSection";
import { CreditScoreSection } from "@/components/sections/CreditScoreSection";
import { ProfileSection } from "@/components/sections/ProfileSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("dashboard");

  const renderContent = () => {
    // Handle soil testing subsections
    if (activeSection.startsWith("soil-")) {
      return <SoilTestingSection subsection={activeSection} />;
    }

    // Handle farming guide subsections
    const farmingGuideSections = [
      "land-preparation", "ploughing", "sowing", "nutrient-application",
      "irrigation", "pest-disease", "harvesting", "storage", "intercropping"
    ];
    if (farmingGuideSections.includes(activeSection)) {
      return <FarmingGuideSection subsection={activeSection} />;
    }

    switch (activeSection) {
      case "dashboard":
        return <DashboardOverview onNavigate={setActiveSection} />;
      case "soil-testing":
        return <SoilTestingSection />;
      case "predictions":
        return <PredictionsSection />;
      case "crop-recommendation":
        return (
          <div className="space-y-6 animate-fade-in-up">
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">Crop Recommendations</h2>
              <p className="text-muted-foreground">AI-powered crop suggestions based on your soil analysis</p>
            </div>
            <CropRecommendation />
          </div>
        );
      case "farming-guide":
        return <FarmingGuideSection />;
      case "land-mapping":
        return <LandMappingSection />;
      case "market-intelligence":
        return <MarketIntelligenceSection />;
      case "credit-score":
        return <CreditScoreSection />;
      case "profile":
        return <ProfileSection />;
      default:
        return <DashboardOverview onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-background flex">
      <Sidebar activeSection={activeSection} onSectionChange={setActiveSection} />
      <main className="flex-1 lg:ml-0 min-h-screen">
        <div className="p-4 lg:p-8 pt-16 lg:pt-8 max-w-7xl mx-auto">
          {renderContent()}
        </div>
      </main>
    </div>
  );
};

export default Index;

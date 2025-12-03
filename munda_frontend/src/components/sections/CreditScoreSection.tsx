import { CreditCard, CheckCircle, AlertTriangle, Building, Shield, Percent, TrendingUp } from "lucide-react";

const creditInputs = [
  { label: "IoT Sensor Data Quality", value: "95%", impact: "positive" },
  { label: "Asset Value", value: "KES 850,000", impact: "positive" },
  { label: "Previous Loans (Formal)", value: "2 loans - Repaid", impact: "positive" },
  { label: "Previous Loans (Informal)", value: "1 - Pending", impact: "neutral" },
  { label: "Land Acreage", value: "5.2 ha", impact: "positive" },
  { label: "Family Size", value: "6 members", impact: "neutral" },
  { label: "Yield History (3 years)", value: "4.2 tons/ha avg", impact: "positive" },
];

const qualifiedProviders = [
  { name: "Kenya Commercial Bank", type: "Bank", maxLoan: "KES 500,000", rate: "14%", term: "24 months", status: "Pre-approved" },
  { name: "Equity Bank", type: "Bank", maxLoan: "KES 450,000", rate: "15%", term: "18 months", status: "Eligible" },
  { name: "Apollo Agriculture", type: "Agri-Finance", maxLoan: "KES 200,000", rate: "12%", term: "12 months", status: "Pre-approved" },
  { name: "APA Insurance", type: "Insurance", maxLoan: "Crop Insurance", rate: "5% premium", term: "Season", status: "Eligible" },
  { name: "ACRE Africa", type: "Insurance", maxLoan: "Weather Index", rate: "3% premium", term: "Season", status: "Pre-approved" },
];

export function CreditScoreSection() {
  const creditScore = 725;
  const maxScore = 850;
  const percentage = (creditScore / maxScore) * 100;

  const getScoreColor = (score: number) => {
    if (score >= 700) return "text-leaf";
    if (score >= 600) return "text-wheat";
    return "text-destructive";
  };

  const getScoreLabel = (score: number) => {
    if (score >= 750) return "Excellent";
    if (score >= 700) return "Good";
    if (score >= 650) return "Fair";
    return "Needs Improvement";
  };

  return (
    <div className="space-y-6 animate-fade-in-up">
      <div>
        <h2 className="text-2xl font-bold text-foreground mb-2">Credit Risk Score</h2>
        <p className="text-muted-foreground">Your agricultural creditworthiness assessment</p>
      </div>

      {/* Score Card */}
      <div className="bg-card rounded-xl p-8 shadow-card">
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Score Circle */}
          <div className="relative w-48 h-48">
            <svg className="w-full h-full transform -rotate-90">
              <circle cx="96" cy="96" r="88" fill="none" stroke="hsl(var(--muted))" strokeWidth="12" />
              <circle
                cx="96"
                cy="96"
                r="88"
                fill="none"
                stroke="hsl(var(--leaf-green))"
                strokeWidth="12"
                strokeLinecap="round"
                strokeDasharray={`${percentage * 5.53} 553`}
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className={`text-5xl font-bold ${getScoreColor(creditScore)}`}>{creditScore}</span>
              <span className="text-sm text-muted-foreground">out of {maxScore}</span>
            </div>
          </div>

          {/* Score Details */}
          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
              <span className={`text-2xl font-bold ${getScoreColor(creditScore)}`}>{getScoreLabel(creditScore)}</span>
              <CheckCircle className="w-6 h-6 text-leaf" />
            </div>
            <p className="text-muted-foreground mb-4">
              Your credit score qualifies you for agricultural loans and insurance products from multiple providers.
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-3">
              <span className="px-3 py-1 rounded-full bg-leaf/10 text-leaf text-sm font-medium">5 Providers Available</span>
              <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium">3 Pre-approved</span>
            </div>
          </div>
        </div>
      </div>

      {/* Input Factors */}
      <div className="bg-card rounded-xl p-6 shadow-card">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Score Input Factors
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {creditInputs.map((input) => (
            <div key={input.label} className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-sm text-muted-foreground">{input.label}</span>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">{input.value}</span>
                {input.impact === "positive" && <CheckCircle className="w-4 h-4 text-leaf" />}
                {input.impact === "neutral" && <AlertTriangle className="w-4 h-4 text-wheat" />}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Qualified Providers */}
      <div className="bg-card rounded-xl shadow-card overflow-hidden">
        <div className="p-6 border-b border-border">
          <h3 className="font-semibold text-foreground flex items-center gap-2">
            <Building className="w-5 h-5 text-primary" />
            Qualified Banks & Insurance Providers
          </h3>
        </div>
        <div className="divide-y divide-border">
          {qualifiedProviders.map((provider) => (
            <div key={provider.name} className="p-4 hover:bg-muted/30 transition-colors">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    {provider.type === "Insurance" ? (
                      <Shield className="w-6 h-6 text-primary" />
                    ) : (
                      <Building className="w-6 h-6 text-primary" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">{provider.name}</h4>
                    <p className="text-sm text-muted-foreground">{provider.type}</p>
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center gap-1">
                    <CreditCard className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground font-medium">{provider.maxLoan}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Percent className="w-4 h-4 text-muted-foreground" />
                    <span className="text-foreground">{provider.rate}</span>
                  </div>
                  <span className="text-muted-foreground">{provider.term}</span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    provider.status === "Pre-approved" ? "bg-leaf/10 text-leaf" : "bg-primary/10 text-primary"
                  }`}>
                    {provider.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

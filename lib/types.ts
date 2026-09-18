export type ExposureLevel =
  | "Low"
  | "Medium"
  | "Elevated"
  | "High"
  | "Variable"
  | "Constrained";

export type PolicyStatus =
  | "Effective"
  | "Approved"
  | "Pending"
  | "Published"
  | "Program intake paused";

export type RecommendedAction =
  | "Monitor"
  | "Engage"
  | "Analyze"
  | "Escalate"
  | "No action";

export type Team =
  | "Energy"
  | "Site Selection"
  | "Construction"
  | "Finance"
  | "Sustainability"
  | "Legal"
  | "Public Policy"
  | "Operations";

export type Exposure = {
  powerAvailability: ExposureLevel;
  utilityCost: ExposureLevel;
  interconnectionTimeline: ExposureLevel;
  siteSelection: ExposureLevel;
  renewableRequirements: ExposureLevel;
  capex: ExposureLevel;
  opex: ExposureLevel;
  regulatoryUncertainty: ExposureLevel;
};

export type PolicyRecord = {
  id: string;
  title: string;
  jurisdiction: string;
  region: string;
  policyType: string;
  status: PolicyStatus;
  effectiveDate?: string;
  agency: string;
  issueAreas: string[];
  summary: string;
  whyItMatters: string;
  exposure: Exposure;
  teams: Team[];
  recommendedAction: RecommendedAction;
  owner: Team;
  dueDate?: string;
  sourceConfidence: "High" | "Medium";
  lastReviewed: string;
  evidence: string[];
  source: {
    label: string;
    url: string;
    publishedDate?: string;
    sourceType: "Primary";
  };
};

export type MarketProfile = {
  market: string;
  powerAvailability: ExposureLevel;
  interconnection: ExposureLevel;
  tariffRisk: ExposureLevel;
  dataCenterPolicy: "Active" | "Emerging" | "General framework";
  cleanEnergy: ExposureLevel;
  overallExposure: ExposureLevel;
  basis: string;
};

export type PolicyStatus =
  | "Effective"
  | "Approved"
  | "Pending"
  | "Published"
  | "Program intake paused"
  | "Open proceeding";

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

export type BusinessImpact = {
  powerAvailability: string;
  utilityCost: string;
  interconnectionTimeline: string;
  siteSelection: string;
  renewableRequirements: string;
  capex: string;
  opex: string;
  regulatoryUncertainty: string;
};

export type PolicyClaim = {
  id: string;
  text: string;
  sourceLabel: string;
  sourceUrl: string;
};

export type PolicyVersion = {
  label: string;
  date: string;
  source: {
    label: string;
    url: string;
  };
  changes: string[];
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
  businessImpact: BusinessImpact;
  teams: Team[];
  recommendedAction: RecommendedAction;
  owner: Team;
  dueDate?: string;
  sourceConfidence: "High" | "Medium";
  lastReviewed: string;
  evidence: string[];
  claims: PolicyClaim[];
  versionHistory?: PolicyVersion[];
  source: {
    label: string;
    url: string;
    publishedDate?: string;
    sourceType: "Primary";
  };
};

export type MarketProfile = {
  market: string;
  trackedDevelopment: string;
  currentStatus: string;
  powerSignal: string;
  interconnectionSignal: string;
  tariffCostSignal: string;
  cleanEnergySignal: string;
  sourceBasis: string;
};

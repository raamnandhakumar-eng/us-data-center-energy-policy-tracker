import type { PolicyRecord } from "@/lib/types";

export function buildDeterministicMemo(policy: PolicyRecord) {
  const impactLines = [
    ["Power availability", policy.businessImpact.powerAvailability],
    ["Utility cost", policy.businessImpact.utilityCost],
    ["Interconnection timeline", policy.businessImpact.interconnectionTimeline],
    ["Site selection", policy.businessImpact.siteSelection],
    ["Renewable / clean-energy requirements", policy.businessImpact.renewableRequirements],
    ["CapEx", policy.businessImpact.capex],
    ["OpEx", policy.businessImpact.opex],
    ["Regulatory uncertainty", policy.businessImpact.regulatoryUncertainty],
  ]
    .map(([label, value]) => `${label}: ${value}`)
    .join("\n");

  return [
    `WHAT CHANGED\n${policy.summary}`,
    `WHY IT MATTERS\n${policy.whyItMatters}`,
    `BUSINESS EXPOSURE\n${impactLines}`,
    `TEAMS AFFECTED\n${policy.teams.join(", ")}`,
    `RECOMMENDED NEXT STEP\n${policy.recommendedAction} — owner: ${policy.owner}${policy.dueDate ? `; due: ${policy.dueDate}` : ""}.`,
    `SOURCE CONFIDENCE\n${policy.sourceConfidence}. Primary source: ${policy.source.label}`,
    "HUMAN REVIEW\nRequired before distribution. Confirm the source is still current and validate all business-specific assumptions.",
  ].join("\n\n");
}

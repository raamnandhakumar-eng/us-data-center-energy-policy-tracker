import type { PolicyRecord } from "@/lib/types";

export function buildDeterministicMemo(policy: PolicyRecord) {
  const exposurePairs = [
    ["Power availability", policy.exposure.powerAvailability],
    ["Utility cost", policy.exposure.utilityCost],
    ["Interconnection timeline", policy.exposure.interconnectionTimeline],
    ["Site selection", policy.exposure.siteSelection],
    ["Renewable requirements", policy.exposure.renewableRequirements],
    ["CapEx", policy.exposure.capex],
    ["OpEx", policy.exposure.opex],
    ["Regulatory uncertainty", policy.exposure.regulatoryUncertainty],
  ];

  const materialExposure = exposurePairs
    .filter(([, level]) => ["Elevated", "High", "Variable", "Constrained"].includes(level))
    .map(([label, level]) => `${label}: ${level}`)
    .join("; ");

  return [
    `WHAT CHANGED\n${policy.summary}`,
    `WHY IT MATTERS\n${policy.whyItMatters}`,
    `BUSINESS EXPOSURE\n${materialExposure || "No elevated exposure flagged in the current analytical record."}`,
    `TEAMS AFFECTED\n${policy.teams.join(", ")}`,
    `RECOMMENDED NEXT STEP\n${policy.recommendedAction} — owner: ${policy.owner}${policy.dueDate ? `; due: ${policy.dueDate}` : ""}.`,
    `SOURCE CONFIDENCE\n${policy.sourceConfidence}. Primary source: ${policy.source.label}`,
    "HUMAN REVIEW\nRequired before distribution. Confirm the source is still current and validate any business-specific assumptions.",
  ].join("\n\n");
}

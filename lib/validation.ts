import type { PolicyRecord } from "@/lib/types";

export type ClaimBinding = {
  claimId: string;
  text: string;
  sourceLabel: string;
  sourceUrl: string;
  status: "Bound to retained primary source" | "Needs human verification";
};

export function validateClaimBindings(policy: PolicyRecord): ClaimBinding[] {
  const retainedPrimaryUrls = new Set([
    policy.source.url,
    ...(policy.versionHistory ?? []).map((version) => version.source.url),
  ]);

  return policy.claims.map((claim) => ({
    claimId: claim.id,
    text: claim.text,
    sourceLabel: claim.sourceLabel,
    sourceUrl: claim.sourceUrl,
    status:
      claim.sourceUrl.startsWith("https://") && retainedPrimaryUrls.has(claim.sourceUrl)
        ? "Bound to retained primary source"
        : "Needs human verification",
  }));
}

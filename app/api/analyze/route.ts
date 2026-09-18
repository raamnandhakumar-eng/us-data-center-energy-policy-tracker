import OpenAI from "openai";
import { buildDeterministicMemo } from "@/lib/analysis";
import { policies } from "@/lib/policies";
import { validateClaimBindings } from "@/lib/validation";

export const runtime = "nodejs";

export async function POST(request: Request) {
  const body = (await request.json()) as { id?: string };
  const policy = policies.find((item) => item.id === body.id);

  if (!policy) {
    return Response.json({ error: "Policy record not found." }, { status: 404 });
  }

  const fallback = buildDeterministicMemo(policy);
  const claimBindings = validateClaimBindings(policy);
  const citations = Array.from(
    new Set([policy.source.url, ...claimBindings.map((claim) => claim.sourceUrl)])
  );

  if (!process.env.OPENAI_API_KEY) {
    return Response.json({
      memoText: fallback,
      citations,
      claimBindings,
      humanReviewRequired: true,
      mode: "source-grounded baseline",
    });
  }

  try {
    const client = new OpenAI();
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5.5",
      instructions: [
        "You are a neutral infrastructure policy analyst.",
        "Use only the policy record, claims, and evidence supplied by the user.",
        "Do not infer political motives, endorse or oppose a policy, rank jurisdictions, or invent facts.",
        "Do not convert business-impact descriptions into scores or rankings.",
        "When supplied evidence does not support a claim, state that the point requires further verification.",
        "Produce a concise leadership memo with exactly these headings:",
        "WHAT CHANGED",
        "WHY IT MATTERS",
        "BUSINESS EXPOSURE",
        "TEAMS AFFECTED",
        "RECOMMENDED NEXT STEP",
        "SOURCE CONFIDENCE",
        "HUMAN REVIEW",
        "The HUMAN REVIEW section must say that a person must verify the source and business-specific assumptions before distribution.",
      ].join("\n"),
      input: JSON.stringify({
        policy: {
          title: policy.title,
          jurisdiction: policy.jurisdiction,
          agency: policy.agency,
          status: policy.status,
          effectiveDate: policy.effectiveDate,
          summary: policy.summary,
          whyItMatters: policy.whyItMatters,
          evidence: policy.evidence,
          claims: policy.claims,
          teams: policy.teams,
          recommendedAction: policy.recommendedAction,
          owner: policy.owner,
          businessImpact: policy.businessImpact,
          source: policy.source,
        },
      }),
    });

    return Response.json({
      memoText: response.output_text || fallback,
      citations,
      claimBindings,
      humanReviewRequired: true,
      mode: "AI draft from supplied evidence",
    });
  } catch {
    return Response.json({
      memoText: fallback,
      citations,
      claimBindings,
      humanReviewRequired: true,
      mode: "source-grounded baseline",
      warning: "AI call failed; deterministic memo returned.",
    });
  }
}

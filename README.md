# GridPolicy

**U.S. Data Center Energy & Infrastructure Policy Intelligence Tracker**

GridPolicy is an independent portfolio project that converts federal and state energy-policy developments into structured, source-grounded business intelligence for data center infrastructure decisions.

It is designed around one operating question:

> What changed, why does it matter to infrastructure development, which functions are affected, and what should be reviewed next?

## Phase 2 MVP

The current build includes:

- 15 real federal and state policy / regulatory records.
- 13 state-market comparison rows.
- Federal, state, PUC/PSC, tariff, incentive, permitting, transmission, and interconnection coverage.
- Factual business-impact descriptions for:
  - power availability
  - utility cost
  - interconnection timeline
  - site selection
  - renewable / clean-energy requirements
  - CapEx
  - OpEx
  - regulatory uncertainty
- Cross-functional routing across Energy, Site Selection, Construction, Finance, Sustainability, Legal, Public Policy, and Operations.
- Action ownership using Monitor, Engage, Analyze, Escalate, or No action.
- Primary-source evidence and last-reviewed dates.
- Claim-level source binding.
- Policy-version comparison.
- Leadership memo generation.
- Downloadable text memos.
- Optional AI-assisted drafting with explicit source and human-review controls.

## Current source set

1. FERC Order No. 2023 generator interconnection reform.
2. FERC Order Nos. 1920 / 1920-A / 1920-B transmission planning and cost allocation.
3. Virginia JLARC Data Centers in Virginia study.
4. Georgia PSC large-load / data center power-usage terms.
5. AEP Ohio data center tariff approved by PUCO.
6. Texas SB 6 large-load planning and interconnection framework.
7. Oregon HB 3546 large energy use facility rate class.
8. Illinois data center incentive program intake change.
9. Pennsylvania GRID requirements for data center development.
10. Arizona APS Extra High Load Factor rate case.
11. California CPUC interim PG&E Electric Rule 30.
12. Washington UTC Docket UE-260162 on emerging large electric loads.
13. Wisconsin We Energies Very Large Customer tariff.
14. Michigan Consumers Energy data center / very-large-customer service terms.
15. Florida Power & Light LLCS-1 / LLCS-2 tariffs.

Every record links back to a primary government, regulator, legislature, or utility-regulatory source.

## Comparative view

The dashboard intentionally does **not** rank jurisdictions or assign policy scores.

Instead, each market row describes the currently tracked source record using factual fields:

- tracked development
- current status
- power signal
- interconnection signal
- tariff / cost signal
- clean-energy signal

This keeps the tool useful for infrastructure diligence without turning policy monitoring into a political rating system.

## Policy version comparison

The data model supports retained versions of proposals, tariffs, and decisions. Current examples include:

- PG&E Electric Rule 30 proposal → CPUC interim approval.
- FPL LLCS original filing → approved settlement terms.

The UI shows changes side by side with the source for each version.

## Claim-level citation binding

Each material structured claim stores:

```
claim id
claim text
source label
source URL
```

The application checks whether the claim points to the record's retained primary source or a retained primary source in its version history.

This is a **source-binding check**, not an automated legal or factual determination. Human review remains required.

## AI policy analyst

The optional AI analyst can:

- draft a policy summary
- restate dates and agencies from the record
- draft a business-impact memo
- identify affected functions
- compare retained policy versions
- surface missing evidence

It must:

- use only the supplied structured record and retained evidence
- preserve primary-source citations
- avoid unsupported claims
- remain neutral on policy merits
- avoid policy or jurisdiction ranking
- require human review before distribution

Without an API key, GridPolicy uses a deterministic memo baseline, so the product remains usable.

See [docs/AI_POLICY_ANALYST.md](docs/AI_POLICY_ANALYST.md).

## Run locally

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

For AI-assisted memo drafting:

```bash
cp .env.example .env.local
# add OPENAI_API_KEY
npm run dev
```

## Near-term roadmap

- Automated primary-source monitoring.
- Source-document hashing and archived snapshots.
- Full-text claim validation against cited passages.
- Saved watchlists and persistent action owners / due dates.
- Reviewer approvals and audit trail.
- PDF executive brief export.
- 6–8 page methodology and comparative policy brief.

## Stack

- Next.js App Router
- TypeScript
- React
- Optional OpenAI Responses API integration
- Primary-source policy data
- GitHub Actions CI

## Disclaimer

GridPolicy is a research and decision-support prototype. It is not legal advice, regulatory advice, or a substitute for review of controlling statutes, orders, tariffs, dockets, permits, and counsel.

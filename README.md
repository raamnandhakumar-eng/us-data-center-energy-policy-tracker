# GridPolicy

**U.S. Data Center Energy & Infrastructure Policy Intelligence Tracker**

GridPolicy is an independent portfolio project that converts federal and state energy-policy developments into structured, source-grounded business intelligence for data center infrastructure decisions.

It is designed around one operating question:

> What changed, why does it matter to infrastructure development, which functions are exposed, and what should be reviewed next?

## MVP

The first build includes:

- 10 real policy and regulatory records.
- Federal, state, PUC/PSC, tariff, incentive, permitting, transmission, and interconnection coverage.
- Eight-state market comparison.
- Structured business-impact fields for:
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
- Leadership memo generation.
- Optional AI-assisted drafting with explicit source and human-review controls.

## Current source set

The MVP tracks these primary-source cases:

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

Every record links back to a primary government, regulator, legislature, or utility source.

## Exposure indicators

The dashboard uses qualitative exposure indicators such as Low, Medium, Elevated, High, Variable, and Constrained.

These labels describe the **potential business relevance of the tracked policy record** to development variables. They do not rate the merits of a law, regulator, political actor, or jurisdiction.

Examples:

- **High utility-cost exposure** means the record directly changes, or may materially change, large-load cost responsibility or tariff economics.
- **Elevated interconnection exposure** means the record can affect study, queue, energization, or grid-development assumptions.
- **Variable power availability** means availability is highly project-, utility-, or location-dependent under the tracked framework.

## AI policy analyst

The optional AI analyst is deliberately constrained.

It can:

- draft a policy summary
- restate dates and agencies from the record
- draft a business-impact memo
- identify affected functions
- surface missing evidence

It must:

- use only the supplied structured record and retained evidence
- preserve the primary-source citation
- avoid unsupported claims
- remain neutral on policy merits
- require human review before distribution

Without an API key, GridPolicy uses a deterministic memo baseline, so the product remains fully usable.

See [docs/AI_POLICY_ANALYST.md](docs/AI_POLICY_ANALYST.md).

## Data model

The record schema includes:

```
jurisdiction
policy type
status
effective / milestone date
responsible agency
infrastructure issue
business exposure
teams affected
recommended action
owner
due date
supporting evidence
primary source
source confidence
last reviewed date
```

See [data/policy-record.schema.json](data/policy-record.schema.json).

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

- Add 5 additional state / utility cases.
- Add policy version history and redline comparison.
- Add ingestion adapters for legislation, PUC dockets, tariffs, and FERC updates.
- Add claim-level citation checking.
- Add saved watchlists and owner due dates.
- Add downloadable one-page executive briefs.
- Add change alerts when a tracked source is updated.
- Add a 6–8 page methodology and comparative policy brief.

## Stack

- Next.js App Router
- TypeScript
- React
- Optional OpenAI Responses API integration
- Primary-source policy data

## Disclaimer

GridPolicy is a research and decision-support prototype. It is not legal advice, regulatory advice, or a substitute for review of controlling statutes, orders, tariffs, dockets, permits, and counsel.

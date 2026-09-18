# AI Policy Analyst

GridPolicy treats AI as a drafting layer inside a controlled policy workflow, not as an authority.

## Workflow

1. A human or ingestion process creates a structured policy record.
2. The record retains the primary-source URL, review date, and evidence bullets.
3. The analyst route receives only the selected structured record.
4. The model is instructed to use only supplied evidence.
5. The output follows a fixed leadership-memo format.
6. The UI always marks the memo as requiring human review.
7. The primary-source citation remains visible beside the draft.

## Allowed AI tasks

- Summarize a policy record.
- Extract or restate dates and agencies already present in the record.
- Draft a first-pass business-impact memo.
- Identify affected internal functions from the structured fields.
- Compare structured versions once version history is added.
- Flag missing evidence or areas requiring verification.

## Disallowed behavior

- Invent facts absent from retained evidence.
- Treat model output as a legal interpretation.
- Infer political motives.
- Endorse or oppose a policy.
- Remove the source citation or human-review requirement.

## Runtime behavior

If `OPENAI_API_KEY` is configured, `POST /api/analyze` produces an AI-assisted draft from the selected record.

If no API key is configured, the same endpoint returns a deterministic memo generated from the structured record. This keeps the application functional and testable without an external model.

## Next controls to add

- Claim-level citation spans.
- Source-document hashing.
- Version-to-version redline comparison.
- Reviewer identity and approval timestamps.
- Prompt/evaluation test set.
- Unsupported-claim detector.
- Audit log for generated memos.

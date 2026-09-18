# AI Policy Analyst

GridPolicy treats AI as a drafting layer inside a controlled policy workflow, not as an authority.

## Workflow

1. A human or ingestion process creates a structured policy record.
2. The record retains the primary-source URL, review date, evidence bullets, and claim-level source bindings.
3. The analyst route receives only the selected structured record.
4. The model is instructed to use only supplied evidence.
5. The output follows a fixed leadership-memo format.
6. The UI always marks the memo as requiring human review.
7. The primary-source citation remains visible beside the draft.
8. A deterministic claim-binding check verifies that structured claims point to retained primary-source records.

## Allowed AI tasks

- Summarize a policy record.
- Restate dates and agencies already present in the record.
- Draft a first-pass business-impact memo.
- Identify affected internal functions from structured fields.
- Compare retained versions of a proposal or tariff.
- Flag missing evidence or areas requiring verification.

## Disallowed behavior

- Invent facts absent from retained evidence.
- Treat model output as a legal interpretation.
- Infer political motives.
- Endorse or oppose a policy.
- Rank policies, jurisdictions, or political actors.
- Remove source citations or the human-review requirement.

## Claim-level source control

GridPolicy uses a citation-binding layer before AI drafting. Each structured claim includes a source URL. The application checks whether that URL is one of the retained primary sources for the record or its version history.

This verifies source binding, not substantive truth. A human still needs to confirm that the cited source supports the exact claim and remains current.

## Version comparison

Records can retain multiple primary-source versions. The UI shows the earlier and later terms side by side. The initial examples are:

- California PG&E Electric Rule 30 proposal versus CPUC interim approval.
- Florida FPL LLCS original filing versus approved settlement terms.

## Runtime behavior

If `OPENAI_API_KEY` is configured, `POST /api/analyze` produces an AI-assisted draft from the selected record.

If no API key is configured, the same endpoint returns a deterministic memo generated from the structured record. This keeps the application functional and testable without an external model.

## Next controls

- Source-document hashing.
- Full-text extraction with cited passages.
- Reviewer identity and approval timestamps.
- Prompt/evaluation test set.
- Unsupported-claim detector using retrieved source passages.
- Audit log for generated memos.

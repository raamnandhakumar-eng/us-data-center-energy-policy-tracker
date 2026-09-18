"use client";

import { useMemo, useState } from "react";
import { buildDeterministicMemo } from "@/lib/analysis";
import { validateClaimBindings } from "@/lib/validation";
import type { MarketProfile, PolicyRecord } from "@/lib/types";

type Props = {
  policies: PolicyRecord[];
  markets: MarketProfile[];
};

function formatDate(value?: string) {
  if (!value) return "Not specified";
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return value;
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${value}T00:00:00Z`));
}

export function GridPolicyDashboard({ policies, markets }: Props) {
  const [query, setQuery] = useState("");
  const [jurisdiction, setJurisdiction] = useState("All");
  const [status, setStatus] = useState("All");
  const [selectedId, setSelectedId] = useState(policies[0]?.id ?? "");
  const [memoText, setMemoText] = useState("");
  const [memoMode, setMemoMode] = useState("");
  const [memoLoading, setMemoLoading] = useState(false);

  const jurisdictions = useMemo(
    () => ["All", ...Array.from(new Set(policies.map((p) => p.jurisdiction)))],
    [policies]
  );

  const statuses = useMemo(
    () => ["All", ...Array.from(new Set(policies.map((p) => p.status)))],
    [policies]
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return policies.filter((policy) => {
      const matchesQuery =
        !normalized ||
        [
          policy.title,
          policy.jurisdiction,
          policy.policyType,
          policy.agency,
          ...policy.issueAreas,
        ]
          .join(" ")
          .toLowerCase()
          .includes(normalized);

      return (
        matchesQuery &&
        (jurisdiction === "All" || policy.jurisdiction === jurisdiction) &&
        (status === "All" || policy.status === status)
      );
    });
  }, [jurisdiction, policies, query, status]);

  const selected =
    policies.find((policy) => policy.id === selectedId) ?? policies[0];

  const actionCount = policies.filter(
    (policy) => !["Monitor", "No action"].includes(policy.recommendedAction)
  ).length;
  const openCount = policies.filter((policy) =>
    ["Pending", "Open proceeding"].includes(policy.status)
  ).length;

  const claimBindings = useMemo(
    () => (selected ? validateClaimBindings(selected) : []),
    [selected]
  );

  async function generateMemo() {
    if (!selected) return;
    setMemoLoading(true);
    setMemoText("");
    setMemoMode("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: selected.id }),
      });
      const data = (await response.json()) as {
        memoText?: string;
        mode?: string;
      };
      setMemoText(data.memoText || buildDeterministicMemo(selected));
      setMemoMode(data.mode || "source-grounded baseline");
    } catch {
      setMemoText(buildDeterministicMemo(selected));
      setMemoMode("source-grounded baseline");
    } finally {
      setMemoLoading(false);
    }
  }

  function downloadMemo() {
    if (!selected) return;
    const text = memoText || buildDeterministicMemo(selected);
    const blob = new Blob(
      [
        `GRIDPOLICY LEADERSHIP MEMO\n${selected.title}\n${selected.jurisdiction}\n\n${text}\n\nPRIMARY SOURCE\n${selected.source.label}\n${selected.source.url}\n`,
      ],
      { type: "text/plain;charset=utf-8" }
    );
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `gridpolicy-${selected.id}-memo.txt`;
    anchor.click();
    URL.revokeObjectURL(url);
  }

  if (!selected) return null;

  const versions = selected.versionHistory ?? [];

  return (
    <main>
      <header className="topbar">
        <div>
          <div className="eyebrow">U.S. DATA CENTER ENERGY & INFRASTRUCTURE</div>
          <h1>GridPolicy</h1>
          <p className="subtitle">
            Source-grounded policy intelligence translated into power, cost,
            interconnection, siting, sustainability, and development implications.
          </p>
        </div>
        <div className="review-badge">
          <span className="status-dot" />
          Reviewed {formatDate("2026-09-18")}
        </div>
      </header>

      <section className="kpi-grid" aria-label="Portfolio summary">
        <div className="card kpi">
          <span>Policy records</span>
          <strong>{policies.length}</strong>
          <small>Federal + state</small>
        </div>
        <div className="card kpi">
          <span>State markets</span>
          <strong>{markets.length}</strong>
          <small>Comparative factual view</small>
        </div>
        <div className="card kpi">
          <span>Action workflow</span>
          <strong>{actionCount}</strong>
          <small>Engage / analyze / escalate</small>
        </div>
        <div className="card kpi">
          <span>Open / pending</span>
          <strong>{openCount}</strong>
          <small>Proceedings requiring monitoring</small>
        </div>
      </section>

      <section className="card section-card">
        <div className="section-heading">
          <div>
            <div className="eyebrow">MARKET COMPARISON</div>
            <h2>Tracked policy conditions</h2>
          </div>
          <p>
            The table describes the effect of the tracked source record. It does
            not rank jurisdictions or rate policy quality.
          </p>
        </div>
        <div className="table-wrap">
          <table className="market-table">
            <thead>
              <tr>
                <th>Market</th>
                <th>Tracked development</th>
                <th>Status</th>
                <th>Power signal</th>
                <th>Interconnection signal</th>
                <th>Tariff / cost signal</th>
                <th>Clean-energy signal</th>
              </tr>
            </thead>
            <tbody>
              {markets.map((market) => (
                <tr key={market.market}>
                  <td>
                    <strong>{market.market}</strong>
                    <span className="row-note">{market.sourceBasis}</span>
                  </td>
                  <td>{market.trackedDevelopment}</td>
                  <td><span className="plain-badge">{market.currentStatus}</span></td>
                  <td>{market.powerSignal}</td>
                  <td>{market.interconnectionSignal}</td>
                  <td>{market.tariffCostSignal}</td>
                  <td>{market.cleanEnergySignal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="workspace">
        <div className="card policy-list">
          <div className="section-heading compact">
            <div>
              <div className="eyebrow">POLICY INTAKE</div>
              <h2>Policy records</h2>
            </div>
            <span className="count">{filtered.length} shown</span>
          </div>

          <div className="filters">
            <input
              aria-label="Search policy records"
              placeholder="Search policy, agency, issue..."
              value={query}
              onChange={(event) => setQuery(event.target.value)}
            />
            <select
              aria-label="Filter by jurisdiction"
              value={jurisdiction}
              onChange={(event) => setJurisdiction(event.target.value)}
            >
              {jurisdictions.map((item) => <option key={item}>{item}</option>)}
            </select>
            <select
              aria-label="Filter by status"
              value={status}
              onChange={(event) => setStatus(event.target.value)}
            >
              {statuses.map((item) => <option key={item}>{item}</option>)}
            </select>
          </div>

          <div className="records">
            {filtered.map((policy) => (
              <button
                type="button"
                key={policy.id}
                className={`record ${selected.id === policy.id ? "selected" : ""}`}
                onClick={() => {
                  setSelectedId(policy.id);
                  setMemoText("");
                  setMemoMode("");
                }}
              >
                <span className="record-topline">
                  <span>{policy.jurisdiction}</span>
                  <span>{policy.status}</span>
                </span>
                <strong>{policy.title}</strong>
                <span className="record-meta">
                  {policy.policyType} · {policy.recommendedAction}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div className="detail-stack">
          <section className="card detail-card">
            <div className="detail-header">
              <div>
                <div className="eyebrow">{selected.jurisdiction.toUpperCase()}</div>
                <h2>{selected.title}</h2>
                <p>{selected.agency}</p>
              </div>
              <span className="status-badge">{selected.status}</span>
            </div>

            <div className="metadata-grid">
              <div><span>Policy type</span><strong>{selected.policyType}</strong></div>
              <div><span>Effective / milestone</span><strong>{formatDate(selected.effectiveDate)}</strong></div>
              <div><span>Action</span><strong>{selected.recommendedAction}</strong></div>
              <div><span>Owner</span><strong>{selected.owner}</strong></div>
            </div>

            <div className="brief-grid">
              <article>
                <h3>What changed</h3>
                <p>{selected.summary}</p>
              </article>
              <article>
                <h3>Why it matters</h3>
                <p>{selected.whyItMatters}</p>
              </article>
            </div>

            <div className="impact-panel">
              <h3>Business-impact analysis</h3>
              <div className="impact-grid">
                {[
                  ["Power availability", selected.businessImpact.powerAvailability],
                  ["Utility cost", selected.businessImpact.utilityCost],
                  ["Interconnection timeline", selected.businessImpact.interconnectionTimeline],
                  ["Site selection", selected.businessImpact.siteSelection],
                  ["Renewable / clean energy", selected.businessImpact.renewableRequirements],
                  ["CapEx", selected.businessImpact.capex],
                  ["OpEx", selected.businessImpact.opex],
                  ["Regulatory uncertainty", selected.businessImpact.regulatoryUncertainty],
                ].map(([label, value]) => (
                  <div className="impact-item" key={label}>
                    <span>{label}</span>
                    <p>{value}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="cross-functional">
              <div>
                <h3>Teams affected</h3>
                <div className="tag-row">
                  {selected.teams.map((team) => <span key={team}>{team}</span>)}
                </div>
              </div>
              <div>
                <h3>Evidence retained</h3>
                <ul>
                  {selected.evidence.map((item) => <li key={item}>{item}</li>)}
                </ul>
              </div>
            </div>

            <div className="source-box">
              <div>
                <span>Primary source · confidence {selected.sourceConfidence}</span>
                <strong>{selected.source.label}</strong>
                <small>Last reviewed {formatDate(selected.lastReviewed)}</small>
              </div>
              <a href={selected.source.url} target="_blank" rel="noreferrer">
                Open source ↗
              </a>
            </div>
          </section>

          {versions.length >= 2 && (
            <section className="card detail-card">
              <div className="section-heading">
                <div>
                  <div className="eyebrow">POLICY VERSION COMPARISON</div>
                  <h2>What changed between versions</h2>
                </div>
                <p>Comparison is limited to retained primary-source records.</p>
              </div>
              <div className="version-grid">
                {versions.map((version) => (
                  <article className="version-card" key={`${version.label}-${version.date}`}>
                    <span>{formatDate(version.date)}</span>
                    <h3>{version.label}</h3>
                    <ul>
                      {version.changes.map((change) => <li key={change}>{change}</li>)}
                    </ul>
                    <a href={version.source.url} target="_blank" rel="noreferrer">
                      {version.source.label} ↗
                    </a>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section className="card detail-card">
            <div className="section-heading">
              <div>
                <div className="eyebrow">CLAIM-LEVEL SOURCE CONTROL</div>
                <h2>Citation binding check</h2>
              </div>
              <p>
                This verifies that each structured claim is linked to a retained
                primary-source record. It does not replace factual human review.
              </p>
            </div>
            <div className="claim-list">
              {claimBindings.map((claim) => (
                <article className="claim-row" key={claim.claimId}>
                  <div>
                    <strong>{claim.text}</strong>
                    <span>{claim.sourceLabel}</span>
                  </div>
                  <div className="claim-actions">
                    <span className={claim.status.startsWith("Bound") ? "check-ok" : "check-review"}>
                      {claim.status}
                    </span>
                    <a href={claim.sourceUrl} target="_blank" rel="noreferrer">Source ↗</a>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section className="card ai-card">
            <div className="ai-heading">
              <div>
                <div className="eyebrow">AI POLICY ANALYST</div>
                <h2>Leadership memo generator</h2>
                <p>
                  Drafts only from the structured record and retained primary-source
                  evidence. Human review remains mandatory.
                </p>
              </div>
              <div className="button-row">
                <button type="button" onClick={generateMemo} disabled={memoLoading}>
                  {memoLoading ? "Drafting..." : "Draft leadership memo"}
                </button>
                <button type="button" className="secondary-button" onClick={downloadMemo}>
                  Download memo
                </button>
              </div>
            </div>

            <div className="guardrails">
              <span>Primary-source citation retained</span>
              <span>Claim links checked</span>
              <span>No policy ranking</span>
              <span>Human verification required</span>
            </div>

            <pre className="memo">
              {memoText || buildDeterministicMemo(selected)}
            </pre>
            <div className="memo-footer">
              <span>Mode: {memoMode || "source-grounded baseline"}</span>
              <a href={selected.source.url} target="_blank" rel="noreferrer">
                Citation
              </a>
            </div>
          </section>
        </div>
      </section>

      <footer>
        Independent policy-intelligence prototype. Business-impact descriptions
        are workflow aids, not legal advice, investment advice, policy rankings,
        or judgments about policy merits.
      </footer>
    </main>
  );
}

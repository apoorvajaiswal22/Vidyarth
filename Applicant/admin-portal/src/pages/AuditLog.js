import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getApplicationAuditLog } from "../api/client";

function getEntries(response) {
  const data = response?.data ?? response;
  if (Array.isArray(data)) return data;
  return data?.logs || data?.entries || data?.auditLog || [];
}

function AuditLog() {
  const { id } = useParams();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadAudit = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      setEntries(getEntries(await getApplicationAuditLog(id)));
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not load audit history.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadAudit(); }, [loadAudit]);

  return (
    <section className="audit-page">
      <div className="page-heading-row">
        <div>
          <Link className="back-link" to={`/application/${encodeURIComponent(id)}`}>← Application review</Link>
          <span className="eyebrow">REVIEW HISTORY</span>
          <h1>Audit log</h1>
          <p>Application {id}</p>
        </div>
        <button className="button button-outline" type="button" onClick={loadAudit} disabled={loading}>{loading ? "Refreshing…" : "Refresh history"}</button>
      </div>

      {error && <div className="inline-error" role="alert">{error}</div>}
      {loading && <div className="page-state">Loading audit history…</div>}
      {!loading && !error && entries.length === 0 && <div className="empty-panel">No audit entries were returned for this application.</div>}
      {!loading && entries.length > 0 && (
        <ol className="audit-list">
          {entries.map((entry, index) => (
            <li key={entry?.id || entry?._id || `${entry?.createdAt || "event"}-${index}`}>
              <span className="audit-marker" aria-hidden="true" />
              <div className="audit-entry-content">
                <div className="audit-entry-heading">
                  <strong>{entry?.action || entry?.event || "Application updated"}</strong>
                  <time dateTime={entry?.createdAt || entry?.timestamp || undefined}>{entry?.createdAt || entry?.timestamp ? new Date(entry.createdAt || entry.timestamp).toLocaleString() : "Time not supplied"}</time>
                </div>
                <dl>
                  <div><dt>Officer</dt><dd>{entry?.actor?.name || entry?.actor?.email || entry?.user?.name || entry?.officer || "Not supplied"}</dd></div>
                  <div><dt>Status change</dt><dd>{entry?.previousStatus || entry?.from || "—"} → {entry?.newStatus || entry?.to || entry?.status || "—"}</dd></div>
                  <div><dt>Reason</dt><dd>{entry?.remarks || entry?.reason || entry?.message || "No reason recorded"}</dd></div>
                </dl>
              </div>
            </li>
          ))}
        </ol>
      )}
    </section>
  );
}

export default AuditLog;
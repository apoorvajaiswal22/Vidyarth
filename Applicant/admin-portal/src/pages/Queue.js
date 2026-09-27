import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminApplications, updateApplicationStatus } from "../api/client";
import { useAuth } from "../context/AuthContext";

const pageSize = 10;

function unwrapApplications(response) {
  const data = response?.data ?? response;
  if (Array.isArray(data)) return data;
  return data?.applications || data?.items || [];
}

function idOf(application) {
  return String(application?._id || application?.id || application?.applicationId || "");
}

function applicantOf(application) {
  return application?.applicant || application?.student || application?.user || {};
}

function formatStatus(status) {
  return String(status || "unknown").replaceAll("_", " ");
}

function formatDate(value) {
  if (!value) return "—";
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? String(value) : date.toLocaleDateString();
}

function Queue() {
  const { role } = useAuth();
  const [records, setRecords] = useState([]);
  const [status, setStatus] = useState("under_review");
  const [scheme, setScheme] = useState("all");
  const [search, setSearch] = useState("");
  const [selectedIds, setSelectedIds] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [bulkLoading, setBulkLoading] = useState(false);
  const [error, setError] = useState("");

  const loadRecords = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAdminApplications(status === "all" ? {} : { status });
      setRecords(unwrapApplications(response));
      setSelectedIds([]);
      setPage(1);
    } catch (requestError) {
      setRecords([]);
      setError(requestError.response?.data?.message || requestError.message || "Could not load the application queue.");
    } finally {
      setLoading(false);
    }
  }, [status]);

  useEffect(() => {
    loadRecords();
  }, [loadRecords]);

  const schemeOptions = useMemo(() => [...new Set(records.map((record) => record?.schemeName || record?.scheme).filter(Boolean))].sort(), [records]);
  const filteredRecords = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();
    return records.filter((record) => {
      const applicant = applicantOf(record);
      const recordScheme = record?.schemeName || record?.scheme || "";
      const matchesScheme = scheme === "all" || recordScheme === scheme;
      const matchesSearch = !normalizedSearch || [idOf(record), applicant.name, applicant.fullName, applicant.email]
        .filter(Boolean).some((value) => String(value).toLowerCase().includes(normalizedSearch));
      return matchesScheme && matchesSearch;
    });
  }, [records, scheme, search]);

  const pages = Math.max(1, Math.ceil(filteredRecords.length / pageSize));
  const visibleRecords = filteredRecords.slice((page - 1) * pageSize, page * pageSize);
  const canBulkVerify = ["scrutiny_officer", "super_admin", "admin", "officer"].includes(role);
  const bulkCandidates = records.filter((record) => selectedIds.includes(idOf(record)) && ["submitted", "under_review"].includes(record?.status));

  function toggleSelected(id) {
    setSelectedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
  }

  function togglePageSelection() {
    const pageIds = visibleRecords.map(idOf);
    const allSelected = pageIds.length > 0 && pageIds.every((id) => selectedIds.includes(id));
    setSelectedIds((current) => allSelected
      ? current.filter((id) => !pageIds.includes(id))
      : [...new Set([...current, ...pageIds])]);
  }

  async function bulkVerify() {
    if (bulkCandidates.length === 0) return;
    setBulkLoading(true);
    const outcomes = await Promise.allSettled(bulkCandidates.map((record) =>
      updateApplicationStatus(idOf(record), {
        status: "verified",
        remarks: "Documents verified by authorised bulk review.",
      }),
    ));
    const succeeded = outcomes.filter((outcome) => outcome.status === "fulfilled").length;
    const failed = outcomes.length - succeeded;
    if (succeeded) toast.success(`${succeeded} application${succeeded === 1 ? "" : "s"} marked verified.`);
    if (failed) toast.error(`${failed} status update${failed === 1 ? "" : "s"} failed.`);
    await loadRecords();
    setBulkLoading(false);
  }

  return (
    <section className="queue-page">
      <div className="page-heading-row">
        <div>
          <span className="eyebrow">APPLICATION MANAGEMENT</span>
          <h1>Review queue</h1>
          <p>Monitor and route scholarship applications through officer review.</p>
        </div>
        <button className="button button-outline" type="button" onClick={loadRecords} disabled={loading}>
          {loading ? "Refreshing…" : "Refresh queue"}
        </button>
      </div>

      <div className="queue-summary-row">
        <div><span>Loaded records</span><strong>{records.length}</strong></div>
        <div><span>Matching filters</span><strong>{filteredRecords.length}</strong></div>
        <div><span>Selected</span><strong>{selectedIds.length}</strong></div>
      </div>

      <section className="queue-panel">
        <div className="queue-toolbar">
          <label className="search-control">
            <span aria-hidden="true">⌕</span>
            <input aria-label="Search by applicant name or application ID" value={search} onChange={(event) => { setSearch(event.target.value); setPage(1); }} placeholder="Search name or application ID" />
          </label>
          <label className="filter-control">Status
            <select value={status} onChange={(event) => setStatus(event.target.value)}>
              <option value="under_review">Under review</option>
              <option value="submitted">Submitted</option>
              <option value="deficient">Deficient</option>
              <option value="verified">Verified</option>
              <option value="selected">Selected</option>
              <option value="rejected">Rejected</option>
              <option value="all">All statuses</option>
            </select>
          </label>
          <label className="filter-control">Scheme
            <select value={scheme} onChange={(event) => { setScheme(event.target.value); setPage(1); }}>
              <option value="all">All schemes</option>
              {schemeOptions.map((option) => <option value={option} key={option}>{option}</option>)}
            </select>
          </label>
          {canBulkVerify && (
            <button className="button button-primary" type="button" onClick={bulkVerify} disabled={bulkLoading || bulkCandidates.length === 0}>
              {bulkLoading ? "Updating…" : `Bulk verify (${bulkCandidates.length})`}
            </button>
          )}
        </div>

        {error && <div className="inline-error" role="alert">{error}</div>}

        <div className="table-scroll">
          <table className="application-table">
            <thead>
              <tr>
                <th><input type="checkbox" aria-label="Select visible applications" checked={visibleRecords.length > 0 && visibleRecords.every((record) => selectedIds.includes(idOf(record)))} onChange={togglePageSelection} /></th>
                <th>Application ID</th>
                <th>Applicant</th>
                <th>Scheme</th>
                <th>Status</th>
                <th>Submitted</th>
              </tr>
            </thead>
            <tbody>
              {loading && <tr><td colSpan="6" className="table-state">Loading applications…</td></tr>}
              {!loading && !error && visibleRecords.length === 0 && <tr><td colSpan="6" className="table-state">No applications match these filters.</td></tr>}
              {!loading && visibleRecords.map((record) => {
                const id = idOf(record);
                const applicant = applicantOf(record);
                return (
                  <tr key={id}>
                    <td><input type="checkbox" aria-label={`Select ${id}`} checked={selectedIds.includes(id)} onChange={() => toggleSelected(id)} /></td>
                    <td><Link className="application-id-link" to={`/application/${encodeURIComponent(id)}`}>{id || "—"}</Link></td>
                    <td><strong>{applicant.name || applicant.fullName || "Applicant unavailable"}</strong><small>{applicant.email || ""}</small></td>
                    <td>{record?.schemeName || record?.scheme || "—"}</td>
                    <td><span className={`status-pill status-${String(record?.status || "unknown").toLowerCase()}`}>{formatStatus(record?.status)}</span></td>
                    <td>{formatDate(record?.submittedAt || record?.createdAt || record?.appliedAt)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        <div className="table-footer">
          <span>Showing {filteredRecords.length === 0 ? 0 : (page - 1) * pageSize + 1}–{Math.min(page * pageSize, filteredRecords.length)} of {filteredRecords.length}</span>
          <div>
            <button className="button button-outline" type="button" onClick={() => setPage((current) => Math.max(1, current - 1))} disabled={page <= 1}>Previous</button>
            <span>Page {page} of {pages}</span>
            <button className="button button-outline" type="button" onClick={() => setPage((current) => Math.min(pages, current + 1))} disabled={page >= pages}>Next</button>
          </div>
        </div>
      </section>
    </section>
  );
}

export default Queue;
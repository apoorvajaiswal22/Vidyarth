import { useCallback, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { getAdminApplications, updateApplicationStatus } from "../api/client";
import { useAuth } from "../context/AuthContext";

function getApplications(response) {
  const data = response?.data ?? response;
  if (Array.isArray(data)) return data;
  return data?.applications || data?.items || [];
}

function getId(application) {
  return String(application?._id || application?.id || application?.applicationId || "");
}

function getApplicant(application) {
  return application?.applicant || application?.student || application?.user || {};
}

function getDocuments(application) {
  const documents = application?.documents || application?.files || [];
  if (Array.isArray(documents)) return documents;
  if (documents && typeof documents === "object") {
    return Object.entries(documents).map(([name, value]) => ({ name, ...(typeof value === "string" ? { url: value } : value) }));
  }
  return [];
}

function getDocumentUrl(document) {
  return document?.url || document?.fileUrl || document?.path || "";
}

function getAiResult(document, application) {
  const verification = document?.aiVerification || document?.verification || document?.aiResult;
  if (verification) return verification;
  const records = application?.aiVerificationResults || application?.documentVerification || [];
  if (Array.isArray(records)) return records.find((result) => result.documentId === (document?.id || document?._id)) || null;
  return null;
}

function ApplicationDetail() {
  const { id } = useParams();
  const { role } = useAuth();
  const [application, setApplication] = useState(null);
  const [remarks, setRemarks] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const loadApplication = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const response = await getAdminApplications();
      const found = getApplications(response).find((record) => getId(record) === id);
      if (!found) throw new Error("Application not found in the officer queue.");
      setApplication(found);
    } catch (requestError) {
      setError(requestError.response?.data?.message || requestError.message || "Could not load this application.");
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => { loadApplication(); }, [loadApplication]);

  const applicant = getApplicant(application);
  const documents = getDocuments(application);
  const canScrutinise = ["scrutiny_officer", "super_admin", "admin", "officer"].includes(role);
  const canSelect = ["selection_committee", "super_admin", "admin"].includes(role);

  async function updateStatus(status, requireReason = false) {
    if (requireReason && !remarks.trim()) {
      toast.error("Enter a reason before recording this decision.");
      return;
    }
    setSaving(true);
    try {
      await updateApplicationStatus(id, { status, remarks: remarks.trim() });
      toast.success(`Application marked ${status.replaceAll("_", " ")}.`);
      setRemarks("");
      await loadApplication();
    } catch (requestError) {
      toast.error(requestError.response?.data?.message || requestError.message || "Status update failed.");
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <div className="page-state">Loading application…</div>;
  if (error || !application) return <div className="page-state page-state-error" role="alert">{error || "Application not available."}<Link to="/queue">Return to queue</Link></div>;

  return (
    <section className="detail-page">
      <div className="page-heading-row detail-heading-row">
        <div>
          <Link className="back-link" to="/queue">← Application queue</Link>
          <span className="eyebrow">APPLICATION REVIEW</span>
          <h1>{applicant.name || applicant.fullName || "Applicant"}</h1>
          <p>{getId(application)} <span>·</span> {application?.schemeName || application?.scheme || "Scheme not specified"}</p>
        </div>
        <span className={`status-pill status-${String(application?.status || "unknown").toLowerCase()}`}>{String(application?.status || "unknown").replaceAll("_", " ")}</span>
      </div>

      <div className="detail-columns">
        <section className="detail-panel applicant-panel">
          <div className="panel-heading"><h2>Applicant information</h2><Link to={`/audit-log/${encodeURIComponent(id)}`}>Audit history →</Link></div>
          <dl className="applicant-facts">
            {[
              ["Application ID", getId(application)],
              ["Applicant name", applicant.name || applicant.fullName],
              ["Email", applicant.email || application?.email],
              ["Phone", applicant.phone || applicant.mobile],
              ["Category", applicant.category || application?.category],
              ["State", applicant.state || application?.state],
              ["Scheme", application?.schemeName || application?.scheme],
              ["Course", application?.course || applicant.course],
              ["Family income", application?.income || application?.annualIncome],
              ["Percentage", application?.percentage || application?.cgpa],
              ["Submitted", application?.submittedAt || application?.createdAt],
            ].filter(([, value]) => value !== undefined && value !== null && value !== "").map(([label, value]) => (
              <div key={label}><dt>{label}</dt><dd>{label === "Family income" ? `₹${Number(value).toLocaleString("en-IN")}` : value}</dd></div>
            ))}
          </dl>

          <div className="review-actions">
            <label htmlFor="review-remarks">Review reason / deficiency details</label>
            <textarea id="review-remarks" rows="4" value={remarks} onChange={(event) => setRemarks(event.target.value)} placeholder="Record a concise, applicant-visible reason when raising a deficiency or rejection." />
            <div className="review-action-buttons">
              {canScrutinise && <button className="button button-primary" type="button" disabled={saving} onClick={() => updateStatus("verified")}>{saving ? "Saving…" : "Verify documents"}</button>}
              {(canScrutinise || canSelect) && <button className="button button-warning" type="button" disabled={saving} onClick={() => updateStatus("deficient", true)}>Flag as deficient</button>}
              {canSelect && <button className="button button-success" type="button" disabled={saving} onClick={() => updateStatus("selected")}>Approve for merit list</button>}
              {canSelect && <button className="button button-danger" type="button" disabled={saving} onClick={() => updateStatus("rejected", true)}>Reject</button>}
            </div>
          </div>
        </section>

        <section className="detail-panel documents-panel">
          <div className="panel-heading"><h2>Documents &amp; verification</h2><span>{documents.length} files</span></div>
          {documents.length === 0 ? <p className="empty-note">No documents were returned by the backend for this application.</p> : (
            <div className="document-stack">
              {documents.map((document, index) => {
                const url = getDocumentUrl(document);
                const name = document?.name || document?.filename || `Document ${index + 1}`;
                const type = String(document?.mimeType || document?.type || "").toLowerCase();
                const isPdf = type.includes("pdf") || url.toLowerCase().split("?")[0].endsWith(".pdf");
                const isImage = type.startsWith("image/") || /\.(png|jpe?g|webp|gif)(\?|$)/i.test(url);
                const ai = getAiResult(document, application);
                const confidence = ai?.confidence == null ? null : Number(ai.confidence) <= 1 ? Number(ai.confidence) * 100 : Number(ai.confidence);
                const flags = Array.isArray(ai?.flags) ? ai.flags : ai?.flags ? [ai.flags] : [];

                return (
                  <article className="document-card" key={document?.id || document?._id || `${name}-${index}`}>
                    <div className="document-card-heading"><div><strong>{name}</strong><small>{document?.status || document?.verificationStatus || "Submitted"}</small></div>{url && <a href={url} target="_blank" rel="noreferrer">Open ↗</a>}</div>
                    {url && isImage && <img className="document-preview" src={url} alt={name} />}
                    {url && isPdf && <iframe className="document-preview document-pdf-preview" src={url} title={name} />}
                    {!url && <p className="empty-note">No preview link was returned.</p>}
                    <div className="ai-result-panel">
                      <strong>AI verification</strong>
                      {ai ? <>
                        {confidence !== null && <span>Confidence: {confidence.toFixed(1)}%</span>}
                        {flags.length > 0 ? <ul>{flags.map((flag, flagIndex) => <li key={`${flag}-${flagIndex}`}>{typeof flag === "string" ? flag : flag.message || flag.code || "Review flag"}</li>)}</ul> : <span>{ai.message || ai.status || "No flags returned."}</span>}
                      </> : <span>No AI result was returned for this file.</span>}
                    </div>
                  </article>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </section>
  );
}

export default ApplicationDetail;
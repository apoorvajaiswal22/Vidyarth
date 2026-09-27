import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "./api/api";
import "./Track.css";

function Track() {
  const [lang, setLang] = useState("en");
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(Boolean(localStorage.getItem("vidyarthToken")));
  const [error, setError] = useState("");

  useEffect(() => {
    if (!localStorage.getItem("vidyarthToken")) return;
    let active = true;
    getMyApplications()
      .then((response) => {
        const data = response?.data ?? response;
        const records = Array.isArray(data) ? data : data?.applications || data?.items || [];
        if (active) setApplications(records);
      })
      .catch((requestError) => {
        if (active) setError(requestError?.message || "Could not load your applications.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, []);

  const application = applications[0] || null;
  const applicationSubmitted = Boolean(application);
  const applicationId = application?._id || application?.id || application?.applicationId || "";
  const selectedScheme = application?.schemeName || application?.scheme || "-";
  const submittedDate = application?.submittedAt || application?.createdAt || application?.appliedAt;
  const appliedOn = submittedDate ? new Date(submittedDate).toLocaleDateString() : "-";
  const currentStatus = String(application?.status || "submitted").toLowerCase();
  const currentStage = currentStatus === "selected" || currentStatus === "rejected"
    ? 3
    : currentStatus === "verified"
      ? 2
      : currentStatus === "under_review" || currentStatus === "deficient"
        ? 1
        : 0;
  const isDeficient = ["deficient", "document_deficient", "deficiency_raised"].includes(currentStatus);
  const administratorNote = application?.remarks || application?.deficiencyMessage || application?.reviewRemarks || "";

  const text = {
    hi: {
      home: "मुख्य पृष्ठ",
      dashboard: "डैशबोर्ड",
      title: "आवेदन ट्रैक करें",
      subtitle:
        "अपने छात्रवृत्ति आवेदन की वर्तमान स्थिति देखें।",

      applicationId: "आवेदन ID",
      scheme: "चयनित योजना",
      appliedOn: "आवेदन की तारीख",
      currentStatus: "वर्तमान स्थिति",

      submitted: "आवेदन जमा किया गया",
      submittedDesc:
        "आपका आवेदन सफलतापूर्वक जमा हो चुका है और जांच के लिए उपलब्ध है।",

      notSubmitted: "अभी कोई आवेदन जमा नहीं किया गया",
      notSubmittedDesc:
        "अपना छात्रवृत्ति आवेदन शुरू करने के लिए डैशबोर्ड पर जाएं।",

      timeline: "आवेदन की प्रगति",

      step1: "आवेदन जमा किया गया",
      step2: "दस्तावेज़ सत्यापन",
      step3: "आवेदन की समीक्षा",
      step4: "निर्णय",

      completed: "पूर्ण",
      pending: "लंबित",
      loading: "आवेदन लोड हो रहे हैं...",
      login: "लॉगिन करें",
      unavailable: "आवेदन की जानकारी प्राप्त नहीं हो सकी। कृपया पुनः प्रयास करें।",
      deficient: "दस्तावेज़ में कमी",
      under_review: "जांच जारी है",
      verified: "सत्यापित",
      selected: "चयनित",
      rejected: "चयनित नहीं",
      resubmit: "दस्तावेज़ दोबारा जमा करें",
      deficiencyDetails: "कृपया प्रशासन की टिप्पणी के अनुसार आवश्यक दस्तावेज़ अपडेट करें।",

      apply: "छात्रवृत्ति के लिए आवेदन करें",
      backDashboard: "डैशबोर्ड पर जाएं",
    },

    en: {
      home: "Home",
      dashboard: "Dashboard",
      title: "Track Application",
      subtitle:
        "View the current status of your scholarship application.",

      applicationId: "Application ID",
      scheme: "Selected Scheme",
      appliedOn: "Application Date",
      currentStatus: "Current Status",

      submitted: "Application Submitted",
      submittedDesc:
        "Your application has been successfully submitted and is available for verification.",

      notSubmitted: "No Application Submitted",
      notSubmittedDesc:
        "Go to the dashboard to start your scholarship application.",

      timeline: "Application Progress",

      step1: "Application Submitted",
      step2: "Document Verification",
      step3: "Application Review",
      step4: "Decision",

      completed: "Completed",
      pending: "Pending",
      loading: "Loading applications...",
      login: "Sign in",
      unavailable: "Application details could not be loaded. Please try again.",
      deficient: "Deficiency raised",
      under_review: "Under review",
      verified: "Verified",
      selected: "Selected",
      rejected: "Not selected",
      resubmit: "Resubmit documents",
      deficiencyDetails: "Update the requested documents according to the administrator's note.",

      apply: "Apply for Scholarship",
      backDashboard: "Go to Dashboard",
    },
  };

  const t = text[lang];
  const currentStatusLabel = t[currentStatus] || currentStatus.replaceAll("_", " ");

  return (
    <div className="track-page">

      {/* TOP BAR */}
      <div className="track-topbar">
        <div className="track-container track-topbar-inner">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="track-language">
            <button
              className={lang === "hi" ? "active" : ""}
              onClick={() => setLang("hi")}
            >
              हिन्दी
            </button>

            <span>|</span>

            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              English
            </button>
          </div>

        </div>
      </div>

      {/* HEADER */}
      <header className="track-header">
        <div className="track-container track-header-inner">

          <Link to="/" className="track-brand">

            <div className="track-logo">
              V
            </div>

            <div>
              <div className="track-brand-name">
                VIDYARTH
              </div>

              <div className="track-brand-subtitle">
                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}
              </div>
            </div>

          </Link>

          <Link
            to="/dashboard"
            className="track-dashboard-link"
          >
            {t.dashboard}
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="track-main">

        <div className="track-container">

          {/* BREADCRUMB */}
          <div className="track-breadcrumb">

            <Link to="/">
              {t.home}
            </Link>

            <span>/</span>

            <Link to="/dashboard">
              {t.dashboard}
            </Link>

            <span>/</span>

            <span>{t.title}</span>

          </div>

          {/* TITLE */}
          <section className="track-heading">

            <h1>
              {t.title}
            </h1>

            <p>
              {t.subtitle}
            </p>

          </section>

          {loading ? (
            <section className="track-empty-card" aria-live="polite">{t.loading}</section>
          ) : error && !applicationSubmitted ? (
            <section className="track-empty-card" role="alert">
              <h2>{t.unavailable}</h2>
              <p>{error}</p>
            </section>
          ) : !applicationSubmitted ? (

            /* NO APPLICATION */
            <section className="track-empty-card">

              <div className="track-empty-icon">
                📋
              </div>

              <h2>
                {t.notSubmitted}
              </h2>

              <p>
                {t.notSubmittedDesc}
              </p>

              <Link
                to={localStorage.getItem("vidyarthToken") ? "/apply" : "/login"}
                className="track-primary-btn"
              >
                {localStorage.getItem("vidyarthToken") ? t.apply : t.login}
              </Link>

            </section>

          ) : (

            /* APPLICATION DETAILS */
            <>
              <section className="track-status-card">

                <div className="track-status-icon">
                  ✓
                </div>

                <div className="track-status-content">

                  <span>
                    {t.currentStatus}
                  </span>

                  <h2>{currentStatusLabel}</h2>

                  <p>
                    {t.submittedDesc}
                  </p>

                </div>

                {isDeficient && (
                  <div className="track-deficiency-notice">
                    <div>
                      <strong>{t.deficient}</strong>
                      <p>{administratorNote || t.deficiencyDetails}</p>
                    </div>
                    {applicationId && (
                      <Link to={`/apply?applicationId=${encodeURIComponent(applicationId)}`} className="track-primary-btn">
                        {t.resubmit}
                      </Link>
                    )}
                  </div>
                )}

              </section>

              {/* APPLICATION DETAILS */}
              <section className="track-details-card">

                <h2>
                  {lang === "hi"
                    ? "आवेदन विवरण"
                    : "Application Details"}
                </h2>

                <div className="track-details-grid">

                  <div className="track-detail">

                    <span>
                      {t.applicationId}
                    </span>

                    <strong>
                      {applicationId}
                    </strong>

                  </div>

                  <div className="track-detail">

                    <span>
                      {t.scheme}
                    </span>

                    <strong>
                      {selectedScheme}
                    </strong>

                  </div>

                  <div className="track-detail">

                    <span>
                      {t.appliedOn}
                    </span>

                    <strong>
                      {appliedOn}
                    </strong>

                  </div>

                  <div className="track-detail">

                    <span>
                      {t.currentStatus}
                    </span>

                    <strong className="status-text">
                      {currentStatusLabel}
                    </strong>

                  </div>

                </div>

              </section>

              {/* TIMELINE */}
              <section className="track-timeline-card">

                <h2>
                  {t.timeline}
                </h2>

                <div className="track-timeline">

                  {/* STEP 1 */}
                  <div className={`timeline-item ${currentStage >= 0 ? "completed" : ""}`}>

                    <div className="timeline-marker">
                      ✓
                    </div>

                    <div className="timeline-content">

                      <h3>
                        {t.step1}
                      </h3>

                      <span>
                        {t.completed}
                      </span>

                    </div>

                  </div>

                  {/* STEP 2 */}
                  <div className={`timeline-item ${currentStage >= 1 ? "completed" : ""}`}>

                    <div className="timeline-marker">
                      2
                    </div>

                    <div className="timeline-content">

                      <h3>
                        {t.step2}
                      </h3>

                      <span>
                        {currentStatus === "deficient" ? t.deficient : currentStage >= 1 ? t.completed : t.pending}
                      </span>

                    </div>

                  </div>

                  {/* STEP 3 */}
                  <div className={`timeline-item ${currentStage >= 2 ? "completed" : ""}`}>

                    <div className="timeline-marker">
                      3
                    </div>

                    <div className="timeline-content">

                      <h3>
                        {t.step3}
                      </h3>

                      <span>
                        {currentStage >= 2 ? t.completed : t.pending}
                      </span>

                    </div>

                  </div>

                  {/* STEP 4 */}
                  <div className={`timeline-item ${currentStage >= 3 ? "completed" : ""}`}>

                    <div className="timeline-marker">
                      4
                    </div>

                    <div className="timeline-content">

                      <h3>
                        {t.step4}
                      </h3>

                      <span>
                        {currentStage >= 3 ? t.completed : t.pending}
                      </span>

                    </div>

                  </div>

                </div>

              </section>

            </>

          )}

          {/* BACK */}
          <div className="track-bottom-action">

            <Link
              to="/dashboard"
              className="track-secondary-btn"
            >
              ← {t.backDashboard}
            </Link>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="track-footer">

        © 2026 VIDYARTH |{" "}

        {lang === "hi"
          ? "जनजातीय छात्रों के लिए छात्रवृत्ति एवं फेलोशिप पोर्टल"
          : "Scholarship & Fellowship Portal for Tribal Students"}

      </footer>

    </div>
  );
}

export default Track;
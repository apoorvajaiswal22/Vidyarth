import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyApplications } from "./api/api";
import "./Dashboard.css";

function Dashboard() {
  const [lang, setLang] = useState("en");
  const [applications, setApplications] = useState([]);
  const [applicationError, setApplicationError] = useState("");
  const user = getStoredUser();

  useEffect(() => {
    if (!localStorage.getItem("vidyarthToken")) return;
    let active = true;
    getMyApplications()
      .then((response) => {
        const data = response?.data ?? response;
        const records = Array.isArray(data) ? data : data?.applications || data?.items || [];
        if (active) setApplications(records);
      })
      .catch((error) => {
        if (active) setApplicationError(error?.message || "Could not load your application details.");
      });
    return () => { active = false; };
  }, []);

  const text = {
    hi: {
      home: "मुख्य पृष्ठ",
      dashboard: "डैशबोर्ड",
      welcome: "स्वागत है, विद्यार्थी!",
      subtitle:
        "अपने छात्रवृत्ति आवेदन और प्रोफ़ाइल को यहां से प्रबंधित करें।",

      application: "आवेदन स्थिति",
      submitted: "आवेदन सफलतापूर्वक जमा हो गया",
      notSubmitted: "अभी आवेदन नहीं किया",

      applicationId: "आवेदन ID",
      scheme: "योजना",
      appliedOn: "आवेदन दिनांक",

      apply: "छात्रवृत्ति के लिए आवेदन करें",
      track: "आवेदन ट्रैक करें",
      notifications: "सूचनाएं",

      quickServices: "त्वरित सेवाएं",
      startApplication: "नया छात्रवृत्ति आवेदन शुरू करें",
      checkStatus: "अपने आवेदन की स्थिति देखें",
      noNotifications: "कोई नई सूचना नहीं",

      profile: "प्रोफ़ाइल जानकारी",
      name: "विद्यार्थी का नाम",
      studentId: "विद्यार्थी ID",
      category: "श्रेणी",
      course: "पाठ्यक्रम",

      logout: "लॉगआउट",
      adminLogin: "एडमिन लॉगिन",
      adminTitle: "प्रशासन पोर्टल",
      adminDescription: "आवेदनों की समीक्षा और छात्रवृत्ति प्रबंधन के लिए अधिकृत प्रवेश।",
    },

    en: {
      home: "Home",
      dashboard: "Dashboard",
      welcome: "Welcome, Student!",
      subtitle:
        "Manage your scholarship application and profile from here.",

      application: "Application Status",
      submitted: "Application Submitted Successfully",
      notSubmitted: "No application submitted yet",

      applicationId: "Application ID",
      scheme: "Scheme",
      appliedOn: "Applied On",

      apply: "Apply for Scholarship",
      track: "Track Application",
      notifications: "Notifications",

      quickServices: "Quick Services",
      startApplication: "Start a new scholarship application",
      checkStatus: "Check your application status",
      noNotifications: "No new notifications",

      profile: "Profile Information",
      name: "Student Name",
      studentId: "Student ID",
      category: "Category",
      course: "Course",

      logout: "Logout",
      adminLogin: "Admin Login",
      adminTitle: "Administration Portal",
      adminDescription: "Authorised access for application review and scholarship administration.",
    },
  };

  const t = text[lang];

  const application = applications[0] || null;
  const applicationSubmitted = Boolean(application);
  const applicationId = application?._id || application?.id || application?.applicationId || "";
  const selectedScheme = application?.schemeName || application?.scheme || "-";
  const applicationDate = application?.submittedAt || application?.createdAt || application?.appliedAt;
  const appliedOn = applicationDate ? new Date(applicationDate).toLocaleDateString() : "-";
  const studentName = user.name || localStorage.getItem("studentName") || "Student";
  const studentId = user.studentId || user._id || user.id || localStorage.getItem("studentEmail") || "-";
  const studentCategory = user.category || localStorage.getItem("studentCategory") || "ST";
  const studentCourse = application?.course || user.course || "-";

  return (
    <div className="dashboard-page">

      {/* Top Government Bar */}
      <div className="dashboard-topbar">
        <div className="dashboard-container">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="dashboard-language">

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

      {/* Header */}
      <header className="dashboard-header">

        <div className="dashboard-container dashboard-header-inner">

          <Link to="/" className="dashboard-brand">

            <img className="dashboard-logo" src="/vidyarth-logo.svg" alt="" />

            <div>
              <div className="dashboard-brand-name">
                VIDYARTH
              </div>

              <div className="dashboard-brand-subtitle">
                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}
              </div>
            </div>

          </Link>

          <Link to="/" className="dashboard-home-link">
            {t.home}
          </Link>

        </div>

      </header>

      <nav className="dashboard-nav" aria-label="Main navigation">
        <div className="dashboard-container dashboard-nav-inner">
          <Link to="/">{t.home}</Link>
          <Link to="/schemes">{t.scheme}</Link>
          <Link to="/notices">{lang === "hi" ? "सूचनाएं" : "Notices"}</Link>
          <Link to="/dashboard" className="dashboard-nav-current">{t.dashboard}</Link>
          <Link to="/admin-login" className="dashboard-nav-admin">{t.adminLogin}</Link>
        </div>
      </nav>

      {/* Main */}
      <main className="dashboard-main">

        <div className="dashboard-container dashboard-layout">
          <div className="dashboard-content">

          {/* Welcome */}
          <section className="dashboard-welcome">

            <div>

              <div className="dashboard-breadcrumb">
                {t.home} / {t.dashboard}
              </div>

              <h1>{t.welcome}</h1>

              <p>{t.subtitle}</p>

            </div>

            <div className="student-mini-profile">

              <div className="profile-circle">
                {studentName.charAt(0).toUpperCase()}
              </div>

              <div>
                <strong>{studentName}</strong>
                <span>Student</span>
              </div>

            </div>

          </section>

          {/* Application Status */}
          <section className="dashboard-status-card">

            <div className="status-icon">
              📋
            </div>

            <div className="status-content">

              <span>{t.application}</span>

              <h2>
                {applicationSubmitted
                  ? t.submitted
                  : t.notSubmitted}
              </h2>

              {applicationError && !applicationSubmitted && (
                <p className="dashboard-data-error" role="status">{applicationError}</p>
              )}

              {applicationSubmitted && (
                <div className="application-details">

                  <p>
                    <strong>{t.applicationId}:</strong>{" "}
                    {applicationId}
                  </p>

                  <p>
                    <strong>{t.scheme}:</strong>{" "}
                    {selectedScheme}
                  </p>

                  <p>
                    <strong>{t.appliedOn}:</strong>{" "}
                    {appliedOn}
                  </p>

                </div>
              )}

            </div>

            {!applicationSubmitted && (
              <Link
                to="/apply"
                className="dashboard-primary-btn"
              >
                {t.apply}
              </Link>
            )}

          </section>

          {/* Quick Services */}
          <section className="dashboard-section">

            <h2>{t.quickServices}</h2>

            <div className="dashboard-cards">

              <Link
                to="/apply"
                className="dashboard-card"
              >

                <div className="card-icon">
                  📝
                </div>

                <h3>{t.apply}</h3>

                <p>
                  {t.startApplication}
                </p>

              </Link>

              <Link
                to="/track"
                className="dashboard-card"
              >

                <div className="card-icon">
                  🔎
                </div>

                <h3>{t.track}</h3>

                <p>
                  {t.checkStatus}
                </p>

              </Link>

              <Link
                to="/notifications"
                className="dashboard-card"
              >

                <div className="card-icon">
                  🔔
                </div>

                <h3>{t.notifications}</h3>

                <p>
                  {t.noNotifications}
                </p>

              </Link>

            </div>

          </section>

          {/* Profile */}
          <section className="dashboard-section">

            <h2>{t.profile}</h2>

            <div className="profile-info-card">

              <div className="profile-info">
                <span>{t.name}</span>
                <strong>{studentName}</strong>
              </div>

              <div className="profile-info">
                <span>{t.studentId}</span>
                <strong>{studentId}</strong>
              </div>

              <div className="profile-info">
                <span>{t.category}</span>
                <strong>{studentCategory}</strong>
              </div>

              <div className="profile-info">
                <span>{t.course}</span>
                <strong>{studentCourse}</strong>
              </div>

            </div>

          </section>

          {/* Logout */}
          <div className="dashboard-logout">

            <Link to="/login" onClick={() => localStorage.removeItem("vidyarthToken")}>
              {t.logout}
            </Link>

          </div>

          </div>

          <aside className="dashboard-sidebar">
            <div className="dashboard-admin-panel">
              <div className="dashboard-admin-seal" aria-hidden="true">A</div>
              <span className="dashboard-admin-kicker">{lang === "hi" ? "अधिकृत उपयोगकर्ता" : "AUTHORISED USERS"}</span>
              <h2>{t.adminTitle}</h2>
              <p>{t.adminDescription}</p>
              <Link to="/admin-login" className="dashboard-admin-link">
                {t.adminLogin}<span aria-hidden="true">→</span>
              </Link>
            </div>

            <div className="dashboard-sidebar-note">
              <strong>{lang === "hi" ? "सुरक्षित पहुंच" : "Secure access"}</strong>
              <span>{lang === "hi" ? "प्रशासनिक सेवाएं केवल अधिकृत अधिकारियों के लिए हैं।" : "Administrative services are restricted to authorised officers."}</span>
            </div>
          </aside>

        </div>

      </main>

    <footer className="dashboard-footer">
  © 2026 VIDYARTH
</footer>

    </div>
  );
}

export default Dashboard;

function getStoredUser() {
  try {
    return JSON.parse(localStorage.getItem("vidyarthUser") || "{}");
  } catch {
    return {};
  }
}
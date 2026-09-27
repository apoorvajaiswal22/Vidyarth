import { useState } from "react";
import { Link } from "react-router-dom";
import "./Notifications.css";

function Notifications() {
  const [lang, setLang] = useState("en");
  const [readNotifications, setReadNotifications] = useState([]);

  const text = {
    hi: {
      home: "मुख्य पृष्ठ",
      dashboard: "डैशबोर्ड",
      title: "सूचनाएं",
      subtitle: "आपके आवेदन और छात्रवृत्ति से संबंधित महत्वपूर्ण संदेश।",

      all: "सभी",
      unread: "अपठित",

      verificationTitle: "दस्तावेज़ सत्यापन अपडेट",
      verificationText:
        "आपके द्वारा जमा किए गए दस्तावेज़ सत्यापन के लिए प्राप्त हो गए हैं।",

      correctionTitle: "आवेदन में सुधार आवश्यक",
      correctionText:
        "कृपया अपने आवेदन की जानकारी जांचें और आवश्यक सुधार करें।",

      forwardedTitle: "आवेदन आगे भेजा गया",
      forwardedText:
        "आपका आवेदन संबंधित विभाग को आगे की प्रक्रिया के लिए भेज दिया गया है।",

      scholarshipTitle: "छात्रवृत्ति संबंधी सूचना",
      scholarshipText:
        "छात्रवृत्ति से संबंधित नई जानकारी उपलब्ध है। कृपया पोर्टल पर विवरण देखें।",

      deadlineTitle: "महत्वपूर्ण समय सीमा",
      deadlineText:
        "आवेदन में आवश्यक सुधार निर्धारित समय सीमा के भीतर पूरा करें।",

      newText: "नई",
      markRead: "पढ़ा हुआ करें",
      read: "पढ़ा गया",

      noNotifications: "कोई सूचना उपलब्ध नहीं है।",
      noUnread: "कोई अपठित सूचना नहीं है।",

      backDashboard: "डैशबोर्ड पर जाएं",
    },

    en: {
      home: "Home",
      dashboard: "Dashboard",
      title: "Notifications",
      subtitle:
        "Important messages related to your application and scholarship.",

      all: "All",
      unread: "Unread",

      verificationTitle: "Document Verification Update",
      verificationText:
        "The documents submitted by you have been received for verification.",

      correctionTitle: "Action Required on Application",
      correctionText:
        "Please review your application information and make the required corrections.",

      forwardedTitle: "Application Forwarded",
      forwardedText:
        "Your application has been forwarded to the concerned department for further processing.",

      scholarshipTitle: "Scholarship Information",
      scholarshipText:
        "New information related to the scholarship is available. Please check the portal for details.",

      deadlineTitle: "Important Deadline",
      deadlineText:
        "Complete any required corrections in your application within the specified time.",

      newText: "New",
      markRead: "Mark as Read",
      read: "Read",

      noNotifications: "No notifications available.",
      noUnread: "No unread notifications.",

      backDashboard: "Go to Dashboard",
    },
  };

  const t = text[lang];

  const notifications = [
    {
      id: 1,
      type: "verification",
      title: t.verificationTitle,
      description: t.verificationText,
      date: "26 Sep 2026",
      time: "10:30 AM",
      unread: true,
    },
    {
      id: 2,
      type: "correction",
      title: t.correctionTitle,
      description: t.correctionText,
      date: "25 Sep 2026",
      time: "04:15 PM",
      unread: true,
    },
    {
      id: 3,
      type: "forwarded",
      title: t.forwardedTitle,
      description: t.forwardedText,
      date: "24 Sep 2026",
      time: "11:20 AM",
      unread: false,
    },
    {
      id: 4,
      type: "scholarship",
      title: t.scholarshipTitle,
      description: t.scholarshipText,
      date: "22 Sep 2026",
      time: "02:45 PM",
      unread: false,
    },
    {
      id: 5,
      type: "deadline",
      title: t.deadlineTitle,
      description: t.deadlineText,
      date: "20 Sep 2026",
      time: "09:00 AM",
      unread: false,
    },
  ];

  const markAsRead = (id) => {
    if (!readNotifications.includes(id)) {
      setReadNotifications((prev) => [...prev, id]);
    }
  };

  const unreadCount = notifications.filter(
    (notification) =>
      notification.unread &&
      !readNotifications.includes(notification.id)
  ).length;

  const visibleNotifications = notifications;

  return (
    <div className="notifications-page">

      {/* TOP BAR */}
      <div className="notifications-topbar">
        <div className="notifications-container notifications-topbar-inner">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="notifications-language">

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
      <header className="notifications-header">

        <div className="notifications-container notifications-header-inner">

          <Link to="/" className="notifications-brand">

            <div className="notifications-logo">
              V
            </div>

            <div>

              <div className="notifications-brand-name">
                VIDYARTH
              </div>

              <div className="notifications-brand-subtitle">
                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}
              </div>

            </div>

          </Link>

          <Link
            to="/dashboard"
            className="notifications-dashboard-link"
          >
            {t.dashboard}
          </Link>

        </div>

      </header>

      {/* MAIN */}
      <main className="notifications-main">

        <div className="notifications-container">

          {/* BREADCRUMB */}
          <div className="notifications-breadcrumb">

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

          {/* HEADING */}
          <section className="notifications-heading">

            <div>
              <h1>{t.title}</h1>

              <p>{t.subtitle}</p>
            </div>

            {unreadCount > 0 && (
              <div className="unread-count">
                {unreadCount} {t.newText}
              </div>
            )}

          </section>

          {/* FILTER */}
          <div className="notification-tabs">

            <button className="active">
              {t.all}
              <span>{notifications.length}</span>
            </button>

            <button>
              {t.unread}
              <span>{unreadCount}</span>
            </button>

          </div>

          {/* NOTIFICATION LIST */}
          {visibleNotifications.length > 0 ? (

            <section className="notifications-list">

              {visibleNotifications.map((notification) => {

                const isRead =
                  readNotifications.includes(notification.id);

                return (
                  <div
                    className={`notification-card ${
                      isRead || !notification.unread
                        ? "read"
                        : "unread"
                    }`}
                    key={notification.id}
                  >

                    <div
                      className={`notification-icon ${notification.type}`}
                    >
                      {notification.type === "verification" && "✓"}
                      {notification.type === "correction" && "!"}
                      {notification.type === "forwarded" && "→"}
                      {notification.type === "scholarship" && "₹"}
                      {notification.type === "deadline" && "!"}
                    </div>

                    <div className="notification-content">

                      <div className="notification-title-row">

                        <h2>
                          {notification.title}
                        </h2>

                        {notification.unread && !isRead && (
                          <span className="notification-new">
                            {t.newText}
                          </span>
                        )}

                      </div>

                      <p>
                        {notification.description}
                      </p>

                      <div className="notification-meta">

                        <span>
                          {notification.date}
                        </span>

                        <span>•</span>

                        <span>
                          {notification.time}
                        </span>

                      </div>

                    </div>

                    <div className="notification-action">

                      {notification.unread && !isRead ? (
                        <button
                          onClick={() =>
                            markAsRead(notification.id)
                          }
                        >
                          {t.markRead}
                        </button>
                      ) : (
                        <span className="read-label">
                          {t.read}
                        </span>
                      )}

                    </div>

                  </div>
                );
              })}

            </section>

          ) : (

            <section className="notifications-empty">

              <div className="notifications-empty-icon">
                🔔
              </div>

              <h2>
                {t.noNotifications}
              </h2>

              <p>
                {t.noUnread}
              </p>

            </section>

          )}

          {/* BACK */}
          <div className="notifications-bottom">

            <Link
              to="/dashboard"
              className="notifications-back-btn"
            >
              ← {t.backDashboard}
            </Link>

          </div>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="notifications-footer">

        © 2026 VIDYARTH |{" "}

        {lang === "hi"
          ? "जनजातीय छात्रों के लिए छात्रवृत्ति एवं फेलोशिप पोर्टल"
          : "Scholarship & Fellowship Portal for Tribal Students"}

      </footer>

    </div>
  );
}

export default Notifications;
import { Link } from "react-router-dom";
import { useState } from "react";
import "./Notices.css";

function Notices() {
  const [lang, setLang] = useState("en");

  const content = {
    en: {
      gov: "Government of India",
      ministry: "Ministry of Tribal Affairs",
      back: "← Back to Home",
      home: "Home",
      notices: "Notices",
      label: "PORTAL INFORMATION",
      title: "Notices & Announcements",
      subtitle:
        "Important information, application instructions and portal updates for students.",
      read: "Read More →",
      latest: "Latest",
      footer:
        "© 2026 VIDYARTH | Scholarship & Fellowship Management System",

      data: [
        {
          id: "1",
          day: "26",
          month: "SEP 2026",
          type: "APPLICATION",
          title: "Scholarship Application Information",
          text:
            "Students are advised to check the eligibility conditions, scheme requirements and required documents before starting their scholarship application.",
        },
        {
          id: "2",
          day: "20",
          month: "SEP 2026",
          type: "GUIDELINE",
          title: "Important Guidelines for Applicants",
          text:
            "Applicants should ensure that all information entered in the application form matches the supporting certificates and academic records.",
        },
        {
          id: "3",
          day: "15",
          month: "SEP 2026",
          type: "DOCUMENT",
          title: "Document Submission Requirements",
          text:
            "Students must upload valid academic and category-related documents in the prescribed format while completing their application.",
        },
        {
          id: "4",
          day: "10",
          month: "SEP 2026",
          type: "PORTAL",
          title: "Application Status and Tracking",
          text:
            "Applicants can use the application tracking facility to view the current stage and status of their submitted scholarship application.",
        },
      ],
    },

    hi: {
      gov: "भारत सरकार",
      ministry: "जनजातीय कार्य मंत्रालय",
      back: "← होम पर वापस जाएँ",
      home: "होम",
      notices: "सूचनाएँ",
      label: "पोर्टल जानकारी",
      title: "सूचनाएँ एवं घोषणाएँ",
      subtitle:
        "छात्रों के लिए महत्वपूर्ण जानकारी, आवेदन निर्देश और पोर्टल अपडेट।",
      read: "विस्तार से देखें →",
      latest: "नवीनतम",

      footer:
        "© 2026 VIDYARTH | छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली",

      data: [
        {
          id: "1",
          day: "26",
          month: "सितंबर 2026",
          type: "आवेदन",
          title: "छात्रवृत्ति आवेदन संबंधी जानकारी",
          text:
            "छात्रों को सलाह दी जाती है कि छात्रवृत्ति आवेदन शुरू करने से पहले पात्रता शर्तों, योजना की आवश्यकताओं और जरूरी दस्तावेजों की जाँच करें।",
        },
        {
          id: "2",
          day: "20",
          month: "सितंबर 2026",
          type: "दिशा-निर्देश",
          title: "आवेदकों के लिए महत्वपूर्ण दिशा-निर्देश",
          text:
            "आवेदकों को यह सुनिश्चित करना चाहिए कि आवेदन में दर्ज सभी जानकारी संबंधित प्रमाण-पत्रों और शैक्षणिक अभिलेखों से मेल खाती हो।",
        },
        {
          id: "3",
          day: "15",
          month: "सितंबर 2026",
          type: "दस्तावेज",
          title: "दस्तावेज जमा करने संबंधी आवश्यकताएँ",
          text:
            "आवेदन पूरा करते समय छात्रों को वैध शैक्षणिक एवं श्रेणी संबंधी दस्तावेज निर्धारित प्रारूप में अपलोड करने होंगे।",
        },
        {
          id: "4",
          day: "10",
          month: "सितंबर 2026",
          type: "पोर्टल",
          title: "आवेदन स्थिति एवं ट्रैकिंग",
          text:
            "आवेदक आवेदन ट्रैकिंग सुविधा के माध्यम से अपने जमा किए गए छात्रवृत्ति आवेदन की वर्तमान स्थिति देख सकते हैं।",
        },
      ],
    },
  };

  const t = content[lang];

  return (
    <div className="notices-page">

      <div className="notices-govbar">
        <div className="notices-container govbar-inner">
          <span>
            {t.gov} <b>|</b> {t.ministry}
          </span>

          <div className="notice-language">
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              English
            </button>

            <span>|</span>

            <button
              className={lang === "hi" ? "active" : ""}
              onClick={() => setLang("hi")}
            >
              हिंदी
            </button>
          </div>
        </div>
      </div>

      <header className="notices-header">
        <div className="notices-container header-row">

          <Link to="/" className="notices-brand">
            <div className="notices-logo">V</div>

            <section>
              <strong>VIDYARTH</strong>
              <small>
                {lang === "en"
                  ? "Scholarship & Fellowship Management System"
                  : "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"}
              </small>
            </section>
          </Link>

          <Link to="/" className="notice-back">
            {t.back}
          </Link>

        </div>
      </header>

      <main className="notices-container notices-main">

        <div className="notice-breadcrumb">
          <Link to="/">{t.home}</Link>
          <span>›</span>
          <span>{t.notices}</span>
        </div>

        <div className="notice-heading">
          <span>{t.label}</span>

          <h1>{t.title}</h1>

          <p>{t.subtitle}</p>
        </div>

        <div className="notice-list">

          {t.data.map((notice, index) => (
            <article
              className={`notice-card ${
                index === 0 ? "latest-notice" : ""
              }`}
              key={notice.id}
            >

              <div className="notice-date">
                <strong>{notice.day}</strong>
                <span>{notice.month}</span>
              </div>

              <div className="notice-info">

                <div className="notice-topline">
                  <span className="notice-type">
                    {notice.type}
                  </span>

                  {index === 0 && (
                    <span className="latest-badge">
                      {t.latest}
                    </span>
                  )}
                </div>

                <h2>{notice.title}</h2>

                <p>{notice.text}</p>

                <Link
                  to={`/notices/${notice.id}`}
                  className="notice-read"
                >
                  {t.read}
                </Link>

              </div>

            </article>
          ))}

        </div>

        <div className="notice-bottom-info">
          <strong>
            {lang === "en"
              ? "Important"
              : "महत्वपूर्ण"}
          </strong>

          <p>
            {lang === "en"
              ? "Students should regularly check the portal for application-related instructions, scheme updates and important announcements."
              : "छात्रों को आवेदन संबंधी निर्देशों, योजना अपडेट और महत्वपूर्ण घोषणाओं के लिए पोर्टल को नियमित रूप से देखना चाहिए।"}
          </p>
        </div>

      </main>

      <footer className="notices-footer">
        <div className="notices-container">
          {t.footer}
        </div>
      </footer>

    </div>
  );
}

export default Notices;
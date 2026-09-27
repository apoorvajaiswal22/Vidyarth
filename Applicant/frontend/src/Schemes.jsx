import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getSchemes } from "./api/api";
import "./Schemes.css";

const translations = {
  en: {
    gov: "Government of India",
    ministry: "Ministry of Tribal Affairs",
    portal: "Scholarship & Fellowship Management System",

    home: "Home",
    schemes: "Scholarship & Fellowship Schemes",

    title: "Scholarship & Fellowship Schemes",
    subtitle:
      "Explore scholarship and fellowship opportunities available for eligible Scheduled Tribe students.",

    postMatric: "Post-Matric Scholarship",
    postMatricType: "SCHOLARSHIP",
    postMatricText:
      "Financial assistance for eligible ST students pursuing post-matriculation studies.",

    preMatric: "Pre-Matric Scholarship",
    preMatricText:
      "Support for eligible Scheduled Tribe students in Classes IX and X, subject to the current scheme guidelines.",

    topClass: "Top Class Education Scholarship",
    topClassText:
      "Education support for eligible ST students admitted to institutions notified under the current scheme guidelines.",

    fellowship: "National Fellowship",
    fellowshipType: "FELLOWSHIP",
    fellowshipText:
      "Fellowship support for eligible ST students pursuing research and advanced academic programmes.",

    overseas: "National Overseas Scholarship",
    overseasType: "SCHOLARSHIP",
    overseasText:
      "Financial assistance for selected ST students pursuing higher education abroad.",

    viewDetails: "View Details",
    apply: "Apply Now",

    noteTitle: "Before You Apply",
    noteText:
      "Please read the eligibility conditions, required documents and application guidelines of the selected scheme before applying.",

    backHome: "Back to Home",

    footerText: "Scholarship & Fellowship Management System",
  },

  hi: {
    gov: "भारत सरकार",
    ministry: "जनजातीय कार्य मंत्रालय",
    portal: "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली",

    home: "मुखपृष्ठ",
    schemes: "छात्रवृत्ति एवं फेलोशिप योजनाएं",

    title: "छात्रवृत्ति एवं फेलोशिप योजनाएं",
    subtitle:
      "पात्र अनुसूचित जनजाति विद्यार्थियों के लिए उपलब्ध छात्रवृत्ति एवं फेलोशिप अवसरों की जानकारी प्राप्त करें।",

    postMatric: "पोस्ट-मैट्रिक छात्रवृत्ति",
    postMatricType: "छात्रवृत्ति",
    postMatricText:
      "मैट्रिक के बाद की पढ़ाई कर रहे पात्र अनुसूचित जनजाति विद्यार्थियों के लिए वित्तीय सहायता।",

    preMatric: "प्री-मैट्रिक छात्रवृत्ति",
    preMatricText:
      "वर्तमान योजना दिशानिर्देशों के अधीन कक्षा 9 और 10 के पात्र अनुसूचित जनजाति विद्यार्थियों के लिए सहायता।",

    topClass: "टॉप क्लास शिक्षा छात्रवृत्ति",
    topClassText:
      "वर्तमान योजना दिशानिर्देशों के अंतर्गत अधिसूचित संस्थानों में प्रवेश पाने वाले पात्र ST विद्यार्थियों के लिए शिक्षा सहायता।",

    fellowship: "राष्ट्रीय फेलोशिप",
    fellowshipType: "फेलोशिप",
    fellowshipText:
      "शोध एवं उच्च शैक्षणिक कार्यक्रमों में अध्ययन कर रहे पात्र अनुसूचित जनजाति विद्यार्थियों के लिए फेलोशिप सहायता।",

    overseas: "राष्ट्रीय विदेशी छात्रवृत्ति",
    overseasType: "छात्रवृत्ति",
    overseasText:
      "विदेश में उच्च शिक्षा प्राप्त करने वाले चयनित अनुसूचित जनजाति विद्यार्थियों के लिए वित्तीय सहायता।",

    viewDetails: "विवरण देखें",
    apply: "अभी आवेदन करें",

    noteTitle: "आवेदन करने से पहले",
    noteText:
      "आवेदन करने से पहले संबंधित योजना की पात्रता, आवश्यक दस्तावेज और आवेदन दिशानिर्देश ध्यानपूर्वक पढ़ें।",

    backHome: "मुखपृष्ठ पर जाएं",

    footerText: "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली",
  },
};

const schemes = [
  {
    id: "pre-matric",
    number: "01",
    icon: "₹",
    titleKey: "preMatric",
    typeKey: "postMatricType",
    textKey: "preMatricText",
  },
  {
    id: "post-matric",
    number: "02",
    icon: "₹",
    titleKey: "postMatric",
    typeKey: "postMatricType",
    textKey: "postMatricText",
  },
  {
    id: "top-class",
    number: "03",
    icon: "▣",
    titleKey: "topClass",
    typeKey: "postMatricType",
    textKey: "topClassText",
  },
  {
    id: "national-fellowship",
    number: "04",
    icon: "◆",
    titleKey: "fellowship",
    typeKey: "fellowshipType",
    textKey: "fellowshipText",
  },
  {
    id: "national-overseas",
    number: "05",
    icon: "◎",
    titleKey: "overseas",
    typeKey: "overseasType",
    textKey: "overseasText",
  },
];

function getSchemeSlug(record) {
  const identity = [
    record?.slug,
    record?.schemeCode,
    record?.scheme_code,
    record?.schemeName,
    record?.scheme_name,
    record?.name,
    record?.title,
  ].filter(Boolean).join(" ").toLowerCase();

  if (identity.includes("pre") && identity.includes("matric")) return "pre-matric";
  if (identity.includes("post") && identity.includes("matric")) return "post-matric";
  if (identity.includes("top") && identity.includes("class")) return "top-class";
  if (identity.includes("fellowship")) return "national-fellowship";
  if (identity.includes("overseas")) return "national-overseas";
  return "";
}

function getSchemeRecords(response) {
  const data = response?.data ?? response;
  if (Array.isArray(data)) return data;
  return data?.schemes || data?.items || [];
}

function Schemes() {
  const [lang, setLang] = useState("en");
  const [backendSchemes, setBackendSchemes] = useState([]);
  const [backendUnavailable, setBackendUnavailable] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    let active = true;
    getSchemes()
      .then((response) => {
        if (active) setBackendSchemes(getSchemeRecords(response));
      })
      .catch(() => {
        if (active) setBackendUnavailable(true);
      });
    return () => { active = false; };
  }, []);

  const schemeBySlug = new Map(schemes.map((scheme) => [scheme.id, scheme]));
  const serverCards = backendSchemes
    .map((record) => {
      const baseCard = schemeBySlug.get(getSchemeSlug(record));
      return baseCard ? { ...baseCard, backendRecord: record } : null;
    })
    .filter(Boolean);
  const displayedSchemes = serverCards.length > 0 ? serverCards : schemes;

  return (
    <div className="schemes-page">

      <div className="schemes-govbar">
        <div className="schemes-container schemes-gov-inner">

          <span>
            {t.gov} <b>|</b> {t.ministry}
          </span>

          <div className="schemes-language">
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

      <header className="schemes-header">
        <div className="schemes-container schemes-header-inner">

          <Link to="/" className="schemes-brand">

            <div className="schemes-brand-mark">
              V
            </div>

            <div>
              <div className="schemes-brand-name">
                VIDYARTH
              </div>

              <div className="schemes-brand-subtitle">
                {t.portal}
              </div>
            </div>

          </Link>

          <Link to="/" className="schemes-home-link">
            ← {t.home}
          </Link>

        </div>
      </header>

      <main>

        <div className="schemes-container">

          <div className="schemes-breadcrumb">
            <Link to="/">{t.home}</Link>
            <span>/</span>
            <span>{t.schemes}</span>
          </div>

          <section className="schemes-intro">

            <span className="schemes-tag">
              SCHOLARSHIP PORTAL
            </span>

            <h1>{t.title}</h1>

            <p>{t.subtitle}</p>

          </section>

          <section className="scheme-list">

            {backendUnavailable && (
              <p className="scheme-api-warning" role="status">
                {lang === "hi"
                  ? "योजना सेवा अभी उपलब्ध नहीं है; आधिकारिक योजना सूची दिखाई जा रही है।"
                  : "The scheme service is unavailable; showing the official scheme catalogue."}
              </p>
            )}

            {displayedSchemes.map((scheme) => (

              <article
                className="scheme-list-card"
                key={scheme.id}
              >

                <div className="scheme-card-number">
                  {scheme.number}
                </div>

                <div className="scheme-card-icon">
                  {scheme.icon}
                </div>

                <div className="scheme-card-content">

                  <div className="scheme-card-type">
                    {t[scheme.typeKey]}
                  </div>

                  <h2>
                    {lang === "en"
                      ? scheme.backendRecord?.name || scheme.backendRecord?.schemeName || scheme.backendRecord?.scheme_name || t[scheme.titleKey]
                      : t[scheme.titleKey]}
                  </h2>

                  <p>
                    {lang === "en"
                      ? scheme.backendRecord?.description || scheme.backendRecord?.summary || t[scheme.textKey]
                      : t[scheme.textKey]}
                  </p>

                  <Link
                    to={`/schemes/${scheme.id}`}
                    className="scheme-details-btn"
                  >
                    {t.viewDetails}
                    <span>→</span>
                  </Link>

                </div>

              </article>

            ))}

          </section>

          <section className="scheme-note">

            <div className="scheme-note-icon">
              !
            </div>

            <div>
              <h3>{t.noteTitle}</h3>
              <p>{t.noteText}</p>
            </div>

          </section>

        </div>

      </main>

      <footer className="schemes-footer">

        <div className="schemes-container">

          <strong>VIDYARTH</strong>

          <span>
            {t.ministry}
          </span>

          <p>
            © 2026 VIDYARTH | {t.footerText}
          </p>

        </div>

      </footer>

    </div>
  );
}

export default Schemes;
import { useState } from "react";
import { Link } from "react-router-dom";
import "./About.css";

function About() {
  const [lang, setLang] = useState("en");

  const text = {
    hi: {
      home: "मुख्य पृष्ठ",
      about: "हमारे बारे में",
      title: "VIDYARTH के बारे में",
      subtitle:
        "जनजातीय कार्य मंत्रालय की छात्रवृत्ति एवं फेलोशिप प्रक्रियाओं के लिए आवेदक और प्रशासन को जोड़ने वाला एकीकृत डिजिटल मंच।",

      introTitle: "VIDYARTH क्या है?",
      intro:
        "VIDYARTH का उद्देश्य अनुसूचित जनजाति विद्यार्थियों के लिए पंजीकरण, आवेदन, दस्तावेज़ जमा करना, पात्रता जांच, सत्यापन, चयन और चयन के बाद की निगरानी को एक साझा प्रक्रिया में जोड़ना है।",

      purposeTitle: "हमारा उद्देश्य",
      purpose:
        "यह प्रणाली बार-बार होने वाली मैनुअल जांच और पत्राचार कम करने, कमियों को जल्दी बताने और आवेदक तथा अधिकारियों को आवेदन की प्रगति स्पष्ट दिखाने के लिए बनाई जा रही है। योजना-विशिष्ट नियम और दस्तावेज़ नवीनतम अधिसूचना के अनुसार लागू होने चाहिए।",

      featuresTitle: "एंड-टू-एंड प्रणाली का दायरा",

      feature1Title: "आवेदक कार्यप्रवाह",
      feature1:
        "पंजीकरण, योजना चयन, आवेदन विवरण और सहायक दस्तावेज़ एक ही प्रक्रिया में जमा किए जाते हैं।",

      feature2Title: "योजना-विशिष्ट पात्रता",
      feature2:
        "अलग-अलग योजनाओं की पात्रता और दस्तावेज़ शर्तों के अनुसार प्रारंभिक जांच की जा सकती है; अंतिम पात्रता अधिकारी तय करते हैं।",

      feature3Title: "दस्तावेज़ और OCR तैयारी",
      feature3:
        "दस्तावेज़ जमा और सत्यापन कार्यप्रवाह उपलब्ध है। OCR/AI दस्तावेज़ पहचान के लिए अलग सेवा जोड़नी होगी; इस बिल्ड में OCR सक्रिय नहीं है।",

      feature4Title: "मानव समीक्षा और चयन",
      feature4:
        "अधिकारी कमी दर्ज कर सकते हैं, स्थिति बदल सकते हैं और ऑडिट इतिहास देख सकते हैं। AI सहायता किसी मानव निर्णय का स्थान नहीं लेती।",

      feature5Title: "कमी और पुनः-जमा",
      feature5: "आवेदक दर्ज की गई कमी देख सकते हैं और उसी आवेदन में संशोधित दस्तावेज़ फिर से जमा कर सकते हैं।",

      feature6Title: "प्रशासनिक निगरानी",
      feature6: "डैशबोर्ड आवेदन स्थिति और योजना के अनुसार कार्यभार दिखाता है तथा आवेदन बदलावों का ऑडिट इतिहास उपलब्ध कराता है।",

      studentTitle: "सुरक्षित और पारदर्शी प्रक्रिया",
      studentText:
        "स्वीकृत योजना नियम, अधिकृत अधिकारी की समीक्षा और स्पष्ट आवेदन स्थिति इस प्रणाली के मुख्य सिद्धांत हैं। अंतिम चयन और लाभ नवीनतम सरकारी दिशानिर्देशों तथा मानव समीक्षा के अधीन हैं।",

      homeButton: "मुख्य पृष्ठ पर जाएं",
      applyButton: "आवेदन करें",
    },

    en: {
      home: "Home",
      about: "About Us",
      title: "About VIDYARTH",
      subtitle:
        "An integrated digital platform connecting applicants and administrators across Ministry of Tribal Affairs scholarship and fellowship workflows.",

      introTitle: "What is VIDYARTH?",
      intro:
        "VIDYARTH is designed to bring registration, application submission, document intake, eligibility checks, verification, selection communication and post-selection monitoring into one shared workflow for Scheduled Tribe students.",

      purposeTitle: "Our Purpose",
      purpose:
        "The platform aims to reduce repeated manual checks and correspondence, surface deficiencies earlier and give applicants and officials clearer application progress. Scheme-specific rules and required documents must follow the latest official notification.",

      featuresTitle: "End-to-End System Scope",

      feature1Title: "Applicant Workflow",
      feature1:
        "Registration, scheme selection, application details and supporting documents are handled in one guided workflow.",

      feature2Title: "Scheme-Specific Eligibility",
      feature2:
        "Preliminary checks can use different scheme criteria and document requirements; officials make the final eligibility decision.",

      feature3Title: "Documents and OCR Readiness",
      feature3:
        "Document submission and scrutiny workflows are available. OCR/AI document intelligence needs a connected service and is not active in this build.",

      feature4Title: "Human Review and Selection",
      feature4:
        "Officials can record deficiencies, update status and review audit history. AI assistance does not replace human decisions.",

      feature5Title: "Deficiency and Resubmission",
      feature5: "Applicants can review a recorded deficiency and upload corrected documents to the same application.",

      feature6Title: "Administrative Monitoring",
      feature6: "The dashboard reports application workload by status and scheme and exposes an audit history of application changes.",

      studentTitle: "A Secure and Transparent Process",
      studentText:
        "Approved scheme rules, authorised-officer review and clear application status are core principles. Final selection and awards remain subject to current government guidelines and human scrutiny.",

      homeButton: "Go to Home",
      applyButton: "Apply Now",
    },
  };

  const t = text[lang];

  return (
    <div className="about-page">

      {/* TOP BAR */}
      <div className="about-topbar">
        <div className="about-container about-topbar-inner">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="about-language">

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
      <header className="about-header">

        <div className="about-container about-header-inner">

          <Link to="/" className="about-brand">

            <div className="about-logo">
              V
            </div>

            <div>
              <div className="about-brand-name">
                VIDYARTH
              </div>

              <div className="about-brand-subtitle">
                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}
              </div>
            </div>

          </Link>

          <Link to="/" className="about-home-link">
            {t.home}
          </Link>

        </div>

      </header>

      {/* MAIN */}
      <main className="about-main">

        <div className="about-container">

          {/* BREADCRUMB */}
          <div className="about-breadcrumb">

            <Link to="/">
              {t.home}
            </Link>

            <span>/</span>

            <span>
              {t.about}
            </span>

          </div>

          {/* PAGE TITLE */}
          <section className="about-title-section">

            <h1>
              {t.title}
            </h1>

            <p>
              {t.subtitle}
            </p>

          </section>

          {/* INTRO */}
          <section className="about-content-card">

            <h2>
              {t.introTitle}
            </h2>

            <p>
              {t.intro}
            </p>

          </section>

          {/* PURPOSE */}
          <section className="about-content-card">

            <h2>
              {t.purposeTitle}
            </h2>

            <p>
              {t.purpose}
            </p>

          </section>

          {/* FEATURES */}
          <section className="about-features">

            <div className="about-section-heading">
              <h2>
                {t.featuresTitle}
              </h2>
            </div>

            <div className="about-feature-grid">

              <div className="about-feature-card">

                <div className="about-feature-number">
                  01
                </div>

                <h3>
                  {t.feature1Title}
                </h3>

                <p>
                  {t.feature1}
                </p>

              </div>

              <div className="about-feature-card">

                <div className="about-feature-number">
                  02
                </div>

                <h3>
                  {t.feature2Title}
                </h3>

                <p>
                  {t.feature2}
                </p>

              </div>

              <div className="about-feature-card">

                <div className="about-feature-number">
                  03
                </div>

                <h3>
                  {t.feature3Title}
                </h3>

                <p>
                  {t.feature3}
                </p>

              </div>

              <div className="about-feature-card">

                <div className="about-feature-number">
                  04
                </div>

                <h3>
                  {t.feature4Title}
                </h3>

                <p>
                  {t.feature4}
                </p>

              </div>

              <div className="about-feature-card">
                <div className="about-feature-number">05</div>
                <h3>{t.feature5Title}</h3>
                <p>{t.feature5}</p>
              </div>

              <div className="about-feature-card">
                <div className="about-feature-number">06</div>
                <h3>{t.feature6Title}</h3>
                <p>{t.feature6}</p>
              </div>

            </div>

          </section>

          {/* STUDENT SECTION */}
          <section className="about-student-section">

            <div>
              <h2>
                {t.studentTitle}
              </h2>

              <p>
                {t.studentText}
              </p>
            </div>

            <div className="about-actions">

              <Link
                to="/"
                className="about-secondary-btn"
              >
                {t.homeButton}
              </Link>

              <Link
                to="/apply"
                className="about-primary-btn"
              >
                {t.applyButton}
              </Link>

            </div>

          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="about-footer">

        © 2026 VIDYARTH |{" "}

        {lang === "hi"
          ? "जनजातीय छात्रों के लिए छात्रवृत्ति एवं फेलोशिप पोर्टल"
          : "Scholarship & Fellowship Portal for Tribal Students"}

      </footer>

    </div>
  );
}

export default About;
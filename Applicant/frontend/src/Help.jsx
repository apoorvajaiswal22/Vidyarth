import { useState } from "react";
import { Link } from "react-router-dom";
import "./Help.css";

function Help() {
  const [lang, setLang] = useState("en");
  const [openFaq, setOpenFaq] = useState(null);

  const content = {
    en: {
      title: "Help & Frequently Asked Questions",
      subtitle:
        "Find answers to common questions related to registration, applications and scholarship services.",
      home: "Home",
      help: "Help & FAQ",
      faqs: [
        {
          q: "How can I register on the portal?",
          a: "Click on New Registration from the Student section and complete the required personal, contact, address and academic details.",
        },
        {
          q: "How can I apply for a scholarship?",
          a: "First create an account and login to the portal. From your dashboard, select the appropriate scholarship scheme and complete the application form.",
        },
        {
          q: "What documents are required?",
          a: "The required documents may include identity proof, caste certificate, academic marksheets and other documents depending on the selected scheme.",
        },
        {
          q: "How can I check my application status?",
          a: "Use the Track Application option to view the current status of your submitted application.",
        },
        {
          q: "Can I apply for more than one scheme?",
          a: "Eligibility and application rules depend on the individual scholarship scheme. Please check the scheme details before applying.",
        },
        {
          q: "What should I do if I face a problem while applying?",
          a: "Check the application details and required documents first. If the issue continues, contact the concerned support or helpdesk.",
        },
      ],
      contactTitle: "Need More Help?",
      contactText:
        "For further assistance, please contact the concerned scholarship support/helpdesk.",
      back: "Back to Home",
    },

    hi: {
      title: "सहायता एवं अक्सर पूछे जाने वाले प्रश्न",
      subtitle:
        "पंजीकरण, आवेदन और छात्रवृत्ति सेवाओं से संबंधित सामान्य प्रश्नों के उत्तर यहां प्राप्त करें।",
      home: "होम",
      help: "सहायता एवं FAQ",
      faqs: [
        {
          q: "मैं पोर्टल पर पंजीकरण कैसे कर सकता/सकती हूं?",
          a: "Student सेक्शन में New Registration पर क्लिक करें और आवश्यक व्यक्तिगत, संपर्क, पता एवं शैक्षणिक जानकारी भरें।",
        },
        {
          q: "मैं छात्रवृत्ति के लिए आवेदन कैसे कर सकता/सकती हूं?",
          a: "सबसे पहले अपना अकाउंट बनाएं और लॉगिन करें। Dashboard से उपयुक्त छात्रवृत्ति योजना चुनकर आवेदन पूरा करें।",
        },
        {
          q: "कौन-कौन से दस्तावेज आवश्यक हैं?",
          a: "योजना के अनुसार पहचान प्रमाण, जाति प्रमाण पत्र, शैक्षणिक अंकतालिका और अन्य दस्तावेज आवश्यक हो सकते हैं।",
        },
        {
          q: "मैं अपने आवेदन की स्थिति कैसे देख सकता/सकती हूं?",
          a: "अपने जमा किए गए आवेदन की वर्तमान स्थिति देखने के लिए Track Application विकल्प का उपयोग करें।",
        },
        {
          q: "क्या मैं एक से अधिक योजनाओं के लिए आवेदन कर सकता/सकती हूं?",
          a: "यह संबंधित छात्रवृत्ति योजना की पात्रता और नियमों पर निर्भर करता है। आवेदन से पहले योजना की जानकारी देखें।",
        },
        {
          q: "आवेदन करते समय समस्या आने पर क्या करें?",
          a: "पहले आवेदन की जानकारी और आवश्यक दस्तावेज जांचें। समस्या बनी रहने पर संबंधित सहायता/हेल्पडेस्क से संपर्क करें।",
        },
      ],
      contactTitle: "और सहायता चाहिए?",
      contactText:
        "अधिक सहायता के लिए संबंधित छात्रवृत्ति सहायता/हेल्पडेस्क से संपर्क करें।",
      back: "होम पर वापस जाएं",
    },
  };

  const t = content[lang];

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="help-page">

      {/* Government Bar */}
      <div className="help-govbar">
        <div className="help-container help-gov-inner">
          <span>Government of India | Ministry of Tribal Affairs</span>

          <div className="help-language">
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

      {/* Header */}
      <header className="help-header">
        <div className="help-container help-header-row">

          <div className="help-brand">
            <div className="help-logo">V</div>

            <div>
              <h1>VIDYARTH</h1>
              <p>Scholarship & Fellowship Portal</p>
            </div>
          </div>

          <Link to="/" className="help-back">
            ← {t.back}
          </Link>

        </div>
      </header>

      {/* Main */}
      <main className="help-main help-container">

        {/* Breadcrumb */}
        <div className="help-breadcrumb">
          <Link to="/">{t.home}</Link>
          <span> / </span>
          <span>{t.help}</span>
        </div>

        {/* Heading */}
        <section className="help-heading">
          <h2>{t.title}</h2>
          <p>{t.subtitle}</p>
        </section>

        {/* FAQ */}
        <section className="faq-section">

          <div className="faq-list">
            {t.faqs.map((faq, index) => (
              <div
                className={`faq-item ${
                  openFaq === index ? "faq-open" : ""
                }`}
                key={index}
              >
                <button
                  className="faq-question"
                  onClick={() => toggleFaq(index)}
                >
                  <span>{faq.q}</span>

                  <span className="faq-icon">
                    {openFaq === index ? "−" : "+"}
                  </span>
                </button>

                {openFaq === index && (
                  <div className="faq-answer">
                    <p>{faq.a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

        </section>

        {/* More Help */}
        <section className="help-contact">
          <h3>{t.contactTitle}</h3>
          <p>{t.contactText}</p>

          <div className="help-contact-box">
            <div>
              <strong>Scholarship Helpdesk</strong>
              <span>For application and scheme related queries</span>
            </div>

            <div>
              <strong>Portal Support</strong>
              <span>For technical and login related assistance</span>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="help-footer">
        <div className="help-container">

          <div className="help-footer-links">
            <Link to="/">{t.home}</Link>
            <Link to="/schemes">Schemes</Link>
            <Link to="/notices">Notices</Link>
            <Link to="/register">Registration</Link>
            <Link to="/login">Login</Link>
          </div>

          <p>
            © 2026 VIDYARTH Scholarship & Fellowship Portal
          </p>

        </div>
      </footer>

    </div>
  );
}

export default Help;
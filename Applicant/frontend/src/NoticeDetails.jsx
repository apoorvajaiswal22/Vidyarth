import { Link, useParams } from "react-router-dom";
import { useState } from "react";
import "./NoticeDetails.css";

function NoticeDetails() {
  const { noticeId } = useParams();
  const [lang, setLang] = useState("en");

  const noticeData = {
    "1": {
      en: {
        type: "APPLICATION",
        date: "26 September 2026",
        title: "Scholarship Application Information",
        intro:
          "Students are advised to review the scholarship requirements carefully before beginning their application.",
        sections: [
          {
            title: "Before Applying",
            items: [
              "Check the eligibility requirements of the selected scholarship scheme.",
              "Keep the required academic and category-related documents ready.",
              "Ensure that the personal and academic information entered is correct.",
              "Use an active mobile number and email address for communication.",
            ],
          },
          {
            title: "Application Process",
            items: [
              "Create an account on the VIDYARTH portal.",
              "Complete the required student and academic details.",
              "Select the scholarship scheme for which you are eligible.",
              "Upload the required supporting documents.",
              "Review the complete application before final submission.",
            ],
          },
        ],
        note:
          "Applicants should carefully verify their information before submitting the application.",
      },

      hi: {
        type: "आवेदन",
        date: "26 सितंबर 2026",
        title: "छात्रवृत्ति आवेदन संबंधी जानकारी",
        intro:
          "छात्रों को आवेदन शुरू करने से पहले छात्रवृत्ति की आवश्यकताओं और पात्रता शर्तों की सावधानीपूर्वक जाँच करने की सलाह दी जाती है।",
        sections: [
          {
            title: "आवेदन से पहले",
            items: [
              "चयनित छात्रवृत्ति योजना की पात्रता शर्तों की जाँच करें।",
              "आवश्यक शैक्षणिक और श्रेणी संबंधी दस्तावेज तैयार रखें।",
              "व्यक्तिगत एवं शैक्षणिक जानकारी सही दर्ज करें।",
              "संचार के लिए सक्रिय मोबाइल नंबर और ईमेल का उपयोग करें।",
            ],
          },
          {
            title: "आवेदन प्रक्रिया",
            items: [
              "VIDYARTH पोर्टल पर अपना खाता बनाएँ।",
              "आवश्यक छात्र एवं शैक्षणिक जानकारी भरें।",
              "जिस छात्रवृत्ति के लिए आप पात्र हैं, उसका चयन करें।",
              "आवश्यक दस्तावेज अपलोड करें।",
              "अंतिम जमा करने से पहले पूरे आवेदन की जाँच करें।",
            ],
          },
        ],
        note:
          "आवेदन जमा करने से पहले सभी जानकारी की सावधानीपूर्वक जाँच करें।",
      },
    },

    "2": {
      en: {
        type: "GUIDELINE",
        date: "20 September 2026",
        title: "Important Guidelines for Applicants",
        intro:
          "Applicants should ensure that the information provided in the application form is accurate and supported by valid documents.",
        sections: [
          {
            title: "Information Accuracy",
            items: [
              "Enter your name exactly as it appears on your official documents.",
              "Provide correct academic details for the current course and institution.",
              "Ensure that category and eligibility information is accurate.",
              "Do not submit duplicate or inconsistent information.",
            ],
          },
          {
            title: "Application Review",
            items: [
              "Review all entered information before submission.",
              "Check uploaded documents for clarity and validity.",
              "Correct errors before final submission wherever possible.",
              "Keep your application reference details safely after submission.",
            ],
          },
        ],
        note:
          "Incorrect or incomplete information may affect the processing of an application.",
      },

      hi: {
        type: "दिशा-निर्देश",
        date: "20 सितंबर 2026",
        title: "आवेदकों के लिए महत्वपूर्ण दिशा-निर्देश",
        intro:
          "आवेदकों को यह सुनिश्चित करना चाहिए कि आवेदन में दी गई जानकारी सही हो और वैध दस्तावेजों द्वारा समर्थित हो।",
        sections: [
          {
            title: "जानकारी की शुद्धता",
            items: [
              "अपना नाम आधिकारिक दस्तावेजों के अनुसार दर्ज करें।",
              "वर्तमान पाठ्यक्रम और संस्थान की सही शैक्षणिक जानकारी दें।",
              "श्रेणी और पात्रता संबंधी जानकारी सही दर्ज करें।",
              "डुप्लिकेट या असंगत जानकारी जमा न करें।",
            ],
          },
          {
            title: "आवेदन की समीक्षा",
            items: [
              "आवेदन जमा करने से पहले सभी जानकारी जाँचें।",
              "अपलोड किए गए दस्तावेजों की स्पष्टता और वैधता जाँचें।",
              "जहाँ आवश्यक हो, अंतिम जमा करने से पहले गलतियाँ सुधारें।",
              "जमा करने के बाद आवेदन संबंधी जानकारी सुरक्षित रखें।",
            ],
          },
        ],
        note:
          "गलत या अधूरी जानकारी आवेदन की प्रक्रिया को प्रभावित कर सकती है।",
      },
    },

    "3": {
      en: {
        type: "DOCUMENT",
        date: "15 September 2026",
        title: "Document Submission Requirements",
        intro:
          "Applicants should keep the required supporting documents ready before completing the application.",
        sections: [
          {
            title: "Common Documents",
            items: [
              "Valid Scheduled Tribe certificate, wherever applicable.",
              "Recent academic marksheets or qualifying examination documents.",
              "Student identity and institutional details.",
              "Income-related certificate wherever required by the scheme.",
              "Valid bank account details where required for benefit disbursement.",
            ],
          },
          {
            title: "Uploading Documents",
            items: [
              "Upload clear and readable copies of documents.",
              "Use the file format and size specified by the portal.",
              "Make sure the document belongs to the applicant.",
              "Check every uploaded document before final submission.",
            ],
          },
        ],
        note:
          "Document requirements may vary according to the selected scholarship or fellowship scheme.",
      },

      hi: {
        type: "दस्तावेज",
        date: "15 सितंबर 2026",
        title: "दस्तावेज जमा करने संबंधी आवश्यकताएँ",
        intro:
          "आवेदन पूरा करने से पहले आवेदकों को आवश्यक दस्तावेज तैयार रखने चाहिए।",
        sections: [
          {
            title: "सामान्य दस्तावेज",
            items: [
              "जहाँ लागू हो, वैध अनुसूचित जनजाति प्रमाण-पत्र।",
              "हाल की शैक्षणिक अंकतालिका या योग्यता परीक्षा के दस्तावेज।",
              "छात्र की पहचान और संस्थान संबंधी जानकारी।",
              "योजना के अनुसार जहाँ आवश्यक हो, आय प्रमाण-पत्र।",
              "लाभ के भुगतान के लिए जहाँ आवश्यक हो, वैध बैंक खाते की जानकारी।",
            ],
          },
          {
            title: "दस्तावेज अपलोड करना",
            items: [
              "दस्तावेजों की स्पष्ट और पढ़ने योग्य प्रतियाँ अपलोड करें।",
              "पोर्टल द्वारा निर्धारित फाइल प्रारूप और आकार का पालन करें।",
              "सुनिश्चित करें कि दस्तावेज आवेदक से संबंधित हो।",
              "अंतिम जमा करने से पहले सभी दस्तावेजों की जाँच करें।",
            ],
          },
        ],
        note:
          "दस्तावेजों की आवश्यकताएँ चयनित छात्रवृत्ति या फेलोशिप योजना के अनुसार अलग हो सकती हैं।",
      },
    },

    "4": {
      en: {
        type: "PORTAL",
        date: "10 September 2026",
        title: "Application Status and Tracking",
        intro:
          "Applicants can use the application tracking facility to view the current stage of their submitted application.",
        sections: [
          {
            title: "Application Tracking",
            items: [
              "Open the Track Application section from the portal.",
              "Enter the required application or reference information.",
              "View the current processing stage of your application.",
              "Check whether any additional action or information is required.",
            ],
          },
          {
            title: "Possible Status Updates",
            items: [
              "Submitted",
              "Under Verification",
              "Documents Required",
              "Approved",
              "Returned for Correction",
            ],
          },
        ],
        note:
          "Applicants should regularly check the portal for updates related to their application.",
      },

      hi: {
        type: "पोर्टल",
        date: "10 सितंबर 2026",
        title: "आवेदन स्थिति एवं ट्रैकिंग",
        intro:
          "आवेदक आवेदन ट्रैकिंग सुविधा के माध्यम से अपने जमा किए गए आवेदन की वर्तमान स्थिति देख सकते हैं।",
        sections: [
          {
            title: "आवेदन ट्रैक करना",
            items: [
              "पोर्टल से आवेदन ट्रैक करें अनुभाग खोलें।",
              "आवश्यक आवेदन या संदर्भ जानकारी दर्ज करें।",
              "अपने आवेदन की वर्तमान प्रक्रिया स्थिति देखें।",
              "जाँचें कि किसी अतिरिक्त जानकारी या कार्रवाई की आवश्यकता तो नहीं है।",
            ],
          },
          {
            title: "संभावित स्थिति",
            items: [
              "जमा किया गया",
              "सत्यापन के अंतर्गत",
              "दस्तावेज आवश्यक",
              "स्वीकृत",
              "सुधार के लिए वापस किया गया",
            ],
          },
        ],
        note:
          "आवेदकों को अपने आवेदन से संबंधित अपडेट के लिए पोर्टल को नियमित रूप से देखना चाहिए।",
      },
    },
  };

  const notice = noticeData[noticeId];

  if (!notice) {
    return (
      <div className="notice-not-found">
        <h1>Notice Not Found</h1>
        <p>The requested notice could not be found.</p>
        <Link to="/notices">← Back to Notices</Link>
      </div>
    );
  }

  const t = notice[lang];

  return (
    <div className="notice-details-page">

      <div className="notice-details-govbar">
        <div className="notice-details-container gov-inner">
          <span>
            {lang === "en"
              ? "Government of India | Ministry of Tribal Affairs"
              : "भारत सरकार | जनजातीय कार्य मंत्रालय"}
          </span>

          <div>
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

      <header className="notice-details-header">
        <div className="notice-details-container notice-header-row">

          <Link to="/" className="notice-details-brand">
            <div>V</div>

            <section>
              <strong>VIDYARTH</strong>
              <small>
                {lang === "en"
                  ? "Scholarship & Fellowship Management System"
                  : "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"}
              </small>
            </section>
          </Link>

          <Link to="/notices" className="notice-list-back">
            ← {lang === "en" ? "All Notices" : "सभी सूचनाएँ"}
          </Link>

        </div>
      </header>

      <main className="notice-details-container notice-details-main">

        <div className="notice-detail-breadcrumb">
          <Link to="/">Home</Link>
          <span>›</span>
          <Link to="/notices">
            {lang === "en" ? "Notices" : "सूचनाएँ"}
          </Link>
          <span>›</span>
          <span>{t.type}</span>
        </div>

        <article className="notice-detail-card">

          <div className="notice-detail-top">
            <span>{t.type}</span>
            <time>{t.date}</time>
          </div>

          <h1>{t.title}</h1>

          <p className="notice-detail-intro">
            {t.intro}
          </p>

          {t.sections.map((section, index) => (
            <section
              className="notice-detail-section"
              key={index}
            >
              <h2>{section.title}</h2>

              <ul>
                {section.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <span>✓</span>
                    {item}
                  </li>
                ))}
              </ul>
            </section>
          ))}

          <div className="notice-detail-note">
            <strong>
              {lang === "en" ? "Important Note" : "महत्वपूर्ण सूचना"}
            </strong>
            <p>{t.note}</p>
          </div>

        </article>

        <div className="notice-detail-actions">
          <Link to="/notices">
            ← {lang === "en" ? "Back to Notices" : "सूचनाओं पर वापस जाएँ"}
          </Link>

          <Link to="/apply">
            {lang === "en" ? "Apply for Scholarship →" : "छात्रवृत्ति के लिए आवेदन करें →"}
          </Link>
        </div>

      </main>

      <footer className="notice-details-footer">
        <div className="notice-details-container">
          © 2026 VIDYARTH | Scholarship & Fellowship Management System
        </div>
      </footer>

    </div>
  );
}

export default NoticeDetails;
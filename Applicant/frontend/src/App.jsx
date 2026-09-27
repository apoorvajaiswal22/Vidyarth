import Login from "./Login";
import AdminLogin from "./AdminLogin";
import AdminDashboard from "./AdminDashboard";
import Dashboard from "./Dashboard";
import Apply from "./Apply";
import Track from "./Track";
import Notifications from "./Notifications";
import Register from "./Register";
import About from "./About";
import Schemes from "./Schemes";
import SchemeDetails from "./SchemeDetails";
import Notices from "./Notices";
import NoticeDetails from "./NoticeDetails";
import Help from "./Help";

import { useEffect, useState } from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

import "./App.css";

const translations = {
  en: {
    gov: "Government of India",
    ministry: "Ministry of Tribal Affairs",
    portal: "Scholarship & Fellowship Management System",

    home: "Home",
    about: "About Us",
    schemes: "Schemes",
    student: "Student Corner",
    notices: "Notices",
    help: "Help & FAQ",
    adminLogin: "Admin Login",
    navSchemes: "Schemes",
    navAbout: "About",
    navResources: "Resources",
    navFaqs: "FAQs",

    heroTitle: "Empowering Tribal Students",
    heroHighlight: "for a Bright Future",
    heroText:
      "One platform for all scholarship and fellowship schemes by the Ministry of Tribal Affairs.",
    heroQuote: "Education Empowers Tribes",
    benefit1: "Simplified Application Process",
    benefit2: "Secure & Transparent",
    benefit3: "Guided Eligibility Checks",
    benefit4: "Track Your Progress",
    accountTitle: "Login to Your Account",
    accountText: "Access your application, track status and more.",
    applicantLogin: "Applicant Login",
    newUser: "New user?",
    registerHere: "Register here",
    featuredSchemes: "Our Schemes",
    viewAllSchemes: "View All Schemes",
    impactTitle: "Portal at a Glance",
    impact1: "Scholarship schemes",
    impact2: "Application steps",
    impact3: "Unified student portal",
    impact4: "Digital access",
    howTitle: "How It Works",
    howSubtitle: "A simple, transparent and guided process from application to selection.",
    step1: "Register",
    step1Text: "Create your account and fill in your details.",
    step2: "Apply",
    step2Text: "Submit your application and upload required documents.",
    step3: "Verification",
    step3Text: "Eligibility and documents are reviewed.",
    step4: "Selection",
    step4Text: "Applications are assessed against scheme criteria.",
    step5: "Stay Updated",
    step5Text: "Track your application and receive communication.",
    startApplication: "Start Your Application",
    moreSchemesTitle: "More opportunities for your next step",
    moreSchemesText: "Review the scheme details and eligibility before starting an application.",
    prepareTitle: "Get ready to apply",
    prepareText: "Use this checklist to prepare. Requirements vary by scheme, so confirm the official guidelines before submission.",
    prepareIdentity: "Identity and contact details",
    prepareAcademic: "Current academic records",
    prepareBank: "Bank account details",
    prepareCategory: "Category or income certificates, if required",
    preparePhoto: "Recent photograph and signature",
    checklistCount: "items ready",
    servicesTitleHome: "Student services",
    serviceApplyTitle: "Start an application",
    serviceApplyText: "Sign in to complete and submit an application.",
    serviceTrackTitle: "Track an application",
    serviceTrackText: "Review the latest status of a submitted application.",
    serviceNoticeTitle: "Notices and updates",
    serviceNoticeText: "Check announcements, dates, and scheme guidance.",
    homeFaqTitle: "Common questions",
    homeFaqOne: "Where can I compare available schemes?",
    homeFaqOneAnswer: "Open the schemes page to review each opportunity and its detailed guidance.",
    homeFaqTwo: "Which documents should I prepare?",
    homeFaqTwoAnswer: "Document requirements differ by scheme. Use this checklist as a starting point and confirm the official scheme guidelines.",
    homeFaqThree: "How do I check my application status?",
    homeFaqThreeAnswer: "Sign in to your student account and use Track Application to view your submission status.",

    login: "Student Login",
    register: "New Registration",

    servicesTitle: "Student Services",
    service1: "Explore Scholarships",
    service2: "Apply Online",
    service3: "Track Application",
    service4: "Stay Updated",

    serviceText1:
      "Find scholarship and fellowship opportunities that match your academic journey.",
    serviceText2:
      "Submit your application through a simple and guided online process.",
    serviceText3:
      "Check your application progress and status anytime.",
    serviceText4:
      "Receive important announcements and application updates.",

    noticeTag: "IMPORTANT NOTICE",
    noticeTitle: "Stay informed about scholarship opportunities",
    noticeText:
      "Important announcements, application dates and scheme-related updates will be displayed here.",
    viewAll: "View All Notices",

    aboutTag: "ABOUT VIDYARTH",
    aboutTitle: "Making scholarship access simpler for students",
    aboutText:
      "VIDYARTH is an integrated digital platform designed to make scholarship and fellowship services easier to discover, apply for and track.",
    learnMore: "Learn More",

    schemesTag: "OPPORTUNITIES",
    schemesTitle: "Scholarship & Fellowship Schemes",
    schemesText:
      "Explore financial assistance opportunities and understand eligibility requirements before applying.",

    preMatric: "Pre-Matric Scholarship",
    preMatricText: "Support for eligible Scheduled Tribe students in Classes IX and X, under current scheme rules.",
    postMatric: "Post-Matric Scholarship",
    postMatricText:
      "Financial assistance for eligible students pursuing education after matriculation.",

    national: "Top Class Education Scholarship",
    nationalText:
      "Higher-education support for eligible ST students admitted to institutions covered by current guidelines.",

    fellowship: "National Fellowship",
    fellowshipText:
      "Fellowship support for eligible students pursuing research and advanced academic programmes.",

    overseas: "National Overseas Scholarship",
    overseasText:
      "Financial assistance for eligible students pursuing higher education abroad.",

    details: "View Details",

    updatesTag: "LATEST INFORMATION",
    updatesTitle: "Latest Updates",
    update1: "Application announcements",
    update1Text:
      "Important dates, application instructions and submission-related updates will appear here.",
    update2: "Scheme guidelines",
    update2Text:
      "Students are advised to review eligibility and required documents before applying.",

    quickLinks: "Quick Links",
    studentCorner: "Student Corner",
    support: "Support",

    footerText:
      "Scholarship & Fellowship Management System",
    contact: "Contact Support",
    faqs: "FAQs",

    prototype: "SIH Project Prototype",
  },

  hi: {
    gov: "भारत सरकार",
    ministry: "जनजातीय कार्य मंत्रालय",
    portal: "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली",

    home: "मुखपृष्ठ",
    about: "हमारे बारे में",
    schemes: "योजनाएं",
    student: "विद्यार्थी कॉर्नर",
    notices: "सूचनाएं",
    help: "सहायता एवं FAQ",
    adminLogin: "एडमिन लॉगिन",
    navSchemes: "योजनाएं",
    navAbout: "परिचय",
    navResources: "संसाधन",
    navFaqs: "सामान्य प्रश्न",

    heroTitle: "जनजातीय विद्यार्थियों को सशक्त बनाना",
    heroHighlight: "उज्ज्वल भविष्य के लिए",
    heroText:
      "जनजातीय कार्य मंत्रालय की सभी छात्रवृत्ति एवं फेलोशिप योजनाओं के लिए एक मंच।",
    heroQuote: "शिक्षा जनजातियों को सशक्त बनाती है",
    benefit1: "सरल आवेदन प्रक्रिया",
    benefit2: "सुरक्षित एवं पारदर्शी",
    benefit3: "प्रारंभिक पात्रता जांच",
    benefit4: "अपनी प्रगति देखें",
    accountTitle: "अपने खाते में लॉगिन करें",
    accountText: "आवेदन देखें, स्थिति ट्रैक करें और अन्य सेवाएं पाएं।",
    applicantLogin: "आवेदक लॉगिन",
    newUser: "नए उपयोगकर्ता?",
    registerHere: "यहां पंजीकरण करें",
    featuredSchemes: "हमारी योजनाएं",
    viewAllSchemes: "सभी योजनाएं देखें",
    impactTitle: "पोर्टल की एक झलक",
    impact1: "छात्रवृत्ति योजनाएं",
    impact2: "आवेदन के चरण",
    impact3: "एकीकृत विद्यार्थी पोर्टल",
    impact4: "डिजिटल पहुंच",
    howTitle: "यह कैसे काम करता है",
    howSubtitle: "आवेदन से चयन तक एक सरल, पारदर्शी और निर्देशित प्रक्रिया।",
    step1: "पंजीकरण",
    step1Text: "अपना खाता बनाएं और विवरण भरें।",
    step2: "आवेदन",
    step2Text: "आवेदन जमा करें और आवश्यक दस्तावेज़ अपलोड करें।",
    step3: "सत्यापन",
    step3Text: "पात्रता और दस्तावेज़ों की जांच की जाती है।",
    step4: "चयन",
    step4Text: "योजना के मानदंडों के आधार पर आवेदन का मूल्यांकन होता है।",
    step5: "अपडेट पाएं",
    step5Text: "आवेदन ट्रैक करें और सूचनाएं प्राप्त करें।",
    startApplication: "आवेदन शुरू करें",
    moreSchemesTitle: "आपकी अगली शैक्षणिक यात्रा के लिए अन्य अवसर",
    moreSchemesText: "आवेदन शुरू करने से पहले योजना का विवरण और पात्रता देखें।",
    prepareTitle: "आवेदन की तैयारी करें",
    prepareText: "तैयारी के लिए इस सूची का उपयोग करें। आवश्यकताएं योजना के अनुसार बदलती हैं, इसलिए जमा करने से पहले आधिकारिक दिशानिर्देश जांचें।",
    prepareIdentity: "पहचान और संपर्क विवरण",
    prepareAcademic: "वर्तमान शैक्षणिक रिकॉर्ड",
    prepareBank: "बैंक खाते का विवरण",
    prepareCategory: "आवश्यकता होने पर श्रेणी या आय प्रमाणपत्र",
    preparePhoto: "हाल का फोटो और हस्ताक्षर",
    checklistCount: "दस्तावेज़ तैयार",
    servicesTitleHome: "विद्यार्थी सेवाएं",
    serviceApplyTitle: "आवेदन शुरू करें",
    serviceApplyText: "आवेदन पूरा करने और जमा करने के लिए लॉगिन करें।",
    serviceTrackTitle: "आवेदन ट्रैक करें",
    serviceTrackText: "जमा किए गए आवेदन की नवीनतम स्थिति देखें।",
    serviceNoticeTitle: "सूचनाएं और अपडेट",
    serviceNoticeText: "घोषणाएं, तिथियां और योजना संबंधी दिशानिर्देश देखें।",
    homeFaqTitle: "सामान्य प्रश्न",
    homeFaqOne: "उपलब्ध योजनाओं की तुलना कहां करें?",
    homeFaqOneAnswer: "प्रत्येक अवसर और उसके विस्तृत दिशानिर्देश देखने के लिए योजनाएं पृष्ठ खोलें।",
    homeFaqTwo: "मुझे कौन से दस्तावेज़ तैयार रखने चाहिए?",
    homeFaqTwoAnswer: "दस्तावेज़ों की आवश्यकता योजना के अनुसार अलग होती है। इस सूची से तैयारी शुरू करें और आधिकारिक दिशानिर्देशों की पुष्टि करें।",
    homeFaqThree: "मैं अपने आवेदन की स्थिति कैसे देखूं?",
    homeFaqThreeAnswer: "अपने विद्यार्थी खाते में लॉगिन करें और जमा किए गए आवेदन की स्थिति देखने के लिए आवेदन ट्रैक करें चुनें।",

    login: "विद्यार्थी लॉगिन",
    register: "नया पंजीकरण",

    servicesTitle: "विद्यार्थी सेवाएं",
    service1: "छात्रवृत्ति खोजें",
    service2: "ऑनलाइन आवेदन करें",
    service3: "आवेदन की स्थिति देखें",
    service4: "महत्वपूर्ण सूचनाएं पाएं",

    serviceText1:
      "अपनी शैक्षणिक यात्रा के अनुसार छात्रवृत्ति एवं फेलोशिप के अवसर खोजें।",
    serviceText2:
      "सरल और निर्देशित ऑनलाइन प्रक्रिया के माध्यम से अपना आवेदन जमा करें।",
    serviceText3:
      "अपने आवेदन की प्रगति और स्थिति कभी भी देखें।",
    serviceText4:
      "महत्वपूर्ण घोषणाओं और आवेदन से संबंधित नवीनतम जानकारी प्राप्त करें।",

    noticeTag: "महत्वपूर्ण सूचना",
    noticeTitle: "छात्रवृत्ति के अवसरों से जुड़े रहें",
    noticeText:
      "महत्वपूर्ण घोषणाएं, आवेदन की तिथियां और योजनाओं से संबंधित नवीनतम जानकारी यहां प्रदर्शित की जाएगी।",
    viewAll: "सभी सूचनाएं देखें",

    aboutTag: "VIDYARTH के बारे में",
    aboutTitle: "छात्रों के लिए छात्रवृत्ति तक पहुंच को सरल बनाना",
    aboutText:
      "VIDYARTH एक एकीकृत डिजिटल मंच है जिसे छात्रवृत्ति एवं फेलोशिप की जानकारी प्राप्त करने, आवेदन करने और आवेदन की स्थिति देखने की प्रक्रिया को सरल बनाने के लिए विकसित किया गया है।",
    learnMore: "और जानें",

    schemesTag: "अवसर",
    schemesTitle: "छात्रवृत्ति एवं फेलोशिप योजनाएं",
    schemesText:
      "वित्तीय सहायता के विभिन्न अवसरों की जानकारी प्राप्त करें और आवेदन से पहले पात्रता एवं आवश्यकताओं को समझें।",

    postMatric: "पोस्ट-मैट्रिक छात्रवृत्ति",
    postMatricText:
      "मैट्रिक के बाद शिक्षा प्राप्त कर रहे पात्र विद्यार्थियों के लिए वित्तीय सहायता।",

    national: "टॉप क्लास शिक्षा छात्रवृत्ति",
    nationalText:
      "वर्तमान दिशानिर्देशों में शामिल संस्थानों में प्रवेश पाने वाले पात्र ST विद्यार्थियों के लिए उच्च शिक्षा सहायता।",
    preMatric: "प्री-मैट्रिक छात्रवृत्ति",
    preMatricText: "वर्तमान योजना नियमों के अंतर्गत कक्षा 9 और 10 के पात्र अनुसूचित जनजाति विद्यार्थियों के लिए सहायता।",

    fellowship: "राष्ट्रीय फेलोशिप",
    fellowshipText:
      "शोध एवं उच्च शैक्षणिक कार्यक्रमों में अध्ययन कर रहे पात्र विद्यार्थियों के लिए फेलोशिप सहायता।",

    overseas: "राष्ट्रीय विदेशी छात्रवृत्ति",
    overseasText:
      "विदेश में उच्च शिक्षा प्राप्त करने वाले पात्र विद्यार्थियों के लिए वित्तीय सहायता।",

    details: "विवरण देखें",

    updatesTag: "नवीनतम जानकारी",
    updatesTitle: "नवीनतम अपडेट",
    update1: "आवेदन संबंधी घोषणाएं",
    update1Text:
      "महत्वपूर्ण तिथियां, आवेदन निर्देश और आवेदन जमा करने से संबंधित नवीनतम जानकारी यहां उपलब्ध होगी।",
    update2: "योजना संबंधी दिशानिर्देश",
    update2Text:
      "आवेदन करने से पहले विद्यार्थी पात्रता एवं आवश्यक दस्तावेजों की जानकारी अवश्य देखें।",

    quickLinks: "त्वरित लिंक",
    studentCorner: "विद्यार्थी कॉर्नर",
    support: "सहायता",

    footerText:
      "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली",
    contact: "सहायता से संपर्क करें",
    faqs: "सामान्य प्रश्न",

    prototype: "SIH प्रोजेक्ट प्रोटोटाइप",
  },
};

function Home({ lang, setLang }) {
  const t = translations[lang];

  return (
    <div className="portal portal-home">
      <header className="site-header">
        <div className="container site-header-inner">
          <Link to="/" className="brand">
            <img className="brand-emblem" src="/vidyarth-logo.svg" alt="" />
            <span className="site-brand-copy">
              <strong className="brand-name">Vidyarth</strong>
              <span className="brand-subtitle">{t.portal}</span>
            </span>
          </Link>

          <nav className="site-nav" aria-label="Main navigation">
            <Link className="site-nav-active" to="/">{t.home}</Link>
            <Link to="/schemes">{t.navSchemes}</Link>
            <Link to="/about">{t.navAbout}</Link>
            <Link to="/notices">{t.navResources}</Link>
            <Link to="/help">{t.navFaqs}</Link>
          </nav>

          <div className="ministry-lockup">
            <img className="india-emblem" src="/mota-logo.jpg" alt="Ministry of Tribal Affairs, Government of India" />
            <div className="site-language" aria-label="Choose language">
              <button className={lang === "en" ? "active" : ""} onClick={() => setLang("en")}>EN</button>
              <button className={lang === "hi" ? "active" : ""} onClick={() => setLang("hi")}>हिंदी</button>
            </div>
          </div>
        </div>
      </header>

      <main id="main-content">
        <section className="home-hero">
          <div className="container home-hero-grid">
            <div className="home-hero-copy">
              <span className="home-hero-kicker">{t.gov} · {t.ministry}</span>
              <h1>{t.heroTitle}<br /><span>{t.heroHighlight}</span></h1>
              <p>{t.heroText}</p>
              <div className="benefit-list">
                <div className="benefit-item"><span className="benefit-icon icon-blue"><PortalIcon name="bolt" /></span><span>{t.benefit1}</span></div>
                <div className="benefit-item"><span className="benefit-icon icon-green"><PortalIcon name="shield" /></span><span>{t.benefit2}</span></div>
                <div className="benefit-item"><span className="benefit-icon icon-violet"><PortalIcon name="verify" /></span><span>{t.benefit3}</span></div>
                <div className="benefit-item"><span className="benefit-icon icon-orange"><PortalIcon name="chart" /></span><span>{t.benefit4}</span></div>
              </div>
            </div>

            <div className="hero-quote" aria-hidden="true">{t.heroQuote}</div>

            <aside className="account-panel">
              <h2>{t.accountTitle}</h2>
              <p>{t.accountText}</p>
              <Link to="/login" className="account-action account-primary"><PortalIcon name="user" />{t.applicantLogin}<span>→</span></Link>
              <Link to="/admin-login" className="account-action account-secondary"><PortalIcon name="building" />{t.adminLogin}<span>→</span></Link>
              <div className="account-register">{t.newUser} <Link to="/register">{t.registerHere}</Link></div>
            </aside>
          </div>
        </section>

        <section className="home-featured-section" id="schemes">
          <div className="container home-featured-grid">
            <div className="featured-area">
              <div className="featured-heading">
                <div><h2>{t.featuredSchemes}</h2><p>{t.schemesText}</p></div>
                <Link to="/schemes" className="view-all-link">{t.viewAllSchemes} <span>→</span></Link>
              </div>
              <div className="featured-cards">
                <FeaturedSchemeCard
                  tone="blue"
                  icon="cap"
                  title={t.fellowship}
                  text={t.fellowshipText}
                  button={t.details}
                  to="/schemes/national-fellowship"
                />
                <FeaturedSchemeCard
                  tone="violet"
                  icon="plane"
                  title={t.overseas}
                  text={t.overseasText}
                  button={t.details}
                  to="/schemes/national-overseas"
                />
              </div>
            </div>

            <aside className="impact-panel">
              <h2>{t.impactTitle}</h2>
              <p>{t.portal}</p>
              <div className="impact-grid">
                <div className="impact-item"><span className="impact-icon icon-blue"><PortalIcon name="book" /></span><strong>5</strong><small>{t.impact1}</small></div>
                <div className="impact-item"><span className="impact-icon icon-green"><PortalIcon name="check" /></span><strong>5</strong><small>{t.impact2}</small></div>
                <div className="impact-item"><span className="impact-icon icon-violet"><PortalIcon name="users" /></span><strong>1</strong><small>{t.impact3}</small></div>
                <div className="impact-item"><span className="impact-icon icon-orange"><PortalIcon name="globe" /></span><strong>100%</strong><small>{t.impact4}</small></div>
              </div>
            </aside>
          </div>
        </section>

        <section className="workflow-section" id="how-it-works">
          <div className="container workflow-layout">
            <div className="workflow-intro">
              <h2>{t.howTitle}</h2>
              <p>{t.howSubtitle}</p>
              <Link to="/register" className="workflow-cta">{t.startApplication}<span>→</span></Link>
            </div>
            <div className="workflow-steps">
              <WorkflowStep number="1" icon="user" title={t.step1} text={t.step1Text} />
              <WorkflowStep number="2" icon="file" title={t.step2} text={t.step2Text} />
              <WorkflowStep number="3" icon="search" title={t.step3} text={t.step3Text} />
              <WorkflowStep number="4" icon="check" title={t.step4} text={t.step4Text} />
              <WorkflowStep number="5" icon="mail" title={t.step5} text={t.step5Text} />
            </div>
          </div>
        </section>

        <section className="home-more-schemes" aria-labelledby="more-schemes-title">
          <div className="container">
            <div className="home-section-heading">
              <span className="home-section-kicker">VIDYARTH OPPORTUNITIES</span>
              <h2 id="more-schemes-title">{t.moreSchemesTitle}</h2>
              <p>{t.moreSchemesText}</p>
            </div>
            <div className="home-secondary-schemes">
              <FeaturedSchemeCard
                tone="green"
                icon="book"
                title={t.postMatric}
                text={t.postMatricText}
                button={t.details}
                to="/schemes/post-matric"
              />
              <FeaturedSchemeCard
                tone="orange"
                icon="cap"
                title={t.national}
                text={t.nationalText}
                button={t.details}
                to="/schemes/top-class"
              />
              <FeaturedSchemeCard
                tone="blue"
                icon="book"
                title={t.preMatric}
                text={t.preMatricText}
                button={t.details}
                to="/schemes/pre-matric"
              />
            </div>
          </div>
        </section>

        <section className="home-preparation-section">
          <div className="container home-preparation-grid">
            <div className="home-section-heading">
              <span className="home-section-kicker">APPLICATION CHECKLIST</span>
              <h2>{t.prepareTitle}</h2>
              <p>{t.prepareText}</p>
              <Link to="/schemes" className="home-inline-link">Review scheme guidance <span>→</span></Link>
            </div>
            <PreparationChecklist text={t} />
          </div>
        </section>

        <section className="home-services-section">
          <div className="container">
            <div className="home-section-heading">
              <span className="home-section-kicker">PORTAL SERVICES</span>
              <h2>{t.servicesTitleHome}</h2>
            </div>
            <div className="home-service-links">
              <HomeServiceLink icon="file" title={t.serviceApplyTitle} text={t.serviceApplyText} to="/apply" />
              <HomeServiceLink icon="search" title={t.serviceTrackTitle} text={t.serviceTrackText} to="/track" />
              <HomeServiceLink icon="mail" title={t.serviceNoticeTitle} text={t.serviceNoticeText} to="/notices" />
            </div>
          </div>
        </section>

        <section className="home-faq-section">
          <div className="container home-faq-layout">
            <div className="home-section-heading">
              <span className="home-section-kicker">HELP DESK</span>
              <h2>{t.homeFaqTitle}</h2>
              <p>Find guidance for common steps in the scholarship application process.</p>
              <Link to="/help" className="home-inline-link">Visit Help &amp; FAQ <span>→</span></Link>
            </div>
            <div className="home-faq-list">
              <details>
                <summary>{t.homeFaqOne}</summary>
                <p>{t.homeFaqOneAnswer}</p>
              </details>
              <details>
                <summary>{t.homeFaqTwo}</summary>
                <p>{t.homeFaqTwoAnswer}</p>
              </details>
              <details>
                <summary>{t.homeFaqThree}</summary>
                <p>{t.homeFaqThreeAnswer}</p>
              </details>
            </div>
          </div>
        </section>
      </main>

      <section className="home-notice-strip">
        <div className="container home-notice-inner">
          <span className="notice-status-dot" />
          <strong>{t.noticeTitle}</strong>
          <span>{t.noticeText}</span>
          <Link to="/notices">{t.viewAll} →</Link>
        </div>
      </section>

      <div className="legacy-home-sections" aria-hidden="true">
      {/* SERVICES */}
      <section className="services-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-tag">
              VIDYARTH
            </span>

            <h2>
              {t.servicesTitle}
            </h2>

          </div>

          <div className="services-grid">

            <Link
              to="/schemes"
              className="service-card"
            >
              <div className="service-number">
                01
              </div>

              <div>
                <h3>
                  {t.service1}
                </h3>

                <p>
                  {t.serviceText1}
                </p>
              </div>
            </Link>

            <Link
              to="/apply"
              className="service-card"
            >
              <div className="service-number">
                02
              </div>

              <div>
                <h3>
                  {t.service2}
                </h3>

                <p>
                  {t.serviceText2}
                </p>
              </div>
            </Link>

            <Link
              to="/track"
              className="service-card"
            >
              <div className="service-number">
                03
              </div>

              <div>
                <h3>
                  {t.service3}
                </h3>

                <p>
                  {t.serviceText3}
                </p>
              </div>
            </Link>

            <Link
              to="/notifications"
              className="service-card"
            >
              <div className="service-number">
                04
              </div>

              <div>
                <h3>
                  {t.service4}
                </h3>

                <p>
                  {t.serviceText4}
                </p>
              </div>
            </Link>

          </div>

        </div>

      </section>

      {/* NOTICE */}
      <section className="notice-section">

        <div className="container notice-box">

          <div className="notice-icon">
            !
          </div>

          <div className="notice-content">

            <span>
              {t.noticeTag}
            </span>

            <h3>
              {t.noticeTitle}
            </h3>

            <p>
              {t.noticeText}
            </p>

          </div>

          <Link
            to="/notices"
            className="notice-link"
          >
            {t.viewAll} →
          </Link>

        </div>

      </section>

      {/* ABOUT */}
      <section className="about-section">

        <div className="container about-grid">

          <div className="about-label">

            <span>
              {t.aboutTag}
            </span>

            <div className="about-big">
              V
            </div>

          </div>

          <div className="about-content">

            <h2>
              {t.aboutTitle}
            </h2>

            <p>
              {t.aboutText}
            </p>

            <Link
              to="/about"
              className="text-link"
            >
              {t.learnMore} →
            </Link>

          </div>

        </div>

      </section>

      {/* SCHEMES */}
      <section className="schemes-section">

        <div className="container">

          <div className="section-heading center-heading">

            <span className="section-tag">
              {t.schemesTag}
            </span>

            <h2>
              {t.schemesTitle}
            </h2>

            <p>
              {t.schemesText}
            </p>

          </div>

          <div className="schemes-grid">

            <SchemeCard
              number="01"
              type="SCHOLARSHIP"
              title={t.postMatric}
              text={t.postMatricText}
              button={t.details}
              to="/schemes/post-matric"
            />

            <SchemeCard
              number="02"
              type="SCHOLARSHIP"
              title={t.national}
              text={t.nationalText}
              button={t.details}
              to="/schemes/national-scholarship"
            />

            <SchemeCard
              number="03"
              type="FELLOWSHIP"
              title={t.fellowship}
              text={t.fellowshipText}
              button={t.details}
              to="/schemes/national-fellowship"
            />

            <SchemeCard
              number="04"
              type="SCHOLARSHIP"
              title={t.overseas}
              text={t.overseasText}
              button={t.details}
              to="/schemes/national-overseas"
            />

          </div>

        </div>

      </section>

      {/* UPDATES */}
      <section className="updates-section">

        <div className="container">

          <div className="section-heading">

            <span className="section-tag">
              {t.updatesTag}
            </span>

            <h2>
              {t.updatesTitle}
            </h2>

          </div>

          <div className="updates-grid">

            <div className="update-item">

              <div className="update-number">
                01
              </div>

              <div>

                <h3>
                  {t.update1}
                </h3>

                <p>
                  {t.update1Text}
                </p>

              </div>

            </div>

            <div className="update-item">

              <div className="update-number">
                02
              </div>

              <div>

                <h3>
                  {t.update2}
                </h3>

                <p>
                  {t.update2Text}
                </p>

              </div>

            </div>

          </div>

        </div>

      </section>

      </div>

      {/* FOOTER */}
      <footer className="footer">

        <div className="container footer-grid">

          <div>

            <div className="footer-brand">
              VIDYARTH
            </div>

            <p>
              {t.footerText}
            </p>

          </div>

          <div>

            <h4>
              {t.quickLinks}
            </h4>

            <Link to="/">
              {t.home}
            </Link>

            <Link to="/schemes">
              {t.schemes}
            </Link>

            <Link to="/notices">
              {t.notices}
            </Link>

            <Link to="/admin-login">
              {t.adminLogin}
            </Link>

          </div>

          <div>

            <h4>
              {t.studentCorner}
            </h4>

            <Link to="/register">
              {t.register}
            </Link>

            <Link to="/login">
              {t.login}
            </Link>

            <Link to="/track">
              {t.service3}
            </Link>

          </div>

          <div>

            <h4>
              {t.support}
            </h4>

            <Link to="/help">
              {t.faqs}
            </Link>

            <Link to="/help">
              {t.contact}
            </Link>

          </div>

        </div>

        <div className="footer-bottom">

          © 2026 VIDYARTH | {t.footerText} | {t.prototype}

        </div>

      </footer>

    </div>
  );
}


function PortalIcon({ name }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round", strokeLinejoin: "round" };
  const paths = {
    bolt: <path d="M13 2 4 13h6l-1 9 9-12h-6l1-8Z" />,
    shield: <><path d="M12 22s8-4 8-11V5l-8-3-8 3v6c0 7 8 11 8 11Z" /><path d="m9 12 2 2 4-4" /></>,
    verify: <><path d="M12 3 14 5.2l3-.2.7 2.9 2.5 1.7-1.2 2.8 1.2 2.8-2.5 1.7-.7 2.9-3-.2L12 22l-2-2.2-3 .2-.7-2.9-2.5-1.7L5 12l-1.2-2.8 2.5-1.7L7 4.6l3 .2L12 3Z" /><path d="m9 12 2 2 4-4" /></>,
    chart: <><path d="M3 3v18h18" /><path d="m19 9-5 5-4-4-5 5" /><path d="M16 9h3v3" /></>,
    user: <><circle cx="12" cy="8" r="4" /><path d="M5 21v-2a7 7 0 0 1 14 0v2" /></>,
    building: <><path d="M3 21h18M5 21V7l7-4 7 4v14M9 21v-5h6v5M9 9h.01M15 9h.01M9 12h.01M15 12h.01" /></>,
    cap: <><path d="m2 10 10-5 10 5-10 5-10-5Z" /><path d="M6 12v5c4 3 8 3 12 0v-5M22 10v6" /></>,
    plane: <><path d="m22 2-7 20-4-9-9-4 20-7Z" /><path d="M22 2 11 13" /></>,
    book: <><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" /></>,
    check: <><circle cx="12" cy="12" r="9" /><path d="m8 12 2.5 2.5L16 9" /></>,
    users: <><path d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M10 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8ZM20 8v6M23 11h-6" /></>,
    globe: <><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18" /></>,
    file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8Z" /><path d="M14 2v6h6M8 13h8M8 17h8" /></>,
    search: <><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /><path d="m8 11 2 2 4-4" /></>,
    mail: <><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m3 7 9 6 9-6" /></>,
  };

  return <svg aria-hidden="true" viewBox="0 0 24 24" {...common}>{paths[name]}</svg>;
}

function FeaturedSchemeCard({ tone, icon, title, text, button, to }) {
  return (
    <Link to={to} className={`featured-scheme-card scheme-${tone}`}>
      <span className="scheme-art"><PortalIcon name={icon} /></span>
      <span className="scheme-card-copy">
        <strong>{title}</strong>
        <small>{text}</small>
        <span className="scheme-card-button">{button} <span>→</span></span>
      </span>
    </Link>
  );
}

function WorkflowStep({ number, icon, title, text }) {
  return (
    <div className="workflow-step">
      <span className={`workflow-icon workflow-icon-${number}`}><PortalIcon name={icon} /></span>
      <strong>{number}. {title}</strong>
      <p>{text}</p>
    </div>
  );
}

function PreparationChecklist({ text }) {
  const [readyItems, setReadyItems] = useState([]);
  const items = [
    text.prepareIdentity,
    text.prepareAcademic,
    text.prepareBank,
    text.prepareCategory,
    text.preparePhoto,
  ];

  function toggleItem(index) {
    setReadyItems((current) =>
      current.includes(index)
        ? current.filter((item) => item !== index)
        : [...current, index],
    );
  }

  return (
    <div className="preparation-checklist">
      <div className="checklist-heading">
        <strong>{text.prepareTitle}</strong>
        <span>{readyItems.length}/{items.length} {text.checklistCount}</span>
      </div>
      <div className="checklist-items">
        {items.map((item, index) => (
          <label key={item} className={readyItems.includes(index) ? "is-ready" : ""}>
            <input
              type="checkbox"
              checked={readyItems.includes(index)}
              onChange={() => toggleItem(index)}
            />
            <span>{item}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

function HomeServiceLink({ icon, title, text, to }) {
  return (
    <Link to={to} className="home-service-link">
      <span className="home-service-icon"><PortalIcon name={icon} /></span>
      <span className="home-service-copy">
        <strong>{title}</strong>
        <small>{text}</small>
      </span>
      <span className="home-service-arrow" aria-hidden="true">→</span>
    </Link>
  );
}

function SchemeCard({ number, type, title, text, button, to }) {
  return (
    <Link to={to} className="scheme-card">
      <div className="scheme-top"><span>{number}</span><small>{type}</small></div>
      <h3>{title}</h3>
      <p>{text}</p>
      <span className="scheme-link">{button} →</span>
    </Link>
  );
}


/* APP */

function App() {

  /*
    English is the default language.
    Hindi can be selected from the Home page.
  */

  const [lang, setLang] = useState("en");
  const [pageScale, setPageScale] = useState(() => {
    const savedScale = Number(localStorage.getItem("vidyarthPageScale"));
    return savedScale >= 0.8 && savedScale <= 1.3 ? savedScale : 1;
  });

  useEffect(() => {
    localStorage.setItem("vidyarthPageScale", String(pageScale));
  }, [pageScale]);

  return (
    <BrowserRouter>
      <AccessibilityControls scale={pageScale} onScaleChange={setPageScale} />
      <div className="accessibility-content" style={{ zoom: pageScale }}>
        <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={
            <Home
              lang={lang}
              setLang={setLang}
            />
          }
        />

        {/* ABOUT */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* ALL SCHEMES */}
        <Route
          path="/schemes"
          element={<Schemes />}
        />

        {/* INDIVIDUAL SCHEME */}
        <Route
          path="/schemes/:schemeId"
          element={<SchemeDetails />}
        />

        {/* STUDENT PAGES */}
        <Route
          path="/register"
          element={<Register />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/admin-login"
          element={<AdminLogin />}
        />

        <Route
          path="/admin"
          element={<AdminDashboard />}
        />

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/apply"
          element={<Apply />}
        />

        <Route
          path="/track"
          element={<Track />}
        />

        <Route
          path="/notifications"
          element={<Notifications />}
        />

        {/* NOTICES */}
        <Route
          path="/notices"
          element={<Notices />}
        />

        <Route
          path="/notices/:noticeId"
          element={<NoticeDetails />}
        />
        <Route path="/help" element={<Help />} />

        </Routes>
      </div>

    </BrowserRouter>
  );
}

function AccessibilityControls({ scale, onScaleChange }) {
  return (
    <div className="accessibility-tools" role="group" aria-label="Page size controls">
      <span>Text size</span>
      <span>{Math.round(scale * 100)}%</span>
      <button type="button" onClick={() => onScaleChange((current) => Math.max(0.8, +(current - 0.1).toFixed(1)))} aria-label="Decrease page size">A-</button>
      <button type="button" onClick={() => onScaleChange(1)} aria-label="Reset page size">A</button>
      <button type="button" onClick={() => onScaleChange((current) => Math.min(1.3, +(current + 0.1).toFixed(1)))} aria-label="Increase page size">A+</button>
    </div>
  );
}

export default App;
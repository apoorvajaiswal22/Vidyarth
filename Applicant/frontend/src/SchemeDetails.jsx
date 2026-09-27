import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./SchemeDetails.css";

const schemeData = {
  "pre-matric": {
    en: {
      type: "SCHOLARSHIP",
      title: "Pre-Matric Scholarship Scheme for ST Students",
      intro: "Centrally sponsored support for eligible Scheduled Tribe students studying in Classes IX and X.",
      overviewTitle: "Overview",
      overview: "The Ministry describes this as a Centrally Sponsored Scheme implemented through States and Union Territories. Applications, verification and disbursement are handled through the applicable State/UT or National Scholarship Portal process.",
      eligibilityTitle: "Eligibility",
      eligibility: [
        "The student must belong to a Scheduled Tribe.",
        "The student must be studying in Class IX or X.",
        "The official scheme page states a parental income ceiling of Rs. 2.50 lakh per annum; confirm the latest applicable notification before applying.",
        "State/UT implementation and current notification requirements must also be met.",
      ],
      benefitsTitle: "Benefits",
      benefits: [
        "The Ministry page lists Rs. 225 per month for day scholars and Rs. 525 per month for hostellers.",
        "The listed rates apply for 10 months in a year, subject to current official rules.",
        "Disbursement is made through the prescribed government process, including DBT where applicable.",
      ],
      documentsTitle: "Documents to Prepare",
      documents: ["Scheduled Tribe certificate", "Class IX/X enrolment or institution details", "Academic records", "Income certificate as required", "Bank account and identity details", "Any additional documents requested by the State/UT portal"],
      processTitle: "Application and Verification",
      process: ["Check the relevant State/UT or National Scholarship Portal notice.", "Register and complete the student application.", "Upload the documents requested by that portal.", "The institution and State/UT authorities verify the application.", "Track corrections, verification and disbursement through the portal used for submission."],
      importantTitle: "Current Rules",
      important: "The scheme page reports the rates and income ceiling above. Application windows, document lists and implementation details may change; follow the latest official notice.",
      apply: "Apply Now",
      back: "Back to Schemes",
    },
    hi: {
      type: "छात्रवृत्ति",
      title: "ST विद्यार्थियों के लिए प्री-मैट्रिक छात्रवृत्ति योजना",
      intro: "कक्षा 9 और 10 में पढ़ने वाले पात्र अनुसूचित जनजाति विद्यार्थियों के लिए केंद्र प्रायोजित सहायता।",
      overviewTitle: "योजना का परिचय",
      overview: "मंत्रालय के अनुसार यह केंद्र प्रायोजित योजना है, जिसे राज्य और केंद्र शासित प्रदेश लागू करते हैं। आवेदन, सत्यापन और राशि वितरण संबंधित राज्य/केंद्र शासित प्रदेश या राष्ट्रीय छात्रवृत्ति पोर्टल की प्रक्रिया के अनुसार होता है।",
      eligibilityTitle: "पात्रता",
      eligibility: ["विद्यार्थी अनुसूचित जनजाति से होना चाहिए।", "विद्यार्थी कक्षा 9 या 10 में अध्ययनरत होना चाहिए।", "आधिकारिक योजना पृष्ठ पर माता-पिता की वार्षिक आय सीमा 2.50 लाख रुपये दी गई है; आवेदन से पहले नवीनतम अधिसूचना की पुष्टि करें।", "राज्य/केंद्र शासित प्रदेश की लागू प्रक्रिया और नवीनतम अधिसूचना की शर्तें भी पूरी होनी चाहिए।"],
      benefitsTitle: "लाभ",
      benefits: ["मंत्रालय के पृष्ठ पर डे-स्कॉलर के लिए 225 रुपये प्रतिमाह और हॉस्टल में रहने वालों के लिए 525 रुपये प्रतिमाह दिए गए हैं।", "उल्लिखित दरें वर्ष में 10 महीने के लिए हैं और वर्तमान आधिकारिक नियमों के अधीन हैं।", "राशि निर्धारित सरकारी प्रक्रिया के माध्यम से दी जाती है; जहां लागू हो, DBT का उपयोग होता है।"],
      documentsTitle: "तैयार रखने वाले दस्तावेज़",
      documents: ["अनुसूचित जनजाति प्रमाणपत्र", "कक्षा 9/10 का नामांकन या संस्थान विवरण", "शैक्षणिक रिकॉर्ड", "आवश्यकतानुसार आय प्रमाणपत्र", "बैंक खाते और पहचान का विवरण", "राज्य/केंद्र शासित प्रदेश पोर्टल द्वारा मांगे गए अन्य दस्तावेज़"],
      processTitle: "आवेदन एवं सत्यापन",
      process: ["संबंधित राज्य/केंद्र शासित प्रदेश या राष्ट्रीय छात्रवृत्ति पोर्टल की सूचना देखें।", "पंजीकरण कर विद्यार्थी आवेदन पूरा करें।", "पोर्टल द्वारा मांगे गए दस्तावेज़ अपलोड करें।", "संस्थान और राज्य/केंद्र शासित प्रदेश के अधिकारी आवेदन सत्यापित करते हैं।", "सुधार, सत्यापन और राशि वितरण की स्थिति उसी पोर्टल पर देखें जहां आवेदन किया है।"],
      importantTitle: "वर्तमान नियम",
      important: "ऊपर दी गई दरें और आय सीमा मंत्रालय के योजना पृष्ठ पर उपलब्ध हैं। आवेदन अवधि, दस्तावेज़ सूची और कार्यान्वयन की जानकारी बदल सकती है; नवीनतम आधिकारिक सूचना का पालन करें।",
      apply: "अभी आवेदन करें",
      back: "योजनाओं पर वापस जाएं",
    },
  },
  "top-class": {
    en: {
      type: "SCHOLARSHIP",
      title: "Top Class Education Scholarship for ST Students",
      intro: "Higher-education support for eligible ST students admitted to institutions covered by the current scheme guidelines.",
      overviewTitle: "Overview",
      overview: "The Ministry lists Top Class Education for ST Students as an active Central Sector Scheme. Eligibility, covered institutions, award limits and application windows are governed by the current scheme guidelines and official notices.",
      eligibilityTitle: "Eligibility",
      eligibility: ["The applicant must belong to a Scheduled Tribe.", "Annual family income must not exceed INR 8 lakh under the seeded Top Class criterion.", "The applicant must have admission to an institution/course covered by the current notified scheme rules.", "Academic and other conditions must also be checked against the current official guidelines.", "The applicant must submit the required institution and supporting records."],
      benefitsTitle: "Benefits",
      benefits: ["Education-related financial assistance for selected eligible students.", "Tuition and other covered expenses are subject to the latest scheme guidelines and prescribed limits.", "Awards are processed through the official application and verification workflow."],
      documentsTitle: "Documents to Prepare",
      documents: ["Scheduled Tribe certificate", "Admission letter and institution/course details", "Academic records", "Income certificate as specified by current rules", "Bank account and identity details", "Any additional documents listed in the latest notice"],
      processTitle: "Application and Selection",
      process: ["Check the current Ministry/DBT notification and institution list.", "Register on the application portal named in the notice.", "Complete applicant and course details and upload supporting documents.", "The institution and designated authorities verify the application.", "Selection and award decisions follow the approved scheme criteria and available slots."],
      importantTitle: "Check the Latest Notice",
      important: "The portal applies the seeded INR 8 lakh annual-income ceiling. The current institution list, award components and deadline must still be confirmed in the latest official notification.",
      apply: "Apply Now",
      back: "Back to Schemes",
    },
    hi: {
      type: "छात्रवृत्ति",
      title: "ST विद्यार्थियों के लिए टॉप क्लास शिक्षा छात्रवृत्ति",
      intro: "वर्तमान योजना दिशानिर्देशों में शामिल संस्थानों में प्रवेश पाने वाले पात्र ST विद्यार्थियों के लिए उच्च शिक्षा सहायता।",
      overviewTitle: "योजना का परिचय",
      overview: "मंत्रालय टॉप क्लास एजुकेशन फॉर ST स्टूडेंट्स को सक्रिय केंद्रीय क्षेत्र योजना के रूप में सूचीबद्ध करता है। पात्रता, शामिल संस्थान, सहायता सीमा और आवेदन अवधि वर्तमान योजना दिशानिर्देशों एवं आधिकारिक सूचनाओं के अनुसार निर्धारित होती है।",
      eligibilityTitle: "पात्रता",
      eligibility: ["आवेदक अनुसूचित जनजाति से होना चाहिए।", "दिए गए Top Class मानदंड के अनुसार पारिवारिक वार्षिक आय 8 लाख रुपये से अधिक नहीं होनी चाहिए।", "आवेदक को वर्तमान अधिसूचित योजना नियमों में शामिल संस्थान/पाठ्यक्रम में प्रवेश मिला होना चाहिए।", "शैक्षणिक और अन्य शर्तें नवीनतम आधिकारिक दिशानिर्देशों में जांचें।", "आवेदक को संस्थान संबंधी और अन्य आवश्यक रिकॉर्ड जमा करने होंगे."],
      benefitsTitle: "लाभ",
      benefits: ["चयनित पात्र विद्यार्थियों के लिए शिक्षा संबंधी वित्तीय सहायता।", "ट्यूशन और अन्य स्वीकृत खर्च नवीनतम योजना दिशानिर्देशों एवं निर्धारित सीमा के अधीन हैं।", "पुरस्कार आधिकारिक आवेदन और सत्यापन प्रक्रिया से दिए जाते हैं।"],
      documentsTitle: "तैयार रखने वाले दस्तावेज़",
      documents: ["अनुसूचित जनजाति प्रमाणपत्र", "प्रवेश पत्र और संस्थान/पाठ्यक्रम विवरण", "शैक्षणिक रिकॉर्ड", "वर्तमान नियमों के अनुसार आय प्रमाणपत्र", "बैंक खाते और पहचान का विवरण", "नवीनतम सूचना में सूचीबद्ध अन्य दस्तावेज़"],
      processTitle: "आवेदन एवं चयन",
      process: ["मंत्रालय/DBT की वर्तमान सूचना और संस्थान सूची देखें।", "सूचना में दिए गए आवेदन पोर्टल पर पंजीकरण करें।", "आवेदक और पाठ्यक्रम का विवरण भरें तथा दस्तावेज़ अपलोड करें।", "संस्थान और निर्धारित अधिकारी आवेदन सत्यापित करते हैं।", "चयन और सहायता का निर्णय स्वीकृत योजना मानदंडों तथा उपलब्ध सीटों के अनुसार होता है।"],
      importantTitle: "नवीनतम सूचना देखें",
      important: "पोर्टल में बीजित वार्षिक आय सीमा 8 लाख रुपये है। वर्तमान संस्थान सूची, सहायता घटक और अंतिम तिथि की पुष्टि नवीनतम आधिकारिक अधिसूचना से करें।",
      apply: "अभी आवेदन करें",
      back: "योजनाओं पर वापस जाएं",
    },
  },
  "post-matric": {
    en: {
      type: "SCHOLARSHIP",
      title: "Post-Matric Scholarship for ST Students",
      intro:
        "Financial assistance for eligible Scheduled Tribe students pursuing post-matric and post-secondary education.",

      overviewTitle: "Overview",
      overview:
        "The Post-Matric Scholarship for ST Students provides financial assistance to eligible ST students pursuing education after matriculation. The scheme is implemented through the concerned States and Union Territories as per applicable guidelines.",

      eligibilityTitle: "Eligibility",
      eligibility: [
        "Applicant must belong to the Scheduled Tribe (ST) category.",
        "Applicant must be pursuing an eligible post-matric or post-secondary course.",
        "Annual family income must not exceed INR 2.5 lakh under the seeded criterion.",
        "Valid academic and category documents must be available.",
      ],

      benefitsTitle: "Benefits",
      benefits: [
        "Financial assistance for eligible students.",
        "Support towards education-related expenses.",
        "Assistance is provided according to applicable scheme guidelines.",
        "Funds are disbursed through the prescribed government process.",
      ],

      documentsTitle: "Required Documents",
      documents: [
        "Valid ST Certificate",
        "Academic records / marksheets",
        "Student and institution details",
        "Income Certificate, where applicable",
        "Bank account details",
        "Other documents required under applicable guidelines",
      ],

      processTitle: "Application Process",
      process: [
        "Create your student account.",
        "Enter personal and academic details.",
        "Select the applicable scholarship scheme.",
        "Upload the required documents.",
        "Review the information carefully.",
        "Submit the application.",
      ],

      importantTitle: "Important Information",
      important:
        "The portal applies the seeded INR 2.5 lakh annual-income ceiling. Check the latest State/UT notification for other eligibility, benefit and document conditions.",

      apply: "Apply Now",
      back: "Back to Schemes",
    },

    hi: {
      type: "छात्रवृत्ति",
      title: "अनुसूचित जनजाति विद्यार्थियों के लिए पोस्ट-मैट्रिक छात्रवृत्ति",
      intro:
        "मैट्रिक के बाद शिक्षा प्राप्त करने वाले पात्र अनुसूचित जनजाति विद्यार्थियों के लिए वित्तीय सहायता।",

      overviewTitle: "योजना का परिचय",
      overview:
        "पोस्ट-मैट्रिक छात्रवृत्ति योजना मैट्रिक के बाद शिक्षा प्राप्त करने वाले पात्र ST विद्यार्थियों को वित्तीय सहायता प्रदान करती है। योजना संबंधित राज्य और केंद्र शासित प्रदेशों द्वारा लागू दिशानिर्देशों के अनुसार लागू की जाती है।",

      eligibilityTitle: "पात्रता",
      eligibility: [
        "आवेदक अनुसूचित जनजाति (ST) वर्ग से होना चाहिए।",
        "आवेदक किसी पात्र पोस्ट-मैट्रिक या पोस्ट-सेकेंडरी पाठ्यक्रम में अध्ययनरत होना चाहिए।",
        "दिए गए योजना मानदंड के अनुसार पारिवारिक वार्षिक आय 2.5 लाख रुपये से अधिक नहीं होनी चाहिए।",
        "वैध शैक्षणिक और श्रेणी संबंधी दस्तावेज उपलब्ध होने चाहिए।",
      ],

      benefitsTitle: "लाभ",
      benefits: [
        "पात्र विद्यार्थियों को वित्तीय सहायता।",
        "शिक्षा से संबंधित खर्चों में सहायता।",
        "लागू योजना दिशानिर्देशों के अनुसार सहायता।",
        "निर्धारित सरकारी प्रक्रिया के माध्यम से राशि का वितरण।",
      ],

      documentsTitle: "आवश्यक दस्तावेज",
      documents: [
        "वैध ST प्रमाण पत्र",
        "शैक्षणिक रिकॉर्ड / अंकतालिका",
        "विद्यार्थी और संस्थान का विवरण",
        "आय प्रमाण पत्र, जहां लागू हो",
        "बैंक खाते का विवरण",
        "लागू दिशानिर्देशों के अनुसार अन्य आवश्यक दस्तावेज",
      ],

      processTitle: "आवेदन प्रक्रिया",
      process: [
        "विद्यार्थी खाता बनाएं।",
        "व्यक्तिगत और शैक्षणिक विवरण भरें।",
        "लागू छात्रवृत्ति योजना चुनें।",
        "आवश्यक दस्तावेज अपलोड करें।",
        "जानकारी को ध्यानपूर्वक जांचें।",
        "आवेदन जमा करें।",
      ],

      importantTitle: "महत्वपूर्ण जानकारी",
      important:
        "पोर्टल में बीजित वार्षिक आय सीमा 2.5 लाख रुपये है। अन्य पात्रता, लाभ और दस्तावेज़ शर्तों के लिए नवीनतम राज्य/केंद्र शासित प्रदेश की अधिसूचना देखें।",

      apply: "अभी आवेदन करें",
      back: "योजनाओं पर वापस जाएं",
    },
  },

  national: {
    en: {
      type: "SCHOLARSHIP",
      title: "National Scholarship for Higher Education of ST Students",
      intro:
        "Scholarship support for eligible Scheduled Tribe students pursuing higher education.",

      overviewTitle: "Overview",
      overview:
        "The National Scholarship component supports eligible Scheduled Tribe students pursuing higher education. It is part of the higher education support provided by the Ministry of Tribal Affairs under the applicable Central Sector scheme.",

      eligibilityTitle: "Eligibility",
      eligibility: [
        "Applicant must belong to the Scheduled Tribe category.",
        "Applicant must be pursuing eligible higher education.",
        "Applicant must satisfy the academic requirements prescribed under the scheme.",
        "Applicant must provide valid supporting documents.",
      ],

      benefitsTitle: "Benefits",
      benefits: [
        "Financial scholarship support for eligible higher education.",
        "Assistance towards prescribed educational expenses.",
        "Support according to the applicable scheme guidelines.",
        "Government assistance through the prescribed process.",
      ],

      documentsTitle: "Required Documents",
      documents: [
        "ST Certificate",
        "Previous academic marksheets",
        "Admission / institution proof",
        "Income-related documents, where applicable",
        "Bank account details",
        "Other documents prescribed by the scheme",
      ],

      processTitle: "Application Process",
      process: [
        "Register on the Vidyarth portal.",
        "Complete your personal profile.",
        "Enter higher education and academic details.",
        "Select the National Scholarship scheme.",
        "Upload supporting documents.",
        "Review and submit the application.",
      ],

      importantTitle: "Important Information",
      important:
        "Students should carefully check the current scheme guidelines, eligibility conditions and required documents before submitting an application.",

      apply: "Apply Now",
      back: "Back to Schemes",
    },

    hi: {
      type: "छात्रवृत्ति",
      title: "ST विद्यार्थियों की उच्च शिक्षा के लिए राष्ट्रीय छात्रवृत्ति",
      intro:
        "उच्च शिक्षा प्राप्त करने वाले पात्र अनुसूचित जनजाति विद्यार्थियों के लिए छात्रवृत्ति सहायता।",

      overviewTitle: "योजना का परिचय",
      overview:
        "राष्ट्रीय छात्रवृत्ति योजना पात्र अनुसूचित जनजाति विद्यार्थियों को उच्च शिक्षा प्राप्त करने में सहायता प्रदान करती है। यह जनजातीय कार्य मंत्रालय के अंतर्गत लागू केंद्रीय क्षेत्र योजना के माध्यम से उच्च शिक्षा के लिए सहायता प्रदान करती है।",

      eligibilityTitle: "पात्रता",
      eligibility: [
        "आवेदक अनुसूचित जनजाति वर्ग से होना चाहिए।",
        "आवेदक पात्र उच्च शिक्षा पाठ्यक्रम में अध्ययनरत होना चाहिए।",
        "आवेदक को योजना के अंतर्गत निर्धारित शैक्षणिक आवश्यकताओं को पूरा करना चाहिए।",
        "आवेदक के पास वैध सहायक दस्तावेज होने चाहिए।",
      ],

      benefitsTitle: "लाभ",
      benefits: [
        "पात्र उच्च शिक्षा के लिए वित्तीय छात्रवृत्ति सहायता।",
        "निर्धारित शैक्षणिक खर्चों के लिए सहायता।",
        "लागू योजना दिशानिर्देशों के अनुसार सहायता।",
        "निर्धारित प्रक्रिया के माध्यम से सरकारी सहायता।",
      ],

      documentsTitle: "आवश्यक दस्तावेज",
      documents: [
        "ST प्रमाण पत्र",
        "पिछली शैक्षणिक अंकतालिकाएं",
        "प्रवेश / संस्थान का प्रमाण",
        "आय संबंधी दस्तावेज, जहां लागू हो",
        "बैंक खाते का विवरण",
        "योजना के अनुसार अन्य आवश्यक दस्तावेज",
      ],

      processTitle: "आवेदन प्रक्रिया",
      process: [
        "Vidyarth पोर्टल पर पंजीकरण करें।",
        "अपनी व्यक्तिगत प्रोफाइल पूरी करें।",
        "उच्च शिक्षा और शैक्षणिक विवरण भरें।",
        "राष्ट्रीय छात्रवृत्ति योजना चुनें।",
        "सहायक दस्तावेज अपलोड करें।",
        "आवेदन की जांच करके जमा करें।",
      ],

      importantTitle: "महत्वपूर्ण जानकारी",
      important:
        "आवेदन जमा करने से पहले विद्यार्थियों को वर्तमान योजना दिशानिर्देश, पात्रता शर्तों और आवश्यक दस्तावेजों की जांच करनी चाहिए।",

      apply: "अभी आवेदन करें",
      back: "योजनाओं पर वापस जाएं",
    },
  },

  fellowship: {
    en: {
      type: "FELLOWSHIP",
      title: "National Fellowship for ST Students",
      intro:
        "Fellowship assistance for eligible Scheduled Tribe students pursuing research and advanced academic programmes.",

      overviewTitle: "Overview",
      overview:
        "The Ministry portal describes NFST as a Central Sector Scheme. It reports 750 fresh fellowships each year for eligible ST students pursuing specified research programmes; current intake and rules follow the latest official notice.",

      eligibilityTitle: "Eligibility",
      eligibility: [
        "Applicant must belong to the Scheduled Tribe category.",
        "Annual family income must not exceed INR 6 lakh under the seeded NFST criterion.",
        "Eligible programmes listed by the official portal include Ph.D., Integrated M.Phil.+Ph.D. and M.Phil. in Psychiatric Social Work or Clinical Psychology.",
        "Applicant must meet the academic qualifications prescribed by the scheme.",
        "Applicant must satisfy the applicable selection and documentation requirements.",
      ],

      benefitsTitle: "Benefits",
      benefits: [
        "Fellowship assistance as prescribed under the scheme.",
        "Support for research and academic activities.",
        "Contingency support where applicable.",
        "HRA or other applicable components according to the scheme guidelines.",
      ],

      documentsTitle: "Required Documents",
      documents: [
        "ST Certificate",
        "Academic qualification certificates",
        "Admission / research programme proof",
        "Research-related documents, where applicable",
        "Institution details",
        "Bank account details",
      ],

      processTitle: "Application Process",
      process: [
        "Create an account on the portal.",
        "Complete your academic profile.",
        "Enter research / programme details.",
        "Select the National Fellowship scheme.",
        "Upload required documents or fetch available records through DigiLocker where supported.",
        "Review the application and submit it.",
      ],

      importantTitle: "Important Information",
      important:
        "The portal applies the seeded INR 6 lakh annual-income ceiling. Selection, duration and fellowship components remain governed by the current National Fellowship guidelines and notices.",

      apply: "Apply Now",
      back: "Back to Schemes",
    },

    hi: {
      type: "फेलोशिप",
      title: "ST विद्यार्थियों के लिए राष्ट्रीय फेलोशिप",
      intro:
        "अनुसंधान और उच्च शैक्षणिक कार्यक्रमों में अध्ययन करने वाले पात्र अनुसूचित जनजाति विद्यार्थियों के लिए फेलोशिप सहायता।",

      overviewTitle: "योजना का परिचय",
      overview:
        "मंत्रालय पोर्टल NFST को केंद्रीय क्षेत्र योजना बताता है। पोर्टल निर्दिष्ट शोध कार्यक्रमों में पात्र ST विद्यार्थियों के लिए प्रतिवर्ष 750 नई फेलोशिप बताता है; वर्तमान संख्या और नियम नवीनतम आधिकारिक सूचना के अनुसार होंगे।",

      eligibilityTitle: "पात्रता",
      eligibility: [
        "आवेदक अनुसूचित जनजाति वर्ग से होना चाहिए।",
        "दिए गए NFST मानदंड के अनुसार पारिवारिक वार्षिक आय 6 लाख रुपये से अधिक नहीं होनी चाहिए।",
        "आधिकारिक पोर्टल में Ph.D., Integrated M.Phil.+Ph.D. और Psychiatric Social Work या Clinical Psychology में M.Phil. जैसे कार्यक्रम शामिल हैं।",
        "आवेदक को योजना के अनुसार निर्धारित शैक्षणिक योग्यता पूरी करनी चाहिए।",
        "आवेदक को लागू चयन और दस्तावेज संबंधी आवश्यकताओं को पूरा करना चाहिए।",
      ],

      benefitsTitle: "लाभ",
      benefits: [
        "योजना के अनुसार फेलोशिप सहायता।",
        "अनुसंधान और शैक्षणिक गतिविधियों के लिए सहायता।",
        "जहां लागू हो, आकस्मिक व्यय सहायता।",
        "योजना दिशानिर्देशों के अनुसार HRA या अन्य लागू सहायता।",
      ],

      documentsTitle: "आवश्यक दस्तावेज",
      documents: [
        "ST प्रमाण पत्र",
        "शैक्षणिक योग्यता प्रमाण पत्र",
        "प्रवेश / अनुसंधान कार्यक्रम का प्रमाण",
        "अनुसंधान संबंधी दस्तावेज, जहां लागू हो",
        "संस्थान का विवरण",
        "बैंक खाते का विवरण",
      ],

      processTitle: "आवेदन प्रक्रिया",
      process: [
        "पोर्टल पर अपना खाता बनाएं।",
        "अपनी शैक्षणिक प्रोफाइल पूरी करें।",
        "अनुसंधान / कार्यक्रम का विवरण भरें।",
        "राष्ट्रीय फेलोशिप योजना चुनें।",
        "DigiLocker समर्थित होने पर उपलब्ध रिकॉर्ड प्राप्त करें या आवश्यक दस्तावेज अपलोड करें।",
        "आवेदन की जांच करके जमा करें।",
      ],

      importantTitle: "महत्वपूर्ण जानकारी",
      important:
        "पोर्टल में बीजित वार्षिक आय सीमा 6 लाख रुपये है। चयन, अवधि और फेलोशिप घटक वर्तमान राष्ट्रीय फेलोशिप दिशानिर्देशों एवं अधिसूचनाओं के अनुसार होंगे।",

      apply: "अभी आवेदन करें",
      back: "योजनाओं पर वापस जाएं",
    },
  },

  overseas: {
    en: {
      type: "SCHOLARSHIP",
      title: "National Overseas Scholarship",
      intro:
        "Financial assistance for eligible Scheduled Tribe students pursuing higher education abroad.",

      overviewTitle: "Overview",
      overview:
        "The Ministry portal describes NOS as a Central Sector Scheme and reports 20 fresh scholarships each year for eligible ST students pursuing Master's, Ph.D. and Post-Doctoral courses abroad. Current intake and conditions are set by the latest official notice.",

      eligibilityTitle: "Eligibility",
      eligibility: [
        "Applicant must belong to the Scheduled Tribe category.",
        "Applicant must meet the prescribed academic requirements.",
        "The intended programme must be an eligible Master's, Ph.D. or Post-Doctoral course abroad under the current guidelines.",
        "Applicant must satisfy the applicable age, income and other scheme conditions.",
      ],

      benefitsTitle: "Benefits",
      benefits: [
        "Support towards tuition fees as prescribed.",
        "Annual maintenance allowance according to the scheme.",
        "Contingency allowance as applicable.",
        "Applicable travel-related assistance.",
        "Other permitted components such as visa or medical insurance support, where applicable.",
      ],

      documentsTitle: "Required Documents",
      documents: [
        "ST Certificate",
        "Academic qualification certificates",
        "University admission / offer letter",
        "Income Certificate",
        "Passport / identity documents",
        "Bank account details",
        "Other documents prescribed for overseas scholarship",
      ],

      processTitle: "Application Process",
      process: [
        "Register on the scholarship portal.",
        "Complete personal and academic details.",
        "Provide overseas university and course information.",
        "Upload admission and supporting documents or use DigiLocker where supported.",
        "Review the application carefully.",
        "Submit the application for verification and further processing.",
      ],

      importantTitle: "Important Information",
      important:
        "The scholarship covers prescribed components subject to the applicable rules. Applicants should check the latest official notification for eligibility, financial limits, deadlines and document requirements.",

      apply: "Apply Now",
      back: "Back to Schemes",
    },

    hi: {
      type: "छात्रवृत्ति",
      title: "राष्ट्रीय विदेश छात्रवृत्ति",
      intro:
        "विदेश में उच्च शिक्षा प्राप्त करने वाले पात्र अनुसूचित जनजाति विद्यार्थियों के लिए वित्तीय सहायता।",

      overviewTitle: "योजना का परिचय",
      overview:
        "मंत्रालय पोर्टल NOS को केंद्रीय क्षेत्र योजना बताता है और विदेश में Master's, Ph.D. तथा Post-Doctoral पाठ्यक्रमों के लिए प्रतिवर्ष 20 नई छात्रवृत्तियां बताता है। वर्तमान संख्या और शर्तें नवीनतम आधिकारिक सूचना से तय होती हैं।",

      eligibilityTitle: "पात्रता",
      eligibility: [
        "आवेदक अनुसूचित जनजाति वर्ग से होना चाहिए।",
        "आवेदक को निर्धारित शैक्षणिक आवश्यकताओं को पूरा करना चाहिए।",
        "कार्यक्रम वर्तमान दिशानिर्देशों के अंतर्गत विदेश में पात्र Master's, Ph.D. या Post-Doctoral पाठ्यक्रम होना चाहिए।",
        "आवेदक को लागू आयु, आय और अन्य योजना शर्तों को पूरा करना चाहिए।",
      ],

      benefitsTitle: "लाभ",
      benefits: [
        "निर्धारित नियमों के अनुसार ट्यूशन फीस में सहायता।",
        "योजना के अनुसार वार्षिक रखरखाव भत्ता।",
        "लागू होने पर आकस्मिक व्यय भत्ता।",
        "लागू यात्रा संबंधी सहायता।",
        "जहां लागू हो, वीजा या मेडिकल इंश्योरेंस जैसी अन्य अनुमत सहायता।",
      ],

      documentsTitle: "आवश्यक दस्तावेज",
      documents: [
        "ST प्रमाण पत्र",
        "शैक्षणिक योग्यता प्रमाण पत्र",
        "विश्वविद्यालय का प्रवेश / ऑफर लेटर",
        "आय प्रमाण पत्र",
        "पासपोर्ट / पहचान दस्तावेज",
        "बैंक खाते का विवरण",
        "विदेश छात्रवृत्ति के लिए निर्धारित अन्य दस्तावेज",
      ],

      processTitle: "आवेदन प्रक्रिया",
      process: [
        "छात्रवृत्ति पोर्टल पर पंजीकरण करें।",
        "व्यक्तिगत और शैक्षणिक विवरण भरें।",
        "विदेशी विश्वविद्यालय और पाठ्यक्रम की जानकारी दें।",
        "DigiLocker समर्थित होने पर उपलब्ध रिकॉर्ड प्राप्त करें या प्रवेश और सहायक दस्तावेज अपलोड करें।",
        "आवेदन की सावधानीपूर्वक जांच करें।",
        "सत्यापन और आगे की प्रक्रिया के लिए आवेदन जमा करें।",
      ],

      importantTitle: "महत्वपूर्ण जानकारी",
      important:
        "छात्रवृत्ति लागू नियमों के अनुसार निर्धारित घटकों को कवर करती है। पात्रता, वित्तीय सीमा, अंतिम तिथि और दस्तावेजों के लिए नवीनतम आधिकारिक अधिसूचना की जांच करें।",

      apply: "अभी आवेदन करें",
      back: "योजनाओं पर वापस जाएं",
    },
  },
};

function DetailSection({ title, children }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>
      <div className="detail-content">{children}</div>
    </section>
  );
}

function DetailListSection({ title, items }) {
  return (
    <section className="detail-section">
      <h2>{title}</h2>

      <ul className="detail-list">
        {items.map((item, index) => (
          <li key={index}>
            <span className="list-icon">✓</span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function SchemeDetails() {
  const { schemeId } = useParams();

  const [lang, setLang] = useState("en");

  // IMPORTANT:
  // URL names and schemeData keys are different for 3 schemes.
  const schemeKeyMap = {
    "pre-matric": "pre-matric",
    "post-matric": "post-matric",
    "top-class": "top-class",
    national: "national",
    "national-scholarship": "national",
    "national-fellowship": "fellowship",
    "national-overseas": "overseas",
  };

  const scheme = schemeData[schemeKeyMap[schemeId]];
  const officialSchemeUrl = schemeId === "national-overseas"
    ? "https://overseas.tribal.gov.in/"
    : schemeId === "national-fellowship"
      ? "https://fellowship.tribal.gov.in/"
      : schemeId === "pre-matric" || schemeId === "post-matric"
        ? "https://dbttribal.gov.in/AllScheme.aspx"
        : "https://tribal.nic.in/ScholarshiP.aspx";

  if (!scheme) {
    return (
      <div className="scheme-not-found">
        <h1>Scheme Not Found</h1>

        <p>
          The scholarship or fellowship scheme you are looking for could not
          be found.
        </p>

        <Link to="/schemes">← Back to Schemes</Link>
      </div>
    );
  }

  const t = scheme[lang];

  return (
    <div className="scheme-details-page">
      {/* Government Top Bar */}
      <div className="gov-bar">
        <div className="details-container gov-inner">
          <span>
            {lang === "en"
              ? "Government of India"
              : "भारत सरकार"}
          </span>

          <div className="language-switch">
            <button
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              English
            </button>

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
      <header className="details-header">
        <div className="details-container header-inner">
          <Link to="/" className="details-logo">
            <img className="details-logo-image" src="/vidyarth-logo.svg" alt="" />

            <div>
              <h1>VIDYARTH</h1>

              <p>
                {lang === "en"
                  ? "Scholarship & Fellowship Management System"
                  : "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"}
              </p>
            </div>
          </Link>
        </div>
      </header>

      {/* Main */}
      <main>
        <div className="details-container">
          {/* Breadcrumb */}
          <div className="breadcrumb">
            <Link to="/">
              {lang === "en" ? "Home" : "मुखपृष्ठ"}
            </Link>

            <span>›</span>

            <Link to="/schemes">
              {lang === "en" ? "Schemes" : "योजनाएं"}
            </Link>

            <span>›</span>

            <span>{t.title}</span>
          </div>

          {/* Hero */}
          <section className="scheme-detail-hero">
            <div className="scheme-detail-hero-left">
              <span className="scheme-type">{t.type}</span>

              <h1>{t.title}</h1>

              <p>{t.intro}</p>
            </div>

            <div className="scheme-detail-hero-right">
              <Link to="/apply" className="apply-button">
                {t.apply}
              </Link>
            </div>
          </section>

          {/* Content Layout */}
          <div className="details-layout">
            {/* Main Content */}
            <article className="details-main">
              <DetailSection title={t.overviewTitle}>
                <p>{t.overview}</p>
              </DetailSection>

              <DetailListSection
                title={t.eligibilityTitle}
                items={t.eligibility}
              />

              <DetailListSection
                title={t.benefitsTitle}
                items={t.benefits}
              />

              <DetailListSection
                title={t.documentsTitle}
                items={t.documents}
              />

              <DetailListSection
                title={t.processTitle}
                items={t.process}
              />

              <section className="important-box">
                <div className="important-icon">!</div>

                <div>
                  <h2>{t.importantTitle}</h2>
                  <p>{t.important}</p>
                </div>
              </section>
            </article>

            {/* Sidebar */}
            <aside className="details-sidebar">
              <div className="sidebar-card">
                <h3>
                  {lang === "en"
                    ? "Scheme Information"
                    : "योजना की जानकारी"}
                </h3>

                <div className="sidebar-item">
                  <span>
                    {lang === "en" ? "Scheme Type" : "योजना का प्रकार"}
                  </span>

                  <strong>{t.type}</strong>
                </div>

                <div className="sidebar-item">
                  <span>
                    {lang === "en"
                      ? "Application Mode"
                      : "आवेदन का माध्यम"}
                  </span>

                  <strong>
                    {lang === "en" ? "Online" : "ऑनलाइन"}
                  </strong>
                </div>

                <div className="sidebar-item">
                  <span>
                    {lang === "en"
                      ? "Applicant Category"
                      : "आवेदक श्रेणी"}
                  </span>

                  <strong>ST</strong>
                </div>

                <Link to="/apply" className="sidebar-apply">
                  {t.apply}
                </Link>
              </div>

              <div className="sidebar-card help-card">
                <h3>
                  {lang === "en"
                    ? "Need Help?"
                    : "सहायता चाहिए?"}
                </h3>

                <p>
                  {lang === "en"
                    ? "Check the Help & FAQ section for guidance regarding registration and applications."
                    : "पंजीकरण और आवेदन से संबंधित सहायता के लिए सहायता एवं FAQ अनुभाग देखें।"}
                </p>

                <Link to="/help">
                  {lang === "en"
                    ? "Help & FAQ →"
                    : "सहायता एवं FAQ →"}
                </Link>
              </div>

              <div className="sidebar-card official-source-card">
                <h3>
                  {lang === "en" ? "Official scheme information" : "आधिकारिक योजना जानकारी"}
                </h3>
                <p>
                  {lang === "en"
                    ? "Confirm current eligibility, dates, institution lists and benefits in the Ministry notification."
                    : "वर्तमान पात्रता, तिथियों, संस्थान सूची और लाभों की पुष्टि मंत्रालय की अधिसूचना में करें।"}
                </p>
                <a href={officialSchemeUrl} target="_blank" rel="noreferrer">
                  {lang === "en" ? "Open official portal" : "आधिकारिक पोर्टल खोलें"} →
                </a>
              </div>
            </aside>
          </div>

          {/* Back Button */}
          <div className="back-section">
            <Link to="/schemes" className="back-button">
              ← {t.back}
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="details-footer">
        <div className="details-container footer-inner">
          <div>
            <strong>VIDYARTH</strong>

            <p>
              {lang === "en"
                ? "Scholarship & Fellowship Management System"
                : "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"}
            </p>
          </div>

          <div>
            <p>
              {lang === "en"
                ? "Ministry of Tribal Affairs"
                : "जनजातीय कार्य मंत्रालय"}
            </p>

            <p>
              {lang === "en"
                ? "Government of India"
                : "भारत सरकार"}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default SchemeDetails;
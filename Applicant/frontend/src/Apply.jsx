import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { checkEligibility, createApplication, uploadDocuments } from "./api/api";
import "./Apply.css";

function getSchemeIncomeLimit(scheme) {
  const normalizedScheme = String(scheme || "").toLowerCase();
  if (normalizedScheme.includes("post matric") || normalizedScheme.includes("post-matric")) return 250000;
  if (normalizedScheme.includes("pre matric") || normalizedScheme.includes("pre-matric")) return 250000;
  if (normalizedScheme.includes("national fellowship")) return 600000;
  if (normalizedScheme.includes("top class")) return 800000;
  return null;
}

function Apply() {
  const [lang, setLang] = useState("en");
  const [searchParams] = useSearchParams();
  const [existingApplicationId, setExistingApplicationId] = useState(
    () => searchParams.get("applicationId") || "",
  );
  const [step, setStep] = useState(() => searchParams.get("applicationId") ? 4 : 1);
  const [submitting, setSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState("");
  const [eligibilityLoading, setEligibilityLoading] = useState(false);
  const [eligibilityResult, setEligibilityResult] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    dob: "",
    gender: "",
    mobile: "",
    email: "",
    address: "",
    college: "",
    course: "",
    year: "",
    cgpa: "",
    scheme: "",
    income: "",
    aadhaar: null,
    casteCertificate: null,
    marksheet: null,
  });

  const text = {
    hi: {
      home: "मुख्य पृष्ठ",
      dashboard: "डैशबोर्ड",
      title: "छात्रवृत्ति के लिए आवेदन",
      subtitle: "कृपया आवेदन पत्र को चरणबद्ध तरीके से पूरा करें।",

      step1: "व्यक्तिगत जानकारी",
      step2: "शैक्षणिक जानकारी",
      step3: "योजना चयन",
      step4: "दस्तावेज़",

      personalTitle: "व्यक्तिगत जानकारी",
      academicTitle: "शैक्षणिक जानकारी",
      schemeTitle: "छात्रवृत्ति योजना का चयन",
      documentTitle: "आवश्यक दस्तावेज़",

      name: "पूरा नाम",
      namePlaceholder: "अपना पूरा नाम दर्ज करें",

      dob: "जन्म तिथि",

      gender: "लिंग",
      selectGender: "लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
      other: "अन्य",

      mobile: "मोबाइल नंबर",

      email: "ईमेल",
      emailPlaceholder: "अपना ईमेल दर्ज करें",

      address: "पूरा पता",
      addressPlaceholder: "अपना पूरा पता दर्ज करें",

      college: "कॉलेज / संस्थान का नाम",
      collegePlaceholder: "अपने कॉलेज का नाम दर्ज करें",

      course: "पाठ्यक्रम",
      coursePlaceholder: "अपना पाठ्यक्रम दर्ज करें",

      year: "अध्ययन वर्ष",
      selectYear: "वर्ष चुनें",
      first: "प्रथम वर्ष",
      second: "द्वितीय वर्ष",
      third: "तृतीय वर्ष",
      fourth: "चतुर्थ वर्ष",

      cgpa: "प्रतिशत (न्यूनतम 75%)",
      cgpaPlaceholder: "प्रतिशत दर्ज करें (75-100)",

      scheme: "योजना",
      selectScheme: "योजना चुनें",
      preMatric: "प्री-मैट्रिक छात्रवृत्ति",
      postMatric: "पोस्ट-मैट्रिक छात्रवृत्ति",
      topClass: "टॉप क्लास शिक्षा छात्रवृत्ति",
      fellowship: "राष्ट्रीय फेलोशिप योजना",
      overseas: "राष्ट्रीय विदेश छात्रवृत्ति",

      income: "पारिवारिक वार्षिक आय",
      incomePlaceholder: "वार्षिक आय रुपये में दर्ज करें",

      aadhaar: "आधार कार्ड",
      casteCertificate: "जनजाति प्रमाण पत्र",
      marksheet: "अंक पत्र / मार्कशीट",
      chooseFile: "फाइल चुनें",

      previous: "पिछला चरण",
      save: "सहेजें और आगे बढ़ें",
      submit: "आवेदन जमा करें",

      review: "जमा करने से पहले अपनी जानकारी की समीक्षा करें।",

      success: "आपका आवेदन सफलतापूर्वक जमा कर दिया गया है!",
      applicationId: "आपका आवेदन ID है:",

      required: "कृपया सभी आवश्यक जानकारी भरें।",
      checkEligibility: "प्रारंभिक पात्रता जांचें",
      checkingEligibility: "पात्रता जांची जा रही है...",
      eligibilityDisclaimer: "यह प्रारंभिक जांच है, चयन का निर्णय नहीं।",
      criteriaTitle: "पोर्टल की प्रारंभिक पात्रता शर्तें",
      criteriaIncomeUnconfigured: "इस योजना की आय सीमा नवीनतम आधिकारिक नियमों से सत्यापित होगी।",
      criteriaMarks: "पात्रता के लिए कम से कम 75% अंक आवश्यक हैं।",
      criteriaCertificate: "ST श्रेणी के दावे के लिए वैध जनजाति प्रमाणपत्र आवश्यक है।",
      criteriaOfficial: "योजना के अंतिम नियमों के लिए नवीनतम आधिकारिक दिशानिर्देश भी देखें।",
    },

    en: {
      home: "Home",
      dashboard: "Dashboard",
      title: "Scholarship Application",
      subtitle: "Complete the application form step by step.",

      step1: "Personal Details",
      step2: "Academic Details",
      step3: "Scheme Selection",
      step4: "Documents",

      personalTitle: "Personal Information",
      academicTitle: "Academic Information",
      schemeTitle: "Select Scholarship Scheme",
      documentTitle: "Required Documents",

      name: "Full Name",
      namePlaceholder: "Enter your full name",

      dob: "Date of Birth",

      gender: "Gender",
      selectGender: "Select Gender",
      male: "Male",
      female: "Female",
      other: "Other",

      mobile: "Mobile Number",

      email: "Email",
      emailPlaceholder: "Enter your email address",

      address: "Full Address",
      addressPlaceholder: "Enter your complete address",

      college: "College / Institution Name",
      collegePlaceholder: "Enter your college name",

      course: "Course",
      coursePlaceholder: "Enter your course",

      year: "Year of Study",
      selectYear: "Select Year",
      first: "1st Year",
      second: "2nd Year",
      third: "3rd Year",
      fourth: "4th Year",

      cgpa: "Percentage (minimum 75%)",
      cgpaPlaceholder: "Enter percentage (75-100)",

      scheme: "Scheme",
      selectScheme: "Select Scheme",
      preMatric: "Pre-Matric Scholarship",
      postMatric: "Post-Matric Scholarship",
      topClass: "Top Class Education Scholarship",
      fellowship: "National Fellowship Scheme",
      overseas: "National Overseas Scholarship",

      income: "Annual Family Income",
      incomePlaceholder: "Enter annual income in rupees",

      aadhaar: "Aadhaar Card",
      casteCertificate: "Tribe Certificate",
      marksheet: "Marksheet",
      chooseFile: "Choose File",

      previous: "Previous",
      save: "Save & Continue",
      submit: "Submit Application",

      review: "Please review your information before submitting.",

      success: "Your application has been submitted successfully!",
      applicationId: "Your Application ID is:",

      required: "Please fill all required information.",
      checkEligibility: "Run preliminary eligibility check",
      checkingEligibility: "Checking eligibility...",
      eligibilityDisclaimer: "This is a preliminary check, not a selection decision.",
      criteriaTitle: "Portal pre-screening criteria",
      criteriaIncomeUnconfigured: "This scheme's income ceiling will be checked against the current official rules.",
      criteriaMarks: "A minimum of 75% marks is required for this pre-check.",
      criteriaCertificate: "A valid ST certificate is required to claim ST category eligibility.",
      criteriaOfficial: "Also check the latest official guidelines for scheme-specific rules.",
    },
  };

  const t = text[lang];
  const incomeLimit = getSchemeIncomeLimit(formData.scheme);
  const incomeLimitLabel = incomeLimit === null
    ? t.criteriaIncomeUnconfigured
    : lang === "hi"
      ? `पारिवारिक वार्षिक आय ₹${new Intl.NumberFormat("en-IN").format(incomeLimit)} से अधिक नहीं होनी चाहिए।`
      : `Annual family income must not exceed INR ${new Intl.NumberFormat("en-IN").format(incomeLimit)}.`;
  const incomeFieldLabel = incomeLimit === null
    ? `${t.income} (${lang === "hi" ? "योजना के अनुसार" : "scheme-specific limit"})`
    : `${t.income} (${lang === "hi" ? `अधिकतम ₹${new Intl.NumberFormat("en-IN").format(incomeLimit)}` : `max INR ${new Intl.NumberFormat("en-IN").format(incomeLimit)}`})`;

  const updateField = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const previousStep = () => {
    if (step > 1) {
      setStep(step - 1);

      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const handleFile = (field, file) => {
    const allowedTypes = ["application/pdf", "image/jpeg", "image/png"];
    if (file && !allowedTypes.includes(file.type)) {
      setSubmissionError(
        lang === "hi"
          ? "केवल PDF, JPG या PNG दस्तावेज़ स्वीकार किए जाते हैं।"
          : "Only PDF, JPG or PNG documents are accepted.",
      );
      return;
    }
    if (file && file.size > 10 * 1024 * 1024) {
      setSubmissionError(
        lang === "hi"
          ? "फाइल का आकार 10 MB से कम होना चाहिए।"
          : "Each document must be smaller than 10 MB.",
      );
      return;
    }
    updateField(field, file);
    setSubmissionError("");
  };

  const handleEligibilityCheck = async () => {
    const income = Number(formData.income);
    const percentage = Number(formData.cgpa);
    const localIssues = [];
    if (!formData.income || (incomeLimit !== null && income > incomeLimit)) localIssues.push(incomeLimitLabel);
    if (!formData.cgpa || percentage < 75 || percentage > 100) localIssues.push(t.criteriaMarks);
    if (localIssues.length > 0) {
      setEligibilityResult(localIssues.join(" "));
      return;
    }

    setEligibilityLoading(true);
    setEligibilityResult("");
    try {
      const response = await checkEligibility({
        ...formData,
        category: "ST",
        income: Number(formData.income),
        annualIncome: Number(formData.income),
        cgpa: percentage,
        percentage,
      });
      const result = response?.data?.eligibility || response?.eligibility || response?.data || response;
      setEligibilityResult(
        result?.message ||
          response?.message ||
          (result?.eligible === true
            ? lang === "hi"
              ? "प्रारंभिक पात्रता जांच सफल रही। अंतिम निर्णय अधिकारी करेंगे।"
              : "Preliminary eligibility check passed. An officer makes the final decision."
            : result?.eligible === false
              ? lang === "hi"
                ? "प्रारंभिक पात्रता जांच के अनुसार आप पात्रता मानदंड पूरा नहीं करते।"
                : "The preliminary check indicates that the eligibility criteria are not met."
              : null) ||
          (lang === "hi"
            ? "प्रारंभिक जांच पूरी हुई। आधिकारिक दिशानिर्देशों से पात्रता की पुष्टि करें।"
            : "Preliminary check complete. Confirm eligibility against the official scheme guidelines."),
      );
    } catch (error) {
      setEligibilityResult(
        error?.message ||
          (lang === "hi"
            ? "पात्रता जांच सेवा अभी उपलब्ध नहीं है। आधिकारिक दिशानिर्देश देखें।"
            : "The eligibility service is unavailable. Please check the official guidelines."),
      );
    } finally {
      setEligibilityLoading(false);
    }
  };

  const getFileName = (file) => {
    if (!file) {
      return t.chooseFile;
    }

    return file.name;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (step < 4) {
      setStep((currentStep) => currentStep + 1);
      setSubmissionError("");
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    if (!localStorage.getItem("vidyarthToken")) {
      setSubmissionError(
        lang === "hi"
          ? "आवेदन जमा करने से पहले कृपया लॉगिन करें।"
          : "Please sign in before submitting your application.",
      );
      return;
    }

    const annualIncome = Number(formData.income);
    if (!formData.income || (incomeLimit !== null && annualIncome > incomeLimit)) {
      setSubmissionError(incomeLimitLabel);
      setStep(3);
      return;
    }

    const percentage = Number(formData.cgpa);
    if (!formData.cgpa || percentage < 75 || percentage > 100) {
      setSubmissionError(t.criteriaMarks);
      setStep(2);
      return;
    }

    if (!existingApplicationId && !formData.casteCertificate) {
      setSubmissionError(t.criteriaCertificate);
      setStep(4);
      return;
    }

    if (existingApplicationId && !formData.aadhaar && !formData.casteCertificate && !formData.marksheet) {
      setSubmissionError(
        lang === "hi"
          ? "कम से कम एक संशोधित दस्तावेज़ चुनें।"
          : "Select at least one updated document to resubmit.",
      );
      return;
    }

    setSubmitting(true);
    setSubmissionError("");
    let applicationId = existingApplicationId;

    try {
      const {
        aadhaar,
        casteCertificate,
        marksheet,
        ...applicationPayload
      } = formData;
      if (!applicationId) {
        const result = await createApplication({
          ...applicationPayload,
          category: "ST",
          income: Number(applicationPayload.income),
          cgpa: Number(applicationPayload.cgpa),
        });
        const application =
          result?.data?.application ||
          result?.application ||
          result?.data ||
          result;
        applicationId =
          application?._id ||
          application?.id ||
          application?.applicationId ||
          application?.application_id;
      }

      if (!applicationId) {
        throw new Error(
          lang === "hi"
            ? "आवेदन ID प्राप्त नहीं हुई। कृपया सहायता से संपर्क करें।"
            : "The application was created without an ID. Please contact support.",
        );
      }
      setExistingApplicationId(String(applicationId));

      const documents = new FormData();
      if (aadhaar) documents.append("aadhaar", aadhaar);
      if (casteCertificate) {
        documents.append("casteCertificate", casteCertificate);
      }
      if (marksheet) documents.append("marksheet", marksheet);

      await uploadDocuments(applicationId, documents);

      localStorage.setItem("applicationSubmitted", "true");
      localStorage.setItem("applicationId", String(applicationId));
      localStorage.setItem("selectedScheme", formData.scheme);
      localStorage.setItem("appliedOn", new Date().toLocaleDateString());

      alert(`${t.success}\n\n${t.applicationId} ${applicationId}`);
    } catch (error) {
      if (applicationId) setExistingApplicationId(String(applicationId));
      setSubmissionError(
        error?.message ||
          (lang === "hi"
            ? "आवेदन जमा नहीं हो सका। कृपया पुनः प्रयास करें।"
            : "The application could not be submitted. Please try again."),
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="apply-page">

      {/* TOP GOVERNMENT BAR */}
      <div className="apply-topbar">
        <div className="apply-container apply-topbar-inner">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="apply-language">
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
      <header className="apply-header">
        <div className="apply-container apply-header-inner">

          <Link to="/" className="apply-brand">

            <div className="apply-logo">
              V
            </div>

            <div>
              <div className="apply-brand-name">
                VIDYARTH
              </div>

              <div className="apply-brand-subtitle">
                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}
              </div>
            </div>

          </Link>

          <Link
            to="/dashboard"
            className="apply-dashboard-link"
          >
            {t.dashboard}
          </Link>

        </div>
      </header>

      {/* MAIN */}
      <main className="apply-main">

        <div className="apply-container">

          {/* BREADCRUMB */}
          <div className="apply-breadcrumb">
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

          {/* PAGE TITLE */}
          <section className="apply-heading">

            <h1>
              {t.title}
            </h1>

            <p>
              {t.subtitle}
            </p>

          </section>

          {/* STEP INDICATOR */}
          <div className="apply-steps">

            <div
              className={`apply-step ${
                step >= 1 ? "active" : ""
              }`}
            >
              <div className="step-number">
                1
              </div>

              <span>
                {t.step1}
              </span>
            </div>

            <div className="step-line"></div>

            <div
              className={`apply-step ${
                step >= 2 ? "active" : ""
              }`}
            >
              <div className="step-number">
                2
              </div>

              <span>
                {t.step2}
              </span>
            </div>

            <div className="step-line"></div>

            <div
              className={`apply-step ${
                step >= 3 ? "active" : ""
              }`}
            >
              <div className="step-number">
                3
              </div>

              <span>
                {t.step3}
              </span>
            </div>

            <div className="step-line"></div>

            <div
              className={`apply-step ${
                step >= 4 ? "active" : ""
              }`}
            >
              <div className="step-number">
                4
              </div>

              <span>
                {t.step4}
              </span>
            </div>

          </div>

          {/* FORM */}
          <form
            className="apply-form-card"
            onSubmit={handleSubmit}
          >

            {/* STEP 1 */}
            {step === 1 && (
              <section>

                <div className="form-section-heading">
                  <h2>
                    {t.personalTitle}
                  </h2>

                  <p>
                    {lang === "hi"
                      ? "अपनी व्यक्तिगत जानकारी दर्ज करें।"
                      : "Enter your personal information."}
                  </p>
                </div>

                <div className="form-grid">

                  <div className="form-group">
                    <label>
                      {t.name}
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) =>
                        updateField(
                          "name",
                          e.target.value
                        )
                      }
                      placeholder={t.namePlaceholder}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      {t.dob}
                      <span>*</span>
                    </label>

                    <input
                      type="date"
                      value={formData.dob}
                      onChange={(e) =>
                        updateField(
                          "dob",
                          e.target.value
                        )
                      }
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      {t.gender}
                      <span>*</span>
                    </label>

                    <select
                      value={formData.gender}
                      onChange={(e) =>
                        updateField(
                          "gender",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="">
                        {t.selectGender}
                      </option>

                      <option value="Male">
                        {t.male}
                      </option>

                      <option value="Female">
                        {t.female}
                      </option>

                      <option value="Other">
                        {t.other}
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      {t.mobile}
                      <span>*</span>
                    </label>

                    <input
                      type="tel"
                      value={formData.mobile}
                      onChange={(e) =>
                        updateField(
                          "mobile",
                          e.target.value
                        )
                      }
                      placeholder="Enter mobile number"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      {t.email}
                      <span>*</span>
                    </label>

                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) =>
                        updateField(
                          "email",
                          e.target.value
                        )
                      }
                      placeholder={t.emailPlaceholder}
                      required
                    />
                  </div>

                  <div className="form-group form-group-full">
                    <label>
                      {t.address}
                      <span>*</span>
                    </label>

                    <textarea
                      value={formData.address}
                      onChange={(e) =>
                        updateField(
                          "address",
                          e.target.value
                        )
                      }
                      placeholder={t.addressPlaceholder}
                      rows="4"
                      required
                    ></textarea>
                  </div>

                </div>

              </section>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <section>

                <div className="form-section-heading">
                  <h2>
                    {t.academicTitle}
                  </h2>

                  <p>
                    {lang === "hi"
                      ? "अपनी शैक्षणिक जानकारी दर्ज करें।"
                      : "Enter your academic information."}
                  </p>
                </div>

                <div className="form-grid">

                  <div className="form-group form-group-full">
                    <label>
                      {t.college}
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={formData.college}
                      onChange={(e) =>
                        updateField(
                          "college",
                          e.target.value
                        )
                      }
                      placeholder={t.collegePlaceholder}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      {t.course}
                      <span>*</span>
                    </label>

                    <input
                      type="text"
                      value={formData.course}
                      onChange={(e) =>
                        updateField(
                          "course",
                          e.target.value
                        )
                      }
                      placeholder={t.coursePlaceholder}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      {t.year}
                      <span>*</span>
                    </label>

                    <select
                      value={formData.year}
                      onChange={(e) =>
                        updateField(
                          "year",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="">
                        {t.selectYear}
                      </option>

                      <option value="1">
                        {t.first}
                      </option>

                      <option value="2">
                        {t.second}
                      </option>

                      <option value="3">
                        {t.third}
                      </option>

                      <option value="4">
                        {t.fourth}
                      </option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>
                      {t.cgpa}
                      <span>*</span>
                    </label>

                    <input
                      type="number"
                      value={formData.cgpa}
                      onChange={(e) =>
                        updateField(
                          "cgpa",
                          e.target.value
                        )
                      }
                      placeholder={t.cgpaPlaceholder}
                      min="75"
                      max="100"
                      step="0.01"
                      required
                    />
                  </div>

                </div>

              </section>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <section>

                <div className="form-section-heading">
                  <h2>
                    {t.schemeTitle}
                  </h2>

                  <p>
                    {lang === "hi"
                      ? "अपनी पात्रता के अनुसार छात्रवृत्ति योजना चुनें।"
                      : "Select the scholarship scheme applicable to you."}
                  </p>
                </div>

                <div className="form-grid">

                  <div className="form-group form-group-full">
                    <label>
                      {t.scheme}
                      <span>*</span>
                    </label>

                    <select
                      value={formData.scheme}
                      onChange={(e) =>
                        updateField(
                          "scheme",
                          e.target.value
                        )
                      }
                      required
                    >
                      <option value="">
                        {t.selectScheme}
                      </option>

                      <option value="Post Matric Scholarship">
                        {t.postMatric}
                      </option>

                      <option value="Pre Matric Scholarship">
                        {t.preMatric}
                      </option>

                      <option value="Top Class Education Scholarship">
                        {t.topClass}
                      </option>

                      <option value="National Fellowship Scheme">
                        {t.fellowship}
                      </option>

                      <option value="National Overseas Scholarship">
                        {t.overseas}
                      </option>
                    </select>
                  </div>

                  <div className="form-group form-group-full">
                    <label>
                      {incomeFieldLabel}
                      <span>*</span>
                    </label>

                    <input
                      type="number"
                      value={formData.income}
                      onChange={(e) =>
                        updateField(
                          "income",
                          e.target.value
                        )
                      }
                      placeholder={t.incomePlaceholder}
                      min="0"
                      max={incomeLimit ?? undefined}
                      required
                    />
                  </div>

                  <div className="apply-criteria-panel form-group-full">
                    <strong>{t.criteriaTitle}</strong>
                    <ul>
                      <li>{incomeLimitLabel}</li>
                      <li>{t.criteriaMarks}</li>
                      <li>{t.criteriaCertificate}</li>
                    </ul>
                    <p>{t.criteriaOfficial}</p>
                  </div>

                  <div className="form-group form-group-full apply-eligibility-check">
                    <button
                      type="button"
                      className="apply-secondary-btn"
                      onClick={handleEligibilityCheck}
                      disabled={eligibilityLoading || !formData.scheme || !formData.income || !formData.cgpa}
                    >
                      {eligibilityLoading ? t.checkingEligibility : t.checkEligibility}
                    </button>
                    <p>{t.eligibilityDisclaimer}</p>
                    {eligibilityResult && <div role="status">{eligibilityResult}</div>}
                  </div>

                </div>

              </section>
            )}

            {/* STEP 4 */}
            {step === 4 && (
              <section>

                <div className="form-section-heading">
                  <h2>
                    {t.documentTitle}
                  </h2>

                  <p>
                    {lang === "hi"
                      ? "आवश्यक दस्तावेज़ अपलोड करें।"
                      : "Upload the required documents."}
                  </p>
                </div>

                <div className="document-list">

                  {/* AADHAAR */}
                  <div className="document-item">

                    <div className="document-info">

                      <div className="document-icon">
                        📄
                      </div>

                      <div>
                        <h3>
                          {t.aadhaar}
                        </h3>

                        <p>
                          {lang === "hi"
                            ? "आधार कार्ड की स्पष्ट प्रति अपलोड करें।"
                            : "Upload a clear copy of your Aadhaar card."}
                        </p>
                      </div>

                    </div>

                    <label className="file-upload">

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFile(
                            "aadhaar",
                            e.target.files[0]
                          )
                        }
                        required={!existingApplicationId}
                      />

                      <span>
                        {getFileName(
                          formData.aadhaar
                        )}
                      </span>

                    </label>

                  </div>

                  {/* CASTE CERTIFICATE */}
                  <div className="document-item">

                    <div className="document-info">

                      <div className="document-icon">
                        📄
                      </div>

                      <div>
                        <h3>
                          {t.casteCertificate}
                        </h3>

                        <p>
                          {lang === "hi"
                            ? "जनजाति प्रमाण पत्र की प्रति अपलोड करें।"
                            : "Upload your valid tribe certificate."}
                        </p>
                      </div>

                    </div>

                    <label className="file-upload">

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFile(
                            "casteCertificate",
                            e.target.files[0]
                          )
                        }
                        required={!existingApplicationId}
                      />

                      <span>
                        {getFileName(
                          formData.casteCertificate
                        )}
                      </span>

                    </label>

                  </div>

                  {/* MARKSHEET */}
                  <div className="document-item">

                    <div className="document-info">

                      <div className="document-icon">
                        📄
                      </div>

                      <div>
                        <h3>
                          {t.marksheet}
                        </h3>

                        <p>
                          {lang === "hi"
                            ? "हाल की मार्कशीट की प्रति अपलोड करें।"
                            : "Upload your latest marksheet."}
                        </p>
                      </div>

                    </div>

                    <label className="file-upload">

                      <input
                        type="file"
                        accept=".pdf,.jpg,.jpeg,.png"
                        onChange={(e) =>
                          handleFile(
                            "marksheet",
                            e.target.files[0]
                          )
                        }
                        required={!existingApplicationId}
                      />

                      <span>
                        {getFileName(
                          formData.marksheet
                        )}
                      </span>

                    </label>

                  </div>

                </div>

                {/* REVIEW */}
                <div className="review-box">

                  <div className="review-icon">
                    ✓
                  </div>

                  <div>
                    <strong>
                      {lang === "hi"
                        ? "समीक्षा"
                        : "Review"}
                    </strong>

                    <p>
                      {t.review}
                    </p>
                  </div>

                </div>

              </section>
            )}

            {/* BUTTONS */}
            <div className="apply-form-actions">

              {step > 1 ? (
                <button
                  type="button"
                  className="apply-secondary-btn"
                  onClick={previousStep}
                >
                  ← {t.previous}
                </button>
              ) : (
                <Link
                  to="/dashboard"
                  className="apply-secondary-btn"
                >
                  ← {t.dashboard}
                </Link>
              )}

              {submissionError && (
                <p className="apply-submission-error" role="alert">
                  {submissionError}
                </p>
              )}

              {step < 4 ? (
                <button
                  type="submit"
                  className="apply-primary-btn"
                >
                  {t.save} →
                </button>
              ) : (
                <button
                  type="submit"
                  className="apply-primary-btn"
                  disabled={submitting}
                >
                  {submitting
                    ? lang === "hi"
                      ? "जमा हो रहा है..."
                      : "Submitting..."
                    : `${t.submit} ✓`}
                </button>
              )}

            </div>

          </form>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="apply-footer">

        © 2026 VIDYARTH |{" "}

        {lang === "hi"
          ? "जनजातीय छात्रों के लिए छात्रवृत्ति एवं फेलोशिप पोर्टल"
          : "Scholarship & Fellowship Portal for Tribal Students"}

      </footer>

    </div>
  );
}

export default Apply;
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerStudent } from "./api/api";
import "./Register.css";

function Register() {
  const [lang, setLang] = useState("en");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    // Personal Details
    name: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",

    // Contact Details
    mobile: "",
    email: "",

    // Address
    address: "",
    state: "",
    district: "",
    pincode: "",
    domicileState: "",

    // Category
    category: "ST",
    tribe: "",
    pwd: "",

    // Academic Details
    studentId: "",
    course: "",
    courseLevel: "",
    institution: "",
    university: "",
    currentYear: "",
    academicSession: "",

    // Account
    username: "",
    password: "",
    confirmPassword: "",

    // Declaration
    declaration: false,
  });

  const navigate = useNavigate();

  const text = {
    hi: {
      home: "मुख्य पृष्ठ",
      register: "नया पंजीकरण",
      title: "विद्यार्थी पंजीकरण",
      subtitle:
        "छात्रवृत्ति एवं फेलोशिप सेवाओं का उपयोग करने के लिए अपना खाता बनाएं।",

      personalTitle: "1. व्यक्तिगत विवरण",
      contactTitle: "2. संपर्क विवरण",
      addressTitle: "3. पता एवं निवास विवरण",
      categoryTitle: "4. सामाजिक एवं श्रेणी विवरण",
      academicTitle: "5. शैक्षणिक विवरण",
      accountTitle: "6. लॉगिन विवरण",

      name: "पूरा नाम",
      fatherName: "पिता का नाम",
      motherName: "माता का नाम",
      dob: "जन्म तिथि",
      gender: "लिंग",

      mobile: "मोबाइल नंबर",
      email: "ईमेल पता",

      address: "स्थायी पता",
      state: "राज्य",
      district: "जिला",
      pincode: "पिन कोड",
      domicileState: "मूल निवास राज्य",

      category: "श्रेणी",
      tribe: "जनजाति / समुदाय",
      pwd: "दिव्यांगता की स्थिति",

      studentId: "विद्यार्थी / नामांकन ID",
      course: "पाठ्यक्रम / कार्यक्रम",
      courseLevel: "पाठ्यक्रम स्तर",
      institution: "संस्थान का नाम",
      university: "विश्वविद्यालय / बोर्ड",
      currentYear: "वर्तमान वर्ष / सेमेस्टर",
      academicSession: "शैक्षणिक सत्र",

      username: "यूजरनेम / लॉगिन ID",
      password: "पासवर्ड",
      confirmPassword: "पासवर्ड की पुष्टि करें",

      namePlaceholder: "अपना पूरा नाम दर्ज करें",
      fatherPlaceholder: "पिता का नाम दर्ज करें",
      motherPlaceholder: "माता का नाम दर्ज करें",
      mobilePlaceholder: "10 अंकों का मोबाइल नंबर",
      emailPlaceholder: "ईमेल पता दर्ज करें",
      addressPlaceholder: "अपना स्थायी पता दर्ज करें",
      pincodePlaceholder: "6 अंकों का पिन कोड",
      tribePlaceholder: "जनजाति / समुदाय का नाम",
      studentIdPlaceholder: "विद्यार्थी / नामांकन ID",
      institutionPlaceholder: "संस्थान का नाम",
      universityPlaceholder: "विश्वविद्यालय / बोर्ड का नाम",
      usernamePlaceholder: "लॉगिन के लिए यूजरनेम",

      selectGender: "लिंग चुनें",
      male: "पुरुष",
      female: "महिला",
      otherGender: "अन्य",

      selectState: "राज्य चुनें",
      selectDistrict: "जिला दर्ज करें",

      selectCategory: "श्रेणी चुनें",
      st: "अनुसूचित जनजाति (ST)",
      other: "अन्य",

      selectPwd: "चुनें",
      yes: "हां",
      no: "नहीं",

      selectCourse: "पाठ्यक्रम चुनें",
      btech: "B.Tech",
      mtech: "M.Tech",
      ba: "B.A.",
      bsc: "B.Sc.",
      ma: "M.A.",
      msc: "M.Sc.",
      phd: "Ph.D.",
      otherCourse: "अन्य",

      selectLevel: "स्तर चुनें",
      ug: "स्नातक (UG)",
      pg: "स्नातकोत्तर (PG)",
      research: "शोध / Ph.D.",

      selectYear: "वर्ष / सेमेस्टर चुनें",
      firstYear: "प्रथम वर्ष / सेमेस्टर",
      secondYear: "द्वितीय वर्ष / सेमेस्टर",
      thirdYear: "तृतीय वर्ष / सेमेस्टर",
      fourthYear: "चतुर्थ वर्ष / सेमेस्टर",

      selectSession: "शैक्षणिक सत्र चुनें",
      session2025: "2025-26",
      session2026: "2026-27",
      session2027: "2027-28",

      declaration:
        "मैं घोषणा करता/करती हूं कि मेरे द्वारा दी गई सभी जानकारी सही और पूर्ण है।",

      mandatory: "अनिवार्य: पूरा नाम, ईमेल और पासवर्ड। पासवर्ड की पुष्टि जरूरी है; अन्य प्रोफ़ाइल विवरण वैकल्पिक हैं।",

      createAccount: "खाता बनाएं",
      creatingAccount: "खाता बनाया जा रहा है...",

      already: "पहले से खाता है?",
      login: "लॉगिन करें",

      required: "कृपया सभी आवश्यक जानकारी भरें।",

      mobileError: "कृपया सही 10 अंकों का मोबाइल नंबर दर्ज करें।",

      emailError: "कृपया सही ईमेल पता दर्ज करें।",

      pincodeError: "कृपया सही 6 अंकों का पिन कोड दर्ज करें।",

      passwordError:
        "पासवर्ड कम से कम 6 अक्षरों का होना चाहिए।",

      passwordMatch: "पासवर्ड मेल नहीं खाते।",

      declarationError: "कृपया घोषणा को स्वीकार करें।",

      categoryError:
        "यह पोर्टल Scheduled Tribe (ST) विद्यार्थियों के लिए है।",

      success:
        "पंजीकरण सफल रहा। अब आप अपने खाते में लॉगिन कर सकते हैं।",

      registrationError:
        "पंजीकरण असफल रहा। कृपया पुनः प्रयास करें।",

      show: "दिखाएं",
      hide: "छिपाएं",
    },

    en: {
      home: "Home",
      register: "New Registration",
      title: "Student Registration",
      subtitle:
        "Create your account to access scholarship and fellowship services.",

      personalTitle: "1. Personal Details",
      contactTitle: "2. Contact Details",
      addressTitle: "3. Address & Domicile Details",
      categoryTitle: "4. Social & Category Details",
      academicTitle: "5. Academic Details",
      accountTitle: "6. Login Details",

      name: "Full Name",
      fatherName: "Father's Name",
      motherName: "Mother's Name",
      dob: "Date of Birth",
      gender: "Gender",

      mobile: "Mobile Number",
      email: "Email Address",

      address: "Permanent Address",
      state: "State",
      district: "District",
      pincode: "PIN Code",
      domicileState: "Domicile State",

      category: "Category",
      tribe: "Tribe / Community",
      pwd: "Person with Disability",

      studentId: "Student / Enrollment ID",
      course: "Course / Programme",
      courseLevel: "Course Level",
      institution: "Institution Name",
      university: "University / Board",
      currentYear: "Current Year / Semester",
      academicSession: "Academic Session",

      username: "Username / Login ID",
      password: "Password",
      confirmPassword: "Confirm Password",

      namePlaceholder: "Enter your full name",
      fatherPlaceholder: "Enter father's name",
      motherPlaceholder: "Enter mother's name",
      mobilePlaceholder: "Enter 10-digit mobile number",
      emailPlaceholder: "Enter your email address",
      addressPlaceholder: "Enter your permanent address",
      pincodePlaceholder: "Enter 6-digit PIN code",
      tribePlaceholder: "Enter tribe / community name",
      studentIdPlaceholder: "Enter student / enrollment ID",
      institutionPlaceholder: "Enter institution name",
      universityPlaceholder: "Enter university / board name",
      usernamePlaceholder: "Enter username for login",

      selectGender: "Select Gender",
      male: "Male",
      female: "Female",
      otherGender: "Other",

      selectState: "Select State",
      selectDistrict: "Enter District",

      selectCategory: "Select Category",
      st: "Scheduled Tribe (ST)",
      other: "Other",

      selectPwd: "Select",
      yes: "Yes",
      no: "No",

      selectCourse: "Select Course",
      btech: "B.Tech",
      mtech: "M.Tech",
      ba: "B.A.",
      bsc: "B.Sc.",
      ma: "M.A.",
      msc: "M.Sc.",
      phd: "Ph.D.",
      otherCourse: "Other",

      selectLevel: "Select Level",
      ug: "Undergraduate (UG)",
      pg: "Postgraduate (PG)",
      research: "Research / Ph.D.",

      selectYear: "Select Year / Semester",
      firstYear: "First Year / Semester",
      secondYear: "Second Year / Semester",
      thirdYear: "Third Year / Semester",
      fourthYear: "Fourth Year / Semester",

      selectSession: "Select Academic Session",
      session2025: "2025-26",
      session2026: "2026-27",
      session2027: "2027-28",

      declaration:
        "I declare that all the information provided by me is true and complete.",

      mandatory: "Required: full name, email and password. Confirm the password; other profile details are optional.",

      createAccount: "Create Account",
      creatingAccount: "Creating Account...",

      already: "Already have an account?",
      login: "Login",

      required: "Please fill all required information.",

      mobileError:
        "Please enter a valid 10-digit mobile number.",

      emailError:
        "Please enter a valid email address.",

      pincodeError:
        "Please enter a valid 6-digit PIN code.",

      passwordError:
        "Password must be at least 6 characters long.",

      passwordMatch: "Passwords do not match.",

      declarationError:
        "Please accept the declaration.",

      categoryError:
        "This portal is intended for Scheduled Tribe (ST) students.",

      success:
        "Registration successful. You can now login to your account.",

      registrationError:
        "Registration failed. Please try again.",

      show: "Show",
      hide: "Hide",
    },
  };

  const t = text[lang];

  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu and Kashmir",
    "Ladakh",
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return;

    const {
      name,
      fatherName,
      dob,
      gender,
      mobile,
      email,
      address,
      state,
      district,
      pincode,
      domicileState,
      category,
      tribe,
      pwd,
      studentId,
      course,
      courseLevel,
      institution,
      university,
      currentYear,
      academicSession,
      username,
      password,
      confirmPassword,
    } = formData;

    if (!name.trim() || !email.trim() || !password || !confirmPassword) {
      alert(t.required);
      return;
    }

    // ST-only portal
    if (category !== "ST") {
      alert(t.categoryError);
      return;
    }

    // Mobile validation
    if (mobile && !/^[6-9]\d{9}$/.test(mobile)) {
      alert(t.mobileError);
      return;
    }

    // Email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert(t.emailError);
      return;
    }

    // PIN validation
    if (pincode && !/^\d{6}$/.test(pincode)) {
      alert(t.pincodeError);
      return;
    }

    // Backend minimum password = 6
    if (password.length < 6) {
      alert(t.passwordError);
      return;
    }

    // Confirm password
    if (password !== confirmPassword) {
      alert(t.passwordMatch);
      return;
    }

    try {
      setLoading(true);

      /*
       * Backend registration API accepts:
       * name, email, password
       * optional: phone, state, category
       *
       * Other registration fields are kept in the
       * frontend for the student profile/application flow.
       */

      const registrationPayload = {
        name,
        email,
        password,
        category: category || "ST",
      };
      if (mobile) registrationPayload.phone = mobile;
      if (state) registrationPayload.state = state;

      const result = await registerStudent(registrationPayload);

      if (!result?.success || !result?.data?.user) {
        throw new Error(t.registrationError);
      }

      const user = result.data.user;
      const token = result.data.token;

      if (!token) {
        throw new Error(t.registrationError);
      }

      // Save authentication token
      localStorage.setItem("vidyarthToken", token);

      // Save safe student information
      // NEVER save the password.
      localStorage.setItem(
        "vidyarthUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "studentName",
        user.name || name
      );

      localStorage.setItem(
        "studentEmail",
        user.email || email
      );

      localStorage.setItem(
        "studentMobile",
        user.phone || mobile
      );

      localStorage.setItem(
        "studentCategory",
        user.category || category
      );

      /*
       * Additional frontend information.
       *
       * These fields are NOT sent to the registration API
       * because the current backend registration endpoint
       * does not accept them.
       *
       * They can be used later in the application/profile flow.
       */
      localStorage.setItem(
        "vidyarthStudentProfile",
        JSON.stringify({
          name,
          fatherName,
          motherName: formData.motherName,
          dob,
          gender,
          mobile,
          email,
          address,
          state,
          district,
          pincode,
          domicileState,
          category,
          tribe,
          pwd,
          studentId,
          course,
          courseLevel,
          institution,
          university,
          currentYear,
          academicSession,
          username,
        })
      );

      alert(t.success);

      navigate("/dashboard");
    } catch (error) {
      console.error("Registration error:", error);

      alert(
        error?.message || t.registrationError
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-page">

      {/* TOP BAR */}
      <div className="register-topbar">
        <div className="register-container register-topbar-inner">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="register-language">

            <button
              type="button"
              className={lang === "hi" ? "active" : ""}
              onClick={() => setLang("hi")}
            >
              हिन्दी
            </button>

            <span>|</span>

            <button
              type="button"
              className={lang === "en" ? "active" : ""}
              onClick={() => setLang("en")}
            >
              English
            </button>

          </div>
        </div>
      </div>

      {/* HEADER */}
      <header className="register-header">

        <div className="register-container register-header-inner">

          <Link to="/" className="register-brand">

            <img className="register-logo" src="/vidyarth-logo.svg" alt="" />

            <div>

              <div className="register-brand-name">
                VIDYARTH
              </div>

              <div className="register-brand-subtitle">
                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}
              </div>

            </div>

          </Link>

          <Link
            to="/"
            className="register-home-link"
          >
            {t.home}
          </Link>

        </div>

      </header>

      {/* MAIN */}
      <main className="register-main">

        <div className="register-container">

          {/* BREADCRUMB */}
          <div className="register-breadcrumb">

            <Link to="/">
              {t.home}
            </Link>

            <span>/</span>

            <span>
              {t.register}
            </span>

          </div>

          {/* REGISTRATION CARD */}
          <section className="register-card">

            <div className="register-heading">

              <h1>
                {t.title}
              </h1>

              <p>
                {t.subtitle}
              </p>

            </div>

            <form onSubmit={handleSubmit}>

              {/* PERSONAL */}
              <div className="form-section">

                <div className="form-section-title">
                  {t.personalTitle}
                </div>

                <div className="register-grid">

                  <div className="register-field">

                    <label>
                      {t.name} <span>*</span>
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder={t.namePlaceholder}
                      autoComplete="name"
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.fatherName}
                    </label>

                    <input
                      type="text"
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      placeholder={t.fatherPlaceholder}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.motherName}
                    </label>

                    <input
                      type="text"
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      placeholder={t.motherPlaceholder}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.dob}
                    </label>

                    <input
                      type="date"
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.gender}
                    </label>

                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
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
                        {t.otherGender}
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* CONTACT */}
              <div className="form-section">

                <div className="form-section-title">
                  {t.contactTitle}
                </div>

                <div className="register-grid">

                  <div className="register-field">

                    <label>
                      {t.mobile}
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder={t.mobilePlaceholder}
                      maxLength="10"
                      inputMode="numeric"
                      autoComplete="tel"
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.email} <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={t.emailPlaceholder}
                      autoComplete="email"
                    />

                  </div>

                </div>

              </div>

              {/* ADDRESS */}
              <div className="form-section">

                <div className="form-section-title">
                  {t.addressTitle}
                </div>

                <div className="register-grid">

                  <div className="register-field full-width">

                    <label>
                      {t.address}
                    </label>

                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      placeholder={t.addressPlaceholder}
                      rows="3"
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.state}
                    </label>

                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectState}
                      </option>

                      {states.map((stateName) => (
                        <option
                          key={stateName}
                          value={stateName}
                        >
                          {stateName}
                        </option>
                      ))}

                    </select>

                  </div>

                  <div className="register-field">

                    <label>
                      {t.district}
                    </label>

                    <input
                      type="text"
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      placeholder={t.selectDistrict}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.pincode}
                    </label>

                    <input
                      type="text"
                      name="pincode"
                      value={formData.pincode}
                      onChange={handleChange}
                      placeholder={t.pincodePlaceholder}
                      maxLength="6"
                      inputMode="numeric"
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.domicileState}
                    </label>

                    <select
                      name="domicileState"
                      value={formData.domicileState}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectState}
                      </option>

                      {states.map((stateName) => (
                        <option
                          key={stateName}
                          value={stateName}
                        >
                          {stateName}
                        </option>
                      ))}

                    </select>

                  </div>

                </div>

              </div>

              {/* CATEGORY */}
              <div className="form-section">

                <div className="form-section-title">
                  {t.categoryTitle}
                </div>

                <div className="register-grid">

                  <div className="register-field">

                    <label>
                      {t.category}
                    </label>

                    <select
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectCategory}
                      </option>

                      <option value="ST">
                        {t.st}
                      </option>

                      <option value="Other">
                        {t.other}
                      </option>

                    </select>

                  </div>

                  <div className="register-field">

                    <label>
                      {t.tribe}
                    </label>

                    <input
                      type="text"
                      name="tribe"
                      value={formData.tribe}
                      onChange={handleChange}
                      placeholder={t.tribePlaceholder}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.pwd}
                    </label>

                    <select
                      name="pwd"
                      value={formData.pwd}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectPwd}
                      </option>

                      <option value="Yes">
                        {t.yes}
                      </option>

                      <option value="No">
                        {t.no}
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* ACADEMIC */}
              <div className="form-section">

                <div className="form-section-title">
                  {t.academicTitle}
                </div>

                <div className="register-grid">

                  <div className="register-field">

                    <label>
                      {t.studentId}
                    </label>

                    <input
                      type="text"
                      name="studentId"
                      value={formData.studentId}
                      onChange={handleChange}
                      placeholder={t.studentIdPlaceholder}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.course}
                    </label>

                    <select
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectCourse}
                      </option>

                      <option value="B.Tech">
                        {t.btech}
                      </option>

                      <option value="M.Tech">
                        {t.mtech}
                      </option>

                      <option value="B.A.">
                        {t.ba}
                      </option>

                      <option value="B.Sc.">
                        {t.bsc}
                      </option>

                      <option value="M.A.">
                        {t.ma}
                      </option>

                      <option value="M.Sc.">
                        {t.msc}
                      </option>

                      <option value="Ph.D.">
                        {t.phd}
                      </option>

                      <option value="Other">
                        {t.otherCourse}
                      </option>

                    </select>

                  </div>

                  <div className="register-field">

                    <label>
                      {t.courseLevel}
                    </label>

                    <select
                      name="courseLevel"
                      value={formData.courseLevel}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectLevel}
                      </option>

                      <option value="UG">
                        {t.ug}
                      </option>

                      <option value="PG">
                        {t.pg}
                      </option>

                      <option value="Research">
                        {t.research}
                      </option>

                    </select>

                  </div>

                  <div className="register-field">

                    <label>
                      {t.institution}
                    </label>

                    <input
                      type="text"
                      name="institution"
                      value={formData.institution}
                      onChange={handleChange}
                      placeholder={t.institutionPlaceholder}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.university}
                    </label>

                    <input
                      type="text"
                      name="university"
                      value={formData.university}
                      onChange={handleChange}
                      placeholder={t.universityPlaceholder}
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.currentYear}
                    </label>

                    <select
                      name="currentYear"
                      value={formData.currentYear}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectYear}
                      </option>

                      <option value="First">
                        {t.firstYear}
                      </option>

                      <option value="Second">
                        {t.secondYear}
                      </option>

                      <option value="Third">
                        {t.thirdYear}
                      </option>

                      <option value="Fourth">
                        {t.fourthYear}
                      </option>

                    </select>

                  </div>

                  <div className="register-field">

                    <label>
                      {t.academicSession}
                    </label>

                    <select
                      name="academicSession"
                      value={formData.academicSession}
                      onChange={handleChange}
                    >

                      <option value="">
                        {t.selectSession}
                      </option>

                      <option value="2025-26">
                        {t.session2025}
                      </option>

                      <option value="2026-27">
                        {t.session2026}
                      </option>

                      <option value="2027-28">
                        {t.session2027}
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* ACCOUNT */}
              <div className="form-section">

                <div className="form-section-title">
                  {t.accountTitle}
                </div>

                <div className="register-grid">

                  <div className="register-field">

                    <label>
                      {t.username}
                    </label>

                    <input
                      type="text"
                      name="username"
                      value={formData.username}
                      onChange={handleChange}
                      placeholder={t.usernamePlaceholder}
                      autoComplete="username"
                    />

                  </div>

                  <div className="register-field">

                    <label>
                      {t.password} <span>*</span>
                    </label>

                    <div className="register-password">

                      <input
                        type={
                          showPassword
                            ? "text"
                            : "password"
                        }
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowPassword(!showPassword)
                        }
                      >
                        {showPassword
                          ? t.hide
                          : t.show}
                      </button>

                    </div>

                  </div>

                  <div className="register-field">

                    <label>
                      {t.confirmPassword} <span>*</span>
                    </label>

                    <div className="register-password">

                      <input
                        type={
                          showConfirmPassword
                            ? "text"
                            : "password"
                        }
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        placeholder="••••••••"
                        autoComplete="new-password"
                      />

                      <button
                        type="button"
                        onClick={() =>
                          setShowConfirmPassword(
                            !showConfirmPassword
                          )
                        }
                      >
                        {showConfirmPassword
                          ? t.hide
                          : t.show}
                      </button>

                    </div>

                  </div>

                </div>

              </div>

              {/* DECLARATION */}
              <div className="register-declaration">

                <label className="declaration-label">

                  <input
                    type="checkbox"
                    name="declaration"
                    checked={formData.declaration}
                    onChange={handleChange}
                  />

                  <span>
                    {t.declaration}{" "}
                  </span>

                </label>

              </div>

              {/* NOTE */}
              <div className="register-note">

                <strong>*</strong>{" "}
                {t.mandatory}

              </div>

              {/* SUBMIT */}
              <div className="register-submit-area">

                <button
                  type="submit"
                  className="register-submit-btn"
                  disabled={loading}
                >
                  {loading
                    ? t.creatingAccount
                    : t.createAccount}
                </button>

              </div>

            </form>

            {/* LOGIN */}
            <div className="register-login">

              <span>
                {t.already}
              </span>

              <Link to="/login">
                {t.login}
              </Link>

            </div>

          </section>

        </div>

      </main>

      {/* FOOTER */}
      <footer className="register-footer">

        © 2026 VIDYARTH |{" "}

        {lang === "hi"
          ? "जनजातीय छात्रों के लिए छात्रवृत्ति एवं फेलोशिप पोर्टल"
          : "Scholarship & Fellowship Portal for Tribal Students"}

      </footer>

    </div>
  );
}

export default Register;
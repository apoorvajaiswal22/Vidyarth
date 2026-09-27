import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginStudent } from "./api/api";
import "./Login.css";

function Login() {
  const [lang, setLang] = useState("en");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const text = {
    hi: {
      back: "← मुखपृष्ठ पर वापस जाएं",
      title: "विद्यार्थी लॉगिन",
      subtitle: "अपने VIDYARTH खाते में लॉगिन करें",
      email: "ईमेल / विद्यार्थी ID",
      emailPlaceholder: "अपना ईमेल या विद्यार्थी ID दर्ज करें",
      password: "पासवर्ड",
      passwordPlaceholder: "अपना पासवर्ड दर्ज करें",
      forgot: "पासवर्ड भूल गए?",
      login: "लॉगिन करें",
      loggingIn: "लॉगिन हो रहा है...",
      newStudent: "नए विद्यार्थी हैं?",
      register: "नया पंजीकरण करें",
      error: "कृपया ईमेल और पासवर्ड दर्ज करें।",
      success: "लॉगिन सफल रहा।",
      loginError: "लॉगिन असफल रहा। कृपया अपनी जानकारी जांचें।",
    },

    en: {
      back: "← Back to Home",
      title: "Student Login",
      subtitle: "Login to your VIDYARTH account",
      email: "Email / Student ID",
      emailPlaceholder: "Enter your email or student ID",
      password: "Password",
      passwordPlaceholder: "Enter your password",
      forgot: "Forgot Password?",
      login: "Login",
      loggingIn: "Logging in...",
      newStudent: "New student?",
      register: "Create New Account",
      error: "Please enter email and password.",
      success: "Login successful.",
      loginError: "Login failed. Please check your credentials.",
    },
  };

  const t = text[lang];

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    if (!email || !password) {
      alert(t.error);
      return;
    }

    try {
      setLoading(true);

      const result = await loginStudent({
        email,
        password,
      });

      if (!result?.success || !result?.data?.user) {
        throw new Error(t.loginError);
      }

      const user = result.data.user;
      const token = result.data.token;

      localStorage.setItem("vidyarthToken", token);

      localStorage.setItem(
        "vidyarthUser",
        JSON.stringify(user)
      );

      localStorage.setItem(
        "studentName",
        user.name || ""
      );

      localStorage.setItem(
        "studentEmail",
        user.email || email
      );

      localStorage.setItem(
        "studentMobile",
        user.phone || ""
      );

      localStorage.setItem(
        "studentCategory",
        user.category || "ST"
      );

      alert(t.success);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login error:", error);

      alert(
        error?.message || t.loginError
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      <div className="login-topbar">
        <div className="login-container">

          <span>
            {lang === "hi"
              ? "भारत सरकार | जनजातीय कार्य मंत्रालय"
              : "Government of India | Ministry of Tribal Affairs"}
          </span>

          <div className="login-language">

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

      <div className="login-header">

        <div className="login-container login-header-inner">

          <Link
            to="/"
            className="login-brand"
          >

            <img className="login-logo" src="/vidyarth-logo.svg" alt="" />

            <div>

              <div className="login-brand-name">
                VIDYARTH
              </div>

              <div className="login-brand-subtitle">

                {lang === "hi"
                  ? "छात्रवृत्ति एवं फेलोशिप प्रबंधन प्रणाली"
                  : "Scholarship & Fellowship Management System"}

              </div>

            </div>

          </Link>

          <Link
            to="/"
            className="back-home"
          >
            {t.back}
          </Link>

        </div>

      </div>

      <main className="login-main">

        <div className="login-card">

          <div className="login-card-heading">

            <span>
              VIDYARTH
            </span>

            <h1>
              {t.title}
            </h1>

            <p>
              {t.subtitle}
            </p>

          </div>

          <form onSubmit={handleLogin}>

            <div className="form-group">

              <label>
                {t.email}
              </label>

              <input
                type="text"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder={t.emailPlaceholder}
                autoComplete="email"
              />

            </div>

            <div className="form-group">

              <div className="password-label">

                <label>
                  {t.password}
                </label>

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >
                  {showPassword
                    ? lang === "hi"
                      ? "छुपाएं"
                      : "Hide"
                    : lang === "hi"
                    ? "दिखाएं"
                    : "Show"}
                </button>

              </div>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder={t.passwordPlaceholder}
                autoComplete="current-password"
              />

            </div>

            <div className="forgot-row">

              <Link to="/help">
                {t.forgot}
              </Link>

            </div>

            <button
              type="submit"
              className="login-button"
              disabled={loading}
            >
              {loading
                ? t.loggingIn
                : t.login}
            </button>

          </form>

          <div className="register-line">

            <span>
              {t.newStudent}
            </span>

            <Link to="/register">
              {t.register}
            </Link>

          </div>

        </div>

      </main>

      <footer className="login-footer">
        © 2026 VIDYARTH
      </footer>

    </div>
  );
}

export default Login;
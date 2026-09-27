import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginAdmin } from "./api/api";
import "./AdminLogin.css";

function AdminLogin() {
  const [notice, setNotice] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;

    const formData = new FormData(event.currentTarget);
    setLoading(true);
    setNotice("");

    try {
      const result = await loginAdmin({
        email: formData.get("email"),
        password: formData.get("password"),
      });
      const token = result?.data?.token || result?.token;
      const user = result?.data?.user || result?.user;
      const role = String(user?.role || "").toLowerCase();

      if (!token) {
        throw new Error("The login service did not return an access token.");
      }

      if (!["admin", "administrator", "officer", "ministry_officer"].includes(role)) {
        throw new Error("This account is not authorised for the administrator portal.");
      }

      localStorage.setItem("vidyarthAdminToken", token);
      localStorage.setItem("vidyarthAdminUser", JSON.stringify(user));
      navigate("/admin");
    } catch (error) {
      setNotice(
        error?.message ||
          "Administrator sign-in failed. Check your credentials and try again.",
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="admin-login-page">
      <div className="admin-login-topbar">
        <div className="admin-login-container">
          <span>Government of India | Ministry of Tribal Affairs</span>
          <Link to="/">Back to Home</Link>
        </div>
      </div>

      <header className="admin-login-header">
        <div className="admin-login-container admin-login-brand-row">
          <Link to="/" className="admin-login-brand">
            <img src="/vidyarth-logo.svg" alt="" />
            <span>
              <strong>VIDYARTH</strong>
              <small>Scholarship &amp; Fellowship Management System</small>
            </span>
          </Link>
          <span className="admin-login-department">ADMINISTRATOR ACCESS</span>
        </div>
      </header>

      <main className="admin-login-main">
        <section className="admin-login-card" aria-labelledby="admin-login-title">
          <div className="admin-login-card-label">SECURE PORTAL</div>
          <h1 id="admin-login-title">Admin Login</h1>
          <p>Sign in with your authorised administrator account.</p>

          <form onSubmit={handleSubmit}>
            <label htmlFor="admin-email">Official email</label>
            <input
              id="admin-email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="Enter your official email"
              required
            />

            <label htmlFor="admin-password">Password</label>
            <input
              id="admin-password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="Enter your password"
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? "Signing in..." : "Sign in to Admin Portal"}
            </button>
          </form>

          {notice && <p className="admin-login-notice" role="status">{notice}</p>}

          <div className="admin-login-security">
            <strong>Authorised users only</strong>
            <span>Access to applicant records is monitored and restricted.</span>
          </div>
        </section>
      </main>

      <footer className="admin-login-footer">
        © 2026 VIDYARTH | Scholarship &amp; Fellowship Management System
      </footer>
    </div>
  );
}

export default AdminLogin;
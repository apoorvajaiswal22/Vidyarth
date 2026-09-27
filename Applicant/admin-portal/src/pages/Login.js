import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (loading) return;
    setLoading(true);
    try {
      await signIn({ email, password });
      toast.success("Signed in to the officer portal.");
      navigate(location.state?.from || "/queue", { replace: true });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message || "Sign-in failed.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="login-page">
      <div className="login-gov-strip">
        Government of India <span>|</span> Ministry of Tribal Affairs
      </div>
      <header className="login-brand-row">
        <Link to="/" className="portal-brand">
          <span className="portal-brand-mark" aria-hidden="true">V</span>
          <span><strong>VIDYARTH</strong><small>Scholarship &amp; Fellowship Management System</small></span>
        </Link>
        <span className="login-audience">OFFICER WORKSPACE</span>
      </header>
      <section className="login-content">
        <div className="login-intro">
          <span className="eyebrow">SECURE ADMINISTRATION</span>
          <h1>Review applications with clarity.</h1>
          <p>Authorised scrutiny officers, selection committee members and administrators can access submitted applications and their review history.</p>
          <div className="login-process-note">
            <strong>Human-led decisions</strong>
            <span>Verification tools support officers. Selection and rejection remain authorised human decisions.</span>
          </div>
        </div>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-heading">
            <span className="eyebrow">ADMIN / OFFICER</span>
            <h2>Sign in</h2>
            <p>Use your authorised Ministry account.</p>
          </div>
          <label htmlFor="officer-email">Official email</label>
          <input id="officer-email" type="email" autoComplete="username" value={email} onChange={(event) => setEmail(event.target.value)} required />
          <label htmlFor="officer-password">Password</label>
          <input id="officer-password" type="password" autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          <button className="button button-primary login-submit" type="submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign in to the portal"}
          </button>
          <p className="login-security-note">Access is restricted by the role returned from the shared backend.</p>
        </form>
      </section>
      <footer className="login-footer">VIDYARTH · Ministry of Tribal Affairs · Government of India</footer>
    </main>
  );
}

export default Login;
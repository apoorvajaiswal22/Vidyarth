import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function formatRole(role) {
  return String(role || "officer").replaceAll("_", " ");
}

function PortalLayout() {
  const { user, role, signOut } = useAuth();
  const navigate = useNavigate();

  function handleSignOut() {
    signOut();
    navigate("/login", { replace: true });
  }

  return (
    <div className="portal-shell">
      <header className="portal-header">
        <Link to="/queue" className="portal-brand">
          <span className="portal-brand-mark" aria-hidden="true">V</span>
          <span><strong>VIDYARTH</strong><small>Scholarship &amp; Fellowship Management System</small></span>
        </Link>
        <div className="portal-header-meta">
          <span className="role-chip">{formatRole(role)}</span>
          <span className="officer-name">{user?.name || user?.email || "Officer"}</span>
          <button className="button button-outline" type="button" onClick={handleSignOut}>Sign out</button>
        </div>
      </header>
      <div className="portal-gov-strip">Government of India <span>|</span> Ministry of Tribal Affairs <span className="strip-separator">·</span> Officer Workspace</div>
      <nav className="portal-nav" aria-label="Officer navigation">
        <NavLink to="/queue">Application queue</NavLink>
      </nav>
      <main className="portal-main"><Outlet /></main>
      <footer className="portal-footer">VIDYARTH · Ministry of Tribal Affairs · Government of India</footer>
    </div>
  );
}

export default PortalLayout;
import { createContext, useContext, useMemo, useState } from "react";
import { loginAdmin } from "../api/client";

const AuthContext = createContext(null);
const allowedRoles = new Set(["scrutiny_officer", "selection_committee", "super_admin", "admin", "officer"]);

export function normalizeRole(role) {
  return String(role || "").trim().toLowerCase().replace(/[\s-]+/g, "_");
}

function readStoredSession() {
  try {
    return {
      token: localStorage.getItem("vidyarthAdminToken") || "",
      user: JSON.parse(localStorage.getItem("vidyarthAdminUser") || "null"),
    };
  } catch {
    return { token: "", user: null };
  }
}

export function AuthProvider({ children }) {
  const [session, setSession] = useState(readStoredSession);

  async function signIn(credentials) {
    const response = await loginAdmin(credentials);
    const payload = response?.data || response;
    const user = payload?.user || response?.user;
    const token = payload?.token || response?.token;
    const role = normalizeRole(user?.role || payload?.role || response?.role);

    if (!token) throw new Error("The sign-in service did not return a token.");
    if (!allowedRoles.has(role)) throw new Error("This account is not authorised for the officer portal.");

    const authenticatedUser = { ...user, role };
    localStorage.setItem("vidyarthAdminToken", token);
    localStorage.setItem("vidyarthAdminUser", JSON.stringify(authenticatedUser));
    setSession({ token, user: authenticatedUser });
    return authenticatedUser;
  }

  function signOut() {
    localStorage.removeItem("vidyarthAdminToken");
    localStorage.removeItem("vidyarthAdminUser");
    setSession({ token: "", user: null });
  }

  const value = useMemo(() => ({
    ...session,
    role: normalizeRole(session.user?.role),
    signIn,
    signOut,
  }), [session]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used inside AuthProvider");
  return context;
}
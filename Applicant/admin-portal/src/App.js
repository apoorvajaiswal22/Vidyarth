import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./components/ProtectedRoute";
import PortalLayout from "./components/PortalLayout";
import { useAuth } from "./context/AuthContext";
import ApplicationDetail from "./pages/ApplicationDetail";
import AuditLog from "./pages/AuditLog";
import Login from "./pages/Login";
import Queue from "./pages/Queue";
import "./App.css";

function App() {
  const { token } = useAuth();

  return (
    <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
      <Routes>
        <Route path="/login" element={token ? <Navigate to="/queue" replace /> : <Login />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<PortalLayout />}>
            <Route index element={<Navigate to="/queue" replace />} />
            <Route path="/queue" element={<Queue />} />
            <Route path="/application/:id" element={<ApplicationDetail />} />
            <Route path="/audit-log/:id" element={<AuditLog />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to={token ? "/queue" : "/login"} replace />} />
      </Routes>
      <ToastContainer position="top-right" autoClose={4000} newestOnTop />
    </BrowserRouter>
  );
}

export default App;

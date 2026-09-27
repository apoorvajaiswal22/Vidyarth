import axios from "axios";

const configuredUrl = process.env.REACT_APP_API_URL || "http://localhost:5000";
const backendRoot = configuredUrl.replace(/\/+$/, "");
const apiRoot = backendRoot.endsWith("/api") ? backendRoot : `${backendRoot}/api`;

export const api = axios.create({
  baseURL: apiRoot,
  timeout: 15000,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("vidyarthAdminToken");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export async function loginAdmin(credentials) {
  try {
    const { data } = await api.post("/admin/login", credentials);
    return data;
  } catch (error) {
    if (![404, 405].includes(error.response?.status)) throw error;
    const { data } = await api.post("/auth/login", credentials);
    return data;
  }
}

export async function getAdminApplications(params = {}) {
  const { data } = await api.get("/admin/applications", { params });
  return data;
}

export async function updateApplicationStatus(id, payload) {
  const { data } = await api.patch(`/admin/applications/${encodeURIComponent(id)}/status`, payload);
  return data;
}

export async function getApplicationAuditLog(id) {
  const { data } = await api.get(`/admin/applications/${encodeURIComponent(id)}/audit-log`);
  return data;
}
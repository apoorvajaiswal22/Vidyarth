const configuredBackendUrl =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";
const normalizedBackendUrl = configuredBackendUrl.replace(/\/+$/, "");
const API_BASE_URL = normalizedBackendUrl.endsWith("/api")
  ? normalizedBackendUrl
  : `${normalizedBackendUrl}/api`;

async function apiRequest(endpoint, options = {}) {
  const tokenKey = endpoint.startsWith("/admin/")
    ? "vidyarthAdminToken"
    : "vidyarthToken";
  const token = localStorage.getItem(tokenKey);

  const headers = {
    ...(options.body instanceof FormData
      ? {}
      : { "Content-Type": "application/json" }),
    ...(options.headers || {}),
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  let response;
  try {
    response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });
  } catch {
    throw new Error(
      `Cannot connect to the VIDYARTH backend at ${API_BASE_URL}. Start the backend or set VITE_API_BASE_URL to its address.`,
    );
  }

  let data;

  try {
    data = await response.json();
  } catch {
    data = {};
  }

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

export async function registerStudent(payload) {
  return apiRequest("/auth/register", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginStudent(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function loginAdmin(payload) {
  return apiRequest("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getSchemes() {
  return apiRequest("/schemes", {
    method: "GET",
  });
}

export async function checkEligibility(payload) {
  return apiRequest(`/schemes/${payload.scheme_id}/check-eligibility`, {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function createApplication(payload) {
  return apiRequest("/applications", {
    method: "POST",
    body: JSON.stringify(payload),
  });
}

export async function getMyApplications() {
  return apiRequest("/applications", {
    method: "GET",
  });
}

export async function getApplicationById(id) {
  return apiRequest(`/applications/${id}`, {
    method: "GET",
  });
}

export async function uploadDocuments(id, formData) {
  return apiRequest(`/applications/${id}/documents`, {
    method: "PUT",
    body: formData,
  });
}

export async function getAdminApplications() {
  return apiRequest("/admin/applications", {
    method: "GET",
  });
}

export async function updateApplicationStatus(id, payload) {
  return apiRequest(`/admin/applications/${id}/status`, {
    method: "PATCH",
    body: JSON.stringify(payload),
  });
}

export async function getApplicationAuditLog(id) {
  return apiRequest(`/admin/applications/${id}/audit-log`, {
    method: "GET",
  });
}

export { API_BASE_URL };
// src/utils/api.js
const BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

export function getToken() {
  return localStorage.getItem("token");
}

export async function apiFetch(path, options = {}) {
  const token = getToken();
  const headers = options.headers || {};
  headers["Content-Type"] = headers["Content-Type"] || "application/json";
  if (token) headers["Authorization"] = `Bearer ${token}`;

  const res = await fetch(`${BASE}${path}`, { ...options, headers });
  const text = await res.text();
  try {
    const data = JSON.parse(text || "{}");
    if (!res.ok) throw { status: res.status, data };
    return data;
  } catch (err) {
    // if JSON parse failed, rethrow
    if (err.data) throw err;
    throw { status: res.status, data: text };
  }
}

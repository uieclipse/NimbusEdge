// src/lib/api.js
const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

async function request(path, { method = "GET", body, token } = {}) {
  const headers = { "Content-Type": "application/json" };
  if (token) headers.Authorization = `Bearer ${token}`;

  const res = await fetch(`${API_BASE}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });

  const data = await res.json().catch(() => ({}));

  if (!res.ok) {
    throw new Error(data.error || "Something went wrong. Please try again.");
  }
  return data;
}

export const api = {
  // auth
  login: (email, password) => request("/auth/login", { method: "POST", body: { email, password } }),
  register: (payload) => request("/auth/register", { method: "POST", body: payload }),
  me: (token) => request("/auth/me", { token }),
  updateMe: (payload, token) => request("/auth/me", { method: "PUT", body: payload, token }),

  // plans
  getPlans: () => request("/plans"),
  createPlan: (payload, token) => request("/plans", { method: "POST", body: payload, token }),
  updatePlan: (id, payload, token) => request(`/plans/${id}`, { method: "PUT", body: payload, token }),
  deletePlan: (id, token) => request(`/plans/${id}`, { method: "DELETE", token }),

  // orders
  getMyOrders: (token) => request("/orders/mine", { token }),
  createOrder: (payload, token) => request("/orders", { method: "POST", body: payload, token }),
  getAllOrders: (token) => request("/orders", { token }),
  updateOrder: (id, payload, token) => request(`/orders/${id}`, { method: "PUT", body: payload, token }),
  deleteOrder: (id, token) => request(`/orders/${id}`, { method: "DELETE", token }),

  // users
  getUsers: (token) => request("/users", { token }),
  setUserRole: (id, role, token) => request(`/users/${id}/role`, { method: "PUT", body: { role }, token }),
  deleteUser: (id, token) => request(`/users/${id}`, { method: "DELETE", token }),
};

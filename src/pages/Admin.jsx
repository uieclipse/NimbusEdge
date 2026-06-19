// src/pages/Admin.jsx
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { formatPrice } from "../components/PlanCard";
import PlanFormModal from "../components/PlanFormModal";
import { StatusBadge } from "./Profile";
import "./Admin.css";

const TABS = [
  { key: "plans", label: "Plans" },
  { key: "orders", label: "Orders" },
  { key: "users", label: "Users" },
];

export default function Admin() {
  const [tab, setTab] = useState("plans");
  const { token, user } = useAuth();

  const [plans, setPlans] = useState([]);
  const [orders, setOrders] = useState([]);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [editingPlan, setEditingPlan] = useState(null);
  const [showPlanModal, setShowPlanModal] = useState(false);

  async function loadAll() {
    setLoading(true);
    setError("");
    try {
      const [p, o, u] = await Promise.all([api.getPlans(), api.getAllOrders(token), api.getUsers(token)]);
      setPlans(p.plans);
      setOrders(o.orders);
      setUsers(u.users);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function handleSavePlan(payload) {
    if (editingPlan) {
      await api.updatePlan(editingPlan.id, payload, token);
    } else {
      await api.createPlan(payload, token);
    }
    setShowPlanModal(false);
    setEditingPlan(null);
    loadAll();
  }

  async function handleDeletePlan(plan) {
    if (!confirm(`Delete the "${plan.name}" plan? This can't be undone.`)) return;
    await api.deletePlan(plan.id, token);
    loadAll();
  }

  async function handleOrderStatus(order, status) {
    await api.updateOrder(order.id, { status }, token);
    loadAll();
  }

  async function handleDeleteOrder(order) {
    if (!confirm(`Remove the order for ${order.domain || "this site"}?`)) return;
    await api.deleteOrder(order.id, token);
    loadAll();
  }

  async function handleRoleChange(targetUser, role) {
    try {
      await api.setUserRole(targetUser.id, role, token);
      loadAll();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleDeleteUser(targetUser) {
    if (!confirm(`Delete ${targetUser.name}'s account? This can't be undone.`)) return;
    try {
      await api.deleteUser(targetUser.id, token);
      loadAll();
    } catch (err) {
      alert(err.message);
    }
  }

  const stats = {
    totalPlans: plans.length,
    activeOrders: orders.filter((o) => o.status === "active").length,
    totalUsers: users.length,
    mrr: orders
      .filter((o) => o.status === "active")
      .reduce((sum, o) => sum + (o.plan_price_cents || 0), 0),
  };

  return (
    <div className="container admin">
      <div className="admin__header">
        <div>
          <h1>Admin panel</h1>
          <p className="card__sub">Manage hosting plans, customer orders, and accounts.</p>
        </div>
      </div>

      <div className="admin__stats">
        <StatCard label="Plans" value={stats.totalPlans} />
        <StatCard label="Active sites" value={stats.activeOrders} />
        <StatCard label="Users" value={stats.totalUsers} />
        <StatCard label="MRR" value={formatPrice(stats.mrr)} accent />
      </div>

      <div className="admin__tabs">
        {TABS.map((t) => (
          <button
            key={t.key}
            className={`admin__tab ${tab === t.key ? "admin__tab--active" : ""}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {error && <p className="profile__msg">{error}</p>}
      {loading ? (
        <p className="card__sub">Loading…</p>
      ) : (
        <>
          {tab === "plans" && (
            <section className="card">
              <div className="admin__section-head">
                <h2 className="card__title">Hosting plans</h2>
                <button
                  className="btn btn--primary"
                  onClick={() => {
                    setEditingPlan(null);
                    setShowPlanModal(true);
                  }}
                >
                  + New plan
                </button>
              </div>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Storage</th>
                    <th>Bandwidth</th>
                    <th>Sites</th>
                    <th>Featured</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {plans.map((p) => (
                    <tr key={p.id}>
                      <td>{p.name}</td>
                      <td>{formatPrice(p.price_cents)}/{p.billing_period}</td>
                      <td>{p.storage_gb} GB</td>
                      <td>{p.bandwidth_tb} TB</td>
                      <td>{p.sites === -1 ? "Unlimited" : p.sites}</td>
                      <td>{p.featured ? <span className="badge badge--cyan">Yes</span> : "—"}</td>
                      <td>
                        <div className="table__actions">
                          <button
                            className="table__icon-btn"
                            title="Edit"
                            onClick={() => {
                              setEditingPlan(p);
                              setShowPlanModal(true);
                            }}
                          >
                            <EditIcon />
                          </button>
                          <button className="table__icon-btn table__icon-btn--danger" title="Delete" onClick={() => handleDeletePlan(p)}>
                            <TrashIcon />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {tab === "orders" && (
            <section className="card">
              <h2 className="card__title">Customer orders</h2>
              <p className="card__sub">Every site provisioned across all customers.</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Customer</th>
                    <th>Domain</th>
                    <th>Plan</th>
                    <th>Status</th>
                    <th>Added</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id}>
                      <td>
                        <div>{o.user_name}</div>
                        <div className="table__dim">{o.user_email}</div>
                      </td>
                      <td>{o.domain || "—"}</td>
                      <td>{o.plan_name}</td>
                      <td>
                        <select
                          value={o.status}
                          onChange={(e) => handleOrderStatus(o, e.target.value)}
                          className="select--inline"
                        >
                          <option value="active">Active</option>
                          <option value="pending">Pending</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </td>
                      <td className="table__dim">{o.created_at}</td>
                      <td>
                        <button className="table__icon-btn table__icon-btn--danger" title="Delete" onClick={() => handleDeleteOrder(o)}>
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {orders.length === 0 && (
                    <tr><td colSpan={6} className="card__sub">No orders yet.</td></tr>
                  )}
                </tbody>
              </table>
            </section>
          )}

          {tab === "users" && (
            <section className="card">
              <h2 className="card__title">Users</h2>
              <p className="card__sub">Promote trusted accounts to admin or remove access.</p>
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Joined</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u.id}>
                      <td>{u.name}{u.id === user.id && <span className="table__dim"> (you)</span>}</td>
                      <td>{u.email}</td>
                      <td>
                        <select
                          value={u.role}
                          onChange={(e) => handleRoleChange(u, e.target.value)}
                          className="select--inline"
                          disabled={u.id === user.id}
                        >
                          <option value="user">User</option>
                          <option value="admin">Admin</option>
                        </select>
                      </td>
                      <td className="table__dim">{u.created_at}</td>
                      <td>
                        <button
                          className="table__icon-btn table__icon-btn--danger"
                          title="Delete"
                          disabled={u.id === user.id}
                          onClick={() => handleDeleteUser(u)}
                        >
                          <TrashIcon />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}
        </>
      )}

      {showPlanModal && (
        <PlanFormModal
          initial={editingPlan}
          onSave={handleSavePlan}
          onClose={() => {
            setShowPlanModal(false);
            setEditingPlan(null);
          }}
        />
      )}
    </div>
  );
}

function StatCard({ label, value, accent }) {
  return (
    <div className={`stat-card ${accent ? "stat-card--accent" : ""}`}>
      <span className="stat-card__value">{value}</span>
      <span className="stat-card__label">{label}</span>
    </div>
  );
}

function EditIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20h9" /><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" />
    </svg>
  );
}

function TrashIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0-1 14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2L4 6" />
    </svg>
  );
}

// src/pages/Profile.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import { formatPrice } from "../components/PlanCard";
import "./Profile.css";

export default function Profile() {
  const { user, token, refreshUser } = useAuth();
  const location = useLocation();

  const [orders, setOrders] = useState([]);
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [name, setName] = useState(user?.name || "");
  const [company, setCompany] = useState(user?.company || "");
  const [savingProfile, setSavingProfile] = useState(false);
  const [profileMsg, setProfileMsg] = useState("");

  const [selectedPlan, setSelectedPlan] = useState(location.state?.selectPlanId || "");
  const [domain, setDomain] = useState("");
  const [subscribing, setSubscribing] = useState(false);
  const [orderMsg, setOrderMsg] = useState("");

  async function loadData() {
    setLoading(true);
    try {
      const [ordersRes, plansRes] = await Promise.all([api.getMyOrders(token), api.getPlans()]);
      setOrders(ordersRes.orders);
      setPlans(plansRes.plans);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    setName(user?.name || "");
    setCompany(user?.company || "");
  }, [user]);

  async function handleProfileSave(e) {
    e.preventDefault();
    setSavingProfile(true);
    setProfileMsg("");
    try {
      await api.updateMe({ name, company }, token);
      await refreshUser();
      setProfileMsg("Profile updated.");
    } catch (err) {
      setProfileMsg(err.message);
    } finally {
      setSavingProfile(false);
    }
  }

  async function handleSubscribe(e) {
    e.preventDefault();
    if (!selectedPlan) {
      setOrderMsg("Choose a plan first.");
      return;
    }
    setSubscribing(true);
    setOrderMsg("");
    try {
      await api.createOrder({ plan_id: Number(selectedPlan), domain }, token);
      setDomain("");
      setOrderMsg("Site added.");
      loadData();
    } catch (err) {
      setOrderMsg(err.message);
    } finally {
      setSubscribing(false);
    }
  }

  if (!user) return null;

  return (
    <div className="container profile">
      <div className="profile__header">
        <span className="profile__avatar">{user.name.charAt(0).toUpperCase()}</span>
        <div>
          <h1>{user.name}</h1>
          <p className="profile__email">{user.email}</p>
        </div>
        {user.role === "admin" && <span className="badge badge--cyan">Admin</span>}
      </div>

      <div className="profile__grid">
        {/* Account details */}
        <section className="card">
          <h2 className="card__title">Account details</h2>
          <form onSubmit={handleProfileSave}>
            <div className="field">
              <label htmlFor="name">Full name</label>
              <input id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
              <label htmlFor="company">Company</label>
              <input id="company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder="Optional" />
            </div>
            <div className="field">
              <label>Email</label>
              <input value={user.email} disabled />
            </div>
            {profileMsg && <p className="profile__msg">{profileMsg}</p>}
            <button className="btn btn--primary" disabled={savingProfile}>
              {savingProfile ? "Saving…" : "Save changes"}
            </button>
          </form>
        </section>

        {/* Add a site */}
        <section className="card">
          <h2 className="card__title">Add a site</h2>
          <p className="card__sub">Subscribe an existing plan to a new domain.</p>
          <form onSubmit={handleSubscribe}>
            <div className="field">
              <label htmlFor="plan">Plan</label>
              <select id="plan" value={selectedPlan} onChange={(e) => setSelectedPlan(e.target.value)}>
                <option value="">Select a plan…</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name} — {formatPrice(p.price_cents)}/{p.billing_period}
                  </option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="domain">Domain</label>
              <input
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                placeholder="yoursite.com"
              />
            </div>
            {orderMsg && <p className="profile__msg">{orderMsg}</p>}
            <button className="btn btn--primary" disabled={subscribing}>
              {subscribing ? "Adding…" : "Add site"}
            </button>
          </form>
        </section>
      </div>

      {/* Orders / sites table */}
      <section className="card profile__orders">
        <h2 className="card__title">Your sites</h2>
        {loading && <p className="card__sub">Loading…</p>}
        {error && <p className="profile__msg">{error}</p>}
        {!loading && orders.length === 0 && <p className="card__sub">No sites yet — add one above.</p>}

        {!loading && orders.length > 0 && (
          <table className="table">
            <thead>
              <tr>
                <th>Domain</th>
                <th>Plan</th>
                <th>Price</th>
                <th>Status</th>
                <th>Added</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => (
                <tr key={o.id}>
                  <td>{o.domain || "—"}</td>
                  <td>{o.plan_name}</td>
                  <td>
                    {formatPrice(o.plan_price_cents)}/{o.billing_period}
                  </td>
                  <td>
                    <StatusBadge status={o.status} />
                  </td>
                  <td className="table__dim">{o.created_at}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    active: "badge--green",
    pending: "badge--amber",
    cancelled: "badge--red",
  };
  return <span className={`badge ${map[status] || ""}`}>{status}</span>;
}

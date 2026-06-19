// src/components/PlanFormModal.jsx
import { useState } from "react";
import "./PlanFormModal.css";

const empty = {
  name: "",
  tagline: "",
  price_cents: "",
  billing_period: "mo",
  storage_gb: "",
  bandwidth_tb: "",
  sites: "",
  featured: false,
  sort_order: 0,
  features: "",
};

export default function PlanFormModal({ initial, onSave, onClose }) {
  const [form, setForm] = useState(() =>
    initial
      ? { ...initial, features: initial.features.join("\n"), price_cents: initial.price_cents / 100 }
      : empty
  );
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  function update(key, value) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      await onSave({
        ...form,
        price_cents: Math.round(Number(form.price_cents) * 100),
        storage_gb: Number(form.storage_gb),
        bandwidth_tb: Number(form.bandwidth_tb),
        sites: Number(form.sites),
        sort_order: Number(form.sort_order) || 0,
        featured: !!form.featured,
        features: form.features.split("\n").map((s) => s.trim()).filter(Boolean),
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal__title">{initial ? "Edit plan" : "New plan"}</h2>

        {error && <div className="auth__error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="modal__row">
            <div className="field">
              <label>Name</label>
              <input required value={form.name} onChange={(e) => update("name", e.target.value)} />
            </div>
            <div className="field">
              <label>Sort order</label>
              <input type="number" value={form.sort_order} onChange={(e) => update("sort_order", e.target.value)} />
            </div>
          </div>

          <div className="field">
            <label>Tagline</label>
            <input value={form.tagline} onChange={(e) => update("tagline", e.target.value)} />
          </div>

          <div className="modal__row">
            <div className="field">
              <label>Price (USD)</label>
              <input
                type="number"
                step="0.01"
                required
                value={form.price_cents}
                onChange={(e) => update("price_cents", e.target.value)}
              />
            </div>
            <div className="field">
              <label>Billing period</label>
              <select value={form.billing_period} onChange={(e) => update("billing_period", e.target.value)}>
                <option value="mo">Monthly</option>
                <option value="yr">Yearly</option>
              </select>
            </div>
          </div>

          <div className="modal__row modal__row--3">
            <div className="field">
              <label>Storage (GB)</label>
              <input type="number" required value={form.storage_gb} onChange={(e) => update("storage_gb", e.target.value)} />
            </div>
            <div className="field">
              <label>Bandwidth (TB)</label>
              <input type="number" required value={form.bandwidth_tb} onChange={(e) => update("bandwidth_tb", e.target.value)} />
            </div>
            <div className="field">
              <label>Sites</label>
              <input type="number" required value={form.sites} onChange={(e) => update("sites", e.target.value)} placeholder="-1 = unlimited" />
            </div>
          </div>

          <div className="field">
            <label>Features (one per line)</label>
            <textarea
              rows={5}
              value={form.features}
              onChange={(e) => update("features", e.target.value)}
              placeholder={"1 website\n20 GB NVMe storage\nFree SSL certificate"}
            />
          </div>

          <label className="checkbox-row">
            <input type="checkbox" checked={form.featured} onChange={(e) => update("featured", e.target.checked)} />
            Mark as "Most popular"
          </label>

          <div className="modal__actions">
            <button type="button" className="btn btn--outline" onClick={onClose}>Cancel</button>
            <button className="btn btn--primary" disabled={busy}>
              {busy ? "Saving…" : "Save plan"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

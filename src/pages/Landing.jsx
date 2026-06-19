// src/pages/Landing.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { api } from "../lib/api";
import StatusConsole from "../components/StatusConsole";
import PlanCard from "../components/PlanCard";
import "./Landing.css";

const FEATURES = [
  {
    title: "NVMe storage, every tier",
    body: "No spinning disks anywhere in the stack. Pages load off solid-state storage from the smallest plan up.",
    icon: "storage",
  },
  {
    title: "One-click staging",
    body: "Clone any site to a staging environment, test changes, then push to production without downtime.",
    icon: "branch",
  },
  {
    title: "Automatic backups",
    body: "Every plan backs up on a schedule. Restore a full snapshot or a single file in a couple of clicks.",
    icon: "shield",
  },
  {
    title: "Real humans, fast",
    body: "Support replies come from engineers who run the platform, not a script. Median first reply under 8 minutes.",
    icon: "chat",
  },
];

const REGIONS = [
  { code: "FRA", name: "Frankfurt, DE" },
  { code: "IAD", name: "Virginia, US" },
  { code: "SIN", name: "Singapore" },
  { code: "BOM", name: "Mumbai, IN" },
];

export default function Landing() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api
      .getPlans()
      .then(({ plans }) => setPlans(plans))
      .catch(() => setError("Couldn't load plans right now."))
      .finally(() => setLoading(false));
  }, []);

  function handleSelectPlan(plan) {
    if (!user) {
      navigate("/register", { state: { planId: plan.id } });
    } else {
      navigate("/profile", { state: { selectPlanId: plan.id } });
    }
  }

  return (
    <div className="landing">
      {/* Hero */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Managed cloud hosting</span>
            <h1 className="hero__title">
              Servers that<br />stay out of<br />your way.
            </h1>
            <p className="hero__sub">
              NimbusEdge runs your sites on NVMe storage across four regions, with backups,
              staging, and support that don't make you wait. Deploy in minutes, not tickets.
            </p>
            <div className="hero__actions">
              <a href="#plans" className="btn btn--primary btn--lg">See plans</a>
              <a href="#status" className="btn btn--outline btn--lg">Check network status</a>
            </div>
          </div>
          <div className="hero__visual">
            <StatusConsole />
          </div>
        </div>
      </section>

      {/* Regions strip */}
      <section className="regions" id="status">
        <div className="container regions__inner">
          <span className="regions__label">Live in four regions</span>
          <div className="regions__list">
            {REGIONS.map((r) => (
              <div className="regions__item" key={r.code}>
                <span className="regions__dot" />
                {r.name}
                <span className="regions__code">{r.code}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="features" id="features">
        <div className="container">
          <h2 className="section-title">Built for people who'd rather not think about hosting</h2>
          <p className="section-sub">The fundamentals, handled, so the rest of your time goes to the actual product.</p>

          <div className="features__grid">
            {FEATURES.map((f) => (
              <div className="feature-card" key={f.title}>
                <FeatureIcon name={f.icon} />
                <h3>{f.title}</h3>
                <p>{f.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="plans" id="plans">
        <div className="container">
          <h2 className="section-title">Plans that grow with the project</h2>
          <p className="section-sub">Switch tiers anytime. No setup fees, no contracts.</p>

          {loading && <p className="plans__status">Loading plans…</p>}
          {error && <p className="plans__status plans__status--error">{error}</p>}

          {!loading && !error && (
            <div className="plans__grid">
              {plans.map((plan) => (
                <PlanCard key={plan.id} plan={plan} onSelect={handleSelectPlan} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner">
          <h2>Your site could be live in the next five minutes.</h2>
          <a href="#plans" className="btn btn--primary btn--lg">Start now — no card required</a>
        </div>
      </section>
    </div>
  );
}

function FeatureIcon({ name }) {
  const paths = {
    storage: <path d="M4 7c0-1.1 3.58-2 8-2s8 .9 8 2-3.58 2-8 2-8-.9-8-2Zm0 0v10c0 1.1 3.58 2 8 2s8-.9 8-2V7M4 12c0 1.1 3.58 2 8 2s8-.9 8-2" />,
    branch: <path d="M6 3v8a4 4 0 0 0 4 4h4M6 3a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 14a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm0-8a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />,
    shield: <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" />,
    chat: <path d="M21 12a8.96 8.96 0 0 1-2.34 6.06L21 21l-3.2-1.07A9 9 0 1 1 21 12Z" />,
  };
  return (
    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="feature-card__icon">
      {paths[name]}
    </svg>
  );
}

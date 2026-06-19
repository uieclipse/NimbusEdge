// src/components/PlanCard.jsx
import "./PlanCard.css";

export function formatPrice(cents) {
  return `$${(cents / 100).toFixed(2)}`;
}

export default function PlanCard({ plan, onSelect, ctaLabel = "Choose plan", highlight }) {
  return (
    <div className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`}>
      {plan.featured && <span className="plan-card__badge">Most popular</span>}
      <h3 className="plan-card__name">{plan.name}</h3>
      <p className="plan-card__tagline">{plan.tagline}</p>

      <div className="plan-card__price">
        <span className="plan-card__amount">{formatPrice(plan.price_cents)}</span>
        <span className="plan-card__period">/{plan.billing_period}</span>
      </div>

      <ul className="plan-card__features">
        {plan.features.map((f, i) => (
          <li key={i}>
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
              <path d="M5 12.5l4.5 4.5L19.5 7" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {f}
          </li>
        ))}
      </ul>

      {onSelect && (
        <button
          className={`btn btn--block ${plan.featured ? "btn--primary" : "btn--outline"}`}
          onClick={() => onSelect(plan)}
        >
          {ctaLabel}
        </button>
      )}
    </div>
  );
}

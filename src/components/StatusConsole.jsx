// src/components/StatusConsole.jsx
import { useEffect, useRef, useState } from "react";
import "./StatusConsole.css";

const REGIONS = [
  { code: "fra-1", name: "Frankfurt", base: 11 },
  { code: "iad-1", name: "Virginia", base: 18 },
  { code: "sin-1", name: "Singapore", base: 24 },
  { code: "bom-1", name: "Mumbai", base: 14 },
];

const LOG_TEMPLATES = [
  (r) => `deploy ${r.code} :: build cache restored`,
  (r) => `${r.code} :: TLS cert renewed (auto)`,
  (r) => `${r.code} :: edge node healthy, latency ${r.base + Math.floor(Math.random() * 4)}ms`,
  (r) => `${r.code} :: backup snapshot completed`,
  (r) => `${r.code} :: autoscale +1 instance (load 71%)`,
];

function makeLine(id) {
  const region = REGIONS[Math.floor(Math.random() * REGIONS.length)];
  const template = LOG_TEMPLATES[Math.floor(Math.random() * LOG_TEMPLATES.length)];
  return { id, text: template(region) };
}

export default function StatusConsole() {
  const [lines, setLines] = useState(() => [makeLine(1), makeLine(2), makeLine(3)]);
  const counter = useRef(4);

  useEffect(() => {
    const interval = setInterval(() => {
      setLines((prev) => {
        const next = [...prev, makeLine(counter.current++)];
        return next.slice(-6);
      });
    }, 2200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="console" role="img" aria-label="Live server status log, illustrative">
      <div className="console__bar">
        <span className="console__dot console__dot--red" />
        <span className="console__dot console__dot--amber" />
        <span className="console__dot console__dot--green" />
        <span className="console__bar-title">nimbusedge — uptime monitor</span>
      </div>
      <div className="console__body">
        {REGIONS.map((r) => (
          <div className="console__region" key={r.code}>
            <span className="console__pulse" />
            <span className="console__region-name">{r.name}</span>
            <span className="console__region-code">{r.code}</span>
            <span className="console__region-ms">{r.base}ms</span>
          </div>
        ))}
        <div className="console__divider" />
        <div className="console__log">
          {lines.map((l) => (
            <div className="console__log-line" key={l.id}>
              <span className="console__log-arrow">›</span> {l.text}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

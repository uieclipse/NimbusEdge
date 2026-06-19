// src/pages/Login.jsx
import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Auth.css";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setBusy(true);
    try {
      const user = await login(email, password);
      const redirectTo = location.state?.from || (user.role === "admin" ? "/admin" : "/profile");
      navigate(redirectTo);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="auth">
      <div className="auth__card">
        <h1 className="auth__title">Welcome back</h1>
        <p className="auth__sub">Log in to manage your sites and plan.</p>

        <div className="auth__hint">
          Admin demo: admin@nimbusedge.dev / Admin123!
          <br />
          User demo: asha@example.com / User123!
        </div>

        {error && <div className="auth__error">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button className="btn btn--primary btn--block auth__submit" disabled={busy}>
            {busy ? "Logging in…" : "Log in"}
          </button>
        </form>

        <div className="auth__footer">
          Don't have an account? <Link to="/register">Create one</Link>
        </div>
      </div>
    </div>
  );
}

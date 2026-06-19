// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Navbar.css";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <Link to="/" className="navbar__brand">
          <span className="navbar__brand-mark" aria-hidden="true">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M4 16.5C4 13.46 6.46 11 9.5 11c.2-3.3 2.95-6 6.3-6 3.42 0 6.2 2.6 6.45 5.93 1.9.5 3.25 2.2 3.25 4.27 0 2.5-2.05 4.3-4.5 4.3H8.2C5.88 19.5 4 17.78 4 16.5Z" stroke="#4DD2FF" strokeWidth="1.6"/>
            </svg>
          </span>
          NimbusEdge
        </Link>

        <nav className="navbar__links">
          <NavLink to="/#plans" className="navbar__link">Plans</NavLink>
          <NavLink to="/#features" className="navbar__link">Features</NavLink>
          <NavLink to="/#status" className="navbar__link">Network</NavLink>
        </nav>

        <div className="navbar__actions">
          {user ? (
            <>
              {user.role === "admin" && (
                <Link to="/admin" className="btn btn--ghost">Admin panel</Link>
              )}
              <Link to="/profile" className="navbar__user">
                <span className="navbar__avatar">{user.name.charAt(0).toUpperCase()}</span>
                {user.name.split(" ")[0]}
              </Link>
              <button className="btn btn--outline" onClick={handleLogout}>Log out</button>
            </>
          ) : (
            <>
              <Link to="/login" className="btn btn--ghost">Log in</Link>
              <Link to="/register" className="btn btn--primary">Get started</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

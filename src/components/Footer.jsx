// src/components/Footer.jsx
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__col">
          <div className="footer__brand">NimbusEdge</div>
          <p className="footer__tagline">Infrastructure that gets out of your way.</p>
        </div>
        <div className="footer__col">
          <span className="footer__heading">Product</span>
          <a href="/#plans">Plans</a>
          <a href="/#features">Features</a>
          <a href="/#status">Network status</a>
        </div>
        <div className="footer__col">
          <span className="footer__heading">Company</span>
          <a href="#about">About</a>
          <a href="#careers">Careers</a>
          <a href="#contact">Contact</a>
        </div>
        <div className="footer__col">
          <span className="footer__heading">Legal</span>
          <a href="#terms">Terms</a>
          <a href="#privacy">Privacy</a>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© {new Date().getFullYear()} NimbusEdge. Sample project, not a real hosting provider.</span>
      </div>
    </footer>
  );
}

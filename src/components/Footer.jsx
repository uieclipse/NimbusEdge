// src/components/Footer.jsx
import "./Footer.css";

const CONTACTS = [
  { label: 'Email', value: 'sanjay@example.com', href: 'mailto:sanjay@example.com' },
  { label: 'GitHub', value: 'github.com/your-username', href: 'https://github.com/your-username' },
  { label: 'LinkedIn', value: 'linkedin.com/in/your-username', href: 'https://linkedin.com/in/your-username' },
];
export default function Footer() {
  return (
    <footer className="footer">
      <div className="container ">
        <h2 className="footer__title">let's build something together.</h2>
          <div className="contact__grid">
          <p className="contact__intro">
            Open to frontend roles and freelance projects. The fastest way to
            reach me is email — I read everything that lands there.
          </p>

          <ul className="contact__list">
            {CONTACTS.map((c) => (
              <li key={c.label}>
                <a href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" className="contact__link">
                  <span className="contact__label">{c.label}</span>
                  <span className="contact__value">{c.value}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="container footer__bottom">
        <span>© 2026 Sanjay. Built with React.
</span>
      </div>
    </footer>
  );
}

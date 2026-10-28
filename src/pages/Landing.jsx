// src/pages/Landing.jsx
import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import StatusConsole from "../components/StatusConsole";
import "./Landing.css";
import './About.css';
import TechIcon from './TechIcon.jsx';
import './Experience.css';

const GROUPS = [
  {
    label: 'Web',
    items: [
      { name: 'React.js', icon: 'react', level: 92 },
      { name: 'JavaScript (ES6+)', icon: 'javascript', level: 92 },
      { name: 'TypeScript', icon: 'typescript', level: 82 },
      { name: 'Next.js', icon: 'react', level: 80 },
      { name: 'Redux Toolkit', icon: 'redux', level: 85 },
      { name: 'HTML5', icon: 'html5', level: 95 },
      { name: 'CSS3', icon: 'css3', level: 92 },
      { name: 'Sass', icon: 'sass', level: 88 },
      { name: 'Tailwind CSS', icon: 'tailwindcss', level: 85 },
    ],
  },
  {
    label: 'Mobile',
    items: [
      { name: 'Flutter', icon: 'flutter', level: 82 },
      { name: 'Dart', icon: 'dart', level: 80 },
      { name: 'Bloc / Riverpod / Provider', icon: 'flutter', level: 75 },
      { name: 'Firebase', icon: 'firebase', level: 72 },
    ],
  },
  {
    label: 'APIs & Tools',
    items: [
      { name: 'REST APIs', icon: 'api', level: 90 },
      { name: 'Git', icon: 'git', level: 90 },
      { name: 'Jest', icon: 'jest', level: 72 },
      { name: 'Vite', icon: 'vite', level: 85 },
      { name: 'Webpack', icon: 'webpack', level: 72 },
    ],
  },
];

const PROJECTS = [
  {
    name: 'Investment Advisory Platform',
    status: 'live',
    description: 'A wealth-tech platform for advisors and investors on web (React) and mobile (Flutter): portfolio dashboards, fund discovery, model portfolios and risk profiling.',
    metrics: [
      { label: 'Platforms', value: 'Web + Mobile' },
      { label: 'Role', value: 'Frontend lead' },
    ],
    achievements: [
      'Built onboarding and KYC journeys that reduced investor drop-offs.',
      'Improved web performance through code-splitting, lazy loading and API optimisation.',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Redux', icon: 'redux' },
      { name: 'Sass', icon: 'sass' },
    ],
    github: null,
    demo: null,
  },
  {
    name: 'Learning Management System',
    status: 'live',
    description: 'An LMS built in React with courses, assessments, progress tracking and role-based screens.',
    metrics: [
      { label: 'Platform', value: 'Web' },
      { label: 'Role', value: 'Frontend lead' },
    ],
    achievements: [
      'Built course, assessment and progress-tracking flows.',
      'Delivered role-based screens for different user types.',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'Redux', icon: 'redux' },
    ],
    github: null,
    demo: null,
  },
  {
    name: 'Shared Component Library',
    status: 'live',
    description: 'A reusable React component library in TypeScript and Sass, shared across products to speed up feature delivery.',
    metrics: [
      { label: 'Built with', value: 'TS + Sass' },
      { label: 'Used in', value: 'IAP & LMS' },
    ],
    achievements: [
      'Gave product teams one consistent set of UI building blocks.',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'TypeScript', icon: 'typescript' },
      { name: 'Sass', icon: 'sass' },
    ],
    github: null,
    demo: null,
  },
];

const FACTS = [
  { label: 'Role', value: 'Frontend Tech Lead' },
  { label: 'Experience', value: '8+ years' },
  { label: 'Focus', value: 'React.js, Next.js & Flutter' },
  { label: 'Domain', value: 'Wealth-tech & Fintech' },
  { label: 'Based in', value: 'Kolkata, India' },
];

const TIMELINE = [
  {
    role: 'Frontend Tech Lead',
    company: 'Finlabs India Pvt Ltd · Kolkata',
    period: '2021 — Present',
    points: [
      'Lead frontend development of the Investment Advisory Platform (IAP) on web (React) and mobile (Flutter) for advisors and investors.',
      'Built investor dashboards for portfolio value, returns, asset allocation and transactions, with accurate, real-time data.',
      'Built onboarding, KYC and risk-profiling flows that cut drop-offs.',
      'Built the LMS platform in React: courses, quizzes, progress tracking and role-based screens.',
      'Built cross-platform Flutter apps for Android and iOS from one codebase, cutting mobile effort.',
      'Created a shared React component library (TypeScript + Sass) used across products, speeding up delivery.',
      'Improved web performance using code-splitting, lazy loading and API optimisation.',
      'Integrated REST APIs with backend teams and used Postman for API testing.',
      'Mentor developers and own code reviews, coding standards and the Git branching strategy.',
    ],
  },
  {
    role: 'Frontend Developer',
    company: 'Earlier roles',
    period: '2016 — 2021',
    points: [
      'Built responsive web applications with React.js, JavaScript and Redux.',
      'Created reusable components with HTML5, CSS3 and Sass and integrated REST APIs.',
      'Developed cross-browser user interfaces with JavaScript, jQuery, HTML5 and CSS3 in Agile teams.',
    ],
  },
];

const CERTIFICATIONS = [
  { name: 'Generative AI Foundations', issuer: 'upGrad', year: '2025' },
  { name: 'JavaScript: The Complete Guide (Beginner + Advanced)', issuer: 'Udemy', year: '2022' },
  { name: 'The Complete Sass & SCSS Course', issuer: 'Udemy', year: '2021' },
  { name: 'TypeScript', issuer: 'Udemy', year: '2021' },
];

export default function Landing() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const landingRef = useRef(null);


  useEffect(() => {
    const root = landingRef.current;
    if (!root) return;
    const els = root.querySelectorAll("[data-anim]");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);



  return (
    <div className="landing" ref={landingRef}>
      {/* Hero — animates via CSS immediately on mount */}
      <section className="hero">
        <div className="container hero__grid">
          <div className="hero__copy">
            <span className="eyebrow">Open to new opportunities</span>
            <h1 className="hero__title">
              I'm Sanjay Nandi,
            </h1>
            <p className="hero__sub">
              a Frontend Tech Lead building fast, secure web and mobile apps with React.js and Flutter.
              <br/>
              8+ years shipping wealth-tech and fintech products — from portfolio dashboards to KYC onboarding.
            </p>
            <div className="hero__actions">
              <a href="#projects" className="btn btn--primary btn--lg">View Projects</a>
              <a href="#about" className="btn btn--outline btn--lg">Contact Me</a>
            </div>
          </div>
          <div className="hero__visual">
            <StatusConsole />
          </div>
        </div>
      </section>

      {/* About */}
      <section className="regions" id="about">
        <div className="section about">
          <div className="container">
            <h2 className="section-title" data-anim="fade-up">A bit about how I work</h2>
            <div className="about__grid">
              <div className="about__text" data-anim="fade-up" data-delay="100">
                <p>
                  I'm Sanjay, a Frontend Tech Lead with 8+ years of experience building
                  fast, secure web and mobile apps with React.js and Flutter.
                </p>
                <p>
                  At Finlabs India I lead frontend for an Investment Advisory Platform
                  and a Learning Management System, working day to day in JavaScript,
                  TypeScript, Next.js and Redux. I know the wealth-tech domain well —
                  mutual funds, SIPs, portfolio and NAV reporting, KYC onboarding and
                  risk profiling.
                </p>
                <p>
                  I also mentor developers, run code reviews, and keep API contracts
                  with backend teams clean, so the whole team ships things that hold
                  up under real use.
                </p>
              </div>
              <dl className="about__facts" data-anim="fade-up" data-delay="200">
                {FACTS.map((f) => (
                  <div key={f.label} className="about__fact">
                    <dt>{f.label}</dt>
                    <dd>{f.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section className="features" id="skills">
        <div className="container">
          <h2 className="section-title" data-anim="fade-up">what i reach for</h2>
          <div className="skills__groups">
            {GROUPS.map((group, gi) => (
              <div
                key={group.label}
                className="skills__group"
                data-anim="fade-up"
                data-delay={String((gi + 1) * 100)}
              >
                <h3 className="skills__group-label">{group.label}</h3>
                <ul className="skills__list">
                  {group.items.map((item, ii) => (
                    <li
                      key={item.name}
                      className="skills__item"
                      data-anim="fade-up"
                      data-delay={String((ii + 1) * 80)}
                    >
                      <div className="skills__item-top">
                        <span className="skills__item-icon">
                          <TechIcon name={item.icon} />
                        </span>
                        <span className="skills__item-name">{item.name}</span>
                        <span className="skills__item-level">{item.level}%</span>
                      </div>
                      <div
                        className="skills__bar-track"
                        role="progressbar"
                        aria-label={`${item.name} proficiency`}
                        aria-valuenow={item.level}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      >
                        <span
                          className="skills__bar-fill"
                          style={{ '--level': `${item.level}%`, animationDelay: `${ii * 80}ms` }}
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section className="features" id="experience">
        <div className="container">
          <h2 className="section-title" data-anim="fade-up">Where I've worked</h2>
          <ol className="timeline">
            {TIMELINE.map((job, i) => (
              <li
                key={`${job.company}-${job.period}`}
                className="timeline__item"
                data-anim="slide-right"
                data-delay={String(i * 100)}
              >
                <div className="timeline__marker" aria-hidden="true" />
                <div className="timeline__content">
                  <p className="timeline__period">{job.period}</p>
                  <h3 className="timeline__role">{job.role}</h3>
                  <p className="timeline__company">{job.company}</p>
                  <ul className="timeline__points">
                    {job.points.map((point, j) => (
                      <li key={j}>{point}</li>
                    ))}
                  </ul>
                </div>
              </li>
            ))}
          </ol>

          <h3 className="skills__group-label" data-anim="fade-up">Certifications</h3>
          <ul className="timeline__points" data-anim="fade-up">
            {CERTIFICATIONS.map((c) => (
              <li key={c.name}>{c.name} · {c.issuer} · {c.year}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section className="features" id="projects">
        <div className="container">
          <h2 className="section-title" data-anim="fade-up">Things I've built</h2>
          <div className="projects__grid">
            {PROJECTS.map((project, i) => (
              <article
                key={project.name}
                className="project-card"
                data-anim="fade-up"
                data-delay={String(i * 150)}
              >
                <div className="project-card__top">
                  <h3>{project.name}</h3>
                  <span className={`project-card__status project-card__status--${project.status}`}>
                    {project.status === 'live' ? 'Live' : 'Building'}
                  </span>
                </div>
                <p className="project-card__desc">{project.description}</p>
                <div className="project-card__metrics">
                  {project.metrics.map((m) => (
                    <div key={m.label} className="project-card__metric">
                      <span className="project-card__metric-value">{m.value}</span>
                      <span className="project-card__metric-label">{m.label}</span>
                    </div>
                  ))}
                </div>
                <ul className="project-card__achievements">
                  {project.achievements.map((a, j) => (
                    <li key={j}>{a}</li>
                  ))}
                </ul>
                <ul className="project-card__stack">
                  {project.stack.map((tech) => (
                    <li key={tech.name} title={tech.name}>
                      <TechIcon name={tech.icon} />
                    </li>
                  ))}
                </ul>
                <div className="project-card__links">
                  {project.github && (
                    <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
                      GitHub →
                    </a>
                  )}
                  {project.demo && (
                    <a href={project.demo} target="_blank" rel="noreferrer" className="project-card__link">
                      Live demo →
                    </a>
                  )}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta__inner w-100" data-anim="fade-up">
          <h2 className="section-title">got an idea? let's build it.</h2>
          <h2 className="section-sub">i'm currently open to freelance projects and full-time roles. fastest way to reach me is email — i actually check it.</h2>
          <a href="#contact" className="btn btn--primary btn--lg">Contact Me</a>
        </div>
      </section>
    </div>
  );
}

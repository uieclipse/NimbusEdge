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
    label: 'Core',
    items: [
      { name: 'JavaScript', icon: 'javascript', level: 90 },
      { name: 'React.js', icon: 'react', level: 88 },
      { name: 'HTML5', icon: 'html5', level: 95 },
      { name: 'CSS3', icon: 'css3', level: 92 },
    ],
  },
  {
    label: 'Frontend Tooling',
    items: [
      { name: 'TypeScript', icon: 'typescript', level: 70 },
      { name: 'Redux', icon: 'redux', level: 75 },
      { name: 'Tailwind CSS', icon: 'tailwindcss', level: 85 },
      { name: 'Sass', icon: 'sass', level: 80 },
      { name: 'Vite', icon: 'vite', level: 82 },
    ],
  },
  {
    label: 'Workflow',
    items: [
      { name: 'Git', icon: 'git', level: 88 },
      { name: 'GitHub', icon: 'github', level: 88 },
      { name: 'Webpack', icon: 'webpack', level: 65 },
      { name: 'Jest', icon: 'jest', level: 70 },
      { name: 'Figma', icon: 'figma', level: 72 },
    ],
  },
];

const PROJECTS = [
  {
    name: 'Project One',
    status: 'live',
    description: 'Replace this with a short description of what the project does and the problem it solves.',
    metrics: [
      { label: 'Lighthouse score', value: '98' },
      { label: 'Load time', value: '0.8s' },
    ],
    achievements: [
      'Replace with a real achievement, e.g. cut bundle size by 40% via code-splitting.',
      'Replace with a second achievement — accessibility audit, test coverage, etc.',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'JavaScript', icon: 'javascript' },
      { name: 'CSS3', icon: 'css3' },
    ],
    github: 'https://github.com/your-username/project-one',
    demo: 'https://project-one-demo.netlify.app',
  },
  {
    name: 'Project Two',
    status: 'live',
    description: 'Replace this with a short description of what the project does and the problem it solves.',
    metrics: [
      { label: 'Users', value: '500+' },
      { label: 'Uptime', value: '99.9%' },
    ],
    achievements: [
      'Replace with a real achievement specific to this project.',
      'Replace with a second achievement, ideally with a number attached.',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'Redux', icon: 'redux' },
      { name: 'TypeScript', icon: 'typescript' },
    ],
    github: 'https://github.com/your-username/project-two',
    demo: 'https://project-two-demo.netlify.app',
  },
  {
    name: 'Project Three',
    status: 'building',
    description: 'Replace this with a short description of what the project does and the problem it solves.',
    metrics: [
      { label: 'Components', value: '24' },
      { label: 'Test coverage', value: '85%' },
    ],
    achievements: [
      'Replace with a real achievement specific to this project.',
    ],
    stack: [
      { name: 'React', icon: 'react' },
      { name: 'Tailwind', icon: 'tailwindcss' },
      { name: 'Vite', icon: 'vite' },
    ],
    github: 'https://github.com/your-username/project-three',
    demo: null,
  },
];

const FACTS = [
  { label: 'Role', value: 'Mid-Level Frontend Developer' },
  { label: 'Focus', value: 'React, JavaScript, UI/UX' },
  { label: 'Stands for', value: 'Responsive & accessible apps' },
];

const TIMELINE = [
  {
    role: 'Frontend Developer',
    company: 'Company Name',
    period: 'Jan 2024 — Present',
    points: [
      'Replace with what you actually did — e.g. built and maintained X feature used by Y users.',
      'Replace with a second concrete contribution, ideally with a number attached.',
      'Replace with a third point — tools you introduced, performance you improved, etc.',
    ],
  },
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
              Building fast, accessible interfaces that scale with the product.
            </h1>
            <p className="hero__sub">
              I'm Sanjay, a Frontend Developer specializing in scalable, accessible user interfaces — from component architecture to performance tuning.
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
                  I'm Sanjay, a mid-level frontend developer who builds interfaces that
                  feel quick, look deliberate, and work for everyone using them — not
                  just the people testing on a fast laptop with a mouse.
                </p>
                <p>
                  My day-to-day lives in React and JavaScript, but the part I care
                  about most is what happens after the components render: is it fast
                  on a slow connection, can it be operated with a keyboard, does it
                  hold up at 320px wide. Accessibility and responsiveness aren't a
                  checklist for me, they're part of what "done" means.
                </p>
                <p>
                  I like clear interfaces, clean component structure, and shipping
                  things that hold up under real use.
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
                  <a href={project.github} target="_blank" rel="noreferrer" className="project-card__link">
                    GitHub →
                  </a>
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

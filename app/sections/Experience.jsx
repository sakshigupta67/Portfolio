"use client";

import { useMemo, useState, useCallback } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { EXPERIENCE } from "../data/profile";

/* ──────────────────────────────────────────────
   Date helpers – sort experiences reverse-chrono
   ────────────────────────────────────────────── */

function parseDateString(dateStr) {
  if (!dateStr) return 0;
  const trimmed = dateStr.trim();
  if (trimmed.toLowerCase() === "present") return Infinity;
  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

function parseDuration(duration) {
  if (!duration) return { start: 0, end: 0 };
  const parts = duration.split(/\s*[—–-]\s*/);
  const start = parseDateString(parts[0]);
  const end = parts[1] ? parseDateString(parts[1]) : start;
  return { start, end };
}

function sortExperiencesByDate(experiences) {
  return [...experiences].sort((a, b) => {
    const aDates = parseDuration(a.duration);
    const bDates = parseDuration(b.duration);
    if (bDates.end !== aDates.end) return bDates.end - aDates.end;
    return bDates.start - aDates.start;
  });
}

/* ──────────────────────────────────────────────
   Notebook Experience Card
   ────────────────────────────────────────────── */

function NotebookCard({ exp, idx, openIdx, onToggle, reduceMotion, activeIdx, onActivate }) {
  const isOpen = openIdx === idx;
  const isActive = activeIdx === idx || isOpen;
  const isMicrosoft = Boolean(exp.dashboardUrl);

  return (
    <motion.article
      className={`experience-entry experience-entry--${idx % 2 === 0 ? "left" : "right"}`}
      initial={{ opacity: 0, x: reduceMotion ? 0 : idx % 2 === 0 ? -20 : 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration: reduceMotion ? 0 : 0.6, ease: "easeOut" }}
      onViewportEnter={() => onActivate(idx)}
    >
      <div className={`experience-node ${isActive ? "experience-node--active" : ""}`} aria-hidden="true">
        <span />
      </div>
      <div className={`experience-connector ${isActive ? "experience-connector--active" : ""}`} aria-hidden="true" />

      <div className="experience-card-wrap">
        <div
          className={`experience-card ${isMicrosoft ? "experience-card--featured" : ""} ${isOpen ? "experience-card--open" : ""}`}
          onClick={() => onToggle(idx)}
          onKeyDown={(e) => {
            if (e.target !== e.currentTarget) return;
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle(idx);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
          aria-controls={`experience-details-${idx}`}
        >
          <div className="experience-card__topline">
            <span className="experience-card__index">0{idx + 1}</span>
            <span className="experience-card__category">
              <span className="experience-card__marker" aria-hidden="true" />
              {exp.category || exp.company}
            </span>
          </div>
          <div className="experience-card__identity">
            {exp.logo && <img className="experience-card__logo" src={exp.logo} alt="" aria-hidden="true" />}
            <div>
              <h3 className="experience-card__role">{exp.role}</h3>
              <p className="experience-card__company">{exp.company}</p>
            </div>
          </div>
          <p className="experience-card__date">{exp.duration}</p>
          <p className="experience-card__preview">{exp.description}</p>

          {isMicrosoft ? (
            <div className="experience-card__actions">
              <button className="experience-card__cta experience-card__expand" type="button" onClick={(event) => { event.stopPropagation(); onToggle(idx); }} aria-expanded={isOpen}>
                <span>{isOpen ? "Close details" : "Explore experience"}</span>
                <span className="experience-card__arrow">{isOpen ? "↑" : "→"}</span>
              </button>
              <a className="experience-card__dashboard" href={exp.dashboardUrl} target="_blank" rel="noopener noreferrer" onClick={(event) => event.stopPropagation()}>
                <span>View internship dashboard</span>
                <span className="experience-card__arrow">↗</span>
              </a>
            </div>
          ) : (
            <button className="experience-card__cta" type="button" onClick={(event) => { event.stopPropagation(); onToggle(idx); }} aria-expanded={isOpen}>
              <span>{isOpen ? "Close details" : "Explore experience"}</span>
              <span className="experience-card__arrow">{isOpen ? "↑" : "→"}</span>
            </button>
          )}

          <div
            id={`experience-details-${idx}`}
            className={`experience-card__details ${isOpen ? "experience-card__details--visible" : ""}`}
            aria-hidden={!isOpen}
          >
            <p className="experience-card__details-label">Additional details</p>
            <p>{exp.description}</p>
            {exp.contributions && (
              <div className="experience-card__detail-group">
                <p className="experience-card__details-label">Key contributions</p>
                <ul>{exp.contributions.map((item) => <li key={item}>{item}</li>)}</ul>
              </div>
            )}
            {exp.technologies && (
              <div className="experience-card__detail-group">
                <p className="experience-card__details-label">Technologies</p>
                <div className="experience-card__chips">{exp.technologies.map((technology) => <span key={technology}>{technology}</span>)}</div>
              </div>
            )}
            {exp.credentials && (
              <div className="experience-card__detail-group">
                <p className="experience-card__details-label">Microsoft credentials</p>
                <div className="experience-card__chips">{exp.credentials.map((credential) => <span key={credential}>{credential}</span>)}</div>
              </div>
            )}
            {exp.highlights && (
              <div className="experience-card__detail-group">
                <p className="experience-card__details-label">Highlights</p>
                <ul>{exp.highlights.map((highlight) => <li key={highlight}>{highlight}</li>)}</ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.article>
  );
}

/* ──────────────────────────────────────────────
   Experience Section
   ────────────────────────────────────────────── */

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion
    ? { duration: 0 }
    : { duration: 0.6, ease: "easeOut" };

  const sortedExperiences = useMemo(
    () => sortExperiencesByDate(EXPERIENCE),
    []
  );

  // Track which card is currently "opened" (null = none)
  const [openIdx, setOpenIdx] = useState(null);
  const [activeIdx, setActiveIdx] = useState(null);

  // Toggle open/close — clicking an open card closes it
  const handleToggle = useCallback((idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <section
      id="experience"
      aria-labelledby="xp-heading"
      className="experience-section py-12 sm:py-20"
    >
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 id="xp-heading" className="section-heading mb-2">
          Experience
        </h2>
        <p className="experience-subtitle">Where I&apos;ve built, contributed, and learned.</p>

        <div className="experience-timeline max-w-5xl mx-auto mt-8 sm:mt-10">
          {/* Timeline line */}
          <div className="experience-timeline__line" aria-hidden="true" />

          <div className="experience-timeline__items">
            {sortedExperiences.map((exp, idx) => (
              <NotebookCard
                key={idx}
                exp={exp}
                idx={idx}
                openIdx={openIdx}
                onToggle={handleToggle}
                reduceMotion={reduceMotion}
                activeIdx={activeIdx}
                onActivate={setActiveIdx}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

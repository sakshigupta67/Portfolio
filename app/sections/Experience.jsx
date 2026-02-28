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

function NotebookCard({ exp, idx, openIdx, onToggle }) {
  const isOpen = openIdx === idx;
  const isSiblingOpen = openIdx !== null && openIdx !== idx;

  return (
    <article
      className={`relative flex items-start gap-4 sm:gap-6 ${
        idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
      }`}
    >
      {/* Timeline dot */}
      <div className="absolute left-4 md:left-1/2 w-2 h-2 sm:w-3 sm:h-3 -translate-x-1/2 rounded-full bg-primary-cyan shadow-glow z-10" />

      {/* Perspective wrapper for 3D notebook effect */}
      <div
        className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${
          idx % 2 === 0 ? "md:pr-12" : "md:pl-12"
        }`}
        style={{ perspective: "1200px" }}
      >
        <div
          className={`notebook-card ${isOpen ? "notebook-card--open" : ""} ${
            isSiblingOpen ? "notebook-card--dimmed" : ""
          }`}
          onClick={() => onToggle(idx)}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              onToggle(idx);
            }
          }}
          role="button"
          tabIndex={0}
          aria-expanded={isOpen}
        >
          {/* ── Card front: always visible ── */}
          <div className="notebook-card__header">
            <h3 className="font-heading text-sm sm:text-lg font-semibold text-white leading-snug">
              {exp.role}
            </h3>
            <p className="text-primary-cyan text-xs sm:text-sm mt-1">
              {exp.company}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500 mt-1.5">
              {exp.duration}
            </p>

            {/* Expand hint */}
            <span
              className={`notebook-card__hint ${isOpen ? "notebook-card__hint--hidden" : ""}`}
              aria-hidden="true"
            >
              Click to open
            </span>
          </div>

          {/* ── Inner content: revealed on open ── */}
          <div
            className={`notebook-card__body ${
              isOpen ? "notebook-card__body--visible" : ""
            }`}
          >
            <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
              {exp.description}
            </p>
          </div>

          {/* Page fold pseudo-element is handled via CSS ::after */}
        </div>
      </div>
    </article>
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

  // Toggle open/close — clicking an open card closes it
  const handleToggle = useCallback((idx) => {
    setOpenIdx((prev) => (prev === idx ? null : idx));
  }, []);

  return (
    <section
      id="experience"
      aria-labelledby="xp-heading"
      className="py-12 sm:py-20"
    >
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 id="xp-heading" className="section-heading mb-6 sm:mb-10">
          Experience
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-magenta via-primary-cyan to-transparent"
            aria-hidden="true"
          />

          <div className="space-y-6 sm:space-y-8">
            {sortedExperiences.map((exp, idx) => (
              <NotebookCard
                key={idx}
                exp={exp}
                idx={idx}
                openIdx={openIdx}
                onToggle={handleToggle}
              />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

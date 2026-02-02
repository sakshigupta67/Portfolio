"use client";

import { useMemo } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { EXPERIENCE } from "../data/profile";

/**
 * Parse a date string like "Aug 2024" or "Present" into a sortable timestamp.
 * "Present" is treated as the maximum date (future).
 */
function parseDateString(dateStr) {
  if (!dateStr) return 0;
  const trimmed = dateStr.trim();
  if (trimmed.toLowerCase() === "present") {
    return Infinity; // Present is always most recent
  }
  // Expected format: "Mon YYYY" e.g. "Aug 2024", "Jul 2025"
  const parsed = new Date(trimmed);
  return isNaN(parsed.getTime()) ? 0 : parsed.getTime();
}

/**
 * Extract start and end dates from duration string like "Aug 2024 — Nov 2024" or "Jul 2025 — Present"
 */
function parseDuration(duration) {
  if (!duration) return { start: 0, end: 0 };
  // Split by em-dash (—) or en-dash (–) or hyphen (-)
  const parts = duration.split(/\s*[—–-]\s*/);
  const start = parseDateString(parts[0]);
  const end = parts[1] ? parseDateString(parts[1]) : start;
  return { start, end };
}

/**
 * Sort experiences in reverse chronological order:
 * - End date first (Present = Infinity, so it comes first)
 * - If end dates are equal, sort by start date descending
 */
function sortExperiencesByDate(experiences) {
  return [...experiences].sort((a, b) => {
    const aDates = parseDuration(a.duration);
    const bDates = parseDuration(b.duration);
    // Sort by end date descending first
    if (bDates.end !== aDates.end) {
      return bDates.end - aDates.end;
    }
    // If end dates are equal, sort by start date descending
    return bDates.start - aDates.start;
  });
}

export default function Experience() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };

  // Sort experiences in reverse chronological order (memoized for performance)
  const sortedExperiences = useMemo(() => sortExperiencesByDate(EXPERIENCE), []);

  return (
    <section id="experience" aria-labelledby="xp-heading" className="py-12 sm:py-20">
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 id="xp-heading" className="section-heading mb-6 sm:mb-10">Experience</h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary-magenta via-primary-cyan to-transparent" aria-hidden="true" />

          <div className="space-y-6 sm:space-y-8">
            {sortedExperiences.map((exp, idx) => (
              <article
                key={idx}
                className={`relative flex items-start gap-4 sm:gap-6 ${idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-2 h-2 sm:w-3 sm:h-3 -translate-x-1/2 rounded-full bg-primary-cyan shadow-glow z-10" />

                {/* Content card */}
                <div className={`ml-10 sm:ml-12 md:ml-0 md:w-1/2 ${idx % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                  <div className="glass-card rounded-lg sm:rounded-xl p-4 sm:p-6">
                    <div className="flex items-start justify-between gap-3 sm:gap-4 mb-2 sm:mb-3">
                      <div>
                        <h3 className="font-heading text-sm sm:text-lg font-semibold text-white">{exp.role}</h3>
                        <p className="text-primary-cyan text-xs sm:text-sm">{exp.company}</p>
                      </div>
                    </div>
                    <p className="text-[10px] sm:text-xs text-gray-500 mb-2 sm:mb-3">{exp.duration}</p>
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{exp.description}</p>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}

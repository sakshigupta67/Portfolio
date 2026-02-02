"use client";

import { useEffect, useRef } from "react";

/**
 * Lightweight section reveal hook using Intersection Observer.
 * Adds a soft fade-up animation when sections enter the viewport.
 * Runs once per section, GPU-friendly, no layout shifts.
 */
export default function useSectionReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      // Skip animation, show immediately
      el.classList.add("revealed");
      return;
    }

    // Add initial hidden state
    el.classList.add("section-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Use requestAnimationFrame for smooth timing
            requestAnimationFrame(() => {
              entry.target.classList.add("revealed");
            });
            // Stop observing after reveal (runs once)
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px",
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, []);

  return ref;
}

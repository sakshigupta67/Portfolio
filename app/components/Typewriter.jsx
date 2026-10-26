"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * RotatingTypewriter — types, pauses, deletes, and loops through phrases.
 *
 * @param {string[]} phrases      - Array of strings to rotate through.
 * @param {number}   typeSpeed    - Ms per character when typing   (default 55).
 * @param {number}   deleteSpeed  - Ms per character when deleting (default 35).
 * @param {number}   pauseTime    - Ms to hold the full phrase     (default 1500).
 * @param {string}   className    - Classes applied to the visible text.
 * @param {string}   cursorClass  - Extra classes for the cursor.
 */
export default function RotatingTypewriter({
  phrases = [],
  typeSpeed = 55,
  deleteSpeed = 35,
  pauseTime = 1500,
  className = "",
  cursorClass = "",
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timerRef = useRef(null);

  const currentPhrase = phrases[phraseIndex] || "";

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updateReducedMotion = () => setReducedMotion(mediaQuery.matches);
    updateReducedMotion();
    mediaQuery.addEventListener("change", updateReducedMotion);
    return () => mediaQuery.removeEventListener("change", updateReducedMotion);
  }, []);

  const tick = useCallback(() => {
    if (!isDeleting) {
      // Typing forward
      if (displayed.length < currentPhrase.length) {
        setDisplayed(currentPhrase.slice(0, displayed.length + 1));
      } else {
        // Fully typed — pause, then start deleting
        timerRef.current = setTimeout(() => setIsDeleting(true), pauseTime);
        return;
      }
    } else {
      // Deleting backward
      if (displayed.length > 0) {
        setDisplayed(currentPhrase.slice(0, displayed.length - 1));
      } else {
        // Fully deleted — move to next phrase
        setIsDeleting(false);
        setPhraseIndex((i) => (i + 1) % phrases.length);
      }
    }
  }, [displayed, isDeleting, currentPhrase, pauseTime, phrases.length]);

  useEffect(() => {
    if (reducedMotion || phrases.length === 0) {
      clearTimeout(timerRef.current);
      setDisplayed(phrases[0] || "");
      setPhraseIndex(0);
      setIsDeleting(false);
      return undefined;
    }

    const speed = isDeleting ? deleteSpeed : typeSpeed;
    timerRef.current = setTimeout(tick, speed);
    return () => clearTimeout(timerRef.current);
  }, [tick, isDeleting, deleteSpeed, typeSpeed, reducedMotion, phrases]);

  return (
    <span
      aria-label={phrases.join(", ")}
      aria-live={reducedMotion ? "polite" : "off"}
    >
      <span className={className}>{displayed || (reducedMotion ? phrases[0] : "")}</span>
      <span
        className={`typewriter-cursor ${cursorClass}`}
        aria-hidden="true"
      />
    </span>
  );
}

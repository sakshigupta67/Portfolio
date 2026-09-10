"use client";

import { useEffect, useRef, useState } from "react";

const TRAIL_LENGTH = 6;
const INTERACTIVE_SELECTOR =
  "a, button, [role=\"button\"], input, textarea, select, summary, [data-cursor=\"interactive\"]";

function getInteractiveTarget(target) {
  if (!(target instanceof Element)) return null;
  return target.closest(INTERACTIVE_SELECTOR);
}

function getCursorVariant(target) {
  const interactive = getInteractiveTarget(target);
  if (!interactive) return "default";
  if (interactive.matches(".experience-card, [data-cursor=\"card\"]")) return "card";
  if (interactive.matches("a[href^=\"http\"]")) return "external";
  return "interactive";
}

export default function CustomCursor() {
  const [canUseCursor, setCanUseCursor] = useState(false);
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const glowRef = useRef(null);
  const trailRefs = useRef([]);
  const frameRef = useRef(null);
  const hideTimeoutRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
  const trailPositionRef = useRef([]);
  const visibleRef = useRef(false);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const updateSupport = () => setCanUseCursor(mediaQuery.matches);
    updateSupport();
    mediaQuery.addEventListener("change", updateSupport);
    return () => mediaQuery.removeEventListener("change", updateSupport);
  }, []);

  useEffect(() => {
    if (!canUseCursor) return undefined;

    const root = rootRef.current;
    const dot = dotRef.current;
    const ring = ringRef.current;
    const glow = glowRef.current;
    const trail = trailRefs.current;
    const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

    reducedMotionRef.current = reducedMotionQuery.matches;
    const updateReducedMotion = () => {
      reducedMotionRef.current = reducedMotionQuery.matches;
    };
    reducedMotionQuery.addEventListener("change", updateReducedMotion);

    document.documentElement.classList.add("custom-cursor-active");

    const setPosition = (element, x, y) => {
      if (element) element.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
    };

    const animate = () => {
      if (!visibleRef.current) {
        frameRef.current = null;
        return;
      }

      const pointer = pointerRef.current;
      const ringPosition = ringPositionRef.current;
      const easing = reducedMotionRef.current ? 1 : 0.18;
      ringPosition.x += (pointer.x - ringPosition.x) * easing;
      ringPosition.y += (pointer.y - ringPosition.y) * easing;
      setPosition(ring, ringPosition.x, ringPosition.y);
      setPosition(glow, ringPosition.x, ringPosition.y);

      if (!reducedMotionRef.current) {
        trailPositionRef.current = trailPositionRef.current.map((position, index) => {
          const target = index === 0 ? ringPosition : trailPositionRef.current[index - 1];
          const trailEasing = 0.22 - index * 0.018;
          const next = {
            x: position.x + (target.x - position.x) * trailEasing,
            y: position.y + (target.y - position.y) * trailEasing,
          };
          setPosition(trail[index], next.x, next.y);
          return next;
        });
      }

      frameRef.current = requestAnimationFrame(animate);
    };

    const showAtPointer = (event) => {
      const { clientX: x, clientY: y } = event;
      pointerRef.current = { x, y };

      if (!visibleRef.current) {
        visibleRef.current = true;
        ringPositionRef.current = { x, y };
        trailPositionRef.current = Array.from({ length: TRAIL_LENGTH }, () => ({ x, y }));
        root.classList.add("custom-cursor--visible");
      }

      setPosition(dot, x, y);
      if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
    };

    const updateVariant = (event) => {
      root.dataset.variant = getCursorVariant(event.target);
    };

    const hideCursor = () => {
      visibleRef.current = false;
      root.classList.remove("custom-cursor--visible");
      root.dataset.variant = "default";
    };

    const hideOnViewportExit = (event) => {
      if (!event.relatedTarget) hideCursor();
    };

    const pulseOnClick = () => {
      root.classList.remove("custom-cursor--click");
      window.requestAnimationFrame(() => root.classList.add("custom-cursor--click"));
      window.clearTimeout(clickTimeoutRef.current);
      clickTimeoutRef.current = window.setTimeout(() => {
        root.classList.remove("custom-cursor--click");
      }, 220);
    };

    window.addEventListener("pointermove", showAtPointer, { passive: true });
    window.addEventListener("pointerover", updateVariant, { passive: true });
    window.addEventListener("pointerout", hideOnViewportExit, { passive: true });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("pointerdown", pulseOnClick, { passive: true });

    return () => {
      window.removeEventListener("pointermove", showAtPointer);
      window.removeEventListener("pointerover", updateVariant);
      window.removeEventListener("pointerout", hideOnViewportExit);
      window.removeEventListener("pointerleave", hideCursor);
      window.removeEventListener("pointerdown", pulseOnClick);
      reducedMotionQuery.removeEventListener("change", updateReducedMotion);
      window.cancelAnimationFrame(frameRef.current);
      window.clearTimeout(clickTimeoutRef.current);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, [canUseCursor]);

  if (!canUseCursor) return null;

  return (
    <div ref={rootRef} className="custom-cursor" data-variant="default" aria-hidden="true">
      <span ref={glowRef} className="custom-cursor__glow" />
      {Array.from({ length: TRAIL_LENGTH }, (_, index) => (
        <span
          key={index}
          ref={(element) => {
            trailRefs.current[index] = element;
          }}
          className="custom-cursor__trail"
          style={{ "--trail-index": index }}
        />
      ))}
      <span ref={ringRef} className="custom-cursor__ring" />
      <span ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}

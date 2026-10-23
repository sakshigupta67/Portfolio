"use client";

import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  "a, button, [role=\"button\"], summary, [data-cursor=\"interactive\"]";
const TEXT_EDITING_SELECTOR =
  "input:not([type=\"button\"]):not([type=\"submit\"]):not([type=\"reset\"]):not([type=\"checkbox\"]):not([type=\"radio\"]):not([type=\"range\"]):not([disabled]), textarea:not([disabled]), [contenteditable=\"true\"]";

function getInteractiveTarget(target) {
  if (!(target instanceof Element)) return null;
  const element = target.closest(
    `${INTERACTIVE_SELECTOR}, ${TEXT_EDITING_SELECTOR}, select`
  );
  if (!element || element.hasAttribute("disabled") || element.getAttribute("aria-disabled") === "true") {
    return null;
  }
  return element;
}

function getCursorVariant(target) {
  const interactive = getInteractiveTarget(target);
  if (!interactive) return "default";
  if (interactive.matches(TEXT_EDITING_SELECTOR)) return "text";
  if (interactive.matches("a[href^=\"http\"]")) return "external";
  return "interactive";
}

export default function CustomCursor() {
  const [canUseCursor, setCanUseCursor] = useState(false);
  const rootRef = useRef(null);
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const frameRef = useRef(null);
  const clickTimeoutRef = useRef(null);
  const pointerRef = useRef({ x: 0, y: 0 });
  const ringPositionRef = useRef({ x: 0, y: 0 });
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

      frameRef.current = requestAnimationFrame(animate);
    };

    const showAtPointer = (event) => {
      const { clientX: x, clientY: y } = event;
      pointerRef.current = { x, y };

      if (!visibleRef.current) {
        visibleRef.current = true;
        ringPositionRef.current = { x, y };
        root.classList.add("custom-cursor--visible");
      }

      setPosition(dot, x, y);
      root.dataset.variant = getCursorVariant(event.target);
      if (!frameRef.current) frameRef.current = requestAnimationFrame(animate);
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
    window.addEventListener("pointerout", hideOnViewportExit, { passive: true });
    window.addEventListener("pointerleave", hideCursor);
    window.addEventListener("pointerdown", pulseOnClick, { passive: true });

    return () => {
      window.removeEventListener("pointermove", showAtPointer);
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
      <span ref={ringRef} className="custom-cursor__ring" />
      <span ref={dotRef} className="custom-cursor__dot" />
    </div>
  );
}

"use client";

import React, { useEffect, useRef, useState } from "react";
import { registerAnimatedBorder, unregisterAnimatedBorder } from "./animatedBorderManager";

// AnimatedBorder: wraps content with a thin rotating conic-gradient border
// Appears only when the wrapper is in-view; hides when out of view.
export default function AnimatedBorder({
  as = "div",
  className = "",
  rounded = "rounded-2xl",
  children,
  threshold = 0.5,
  rootMargin = "-15% 0px -15% 0px",
}) {
  const ref = useRef(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const cb = (v) => setOn(Boolean(v));
    registerAnimatedBorder(el, cb);
    return () => unregisterAnimatedBorder(el);
    // note: threshold/rootMargin handled by manager globally
  }, [threshold, rootMargin]);

  const As = as;
  return (
    <As ref={ref} className={`relative overflow-hidden ${rounded} ${className}`}>
      {on && (
        <span
          aria-hidden="true"
          className="orbit-border animate-orbit"
          style={{
            background:
              "conic-gradient(from 180deg, rgba(220,0,211,0.7), rgba(12,255,255,0.5), rgba(220,0,211,0.4), rgba(12,255,255,0.7))",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask:
              "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            maskComposite: "exclude",
            WebkitMaskComposite: "xor",
            padding: "2px",
            boxSizing: "border-box",
            opacity: 0.95,
            filter: "blur(.15px)",
          }}
        />
      )}
      <div className="relative">{children}</div>
    </As>
  );
}

"use client";

import { useEffect, useRef } from "react";

/**
 * Subtle falling particle background animation.
 * Configurable, performant, and responsive.
 */

// ─────────────────────────────────────────────────────────────
// CONFIGURATION — tweak these values to adjust the effect
// ─────────────────────────────────────────────────────────────
const CONFIG = {
  // Particle count (desktop / mobile)
  particleCountDesktop: 50,
  particleCountMobile: 20,
  
  // Particle appearance
  minSize: 1,
  maxSize: 2.5,
  color: "rgba(12, 255, 255, 0.15)", // soft cyan, very transparent
  
  // Motion
  minSpeed: 0.2,
  maxSpeed: 0.6,
  
  // Horizontal drift range (-drift to +drift)
  drift: 0.3,
  
  // Mobile breakpoint
  mobileBreakpoint: 768,
};

export default function ParticleBackground() {
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;

    // Resize canvas to fill viewport
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      initParticles();
    };

    // Initialize particles
    const initParticles = () => {
      const isMobile = width < CONFIG.mobileBreakpoint;
      const count = isMobile ? CONFIG.particleCountMobile : CONFIG.particleCountDesktop;
      
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: CONFIG.minSize + Math.random() * (CONFIG.maxSize - CONFIG.minSize),
        speed: CONFIG.minSpeed + Math.random() * (CONFIG.maxSpeed - CONFIG.minSpeed),
        drift: (Math.random() - 0.5) * CONFIG.drift * 2,
        opacity: 0.1 + Math.random() * 0.2, // vary opacity slightly
      }));
    };

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      particlesRef.current.forEach((p) => {
        // Update position
        p.y += p.speed;
        p.x += p.drift;

        // Wrap around when particle goes off screen
        if (p.y > height + p.size) {
          p.y = -p.size;
          p.x = Math.random() * width;
        }
        if (p.x > width + p.size) p.x = -p.size;
        if (p.x < -p.size) p.x = width + p.size;

        // Draw particle
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = CONFIG.color.replace("0.15", p.opacity.toFixed(2));
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    // Initialize
    resize();
    animate();

    // Handle resize
    window.addEventListener("resize", resize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", resize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      style={{ opacity: 0.8 }}
    />
  );
}

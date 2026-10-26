"use client";

import React, { useEffect, useRef } from "react";
import { COLLEGE, DEGREE_SHORT, GRAD_EXPECTED, SOCIALS } from "../data/profile";
import SocialIcon from "../components/SocialIcon";
import Typewriter from "../components/Typewriter";

const ROTATING_PHRASES = [
  "Full-Stack Developer.",
  "Software Engineer.",
  "Cloud-Curious Builder.",
  "Problem Solver.",
];

export default function Hero() {
  const containerRef = useRef(null);

  // Fade-up on mount using Tailwind classes
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    el.classList.remove("opacity-0", "translate-y-2");
    el.classList.add("opacity-100", "translate-y-0");
  }, []);

  const handleSmoothScroll = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section id="home" className="hero-section relative overflow-hidden pb-12 pt-16 sm:pb-20 sm:pt-24">
      {/* Background gradient effects - uniform center-out fade */}
      <div 
        className="absolute inset-0 overflow-hidden pointer-events-none"
        style={{
          maskImage: "radial-gradient(circle at 50% 50%, black 15%, transparent 85%)",
          WebkitMaskImage: "radial-gradient(circle at 50% 50%, black 15%, transparent 85%)",
        }}
      >
        <div className="absolute -left-20 top-10 w-[500px] h-[500px] bg-primary-magenta/15 rounded-full blur-[120px]" />
        <div className="absolute -right-20 top-20 w-[400px] h-[400px] bg-primary-cyan/10 rounded-full blur-[100px]" />
      </div>

      <div className="mx-auto max-w-6xl px-4 relative z-10">
        <div className="grid items-center gap-14 md:grid-cols-[minmax(0,1.05fr)_minmax(300px,0.95fr)] md:gap-10 lg:gap-16">
          {/* Left: Text block */}
          <div
            ref={containerRef}
            className="hero-copy opacity-0 translate-y-2 transition-all duration-700 ease-out"
          >
            <p className="hero-eyebrow">
              Software engineer <span aria-hidden="true">·</span> full-stack builder
            </p>
            <div className="mt-4 sm:mt-5">
              <h1 className="font-heading text-4xl font-bold leading-[0.98] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
                Hi, I&apos;m Sakshi
              </h1>
              <p className="hero-positioning mt-5 max-w-xl text-base leading-relaxed text-gray-300 sm:mt-6 sm:text-xl">
                Building thoughtful products from interface to infrastructure.
              </p>
              <h2 className="hero-role mt-5 font-heading text-lg font-semibold sm:mt-6 sm:text-2xl">
                <span className="hero-typewriter-slot">
                <Typewriter
                  phrases={ROTATING_PHRASES}
                  typeSpeed={55}
                  deleteSpeed={35}
                  pauseTime={1900}
                  className="text-gradient"
                />
                </span>
              </h2>
            </div>

            {/* College and degree details (with icon) */}
            <div className="mt-7 border-l border-primary-cyan/30 pl-4 sm:mt-9">
              <div className="flex items-start gap-2 sm:gap-3">
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="mt-0.5 h-4 w-4 flex-shrink-0 text-primary-cyan sm:h-5 sm:w-5"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="currentColor" d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13L5 13.15V17l7 4 7-4v-3.85L12 16Z" />
                </svg>
                <div>
                  <p className="text-sm font-medium leading-tight text-white sm:text-base">
                    {COLLEGE}
                  </p>
                  <p className="mt-1 text-xs text-gray-400 sm:text-sm">{DEGREE_SHORT} · {GRAD_EXPECTED}</p>
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap items-center gap-3 sm:mt-8">
              <a
                href="#projects"
                onClick={(e) => handleSmoothScroll(e, "projects")}
                className="hero-primary-action inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-primary-magenta to-primary-cyan px-4 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_rgba(220,0,211,0.18)] transition-all duration-200 ease-out hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(12,255,255,0.2)] focus:outline-none focus:ring-2 focus:ring-primary-cyan/60 focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
                View Projects
                <span aria-hidden="true">↗</span>
              </a>
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-primary-cyan/35 bg-primary-dark/40 px-4 py-2.5 text-sm font-semibold text-white transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary-cyan/70 hover:bg-primary-cyan/10 focus:outline-none focus:ring-2 focus:ring-primary-cyan/50 focus:ring-offset-2 focus:ring-offset-primary-dark"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-primary-cyan"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                Contact Me
              </a>
              <a
                href="https://drive.google.com/file/d/1e0zA-IQEc5BWD8YE6FPKbXBl4HymksoT/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center gap-2 rounded-lg px-2.5 py-2.5 text-sm font-medium text-gray-300 transition-colors hover:text-white focus:outline-none focus:ring-2 focus:ring-primary-cyan/50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4 text-primary-cyan"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5 5m0 0l5-5m-5 5V3"
                  />
                </svg>
                Resume
              </a>
            </div>

            {/* Social Icons */}
            <div className="mt-4 sm:mt-6 flex items-center gap-2 sm:gap-3">
              <SocialIcon type="github" href={SOCIALS.github} label="GitHub" />
              <SocialIcon type="linkedin" href={SOCIALS.linkedin} label="LinkedIn" />
            </div>
          </div>

          {/* Right: Profile image with gradient border */}
          <div className="hero-visual flex justify-center md:justify-end">
            <div className="relative">
              {/* Decorative orbit ring */}
              <div className="hero-orbit absolute -inset-[20px] sm:-inset-[38px] lg:-inset-[52px]">
                <div className="w-full h-full border border-primary-cyan/20 rounded-full" />
              </div>
              
              <div className="hero-portrait relative h-[220px] w-[220px] sm:h-[304px] sm:w-[304px] lg:h-[365px] lg:w-[365px]">
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-[1.5rem] bg-gradient-to-br from-primary-magenta via-purple-600 to-primary-cyan p-[2px] shadow-[0_18px_60px_rgba(12,255,255,0.12)]">
                  <div className="h-full w-full rounded-[1.4rem] bg-primary-dark" />
                </div>
                <img
                  src={"/profile-pic.png"}
                  alt="Profile image"
                  className="absolute inset-[2px] h-[calc(100%-4px)] w-[calc(100%-4px)] rounded-[1.4rem] object-cover"
                />
              </div>
              <span className="hero-visual-label absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap text-[0.65rem] font-semibold uppercase tracking-[0.24em] text-gray-500">
                build · learn · ship
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

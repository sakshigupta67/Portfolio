"use client";

import React, { useEffect, useRef } from "react";
import { COLLEGE, DEGREE_SHORT, GRAD_EXPECTED, SOCIALS } from "../data/profile";
import SocialIcon from "../components/SocialIcon";

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
    <section id="home" className="relative pt-16 pb-10 sm:pt-24 sm:pb-16 overflow-hidden">
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
        <div className="grid items-center gap-10 md:grid-cols-2">
          {/* Left: Text block */}
          <div
            ref={containerRef}
            className="opacity-0 translate-y-2 transition-all duration-700 ease-out"
          >
            <h1 className="font-heading text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
              Hi, I'm Sakshi
            </h1>
            <h2 className="mt-2 sm:mt-3 font-heading text-lg sm:text-2xl font-semibold">
              <span className="text-gradient inline-block transition-transform duration-200 ease-out hover:-translate-y-0.5 hover:scale-[1.02] cursor-default">MERN Stack Developer.</span>
            </h2>

            {/* College and degree details (with icon) */}
            <div className="mt-4 sm:mt-6">
              <div className="flex items-start gap-2 sm:gap-3">
                {/* Cyan college icon */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-4 w-4 sm:h-6 sm:w-6 text-primary-cyan flex-shrink-0"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path fill="currentColor" d="M12 3 1 9l11 6 9-4.91V17h2V9L12 3Zm0 13L5 13.15V17l7 4 7-4v-3.85L12 16Z" />
                </svg>
                <div>
                  <p className="text-sm sm:text-lg text-white font-medium leading-tight">
                    {COLLEGE}
                  </p>
                  <p className="text-xs sm:text-sm text-gray-400">{DEGREE_SHORT} (Expected {GRAD_EXPECTED.replace("Expected ", "")})</p>
                </div>
              </div>
            </div>

            {/* Buttons - card style matching Specialisation cards */}
            <div className="mt-5 sm:mt-8 flex items-center gap-2 sm:gap-4">
              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, "contact")}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-lg glass-card border border-primary-cyan/20 text-xs sm:text-sm font-semibold text-white transition-all duration-200 ease-out hover:border-primary-cyan/50 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-cyan/40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-cyan"
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
                Contact
              </a>
              <a
                href="https://drive.google.com/file/d/1e0zA-IQEc5BWD8YE6FPKbXBl4HymksoT/view?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 py-2 sm:px-5 sm:py-3 rounded-lg glass-card border border-primary-cyan/20 text-xs sm:text-sm font-semibold text-white transition-all duration-200 ease-out hover:border-primary-cyan/50 hover:-translate-y-0.5 hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-primary-cyan/40"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-primary-cyan"
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
          <div className="flex justify-center md:justify-center">
            <div className="relative">
              {/* Decorative orbit ring */}
              <div className="absolute -inset-[30px] sm:-inset-[46px] lg:-inset-[61px]">
                <div className="w-full h-full border border-primary-cyan/20 rounded-full" />
              </div>
              
              <div className="relative h-[182px] w-[182px] sm:h-[304px] sm:w-[304px] lg:h-[365px] lg:w-[365px]">
                {/* Gradient border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-magenta via-purple-600 to-primary-cyan p-[2px]">
                  <div className="w-full h-full rounded-2xl bg-primary-dark" />
                </div>
                <img
                  src={"/profile-pic.png"}
                  alt="Profile image"
                  className="absolute inset-[2px] rounded-2xl object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

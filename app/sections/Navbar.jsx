"use client";

import { SECTIONS } from "../data/profile";

export default function Navbar({ active }) {
  return (
    <nav aria-label="Primary" className="sticky top-0 z-40 bg-primary-dark/80 backdrop-blur-lg border-b border-primary-cyan/10">
      <div className="mx-auto max-w-6xl px-3 sm:px-4">
        <div className="flex h-12 sm:h-16 items-center justify-between">
          {/* Left: nav links */}
          <ul className="flex items-center gap-4 sm:gap-8">
            {SECTIONS.filter((s) => ["home", "about"].includes(s.id)).map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  aria-current={active === s.id ? "page" : undefined}
                  className={`font-heading text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary-cyan ${
                    active === s.id ? "text-white" : "text-gray-400 hover:text-white"
                  }`}
                >
                  {s.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Center: divider with gradient */}
          <div className="hidden md:block w-32 h-1 rounded-full bg-gradient-to-r from-primary-magenta to-primary-cyan" />

          {/* Right: nav links + social icons */}
          <div className="flex items-center gap-4 sm:gap-8">
            <ul className="flex items-center gap-4 sm:gap-8">
              {SECTIONS.filter((s) => ["projects", "contact"].includes(s.id)).map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    aria-current={active === s.id ? "page" : undefined}
                    className={`font-heading text-xs sm:text-sm font-medium uppercase tracking-wider transition-colors px-1 py-1 outline-none focus-visible:ring-2 focus-visible:ring-primary-cyan ${
                      active === s.id ? "text-white" : "text-gray-400 hover:text-white"
                    }`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
}

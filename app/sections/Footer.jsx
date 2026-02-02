"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { YOUR_EMAIL, YOUR_NAME, SOCIALS, SECTIONS } from "../data/profile";
import { IconGithub, IconLinkedin, IconMail } from "../components/Icons";

export default function Footer() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.5, ease: "easeOut" };
  
  return (
    <motion.footer
      aria-label="Footer"
      variants={fadeIn("up")}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.2 }}
      transition={transition}
      className="relative mt-10 border-t border-primary-cyan/10"
    >
      {/* Gradient line at top */}
      <div aria-hidden className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary-cyan/50 to-transparent" />

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
          {/* Left: name and blurb */}
          <div>
            <p className="font-heading font-bold text-lg sm:text-xl text-white">{YOUR_NAME}</p>
            <p className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-400 max-w-sm">
              Full-stack developer passionate about creating innovative solutions and beautiful user experiences.
            </p>

            <p className="mt-4 sm:mt-6 font-medium text-sm sm:text-base text-white">Let's Connect</p>
            <div className="mt-2 sm:mt-3 flex items-center gap-2 sm:gap-3">
              <a 
                href={SOCIALS.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-dark border border-primary-cyan/20 flex items-center justify-center text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
                aria-label="GitHub"
              >
                <IconGithub className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a 
                href={SOCIALS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-dark border border-primary-cyan/20 flex items-center justify-center text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
                aria-label="LinkedIn"
              >
                <IconLinkedin className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
              <a 
                href={`mailto:${YOUR_EMAIL}`}
                className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-primary-dark border border-primary-cyan/20 flex items-center justify-center text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
                aria-label="Email"
              >
                <IconMail className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </a>
            </div>
          </div>

          {/* Middle: quick links */}
          <nav aria-label="Footer navigation" className="text-xs sm:text-sm">
            <p className="font-medium text-sm sm:text-base text-white">Quick Links</p>
            <ul className="mt-3 sm:mt-4 space-y-2 sm:space-y-3 text-gray-400">
              {SECTIONS.filter(s => ["home","about","projects","contact"].includes(s.id)).map((s) => (
                <li key={`f-${s.id}`}>
                  <a 
                    className="hover:text-primary-cyan transition-colors focus:outline-none focus:ring-2 focus:ring-primary-cyan/50 rounded px-1" 
                    href={`#${s.id}`}
                  >
                    {s.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Right: contact details */}
          <div>
            <p className="font-medium text-white">Get In Touch</p>
            <div className="mt-4 space-y-3 text-sm text-gray-400">
              <a className="flex items-center gap-2 hover:text-primary-cyan transition-colors" href={`mailto:${YOUR_EMAIL}`}>
                <IconMail className="w-4 h-4" />
                {YOUR_EMAIL}
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-primary-cyan/10">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-500">
            <p>© {new Date().getFullYear()} {YOUR_NAME}. All rights reserved.</p>
            <div className="flex items-center gap-4">
              <a 
                href={SOCIALS.github} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-cyan transition-colors"
                aria-label="GitHub"
              >
                <IconGithub className="w-4 h-4" />
              </a>
              <a 
                href={SOCIALS.linkedin} 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary-cyan transition-colors"
                aria-label="LinkedIn"
              >
                <IconLinkedin className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}

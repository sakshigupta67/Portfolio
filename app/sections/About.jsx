"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { TAGLINE } from "../data/profile";

export default function About() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };
  
  return (
    <section id="about" aria-label="About" className="py-12 sm:py-20 relative">
      {/* Decorative elements */}
      <div className="absolute left-1/2 top-0 -translate-x-1/2 w-px h-20 bg-gradient-to-b from-transparent via-primary-cyan/50 to-transparent" />
      
      {/* Orbit decoration */}
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="w-64 h-64 border border-primary-cyan/10 rounded-full" />
        <div className="absolute inset-4 border border-primary-magenta/10 rounded-full" />
        <div className="absolute inset-8 border border-primary-cyan/5 rounded-full" />
      </div>

      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
        className="relative z-10"
      >
        <div className="mx-auto max-w-6xl px-4">
          <h2 className="section-heading mb-5 sm:mb-8">About</h2>

          <div className="max-w-[67rem] mx-auto">
            <div className="glass-card rounded-2xl p-5 sm:p-8">
              <div className="text-left">
                {TAGLINE.split(/\n\s*\n/).map((para, i) => (
                  <p key={i} className="text-sm sm:text-base text-gray-300 leading-relaxed">
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

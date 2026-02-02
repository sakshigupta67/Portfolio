"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import Specialisations from "./Specialisations";
import { CERTIFICATES } from "../data/profile";

export default function Certificates() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };

  return (
    <section id="certificates" aria-label="Certificates" className="py-12 sm:py-20">
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 className="section-heading mb-6 sm:mb-10">Certificates</h2>

        <div className="grid grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-6">
          {CERTIFICATES.map((c, i) => (
            <a 
              key={i} 
              href={c.url || '#'} 
              className="group block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="relative overflow-hidden rounded-lg sm:rounded-2xl glass-card border border-primary-cyan/10 hover:border-primary-cyan/30 transition-all duration-300 hover:shadow-glow">
                {/* Cover image */}
                <div className="relative h-20 sm:h-40 overflow-hidden">
                  {c.cover ? (
                    <img
                      src={c.cover}
                      alt={`${c.title} cover`}
                      className="w-full h-full object-cover transform-gpu transition-transform duration-500 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary-magenta/30 to-primary-cyan/30" />
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary-dark via-primary-dark/50 to-transparent" />
                  
                  {/* Logo */}
                  <div className="absolute top-1.5 right-1.5 sm:top-3 sm:right-3">
                    <div className="h-6 w-6 sm:h-10 sm:w-10 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                      {c.logo ? (
                        <img src={c.logo} alt="logo" className="h-4 w-4 sm:h-6 sm:w-6 object-contain" />
                      ) : (
                        <span className="text-sm font-semibold text-white">●</span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content */}
                <div className="p-2 sm:p-4">
                  <h3 className="font-heading text-xs sm:text-lg font-bold text-white line-clamp-2">{c.title}</h3>
                  <p className="text-primary-cyan text-[10px] sm:text-sm mt-0.5 sm:mt-1 line-clamp-1">{c.subtitle}</p>
                </div>
              </div>
            </a>
          ))}
        </div>
        
        {/* Render Specialisations below Certificates */}
        <div className="mt-10 sm:mt-16">
          <Specialisations />
        </div>
      </motion.div>
    </section>
  );
}

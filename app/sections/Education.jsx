"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { EDUCATION } from "../data/profile";

export default function Education() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };
  
  return (
    <section id="education" aria-label="Education" className="py-12 sm:py-20">
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 className="section-heading mb-6 sm:mb-10">Education</h2>
        
        <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
          {EDUCATION.map((e, idx) => (
            <div 
              key={idx} 
              className="glass-card rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-primary-cyan/10 hover:border-primary-cyan/30 transition-colors"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                {/* Icon */}
                <div className="flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-gradient-to-br from-primary-magenta/20 to-primary-cyan/20 flex items-center justify-center">
                  <svg className="w-5 h-5 sm:w-6 sm:h-6 text-primary-cyan" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zm0 13L5 13.15V17l7 4 7-4v-3.85L12 16z"/>
                  </svg>
                </div>
                
                <div className="flex-1">
                  <h3 className="font-heading text-sm sm:text-lg font-semibold text-white">{e.institute}</h3>
                  <p className="text-primary-cyan text-xs sm:text-sm mt-0.5 sm:mt-1">{e.degree}</p>
                  <div className="mt-2 sm:mt-3 flex items-center justify-between text-[10px] sm:text-xs text-gray-400">
                    <span>{e.dates}</span>
                    <span className="text-primary-magenta font-medium">{e.grade}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

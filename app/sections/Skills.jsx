"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { SKILLS } from "../data/profile";

export default function Skills() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };
  
  return (
    <section id="skills" aria-label="Skills" className="py-12 sm:py-20">
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 className="section-heading mb-6 sm:mb-10">Skills</h2>
        
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
          {SKILLS.map((skill) => (
            <div
              key={skill}
              className="select-none rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-primary-dark border border-primary-cyan/20 shadow-sm transition-[transform,border-color] duration-200 ease-out hover:border-primary-cyan/60 hover:-translate-y-0.5 hover:scale-[1.03]"
            >
              <span>{skill}</span>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

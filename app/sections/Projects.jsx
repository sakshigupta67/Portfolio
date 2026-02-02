"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { PROJECTS } from "../data/profile";
import { IconGithub, IconExternalLink } from "../components/Icons";

export default function Projects() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };
  
  return (
    <section id="projects" aria-label="Projects" className="py-12 sm:py-20 relative">
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        transition={transition}
      >
        <h2 className="section-heading mb-3 sm:mb-4">Recent Work</h2>
        <p className="text-center text-gray-400 text-sm sm:text-base mb-8 sm:mb-12">A collection of projects I've worked on.</p>
        
        <div className="space-y-12 sm:space-y-20">
          {PROJECTS.map((p, idx) => {
            const isEven = idx % 2 === 0;
            
            return (
              <article 
                key={idx} 
                className={`relative grid md:grid-cols-12 gap-6 items-start ${isEven ? '' : 'md:text-right'}`}
              >
                {/* Project Image with Title & Tags below */}
                <div className={`md:col-span-7 ${isEven ? 'md:order-1' : 'md:order-2'}`}>
                  <div className="relative group overflow-hidden rounded-lg">
                    {p.image ? (
                      <img
                        src={p.image}
                        alt={`${p.title} screenshot`}
                        className="w-full h-44 sm:h-64 object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <div className="w-full h-44 sm:h-64 bg-gradient-to-br from-primary-magenta/30 to-primary-cyan/30" />
                    )}
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-primary-dark/60 transition-colors duration-300 group-hover:bg-primary-dark/80" />
                  </div>
                  
                  {/* Project Title below image */}
                  <h3 className={`font-heading text-lg sm:text-2xl font-bold text-white mt-3 sm:mt-4 ${isEven ? '' : 'md:text-right'}`}>{p.title}</h3>
                  
                  {/* Tech tags below title */}
                  <div className={`flex flex-wrap gap-1.5 sm:gap-2 mt-2 sm:mt-3 ${isEven ? '' : 'md:justify-end'}`}>
                    {p.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] sm:text-xs px-2 py-0.5 sm:px-3 sm:py-1 rounded-full bg-primary-dark/80 text-primary-cyan border border-primary-cyan/20"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                
                {/* Project Description */}
                <div className={`md:col-span-5 ${isEven ? 'md:order-2 md:-ml-16' : 'md:order-1 md:-mr-16'} relative z-10 mt-3 sm:mt-4 md:mt-12`}>
                  <div className="glass-card rounded-lg p-4 sm:p-6 mb-3 sm:mb-4">
                    <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">{p.description}</p>
                  </div>
                  
                  {/* Links below description */}
                  <div className={`flex items-center gap-3 sm:gap-5 ${isEven ? 'md:ml-16' : 'md:mr-16 md:justify-end'}`}>
                    {p.repo && (
                      <a
                        href={p.repo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View source code of ${p.title}`}
                        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-dark/80 border border-primary-cyan/30 text-gray-300 hover:text-primary-cyan hover:border-primary-cyan transition-all duration-300"
                      >
                        <IconGithub className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    )}
                    {p.demo && (
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`View live demo of ${p.title}`}
                        className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-dark/80 border border-primary-cyan/30 text-gray-300 hover:text-primary-cyan hover:border-primary-cyan transition-all duration-300"
                      >
                        <IconExternalLink className="h-4 w-4 sm:h-5 sm:w-5" />
                      </a>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
        
        {/* Explore All Projects Button */}
        <div className="flex justify-center mt-10 sm:mt-16">
          <a
            href="#"
            className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-primary-cyan/40 text-sm sm:text-base text-primary-cyan hover:bg-primary-cyan/10 transition-colors duration-300"
          >
            <span>Explore All Projects</span>
            <IconExternalLink className="h-3.5 w-3.5 sm:h-4 sm:w-4 transition-transform group-hover:translate-x-1" />
          </a>
        </div>
      </motion.div>
    </section>
  );
}

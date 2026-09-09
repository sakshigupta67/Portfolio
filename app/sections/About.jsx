"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";

const tags = [
  "Full-Stack Development",
  "MERN Stack",
  "AI & Intelligent Systems",
  "Azure & Cloud",
  "Open Source",
];

export default function About() {
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.7, ease: "easeOut" };

  return (
    <section id="about" aria-label="About" className="relative py-12 sm:py-20">
      <div className="absolute left-1/2 top-0 h-20 w-px -translate-x-1/2 bg-gradient-to-b from-transparent via-primary-cyan/50 to-transparent" />
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
        <div className="h-64 w-64 rounded-full border border-primary-cyan/10" />
        <div className="absolute inset-4 rounded-full border border-primary-magenta/10" />
        <div className="absolute inset-8 rounded-full border border-primary-cyan/5" />
      </div>

      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.25 }}
        transition={transition}
        className="relative z-10"
      >
        <div className="mx-auto max-w-6xl px-4">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-[0.68rem] font-medium uppercase tracking-[0.32em] text-primary-cyan/80 sm:text-xs">
              Who I Am
            </p>
            <h2 className="section-heading mt-3 mb-2">About</h2>
            <p className="mx-auto max-w-xl text-sm text-slate-300/85 sm:text-base">
              Software engineer in the making.
            </p>
          </div>

          <div className="grid items-center gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
            <div className="mx-auto w-full max-w-xl lg:mx-0">
              <div className="text-left">
                <p className="text-sm leading-relaxed text-slate-200 sm:text-[1.02rem]">
                  Final-year Computer Science &amp; Engineering student at NIT Manipur and a
                  Full-Stack Developer focused on building practical, scalable web applications
                  with the MERN stack. I&apos;m exploring AI, Azure, and intelligent systems to
                  create software that solves real-world problems beyond basic functionality.
                </p>
                <p className="mt-4 text-sm leading-relaxed text-slate-300 sm:text-[1.02rem]">
                  I enjoy turning ideas into reliable products, learning through hands-on
                  engineering, and working at the intersection of software, cloud, and AI.
                </p>
              </div>

              <div className="mt-6 flex flex-wrap gap-2.5">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="about-chip inline-flex items-center rounded-full border border-primary-cyan/30 bg-white/5 px-3 py-1.5 text-[0.67rem] font-medium tracking-[0.04em] text-slate-100 shadow-[0_0_20px_rgba(12,255,255,0.08)] backdrop-blur-sm transition-all duration-300 sm:text-[0.72rem]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[30rem]">
              <div className="about-terminal-glow absolute inset-x-12 top-8 h-52 rounded-full bg-gradient-to-r from-primary-cyan/20 via-primary-magenta/15 to-transparent blur-3xl" />

              <motion.div
                initial={reduceMotion ? {} : { opacity: 0, scale: 0.96, y: 18 }}
                whileInView={reduceMotion ? {} : { opacity: 1, scale: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={reduceMotion ? { duration: 0 } : { duration: 0.8, ease: "easeOut" }}
                className="relative overflow-hidden rounded-[1.6rem] border border-white/10 bg-[#120720]/80 p-4 shadow-[0_20px_60px_rgba(10,7,18,0.8)] backdrop-blur-xl sm:p-5"
              >
                <div className="mb-4 flex items-center justify-between border-b border-white/10 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#ffbd2e]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                  </div>
                  <span className="text-[0.56rem] uppercase tracking-[0.22em] text-slate-400">
                    developer
                  </span>
                </div>

                <div className="about-terminal-grid relative rounded-2xl border border-primary-cyan/15 bg-[#090612]/85 p-4 sm:p-5">
                  <div className="mb-3 flex items-center gap-2 text-[0.64rem] text-slate-400 sm:text-[0.7rem]">
                    <span className="text-primary-cyan">sakshi@portfolio</span>
                    <span className="text-slate-500">~</span>
                    <span className="ml-auto text-slate-500">$</span>
                  </div>

                  <div className="space-y-2 font-['JetBrains_Mono','monospace'] text-[0.7rem] leading-6 text-slate-200 sm:text-[0.78rem]">
                    <div className="flex items-center gap-2">
                      <span className="text-primary-cyan">const</span>
                      <span className="text-slate-100">focus</span>
                      <span className="text-slate-400">=</span>
                      <span className="text-[#f9b3ff]">[</span>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-slate-300">
                      <span className="text-[#f9b3ff]">&ldquo;</span>
                      <span className="text-primary-cyan">Full-Stack</span>
                      <span className="text-[#f9b3ff]">&rdquo;,</span>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-slate-300">
                      <span className="text-[#f9b3ff]">&ldquo;</span>
                      <span className="text-primary-cyan">AI</span>
                      <span className="text-[#f9b3ff]">&rdquo;,</span>
                    </div>
                    <div className="ml-4 flex items-center gap-2 text-slate-300">
                      <span className="text-[#f9b3ff]">&ldquo;</span>
                      <span className="text-primary-cyan">Cloud</span>
                      <span className="text-[#f9b3ff]">&rdquo;</span>
                    </div>
                    <div className="text-slate-300">];</div>

                    <div className="mt-4 flex items-center gap-2 text-slate-300">
                      <span className="text-primary-cyan">building</span>
                      <span className="text-slate-500">→</span>
                      <span className="text-primary-magenta">learning</span>
                      <span className="text-slate-500">→</span>
                      <span className="text-slate-100">shipping</span>
                    </div>
                  </div>

                  <span className="typewriter-cursor ml-1" aria-hidden="true" />
                </div>
              </motion.div>

              <div className="pointer-events-none absolute -left-2 top-8 about-float rounded-full border border-primary-cyan/30 bg-[#130c27]/90 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-primary-cyan shadow-[0_0_20px_rgba(12,255,255,0.15)] backdrop-blur-sm sm:-left-6 sm:px-3">
                MERN
              </div>
              <div className="pointer-events-none absolute -right-3 bottom-14 about-float rounded-full border border-primary-magenta/30 bg-[#130c27]/90 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-primary-magenta shadow-[0_0_20px_rgba(220,0,211,0.15)] backdrop-blur-sm sm:-right-5 sm:px-3" style={{ animationDelay: "0.8s" }}>
                AI
              </div>
              <div className="pointer-events-none absolute left-6 -bottom-3 about-float rounded-full border border-cyan-300/30 bg-[#130c27]/90 px-2.5 py-1 text-[0.58rem] font-medium uppercase tracking-[0.18em] text-slate-200 shadow-[0_0_20px_rgba(12,255,255,0.12)] backdrop-blur-sm sm:left-10 sm:px-3" style={{ animationDelay: "1.2s" }}>
                Azure
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

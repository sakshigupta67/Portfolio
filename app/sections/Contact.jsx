"use client";

import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { YOUR_EMAIL, SOCIALS } from "../data/profile";
import { IconMail, IconPhone, IconMapPin, IconGithub, IconLinkedin } from "../components/Icons";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const reduceMotion = useReducedMotion();
  const transition = reduceMotion ? { duration: 0 } : { duration: 0.6, ease: "easeOut" };

  const onSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio Contact from ${form.name || "Someone"}`);
    const body = encodeURIComponent(`${form.message}\n\nFrom: ${form.name} <${form.email}>`);
    window.location.href = `mailto:${YOUR_EMAIL}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" aria-label="Contact" className="py-12 sm:py-20">
      <motion.div
        variants={fadeIn("up")}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        transition={transition}
      >
        <h2 className="section-heading mb-8 sm:mb-12">Contact</h2>
        
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            {/* Left: Contact Info */}
            <div className="space-y-5 sm:space-y-8">
              <div>
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-primary-cyan mb-2 sm:mb-4">
                  Drop me a message
                </h3>
                <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
                  Have an idea or want to collaborate? Send a short message — I'll reply as soon as I can.
                </p>
              </div>

              <div className="space-y-3 sm:space-y-4">
                <a 
                  href={`tel:+917894567890`}
                  className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-300 hover:text-primary-cyan transition-colors"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-magenta/20 flex items-center justify-center">
                    <IconPhone className="w-4 h-4 sm:w-5 sm:h-5 text-primary-magenta" />
                  </div>
                  <span>+91 7894567890</span>
                </a>
                
                <a 
                  href={`mailto:${YOUR_EMAIL}`}
                  className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-300 hover:text-primary-cyan transition-colors"
                >
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-cyan/20 flex items-center justify-center">
                    <IconMail className="w-4 h-4 sm:w-5 sm:h-5 text-primary-cyan" />
                  </div>
                  <span className="text-xs sm:text-base break-all">{YOUR_EMAIL}</span>
                </a>
                
                <div className="flex items-center gap-3 sm:gap-4 text-sm sm:text-base text-gray-300">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-magenta/20 flex items-center justify-center">
                    <IconMapPin className="w-4 h-4 sm:w-5 sm:h-5 text-primary-magenta" />
                  </div>
                  <span>Bihar, India</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex items-center gap-3 sm:gap-4 pt-2 sm:pt-4">
                <a
                  href={SOCIALS.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-dark border border-primary-cyan/20 flex items-center justify-center text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
                >
                  <IconGithub className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a
                  href={SOCIALS.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                  className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-primary-dark border border-primary-cyan/20 flex items-center justify-center text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 transition-all"
                >
                  <IconLinkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Right: Contact Form */}
            <div className="glass-card rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-primary-cyan/10">
              <form onSubmit={onSubmit} className="space-y-4 sm:space-y-6">
                <div>
                  <label htmlFor="name" className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">Name</label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    required
                    value={form.name}
                    onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                    placeholder="Your name"
                    className="w-full bg-primary-dark/50 border border-primary-cyan/20 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">Email</label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="w-full bg-primary-dark/50 border border-primary-cyan/20 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/50 transition-colors"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-xs sm:text-sm text-gray-400 mb-1.5 sm:mb-2">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
                    placeholder="How can I help?"
                    className="w-full bg-primary-dark/50 border border-primary-cyan/20 rounded-lg px-3 py-2.5 sm:px-4 sm:py-3 text-sm sm:text-base text-white placeholder-gray-500 focus:outline-none focus:border-primary-cyan/50 focus:ring-1 focus:ring-primary-cyan/50 transition-colors resize-none"
                  />
                </div>
                
                <button
                  type="submit"
                  className="group inline-flex items-center gap-1.5 sm:gap-2 px-4 py-2 sm:px-6 sm:py-3 rounded-full border border-primary-cyan/40 text-sm sm:text-base text-primary-cyan hover:bg-primary-cyan/10 transition-colors duration-300"
                >
                  <span>Send message</span>
                </button>
              </form>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

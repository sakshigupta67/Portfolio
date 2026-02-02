"use client";

import { useMemo } from "react";
import useScrollSpy from "./components/useScrollSpy";
import { SECTIONS } from "./data/profile";
import Navbar from "./sections/Navbar";
import Hero from "./sections/Hero";
import About from "./sections/About";
import Skills from "./sections/Skills";
import Experience from "./sections/Experience";
import Projects from "./sections/Projects";
import Education from "./sections/Education";
import Certificates from "./sections/Certificates";
import Contact from "./sections/Contact";
import Footer from "./sections/Footer";

export default function Page() {
  const ids = useMemo(() => SECTIONS.map((s) => s.id), []);
  const active = useScrollSpy(ids);

  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 bg-primary-dark text-white rounded px-3 py-2 shadow border border-primary-cyan/20"
      >
        Skip to content
      </a>
      <Navbar active={active} />
      <main id="home" className="max-w-6xl mx-auto px-4 relative">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Education />
        <Certificates />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { fadeIn } from "../components/anim";
import { SKILLS } from "../data/profile";

const SKILL_LOGOS = {
  Java: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  HTML: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  CSS: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  JavaScript: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  "React.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  "Next.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  "Node.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg",
  "Express.js": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/express/express-original.svg",
  "Tailwind CSS": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  MongoDB: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mongodb/mongodb-original.svg",
  Git: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  GitHub: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg",
  Postman: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postman/postman-original.svg",
  "REST APIs": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg",
  "Data Structures": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg",
  "Cloud Integration": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Microsoft Azure": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Azure AI Foundry": "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/azure/azure-original.svg",
  "Generative AI": "/openai.svg",
  "Model Context Protocol": "/mcp.svg",
  Docker: "/docker.svg",
};

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
          {SKILLS.map((skill, index) => (
            <div
              key={skill}
              className={reduceMotion ? "" : "skill-float"}
              style={reduceMotion ? undefined : { animationDelay: `${(index % 6) * -0.45}s` }}
            >
              <div className="select-none inline-flex items-center gap-2 rounded-full px-3 py-1.5 sm:px-5 sm:py-2.5 text-xs sm:text-sm font-medium text-white bg-primary-dark border border-primary-cyan/20 shadow-sm transition-[transform,border-color] duration-200 ease-out hover:border-primary-cyan/60 hover:-translate-y-0.5 hover:scale-[1.03]">
                <img
                  src={SKILL_LOGOS[skill]}
                  alt=""
                  aria-hidden="true"
                  className="h-4 w-4 sm:h-5 sm:w-5 object-contain"
                />
                <span>{skill}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

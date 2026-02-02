"use client";

import React from "react";

function SpecialisationStrip({ title }) {
  return (
    <div className="px-3 py-2 sm:px-5 sm:py-3 rounded-md sm:rounded-lg glass-card border border-primary-cyan/10 transition-all duration-300 hover:border-primary-cyan/30 hover:shadow-glow">
      <h3 className="text-xs sm:text-sm font-semibold text-white font-heading">{title}</h3>
    </div>
  );
}

export default function Specialisations() {
  const items = [
    { title: "Data Structures & Algorithms" },
    { title: "Full Stack Development" },
    { title: "Object Oriented Programming" },
    { title: "Operating Systems" },
    { title: "Software Engineering" },
    { title: "Database Management" },
  ];

  return (
    <div>
      <h3 className="text-lg sm:text-xl font-bold text-white mb-4 sm:mb-6 font-heading">Specialisations</h3>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {items.map((item, i) => (
          <SpecialisationStrip key={i} title={item.title} />
        ))}
      </div>
    </div>
  );
}

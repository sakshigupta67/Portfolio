// Singleton manager: activate borders for all cards inside the single most-visible section.
// regs: Map of element -> { cb, sectionId }
const regs = new Map();
const ratios = new Map();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      ratios.set(en.target, en.intersectionRatio || 0);
    });

    // Compute the best section by taking the highest element visibility per section
    const sectionBest = new Map(); // sectionId -> best ratio
    for (const [el] of regs.entries()) {
      const sectionId = regs.get(el).sectionId || "_root";
      const r = ratios.get(el) || 0;
      const prev = sectionBest.get(sectionId) || 0;
      if (r > prev) sectionBest.set(sectionId, r);
    }

    // Find the section with the highest ratio
    let bestSection = null;
    let bestSectionRatio = 0;
    for (const [sec, r] of sectionBest.entries()) {
      if (r > bestSectionRatio) {
        bestSectionRatio = r;
        bestSection = sec;
      }
    }

    // Activate all elements that belong to bestSection (and deactivate others)
    for (const [el, { cb, sectionId }] of regs.entries()) {
      try {
        const active = sectionId === bestSection && bestSectionRatio > 0.15;
        cb(active);
      } catch (e) {
        // ignore callback errors
      }
    }
  },
  { threshold: [0, 0.15, 0.25, 0.5, 0.75, 1] }
);

export function registerAnimatedBorder(el, cb) {
  if (!el) return;
  // determine nearest section id (so we can group by section)
  let sectionId = null;
  try {
    const sec = el.closest && el.closest("section[id]");
    sectionId = (sec && sec.id) || "_root";
  } catch (e) {
    sectionId = "_root";
  }
  regs.set(el, { cb, sectionId });
  ratios.set(el, 0);
  observer.observe(el);
}

export function unregisterAnimatedBorder(el) {
  if (!el) return;
  regs.delete(el);
  ratios.delete(el);
  try {
    observer.unobserve(el);
  } catch (e) {
    // ignore
  }
}

export default {
  registerAnimatedBorder,
  unregisterAnimatedBorder,
};

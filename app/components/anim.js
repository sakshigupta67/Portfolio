export const fadeIn = (direction = "up") => {
  const y = direction === "up" ? 24 : direction === "down" ? -24 : 0;
  const x = direction === "left" ? 24 : direction === "right" ? -24 : 0;
  return {
    hidden: { opacity: 0, x, y },
    show: { opacity: 1, x: 0, y: 0 },
  };
};

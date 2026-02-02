"use client";

export default function SocialIcon({ type, href, label }) {
  const common = "h-4 w-4 sm:h-5 sm:w-5";
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={label}
      className="inline-flex items-center justify-center rounded-full p-2 sm:p-3 bg-primary-dark border border-primary-cyan/20 text-gray-400 hover:text-primary-cyan hover:border-primary-cyan/50 shadow-soft hover:shadow-glow transition-all focus:outline-none focus:ring-2 focus:ring-primary-cyan/50"
    >
      {type === "github" && (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.11.82-.26.82-.58 0-.29-.01-1.04-.02-2.04-3.34.73-4.04-1.61-4.04-1.61-.55-1.41-1.35-1.79-1.35-1.79-1.11-.76.08-.75.08-.75 1.22.09 1.86 1.26 1.86 1.26 1.09 1.86 2.86 1.32 3.56 1.01.11-.8.43-1.32.78-1.62-2.67-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.12-.3-.54-1.51.12-3.15 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0C17.3 4.68 18.31 5 18.31 5c.66 1.64.24 2.85.12 3.15.77.84 1.24 1.91 1.24 3.22 0 4.61-2.8 5.62-5.48 5.92.44.38.83 1.12.83 2.26 0 1.63-.01 2.95-.01 3.35 0 .32.21.7.83.58A12 12 0 0 0 12 .5z" />
        </svg>
      )}
      {type === "linkedin" && (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M4.98 3.5C4.98 4.88 3.86 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM.5 8h4V24h-4V8zm7.5 0h3.83v2.19h.05c.53-1 1.82-2.19 3.75-2.19 4.01 0 4.75 2.64 4.75 6.07V24h-4v-7.91c0-1.89-.03-4.31-2.63-4.31-2.63 0-3.03 2.05-3.03 4.17V24h-3.92V8z" />
        </svg>
      )}
      {type === "email" && (
        <svg viewBox="0 0 24 24" className={common} fill="currentColor" aria-hidden="true">
          <path d="M12 13 1.5 6.75V18A2.25 2.25 0 0 0 3.75 20.25h16.5A2.25 2.25 0 0 0 22.5 18V6.75L12 13zm9-9H3a2 2 0 0 0-2 2v.25L12 12l11-5.75V6a2 2 0 0 0-2-2z" />
        </svg>
      )}
    </a>
  );
}

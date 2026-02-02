import "./globals.css";
import ParticleBackground from "./components/ParticleBackground";

export const metadata = {
  title: 'Resume | Sakshi Gupta',
  description: 'Sakshi Gupta — MERN & AI developer, CSE undergrad. Animated resume portfolio.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className="min-h-screen bg-primary-dark text-white antialiased selection:bg-primary-magenta/30 selection:text-white font-body"
      >
        <ParticleBackground />
        {children}
      </body>
    </html>
  );
}

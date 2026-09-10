import "./globals.css";
import ParticleBackground from "./components/ParticleBackground";
import CustomCursor from "./components/CustomCursor";

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
        <CustomCursor />
        {children}
      </body>
    </html>
  );
}

# Sakshi Portfolio

A modern, animated portfolio website built with Next.js, React, and Tailwind CSS. Features smooth animations, particle effects, and a fully responsive design.

## Features

- ⚡ Built with Next.js 14 for optimal performance
- 🎨 Styled with Tailwind CSS
- ✨ Smooth animations with Framer Motion
- 🌟 Particle background effects

## Prerequisites

Before you begin, ensure you have installed:
- [Node.js](https://nodejs.org/) (v16 or higher)
- npm (comes with Node.js)

## Installation

1. **Clone or download the project**

2. **Navigate to the project directory**
   ```bash
   cd Sakshi-Portfolio
   ```

3. **Install dependencies**
   ```bash
   npm install
   ```

## Running the Application

### Development Mode

Start the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

### Production Build

Build the application for production:
```bash
npm run build
```

Start the production server:
```bash
npm start
```

## Project Structure

```
Sakshi-Portfolio/
├── app/
│   ├── components/       # Reusable components
│   │   ├── Icons.jsx     # Custom SVG icons
│   │   ├── ParticleBackground.jsx
│   │   └── ...
│   ├── sections/         # Page sections
│   │   ├── Hero.jsx
│   │   ├── About.jsx
│   │   ├── Skills.jsx
│   │   └── ...
│   ├── data/
│   │   └── profile.js    # Portfolio content data
│   ├── globals.css
│   ├── layout.js
│   └── page.js
├── public/               # Static assets
├── next.config.mjs       # Next.js configuration
├── tailwind.config.js    # Tailwind CSS configuration
└── package.json
```

## Customization

### Update Portfolio Content

Edit the file `app/data/profile.js` to customize:
- Personal information
- Skills
- Projects
- Experience
- Education
- Certificates

### Modify Colors

Update the color scheme in `tailwind.config.js`:
```js
colors: {
  primary: {
    magenta: "#DC00D3",
    cyan: "#0CFFFF",
    dark: "#100425",
  },
}
```

### Change Particle Effects

Adjust particle settings in `app/components/ParticleBackground.jsx`:
```js
const CONFIG = {
  particleCountDesktop: 50,
  particleCountMobile: 20,
  minSize: 1,
  maxSize: 2.5,
  // ... more options
};
```

## Performance Optimizations

This portfolio is optimized for performance:
- Minimal dependencies (no icon libraries)
- Tree-shaking enabled
- Optimized Next.js configuration
- Lazy loading for images
- Static pre-rendering

## Technologies Used

- **Framework:** Next.js 14
- **UI Library:** React 18
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Language:** JavaScript (ES6+)

## License

This project is open source and available for personal use.

## Support

For any issues or questions, please open an issue in the repository.

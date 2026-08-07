# Kaviarasan K — Portfolio

Modern portfolio website built with **React.js + SCSS + Framer Motion + Vite**.

## Tech Stack
- React 18
- SCSS Modules
- Framer Motion (animations)
- Vite (build tool)
- react-intersection-observer (scroll reveals)

## Getting Started

### Prerequisites
- Node.js 18+ installed

### Install & Run

```bash
# 1. Extract the zip
cd kaviarasan-portfolio

# 2. Install dependencies
npm install

# 3. Start dev server
npm run dev
# → Opens at http://localhost:5173

# 4. Build for production
npm run build
# → Output in /dist folder

# 5. Preview production build
npm run preview
```

## Project Structure

```
kaviarasan-portfolio/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Cursor.jsx / .module.scss
│   │   ├── Navbar.jsx / .module.scss
│   │   ├── Hero.jsx / .module.scss
│   │   ├── Marquee.jsx / .module.scss
│   │   ├── About.jsx / .module.scss
│   │   ├── Skills.jsx / .module.scss
│   │   ├── Experience.jsx / .module.scss
│   │   ├── Projects.jsx / .module.scss
│   │   ├── Education.jsx / .module.scss
│   │   ├── Contact.jsx / .module.scss
│   │   └── Footer.jsx / .module.scss
│   ├── data/
│   │   └── portfolio.js       ← Edit your info here
│   ├── styles/
│   │   ├── _variables.scss    ← Colors, fonts, spacing
│   │   └── global.scss
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── vite.config.js
└── package.json
```

## Customization

All personal data is in **`src/data/portfolio.js`** — update your name, email, projects, skills, etc. there.

Colors and fonts are in **`src/styles/_variables.scss`**.

## Deploy

- **Vercel**: `npm run build` → drag `/dist` to vercel.com
- **Netlify**: Connect GitHub repo → set build command `npm run build`, publish dir `dist`
- **GitHub Pages**: Use `vite-plugin-gh-pages`

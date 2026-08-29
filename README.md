# Your Name — Portfolio

A React + Tailwind CSS recreation of the developer portfolio design, ready to customize.

## Getting started

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## Customize it

- **Your info & content**: edit `src/data.js` — this single file drives your name, bio,
  tech stack, "What I Do" list, experience timeline, certifications, and contact details.
- **Your photo**: replace `public/profile.jpg` with your own photo (same filename, or
  update the path in `src/components/Hero.jsx`).
- **Colors**: edit `tailwind.config.js` under `theme.extend.colors` (`navy`, `orange`, `cream`, `blush`).
- **Sections**: each section lives in its own file under `src/components/`.

## Build for production

```bash
npm run build
```

This outputs a static site to `dist/` which you can deploy to Vercel, Netlify, GitHub Pages, etc.

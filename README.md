# Roshan Prabhu — Portfolio

React 19 · TypeScript · Vite 6 · Tailwind CSS 4 · Motion · React Router 7 · Lucide

## Run locally

```bash
npm install
npm run dev          # http://localhost:5173
npm run typecheck
npm run build        # production build -> dist/ (clean URLs, deploy to Vercel/Netlify)
npm run preview      # serve dist/ locally
npm run build:single # one self-contained index.html with hash routes -> dist-single/
```

`vercel.json` and `public/_redirects` already rewrite all routes to `index.html`, so `/projects/<slug>` works on refresh.

## Where to edit

| What | File |
| --- | --- |
| Email, LinkedIn, GitHub, resume, availability pill, education, experience | `src/data/site.ts` |
| Projects (content, visibility, featured, order, links, stack) | `src/data/projects.ts` |
| Skills | `src/data/skills.ts` |
| Colors / fonts | `src/index.css` (`@theme`) |
| Social preview (og:image, og:url) | `index.html` |

### Draft mode
`site.draftMode = true` shows amber "needs input" markers, per-project review panels, unverified (dashed) tech, and file paths inside screenshot placeholders. **Set it to `false` before launch** — all of that disappears and unverified tech is hidden.

### Screenshots
Drop images into `src/assets/projects/<slug>/` named after each shot `id` in `projects.ts` (`.png`, `.jpg`, `.webp`, `.avif`). They're picked up automatically — no code change. The first shot of each project is its cover. Keep the aspect ratio listed on the shot (e.g. `16 / 10`, phones `9 / 19.5`) or change it in the data.

Every project currently ships with **illustrative mockups** (`<id>.mockup.webp`) so the site looks complete. They're badged "Illustrative mockup" on the site and in alt text. To swap one for the real thing, drop `<id>.png` (or .jpg/.webp) in the same folder — the real file wins automatically and the badge disappears. Delete the `.mockup.webp` once replaced. Shots with neither file show a labelled placeholder.

### Projects
- `visible: false` hides a project everywhere including its URL (Quint Edge AI ships hidden).
- `featured: true` = large alternating showcase; others appear in the compact grid.
- `context`: `personal` | `academic` | `professional` | `client` | `review` — shown as a badge on every card.
- `links.live` / `links.repo`: buttons only appear when set.
- `results`: verified numbers only. The section is hidden when empty (outside draft mode).
- Tech items with `verify: true` are unconfirmed; remove the flag once checked against source.

### Resume
Put the PDF at `public/resume.pdf` and set `resumeUrl: '/resume.pdf'`.

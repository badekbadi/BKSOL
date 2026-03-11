# BK Solutions – Agent Memory

## Project overview
Static landing page (coming soon) for BK Solutions (bksolutions.pl).
Hosted on GitHub Pages. Repo: https://github.com/badekbadi/BKSOL

## Stack
- Vanilla HTML / CSS / JS — no npm, no bundler, no frameworks
- particles.js 2.0.0 via CDN (must load before script.js — both have `defer`)
- Font Awesome 6.4.2 via CDN
- Google Fonts via CDN

## Files
- `/index.html` — single page
- `/css/style.css` — all styles
- `/js/script.js` — terminal animation + particles config
- `/assets/` — favicons
- `/CNAME` — bksolutions.pl

## Current design (as of v2 / Research Institute redesign)
- Aesthetic: Research Institute / Think Tank / Academy
- Palette: `--gold: #B8922A`, `--gold-light: #D4A84C`, `--bg: #07090f`, `--text: #DDD8C8`
- Fonts: Playfair Display (serif, h1) + Space Mono (monospace, terminal/data)
- Background: subtle 80px grid + radial vignette via `body::before` / `body::after`
- Particles: gold (#B8922A), no line links, low opacity/count, slow drift

## Known constraints & rules
- NEVER install npm packages
- NEVER create new files without explicit need
- `logLines` must use `createElement` + `textContent` — never `innerHTML` (XSS fix)
- particles.js must load before script.js (both `defer`, order in HTML matters)
- Every new animation must respect `prefers-reduced-motion` — see pattern in script.js
- Mobile terminal wrapping: `.terminal-row`, `.log-lines`, `.log-current` — check on narrow viewport

## Social links (never change)
- X: https://x.com/BKSolutions_
- YouTube: https://www.youtube.com/@BKSolutions_pl
- Instagram: https://www.instagram.com/bksolutions_pl

## Communication
- Always respond in Polish
- Commit messages in English

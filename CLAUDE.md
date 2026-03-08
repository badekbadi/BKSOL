# CLAUDE.md – BK Solutions

## Projekt

Statyczna strona landing page dla **BK Solutions** (bksolutions.pl) – firma z sektora bezpieczeństwa aktywów cyfrowych i architektury ryzyka. Strona jest w fazie pre-deployment (coming soon).

Repozytorium: https://github.com/badekbadi/BKSOL

## Struktura plików

```
/
├── index.html          # Główny plik HTML (jedyna strona)
├── css/style.css       # Wszystkie style
├── js/script.js        # Animacje terminala i logika UI
├── assets/             # Favicony
├── CNAME               # bksolutions.pl (GitHub Pages)
├── og-image.jpeg       # Open Graph image
└── site.webmanifest    # PWA manifest
```

## Stack technologiczny

- **Vanilla HTML/CSS/JS** – brak frameworków, brak bundlera, brak npm
- **Particles.js** (CDN) – animacja cząsteczek w tle
- **Font Awesome 6.4.2** (CDN) – ikony social media
- **Google Fonts** – JetBrains Mono (kod/terminal), Saira (nagłówki)
- **Hosting:** GitHub Pages

## Design system

- Paleta kolorów: ciemne tło `#050a10`, neon cyan `#00F0FF`, biel
- Styl: cyberpunk / dark tech terminal aesthetic
- Czcionki: JetBrains Mono (monospace), Saira (bold headers)
- Animacje: terminal typing effect, particles background, memory blocks

## Wytyczne edycji

- **Nie instaluj zależności** – projekt celowo nie używa npm/node
- **Nie twórz nowych plików** bez wyraźnej potrzeby
- **Zachowuj estetykę** – dark cyberpunk, neon cyan, terminal feel
- Zmiany CSS testuj pod kątem mobile (viewport mobile priority)
- Linki social media: X (`@BKSolutions_`), YouTube (`@BKSolutions_pl`), Instagram (`bksolutions_pl`)

## Znane pułapki

- **Mobile terminal wrapping** – był bug z zawijaniem tekstu terminala na mobile (fix: commit `0cf1fc3`). Przy edycji `.terminal-row`, `.log-lines`, `.log-current` sprawdzaj na wąskim viewport.
- **XSS fix** – `logLines` używa `createElement` + `textContent`, nie `innerHTML`. Nie zmieniaj na `innerHTML`.
- **Kolejność skryptów** – `particles.js` musi być załadowany przed `script.js`. Oba mają `defer`, więc kolejność w HTML ma znaczenie – nie zamieniaj ich miejscami.
- **reducedMotion** – każda nowa animacja musi sprawdzać `window.matchMedia('(prefers-reduced-motion: reduce)')`. Wzorzec jest już w `script.js` – stosuj go konsekwentnie.

## Komunikacja

- Odpowiadaj zawsze po **polsku**
- Commit messages mogą być po angielsku (zgodnie z historią repo)

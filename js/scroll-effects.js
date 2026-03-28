'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    /* ── Reveal on scroll ─────────────────────────────────── */
    const revealObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal-on-scroll').forEach(el => revealObserver.observe(el));

    /* ── Typewriter for section headers ───────────────────── */
    const headerObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.typed) {
                entry.target.dataset.typed = 'true';
                const text = entry.target.dataset.typetext;
                if (!reducedMotion && typeof typewriterEffect === 'function') {
                    typewriterEffect(entry.target, text, 35);
                } else {
                    entry.target.textContent = text;
                }
                headerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    document.querySelectorAll('.section-typewriter').forEach(el => {
        el.dataset.typetext = el.textContent.trim();
        el.textContent = '';
        headerObserver.observe(el);
    });

    /* ── Count-up for stats ───────────────────────────────── */
    const plFormat = new Intl.NumberFormat('pl-PL');

    const counterObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.dataset.counted) {
                entry.target.dataset.counted = 'true';
                const target   = parseFloat(entry.target.dataset.target);
                const suffix   = entry.target.dataset.suffix || '';
                const prefix   = entry.target.dataset.prefix || '';
                const duration = parseInt(entry.target.dataset.duration) || 1500;
                const isDecimal = !Number.isInteger(target);
                const el = entry.target;
                const fmt = v => prefix + (isDecimal ? v.toFixed(2) : plFormat.format(Math.floor(v))) + suffix;

                if (!reducedMotion) {
                    const start = performance.now();
                    const update = now => {
                        const elapsed  = now - start;
                        const progress = Math.min(elapsed / duration, 1);
                        const ease     = 1 - Math.pow(1 - progress, 3);
                        el.textContent = fmt(ease * target);
                        if (progress < 1) requestAnimationFrame(update);
                    };
                    requestAnimationFrame(update);
                } else {
                    el.textContent = fmt(target);
                }
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    document.querySelectorAll('.count-up').forEach(el => counterObserver.observe(el));

    /* ── THREAT_MATRIX ────────────────────────────────────── */
    const matrixEl = document.getElementById('threat-matrix');
    if (matrixEl && !reducedMotion) {
        const isMob  = window.innerWidth < 700;
        const ROWS   = isMob ? 8 : 12;
        const COLS   = isMob ? 10 : 16;
        const chars  = ['░', '▒', '▓', '█'];

        const state = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => Math.floor(Math.random() * chars.length))
        );

        function renderMatrix() {
            matrixEl.textContent = state.map(row => row.map(i => chars[i]).join('')).join('\n');
        }

        function flipMatrix() {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            state[r][c] = Math.floor(Math.random() * chars.length);
            renderMatrix();
            setTimeout(flipMatrix, 80 + Math.floor(Math.random() * 120));
        }

        renderMatrix();

        const matrixObserver = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !matrixEl.dataset.started) {
                    matrixEl.dataset.started = 'true';
                    flipMatrix();
                    matrixObserver.unobserve(matrixEl);
                }
            });
        }, { threshold: 0.2 });

        matrixObserver.observe(matrixEl);
    } else if (matrixEl) {
        matrixEl.textContent = Array.from({ length: 12 }, () =>
            Array.from({ length: 16 }, () => '█').join('')
        ).join('\n');
    }

    /* ── Scroll-cue hide ──────────────────────────────────── */
    const scrollCue = document.getElementById('scroll-cue');
    if (scrollCue) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                scrollCue.style.opacity = '0';
                scrollCue.style.pointerEvents = 'none';
            }
        }, { passive: true, once: true });
    }
});

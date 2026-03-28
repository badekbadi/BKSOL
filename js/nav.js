'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav-main');
    const toggle = document.getElementById('nav-toggle');

    if (!nav) return;

    const yearEl = document.getElementById('footer-year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    let navScrolled = false;
    window.addEventListener('scroll', () => {
        const shouldBeScrolled = window.scrollY > 50;
        if (shouldBeScrolled !== navScrolled) {
            navScrolled = shouldBeScrolled;
            nav.classList.toggle('nav--scrolled', navScrolled);
        }
    }, { passive: true });

    if (toggle) {
        toggle.addEventListener('click', () => {
            const isOpen = nav.classList.toggle('nav--open');
            toggle.setAttribute('aria-expanded', isOpen);
        });
    }

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            nav.classList.remove('nav--open');
            if (toggle) toggle.setAttribute('aria-expanded', 'false');
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', e => {
            const targetId = anchor.getAttribute('href');
            if (targetId === '#') return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });
});

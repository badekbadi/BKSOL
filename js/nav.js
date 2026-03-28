'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const nav = document.getElementById('nav-main');
    const toggle = document.getElementById('nav-toggle');

    window.addEventListener('scroll', () => {
        nav.classList.toggle('nav--scrolled', window.scrollY > 50);
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

'use strict';

// Shared utilities for BK Solutions site

function typewriterEffect(el, text, speed, callback) {
    let i = 0;
    el.textContent = '';
    const id = setInterval(() => {
        el.textContent += text[i++];
        if (i >= text.length) {
            clearInterval(id);
            if (callback) callback();
        }
    }, speed || 60);
    return id;
}

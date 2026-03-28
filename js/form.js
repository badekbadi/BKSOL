'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('access-form');
    if (!form) return;

    const submitBtn = document.getElementById('form-submit');
    const statusEl = document.getElementById('access-status');

    // Ustaw własny URL Formspree: https://formspree.io (darmowy plan: 50 zgłoszeń/mies.)
    // Zamień null na swój endpoint, np. 'https://formspree.io/f/xabcdefg'
    const FORMSPREE_URL = null;

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    form.addEventListener('submit', async e => {
        e.preventDefault();

        const operatorVal = (form.querySelector('[name="operator"]').value || '').toUpperCase();
        const emailVal = form.querySelector('[name="email"]').value || '';

        submitBtn.textContent = '[ TRANSMITTING... ]';
        submitBtn.disabled = true;

        if (!FORMSPREE_URL) {
            showSuccess(operatorVal, emailVal);
            return;
        }

        try {
            const res = await fetch(FORMSPREE_URL, {
                method: 'POST',
                body: new FormData(form),
                headers: { 'Accept': 'application/json' }
            });

            if (res.ok) {
                showSuccess(operatorVal, emailVal);
            } else {
                showError();
            }
        } catch {
            showError();
        }
    });

    function showError() {
        submitBtn.textContent = '[ TRANSMISSION FAILED — RETRY ]';
        submitBtn.disabled = false;
    }

    function showSuccess(operator, email) {
        form.style.display = 'none';
        statusEl.style.display = 'block';

        const content = statusEl.querySelector('.status-terminal-content');
        content.textContent = '';

        const lines = [
            '> ACCESS REQUEST RECEIVED',
            '> OPERATOR: ' + (operator || 'UNKNOWN'),
            '> SECURE_CHANNEL: ' + (email || 'N/A'),
            '> STATUS: PENDING AUTHORIZATION',
            '> ETA: NOTIFICATION VIA REGISTERED CHANNEL',
            '_'
        ];

        if (reducedMotion) {
            content.textContent = lines.join('\n');
            return;
        }

        let i = 0;
        function appendLine() {
            if (i < lines.length) {
                content.textContent += lines[i++] + '\n';
                setTimeout(appendLine, 220);
            }
        }
        appendLine();
    }
});

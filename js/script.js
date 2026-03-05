let isMobile = window.innerWidth < 700;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 700;
});

(function () {
    const messages = [
        "INITIALIZING CORE ENVIRONMENT...",
        "LOADING CRYPTOGRAPHIC MODULES... [ OK ]",
        "VERIFYING ZERO-TRUST ARCHITECTURE... [ OK ]",
        "ENFORCING STRICT ACCESS POLICIES... [ OK ]",
        "SECURING END-TO-END DATA STREAMS... [ OK ]",
        "INTEGRITY CHECKSUM: VALIDATED [ DONE ]",
        "STATUS: PRE-DEPLOYMENT PHASE",
        "AWAITING AUTHORIZATION_"
    ];

    const el = document.getElementById("status-message");
    const logLines = document.getElementById("log-lines");
    const spinner = document.getElementById("spinner");
    const history = [];

    spinner.textContent = '▊';
    const MAX_HISTORY = 3;

    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPING_SPEED = 90;
    const DELETING_SPEED = 35;
    const PAUSE_AFTER_TYPE = 3000;
    const PAUSE_AFTER_DELETE = 500;

    function updateHistory(msg) {
        history.push(msg);
        if (history.length > MAX_HISTORY) history.shift();
        logLines.textContent = '';
        history.forEach(m => {
            const div = document.createElement('div');
            div.className = 'log-line-old';
            div.textContent = '> ' + m;
            logLines.appendChild(div);
        });
    }

    const PAUSE_BEFORE_STATUS = 700;

    function tick() {
        const current = messages[msgIndex];

        if (!isDeleting) {
            el.textContent = current.slice(0, charIndex + 1);
            charIndex++;

            if (charIndex === current.length) {
                isDeleting = true;
                setTimeout(tick, PAUSE_AFTER_TYPE);
                return;
            }

            if (current.slice(charIndex).startsWith(' [')) {
                setTimeout(tick, PAUSE_BEFORE_STATUS);
                return;
            }
        } else {
            el.textContent = current.slice(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                updateHistory(messages[msgIndex]);
                isDeleting = false;
                msgIndex = (msgIndex + 1) % messages.length;
                setTimeout(tick, PAUSE_AFTER_DELETE);
                return;
            }
        }

        setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }

    tick();

    // Pulsujące punkty danych w tle
    if (!reducedMotion) {
        const dotCount = isMobile ? 4 : 8;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'data-pulse';
            dot.style.left = (Math.random() * 100) + 'vw';
            dot.style.top  = (Math.random() * 100) + 'vh';
            dot.style.animationDelay    = (Math.random() * 5) + 's';
            dot.style.animationDuration = (2.5 + Math.random() * 3.5) + 's';
            document.body.appendChild(dot);
        }
    }

    // Glitch na h1 — losowo co 45–90 sekund
    if (!reducedMotion) {
        const h1 = document.querySelector('.title-box h1');
        function triggerGlitch() {
            h1.classList.add('glitch-active');
            setTimeout(() => h1.classList.remove('glitch-active'), 450);
            setTimeout(triggerGlitch, 45000 + Math.random() * 45000);
        }
        setTimeout(triggerGlitch, 45000 + Math.random() * 45000);
    }

    // SEC_MODULES — losowe bloki pamięci
    (function () {
        const memEl = document.getElementById('mem-blocks');
        const ROWS = 3;
        const COLS = 8;

        const state = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => Math.random() > 0.45 ? 1 : 0)
        );

        function render() {
            const rows = state.map(row => '[' + row.map(b => b ? '■' : '□').join('') + ']');
            memEl.textContent = 'SEC_MODULES:\n' + rows.join('\n');
        }

        const flipDelay = isMobile ? 1500 : 700;

        function flip() {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            state[r][c] ^= 1;
            render();
            setTimeout(flip, flipDelay + Math.floor(Math.random() * 500));
        }

        render();
        setTimeout(flip, flipDelay + Math.floor(Math.random() * 500));
    })();
})();

particlesJS("particles-js", {
    "particles": {
        "number": { "value": isMobile ? 25 : 70, "density": { "enable": true, "value_area": 900 } },
        "color": { "value": "#00F0FF" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.5 },
        "size": { "value": 2, "random": true },
        "line_linked": {
            "enable": !isMobile,
            "distance": 120,
            "color": "#00F0FF",
            "opacity": 0.2,
            "width": 1
        },
        "move": { "enable": !reducedMotion, "speed": isMobile ? 0.25 : 0.5 }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": !isMobile, "mode": "grab" },
            "onclick": { "enable": false }
        },
        "modes": {
            "grab": { "distance": 140, "line_linked": { "opacity": 0.6 } }
        }
    },
    "retina_detect": false
});

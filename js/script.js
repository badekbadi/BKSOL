let isMobile = window.innerWidth < 700;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 700;
});

(function () {
    const messages = [
        "INITIALIZING RESEARCH FRAMEWORK...",
        "LOADING THREAT INTELLIGENCE DB... [ DONE ]",
        "CROSS-REFERENCING RISK MODELS... [ DONE ]",
        "COMPILING STRATEGIC ANALYSIS... [ DONE ]",
        "VALIDATING METHODOLOGY... [ DONE ]",
        "PRELIMINARY FINDINGS: CLASSIFIED",
        "STATUS: PRE-PUBLICATION PHASE",
        "ESTABLISHING PARAMETERS_"
    ];

    const mobileMessages = [
        "INIT RESEARCH FRAMEWORK...",
        "LOADING INTEL DB... [ DONE ]",
        "CROSS-REF MODELS... [ DONE ]",
        "STRATEGIC ANALYSIS... [ DONE ]",
        "METHODOLOGY: VALID [ DONE ]",
        "FINDINGS: CLASSIFIED",
        "STATUS: PRE-PUBLICATION",
        "PARAMS ESTABLISHED_"
    ];

    const activeMessages = isMobile ? mobileMessages : messages;

    const el = document.getElementById("status-message");
    const logLines = document.getElementById("log-lines");
    const spinner = document.getElementById("spinner");
    const history = [];

    spinner.textContent = '▊';
    const MAX_HISTORY = isMobile ? 6 : 3;

    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPING_SPEED = 80;
    const DELETING_SPEED = 30;
    const PAUSE_AFTER_TYPE = 3200;
    const PAUSE_AFTER_DELETE = 500;

    function updateHistory(msg) {
        history.push(msg);
        if (history.length > MAX_HISTORY) history.shift();
        logLines.textContent = '';
        history.forEach(m => {
            const div = document.createElement('div');
            div.className = 'log-line-old';
            div.textContent = '› ' + m;
            logLines.appendChild(div);
        });
    }

    const PAUSE_BEFORE_STATUS = 700;

    function tick() {
        const current = activeMessages[msgIndex];

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
                updateHistory(activeMessages[msgIndex]);
                isDeleting = false;
                msgIndex = (msgIndex + 1) % activeMessages.length;
                setTimeout(tick, PAUSE_AFTER_DELETE);
                return;
            }
        }

        setTimeout(tick, isDeleting ? DELETING_SPEED : TYPING_SPEED);
    }

    tick();

    // Ambient dust dots
    if (!reducedMotion) {
        const dotCount = isMobile ? 3 : 6;
        for (let i = 0; i < dotCount; i++) {
            const dot = document.createElement('div');
            dot.className = 'data-pulse';
            dot.style.left = (Math.random() * 100) + 'vw';
            dot.style.top  = (Math.random() * 100) + 'vh';
            dot.style.animationDelay    = (Math.random() * 6) + 's';
            dot.style.animationDuration = (4 + Math.random() * 5) + 's';
            document.body.appendChild(dot);
        }
    }

    // RESEARCH_NODES — module activity grid
    (function () {
        const memEl = document.getElementById('mem-blocks');
        const ROWS = 3;
        const COLS = 8;

        const state = Array.from({ length: ROWS }, () =>
            Array.from({ length: COLS }, () => Math.random() > 0.45 ? 1 : 0)
        );

        function render() {
            const rows = state.map(row => '[' + row.map(b => b ? '◆' : '◇').join('') + ']');
            memEl.textContent = 'RESEARCH_NODES:\n' + rows.join('\n');
        }

        const flipDelay = isMobile ? 2000 : 1200;

        function flip() {
            const r = Math.floor(Math.random() * ROWS);
            const c = Math.floor(Math.random() * COLS);
            state[r][c] ^= 1;
            render();
            setTimeout(flip, flipDelay + Math.floor(Math.random() * 800));
        }

        render();
        setTimeout(flip, flipDelay + Math.floor(Math.random() * 800));
    })();
})();

particlesJS("particles-js", {
    "particles": {
        "number": { "value": isMobile ? 15 : 35, "density": { "enable": true, "value_area": 1200 } },
        "color": { "value": "#B8922A" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.2, "random": true },
        "size": { "value": 1.5, "random": true },
        "line_linked": { "enable": false },
        "move": { "enable": !reducedMotion, "speed": isMobile ? 0.15 : 0.25 }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": false },
            "onclick": { "enable": false }
        }
    },
    "retina_detect": false
});

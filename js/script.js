// ── PHASE CONTROL ──────────────────────────────────────────────
// 1 = wszystkie moduły zablokowane (coming soon)
// 2 = MODULE_01 odblokowany
// 3 = MODULE_01 + MODULE_02 odblokowane
// 4 = wszystkie odblokowane (pełny launch)
const SITE_PHASE = 2;
document.documentElement.setAttribute('data-phase', SITE_PHASE);

document.addEventListener('DOMContentLoaded', () => { applyPhase(SITE_PHASE); });

function applyPhase(phase) {
    const p = Math.min(Math.max(phase, 1), 4);

    const headerTexts = {
        1: '> MISSION MODULES // 3 OF 3 CLASSIFIED',
        2: '> MISSION MODULES // 2 OF 3 CLASSIFIED',
        3: '> MISSION MODULES // 1 OF 3 CLASSIFIED',
        4: '> MISSION MODULES // DECLASSIFIED'
    };
    const progressTexts = {
        1: '[░░░░░░░░░░]  0% DECLASSIFIED',
        2: '[███░░░░░░░]  33% DECLASSIFIED',
        3: '[██████░░░░]  67% DECLASSIFIED',
        4: '[██████████]  100% DECLASSIFIED'
    };
    const countTexts = {
        1: 'CLEARANCE LEVEL REQUIRED: TOP SECRET',
        2: 'CLEARANCE LEVEL: PARTIAL // 1 OF 3 ACTIVE',
        3: 'CLEARANCE LEVEL: PARTIAL // 2 OF 3 ACTIVE',
        4: 'CLEARANCE LEVEL: GRANTED // ALL MODULES ACTIVE'
    };

    const set = (id, map) => { const el = document.getElementById(id); if (el) el.textContent = map[p]; };
    set('modules-header-text', headerTexts);
    set('modules-progress', progressTexts);
    set('modules-count', countTexts);

    // Status aktywnych kart
    const modules = [
        { id: 'mc-01', unlockAt: 2, name: 'FOUNDATION CLEARANCE' },
        { id: 'mc-02', unlockAt: 3, name: 'OPERATIONAL PROTOCOLS' },
        { id: 'mc-03', unlockAt: 4, name: 'ADVANCED ARCHITECTURE' }
    ];
    modules.forEach(({ id, unlockAt, name }) => {
        const card = document.getElementById(id);
        if (!card) return;
        const statusEl = card.querySelector('.module-card__status');
        if (p >= unlockAt && statusEl) statusEl.textContent = name + ' // ACTIVE';
    });
}
// ───────────────────────────────────────────────────────────────

let isMobile = window.innerWidth < 700;
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

window.addEventListener('resize', () => {
    isMobile = window.innerWidth < 700;
});

(function () {
    const messages = SITE_PHASE === 2 ? [
        "LOADING CRYPTOGRAPHIC MODULES... [ OK ]",
        "ZERO-TRUST ARCHITECTURE: VERIFIED [ OK ]",
        "ACCESS POLICIES: ENFORCED [ OK ]",
        "DATA STREAMS: SECURED [ OK ]",
        "INTEGRITY CHECKSUM: VALIDATED [ DONE ]",
        "AUTHORIZATION GRANTED... [ OK ]",
        "STATUS: OPERATIONAL",
        "WELCOME, OPERATOR_"
    ] : [
        "INITIALIZING CORE ENVIRONMENT...",
        "LOADING CRYPTOGRAPHIC MODULES... [ OK ]",
        "VERIFYING ZERO-TRUST ARCHITECTURE... [ OK ]",
        "ENFORCING STRICT ACCESS POLICIES... [ OK ]",
        "SECURING END-TO-END DATA STREAMS... [ OK ]",
        "INTEGRITY CHECKSUM: VALIDATED [ DONE ]",
        "STATUS: PRE-DEPLOYMENT PHASE",
        "AWAITING AUTHORIZATION_"
    ];

    const mobileMessages = SITE_PHASE === 2 ? [
        "CRYPTO MODULES... [ OK ]",
        "ZERO-TRUST... [ OK ]",
        "ACCESS POLICIES... [ OK ]",
        "DATA STREAMS... [ OK ]",
        "CHECKSUM: VALIDATED [ DONE ]",
        "STATUS: OPERATIONAL",
        "WELCOME, OPERATOR_"
    ] : [
        "INIT CORE ENVIRONMENT...",
        "LOADING CRYPTO... [ OK ]",
        "ZERO-TRUST VERIFY... [ OK ]",
        "ACCESS POLICIES... [ OK ]",
        "DATA STREAMS... [ OK ]",
        "CHECKSUM: VALIDATED [ DONE ]",
        "STATUS: PRE-DEPLOYMENT",
        "AWAITING AUTHORIZATION_"
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

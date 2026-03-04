(function () {
    const messages = [
        "STATUS: PRE-DEPLOYMENT PHASE",
        "INITIALIZING PROTOCOLS...",
        "SECURING CONNECTIONS...",
        "RUNNING DIAGNOSTICS...",
        "ENCRYPTING DATA STREAMS...",
        "VERIFYING SYSTEM INTEGRITY...",
        "SCANNING FOR VULNERABILITIES...",
        "ESTABLISHING SECURE CHANNEL...",
        "COMPILING THREAT MODELS...",
        "AWAITING DEPLOYMENT CLEARANCE...",
        "LOADING SECURITY MODULES...",
        "CHECKSUM VERIFIED...",
        "ACCESS PROTOCOLS ENGAGED...",
        "SYSTEM STANDBY..."
    ];

    const el = document.getElementById("status-message");
    const logLines = document.getElementById("log-lines");
    const spinner = document.getElementById("spinner");
    const history = [];

    const SPINNER_FRAMES = ['|', '/', '-', '\\'];
    let spinnerIndex = 0;
    setInterval(() => {
        spinner.textContent = SPINNER_FRAMES[spinnerIndex++ % SPINNER_FRAMES.length];
    }, 120);
    const MAX_HISTORY = 7;

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
        logLines.innerHTML = history
            .map(m => `<div class="log-line-old">&gt; ${m}</div>`)
            .join('');
    }

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

    // Animowany placeholder
    (function () {
        const placeholders = [
            "ENTER_EMAIL_ADDRESS",
            "AWAITING_USER_DATA...",
            "ESTABLISHING_CONNECTION...",
            "INPUT_REQUIRED...",
            "ACCESS_GRANTED_ON_SUBMIT..."
        ];
        const input = document.querySelector('input[type="email"]');
        let pi = 0, ci = 0, del = false;

        function tickPH() {
            const cur = placeholders[pi];
            if (!del) {
                input.setAttribute('placeholder', cur.slice(0, ci + 1) + '_');
                ci++;
                if (ci === cur.length) { del = true; setTimeout(tickPH, 2000); return; }
            } else {
                input.setAttribute('placeholder', ci > 1 ? cur.slice(0, ci - 1) + '_' : '');
                ci--;
                if (ci === 0) { del = false; pi = (pi + 1) % placeholders.length; setTimeout(tickPH, 300); return; }
            }
            setTimeout(tickPH, del ? 30 : 70);
        }
        tickPH();
    })();

    // Pulsujące punkty danych w tle
    (function () {
        for (let i = 0; i < 14; i++) {
            const dot = document.createElement('div');
            dot.className = 'data-pulse';
            dot.style.left = (Math.random() * 100) + 'vw';
            dot.style.top  = (Math.random() * 100) + 'vh';
            dot.style.animationDelay    = (Math.random() * 5) + 's';
            dot.style.animationDuration = (2.5 + Math.random() * 3.5) + 's';
            document.body.appendChild(dot);
        }
    })();

    // Glitch na h1 — losowo co 45–90 sekund
    const h1 = document.querySelector('.title-box h1');
    function triggerGlitch() {
        h1.classList.add('glitch-active');
        setTimeout(() => h1.classList.remove('glitch-active'), 450);
        setTimeout(triggerGlitch, 45000 + Math.random() * 45000);
    }
    setTimeout(triggerGlitch, 45000 + Math.random() * 45000);

    // Pasek postępu (localStorage)
    (function () {
        const KEY = 'bk_progress';
        const RATE = 0.5 / (60 * 60 * 1000); // 0.5% / godzinę

        function loadProgress() {
            const stored = localStorage.getItem(KEY);
            if (!stored) {
                const data = { value: 43.2, ts: Date.now() };
                localStorage.setItem(KEY, JSON.stringify(data));
                return 43.2;
            }
            const { value, ts } = JSON.parse(stored);
            const newValue = Math.min(value + (Date.now() - ts) * RATE, 99.9);
            localStorage.setItem(KEY, JSON.stringify({ value: newValue, ts: Date.now() }));
            return newValue;
        }

        function renderBar(pct) {
            const filled = Math.round(pct / 100 * 13);
            return `[${'█'.repeat(filled)}${'░'.repeat(13 - filled)}] ${pct.toFixed(1)}%`;
        }

        const barEl = document.getElementById('progress-line');
        let currentPct = loadProgress();
        barEl.textContent = renderBar(currentPct);

        setInterval(() => {
            currentPct = Math.min(currentPct + RATE * 60000, 99.9);
            barEl.textContent = renderBar(currentPct);
        }, 60000);
    })();
})();

particlesJS("particles-js", {
    "particles": {
        "number": { "value": 100, "density": { "enable": true, "value_area": 800 } },
        "color": { "value": "#00F0FF" },
        "shape": { "type": "circle" },
        "opacity": { "value": 0.6 },
        "size": { "value": 2.5, "random": true },
        "line_linked": {
            "enable": true,
            "distance": 150,
            "color": "#00F0FF",
            "opacity": 0.3,
            "width": 1
        },
        "move": { "enable": true, "speed": 1.5 }
    },
    "interactivity": {
        "detect_on": "canvas",
        "events": {
            "onhover": { "enable": true, "mode": "grab" },
            "onclick": { "enable": true, "mode": "push" }
        },
        "modes": {
            "grab": { "distance": 180, "line_linked": { "opacity": 1 } },
            "push": { "particles_nb": 4 }
        }
    },
    "retina_detect": true
});

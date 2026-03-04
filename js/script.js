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

    // Pasek postępu — pętla co 90 sekund
    (function () {
        const CYCLE = 90000;
        const barEl = document.getElementById('progress-line');

        function renderBar(pct) {
            const filled = Math.round(pct / 100 * 20);
            return `[${'█'.repeat(filled)}${'░'.repeat(20 - filled)}] ${pct.toFixed(1)}%`;
        }

        function update() {
            barEl.textContent = renderBar((Date.now() % CYCLE) / CYCLE * 100);
        }
        update();
        setInterval(update, 500);
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

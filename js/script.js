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
    const history = [];
    const MAX_HISTORY = 2;

    let msgIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    const TYPING_SPEED = 55;
    const DELETING_SPEED = 18;
    const PAUSE_AFTER_TYPE = 12000;
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

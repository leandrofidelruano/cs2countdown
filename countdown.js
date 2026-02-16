function getNextTuesday() {
    const now = new Date();
    let daysUntil = (2 + 7 - now.getDay()) % 7;
    if (daysUntil === 0) daysUntil = 7;
    const next = new Date(now);
    next.setDate(now.getDate() + daysUntil);
    next.setHours(22, 0, 0, 0);
    return next;
}

function calculateTimeRemaining(target) {
    const diff = target.getTime() - new Date().getTime();
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
        days:    Math.floor(diff / 86400000),
        hours:   Math.floor((diff % 86400000) / 3600000),
        minutes: Math.floor((diff % 3600000)  / 60000),
        seconds: Math.floor((diff % 60000)    / 1000)
    };
}

function updateCountdown() {
    const target = getNextTuesday();
    const t = calculateTimeRemaining(target);
    const pad = n => String(n).padStart(2, '0');

    document.getElementById('countdown').innerText =
        `${pad(t.days)} : ${pad(t.hours)} : ${pad(t.minutes)} : ${pad(t.seconds)}`;

    const total = t.days * 86400 + t.hours * 3600 + t.minutes * 60 + t.seconds;
    const pct   = ((7 * 86400 - total) / (7 * 86400)) * 100;
    const pctInt = Math.min(100, Math.floor(pct));

    document.getElementById('progress-bar-fill').style.width = `${pct}%`;
    document.getElementById('percentage').innerHTML = `${pctInt}%`;

    if (total === 0) {
        clearInterval(interval);
        document.getElementById('countdown').innerText = '¡Los drops están disponibles!';
    }
}

updateCountdown();
const interval = setInterval(updateCountdown, 1000);

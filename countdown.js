function getNextTuesday() {
    const now = new Date();
    const daysUntilNextTuesday = (2 + 7 - now.getDay()) % 7; // 2 es el código de día martes

      const nextTuesday = new Date(now);
      nextTuesday.setDate(now.getDate() + daysUntilNextTuesday);
      nextTuesday.setHours(22, 0, 0, 0); // 22:00hs

      return nextTuesday;
    }
    
function calculateTimeRemaining(targetDate) {
    const now = new Date().getTime();
    const targetTime = targetDate.getTime();
    const difference = targetTime - now;

    if (difference <= 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0
        };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds
      };
    }
    
function updateCountdown() {
    const targetDate = getNextTuesday();
    const timeRemaining = calculateTimeRemaining(targetDate);

    const countdownElement = document.getElementById('countdown');
    countdownElement.innerText = `${String(timeRemaining.days).padStart(2, '0')} : ${String(timeRemaining.hours).padStart(2, '0')} : ${String(timeRemaining.minutes).padStart(2, '0')} : ${String(timeRemaining.seconds).padStart(2, '0')}`;

    // Actualiza la barra de progreso
    const progressBarFill = document.getElementById('progress-bar-fill');
    const totalSeconds = timeRemaining.days * 24 * 60 * 60 + timeRemaining.hours * 60 * 60 + timeRemaining.minutes * 60 + timeRemaining.seconds;
    const progressPercentage = ((7 * 24 * 60 * 60) - totalSeconds) / (7 * 24 * 60 * 60) * 100;
    progressBarFill.style.width = `${progressPercentage}%`;
    const percentage = Math.min(100, Math.floor(progressPercentage));
    document.getElementById("percentage").innerHTML = `${percentage}%`;

    if (timeRemaining.days === 0 && timeRemaining.hours === 0 && timeRemaining.minutes === 0 && timeRemaining.seconds === 0) {
        clearInterval(countdownInterval);
        countdownElement.innerText = "¡El tiempo ha expirado!";
        }
    }

    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
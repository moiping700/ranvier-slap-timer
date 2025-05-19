function getNextFridayAt(timeStr) {
  const now = new Date();
  const [hours, minutes] = timeStr.split(':').map(Number);
  const target = new Date(now);

  const day = now.getDay();
  const daysUntilFriday = (5 - day + 7) % 7 || 7;
  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(hours, minutes, 0, 0);

  return target;
}

const countdownElement = document.getElementById('countdown');
const currentTimeElement = document.getElementById('current-time');
let targetDate = getNextFridayAt("09:40");

function updateDisplay() {
  const now = new Date();
  currentTimeElement.innerHTML = "Current Time: " + now.toLocaleTimeString();

  if (now > targetDate) {
    targetDate = getNextFridayAt("09:40");
  }

  const distance = targetDate - now;
  const totalSeconds = Math.floor(distance / 1000);
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.innerHTML =
    `Countdown: ${hours.toString().padStart(2, '0')}h ` +
    `${minutes.toString().padStart(2, '0')}m ` +
    `${seconds.toString().padStart(2, '0')}s`;
}

setInterval(updateDisplay, 1000);

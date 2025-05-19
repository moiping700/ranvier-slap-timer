function getNextFridayAt(timeStr) {
  const now = new Date();
  const [targetHour, targetMinute] = timeStr.split(':').map(Number);
  const target = new Date(now);

  const day = now.getDay(); // 0 = Sunday, 5 = Friday
  let daysToAdd = (5 - day + 7) % 7;
  if (daysToAdd === 0 && (now.getHours() > targetHour || 
     (now.getHours() === targetHour && now.getMinutes() >= targetMinute))) {
    daysToAdd = 7;
  }

  target.setDate(now.getDate() + daysToAdd);
  target.setHours(targetHour, targetMinute, 0, 0);

  return target;
}

const countdownElement = document.getElementById('countdown');
const currentTimeElement = document.getElementById('current-time');
const targetDate = getNextFridayAt("09:40");

function updateCountdown() {
  const now = new Date();
  currentTimeElement.innerHTML = "Current Time: " + now.toLocaleTimeString();

  const diff = targetDate - now;
  const totalSeconds = Math.floor(diff / 1000);

  const totalHours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.innerHTML = 
    `${totalHours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

setInterval(updateCountdown, 1000);

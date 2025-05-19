function getNextFridayAt(timeStr) {
  const now = new Date();
  const [targetHour, targetMinute] = timeStr.split(':').map(Number);
  
  const target = new Date(now);
  
  const currentDay = now.getDay(); // Sunday = 0, Friday = 5
  const daysUntilFriday = (5 - currentDay + 7) % 7;

  target.setDate(now.getDate() + daysUntilFriday);
  target.setHours(targetHour, targetMinute, 0, 0);

  // If it's already Friday and past the time, move to next Friday
  if (
    currentDay === 5 &&
    (now.getHours() > targetHour || 
     (now.getHours() === targetHour && now.getMinutes() >= targetMinute))
  ) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

const countdownElement = document.getElementById('countdown');
const currentTimeElement = document.getElementById('current-time');
let targetDate = getNextFridayAt("09:40");

function updateDisplay() {
  const now = new Date();
  currentTimeElement.innerHTML = "Current Time: " + now.toLocaleTimeString();

  const distance = targetDate - now;

  const totalSeconds = Math.floor(distance / 1000);
  const days = Math.floor(totalSeconds / (60 * 60 * 24));
  const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.innerHTML =
    `${days}d ${hours.toString().padStart(2, '0')}h ` +
    `${minutes.toString().padStart(2, '0')}m ` +
    `${seconds.toString().padStart(2, '0')}s`;
}

setInterval(updateDisplay, 1000);

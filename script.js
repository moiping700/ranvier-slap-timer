function getNextFridayAt(timeStr) {
  const [targetHour, targetMinute] = timeStr.split(':').map(Number);
  const now = new Date();

  // Create a new Date object for local timezone
  const localNow = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());

  let target = new Date(localNow);
  const currentDay = localNow.getDay(); // 0 (Sun) - 6 (Sat)

  let daysUntilFriday = 5 - currentDay;
  if (daysUntilFriday < 0) daysUntilFriday += 7;

  target.setDate(localNow.getDate() + daysUntilFriday);
  target.setHours(targetHour, targetMinute, 0, 0);

  // If it's Friday and past the time, go to next Friday
  if (
    currentDay === 5 &&
    (localNow.getHours() > targetHour ||
     (localNow.getHours() === targetHour && localNow.getMinutes() >= targetMinute))
  ) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

const countdownElement = document.getElementById('countdown');
const currentTimeElement = document.getElementById('current-time');
const targetDate = getNextFridayAt("09:40");

function updateCountdown() {
  const now = new Date();
  const localNow = new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds());

  currentTimeElement.innerHTML = "Current Time: " + localNow.toLocaleTimeString();

  const distance = targetDate - localNow;
  const totalSeconds = Math.floor(distance / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.innerHTML =
    `${totalHours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

setInterval(updateCountdown, 1000);

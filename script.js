// Converts UTC time to GMT+8 (Singapore)
function getSGTime() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 60 * 60 * 1000); // +8 hours
}

function getNextFridayAt_0940_SGT() {
  const sgNow = getSGTime();

  const year = sgNow.getFullYear();
  const month = sgNow.getMonth();
  const date = sgNow.getDate();
  const day = sgNow.getDay(); // 0 (Sun) to 6 (Sat)

  let targetDate = new Date(Date.UTC(year, month, date, 1, 40)); // 9:40am SGT is 01:40 UTC

  // Add days to reach Friday (day 5)
  let daysToAdd = (5 - day + 7) % 7;
  if (daysToAdd === 0 && sgNow.getHours() >= 9 && sgNow.getMinutes() >= 40) {
    daysToAdd = 7;
  }

  targetDate.setUTCDate(targetDate.getUTCDate() + daysToAdd);
  return new Date(targetDate.getTime()); // target in SGT
}

const targetDate = getNextFridayAt_0940_SGT();
const countdownElement = document.getElementById('countdown');
const currentTimeElement = document.getElementById('current-time');

function updateCountdown() {
  const now = getSGTime();
  currentTimeElement.innerHTML = "Current Time (SGT): " + now.toTimeString().split(' ')[0];

  const distance = targetDate - now;

  if (distance <= 0) {
    countdownElement.innerHTML = "It's time!";
    return;
  }

  const totalSeconds = Math.floor(distance / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.innerHTML =
    `${totalHours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

setInterval(updateCountdown, 1000);

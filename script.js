function getSGTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 8 * 60 * 60 * 1000); // GMT+8 for Singapore
}

function getTargetFridayAt0940() {
  const sgNow = getSGTDate();

  // Clone SGT date and find this week's Friday at 9:40 AM
  const target = new Date(sgNow);
  const currentDay = target.getDay(); // 0 = Sun, 5 = Fri
  const daysUntilFriday = (5 - currentDay + 7) % 7;

  target.setDate(target.getDate() + daysUntilFriday);
  target.setHours(9, 40, 0, 0); // Set to 9:40 AM

  // If it's already Friday AND past 9:40 AM, go to next Friday
  if (
    daysUntilFriday === 0 &&
    (sgNow.getHours() > 9 || (sgNow.getHours() === 9 && sgNow.getMinutes() >= 40))
  ) {
    target.setDate(target.getDate() + 7);
  }

  return target;
}

const countdownElement = document.getElementById('countdown');
const currentTimeElement = document.getElementById('current-time');
const targetDate = getTargetFridayAt0940();

function updateCountdown() {
  const now = getSGTDate();
  currentTimeElement.innerHTML = "Current Time (SGT): " + now.toTimeString().split(' ')[0];

  const diff = targetDate - now;

  if (diff <= 0) {
    countdownElement.innerHTML = "It's time!";
    return;
  }

  const totalSeconds = Math.floor(diff / 1000);
  const totalHours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  countdownElement.innerHTML =
    `${totalHours}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
}

setInterval(updateCountdown, 1000);

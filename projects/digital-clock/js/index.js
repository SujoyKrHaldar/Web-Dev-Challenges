const displayPrefix = document.querySelector(".prefix");
const displayTime = document.querySelector(".time");
const displayDate = document.querySelector(".date");

function updateClock() {
  const currentTime = new Date();

  let hours = currentTime.getHours();
  let prefix = "AM";

  if (hours > 12) {
    hours -= 12;
    prefix = "PM";
  }

  hours = hours.toString().padStart(2, "0");
  const minutes = currentTime.getMinutes().toString().padStart(2, "0");
  const seconds = currentTime.getSeconds().toString().padStart(2, "0");

  const dateString = currentTime.toDateString();
  const timeString = `${hours}:${minutes}:${seconds}`;

  displayPrefix.innerText = prefix;
  displayTime.innerText = timeString;
  displayDate.innerText = dateString;
}

// Initial call to display the clock immediately
updateClock();
// Update the clock every second
setInterval(updateClock, 1000);

// Displaying realtime date and time

let time = document.getElementById("current-time");
let date = document.getElementById("current-date");

setInterval(() => {
  let d = new Date();
  // Displaying the time
  time.innerHTML = d.toLocaleTimeString();
  // Displaying the date
  date.innerHTML = d.toLocaleDateString();
}, 1000);

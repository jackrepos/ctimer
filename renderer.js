document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  // document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})

document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  // document.getElementById('theme-source').innerHTML = 'System'
})

const clockbody = document.querySelector('.clock-body')
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const CLICK_MESSAGE = 'Notification clicked!'
const akarmsound = new Audio('./assets/Alarm02.wav')

document.getElementById('btn-start').addEventListener('click', () => {
  const time = document.querySelector(".i-time").value
  if (window.interval) {
    // console.log('clearInterval', window.interval);
    clearInterval(window.interval);
  }
  CTimer(time)
  // console.log('addEventListener', window.interval);
  // document.querySelector('.clock-body').innerHTML = 'System'
})

window.addEventListener('DOMContentLoaded', async () => {
  await window.darkMode.dark()
  // document.getElementById('theme-source').innerHTML = 'Dark'
})
// Black #2F384B Gray #3C4356 Red #FE4D4C Green #05EB8B

function CTimer(time) {
  let mdate = new Date()
  // mdate.setTime(mdate.getTime() + time * 1000)
  // let countDownDate = new Date("Jan 5, 2024 15:37:25").getTime();
  let countDownDate = mdate.getTime() + time * 1000;


  // Update the count down every 1 second
  window.interval = setInterval(function() {

    // Get today's date and time
    let now = new Date().getTime();

    // Find the distance between now and the count down date
    let distance = countDownDate - now;

    // Time calculations for days, hours, minutes and seconds
    // let days = Math.floor(distance / (1000 * 60 * 60 * 24));
    // let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Output the result in an element with id="demo"
    // clockbody.innerHTML = minutes + "m " + seconds + "s ";
    clockbody.innerHTML = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0');

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(window.interval);
      clockbody.innerHTML = "00:00";
      // console.log('CTimer', window.interval);

      new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
        .onclick = () => {
          Notif()
        }
      // window.media.sing()
      akarmsound.loop = true
      akarmsound.play()
    }
  }, 1000);
}

function Notif() {
  console.log('Notif');
  if (window.soundstream) {
    // do something with window.soundstream
    return true;
  }
  clockbody.innerHTML = CLICK_MESSAGE
  akarmsound.pause()
  // window.soundstream = new soundstream
}
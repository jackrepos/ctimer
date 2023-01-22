const clockbody = document.querySelector('.clock-body')
const NOTIFICATION_TITLE = 'Basic Notification'
const NOTIFICATION_BODY = 'Notification from the Renderer process. Click to log to console.'
const akarmsound = new Audio('./assets/Alarm02.wav')

document.getElementById('toggle-dark-mode').addEventListener('click', async () => {
  const isDarkMode = await window.darkMode.toggle()
  // document.getElementById('theme-source').innerHTML = isDarkMode ? 'Dark' : 'Light'
})
document.getElementById('reset-to-system').addEventListener('click', async () => {
  await window.darkMode.system()
  // document.getElementById('theme-source').innerHTML = 'System'
})
document.getElementById('btn-minimize').addEventListener('click', () => {
  window.action.minimize()
})
document.getElementById('btn-quit').addEventListener('click', () => {
  window.action.quit()
})
document.getElementById('reset').addEventListener('click', () => {
  akarmsound.pause()
})

document.getElementById('btn-submit').addEventListener('click', () => {
  document.getElementById('btn-start').click()
})
document.getElementById('btn-start').addEventListener('click', () => {
  let time = document.querySelector(".i-time").value
  if (window.interval) {
    clearInterval(window.interval)
  }
  CTimer(time)
})
document.getElementById('btn-reset').addEventListener('click', () => {
  if (window.interval) {
    clearInterval(window.interval)
    clockbody.innerText = "00:00"
  }
})
document.querySelectorAll('.btn-time').forEach((item) => {
  item.addEventListener('click', (element) => {
    let time = element.target.dataset.time
    if (window.interval) {
      clearInterval(window.interval)
    }
    CTimer(time)
  })
})

window.addEventListener('DOMContentLoaded', async () => {
  await window.darkMode.dark()
})
// Black #2F384B Gray #3C4356 Red #FE4D4C Green #05EB8B

function CTimer(time) {
  let mdate = new Date()
  let countDownDate = mdate.getTime() + time * 60 * 1000

  // Update the count down every 1 second
  window.interval = setInterval(function() {
    // Get today's date and time
    let now = new Date().getTime()
    let distance = countDownDate - now

    // Time calculations for days, hours, minutes and seconds
    let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    let seconds = Math.floor((distance % (1000 * 60)) / 1000)

    clockbody.innerHTML = String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
    if (hours > 0) {
      clockbody.innerHTML = String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0') + ":" + String(seconds).padStart(2, '0')
    }

    // If the count down is over, write some text
    if (distance < 0) {
      clearInterval(window.interval)
      clockbody.innerText = "00:00"
      // console.log('CTimer', window.interval)

      new Notification(NOTIFICATION_TITLE, { body: NOTIFICATION_BODY })
        .onclick = () => {
          akarmsound.pause()
        }

      akarmsound.loop = true
      akarmsound.volume = 0.3
      akarmsound.play()

      setTimeout(() => {
        akarmsound.pause()
      }, 30 * 1000)
    }
  }, 1000)
}

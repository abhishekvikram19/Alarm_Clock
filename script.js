window.addEventListener('load', function() {
  var timeElement = document.getElementById('time');
  var alarmTimeElement = document.getElementById('alarmTime');
  var setAlarmButton = document.getElementById('setAlarm');
  var stopAlarmButton = document.getElementById('stopAlarm');

  function updateClock() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var timeString = hours.toString().padStart(2, '0') + ':' +
                     minutes.toString().padStart(2, '0') + ':' +
                     seconds.toString().padStart(2, '0');
    timeElement.textContent = timeString;

    var alarmTime = alarmTimeElement.value;
    if (alarmTime === timeString) {
      stopAlarmButton.disabled = false;
      playAlarm();
    }

    setTimeout(updateClock, 1000); // Update the clock every second
  }

  setAlarmButton.addEventListener('click', function() {
    alarmTimeElement.disabled = true;
    setAlarmButton.disabled = true;
    stopAlarmButton.disabled = true;
    updateClock(); // Start updating the clock

    var now = new Date();
    var currentTime = now.getHours().toString().padStart(2, '0') +
                      now.getMinutes().toString().padStart(2, '0') +
                      now.getSeconds().toString().padStart(2, '0');
    if (currentTime >= alarmTimeElement.value.replace(/:/g, '')) {
      stopAlarmButton.disabled = false;
      playAlarm();
    }
  });

  stopAlarmButton.addEventListener('click', function() {
    alarmTimeElement.disabled = false;
    setAlarmButton.disabled = false;
    stopAlarmButton.disabled = true;
    stopAlarm();
  });

  function playAlarm() {
    var audio = new Audio('alarm_sound.mp3');
    audio.loop = true;
    audio.play();

    // Scroll the page to the bottom on alarm activation
    document.documentElement.scrollTo({
      top: document.documentElement.scrollHeight,
      behavior: 'smooth'
    });
  }

  function stopAlarm() {
    var audio = document.querySelector('audio');
    audio.pause();
    audio.currentTime = 0;
  }
});

//circle start
let progressBar = document.querySelector('.e-c-progress');
let pointer = document.getElementById('e-pointer');
let length = Math.PI * 2 * 100;
progressBar.style.strokeDasharray = length;

function update(value, timePercent) {
  let offset = -length * value / timePercent;
  progressBar.style.strokeDashoffset = offset;
  pointer.style.transform = `rotate(${360 * value / timePercent}deg)`;
}
//circle ends

const displayOutput = document.querySelector('.display-remain-time');
const pauseBtn = document.getElementById('pause');
const setterBtns = document.querySelectorAll('button[data-setter]');
const cronometerContainer = document.querySelector('.cronometer-container');

let intervalTimer;
let timeLeft;
let wholeTime = 30; // initial whole time in seconds
let isPaused = false;
let isStarted = false;

update(wholeTime, wholeTime); //refreshes progress bar
displayTimeLeft(wholeTime);

function changeWholeTime(seconds) {
  if ((wholeTime + seconds) > 0) {
    wholeTime += seconds;
    update(wholeTime, wholeTime);
    displayTimeLeft(wholeTime);
  }
}

for (let i = 0; i < setterBtns.length; i++) {
  setterBtns[i].addEventListener("click", function(event) {
    let param = this.dataset.setter;
    switch (param) {
      case 'minutes-plus':
        changeWholeTime(1 * 60);
        break;
      case 'minutes-minus':
        changeWholeTime(-1 * 60);
        break;
      case 'seconds-plus':
        changeWholeTime(1);
        break;
      case 'seconds-minus':
        changeWholeTime(-1);
        break;
    }
  });
}

function timer(seconds) { //counts time, takes seconds
  let remainTime = Date.now() + (seconds * 1000);
  displayTimeLeft(seconds);
  
  intervalTimer = setInterval(function() {
    timeLeft = Math.round((remainTime - Date.now()) / 1000);
    if (timeLeft < 0) {
      clearInterval(intervalTimer);
      isStarted = false;
      setterBtns.forEach(function(btn) {
        btn.disabled = false;
        btn.style.opacity = 1;
      });
      displayTimeLeft(wholeTime);
      pauseBtn.classList.remove('pause');
      pauseBtn.classList.add('play');
      showExplosion(); // Show explosion when timer reaches zero
      return;
    }
    displayTimeLeft(timeLeft);
  }, 1000);
}

function pauseTimer(event) {
  if (isStarted === false) {
    timer(wholeTime);
    isStarted = true;
    this.classList.remove('play');
    this.classList.add('pause');
    
    setterBtns.forEach(function(btn) {
      btn.disabled = true;
      btn.style.opacity = 0.5;
    });
  } else if (isPaused) {
    this.classList.remove('play');
    this.classList.add('pause');
    timer(timeLeft);
    isPaused = false;
  } else {
    this.classList.remove('pause');
    this.classList.add('play');
    clearInterval(intervalTimer);
    isPaused = true;
  }
}

function displayTimeLeft(timeLeft) { //displays time on the input
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  let displayString = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  displayOutput.textContent = displayString;
  update(timeLeft, wholeTime);
}


pauseBtn.addEventListener('click', pauseTimer);

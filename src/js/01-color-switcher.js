const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');
let timerId = null;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

stopBtn.setAttribute('disabled', 'true');

function onStartBtnClick(event) {
  timerId = setInterval(() => {
    console.log(timerId);
    body.style.backgroundColor = getRandomHexColor();
    startBtn.setAttribute('disabled', 'true');
    stopBtn.removeAttribute('disabled');
  }, 1000);
}

function onStopBtnClick(event) {
  clearInterval(timerId);
  startBtn.removeAttribute('disabled');
  stopBtn.setAttribute('disabled', 'true');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
